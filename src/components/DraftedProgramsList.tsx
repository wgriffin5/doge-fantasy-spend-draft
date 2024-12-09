import { Button } from "@/components/ui/button";
import useSound from "use-sound";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
}

interface DraftedProgramsListProps {
  selectedPrograms: Program[];
  onRemoveProgram: (program: Program) => void;
  formatBudget: (budget: number) => string;
}

export default function DraftedProgramsList({
  selectedPrograms,
  onRemoveProgram,
  formatBudget,
}: DraftedProgramsListProps) {
  const [playSelect] = useSound("/sounds/select.mp3", { volume: 0.5 });

  return (
    <div className="space-y-2">
      {selectedPrograms.map((program) => (
        <div
          key={program.id}
          className="group flex items-center justify-between rounded-lg border bg-gradient-to-r from-transparent to-transparent p-2 transition-all hover:from-doge-gold/5 hover:to-transparent"
        >
          <div>
            <div className="font-medium">{program.name}</div>
            <div className="text-sm text-muted-foreground">
              {formatBudget(program.annual_budget)}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              playSelect();
              onRemoveProgram(program);
            }}
            className="opacity-0 group-hover:opacity-100"
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}