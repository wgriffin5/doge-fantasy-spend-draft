import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatBudget } from "@/utils/formatters";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
  is_cut: boolean;
}

interface ProgramTableProps {
  programs: Program[];
  isLoading: boolean;
  selectedPrograms: Program[];
  onSelectProgram: (program: Program) => void;
}

export default function ProgramTable({
  programs,
  isLoading,
  selectedPrograms,
  onSelectProgram,
}: ProgramTableProps) {
  const isSelected = (program: Program) =>
    selectedPrograms.some((p) => p.id === program.id);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Program</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Annual Budget</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Loading programs...
            </TableCell>
          </TableRow>
        ) : (
          programs?.map((program) => (
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
                {program.is_cut ? (
                  <Badge variant="destructive">Cut</Badge>
                ) : (
                  <Badge variant="secondary">Active</Badge>
                )}
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}