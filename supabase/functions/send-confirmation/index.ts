import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string;
  programNames: string[];
  totalBudget: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, programNames, totalBudget } = await req.json() as EmailRequest;
    console.log("Sending confirmation email to:", to);
    
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const formattedBudget = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(totalBudget);

    const programList = programNames.map(name => `• ${name}`).join('\n');

    const { data, error } = await resend.emails.send({
      from: 'Fantasy DOGE <onboarding@resend.dev>',
      to: [to],
      subject: 'Your Fantasy D.O.G.E. Draft Picks',
      html: `
        <h1>Thanks for participating in Fantasy D.O.G.E.!</h1>
        <p>Here are your draft picks for potential budget cuts:</p>
        <pre>${programList}</pre>
        <p>Total potential budget cuts: ${formattedBudget}</p>
        <p>We'll notify you if any of your drafted programs get cut or streamlined!</p>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw error;
    }

    console.log("Email sent successfully:", data);
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in send-confirmation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});