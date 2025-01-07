interface WelcomeEmailParams {
  variant: "A" | "B" | "C" | "D";
  userLevel?: string;
  predictionsCount?: number;
  baseUrl: string;
}

export const getWelcomeEmailContent = ({ variant, userLevel, predictionsCount, baseUrl }: WelcomeEmailParams) => {
  const subjects = {
    A: "Welcome to Fantasy D.O.G.E.! 🎮",
    B: "Your Journey to Government Efficiency Begins! 🚀",
    C: "Time to Play Fantasy D.O.G.E.! 🎯",
    D: "🎯 Ready to Play Fantasy D.O.G.E.?"
  };

  const templates = {
    A: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4F46E5; text-align: center;">Welcome to Fantasy D.O.G.E.! 🐕💰</h1>
        <p>Where government efficiency meets... fantasy sports? Yeah, we went there.</p>
        <p>You're officially part of the most exciting (and possibly only) game where saving taxpayer dollars is the ultimate flex.</p>
        <h2>🎮 Time to Make Your Picks!</h2>
        <p>The clock's ticking, and the government isn't going to reform itself (we checked). Click below to dive back in, make your draft picks, and show everyone you've got what it takes to sniff out the savings.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${baseUrl}/program-grid" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Return to the Game</a>
        </div>
        <p>Let's make some efficiency magic happen.</p>
        <p style="margin-top: 30px;">The Fantasy D.O.G.E. Team 🐾</p>
      </div>
    `,
    B: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F3F4F6;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #4F46E5; text-align: center;">Welcome to Fantasy D.O.G.E.! 🐕💰</h1>
          <p>Where government efficiency meets... fantasy sports? Yeah, we went there.</p>
          <p>You're officially part of the most exciting (and possibly only) game where saving taxpayer dollars is the ultimate flex.</p>
          <h2>🎮 Time to Make Your Picks!</h2>
          <p>The clock's ticking, and the government isn't going to reform itself (we checked). Click below to dive back in, make your draft picks, and show everyone you've got what it takes to sniff out the savings.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/program-grid" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Return to the Game</a>
          </div>
          <p>Let's make some efficiency magic happen.</p>
          <p style="margin-top: 30px; text-align: center;">The Fantasy D.O.G.E. Team 🐾</p>
        </div>
      </div>
    `,
    C: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="border: 2px solid #4F46E5; padding: 30px; border-radius: 10px;">
          <h1 style="color: #4F46E5; text-align: center;">Welcome to Fantasy D.O.G.E.! 🐕💰</h1>
          <p>Where government efficiency meets... fantasy sports? Yeah, we went there.</p>
          <p>You're officially part of the most exciting (and possibly only) game where saving taxpayer dollars is the ultimate flex.</p>
          <h2>🎮 Time to Make Your Picks!</h2>
          <p>The clock's ticking, and the government isn't going to reform itself (we checked). Click below to dive back in, make your draft picks, and show everyone you've got what it takes to sniff out the savings.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/program-grid" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Return to the Game</a>
          </div>
          <p>Let's make some efficiency magic happen.</p>
          <p style="margin-top: 30px; border-top: 1px solid #E5E7EB; padding-top: 20px;">The Fantasy D.O.G.E. Team 🐾</p>
        </div>
      </div>
    `,
    D: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F3F4F6;">
        <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 30px; border-radius: 10px; color: white;">
          <h1 style="text-align: center;">Welcome to Fantasy D.O.G.E.! 🐕💰</h1>
          <p>Where government efficiency meets... fantasy sports? Yeah, we went there.</p>
          <p>You're officially part of the most exciting (and possibly only) game where saving taxpayer dollars is the ultimate flex.</p>
          <h2>🎮 Time to Make Your Picks!</h2>
          <p>The clock's ticking, and the government isn't going to reform itself (we checked). Click below to dive back in, make your draft picks, and show everyone you've got what it takes to sniff out the savings.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/program-grid" style="background-color: white; color: #4F46E5; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Return to the Game</a>
          </div>
          <p>Let's make some efficiency magic happen.</p>
          <p style="margin-top: 30px; text-align: center;">The Fantasy D.O.G.E. Team 🐾</p>
        </div>
      </div>
    `
  };

  return {
    subject: subjects[variant],
    html: templates[variant]
  };
};