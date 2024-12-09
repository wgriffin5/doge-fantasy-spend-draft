import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useRef } from "react";

export default function ProgramTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    const content = contentRef.current;
    if (!ticker || !content || !programs?.length) return;

    // Clone the content for seamless scrolling
    const clone = content.cloneNode(true) as HTMLDivElement;
    ticker.appendChild(clone);

    let progress = 0;
    let animationFrameId: number;

    const scroll = () => {
      progress += 0.5;
      if (progress >= content.offsetWidth) {
        progress = 0;
      }
      ticker.style.transform = `translateX(-${progress}px)`;
      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [programs]);

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(budget);
  };

  if (!programs?.length) return null;

  return (
    <div className="bg-black text-doge-gold py-2 overflow-hidden">
      <div
        ref={tickerRef}
        className="whitespace-nowrap inline-flex"
        style={{ willChange: "transform" }}
      >
        <div ref={contentRef} className="flex">
          {programs.map((program) => (
            <span key={program.id} className="mx-4">
              {program.name} ({formatBudget(program.annual_budget)})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}