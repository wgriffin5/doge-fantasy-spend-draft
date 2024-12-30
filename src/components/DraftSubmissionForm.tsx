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

  // Debug logging for body classes
  useEffect(() => {
    const logBodyClasses = () => {
      console.log("[DraftSubmissionForm] Body classes:", document.body.className);
      console.log("[DraftSubmissionForm] HTML classes:", document.documentElement.className);
    };

    // Log initial classes
    logBodyClasses();

    // Create MutationObserver to watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          console.log("[DraftSubmissionForm] Class mutation detected:");
          logBodyClasses();
        }
      });
    });

    // Start observing
    observer.observe(document.body, { attributes: true });
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Cleanup function to remove any overlay elements
  useEffect(() => {
    const cleanup = () => {
      console.log("[DraftSubmissionForm] Running overlay cleanup");
      const overlaySelectors = [
        '[class*="overlay"]',
        '[class*="backdrop"]',
        '[class*="dialog"]',
        '[style*="position: fixed"]',
        '[style*="z-index"]'
      ];

      overlaySelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          console.log("[DraftSubmissionForm] Removing overlay element:", element);
          if (element instanceof HTMLElement && 
              element.style.position === 'fixed' && 
              element.style.zIndex !== '') {
            element.remove();
          }
        });
      });

      // Remove any fixed positioning from body
      document.body.style.position = '';
      document.body.style.overflow = '';
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
        style: { 
          background: 'var(--background)', 
          border: '1px solid var(--border)',
          position: 'relative',
          zIndex: 50
        }
      });
    } catch (error) {
      console.error("[DraftSubmissionForm] Submission process failed:", error);
      toast.error("Failed to submit draft picks. Please try again.", {
        duration: 3000,
        style: { 
          background: 'var(--background)', 
          border: '1px solid var(--border)',
          position: 'relative',
          zIndex: 50
        }
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