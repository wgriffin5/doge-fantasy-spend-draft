import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, Trophy, Users } from "lucide-react";

export default function Vision() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Vision & Game Mechanics</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-doge-gold" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              Fantasy D.O.G.E. (Department of Government Efficiency) aims to gamify government spending oversight and promote fiscal responsibility through crowd-sourced predictions and competitive gameplay.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-doge-purple" />
              Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              To create an engaging platform where citizens can learn about government spending, predict potential cuts, and compete with others while contributing to fiscal transparency.
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-doge-blue" />
              Game Mechanics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">1. Draft Programs</h3>
              <p className="text-muted-foreground">
                Players can select up to 7 federal spending programs they believe will be cut or made more efficient. Each program's budget determines its potential point value.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">2. Make Predictions</h3>
              <p className="text-muted-foreground">
                Advanced players can make detailed predictions about the type and amount of cuts, with confidence levels affecting potential points.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">3. Score Points</h3>
              <p className="text-muted-foreground">
                Points are awarded when predictions come true. The larger the budget cut or efficiency improvement, the more points earned.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">4. Compete in Leagues</h3>
              <p className="text-muted-foreground">
                Join or create private leagues to compete with friends and track your progress on the global leaderboard.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}