import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MicOff, VideoOff, Pin } from 'lucide-react'; // Example icons
import { cn } from "@/lib/utils";

interface VideoFeedTileProps {
  participantId: string;
  displayName: string;
  avatarUrl?: string;
  avatarFallback: string;
  videoStream?: MediaStream; // Or any other type for your video element
  isMuted?: boolean;
  isVideoOff?: boolean;
  isPinned?: boolean;
  isSpeaking?: boolean;
}

const VideoFeedTile: React.FC<VideoFeedTileProps> = ({
  participantId,
  displayName,
  avatarUrl,
  avatarFallback,
  videoStream,
  isMuted = false,
  isVideoOff = false,
  isPinned = false,
  isSpeaking = false,
}) => {
  console.log(`Rendering VideoFeedTile for: ${displayName}, Video Off: ${isVideoOff}`);

  return (
    <div
      className={cn(
        "relative aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300",
        isSpeaking && !isPinned && "ring-4 ring-blue-500",
        isPinned && "ring-4 ring-green-500"
      )}
    >
      {videoStream && !isVideoOff ? (
        // Placeholder for actual video element
        // <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        <div className="w-full h-full object-cover flex items-center justify-center text-white">
          Video Stream for {displayName}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-700">
          <Avatar className="h-16 w-16 md:h-24 md:w-24">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="text-2xl md:text-4xl">
              {avatarFallback.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isVideoOff && <VideoOff className="h-6 w-6 text-white mt-3" />}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-white text-xs font-medium truncate">{displayName}</span>
          <div className="flex items-center space-x-1">
            {isMuted && <Badge variant="destructive" className="p-1 h-5 w-5"><MicOff className="h-3 w-3" /></Badge>}
          </div>
        </div>
      </div>
      {isPinned && (
         <div className="absolute top-2 right-2">
            <Pin className="h-5 w-5 text-green-400 fill-green-400" />
         </div>
      )}
    </div>
  );
};

export default VideoFeedTile;