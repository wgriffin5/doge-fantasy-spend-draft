import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { supabase } from "@/integrations/supabase/client";
import { trackEmailEvent } from "@/utils/analytics";
import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogHeader,
  CustomDialogTitle,
  CustomDialogDescription,
  CustomDialogFooter,
} from "@/components/ui/custom-dialog";

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
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      console.log("Email validation failed - empty email");
      toast.error("Please enter your email address");
      return;
    }
    
    if (selectedPrograms.length !== 7) {
      console.log("Program count validation failed:", selectedPrograms.length);
      toast.error("Please select exactly 7 programs before submitting");
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmSubmission = async () => {
    setIsSubmitting(true);
    console.log("Starting submission process...");
    
    try {
      // Track the attempt
      await trackEmailEvent("A", "draft", "attempt", email);
      console.log("Tracked draft attempt");

      // Insert draft picks into database
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
      console.log("Draft picks saved to database");

      console.log("Calling onEmailSubmit with programs:", selectedPrograms);
      await onEmailSubmit(email);
      console.log("Email submission successful");

      // Track the success
      await trackEmailEvent("A", "draft", "success", email);
      console.log("Tracked draft success");

      playSuccess();
      toast.success("Your draft picks have been submitted!");
      setEmail("");
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Email submission failed:", error);
      toast.error("Failed to submit draft picks. Please try again.");
    } finally {
      setIsSubmitting(false);
      console.log("Submission process completed");
    }
  };

  if (selectedPrograms.length === 0) return null;

  return (
    <>
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
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              type="submit"
              className="w-full bg-doge-gold hover:bg-doge-gold/90"
              disabled={isSubmitting || selectedPrograms.length !== 7}
            >
              {isSubmitting ? "Submitting..." : "Submit Draft Picks"}
            </Button>
          </motion.div>
        </div>
      </form>

      <CustomDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <CustomDialogContent>
          <CustomDialogHeader>
            <CustomDialogTitle>Confirm Your Draft Submission</CustomDialogTitle>
            <CustomDialogDescription>
              You are about to submit {selectedPrograms.length} programs with a total budget cut of {formatBudget(totalBudget)}. This action cannot be undone.
            </CustomDialogDescription>
          </CustomDialogHeader>
          <CustomDialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmSubmission}
              disabled={isSubmitting}
              className="bg-doge-gold hover:bg-doge-gold/90"
            >
              {isSubmitting ? "Submitting..." : "Confirm Submission"}
            </Button>
          </CustomDialogFooter>
        </CustomDialogContent>
      </CustomDialog>
    </>
  );
}