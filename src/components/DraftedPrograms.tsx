import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import DraftedProgramsList from "./DraftedProgramsList";
import DraftSubmissionForm from "./DraftSubmissionForm";

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
}

export default function DraftedPrograms({
  selectedPrograms,
  onRemoveProgram,
  onEmailSubmit,
}: DraftedProgramsProps) {
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const card = document.getElementById("draft-picks");
    if (card) {
      card.style.transform = "scale(1.02)";
      card.style.borderColor = "var(--doge-gold)";
    }
  };

  const handleDragLeave = () => {
    const card = document.getElementById("draft-picks");
    if (card) {
      card.style.transform = "scale(1)";
      card.style.borderColor = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const card = document.getElementById("draft-picks");
    if (card) {
      card.style.transform = "scale(1)";
      card.style.borderColor = "";
    }
    
    const programId = e.dataTransfer.getData("programId");
    const program = selectedPrograms.find(p => p.id === programId);
    if (program) {
      onRemoveProgram(program);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-0"
    >
      <Card 
        id="draft-picks" 
        className="relative overflow-hidden transition-all duration-200"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            Your Draft Picks
            <motion.div
              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-doge-gold text-white text-sm font-medium"
              animate={{
                scale: selectedPrograms.length > 0 ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {selectedPrograms.length}
            </motion.div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <AnimatePresence mode="popLayout">
            {selectedPrograms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center"
              >
                <p className="text-sm sm:text-base text-muted-foreground">
                  Drag and drop programs here to draft them.
                  <br />
                  Draft 7 programs to cut from the federal budget.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <DraftedProgramsList
                  selectedPrograms={selectedPrograms}
                  onRemoveProgram={onRemoveProgram}
                  formatBudget={formatBudget}
                />
                <div className="pt-2">
                  <div className="mb-2 text-sm sm:text-base font-medium">
                    Total Budget Cuts:{" "}
                    <motion.span
                      key={totalBudget}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-doge-gold"
                    >
                      {formatBudget(totalBudget)}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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