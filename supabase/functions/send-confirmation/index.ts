import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  programNames: string[];
  totalBudget: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, programNames, totalBudget } = await req.json() as EmailRequest;
    
    const formattedBudget = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(totalBudget);

    const programList = programNames.map((name) => `• ${name}`).join("\n");

    const socialLinks = `
      <div style="margin-top: 20px; text-align: center;">
        <p style="margin-bottom: 10px;">Join our community and share your picks!</p>
        <a href="https://www.reddit.com/r/FantasyDoge/" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #FF4500; color: white; text-decoration: none; border-radius: 5px;">Join Reddit Community</a>
        <a href="https://twitter.com/intent/tweet?text=Join%20Fantasy%20D.O.G.E.%20-%20The%20Government%20Efficiency%20Fantasy%20League!%20Draft%20federal%20spending%20programs%20and%20compete%20with%20friends%20to%20cut%20wasteful%20spending.%20🚀✂️💰&url=https://www.reddit.com/r/FantasyDoge/" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #1DA1F2; color: white; text-decoration: none; border-radius: 5px;">Share on X</a>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Fantasy DOGE <onboarding@resend.dev>",
      to: [to],
      subject: "Your Fantasy D.O.G.E. Draft Picks",
      html: `
        <h1>Thanks for participating in Fantasy D.O.G.E.!</h1>
        <p>Here are your draft picks for potential budget cuts:</p>
        <pre>${programList}</pre>
        <p>Total potential budget cuts: ${formattedBudget}</p>
        <p>We'll notify you if any of your drafted programs get cut or streamlined!</p>
        ${socialLinks}
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw error;
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Error in send-confirmation function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);