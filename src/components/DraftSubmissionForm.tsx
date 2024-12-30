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

  // Enhanced DOM monitoring and cleanup
  useEffect(() => {
    console.log("[DraftSubmissionForm] Initial mount - Setting up DOM monitoring");
    
    const removeOverlays = () => {
      console.log("[DraftSubmissionForm] Running aggressive overlay cleanup");
      
      // Query for potential overlay elements
      const overlayElements = document.querySelectorAll(`
        .overlay, 
        .backdrop, 
        [class*="dialog"],
        [class*="modal"],
        [style*="position: fixed"],
        [style*="z-index: 50"]
      `);

      console.log("[DraftSubmissionForm] Found overlay candidates:", overlayElements.length);
      
      overlayElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          console.log("[DraftSubmissionForm] Removing element:", {
            classes: element.className,
            styles: element.style.cssText,
            tagName: element.tagName
          });
          element.remove();
        }
      });

      // Reset body styles
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
      
      console.log("[DraftSubmissionForm] Body styles after cleanup:", {
        position: document.body.style.position,
        overflow: document.body.style.overflow,
        htmlOverflow: document.documentElement.style.overflow
      });
    };

    // Set up mutation observer for dynamic elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          console.log("[DraftSubmissionForm] DOM mutation detected:", {
            type: mutation.type,
            target: mutation.target
          });
          removeOverlays();
        }
      });
    });

    // Start observing with comprehensive options
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    // Initial cleanup
    removeOverlays();

    return () => {
      console.log("[DraftSubmissionForm] Cleaning up - disconnecting observer");
      observer.disconnect();
      removeOverlays();
    };
  }, []);

  const handleFormSubmit = async (email: string) => {
    console.log("[DraftSubmissionForm] Form submission started", {
      email,
      selectedProgramsCount: selectedPrograms.length,
      isSubmitting,
      bodyClasses: document.body.className,
      htmlClasses: document.documentElement.className
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