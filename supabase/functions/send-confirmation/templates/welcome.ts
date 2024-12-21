interface WelcomeEmailData {
  variant: "A" | "B" | "C" | "D";
  userLevel?: string;
  predictionsCount?: number;
}

export const getWelcomeEmailContent = ({ variant, userLevel = "rookie", predictionsCount = 0 }: WelcomeEmailData) => {
  const subjects = {
    A: "🎮 Welcome to Fantasy D.O.G.E. - Let's Make Government Efficient!",
    B: "🚀 Your Journey to Government Reform Starts Now!",
    C: "🎯 Join the Government Efficiency Revolution!",
    D: "💡 Ready to Transform Government? Let's Begin!"
  };

  // Dynamic content based on user level
  const getLevelBasedContent = (level: string) => {
    switch (level) {
      case "expert":
        return "As an experienced reformer, you'll have access to advanced features and exclusive insights.";
      case "intermediate":
        return "You're making great progress! Keep making predictions to unlock more features.";
      default:
        return "Start your journey by making your first prediction!";
    }
  };

  const templates = {
    A: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(to right, #F2A900, #9B87F5); padding: 2px;">
          <div style="background: white; padding: 20px; border-radius: 8px;">
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

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://fantasy-doge.com" 
                 style="background: #F2A900; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Start Making Predictions
              </a>
            </div>
          </div>
        </div>
      </div>
    `,
    B: `
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

          <div style="text-align: center; margin-top: 40px;">
            <a href="https://fantasy-doge.com" 
               style="display: inline-block; background: #F2A900; color: #1a1a1a; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px;">
              Begin Your Mission
            </a>
          </div>
        </div>
      </div>
    `,
    C: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #F2A900, #9B87F5); padding: 2px;">
          <div style="background: white; padding: 30px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; font-size: 28px; margin-bottom: 15px;">Welcome to Fantasy D.O.G.E.! 🎯</h1>
              <p style="color: #666; font-size: 16px;">Where Government Efficiency Meets Innovation</p>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #F2A900; margin-bottom: 15px;">🌟 Why You're Here</h2>
              <ul style="color: #666; padding-left: 20px;">
                <li style="margin-bottom: 10px;">Join 1,000+ reform advocates</li>
                <li style="margin-bottom: 10px;">Identify potential savings</li>
                <li style="margin-bottom: 10px;">Compete for top predictions</li>
                <li>Shape government efficiency</li>
              </ul>
            </div>

            <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #9B87F5; margin-bottom: 15px;">🎮 Getting Started</h2>
              <p style="color: #666; line-height: 1.6;">
                Ready to play? Click below to start your journey in government reform. 
                Our community has already identified over $50B in potential savings - 
                your insights could be next!
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://fantasy-doge.com" 
                 style="display: inline-block; background: linear-gradient(to right, #F2A900, #9B87F5); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Start Your Reform Journey
              </a>
            </div>
          </div>
        </div>
      </div>
    `,
    D: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6366F1, #4F46E5); padding: 2px;">
          <div style="background: white; padding: 30px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4F46E5; font-size: 28px; margin-bottom: 15px;">Welcome to the Future of Government! 💡</h1>
              <p style="color: #666; font-size: 16px;">Innovation Meets Efficiency</p>
            </div>

            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #4F46E5; margin-bottom: 15px;">🌟 Your Reform Journey</h2>
              <p style="color: #666; line-height: 1.6;">
                ${getLevelBasedContent(userLevel)}
                ${predictionsCount > 0 ? `You've already made ${predictionsCount} predictions!` : ''}
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="https://fantasy-doge.com" 
                 style="display: inline-block; background: linear-gradient(to right, #6366F1, #4F46E5); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Start Innovating
              </a>
            </div>
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
