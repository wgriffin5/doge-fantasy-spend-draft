import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function LeagueRecruitment() {
  const { data: leagues, isLoading } = useQuery({
    queryKey: ["leagues"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leagues")
        .select(`
          *,
          league_members (count)
        `)
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading leagues...</div>;
  }

  return (
    <div className="space-y-4">
      {leagues?.map((league) => (
        <Card key={league.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl">{league.name}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Created by {league.created_by}
                </p>
                <p className="text-sm">Join Code: {league.code}</p>
              </div>
              <Button>Join League</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}