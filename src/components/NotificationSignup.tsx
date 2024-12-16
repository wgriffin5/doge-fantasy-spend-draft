import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function NotificationSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("player_levels")
        .insert([{ email, level: "rookie" }]);

      if (error) throw error;

      toast.success("You'll be notified of important updates!");
      setEmail("");
    } catch (error) {
      console.error("Error saving email:", error);
      toast.error("Failed to save your email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto mt-4">
      <Input
        type="email"
        placeholder="Enter email for inauguration updates"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
      />
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-gradient-to-r from-doge-gold to-doge-purple"
      >
        <Bell className="mr-2 h-4 w-4" />
        Get Notified
      </Button>
    </form>
  );
}