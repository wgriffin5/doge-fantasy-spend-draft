interface WelcomeEmailData {
  variant: "A" | "B" | "C" | "D";
  userLevel?: string;
  predictionsCount?: number;
}

export const getWelcomeEmailContent = ({ variant, userLevel = "rookie", predictionsCount = 0 }: WelcomeEmailData) => {
  const subjects = {
    A: "🐕 Welcome to Fantasy D.O.G.E.!",
    B: "🎮 Your Government Efficiency Adventure Begins!",
    C: "🐾 Join the Pack at Fantasy D.O.G.E.!",
    D: "🎯 Ready to Play Fantasy D.O.G.E.?"
  };

  // Base URL for the application - using window.location.origin in the edge function
  const baseUrl = "https://fantasy-doge.com";

  const templates = {
    A: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(to right, #F2A900, #9B87F5); padding: 2px;">
          <div style="background: white; padding: 30px; border-radius: 8px;">
            <h1 style="color: #333; margin-bottom: 20px;">Welcome to Fantasy D.O.G.E.! 🐕💰</h1>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Where government efficiency meets... fantasy sports? Yeah, we went there.
            </p>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              You're officially part of the most exciting (and possibly only) game where saving taxpayer dollars is the ultimate flex.
            </p>

            <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; margin-bottom: 15px;">🎮 Time to Make Your Picks!</h2>
              <p style="color: #666; line-height: 1.6;">
                The clock's ticking, and the government isn't going to reform itself (we checked). Click below to dive back in, make your draft picks, and show everyone you've got what it takes to sniff out the savings.
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${baseUrl}/program-grid" 
                 style="display: inline-block; background: #F2A900; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px;">
                Return to the Game
              </a>
            </div>

            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Let's make some efficiency magic happen.
            </p>

            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-top: 20px;">
              The Fantasy D.O.G.E. Team 🐾
            </p>
          </div>
        </div>
      </div>
    `,
    B: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1a1a1a; padding: 30px; border-radius: 12px; color: #fff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #F2A900; font-size: 32px; margin-bottom: 15px;">Welcome to Fantasy D.O.G.E.! 🐕💰</h1>
            <p style="color: #9B87F5; font-size: 18px;">Where government efficiency meets... fantasy sports? Yeah, we went there.</p>
          </div>
          
          <p style="color: #fff; font-size: 16px; line-height: 1.6;">
            You're officially part of the most exciting (and possibly only) game where saving taxpayer dollars is the ultimate flex.
          </p>

          <div style="background: #2a2a2a; padding: 25px; border-radius: 8px; margin: 30px 0;">
            <h2 style="color: #F2A900; margin-bottom: 20px;">🎮 Time to Make Your Picks!</h2>
            <p style="color: #fff; line-height: 1.6;">
              The clock's ticking, and the government isn't going to reform itself (we checked). Click below to dive back in, make your draft picks, and show everyone you've got what it takes to sniff out the savings.
            </p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/program-grid" 
               style="display: inline-block; background: #F2A900; color: #1a1a1a; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px;">
              Return to the Game
            </a>
          </div>

          <p style="color: #fff; font-size: 16px; line-height: 1.6;">
            Let's make some efficiency magic happen.
          </p>

          <p style="color: #F2A900; font-size: 16px; line-height: 1.6; margin-top: 20px;">
            The Fantasy D.O.G.E. Team 🐾
          </p>
        </div>
      </div>
    `,
    C: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #F2A900, #9B87F5); padding: 2px;">
          <div style="background: white; padding: 30px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; font-size: 28px; margin-bottom: 15px;">Welcome to Fantasy D.O.G.E.! 🐕💰</h1>
              <p style="color: #666; font-size: 16px;">Where government efficiency meets... fantasy sports? Yeah, we went there.</p>
            </div>

            <p style="color: #666; line-height: 1.6;">
              You're officially part of the most exciting (and possibly only) game where saving taxpayer dollars is the ultimate flex.
            </p>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #F2A900; margin-bottom: 15px;">🎮 Time to Make Your Picks!</h2>
              <p style="color: #666; line-height: 1.6;">
                The clock's ticking, and the government isn't going to reform itself (we checked). Click below to dive back in, make your draft picks, and show everyone you've got what it takes to sniff out the savings.
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${baseUrl}/program-grid" 
                 style="display: inline-block; background: linear-gradient(to right, #F2A900, #9B87F5); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Return to the Game
              </a>
            </div>

            <p style="color: #666; line-height: 1.6;">
              Let's make some efficiency magic happen.
            </p>

            <p style="color: #666; line-height: 1.6; margin-top: 20px;">
              The Fantasy D.O.G.E. Team 🐾
            </p>
          </div>
        </div>
      </div>
    `,
    D: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6366F1, #4F46E5); padding: 2px;">
          <div style="background: white; padding: 30px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4F46E5; font-size: 28px; margin-bottom: 15px;">Welcome to Fantasy D.O.G.E.! 🐕💰</h1>
              <p style="color: #666; font-size: 16px;">Where government efficiency meets... fantasy sports? Yeah, we went there.</p>
            </div>

            <p style="color: #666; line-height: 1.6;">
              You're officially part of the most exciting (and possibly only) game where saving taxpayer dollars is the ultimate flex.
            </p>

            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #4F46E5; margin-bottom: 15px;">🎮 Time to Make Your Picks!</h2>
              <p style="color: #666; line-height: 1.6;">
                The clock's ticking, and the government isn't going to reform itself (we checked). Click below to dive back in, make your draft picks, and show everyone you've got what it takes to sniff out the savings.
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${baseUrl}/program-grid" 
                 style="display: inline-block; background: linear-gradient(to right, #6366F1, #4F46E5); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Return to the Game
              </a>
            </div>

            <p style="color: #666; line-height: 1.6;">
              Let's make some efficiency magic happen.
            </p>

            <p style="color: #666; line-height: 1.6; margin-top: 20px;">
              The Fantasy D.O.G.E. Team 🐾
            </p>
          </div>
        </div>
      </div>
    `
  };

  return {
    subject: subjects[variant],
    html: templates[variant]
  };
};