import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailData {
  to: string;
  programNames: string[];
  totalBudget: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to send confirmation email");
    const { to, programNames, totalBudget }: EmailData = await req.json();

    if (!RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    const formattedBudget = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(totalBudget);

    const programList = programNames
      .map((name) => `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</li>`)
      .join("");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(to right, #F2A900, #9B87F5); padding: 2px;">
          <div style="background: white; padding: 20px;">
            <h1 style="color: #333; margin-bottom: 20px;">Your Fantasy D.O.G.E. Draft Picks</h1>
            
            <p style="color: #666;">Thank you for participating in Fantasy D.O.G.E. - the Department of Government Efficiency Fantasy League!</p>
            
            <div style="background: #f7f7f7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; margin-bottom: 15px;">Your Draft Summary:</h2>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${programList}
              </ul>
              <p style="margin-top: 15px; font-weight: bold; color: #F2A900;">
                Total Budget Impact: ${formattedBudget}
              </p>
            </div>
            
            <p style="color: #666; margin-top: 20px;">
              Share your picks on social media and challenge your friends to make better cuts!
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.9em; color: #999;">
              Fantasy D.O.G.E. - Draft Oversight & Government Efficiency
            </div>
          </div>
        </div>
      </div>
    `;

    console.log("Sending email to:", to);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Fantasy D.O.G.E. <onboarding@resend.dev>",
        to: [to],
        subject: "Your Fantasy D.O.G.E. Draft Picks",
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Error sending email:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});