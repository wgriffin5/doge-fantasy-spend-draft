import { useState, useEffect } from "react";
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
  variant?: "A" | "B" | "C";
}

export default function EmailSubmission({
  onSuccess,
  type,
  buttonText,
  buttonIcon,
  successMessage,
  className = "",
  variant = "A",
}: EmailSubmissionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });

  // Track form view
  useEffect(() => {
    const trackImpression = async () => {
      try {
        await supabase
          .from("email_capture_analytics")
          .insert([
            {
              variant,
              type,
              event_type: "impression",
            },
          ]);
      } catch (error) {
        console.error("Failed to track impression:", error);
      }
    };

    trackImpression();
  }, [variant, type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track submission attempt
      await supabase
        .from("email_capture_analytics")
        .insert([
          {
            variant,
            type,
            event_type: "attempt",
            email,
          },
        ]);

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

      // Track successful submission
      await supabase
        .from("email_capture_analytics")
        .insert([
          {
            variant,
            type,
            event_type: "success",
            email,
          },
        ]);

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

  // Render different variants
  const renderVariant = () => {
    switch (variant) {
      case "B":
        return (
          <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className}`}>
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
              className="w-full bg-gradient-to-r from-doge-gold to-doge-purple"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  {buttonIcon}
                  <span>{buttonText}</span>
                </div>
              )}
            </Button>
          </form>
        );
      
      case "C":
        return (
          <form onSubmit={handleSubmit} className={`bg-secondary/50 p-4 rounded-lg ${className}`}>
            <div className="text-sm font-medium mb-2">Join thousands of players!</div>
            <div className="flex gap-2">
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
                className="bg-gradient-to-r from-doge-gold to-doge-purple whitespace-nowrap"
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
            </div>
          </form>
        );
      
      default: // Variant A - Original design
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
  };

  return renderVariant();
}