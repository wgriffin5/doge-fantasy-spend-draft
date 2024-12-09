import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Coins, Trophy, Users } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Fantasy{" "}
              <span className="doge-gradient bg-clip-text text-transparent">
                D.O.G.E.
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Draft federal spending programs, earn points when they get cut, and compete with friends in the ultimate government efficiency fantasy league!
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="doge-button"
                onClick={() => navigate("/signup")}
              >
                Start Playing
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/learn")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-40 left-0 h-96 w-96 animate-float opacity-10">
          <div className="doge-gradient h-full w-full rounded-full blur-3xl"></div>
        </div>
        <div className="absolute -bottom-40 right-0 h-96 w-96 animate-float opacity-10">
          <div className="doge-gradient h-full w-full rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="doge-card">
              <Coins className="mb-4 h-12 w-12 text-doge-gold" />
              <h3 className="mb-2 text-xl font-bold">Draft Programs</h3>
              <p className="text-muted-foreground">
                Build your portfolio of government spending programs and watch for efficiency cuts.
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
                Join leagues, climb the leaderboard, and become the ultimate efficiency champion.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}