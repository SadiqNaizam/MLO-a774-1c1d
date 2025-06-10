import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChatListItemProps {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarFallback: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  isActive?: boolean;
  onClick: (id: string) => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  id,
  name,
  avatarUrl,
  avatarFallback,
  lastMessage,
  timestamp,
  unreadCount,
  isActive,
  onClick,
}) => {
  console.log(`Rendering ChatListItem: ${name}, Unread: ${unreadCount}`);

  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        "flex items-center w-full p-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors",
        isActive && "bg-muted dark:bg-muted-foreground/20"
      )}
    >
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{avatarFallback.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-grow overflow-hidden">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-sm truncate">{name}</span>
          {timestamp && <span className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</span>}
        </div>
        <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                {lastMessage || 'No messages yet'}
            </p>
            {unreadCount && unreadCount > 0 && (
                <Badge variant="default" className="ml-2 text-xs px-1.5 py-0.5 h-5 min-w-[20px] flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                </Badge>
            )}
        </div>
      </div>
    </button>
  );
};

export default ChatListItem;