import React, { useState } from 'react';
import VideoFeedTile from '@/components/VideoFeedTile'; // Custom
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Video, VideoOff, ScreenShare, PhoneOff, Users, MessageSquare, Settings, Maximize, Minimize } from 'lucide-react';
// import { useParams } from 'react-router-dom'; // If using dynamic call IDs

// Mock Data
const mockParticipants = [
  { id: 'p1', displayName: 'Alice Wonderland', avatarFallback: 'AW', isMuted: false, isVideoOff: false, isSpeaking: true, avatarUrl: 'https://i.pravatar.cc/150?u=alice' },
  { id: 'p2', displayName: 'Bob The Builder', avatarFallback: 'BB', isMuted: true, isVideoOff: false, avatarUrl: 'https://i.pravatar.cc/150?u=bob' },
  { id: 'p3', displayName: 'CurrentUser (You)', avatarFallback: 'ME', isMuted: false, isVideoOff: true, isPinned: true, avatarUrl: 'https://i.pravatar.cc/150?u=currentuser' },
  { id: 'p4', displayName: 'Charlie Chaplin', avatarFallback: 'CC', isMuted: false, isVideoOff: false, avatarUrl: 'https://i.pravatar.cc/150?u=charlie' },
  { id: 'p5', displayName: 'Diana Prince', avatarFallback: 'DP', isMuted: false, isVideoOff: true, avatarUrl: 'https://i.pravatar.cc/150?u=diana' },
];

const VideoCallPage = () => {
  // const { callId } = useParams();
  const [participants, setParticipants] = useState(mockParticipants);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  console.log('VideoCallPage loaded'); // console.log(`VideoCallPage loaded for call ID: ${callId}`);

  const toggleMic = () => setIsMicMuted(!isMicMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => setIsFullScreen(true));
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => setIsFullScreen(false));
        }
    }
  };

  const pinnedParticipant = participants.find(p => p.isPinned);
  const otherParticipants = participants.filter(p => !p.isPinned);

  return (
    <TooltipProvider>
      <div className="h-screen w-screen flex flex-col bg-gray-900 text-white">
        {/* Main Video Area */}
        <main className="flex-grow flex flex-col p-2 md:p-4 gap-2 md:gap-4 overflow-hidden">
          {pinnedParticipant && (
            <section className="flex-grow-[3] basis-0 overflow-hidden rounded-lg">
              <VideoFeedTile
                participantId={pinnedParticipant.id}
                displayName={pinnedParticipant.displayName}
                avatarFallback={pinnedParticipant.avatarFallback}
                avatarUrl={pinnedParticipant.avatarUrl}
                isMuted={pinnedParticipant.id === 'p3' ? isMicMuted : pinnedParticipant.isMuted}
                isVideoOff={pinnedParticipant.id === 'p3' ? isVideoOff : pinnedParticipant.isVideoOff}
                isPinned={pinnedParticipant.isPinned}
                isSpeaking={pinnedParticipant.isSpeaking}
                // videoStream={/* actual stream */}
              />
            </section>
          )}
          {otherParticipants.length > 0 && (
            <section className={`flex-grow basis-0 ${pinnedParticipant ? 'h-1/4 max-h-[200px]' : 'h-full'} overflow-hidden`}>
              <div className={`grid ${otherParticipants.length === 1 ? 'grid-cols-1' : otherParticipants.length === 2 ? 'grid-cols-2' : otherParticipants.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'} gap-2 md:gap-4 h-full`}>
                {otherParticipants.map(p => (
                  <VideoFeedTile
                    key={p.id}
                    participantId={p.id}
                    displayName={p.displayName}
                    avatarFallback={p.avatarFallback}
                    avatarUrl={p.avatarUrl}
                    isMuted={p.id === 'p3' ? isMicMuted : p.isMuted}
                    isVideoOff={p.id === 'p3' ? isVideoOff : p.isVideoOff}
                    isSpeaking={p.isSpeaking}
                    // videoStream={/* actual stream */}
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Controls Footer */}
        <footer className="bg-gray-800/80 backdrop-blur-sm p-3 md:p-4 flex justify-center items-center space-x-2 md:space-x-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="lg" className="rounded-full w-12 h-12 md:w-14 md:h-14 hover:bg-gray-700" onClick={toggleMic}>
                {isMicMuted ? <MicOff className="h-5 w-5 md:h-6 md:w-6" /> : <Mic className="h-5 w-5 md:h-6 md:w-6" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isMicMuted ? 'Unmute Mic' : 'Mute Mic'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="lg" className="rounded-full w-12 h-12 md:w-14 md:h-14 hover:bg-gray-700" onClick={toggleVideo}>
                {isVideoOff ? <VideoOff className="h-5 w-5 md:h-6 md:w-6" /> : <Video className="h-5 w-5 md:h-6 md:w-6" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isVideoOff ? 'Start Video' : 'Stop Video'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="lg" className={`rounded-full w-12 h-12 md:w-14 md:h-14 hover:bg-gray-700 ${isScreenSharing ? 'text-green-500' : ''}`} onClick={toggleScreenShare}>
                <ScreenShare className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isScreenSharing ? 'Stop Sharing' : 'Share Screen'}</TooltipContent>
          </Tooltip>
          
          <Sheet>
            <SheetTrigger asChild>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="lg" className="rounded-full w-12 h-12 md:w-14 md:h-14 hover:bg-gray-700">
                            <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Chat</TooltipContent>
                </Tooltip>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader><SheetTitle>In-Call Chat</SheetTitle></SheetHeader>
                <div className="p-4">Chat messages would appear here.</div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button variant="ghost" size="lg" className="rounded-full w-12 h-12 md:w-14 md:h-14 hover:bg-gray-700 relative">
                            <Users className="h-5 w-5 md:h-6 md:w-6" />
                            <Badge variant="destructive" className="absolute -top-1 -right-1 px-1.5 text-xs">{participants.length}</Badge>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Participants</TooltipContent>
                </Tooltip>
            </SheetTrigger>
             <SheetContent side="right">
                <SheetHeader><SheetTitle>Participants ({participants.length})</SheetTitle></SheetHeader>
                <ScrollArea className="p-4 h-[calc(100%-4rem)]">
                    {participants.map(p => (
                        <div key={p.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={p.avatarUrl} />
                                    <AvatarFallback>{p.avatarFallback}</AvatarFallback>
                                </Avatar>
                                <span>{p.displayName}</span>
                            </div>
                            <div className="flex space-x-1">
                                {p.isMuted && <MicOff className="h-4 w-4 text-gray-400"/>}
                                {p.isVideoOff && <VideoOff className="h-4 w-4 text-gray-400"/>}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </SheetContent>
          </Sheet>

          <Dialog>
            <DialogTrigger asChild>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="lg" className="rounded-full w-12 h-12 md:w-14 md:h-14 hover:bg-gray-700">
                            <Settings className="h-5 w-5 md:h-6 md:w-6" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Settings</TooltipContent>
                </Tooltip>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Call Settings</DialogTitle></DialogHeader>
                <div className="space-y-4 p-4">
                    <div><Label>Audio Input (Microphone)</Label><Input type="text" defaultValue="Default System Mic" /></div>
                    <div><Label>Audio Output (Speaker)</Label><Input type="text" defaultValue="Default System Speaker" /></div>
                    <div><Label>Video Input (Camera)</Label><Input type="text" defaultValue="Default System Camera" /></div>
                    <div><Label>Volume</Label><Slider defaultValue={[50]} max={100} step={1} /></div>
                </div>
            </DialogContent>
          </Dialog>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="lg" className="rounded-full w-12 h-12 md:w-14 md:h-14 hover:bg-gray-700" onClick={toggleFullScreen}>
                {isFullScreen ? <Minimize className="h-5 w-5 md:h-6 md:w-6" /> : <Maximize className="h-5 w-5 md:h-6 md:w-6" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" size="lg" className="rounded-full w-14 h-12 md:w-16 md:h-14"> {/* Slightly wider for text */}
                <PhoneOff className="h-5 w-5 md:h-6 md:w-6" />
                <span className="ml-1 md:ml-2 hidden sm:inline">End</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>End Call</TooltipContent>
          </Tooltip>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default VideoCallPage;