import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
}

interface DraftedProgramsProps {
  selectedPrograms: Program[];
  onRemoveProgram: (program: Program) => void;
}

export default function DraftedPrograms({
  selectedPrograms,
  onRemoveProgram,
}: DraftedProgramsProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalBudget = selectedPrograms.reduce(
    (sum, program) => sum + program.annual_budget,
    0
  );

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(budget);
  };

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (selectedPrograms.length === 0) {
      toast.error("Please draft at least one program");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("draft_picks").insert({
        email,
        program_ids: selectedPrograms.map((p) => p.id),
      });

      if (error) throw error;

      toast.success(
        "Draft picks saved! Check your email for a confirmation message."
      );
      setEmail("");
    } catch (error) {
      console.error("Error saving draft picks:", error);
      toast.error("Failed to save draft picks. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Draft Picks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedPrograms.length === 0 ? (
          <p className="text-muted-foreground">
            Draft up to 7 programs to cut from the federal budget.
          </p>
        ) : (
          <>
            <div className="space-y-2">
              {selectedPrograms.map((program) => (
                <div
                  key={program.id}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <div>
                    <div className="font-medium">{program.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatBudget(program.annual_budget)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveProgram(program)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <div className="mb-2 font-medium">
                Total Budget Cuts:{" "}
                <span className="text-doge-gold">
                  {formatBudget(totalBudget)}
                </span>
              </div>
            </div>
          </>
        )}
        <div className="space-y-2 pt-4">
          <Input
            type="email"
            placeholder="Enter your email to save picks"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Save Draft Picks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}