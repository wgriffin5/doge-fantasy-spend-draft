import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Info, Lightbulb } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Fantasy D.O.G.E.
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/vision" className="transition-colors hover:text-foreground/80">
              <Button variant="ghost" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Vision
              </Button>
            </Link>
            <Link to="/about" className="transition-colors hover:text-foreground/80">
              <Button variant="ghost" className="flex items-center gap-2">
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