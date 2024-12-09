import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import useSound from "use-sound";

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
}

export default function DraftSubmissionForm({
  selectedPrograms,
  totalBudget,
  formatBudget,
}: DraftSubmissionFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });

  const triggerCelebration = () => {
    playSuccess();

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#F2A900", "#9B87F5", "#28A0F0"],
    });

    fire(0.2, {
      spread: 60,
      colors: ["#F2A900", "#9B87F5", "#28A0F0"],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ["#F2A900", "#9B87F5", "#28A0F0"],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ["#F2A900", "#9B87F5", "#28A0F0"],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ["#F2A900", "#9B87F5", "#28A0F0"],
    });
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
    console.log("Submitting draft picks...");

    try {
      const { error: dbError } = await supabase.from("draft_picks").insert({
        email,
        program_ids: selectedPrograms.map((p) => p.id),
      });

      if (dbError) {
        console.error("Database error:", dbError);
        throw dbError;
      }

      console.log("Draft picks saved to database, sending confirmation email...");

      const { error: emailError } = await supabase.functions.invoke(
        "send-confirmation",
        {
          body: {
            to: email,
            programNames: selectedPrograms.map((p) => p.name),
            totalBudget,
          },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
        throw new Error(emailError.message || "Failed to send confirmation email");
      }

      triggerCelebration();
      
      toast.success(
        "Draft picks saved! Check your email for a confirmation message."
      );
      setEmail("");
    } catch (error) {
      console.error("Error saving draft picks:", error);
      toast.error(
        error.message || "Failed to save draft picks. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-2 pt-4">
      <Input
        type="email"
        placeholder="Enter your email to save picks"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        className="w-full bg-gradient-to-r from-doge-gold to-doge-purple hover:from-doge-gold/90 hover:to-doge-purple/90"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Draft Picks"}
      </Button>
    </div>
  );
}