import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  content: string;
  email: string;
  created_at: string;
  is_meme: boolean;
  likes: number;
  program_id: string;
  programs: {
    name: string;
  };
}

export default function ProgramComments() {
  const [newComment, setNewComment] = useState("");
  const [isMeme, setIsMeme] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ["programComments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("program_comments")
        .select(`
          *,
          programs!program_comments_program_id_fkey (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async ({ content, isMeme }: { content: string; isMeme: boolean }) => {
      const { data: programs } = await supabase
        .from("programs")
        .select("id")
        .limit(1)
        .single();

      if (!programs) throw new Error("No programs found");

      const { data, error } = await supabase
        .from("program_comments")
        .insert([
          {
            content,
            is_meme: isMeme,
            program_id: programs.id,
            email: "user@example.com", // This should be replaced with the actual user's email when auth is implemented
          },
        ])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programComments"] });
      toast({
        title: "Comment posted successfully!",
        description: isMeme ? "Your meme has been shared!" : "Your comment has been added to the discussion.",
      });
      setNewComment("");
      setIsMeme(false);
    },
    onError: () => {
      toast({
        title: "Error posting comment",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    createCommentMutation.mutate({ content: newComment, isMeme });
  };

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="min-h-[100px]"
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isMeme}
              onChange={(e) => setIsMeme(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">This is a meme</span>
          </label>
          <Button type="submit" disabled={createCommentMutation.isPending}>
            {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>

      {comments?.map((comment) => (
        <Card key={comment.id}>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarFallback>
                  {comment.email?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{comment.email}</p>
                <p className="text-sm text-muted-foreground">
                  on {comment.programs?.name}
                </p>
                <p className="text-sm">{comment.content}</p>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                  {comment.is_meme && (
                    <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                      Meme
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}