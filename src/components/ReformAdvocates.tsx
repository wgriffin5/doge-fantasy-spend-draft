import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ReformAdvocates() {
  const advocates = [
    {
      name: "Elon Musk",
      image: "/elon.png",
      title: "Tech Innovator",
    },
    {
      name: "Donald Trump",
      image: "/trump.png",
      title: "Former President",
    },
    {
      name: "Vivek Ramaswamy",
      image: "/vivek.png",
      title: "Entrepreneur",
    },
  ];

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
          <p className="text-sm text-muted-foreground">{advocate.title}</p>
        </div>
      ))}
    </div>
  );
}