import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getWelcomeEmailContent } from "./templates/welcome.ts";
import { getDraftEmailContent } from "./templates/draft.ts";
import { getNotificationEmailContent } from "./templates/notification.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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
  variant?: "A" | "B" | "C" | "D";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const { to, type, programNames, totalBudget, variant: requestedVariant }: EmailData = await req.json();

    // Extract origin from request headers
    const origin = req.headers.get("origin") || "https://fantasy-doge.com";
    Deno.env.set("PUBLIC_SITE_URL", origin);

    // Get user data for dynamic content
    const { data: playerLevel } = await supabase
      .from('player_levels')
      .select('level, predictions_made')
      .eq('email', to)
      .single();

    const { data: predictions } = await supabase
      .from('reform_predictions')
      .select('id')
      .eq('email', to);

    const userEngagement = {
      predictionsCount: predictions?.length || 0,
      lastVisit: new Date(), // You might want to track this in a separate table
    };

    // Randomly assign a variant if none is specified
    const variants = ["A", "B", "C", "D"];
    const variant = requestedVariant || variants[Math.floor(Math.random() * variants.length)] as "A" | "B" | "C" | "D";

    console.log(`Sending ${type} email (variant ${variant}) to ${to}`);

    let emailContent;
    switch (type) {
      case "welcome":
        emailContent = getWelcomeEmailContent({ 
          variant,
          userLevel: playerLevel?.level,
          predictionsCount: playerLevel?.predictions_made
        });
        break;
      case "draft":
        emailContent = getDraftEmailContent({ 
          variant, 
          programNames, 
          totalBudget,
          predictionsCount: predictions?.length || 0
        });
        break;
      case "notification":
        emailContent = getNotificationEmailContent({ 
          variant,
          userEngagement
        });
        break;
      default:
        throw new Error("Invalid email type");
    }

    // Track which variant was sent
    await supabase
      .from('email_capture_analytics')
      .insert([
        {
          variant,
          type,
          event_type: 'sent',
          email: to
        }
      ]);

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
