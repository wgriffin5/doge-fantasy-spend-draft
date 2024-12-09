import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeagueScore {
  email: string;
  score: number;
  league_name: string;
}

export default function LeagueLeaderboard({ leagueId }: { leagueId: string }) {
  const { data: scores, isLoading } = useQuery({
    queryKey: ["league-scores", leagueId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("league_members")
        .select(`
          email,
          leagues!inner(name),
          scores!inner(score)
        `)
        .eq("league_id", leagueId)
        .order("score", { foreignTable: "scores", ascending: false });

      if (error) throw error;
      return data.map((item: any) => ({
        email: item.email,
        score: item.scores[0]?.score || 0,
        league_name: item.leagues.name,
      }));
    },
  });

  if (isLoading) {
    return <div>Loading league scores...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {scores && scores[0]?.league_name} Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {scores?.map((score, index) => (
            <div
              key={score.email}
              className="flex items-center justify-between rounded-lg border p-2"
            >
              <div className="flex items-center gap-3">
                <div className="text-lg font-semibold text-doge-gold">
                  #{index + 1}
                </div>
                <div className="font-medium">{score.email}</div>
              </div>
              <div className="font-semibold">{score.score} points</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}