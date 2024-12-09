import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScoreBoard() {
  const { data: scores, isLoading } = useQuery({
    queryKey: ["scores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scores")
        .select("*")
        .order("score", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Scores</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Loading scores...</p>
        ) : scores?.length === 0 ? (
          <p className="text-muted-foreground">No scores yet!</p>
        ) : (
          <div className="space-y-2">
            {scores?.map((score, index) => (
              <div
                key={score.id}
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
        )}
      </CardContent>
    </Card>
  );
}