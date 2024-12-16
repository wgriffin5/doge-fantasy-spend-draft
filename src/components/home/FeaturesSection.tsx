import { Card } from "@/components/ui/card";
import { Coins, Trophy, Users } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="doge-card">
            <Coins className="mb-4 h-12 w-12 text-doge-gold" />
            <h3 className="mb-2 text-xl font-bold">Draft Programs</h3>
            <p className="text-muted-foreground">
              Build your portfolio of government spending programs and watch for
              efficiency cuts.
            </p>
          </Card>
          <Card className="doge-card">
            <Trophy className="mb-4 h-12 w-12 text-doge-purple" />
            <h3 className="mb-2 text-xl font-bold">Earn Points</h3>
            <p className="text-muted-foreground">
              Score big when your drafted programs get streamlined or eliminated.
            </p>
          </Card>
          <Card className="doge-card">
            <Users className="mb-4 h-12 w-12 text-doge-blue" />
            <h3 className="mb-2 text-xl font-bold">Compete & Win</h3>
            <p className="text-muted-foreground">
              Join leagues, climb the leaderboard, and become the ultimate
              efficiency champion.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}