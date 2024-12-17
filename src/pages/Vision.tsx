import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target } from "lucide-react";

export default function Vision() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Vision & Mission</h1>
      
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
      </div>
    </div>
  );
}