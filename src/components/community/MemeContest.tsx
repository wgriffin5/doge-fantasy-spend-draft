import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function MemeContest() {
  const { toast } = useToast();

  useEffect(() => {
    const initializeMemeContest = async () => {
      // First, get the first program to associate the comment with
      const { data: programs } = await supabase
        .from("programs")
        .select("id")
        .limit(1)
        .single();

      if (!programs) {
        console.error("No programs found");
        return;
      }

      // Check if the meme contest comment already exists
      const { data: existingComments } = await supabase
        .from("program_comments")
        .select("*")
        .eq("content", "🏆 Welcome to the Fantasy D.O.G.E. Meme Contest! 🏆\n\nKicking off with Uncle Elon calling for YOU to join the mission! Share your best government efficiency memes below.\n\n#DOGEMemeContest")
        .limit(1);

      if (existingComments && existingComments.length > 0) {
        return; // Meme contest already exists
      }

      // Create the meme contest comment
      const { error } = await supabase
        .from("program_comments")
        .insert([
          {
            program_id: programs.id,
            content: "🏆 Welcome to the Fantasy D.O.G.E. Meme Contest! 🏆\n\nKicking off with Uncle Elon calling for YOU to join the mission! Share your best government efficiency memes below.\n\n#DOGEMemeContest",
            is_meme: true,
            email: "admin@fantasydoge.com",
          },
        ]);

      if (error) {
        toast({
          title: "Error creating meme contest",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    };

    initializeMemeContest();
  }, [toast]);

  return null; // This component just initializes the meme contest
}