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
import { Check, Trophy, Users, ArrowRight } from "lucide-react";

export default function OnboardingTutorial() {
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
                Explore federal spending programs and their annual budgets. Use
                filters to find programs you think should be cut or made more
                efficient.
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
                Select up to 7 programs you predict will be cut or streamlined.
                Choose wisely - bigger budgets mean bigger potential points!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-100 p-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold">3. Join the Movement</h3>
              <p className="text-muted-foreground">
                Save your picks by entering your email. You'll receive updates when
                your predicted cuts happen and see your score climb the
                leaderboard!
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="scoring">
              <AccordionTrigger>How do I earn points?</AccordionTrigger>
              <AccordionContent>
                Points are awarded based on the size of budget cuts you correctly predict. 
                Each billion dollars in cuts equals one point, with a minimum of 1 point 
                per correct prediction. Bonus points are awarded for higher confidence 
                predictions that come true!
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
            <div className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-doge-gold" />
              <p className="font-medium text-doge-gold">
                Ready to make a difference? Start drafting your picks below!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}