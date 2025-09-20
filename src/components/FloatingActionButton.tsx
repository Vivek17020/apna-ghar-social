import { Plus, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  onClick?: () => void;
}

const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full animated-gradient text-primary-foreground shadow-primary hover:scale-110 hover:shadow-lg transition-all duration-300 animate-bounce-subtle group"
    >
      <div className="relative">
        <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
        <Feather className="absolute top-0 left-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Button>
  );
};

export default FloatingActionButton;