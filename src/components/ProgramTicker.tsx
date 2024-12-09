import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useRef } from "react";

export default function ProgramTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  const { data: programs } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("annual_budget", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const scrollTicker = () => {
      if (ticker.scrollLeft >= ticker.scrollWidth - ticker.clientWidth) {
        ticker.scrollLeft = 0;
      } else {
        ticker.scrollLeft += 1;
      }
    };

    const interval = setInterval(scrollTicker, 30);
    return () => clearInterval(interval);
  }, []);

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(budget);
  };

  return (
    <div className="bg-black text-doge-gold py-2 overflow-hidden">
      <div
        ref={tickerRef}
        className="whitespace-nowrap animate-scroll"
        style={{ width: "100%", overflow: "hidden" }}
      >
        <div className="inline-block">
          {programs?.map((program) => (
            <span key={program.id} className="mx-4">
              {program.name} ({formatBudget(program.annual_budget)})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}