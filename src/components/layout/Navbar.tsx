import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Info, Lightbulb, Navigation2, Users, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/how-to-play", icon: BookOpen, label: "How To Play" },
    { to: "/community", icon: Users, label: "Community" },
    { to: "/vision", icon: Lightbulb, label: "Vision" },
    { to: "/about", icon: Info, label: "About" },
  ];

  const NavLinks = ({ onClick = () => {} }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="transition-colors hover:text-foreground/80"
          onClick={onClick}
        >
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-doge-gold/10 w-full justify-start"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex w-full justify-between items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Navigation2 className="h-6 w-6 text-doge-gold" />
            <span className="font-bold text-lg">Fantasy D.O.G.E.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <NavLinks />
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[280px]">
              <nav className="flex flex-col gap-2 mt-4">
                <NavLinks onClick={() => setIsOpen(false)} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}