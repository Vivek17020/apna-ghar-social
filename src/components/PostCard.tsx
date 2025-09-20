import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const PostCard = ({
  author,
  content,
  image,
  timestamp,
  likes,
  comments,
  isLiked = false,
}: PostCardProps) => {
  return (
    <Card className="w-full shadow-soft hover-lift border-border/60 animate-fade-in group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 animate-scale-in">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="animate-fade-in-up">
              <p className="font-semibold text-sm story-link cursor-pointer">{author.name}</p>
              <p className="text-muted-foreground text-xs">@{author.username} · {timestamp}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-muted/70"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-foreground mb-3 leading-relaxed animate-fade-in-up">{content}</p>
        
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden hover-lift">
            <img
              src={image}
              alt="Post content"
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center space-x-2 hover:text-red-500 transition-all duration-300 hover:bg-red-50 hover:scale-105 ${
              isLiked ? "text-red-500 animate-bounce-subtle" : "text-muted-foreground"
            }`}
          >
            <Heart className={`h-4 w-4 transition-transform duration-200 ${isLiked ? "fill-current scale-110" : ""}`} />
            <span className="text-sm font-medium">{likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted-foreground hover:text-accent hover:bg-accent/10 hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
            <span className="text-sm font-medium">{comments}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300"
          >
            <Share2 className="h-4 w-4 transition-transform duration-200 hover:scale-110 hover:rotate-12" />
            <span className="text-sm font-medium">Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;