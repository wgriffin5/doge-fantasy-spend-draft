import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Check, Trophy, Users, ArrowDown } from "lucide-react";

export default function OnboardingTutorial() {
  const scrollToPrograms = () => {
    document.getElementById("program-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How to Play Fantasy D.O.G.E.</CardTitle>
          <CardDescription>
            Join the movement to make government spending more efficient! Follow
            these simple steps to start playing:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-green-100 p-2">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">1. Browse Programs</h3>
              <p className="text-muted-foreground">
                Explore federal spending programs below. Use filters to find programs 
                you think should be cut or made more efficient. Look for high-budget 
                programs for maximum points!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-2">
              <Trophy className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">2. Draft Your Picks</h3>
              <p className="text-muted-foreground">
                Click on programs to add them to your draft picks. You can select up 
                to 7 programs. Remember: bigger budgets mean bigger potential points, 
                but also consider which cuts are most likely to happen!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-100 p-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold">3. Submit & Track</h3>
              <p className="text-muted-foreground">
                Enter your email to save your picks and join the community. You'll 
                receive updates when your predictions come true and see your score 
                climb the leaderboard!
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="scoring">
              <AccordionTrigger>How do I earn points?</AccordionTrigger>
              <AccordionContent>
                Points are awarded based on the size of budget cuts you correctly predict. 
                Each billion dollars in cuts equals one point, with a minimum of 1 point 
                per correct prediction. Advanced players can earn bonus points through 
                detailed predictions!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="wrong-predictions">
              <AccordionTrigger>What if my prediction is wrong?</AccordionTrigger>
              <AccordionContent>
                Don't worry! There are no penalties for incorrect predictions. 
                This game is about learning and engaging with government spending - 
                you only gain points, never lose them. Use the community discussions 
                to learn from others and improve your predictions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="timeframe">
              <AccordionTrigger>How long until I see results?</AccordionTrigger>
              <AccordionContent>
                Government budget decisions can take time. We track real-world budget 
                changes daily and notify you immediately when one of your predictions 
                comes true. Most budget changes occur during the annual budget cycle, 
                but reforms can happen year-round.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-4 rounded-lg bg-secondary p-4">
            <Button
              onClick={scrollToPrograms}
              className="w-full bg-doge-gold hover:bg-doge-gold/90 text-base"
            >
              Start Drafting
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}