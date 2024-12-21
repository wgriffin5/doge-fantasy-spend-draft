import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getWelcomeEmailContent } from "./templates/welcome.ts";
import { getDraftEmailContent } from "./templates/draft.ts";
import { getNotificationEmailContent } from "./templates/notification.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailData {
  to: string;
  type: "draft" | "welcome" | "notification";
  programNames: string[];
  totalBudget: number;
  variant?: "A" | "B" | "C";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, type, programNames, totalBudget, variant: requestedVariant }: EmailData = await req.json();

    // Randomly assign a variant if none is specified
    const getRandomVariant = (options: string[]): any => 
      options[Math.floor(Math.random() * options.length)];

    let emailContent;
    let variant;

    switch (type) {
      case "welcome":
        variant = requestedVariant || getRandomVariant(["A", "B", "C"]);
        emailContent = getWelcomeEmailContent({ variant });
        break;
      case "draft":
        variant = requestedVariant || getRandomVariant(["A", "B"]);
        emailContent = getDraftEmailContent({ 
          variant, 
          programNames, 
          totalBudget 
        });
        break;
      case "notification":
        variant = requestedVariant || getRandomVariant(["A", "B"]);
        emailContent = getNotificationEmailContent({ variant });
        break;
      default:
        throw new Error("Invalid email type");
    }

    console.log(`Sending ${type} email (variant ${variant}) to ${to}`);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Fantasy D.O.G.E. <onboarding@resend.dev>",
        to: [to],
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return new Response(JSON.stringify({ data, variant }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const error = await res.text();
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("Error in send-confirmation function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});