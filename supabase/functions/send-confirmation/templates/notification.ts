interface NotificationEmailData {
  variant: "A" | "B" | "C" | "D";
  userEngagement?: {
    lastVisit?: Date;
    predictionsCount?: number;
  };
}

export const getNotificationEmailContent = ({ variant, userEngagement }: NotificationEmailData) => {
  const subjects = {
    A: "You're Now Following Fantasy D.O.G.E. Updates",
    B: "🔔 Your Government Reform Updates Are Ready!",
    C: "📊 Your Custom Reform Insights Await",
    D: "🎯 Track Your Impact on Government Efficiency"
  };

  // Dynamic content based on user engagement
  const getEngagementContent = (engagement?: { lastVisit?: Date; predictionsCount?: number }) => {
    if (!engagement) return "";
    
    const daysSinceLastVisit = engagement.lastVisit 
      ? Math.floor((new Date().getTime() - new Date(engagement.lastVisit).getTime()) / (1000 * 3600 * 24))
      : null;

    if (daysSinceLastVisit && daysSinceLastVisit > 7) {
      return "We've missed you! Come back to see what's new.";
    }
    
    if (engagement.predictionsCount === 0) {
      return "Make your first prediction to start your reform journey!";
    }
    
    return `You've made ${engagement.predictionsCount} predictions. Keep up the great work!`;
  };

  const templates = {
    A: `
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
    `,
    B: `
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
    `,
    C: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #2D3748; padding: 30px; border-radius: 12px;">
          <div style="text-align: center;">
            <h1 style="color: #90CDF4; font-size: 28px; margin-bottom: 15px;">📊 Your Reform Dashboard is Ready!</h1>
            <p style="color: #E2E8F0; font-size: 16px;">${getEngagementContent(userEngagement)}</p>
          </div>
          <div style="background: #4A5568; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #F7FAFC; margin-bottom: 15px;">Your Insights:</h2>
            <p style="color: #E2E8F0;">Stay informed and make impactful predictions!</p>
          </div>
        </div>
      </div>
    `,
    D: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2D3748, #1A202C); padding: 30px; border-radius: 12px;">
          <div style="text-align: center;">
            <h1 style="color: #90CDF4; font-size: 28px; margin-bottom: 15px;">🎯 Track Your Reform Impact</h1>
            <p style="color: #E2E8F0; font-size: 16px;">Your personalized insights are ready!</p>
          </div>
          <div style="background: #4A5568; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #F7FAFC; margin-bottom: 15px;">Engagement Metrics:</h2>
            <p style="color: #E2E8F0;">Keep track of your predictions and their impact on government efficiency.</p>
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
