import { Bell, MessageCircle, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 animate-scale-in">
          <div className="bg-gradient-primary rounded-lg p-2 hover-glow cursor-pointer transition-transform duration-300 hover:scale-110">
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text cursor-pointer hover:scale-105 transition-transform duration-300">
            Samvaad
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6 max-w-md animate-slide-in-right">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
            <Input
              type="search"
              placeholder="Search posts, people..."
              className="pl-10 bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-background transition-all duration-300 hover:bg-muted/70"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-2 animate-fade-in">
          <Button variant="ghost" size="icon" className="relative hover-lift hover:bg-primary/10 transition-all duration-300">
            <Bell className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-background animate-bounce-subtle"></span>
          </Button>
          <Button variant="ghost" size="icon" className="hover-lift hover:bg-primary/10 transition-all duration-300">
            <MessageCircle className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-gradient-primary text-primary-foreground hover:opacity-90 hover:scale-110 shadow-primary transition-all duration-300">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;