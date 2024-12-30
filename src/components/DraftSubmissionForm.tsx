import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEmailEvent } from "@/utils/analytics";
import useSound from "use-sound";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
}

interface DraftSubmissionFormProps {
  selectedPrograms: Program[];
  totalBudget: number;
  formatBudget: (budget: number) => string;
  onEmailSubmit: (email: string) => void;
}

export default function DraftSubmissionForm({
  selectedPrograms,
  totalBudget,
  formatBudget,
  onEmailSubmit,
}: DraftSubmissionFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });

  // Debug: Track component lifecycle and state changes
  useEffect(() => {
    console.log("DraftSubmissionForm mounted");
    console.log("Initial state:", {
      email,
      isSubmitting,
      showConfirmation,
      selectedProgramsCount: selectedPrograms.length
    });

    return () => {
      console.log("DraftSubmissionForm unmounting");
      console.log("Final state:", {
        email,
        isSubmitting,
        showConfirmation,
        selectedProgramsCount: selectedPrograms.length
      });
      // Ensure cleanup of any pending states
      setShowConfirmation(false);
      setIsSubmitting(false);
    };
  }, []);

  // Debug: Track state changes
  useEffect(() => {
    console.log("Confirmation dialog state changed:", {
      showConfirmation,
      isSubmitting,
      selectedProgramsCount: selectedPrograms.length
    });
  }, [showConfirmation, isSubmitting, selectedPrograms]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit handler triggered", {
      email,
      selectedProgramsCount: selectedPrograms.length,
      showConfirmation
    });
    
    if (!email) {
      console.log("Email validation failed - empty email");
      toast.error("Please enter your email address");
      return;
    }
    
    if (selectedPrograms.length !== 7) {
      console.log("Program count validation failed:", {
        count: selectedPrograms.length,
        required: 7
      });
      toast.error("Please select exactly 7 programs before submitting");
      return;
    }

    console.log("Showing confirmation dialog");
    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
    console.log("Starting confirmation process", {
      email,
      selectedProgramsCount: selectedPrograms.length
    });
    setIsSubmitting(true);
    
    try {
      console.log("Tracking draft attempt");
      await trackEmailEvent("A", "draft", "attempt", email);

      console.log("Saving draft picks to database");
      const { error: draftError } = await supabase
        .from("draft_picks")
        .insert([
          {
            email,
            program_ids: selectedPrograms.map(p => p.id)
          }
        ]);

      if (draftError) {
        console.error("Draft submission failed:", draftError);
        throw draftError;
      }

      console.log("Draft picks saved successfully");
      console.log("Calling onEmailSubmit");
      await onEmailSubmit(email);

      console.log("Tracking draft success");
      await trackEmailEvent("A", "draft", "success", email);

      playSuccess();
      toast.success("Your draft picks have been submitted!");
      
      // Clean up states
      setEmail("");
      setShowConfirmation(false);
      console.log("States reset after successful submission");
    } catch (error) {
      console.error("Submission process failed:", error);
      toast.error("Failed to submit draft picks. Please try again.");
    } finally {
      setIsSubmitting(false);
      console.log("Submission process completed", {
        email,
        showConfirmation,
        isSubmitting: false
      });
    }
  };

  if (selectedPrograms.length === 0) return null;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          {selectedPrograms.length < 7 && (
            <div className="text-sm text-muted-foreground">
              Select {7 - selectedPrograms.length} more program{selectedPrograms.length === 6 ? '' : 's'} to complete your draft
            </div>
          )}
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              console.log("Email input changed:", e.target.value);
              setEmail(e.target.value);
            }}
            className="w-full"
          />
          <Button
            type="submit"
            className="w-full bg-doge-gold hover:bg-doge-gold/90"
            disabled={isSubmitting || selectedPrograms.length !== 7}
            onClick={() => console.log("Submit button clicked", {
              isSubmitting,
              selectedProgramsCount: selectedPrograms.length
            })}
          >
            {isSubmitting ? "Submitting..." : "Submit Draft Picks"}
          </Button>
        </div>
      </form>

      {showConfirmation && (
        <div className="border rounded-lg p-4 bg-card">
          <h3 className="font-semibold mb-2">Confirm Your Draft Submission</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You are about to submit {selectedPrograms.length} programs with a total budget cut of {formatBudget(totalBudget)}. This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                console.log("Canceling confirmation");
                setShowConfirmation(false);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Confirm button clicked");
                confirmSubmission();
              }}
              disabled={isSubmitting}
              className="bg-doge-gold hover:bg-doge-gold/90"
            >
              {isSubmitting ? "Submitting..." : "Confirm Submission"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}