import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ReformAdvocates() {
  const [descriptionIndex, setDescriptionIndex] = useState(0);

  const advocates = [
    {
      name: "Lonnie Rockets",
      image: "/elon.png",
      titles: ["Rocket Bro", "Mars Guy", "X Man", "Autistic African Immigrant", "Billionaire"],
    },
    {
      name: "Donny Fairways",
      image: "/trump.png",
      titles: ["Melania's Husband", "Baron's Dad", "Casino Owner", "Reality TV Star", "You're Fired", "Billionaire"],
    },
    {
      name: "V Brah",
      image: "/vivek.png",
      titles: ["Bio Billionaire", "Hair Product Model"],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDescriptionIndex((prevIndex) => {
        const maxLength = Math.max(...advocates.map(a => a.titles.length));
        return (prevIndex + 1) % maxLength;
      });
    }, 3000); // Change description every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-8 py-6">
      {advocates.map((advocate) => (
        <div
          key={advocate.name}
          className="text-center group cursor-pointer transform transition-transform hover:scale-110"
        >
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-doge-gold">
              <AvatarImage src={advocate.image} alt={advocate.name} />
              <AvatarFallback>{advocate.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <h3 className="mt-2 font-bold">{advocate.name}</h3>
          <p className="text-sm text-muted-foreground">
            {advocate.titles[descriptionIndex % advocate.titles.length]}
          </p>
        </div>
      ))}
    </div>
  );
}