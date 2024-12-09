import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

const formatBudget = (budget: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(budget);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, programNames, totalBudget } = await req.json() as EmailRequest;

    const programList = programNames
      .map((name) => `  • ${name}`)
      .join("\n");

    const html = `
      <h2>Your D.O.G.E. Draft Picks</h2>
      <p>Thank you for participating in Fantasy D.O.G.E.! Here are your draft picks:</p>
      <pre>${programList}</pre>
      <p>Total potential budget cuts: ${formatBudget(totalBudget)}</p>
      <p>We'll notify you when any of these programs get cut or modified!</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Fantasy DOGE <onboarding@resend.dev>",
        to: [to],
        subject: "Your Fantasy D.O.G.E. Draft Picks",
        html: html,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send confirmation email" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);