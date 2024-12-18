import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function MemeContest() {
  const { toast } = useToast();

  useEffect(() => {
    const initializeMemeContest = async () => {
      // First, get the first program to associate the comments with
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

      // Create the initial contest announcement and meme submissions
      const memeSubmissions = [
        {
          program_id: programs.id,
          content: "🏆 Welcome to the Fantasy D.O.G.E. Meme Contest! 🏆\n\nKicking off with Uncle Elon calling for YOU to join the mission! Share your best government efficiency memes below.\n\n#DOGEMemeContest",
          is_meme: true,
          email: "admin@fantasydoge.com",
        },
        {
          program_id: programs.id,
          content: "![Uncle Sam DOGE](/lovable-uploads/32972977-961c-4a5e-84ce-927a29b3db5e.png)\n\nUncle Sam wants YOU for Fantasy DOGE! 🎩🐕\n\n#DOGEMemeContest",
          is_meme: true,
          email: "memer1@fantasydoge.com",
        },
        {
          program_id: programs.id,
          content: "![We Need You](/lovable-uploads/876b68a2-ab22-4adb-a7e3-217ffb6bc07a.png)\n\nWe need YOU to join the efficiency revolution! 🚀\n\n#DOGEMemeContest",
          is_meme: true,
          email: "memer2@fantasydoge.com",
        },
        {
          program_id: programs.id,
          content: "![Uncle Elon](/lovable-uploads/9c39ad15-0e9f-4c73-9080-39984776ef76.png)\n\nUncle Elon's calling all efficiency warriors! 🎖️\n\n#DOGEMemeContest",
          is_meme: true,
          email: "memer3@fantasydoge.com",
        }
      ];

      for (const submission of memeSubmissions) {
        const { error } = await supabase
          .from("program_comments")
          .insert([submission]);

        if (error) {
          toast({
            title: "Error creating meme submission",
            description: "Please try again later",
            variant: "destructive",
          });
          console.error("Error creating meme submission:", error);
        }
      }
    };

    initializeMemeContest();
  }, [toast]);

  return null; // This component just initializes the meme contest
}