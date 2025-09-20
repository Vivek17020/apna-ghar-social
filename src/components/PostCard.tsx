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
    <Card className="w-full shadow-soft hover:shadow-primary transition-all duration-300 border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{author.name}</p>
              <p className="text-muted-foreground text-xs">@{author.username} · {timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-foreground mb-3 leading-relaxed">{content}</p>
        
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={image}
              alt="Post content"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${
              isLiked ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-sm">{likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{comments}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm">Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;