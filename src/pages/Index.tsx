import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Coins, Trophy, Users } from "lucide-react";
import ProgramGrid from "@/components/ProgramGrid";
import DraftedPrograms from "@/components/DraftedPrograms";
import ScoreBoard from "@/components/ScoreBoard";
import ActivePlayers from "@/components/ActivePlayers";
import ProgramTicker from "@/components/ProgramTicker";
import ReformAdvocates from "@/components/ReformAdvocates";
import SocialShare from "@/components/SocialShare";
import ReformLogo from "@/components/ReformLogo";
import LeagueSection from "@/components/league/LeagueSection";
import FeedbackForm from "@/components/FeedbackForm";
import InaugurationCountdown from "@/components/InaugurationCountdown";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import GuidedTour from "@/components/GuidedTour";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
  is_cut: boolean;
  cut_date: string | null;
  cut_amount: number | null;
}

export default function Index() {
  const [selectedPrograms, setSelectedPrograms] = useState<Program[]>([]);

  const handleSelectProgram = (program: Program) => {
    if (selectedPrograms.some((p) => p.id === program.id)) {
      setSelectedPrograms(selectedPrograms.filter((p) => p.id !== program.id));
    } else if (selectedPrograms.length < 7) {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  return (
    <div className="min-h-screen">
      <GuidedTour />
      <ProgramTicker />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <ReformLogo />
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Fantasy{" "}
              <span className="relative">
                <span className="relative z-10 doge-gradient-text">D.O.G.E.</span>
                <span className="absolute inset-0 doge-gradient opacity-75 blur-sm" aria-hidden="true"></span>
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Welcome to the Department of Government Efficiency Fantasy League!
              Draft federal spending programs you think will be cut or streamlined,
              earn points for successful predictions, and compete with other
              efficiency advocates.
            </p>
            <div className="mb-8">
              <InaugurationCountdown />
            </div>
            <SocialShare />
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

      {/* How to Play Section */}
      <section id="how-to-play" className="py-10 bg-secondary/50">
        <div className="container mx-auto px-4">
          <OnboardingTutorial />
        </div>
      </section>

      {/* Reform Advocates Section */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Join the Reform Movement
          </h2>
          <ReformAdvocates />
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

      {/* Draft Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div id="program-grid" className="lg:col-span-2">
              <ProgramGrid
                selectedPrograms={selectedPrograms}
                onSelectProgram={handleSelectProgram}
              />
            </div>
            <div className="space-y-8">
              <ActivePlayers />
              <DraftedPrograms
                selectedPrograms={selectedPrograms}
                onRemoveProgram={handleSelectProgram}
              />
              <LeagueSection />
              <ScoreBoard />
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Share Your Feedback</h3>
                <FeedbackForm />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}