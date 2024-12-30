import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEmailEvent } from "@/utils/analytics";
import useSound from "use-sound";
import DraftEmailInput from "./draft/DraftEmailInput";
import DraftConfirmationDialog from "./draft/DraftConfirmationDialog";

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

  // Cleanup effect
  useEffect(() => {
    return () => {
      setShowConfirmation(false);
      setIsSubmitting(false);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (selectedPrograms.length !== 7) {
      toast.error("Please select exactly 7 programs before submitting");
      return;
    }

    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
    setIsSubmitting(true);

    try {
      await trackEmailEvent("A", "draft", "attempt", email);

      const { error: draftError } = await supabase.from("draft_picks").insert([
        {
          email,
          program_ids: selectedPrograms.map((p) => p.id),
        },
      ]);

      if (draftError) {
        throw draftError;
      }

      await onEmailSubmit(email);
      await trackEmailEvent("A", "draft", "success", email);

      playSuccess();
      toast.success("Your draft picks have been submitted!");

      setEmail("");
      setShowConfirmation(false);
    } catch (error) {
      console.error("Submission process failed:", error);
      toast.error("Failed to submit draft picks. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setIsSubmitting(false);
  };

  if (selectedPrograms.length === 0) return null;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          {selectedPrograms.length < 7 && (
            <div className="text-sm text-muted-foreground">
              Select {7 - selectedPrograms.length} more program
              {selectedPrograms.length === 6 ? "" : "s"} to complete your draft
            </div>
          )}
          <DraftEmailInput
            email={email}
            setEmail={setEmail}
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            className="w-full bg-doge-gold hover:bg-doge-gold/90"
            disabled={isSubmitting || selectedPrograms.length !== 7}
          >
            {isSubmitting ? "Submitting..." : "Submit Draft Picks"}
          </Button>
        </div>
      </form>

      {showConfirmation && (
        <DraftConfirmationDialog
          onCancel={handleCancel}
          onConfirm={confirmSubmission}
          isSubmitting={isSubmitting}
          programCount={selectedPrograms.length}
          totalBudget={totalBudget}
          formatBudget={formatBudget}
        />
      )}
    </div>
  );
}