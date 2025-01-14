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
      // First, save the draft picks to the database
      const { error: dbError } = await supabase.from("draft_picks").insert({
        email,
        program_ids: selectedPrograms.map((p) => p.id),
      });

      if (dbError) throw dbError;

      // Then, send the confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-confirmation', {
        body: {
          to: email,
          type: "draft",
          programNames: selectedPrograms.map(p => p.name),
          totalBudget: totalBudget,
          variant: "A" // Using variant A for draft confirmation emails
        }
      });

      if (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't throw here - we still want to complete the submission even if email fails
      }

      // Show success toast with more detailed message
      toast({
        title: "Draft submitted successfully! 🎉",
        description: `Your ${selectedPrograms.length} program picks have been recorded and a confirmation email has been sent to ${email}. Total budget cuts: ${formatBudget(totalBudget)}`,
        duration: 5000, // Show for 5 seconds
      });

      onEmailSubmit(email);
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