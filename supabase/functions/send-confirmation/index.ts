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
  variant?: "A" | "B";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, type, programNames, totalBudget, variant = Math.random() < 0.5 ? "A" : "B" }: EmailData = await req.json();

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
        emailSubject = variant === "A" 
          ? "Your Fantasy D.O.G.E. Draft Picks" 
          : "🎯 Your Government Efficiency Picks Are In!";
        
        const programList = programNames
          .map((name) => `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</li>`)
          .join("");

        emailContent = variant === "A" ? `
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
        ` : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1a1a1a; padding: 20px; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #F2A900; font-size: 28px; margin-bottom: 10px;">🎯 Your Efficiency Picks Are Locked In!</h1>
                <p style="color: #fff; font-size: 16px;">You're now part of an elite group of government efficiency experts</p>
              </div>
              
              <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #9B87F5; margin-bottom: 15px;">Programs You're Tracking:</h2>
                <ul style="list-style: none; padding: 0; margin: 0; color: #fff;">
                  ${programList}
                </ul>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #3a3a3a;">
                  <span style="color: #F2A900; font-size: 20px; font-weight: bold;">Total Budget Under Watch: ${formattedBudget}</span>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #9B87F5; font-size: 18px;">Ready to make an impact?</p>
                <a href="https://fantasy-doge.com" 
                   style="display: inline-block; background: #F2A900; color: #1a1a1a; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">
                  Track Your Predictions
                </a>
              </div>
            </div>
          </div>
        `;
        break;

      case "welcome":
        emailSubject = variant === "A" 
          ? "🎮 Welcome to Fantasy D.O.G.E. - Let's Make Government Efficient!" 
          : "🚀 Your Journey to Government Reform Starts Now!";
        
        emailContent = variant === "A" ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #F2A900, #9B87F5); padding: 2px;">
              <div style="background: white; padding: 20px;">
                <h1 style="color: #333; margin-bottom: 20px;">Welcome to the Game of Government Efficiency! 🎯</h1>
                
                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                  You've just joined an exciting community of over 1,000 players who are revolutionizing how we think about government spending. Get ready for an adventure in fiscal responsibility!
                </p>
                
                <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h2 style="color: #333; margin-bottom: 15px;">🚀 Your Next Steps:</h2>
                  <ol style="color: #666; padding-left: 20px; margin: 0;">
                    <li style="margin-bottom: 10px;">Browse through federal programs and their budgets</li>
                    <li style="margin-bottom: 10px;">Make your first prediction about potential budget cuts</li>
                    <li style="margin-bottom: 10px;">Join the leaderboard and compete with other reform advocates</li>
                    <li style="margin-bottom: 10px;">Share your insights with our growing community</li>
                  </ol>
                </div>

                <div style="background: #FFF3E0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #F2A900; margin-bottom: 10px;">🏆 Did You Know?</h3>
                  <p style="color: #666; margin: 0;">
                    Our top players have identified over $50B in potential savings! Your predictions could be next to make headlines.
                  </p>
                </div>

                <div style="background: #F3F0FF; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #9B87F5; margin-bottom: 10px;">📅 What's Coming Up</h3>
                  <ul style="color: #666; padding-left: 20px; margin: 0;">
                    <li style="margin-bottom: 5px;">Weekly leaderboard updates</li>
                    <li style="margin-bottom: 5px;">New program releases</li>
                    <li style="margin-bottom: 5px;">Community challenges</li>
                    <li>Special events and competitions</li>
                  </ul>
                </div>
                
                <p style="color: #666; margin-top: 20px; font-style: italic;">
                  "The best way to predict the future is to create it." - Start making your predictions today!
                </p>

                <div style="text-align: center; margin-top: 30px;">
                  <a href="https://fantasy-doge.com" 
                     style="background: #F2A900; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Start Making Predictions
                  </a>
                </div>

                <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
                  You're receiving this email because you joined Fantasy D.O.G.E. - the Department of Government Efficiency Fantasy League.
                  <br>Stay tuned for weekly updates on government efficiency and reform!
                </p>
              </div>
            </div>
          </div>
        ` : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1a1a1a; padding: 30px; border-radius: 12px; color: #fff;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #F2A900; font-size: 32px; margin-bottom: 15px;">Welcome to the Revolution! 🚀</h1>
                <p style="color: #9B87F5; font-size: 18px;">You're now part of an elite force changing government forever</p>
              </div>
              
              <div style="background: #2a2a2a; padding: 25px; border-radius: 8px; margin: 30px 0;">
                <h2 style="color: #F2A900; margin-bottom: 20px;">Your Mission, Should You Choose to Accept It:</h2>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="padding: 12px 0; border-bottom: 1px solid #3a3a3a;">
                    <span style="color: #9B87F5;">Step 1:</span> Scout government programs
                  </li>
                  <li style="padding: 12px 0; border-bottom: 1px solid #3a3a3a;">
                    <span style="color: #9B87F5;">Step 2:</span> Identify inefficiencies
                  </li>
                  <li style="padding: 12px 0; border-bottom: 1px solid #3a3a3a;">
                    <span style="color: #9B87F5;">Step 3:</span> Make bold predictions
                  </li>
                  <li style="padding: 12px 0;">
                    <span style="color: #9B87F5;">Step 4:</span> Rise through the ranks
                  </li>
                </ul>
              </div>

              <div style="background: #2a2a2a; padding: 25px; border-radius: 8px; margin: 30px 0;">
                <h2 style="color: #F2A900; margin-bottom: 20px;">🏆 The Hall of Fame Awaits</h2>
                <p style="color: #fff; font-size: 16px; line-height: 1.6;">
                  Our community has already identified over <span style="color: #F2A900; font-weight: bold;">$50 BILLION</span> 
                  in potential savings. Your insights could be the next breakthrough in government efficiency.
                </p>
              </div>

              <div style="text-align: center; margin-top: 40px;">
                <a href="https://fantasy-doge.com" 
                   style="display: inline-block; background: #F2A900; color: #1a1a1a; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px;">
                  Begin Your Mission
                </a>
              </div>

              <p style="color: #666; font-size: 14px; margin-top: 40px; text-align: center;">
                This message will self-destruct in... just kidding! But the opportunity to make history won't wait forever.
              </p>
            </div>
          </div>
        `;
        break;

      case "notification":
        emailSubject = variant === "A" 
          ? "You're Now Following Fantasy D.O.G.E. Updates" 
          : "🔔 Your Government Reform Updates Are Ready!";
        
        emailContent = variant === "A" ? `
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
        ` : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1a1a1a; padding: 30px; border-radius: 12px;">
              <div style="text-align: center;">
                <h1 style="color: #F2A900; font-size: 28px; margin-bottom: 20px;">🔔 You're Plugged Into the Reform Network!</h1>
                <p style="color: #fff; font-size: 16px;">Get ready for exclusive insights and real-time updates</p>
              </div>
              
              <div style="background: #2a2a2a; padding: 25px; border-radius: 8px; margin: 30px 0;">
                <h2 style="color: #9B87F5; margin-bottom: 20px;">Your Intel Package Includes:</h2>
                <ul style="list-style: none; padding: 0; margin: 0; color: #fff;">
                  <li style="padding: 12px 0; border-bottom: 1px solid #3a3a3a;">
                    <span style="color: #F2A900;">⚡</span> Instant Budget Cut Alerts
                  </li>
                  <li style="padding: 12px 0; border-bottom: 1px solid #3a3a3a;">
                    <span style="color: #F2A900;">📊</span> Efficiency Metrics & Trends
                  </li>
                  <li style="padding: 12px 0; border-bottom: 1px solid #3a3a3a;">
                    <span style="color: #F2A900;">🏆</span> Community Achievement Updates
                  </li>
                  <li style="padding: 12px 0;">
                    <span style="color: #F2A900;">🎉</span> Exclusive Features & Events
                  </li>
                </ul>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #9B87F5; font-size: 18px;">Ready to take action?</p>
                <a href="https://fantasy-doge.com" 
                   style="display: inline-block; background: #F2A900; color: #1a1a1a; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">
                  Make Your First Prediction
                </a>
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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});