import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SearchFilters from "./program/SearchFilters";
import BudgetChart from "./program/BudgetChart";
import ProgramCard from "./program/ProgramCard";
import ProgramListItem from "./program/ProgramListItem";

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
  const [department, setDepartment] = useState<string>("all");
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
        (department === "all" || program.department === department)
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

  if (isLoading) {
    return <div>Loading programs...</div>;
  }

  return (
    <div className="space-y-6">
      <SearchFilters
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        sortBy={sortBy}
        setSortBy={setSortBy}
        view={view}
        setView={setView}
        departments={departments}
      />

      <BudgetChart programs={filteredPrograms || []} formatBudget={formatBudget} />

      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-4"
        }
      >
        {filteredPrograms?.map((program) =>
          view === "grid" ? (
            <ProgramCard
              key={program.id}
              program={program}
              isSelected={isSelected(program)}
              onSelect={() => onSelectProgram(program)}
              selectedCount={selectedPrograms.length}
              formatBudget={formatBudget}
            />
          ) : (
            <ProgramListItem
              key={program.id}
              program={program}
              isSelected={isSelected(program)}
              onSelect={() => onSelectProgram(program)}
              selectedCount={selectedPrograms.length}
              formatBudget={formatBudget}
            />
          )
        )}
      </div>
    </div>
  );
}