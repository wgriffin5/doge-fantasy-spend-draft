import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import useSound from "use-sound";
import { triggerCelebration } from "./draft/ConfettiCelebration";
import DraftedProgramsList from "./DraftedProgramsList";
import DraftSubmissionForm from "./DraftSubmissionForm";
import DraftHeader from "./draft/DraftHeader";
import EmptyDraftState from "./draft/EmptyDraftState";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
}

interface DraftedProgramsProps {
  selectedPrograms: Program[];
  onRemoveProgram: (program: Program) => void;
  onEmailSubmit: (email: string) => void;
  allPrograms: Program[];
}

export default function DraftedPrograms({
  selectedPrograms,
  onRemoveProgram,
  onEmailSubmit,
  allPrograms,
}: DraftedProgramsProps) {
  const { toast } = useToast();
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });

  const totalBudget = selectedPrograms.reduce(
    (sum, program) => sum + program.annual_budget,
    0
  );

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(budget);
  };

  // Reset card styles to their default state
  const resetCardStyles = () => {
    const card = document.getElementById("draft-picks");
    if (card) {
      card.style.transform = "";
      card.style.borderColor = "";
      card.style.transition = "all 0.2s ease";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const card = document.getElementById("draft-picks");
    if (card) {
      card.style.transition = "all 0.2s ease";
      card.style.transform = "scale(1.02)";
      card.style.borderColor = "var(--doge-gold)";
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only reset if we're actually leaving the card (not entering a child element)
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    resetCardStyles();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    console.log("[DraftedPrograms] Drop event received");
    
    resetCardStyles();
    
    const programId = e.dataTransfer.getData("programId");
    console.log("[DraftedPrograms] Program ID from drop:", programId);
    
    const existingProgram = selectedPrograms.find(p => p.id === programId);
    
    if (existingProgram) {
      console.log("[DraftedPrograms] Program already drafted, removing");
      onRemoveProgram(existingProgram);
      playSuccess();
      
      const remainingDrafts = 7 - (selectedPrograms.length - 1);
      toast({
        title: "Program Removed",
        description: `${remainingDrafts} draft${remainingDrafts === 1 ? '' : 's'} remaining`,
        duration: 3000,
      });
    } else {
      const programToDraft = allPrograms.find(p => p.id === programId);
      
      if (programToDraft && selectedPrograms.length < 7) {
        console.log("[DraftedPrograms] Adding new program:", programToDraft.name);
        onRemoveProgram(programToDraft);
        playSuccess();
        
        triggerCelebration();
        
        const remainingDrafts = 7 - (selectedPrograms.length + 1);
        const draftMessage = remainingDrafts > 0 
          ? `${remainingDrafts} draft${remainingDrafts === 1 ? '' : 's'} remaining!`
          : "All draft picks complete! 🎉";
          
        toast({
          title: `${programToDraft.name} Drafted! 🎯`,
          description: draftMessage,
          duration: 3000,
        });
      }
    }
  };

  // Clean up any lingering styles when component unmounts
  useEffect(() => {
    return () => {
      resetCardStyles();
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-0"
    >
      <Card 
        id="draft-picks" 
        className={`relative overflow-hidden transition-all duration-200 border-2 ${
          selectedPrograms.length === 7 
            ? "border-green-500/50 bg-green-50/10" 
            : "hover:border-doge-gold/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardHeader>
          <DraftHeader 
            selectedCount={selectedPrograms.length} 
            remainingCount={7 - selectedPrograms.length}
          />
        </CardHeader>

        <CardContent className="space-y-4">
          {selectedPrograms.length === 0 ? (
            <EmptyDraftState />
          ) : (
            <div>
              <DraftedProgramsList
                selectedPrograms={selectedPrograms}
                onRemoveProgram={onRemoveProgram}
                formatBudget={formatBudget}
              />
              <div className="pt-2">
                <div className="mb-2 text-sm sm:text-base font-medium">
                  Total Budget Cuts:{" "}
                  <span className="text-doge-gold">
                    {formatBudget(totalBudget)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <DraftSubmissionForm
            selectedPrograms={selectedPrograms}
            totalBudget={totalBudget}
            formatBudget={formatBudget}
            onEmailSubmit={onEmailSubmit}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}