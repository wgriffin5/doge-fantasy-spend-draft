import { Card } from "@/components/ui/card";
import ProgramGrid from "@/components/ProgramGrid";
import DraftedPrograms from "@/components/DraftedPrograms";
import ScoreBoard from "@/components/ScoreBoard";
import ActivePlayers from "@/components/ActivePlayers";
import LeagueSection from "@/components/league/LeagueSection";
import FeedbackForm from "@/components/FeedbackForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
  is_cut: boolean;
}

interface DraftSectionProps {
  selectedPrograms: Program[];
  onSelectProgram: (program: Program) => void;
  onEmailSubmit: (email: string) => void;
  userEmail: string;
}

export default function DraftSection({
  selectedPrograms,
  onSelectProgram,
  onEmailSubmit,
  userEmail,
}: DraftSectionProps) {
  // Fetch all programs to pass to DraftedPrograms
  const { data: programs = [] } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          <div id="program-grid" className="lg:col-span-2">
            <ProgramGrid
              selectedPrograms={selectedPrograms}
              onSelectProgram={onSelectProgram}
              userEmail={userEmail}
            />
          </div>
          <div className="space-y-8">
            <ActivePlayers />
            <DraftedPrograms
              selectedPrograms={selectedPrograms}
              onRemoveProgram={onSelectProgram}
              onEmailSubmit={onEmailSubmit}
              allPrograms={programs}
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
  );
}