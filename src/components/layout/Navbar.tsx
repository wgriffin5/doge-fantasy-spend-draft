import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Info, Lightbulb, Navigation2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex w-full justify-between items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Navigation2 className="h-6 w-6 text-doge-gold" />
            <span className="font-bold text-lg sm:inline-block">
              Fantasy D.O.G.E.
            </span>
          </Link>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-doge-gold/10">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/vision" className="transition-colors hover:text-foreground/80">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-doge-gold/10">
                <Lightbulb className="h-4 w-4" />
                Vision
              </Button>
            </Link>
            <Link to="/about" className="transition-colors hover:text-foreground/80">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-doge-gold/10">
                <Info className="h-4 w-4" />
                About
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}