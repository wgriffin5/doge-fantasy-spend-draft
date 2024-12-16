import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
  is_cut: boolean;
}

interface ProgramListItemProps {
  program: Program;
  isSelected: boolean;
  onSelect: () => void;
  selectedCount: number;
  formatBudget: (budget: number) => string;
}

export default function ProgramListItem({
  program,
  isSelected,
  onSelect,
  selectedCount,
  formatBudget,
}: ProgramListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{program.name}</h3>
          <Badge variant={program.is_cut ? "destructive" : "secondary"}>
            {program.is_cut ? "Cut" : "Active"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{program.description}</p>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{program.department}</Badge>
          <span className="text-sm font-medium text-doge-gold">
            {formatBudget(program.annual_budget)}
          </span>
        </div>
      </div>
      <Button
        variant={isSelected ? "destructive" : "default"}
        onClick={onSelect}
        disabled={(selectedCount >= 7 && !isSelected) || program.is_cut}
      >
        {isSelected ? "Remove" : "Draft"}
      </Button>
    </div>
  );
}