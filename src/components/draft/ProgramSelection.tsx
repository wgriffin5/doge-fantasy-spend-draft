import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Program {
  id: string;
  name: string;
  annual_budget: number;
  department: string;
}

interface ProgramSelectionProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function ProgramSelection({ selectedIds, onChange }: ProgramSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: programs = [], isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("id, name, annual_budget, department")
        .order("name");

      if (error) throw error;
      return data as Program[];
    },
  });

  const filteredPrograms = programs.filter((program) =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (programId: string) => {
    const newSelection = selectedIds.includes(programId)
      ? selectedIds.filter(id => id !== programId)
      : [...selectedIds, programId];
    onChange(newSelection);
  };

  if (isLoading) {
    return <div>Loading programs...</div>;
  }

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search programs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          {filteredPrograms.map((program) => (
            <Card key={program.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={program.id}
                    checked={selectedIds.includes(program.id)}
                    onCheckedChange={() => handleToggle(program.id)}
                  />
                  <label
                    htmlFor={program.id}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    <div className="font-medium">{program.name}</div>
                    <div className="text-muted-foreground">
                      Department: {program.department}
                    </div>
                    <div className="text-muted-foreground">
                      Budget: ${(program.annual_budget / 1000000).toFixed(1)}M
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}