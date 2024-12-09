import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function CreateLeagueForm() {
  const [leagueName, setLeagueName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leagueName.trim()) {
      toast.error("Please enter a league name");
      return;
    }

    setIsCreating(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getSession();
      if (userError) throw userError;

      const email = userData.session?.user?.email;
      if (!email) {
        toast.error("Please sign in to create a league");
        return;
      }

      const { data, error } = await supabase
        .from("leagues")
        .insert({ name: leagueName.trim(), created_by: email })
        .select()
        .single();

      if (error) throw error;

      // Auto-join the creator to their league
      await supabase
        .from("league_members")
        .insert({ league_id: data.id, email });

      toast.success(`League "${data.name}" created! Share code: ${data.code}`);
      setLeagueName("");
    } catch (error) {
      console.error("Error creating league:", error);
      toast.error("Failed to create league. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter league name"
        value={leagueName}
        onChange={(e) => setLeagueName(e.target.value)}
        disabled={isCreating}
      />
      <Button
        type="submit"
        disabled={isCreating}
        className="w-full bg-gradient-to-r from-doge-gold to-doge-purple"
      >
        {isCreating ? "Creating..." : "Create League"}
      </Button>
    </form>
  );
}