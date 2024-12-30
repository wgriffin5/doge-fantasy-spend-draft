import { useState, useEffect } from "react";
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

  // Remove any potential overlay elements
  useEffect(() => {
    const cleanup = () => {
      const overlays = document.querySelectorAll('[class*="overlay"], [class*="backdrop"]');
      overlays.forEach(overlay => overlay.remove());
    };
    
    cleanup();
    return cleanup;
  }, []);

  const handleFormSubmit = async (email: string) => {
    console.log("[DraftSubmissionForm] Form submission started", {
      email,
      selectedProgramsCount: selectedPrograms.length,
      isSubmitting
    });

    if (isSubmitting) {
      console.log("[DraftSubmissionForm] Submission already in progress");
      return;
    }

    setIsSubmitting(true);
    console.log("[DraftSubmissionForm] isSubmitting set to true");
    
    try {
      console.log("[DraftSubmissionForm] Tracking email event");
      await trackEmailEvent("A", "draft", "attempt", email);

      console.log("[DraftSubmissionForm] Inserting draft picks");
      const { error: draftError } = await supabase.from("draft_picks").insert([
        {
          email: email,
          program_ids: selectedPrograms.map((p) => p.id),
        },
      ]);

      if (draftError) throw draftError;

      console.log("[DraftSubmissionForm] Draft picks inserted successfully");
      await onEmailSubmit(email);
      await trackEmailEvent("A", "draft", "success", email);
      playSuccess();
      
      console.log("[DraftSubmissionForm] Showing success toast");
      toast.success("Your draft picks have been submitted!", {
        duration: 3000,
        style: { background: 'var(--background)', border: '1px solid var(--border)' }
      });
    } catch (error) {
      console.error("[DraftSubmissionForm] Submission process failed:", error);
      toast.error("Failed to submit draft picks. Please try again.", {
        duration: 3000,
        style: { background: 'var(--background)', border: '1px solid var(--border)' }
      });
    } finally {
      console.log("[DraftSubmissionForm] Setting isSubmitting to false");
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