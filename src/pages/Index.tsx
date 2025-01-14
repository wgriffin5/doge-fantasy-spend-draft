import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import DraftSection from "@/components/home/DraftSection";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import TopEmailCapture from "@/components/home/TopEmailCapture";

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
  const [userEmail, setUserEmail] = useState<string>("");

  const handleSelectProgram = (program: Program) => {
    if (selectedPrograms.some((p) => p.id === program.id)) {
      setSelectedPrograms(selectedPrograms.filter((p) => p.id !== program.id));
    } else if (selectedPrograms.length < 7) {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
  };

  console.log("Index component rendering");

  return (
    <main className="min-h-screen bg-background">
      <TopEmailCapture />
      <HeroSection />
      
      <section id="how-to-play" className="py-10 bg-secondary/50">
        <div className="container mx-auto px-4">
          <OnboardingTutorial />
        </div>
      </section>

      <FeaturesSection />
      
      <DraftSection
        selectedPrograms={selectedPrograms}
        onSelectProgram={handleSelectProgram}
        onEmailSubmit={handleEmailSubmit}
        userEmail={userEmail}
      />
    </main>
  );
}