import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function JoinLeagueForm() {
  const [leagueCode, setLeagueCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leagueCode.trim()) {
      toast.error("Please enter a league code");
      return;
    }

    setIsJoining(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getSession();
      if (userError) throw userError;

      const email = userData.session?.user?.email;
      if (!email) {
        toast.error("Please sign in to join a league");
        return;
      }

      // Find the league
      const { data: league, error: leagueError } = await supabase
        .from("leagues")
        .select()
        .eq("code", leagueCode.toUpperCase())
        .single();

      if (leagueError) {
        toast.error("League not found. Please check the code.");
        return;
      }

      // Join the league
      const { error: joinError } = await supabase
        .from("league_members")
        .insert({ league_id: league.id, email });

      if (joinError) {
        if (joinError.code === "23505") {
          toast.error("You're already a member of this league!");
        } else {
          throw joinError;
        }
        return;
      }

      toast.success(`Successfully joined ${league.name}!`);
      setLeagueCode("");
    } catch (error) {
      console.error("Error joining league:", error);
      toast.error("Failed to join league. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter league code"
        value={leagueCode}
        onChange={(e) => setLeagueCode(e.target.value)}
        disabled={isJoining}
      />
      <Button
        type="submit"
        disabled={isJoining}
        className="w-full bg-gradient-to-r from-doge-gold to-doge-purple"
      >
        {isJoining ? "Joining..." : "Join League"}
      </Button>
    </form>
  );
}