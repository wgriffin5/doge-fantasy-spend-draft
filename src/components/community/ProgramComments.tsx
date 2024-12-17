import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  content: string;
  email: string;
  created_at: string;
  is_meme: boolean;
  likes: number;
  programs: {
    name: string;
  };
}

export default function ProgramComments() {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["programComments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("program_comments")
        .select(`
          *,
          programs (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
  });

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="space-y-4">
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