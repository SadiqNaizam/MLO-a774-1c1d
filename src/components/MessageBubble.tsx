import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  id: string;
  senderName: string;
  senderAvatarUrl?: string;
  senderAvatarFallback: string;
  message: string;
  timestamp: string;
  isSender: boolean; // True if the current user sent this message
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  id,
  senderName,
  senderAvatarUrl,
  senderAvatarFallback,
  message,
  timestamp,
  isSender,
}) => {
  console.log(`Rendering MessageBubble: ${id}, from ${senderName}, isSender: ${isSender}`);

  return (
    <div className={cn("flex items-end gap-2 my-2", isSender ? "justify-end" : "justify-start")}>
      {!isSender && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarImage src={senderAvatarUrl} alt={senderName} />
          <AvatarFallback>{senderAvatarFallback.substring(0,1).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-[70%] md:max-w-[60%]")}>
        {!isSender && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5 ml-1">{senderName}</p>
        )}
        <Card className={cn(
          "rounded-xl p-3 shadow-sm",
          isSender ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none"
        )}>
          <CardContent className="p-0 text-sm break-words whitespace-pre-wrap">
            {message}
          </CardContent>
        </Card>
        <p className={cn("text-xs text-gray-400 dark:text-gray-500 mt-1", isSender ? "text-right mr-1" : "text-left ml-1")}>
          {timestamp}
        </p>
      </div>
       {isSender && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarImage src={senderAvatarUrl} alt={senderName} />
          <AvatarFallback>{senderAvatarFallback.substring(0,1).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageBubble;