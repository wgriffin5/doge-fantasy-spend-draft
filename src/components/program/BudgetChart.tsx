import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
}

interface BudgetChartProps {
  programs: Program[];
  formatBudget: (budget: number) => string;
}

export default function BudgetChart({ programs, formatBudget }: BudgetChartProps) {
  const totalBudget = programs?.reduce(
    (sum, program) => sum + program.annual_budget,
    0
  );

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Budget Distribution</CardTitle>
        <CardDescription>
          Total Budget: {formatBudget(totalBudget || 0)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={programs?.map((program) => ({
                  name: program.name,
                  value: program.annual_budget,
                }))}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={1}
                dataKey="value"
              >
                {programs?.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(${(index * 360) / programs.length}, 70%, 50%)`}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => formatBudget(value)}
                contentStyle={{ background: "hsl(var(--background))" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}