import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skull, PartyPopper, DollarSign } from "lucide-react";

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
  const getFrivolityRating = (budget: number) => {
    if (budget > 10000000000)
      return { icon: Skull, label: "Extremely Wasteful" };
    if (budget > 1000000000)
      return { icon: PartyPopper, label: "Very Frivolous" };
    return { icon: DollarSign, label: "Somewhat Wasteful" };
  };

  const frivolity = getFrivolityRating(program.annual_budget);
  const FrivolityIcon = frivolity.icon;

  return (
    <Card>
      <div className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{program.name}</h3>
            <Badge
              variant={program.is_cut ? "destructive" : "secondary"}
              className="ml-2"
            >
              {program.is_cut ? "Cut" : "Active"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {program.description}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="outline">{program.department}</Badge>
            <div className="flex items-center gap-2">
              <FrivolityIcon className="h-4 w-4 text-doge-gold" />
              <span className="text-sm">{frivolity.label}</span>
            </div>
            <span className="font-semibold text-doge-gold">
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
    </Card>
  );
}