import { BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HowToPlay() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-doge-gold" />
        <h1 className="text-4xl font-bold">How To Play</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Fantasy D.O.G.E. is a game where you predict government spending cuts
            and earn points for correct predictions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Basic Rules</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Browse through federal spending programs</li>
              <li>Select up to 7 programs you think will be cut or streamlined</li>
              <li>Submit your predictions and track your score</li>
              <li>Earn points when your predictions come true</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Winning Strategies</h3>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Research-Based Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Study program performance reports, GAO findings, and recent policy discussions to identify programs likely to face cuts.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Budget Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Focus on programs with large budgets and historical inefficiencies for maximum point potential.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Engage with other players, share insights, and learn from successful predictions in the community.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
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

              <AccordionItem value="strategy">
                <AccordionTrigger>What's the best strategy to win?</AccordionTrigger>
                <AccordionContent>
                  The most successful players combine thorough research, focus on high-budget 
                  programs, and active participation in community discussions. Consider 
                  programs with recent negative performance reviews or those that overlap 
                  with other initiatives.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="multiple-predictions">
                <AccordionTrigger>Can I make multiple predictions?</AccordionTrigger>
                <AccordionContent>
                  Yes! You can select up to 7 programs for your predictions. It's 
                  recommended to diversify your picks across different departments 
                  and budget sizes to maximize your chances of success.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}