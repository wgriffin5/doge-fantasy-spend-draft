import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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