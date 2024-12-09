import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
  is_cut: boolean;
  cut_date: string | null;
  cut_amount: number | null;
}

export default function Admin() {
  const { toast } = useToast();
  const [cutAmounts, setCutAmounts] = useState<Record<string, string>>({});

  const { data: programs, refetch } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("annual_budget", { ascending: false });

      if (error) throw error;
      return data as Program[];
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

  const handleCutProgram = async (program: Program) => {
    const cutAmount = Number(cutAmounts[program.id]) || program.annual_budget;
    
    if (cutAmount > program.annual_budget) {
      toast({
        title: "Invalid cut amount",
        description: "Cut amount cannot exceed program budget",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("programs")
      .update({
        is_cut: true,
        cut_date: new Date().toISOString(),
        cut_amount: cutAmount,
      })
      .eq("id", program.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to cut program",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `${program.name} has been cut`,
    });

    refetch();
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Annual Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cut Amount</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs?.map((program) => (
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
                  {!program.is_cut && (
                    <Input
                      type="number"
                      placeholder="Cut amount"
                      value={cutAmounts[program.id] || ""}
                      onChange={(e) =>
                        setCutAmounts({
                          ...cutAmounts,
                          [program.id]: e.target.value,
                        })
                      }
                    />
                  )}
                  {program.is_cut && program.cut_amount && (
                    <span>{formatBudget(program.cut_amount)}</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleCutProgram(program)}
                    disabled={program.is_cut}
                  >
                    Cut Program
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}