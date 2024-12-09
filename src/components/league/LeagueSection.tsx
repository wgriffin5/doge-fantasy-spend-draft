import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateLeagueForm from "./CreateLeagueForm";
import JoinLeagueForm from "./JoinLeagueForm";
import LeagueLeaderboard from "./LeagueLeaderboard";

export default function LeagueSection() {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  const { data: userLeagues, isLoading } = useQuery({
    queryKey: ["user-leagues"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user?.email) return [];

      const { data, error } = await supabase
        .from("league_members")
        .select(`
          leagues!inner(
            id,
            name,
            code,
            created_by
          )
        `)
        .eq("email", session.session.user.email);

      if (error) throw error;
      return data.map((item) => item.leagues);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leagues</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="join" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="join">Join League</TabsTrigger>
            <TabsTrigger value="create">Create League</TabsTrigger>
          </TabsList>
          <TabsContent value="join">
            <JoinLeagueForm />
          </TabsContent>
          <TabsContent value="create">
            <CreateLeagueForm />
          </TabsContent>
        </Tabs>

        {isLoading ? (
          <div className="mt-4">Loading your leagues...</div>
        ) : userLeagues && userLeagues.length > 0 ? (
          <div className="mt-8 space-y-6">
            <h3 className="text-lg font-semibold">Your Leagues</h3>
            <div className="space-y-4">
              {userLeagues.map((league) => (
                <div key={league.id}>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium">{league.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      Code: {league.code}
                    </div>
                  </div>
                  <LeagueLeaderboard leagueId={league.id} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center text-muted-foreground">
            You haven't joined any leagues yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}