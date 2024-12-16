import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import useSound from "use-sound";
import { triggerCelebration } from "./ConfettiCelebration";
import ProgramSelection from "./ProgramSelection";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  programIds: z.array(z.string()).min(1, "Please select at least one program"),
});

export default function DraftForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      programIds: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from("draft_picks")
        .insert([{ email: values.email, program_ids: values.programIds }]);

      if (dbError) throw dbError;

      const { data: programs } = await supabase
        .from("programs")
        .select("name, annual_budget")
        .in("id", values.programIds);

      const programNames = programs?.map((p) => p.name) || [];
      const totalBudget = programs?.reduce((sum, p) => sum + p.annual_budget, 0) || 0;

      const { error: emailError } = await supabase.functions.invoke("send-confirmation", {
        body: {
          to: values.email,
          type: "draft",
          programNames,
          totalBudget,
        },
      });

      if (emailError) throw emailError;

      playSuccess();
      triggerCelebration();
      toast.success("Draft submitted successfully! Check your email for confirmation.");
      navigate("/");
    } catch (error) {
      console.error("Error submitting draft:", error);
      toast.error("Failed to submit draft. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="programIds"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ProgramSelection
                  selectedIds={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-doge-gold to-doge-purple"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Draft"}
        </Button>
      </form>
    </Form>
  );
}