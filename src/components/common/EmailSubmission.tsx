import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import useSound from "use-sound";
import { triggerCelebration } from "../draft/ConfettiCelebration";

interface EmailSubmissionProps {
  onSuccess: (email: string) => void;
  type: "welcome" | "notification" | "draft";
  buttonText: string;
  buttonIcon?: React.ReactNode;
  successMessage: string;
  className?: string;
}

export default function EmailSubmission({
  onSuccess,
  type,
  buttonText,
  buttonIcon,
  successMessage,
  className = "",
}: EmailSubmissionProps) {
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
            type,
            programNames: [],
            totalBudget: 0,
          },
        }
      );

      if (emailError) throw emailError;

      playSuccess();
      triggerCelebration();
      toast.success(successMessage);
      onSuccess(email);
      setEmail("");
    } catch (error) {
      console.error("Error saving email:", error);
      toast.error("Failed to save your email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
        disabled={isSubmitting}
      />
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-gradient-to-r from-doge-gold to-doge-purple"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Saving...</span>
          </div>
        ) : (
          <div className="flex items-center">
            {buttonIcon}
            <span>{buttonText}</span>
          </div>
        )}
      </Button>
    </form>
  );
}