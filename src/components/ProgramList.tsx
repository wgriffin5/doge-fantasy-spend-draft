import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SearchBar from "./program/SearchBar";
import ProgramTable from "./program/ProgramTable";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
  is_cut: boolean;
}

interface ProgramListProps {
  selectedPrograms: Program[];
  onSelectProgram: (program: Program) => void;
}

export default function ProgramList({
  selectedPrograms,
  onSelectProgram,
}: ProgramListProps) {
  const [search, setSearch] = useState("");

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

  const filteredPrograms = programs?.filter(
    (program) =>
      program.name.toLowerCase().includes(search.toLowerCase()) ||
      program.description.toLowerCase().includes(search.toLowerCase()) ||
      program.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="rounded-lg border">
        <ProgramTable
          programs={filteredPrograms || []}
          isLoading={isLoading}
          selectedPrograms={selectedPrograms}
          onSelectProgram={onSelectProgram}
        />
      </div>
    </div>
  );
}