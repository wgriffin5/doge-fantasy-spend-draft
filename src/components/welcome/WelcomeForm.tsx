import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import useSound from "use-sound";
import { triggerCelebration } from "../draft/ConfettiCelebration";

interface WelcomeFormProps {
  onSuccess: () => void;
}

export default function WelcomeForm({ onSuccess }: WelcomeFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from("player_levels")
        .insert([{ email, level: "rookie" }]);

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-confirmation",
        {
          body: {
            to: email,
            type: "welcome",
            programNames: [],
            totalBudget: 0,
          },
        }
      );

      if (emailError) throw emailError;

      localStorage.setItem("hasSeenWelcomePopup", "true");
      playSuccess();
      triggerCelebration();
      toast.success("Welcome to Fantasy D.O.G.E.! Check your email for next steps.");
      onSuccess();
    } catch (error) {
      console.error("Error saving email:", error);
      toast.error("Failed to save your email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-doge-gold to-doge-purple"
        disabled={isSubmitting}
      >
        Start Tracking Predictions
      </Button>
    </form>
  );
}