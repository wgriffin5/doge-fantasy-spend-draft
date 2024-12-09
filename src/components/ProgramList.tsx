import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
}

interface ProgramListProps {
  selectedPrograms: Program[];
  onSelectProgram: (program: Program) => void;
}

const MOCK_PROGRAMS: Program[] = [
  {
    id: "1",
    name: "Agricultural Subsidies",
    description: "Direct payments to farmers for crop price support",
    annual_budget: 20000000000,
    department: "Department of Agriculture",
  },
  {
    id: "2",
    name: "Space Launch System",
    description: "Development of heavy-lift rocket systems",
    annual_budget: 23000000000,
    department: "NASA",
  },
  {
    id: "3",
    name: "Foreign Military Financing",
    description: "Military aid to foreign allies",
    annual_budget: 6000000000,
    department: "Department of State",
  },
  // Add more mock programs as needed
];

export default function ProgramList({
  selectedPrograms,
  onSelectProgram,
}: ProgramListProps) {
  const [search, setSearch] = useState("");

  const { data: programs, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      // For now, return mock data since we don't have the actual table yet
      return MOCK_PROGRAMS;
    },
  });

  const filteredPrograms = programs?.filter(
    (program) =>
      program.name.toLowerCase().includes(search.toLowerCase()) ||
      program.description.toLowerCase().includes(search.toLowerCase()) ||
      program.department.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search programs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Annual Budget</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading programs...
                </TableCell>
              </TableRow>
            ) : (
              filteredPrograms?.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{program.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {program.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{program.department}</TableCell>
                  <TableCell>{formatBudget(program.annual_budget)}</TableCell>
                  <TableCell>
                    <Button
                      variant={isSelected(program) ? "destructive" : "default"}
                      onClick={() => onSelectProgram(program)}
                      disabled={
                        selectedPrograms.length >= 7 && !isSelected(program)
                      }
                    >
                      {isSelected(program) ? "Remove" : "Draft"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}