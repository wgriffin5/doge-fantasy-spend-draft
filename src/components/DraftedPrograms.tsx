import React from "react";
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

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-0"
    >
      <Card 
        className={`relative overflow-hidden transition-all duration-200 border-2 ${
          selectedPrograms.length === 7 
            ? "border-green-500/50 bg-green-50/10" 
            : "border-doge-gold/50"
        }`}
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