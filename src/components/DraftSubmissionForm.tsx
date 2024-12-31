import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
}

interface DraftSubmissionFormProps {
  selectedPrograms: Program[];
  totalBudget: number;
  formatBudget: (budget: number) => string;
  onEmailSubmit: (email: string) => void;
}

export default function DraftSubmissionForm({
  selectedPrograms,
  totalBudget,
  formatBudget,
  onEmailSubmit,
}: DraftSubmissionFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || selectedPrograms.length === 0) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("draft_picks").insert({
        email,
        program_ids: selectedPrograms.map((p) => p.id),
      });

      if (error) throw error;

      onEmailSubmit(email);
      toast({
        title: "Draft submitted successfully! 🎉",
        description: `Total budget cuts: ${formatBudget(totalBudget)}`,
      });
    } catch (error) {
      console.error("Error submitting draft:", error);
      toast({
        title: "Error submitting draft",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (selectedPrograms.length === 0) return null;

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Enter your email to save draft"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || !email || selectedPrograms.length === 0}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Submit Draft"}
      </Button>
    </motion.form>
  );
}