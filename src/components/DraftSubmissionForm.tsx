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
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Save the draft picks to the database with current status
      const { error: dbError } = await supabase.from("draft_picks").insert({
        email,
        program_ids: selectedPrograms.map((p) => p.id),
        status: selectedPrograms.length === 7 ? 'complete' : 'incomplete'
      });

      if (dbError) throw dbError;

      // Send confirmation email only if draft is complete
      if (selectedPrograms.length === 7) {
        const { error: emailError } = await supabase.functions.invoke('send-confirmation', {
          body: {
            to: email,
            type: "draft",
            programNames: selectedPrograms.map(p => p.name),
            totalBudget: totalBudget,
            variant: "A"
          }
        });

        if (emailError) {
          console.error("Error sending confirmation email:", emailError);
        }

        // Show success toast with more detailed message for complete drafts
        toast({
          title: "Draft submitted successfully! 🎉",
          description: `Your ${selectedPrograms.length} program picks have been recorded and a confirmation email has been sent to ${email}. Total budget cuts: ${formatBudget(totalBudget)}`,
          duration: 5000,
        });
      } else {
        // Show different message for incomplete drafts
        toast({
          title: "Email saved! 📧",
          description: "We'll notify you when you're ready to complete your draft picks.",
          duration: 5000,
        });
      }

      // Track email capture analytics
      await supabase.from("email_capture_analytics").insert({
        email,
        type: "draft",
        event_type: selectedPrograms.length === 7 ? "complete" : "incomplete",
        variant: "A"
      });

      console.log("Email captured successfully:", email);
      onEmailSubmit(email);
    } catch (error) {
      console.error("Error submitting draft:", error);
      toast({
        title: "Error saving email",
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
        disabled={isSubmitting || !email}
        className="w-full"
      >
        {isSubmitting ? "Saving..." : (selectedPrograms.length === 7 ? "Submit Complete Draft" : "Save Progress")}
      </Button>
    </motion.form>
  );
}