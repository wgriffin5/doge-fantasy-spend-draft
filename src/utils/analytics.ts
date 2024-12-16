import { supabase } from "@/integrations/supabase/client";

export type EmailCaptureVariant = "A" | "B" | "C";
export type EmailCaptureType = "welcome" | "notification" | "draft";
export type EventType = "impression" | "attempt" | "success";

export const trackEmailEvent = async (
  variant: EmailCaptureVariant,
  type: EmailCaptureType,
  eventType: EventType,
  email?: string
) => {
  try {
    await supabase
      .from("email_capture_analytics")
      .insert([
        {
          variant,
          type,
          event_type: eventType,
          ...(email && { email }),
        },
      ]);
  } catch (error) {
    console.error("Failed to track email event:", error);
  }
};