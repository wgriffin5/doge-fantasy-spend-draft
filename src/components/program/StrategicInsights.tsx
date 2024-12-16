import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, TrendingDown, DollarSign } from "lucide-react";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
}

interface StrategicInsightsProps {
  programs: Program[];
  formatBudget: (budget: number) => string;
}

export default function StrategicInsights({
  programs,
  formatBudget,
}: StrategicInsightsProps) {
  const calculatePotentialPoints = (budget: number) => {
    return Math.max(1, Math.floor(budget / 1000000000));
  };

  const totalPotentialPoints = programs.reduce(
    (sum, program) => sum + calculatePotentialPoints(program.annual_budget),
    0
  );

  const departmentStats = programs.reduce((acc, program) => {
    acc[program.department] = (acc[program.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategic Insights</CardTitle>
        <CardDescription>
          Analyze your draft picks and maximize your potential points
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-doge-gold/10 p-2">
            <Trophy className="h-5 w-5 text-doge-gold" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Total Potential Points
            </div>
            <div className="text-2xl font-bold text-doge-gold">
              {totalPotentialPoints}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-blue-500" />
            <h4 className="font-medium">Department Distribution</h4>
          </div>
          <div className="space-y-2">
            {Object.entries(departmentStats).map(([dept, count]) => (
              <div
                key={dept}
                className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-1"
              >
                <span className="text-sm">{dept}</span>
                <span className="text-sm font-medium">{count} programs</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <h4 className="font-medium">Program Points Breakdown</h4>
          </div>
          <div className="space-y-2">
            {programs.map((program) => (
              <div
                key={program.id}
                className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-1"
              >
                <span className="text-sm truncate flex-1 mr-4">
                  {program.name}
                </span>
                <span className="text-sm font-medium whitespace-nowrap">
                  {calculatePotentialPoints(program.annual_budget)} points
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}