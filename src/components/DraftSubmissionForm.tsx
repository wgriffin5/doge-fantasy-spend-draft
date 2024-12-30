import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEmailEvent } from "@/utils/analytics";
import useSound from "use-sound";
import DraftForm from "./draft/DraftForm";

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
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });

  const handleFormSubmit = async (email: string) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      await trackEmailEvent("A", "draft", "attempt", email);

      const { error: draftError } = await supabase.from("draft_picks").insert([
        {
          email: email,
          program_ids: selectedPrograms.map((p) => p.id),
        },
      ]);

      if (draftError) throw draftError;

      await onEmailSubmit(email);
      await trackEmailEvent("A", "draft", "success", email);
      playSuccess();
      
      toast.success("Your draft picks have been submitted!");
    } catch (error) {
      console.error("Submission process failed:", error);
      toast.error("Failed to submit draft picks. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (selectedPrograms.length === 0) return null;

  return (
    <div className="space-y-4">
      <DraftForm
        selectedProgramsCount={selectedPrograms.length}
        onSubmit={handleFormSubmit}
        disabled={isSubmitting}
      />
    </div>
  );
}