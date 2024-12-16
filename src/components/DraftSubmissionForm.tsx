import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import useSound from "use-sound";
import EmailInput from "./draft/EmailInput";
import SubmitButton from "./draft/SubmitButton";
import { triggerCelebration } from "./draft/ConfettiCelebration";
import { motion } from "framer-motion";
import { Trophy, Bell, Share2 } from "lucide-react";

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
  onEmailSubmit,
}: DraftSubmissionFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (selectedPrograms.length === 0) {
      toast.error("Please draft at least one program");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Submitting your draft picks...");

    try {
      const { error: dbError } = await supabase.from("draft_picks").insert({
        email,
        program_ids: selectedPrograms.map((p) => p.id),
      });

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-confirmation",
        {
          body: {
            to: email,
            programNames: selectedPrograms.map((p) => p.name),
            totalBudget: selectedPrograms.reduce((sum, p) => sum + p.annual_budget, 0),
          },
        }
      );

      if (emailError) {
        throw new Error(emailError.message || "Failed to send confirmation email");
      }

      playSuccess();
      triggerCelebration();
      toast.success("Draft picks saved! Check your email for a confirmation message.");
      onEmailSubmit(email);
      setEmail("");
    } catch (error) {
      console.error("Error saving draft picks:", error);
      toast.error(error.message || "Failed to save draft picks. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="grid gap-4 rounded-lg border bg-card p-4">
        <h3 className="font-semibold">Why Join Fantasy D.O.G.E?</h3>
        <div className="grid gap-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm"
          >
            <Trophy className="h-4 w-4 text-doge-gold" />
            <span>Compete for the top spot on our leaderboard</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-sm"
          >
            <Bell className="h-4 w-4 text-doge-gold" />
            <span>Get notified when your predictions come true</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-sm"
          >
            <Share2 className="h-4 w-4 text-doge-gold" />
            <span>Share your picks and challenge friends</span>
          </motion.div>
        </div>
      </div>

      <EmailInput email={email} setEmail={setEmail} isSubmitting={isSubmitting} />
      <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
    </div>
  );
}