import { useState } from "react";
import { Image, MapPin, Smile, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const { toast } = useToast();

  const handlePost = () => {
    if (postContent.trim()) {
      // Handle post creation
      console.log("Creating post:", postContent);
      
      toast({
        title: "🎉 Post shared successfully!",
        description: "Your thoughts are now part of the Samvaad community.",
        duration: 3000,
      });
      
      setPostContent("");
    }
  };

  return (
    <Card className="w-full shadow-soft border-border/60 hover-lift animate-fade-in group">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="h-10 w-10 animate-scale-in">
            <AvatarImage src="" alt="Your profile" />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              U
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="What's happening in your world?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[100px] border-none bg-transparent resize-none text-base placeholder:text-muted-foreground focus-visible:ring-0 p-0 transition-all duration-300 focus:placeholder:text-muted-foreground/50"
            />
            
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                >
                  <Smile className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={handlePost}
                disabled={!postContent.trim()}
                className="animated-gradient text-primary-foreground hover:scale-105 shadow-primary disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100 px-6 font-semibold transition-all duration-300"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;