import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "./ui/card";

export default function ActivePlayers() {
  const [activeCount, setActiveCount] = useState<number>(0);

  useEffect(() => {
    // Subscribe to presence changes
    const channel = supabase.channel("active_players");

    const userStatus = {
      online_at: new Date().toISOString(),
    };

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setActiveCount(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track(userStatus);
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <Card className="bg-gradient-to-br from-doge-purple/10 to-doge-blue/10">
      <CardContent className="flex items-center gap-3 p-4">
        <Users className="h-5 w-5 text-doge-purple" />
        <span className="text-sm font-medium">
          {activeCount} {activeCount === 1 ? "player" : "players"} online
        </span>
      </CardContent>
    </Card>
  );
}