import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import useSound from "use-sound";
import { triggerCelebration } from "../draft/ConfettiCelebration";
import { VariantA } from "../email-capture/VariantA";
import { VariantB } from "../email-capture/VariantB";
import { VariantC } from "../email-capture/VariantC";
import { trackEmailEvent } from "@/utils/analytics";
import type { EmailCaptureVariant, EmailCaptureType } from "@/utils/analytics";

interface EmailSubmissionProps {
  onSuccess: (email: string) => void;
  type: EmailCaptureType;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  successMessage: string;
  className?: string;
  variant?: EmailCaptureVariant;
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

  useEffect(() => {
    console.log("Tracking impression for variant:", variant, "type:", type);
    trackEmailEvent(variant, type, "impression");
  }, [variant, type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    console.log("Starting email submission process...");
    setIsSubmitting(true);

    try {
      console.log("Tracking attempt event...");
      await trackEmailEvent(variant, type, "attempt", email);

      // First check if the email already exists
      const { data: existingPlayer } = await supabase
        .from('player_levels')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (!existingPlayer) {
        console.log("Inserting into player_levels...");
        const { error: dbError } = await supabase
          .from("player_levels")
          .insert([{ email, level: "rookie" }]);

        if (dbError && dbError.code !== '23505') { // Ignore unique constraint violations
          console.error("Database error:", dbError);
          throw dbError;
        }
      } else {
        console.log("Email already exists in player_levels");
      }

      console.log("Sending confirmation email...");
      const { error: emailError } = await supabase.functions.invoke(
        "send-confirmation",
        {
          body: {
            to: email,
            type,
            programNames: [],
            totalBudget: 0,
            variant,
          },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
        throw emailError;
      }

      console.log("Tracking success event...");
      await trackEmailEvent(variant, type, "success", email);

      console.log("Playing success sound and triggering celebration...");
      playSuccess();
      triggerCelebration();
      toast.success(successMessage);
      onSuccess(email);
      setEmail("");
    } catch (error: any) {
      console.error("Error in email submission:", error);
      toast.error("Failed to save your email. Please try again.");
    } finally {
      setIsSubmitting(false);
      console.log("Email submission process completed");
    }
  };

  const commonProps = {
    email,
    setEmail,
    isSubmitting,
    onSubmit: handleSubmit,
    buttonText,
    buttonIcon,
    className,
  };

  switch (variant) {
    case "B":
      return <VariantB {...commonProps} />;
    case "C":
      return <VariantC {...commonProps} />;
    default:
      return <VariantA {...commonProps} />;
  }
}