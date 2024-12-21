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
    trackEmailEvent(variant, type, "impression");
  }, [variant, type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await trackEmailEvent(variant, type, "attempt", email);

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
            variant,
          },
        }
      );

      if (emailError) throw emailError;

      await trackEmailEvent(variant, type, "success", email);

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

  const commonProps = {
    email,
    setEmail,
    isSubmitting,
    onSubmit: handleSubmit,
    buttonText,
    buttonIcon,
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