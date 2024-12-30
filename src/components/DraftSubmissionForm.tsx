import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEmailEvent } from "@/utils/analytics";
import useSound from "use-sound";
import DraftForm from "./draft/DraftForm";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });

  const handleFormSubmit = (email: string) => {
    setPendingEmail(email);
    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
    setIsSubmitting(true);

    try {
      await trackEmailEvent("A", "draft", "attempt", pendingEmail);

      const { error: draftError } = await supabase.from("draft_picks").insert([
        {
          email: pendingEmail,
          program_ids: selectedPrograms.map((p) => p.id),
        },
      ]);

      if (draftError) throw draftError;

      await onEmailSubmit(pendingEmail);
      await trackEmailEvent("A", "draft", "success", pendingEmail);

      playSuccess();
      toast.success("Your draft picks have been submitted!");

      setPendingEmail("");
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
    setPendingEmail("");
  };

  if (selectedPrograms.length === 0) return null;

  return (
    <div className="space-y-4">
      <DraftForm
        selectedProgramsCount={selectedPrograms.length}
        onSubmit={handleFormSubmit}
        disabled={isSubmitting}
      />

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