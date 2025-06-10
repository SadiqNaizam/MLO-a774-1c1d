import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react'; // Example icons

interface ChannelPostCardProps {
  id: string;
  authorName: string;
  authorAvatarUrl?: string;
  authorAvatarFallback: string;
  timestamp: string;
  content: string;
  likesCount?: number;
  commentsCount?: number;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
}

const ChannelPostCard: React.FC<ChannelPostCardProps> = ({
  id,
  authorName,
  authorAvatarUrl,
  authorAvatarFallback,
  timestamp,
  content,
  likesCount = 0,
  commentsCount = 0,
  onLike,
  onComment,
  onShare,
}) => {
  console.log(`Rendering ChannelPostCard: ${id} by ${authorName}`);

  return (
    <Card className="w-full my-4 shadow-md">
      <CardHeader className="flex flex-row items-center space-x-3 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={authorAvatarUrl} alt={authorName} />
          <AvatarFallback>{authorAvatarFallback.substring(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base font-semibold">{authorName}</CardTitle>
          <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm whitespace-pre-wrap">
        {content}
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-2 border-t">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" onClick={() => onLike && onLike(id)} className="text-gray-600 hover:text-primary">
            <ThumbsUp className="h-4 w-4 mr-1.5" /> {likesCount}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onComment && onComment(id)} className="text-gray-600 hover:text-primary">
            <MessageSquare className="h-4 w-4 mr-1.5" /> {commentsCount}
          </Button>
        </div>
        {onShare && (
          <Button variant="ghost" size="icon" onClick={() => onShare(id)} className="text-gray-600 hover:text-primary">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ChannelPostCard;