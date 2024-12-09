import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skull, PartyPopper, DollarSign } from "lucide-react";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
  is_cut: boolean;
}

interface ProgramCardProps {
  program: Program;
  isSelected: boolean;
  onSelect: () => void;
  selectedCount: number;
  formatBudget: (budget: number) => string;
}

export default function ProgramCard({
  program,
  isSelected,
  onSelect,
  selectedCount,
  formatBudget,
}: ProgramCardProps) {
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
    <Card
      className={`transform transition-all hover:scale-105 ${
        isSelected ? "border-doge-gold" : ""
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{program.name}</CardTitle>
          <Badge
            variant={program.is_cut ? "destructive" : "secondary"}
            className="ml-2"
          >
            {program.is_cut ? "Cut" : "Active"}
          </Badge>
        </div>
        <CardDescription>{program.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FrivolityIcon className="h-5 w-5 text-doge-gold" />
              <span className="text-sm font-medium">{frivolity.label}</span>
            </div>
            <span className="font-bold text-doge-gold">
              {formatBudget(program.annual_budget)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <Badge variant="outline">{program.department}</Badge>
            <Button
              variant={isSelected ? "destructive" : "default"}
              onClick={onSelect}
              disabled={
                (selectedCount >= 7 && !isSelected) || program.is_cut
              }
            >
              {isSelected ? "Remove" : "Draft"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}