interface WelcomeEmailParams {
  variant: "A" | "B" | "C" | "D";
  userLevel?: string;
  predictionsCount?: number;
  baseUrl: string;
}

export const getWelcomeEmailContent = ({ variant, userLevel, predictionsCount, baseUrl }: WelcomeEmailParams) => {
  const subjects = {
    A: "Much Welcome! Very Fantasy D.O.G.E.! 🐕",
    B: "Such Efficiency! Many Government! Wow! 🚀",
    C: "Very Game Time! Much Reform! 🎯",
    D: "🐕 Such Welcome! Many Excited!"
  };

  const templates = {
    A: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #F2A900; text-align: center;">Such Welcome! Very Fantasy D.O.G.E.! 🐕</h1>
        <p>Much excitement! You've joined the most wow game of government efficiency!</p>
        <p>Very mission: Find the waste, much savings, wow reform!</p>
        <h2>🎮 Such Game Time!</h2>
        <p>The clock does a heckin' tick! Much reform needed! Very savings await!</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${baseUrl}/program-grid" style="background-color: #F2A900; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Start Much Gaming!</a>
        </div>
        <p>Let's make government very efficient!</p>
        <p style="margin-top: 30px;">The Fantasy D.O.G.E. Team 🐾</p>
      </div>
    `,
    B: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F3F4F6;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #F2A900; text-align: center;">Such Welcome! Very Fantasy D.O.G.E.! 🐕</h1>
          <p>Much excitement! You've joined the most wow game of government efficiency!</p>
          <p>Very mission: Find the waste, much savings, wow reform!</p>
          <h2>🎮 Such Game Time!</h2>
          <p>The clock does a heckin' tick! Much reform needed! Very savings await!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/program-grid" style="background-color: #F2A900; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Start Much Gaming!</a>
          </div>
          <p>Let's make government very efficient!</p>
          <p style="margin-top: 30px; text-align: center;">The Fantasy D.O.G.E. Team 🐾</p>
        </div>
      </div>
    `,
    C: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="border: 2px solid #F2A900; padding: 30px; border-radius: 10px;">
          <h1 style="color: #F2A900; text-align: center;">Such Welcome! Very Fantasy D.O.G.E.! 🐕</h1>
          <p>Much excitement! You've joined the most wow game of government efficiency!</p>
          <p>Very mission: Find the waste, much savings, wow reform!</p>
          <h2>🎮 Such Game Time!</h2>
          <p>The clock does a heckin' tick! Much reform needed! Very savings await!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/program-grid" style="background-color: #F2A900; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Start Much Gaming!</a>
          </div>
          <p>Let's make government very efficient!</p>
          <p style="margin-top: 30px; border-top: 1px solid #E5E7EB; padding-top: 20px;">The Fantasy D.O.G.E. Team 🐾</p>
        </div>
      </div>
    `,
    D: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F3F4F6;">
        <div style="background: linear-gradient(135deg, #F2A900 0%, #9B87F5 100%); padding: 30px; border-radius: 10px; color: white;">
          <h1 style="text-align: center;">Such Welcome! Very Fantasy D.O.G.E.! 🐕</h1>
          <p>Much excitement! You've joined the most wow game of government efficiency!</p>
          <p>Very mission: Find the waste, much savings, wow reform!</p>
          <h2>🎮 Such Game Time!</h2>
          <p>The clock does a heckin' tick! Much reform needed! Very savings await!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/program-grid" style="background-color: white; color: #F2A900; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Start Much Gaming!</a>
          </div>
          <p>Let's make government very efficient!</p>
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