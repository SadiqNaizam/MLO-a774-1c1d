import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // For conditional class names

interface TeamChannelListItemProps {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarFallback: string;
  unreadCount?: number;
  isActive?: boolean;
  onClick: (id: string) => void;
}

const TeamChannelListItem: React.FC<TeamChannelListItemProps> = ({
  id,
  name,
  avatarUrl,
  avatarFallback,
  unreadCount,
  isActive,
  onClick,
}) => {
  console.log(`Rendering TeamChannelListItem: ${name}, Active: ${isActive}`);

  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        "flex items-center w-full p-2 rounded-md text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "bg-gray-200 dark:bg-gray-600"
      )}
    >
      <Avatar className="h-8 w-8 mr-3">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <span className="flex-grow truncate text-sm font-medium">{name}</span>
      {unreadCount && unreadCount > 0 && (
        <Badge variant="destructive" className="ml-auto text-xs px-1.5 py-0.5">
          {unreadCount > 9 ? '9+' : unreadCount}
        </Badge>
      )}
    </button>
  );
};

export default TeamChannelListItem;