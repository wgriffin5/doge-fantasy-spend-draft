interface DraftEmailData {
  variant: "A" | "B";
  programNames: string[];
  totalBudget: number;
}

export const getDraftEmailContent = ({ variant, programNames, totalBudget }: DraftEmailData) => {
  const formattedBudget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(totalBudget);

  const programList = programNames
    .map((name) => `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</li>`)
    .join("");

  const subjects = {
    A: "Your Fantasy D.O.G.E. Draft Picks",
    B: "🎯 Your Government Efficiency Picks Are In!"
  };

  const templates = {
    A: `
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
    `,
    B: `
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
    `
  };

  return {
    subject: subjects[variant],
    html: templates[variant]
  };
};