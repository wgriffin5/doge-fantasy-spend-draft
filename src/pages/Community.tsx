import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Users, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgramComments from "@/components/community/ProgramComments";
import LeaderboardSection from "@/components/community/LeaderboardSection";
import LeagueRecruitment from "@/components/community/LeagueRecruitment";
import MemeContest from "@/components/community/MemeContest";

export default function Community() {
  const { data: commentStats } = useQuery({
    queryKey: ["commentStats"],
    queryFn: async () => {
      const { count } = await supabase
        .from("program_comments")
        .select("*", { count: "exact" });
      return { totalComments: count };
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Fantasy D.O.G.E Community</h1>
        <p className="text-muted-foreground">
          Join the conversation about government spending and connect with other
          reform advocates.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commentStats?.totalComments || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4k</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leagues</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="discussions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="leagues">Leagues</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="discussions">
          <MemeContest />
          <ProgramComments />
        </TabsContent>
        <TabsContent value="leagues">
          <LeagueRecruitment />
        </TabsContent>
        <TabsContent value="leaderboard">
          <LeaderboardSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}