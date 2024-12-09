import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skull, PartyPopper, DollarSign } from "lucide-react";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
  is_cut: boolean;
}

interface ProgramGridProps {
  selectedPrograms: Program[];
  onSelectProgram: (program: Program) => void;
}

export default function ProgramGrid({
  selectedPrograms,
  onSelectProgram,
}: ProgramGridProps) {
  const { data: programs, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("annual_budget", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const getFrivolityRating = (budget: number) => {
    if (budget > 10000000000) return { icon: Skull, label: "Extremely Wasteful" };
    if (budget > 1000000000) return { icon: PartyPopper, label: "Very Frivolous" };
    return { icon: DollarSign, label: "Somewhat Wasteful" };
  };

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(budget);
  };

  const isSelected = (program: Program) =>
    selectedPrograms.some((p) => p.id === program.id);

  if (isLoading) {
    return <div>Loading programs...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {programs?.map((program) => {
        const frivolity = getFrivolityRating(program.annual_budget);
        const FrivolityIcon = frivolity.icon;

        return (
          <Card
            key={program.id}
            className={`transform transition-all hover:scale-105 ${
              isSelected(program) ? "border-doge-gold" : ""
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
                    variant={isSelected(program) ? "destructive" : "default"}
                    onClick={() => onSelectProgram(program)}
                    disabled={
                      (selectedPrograms.length >= 7 && !isSelected(program)) ||
                      program.is_cut
                    }
                  >
                    {isSelected(program) ? "Remove" : "Draft"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}