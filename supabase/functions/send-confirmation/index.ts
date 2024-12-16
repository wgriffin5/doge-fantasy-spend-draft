import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, type, programNames, totalBudget }: EmailData = await req.json();

    if (!RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    let emailSubject = "";
    let emailContent = "";

    const formattedBudget = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(totalBudget);

    switch (type) {
      case "draft":
        emailSubject = "Your Fantasy D.O.G.E. Draft Picks";
        const programList = programNames
          .map((name) => `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</li>`)
          .join("");
        emailContent = `
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
              </div>
            </div>
          </div>
        `;
        break;

      case "welcome":
        emailSubject = "Welcome to Fantasy D.O.G.E.!";
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #F2A900, #9B87F5); padding: 2px;">
              <div style="background: white; padding: 20px;">
                <h1 style="color: #333; margin-bottom: 20px;">Welcome to Fantasy D.O.G.E.!</h1>
                
                <p style="color: #666;">Thank you for joining the Department of Government Efficiency Fantasy League!</p>
                
                <div style="background: #f7f7f7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h2 style="color: #333; margin-bottom: 15px;">What's Next?</h2>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">Browse federal programs and their budgets</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">Make predictions about potential budget cuts</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">Compete with other players on the leaderboard</li>
                    <li style="padding: 8px 0;">Get notified when your predictions come true!</li>
                  </ul>
                </div>
                
                <p style="color: #666; margin-top: 20px;">
                  Start making your predictions now and help identify government inefficiencies!
                </p>
              </div>
            </div>
          </div>
        `;
        break;

      case "notification":
        emailSubject = "You're Now Following Fantasy D.O.G.E. Updates";
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #F2A900, #9B87F5); padding: 2px;">
              <div style="background: white; padding: 20px;">
                <h1 style="color: #333; margin-bottom: 20px;">You're All Set!</h1>
                
                <p style="color: #666;">You'll now receive important updates about Fantasy D.O.G.E. and government efficiency reforms.</p>
                
                <div style="background: #f7f7f7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h2 style="color: #333; margin-bottom: 15px;">What You'll Get:</h2>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">Real-time budget cut notifications</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">Program efficiency updates</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">Important milestone alerts</li>
                    <li style="padding: 8px 0;">Special announcements and features</li>
                  </ul>
                </div>
                
                <p style="color: #666; margin-top: 20px;">
                  Want to do more? Make predictions and compete with other players on Fantasy D.O.G.E.!
                </p>
              </div>
            </div>
          </div>
        `;
        break;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Fantasy D.O.G.E. <onboarding@resend.dev>",
        to: [to],
        subject: emailSubject,
        html: emailContent,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return new Response(JSON.stringify(data), {
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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});