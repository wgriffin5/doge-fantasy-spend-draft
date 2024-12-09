import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
}

export default function DraftedPrograms({
  selectedPrograms,
  onRemoveProgram,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Draft Picks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedPrograms.length === 0 ? (
          <p className="text-muted-foreground">
            Draft up to 7 programs to cut from the federal budget.
          </p>
        ) : (
          <>
            <DraftedProgramsList
              selectedPrograms={selectedPrograms}
              onRemoveProgram={onRemoveProgram}
              formatBudget={formatBudget}
            />
            <div className="pt-2">
              <div className="mb-2 font-medium">
                Total Budget Cuts:{" "}
                <span className="text-doge-gold">
                  {formatBudget(totalBudget)}
                </span>
              </div>
            </div>
          </>
        )}
        <DraftSubmissionForm
          selectedPrograms={selectedPrograms}
          totalBudget={totalBudget}
          formatBudget={formatBudget}
        />
      </CardContent>
    </Card>
  );
}