import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skull, PartyPopper, DollarSign, Search, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"budget" | "name" | "department">("budget");

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

  const departments = programs
    ? [...new Set(programs.map((p) => p.department))].sort()
    : [];

  const filteredPrograms = programs
    ?.filter(
      (program) =>
        (program.name.toLowerCase().includes(search.toLowerCase()) ||
          program.description.toLowerCase().includes(search.toLowerCase())) &&
        (!department || program.department === department)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "budget":
          return b.annual_budget - a.annual_budget;
        case "name":
          return a.name.localeCompare(b.name);
        case "department":
          return a.department.localeCompare(b.department);
        default:
          return 0;
      }
    });

  const totalBudget = filteredPrograms?.reduce(
    (sum, program) => sum + program.annual_budget,
    0
  );

  if (isLoading) {
    return <div>Loading programs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search programs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Sort by Budget</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="department">Sort by Department</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView(view === "grid" ? "list" : "grid")}
          >
            {view === "grid" ? (
              <List className="h-4 w-4" />
            ) : (
              <LayoutGrid className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Budget Overview Chart */}
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
                  data={filteredPrograms?.map((program) => ({
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
                  {filteredPrograms?.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`hsl(${(index * 360) / filteredPrograms.length}, 70%, 50%)`}
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

      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-4"
        }
      >
        {filteredPrograms?.map((program) => {
          const frivolity = getFrivolityRating(program.annual_budget);
          const FrivolityIcon = frivolity.icon;

          return view === "grid" ? (
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
                      <span className="text-sm font-medium">
                        {frivolity.label}
                      </span>
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
          ) : (
            <Card key={program.id}>
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
            </Card>
          );
        })}
      </div>
    </div>
  );
}