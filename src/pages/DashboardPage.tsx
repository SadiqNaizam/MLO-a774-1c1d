import React, { useState } from 'react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import TeamChannelListItem from '@/components/TeamChannelListItem'; // Custom
import ChatListItem from '@/components/ChatListItem'; // Custom
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Search, Settings, LogOut, Users, MessageSquare, LayoutGrid, UserCircle } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom'; // For nested routes

// Mock Data
const mockTeams = [
  { id: 'team-alpha', name: 'Project Alpha', avatarFallback: 'PA', unreadCount: 3 },
  { id: 'team-beta', name: 'Marketing Beta', avatarFallback: 'MB', unreadCount: 1 },
  { id: 'team-gamma', name: 'Development Gamma', avatarFallback: 'DG' },
];

const mockChats = [
  { id: 'chat-1', name: 'Alice Wonderland', avatarFallback: 'AW', lastMessage: 'See you tomorrow!', timestamp: '10:30 AM', unreadCount: 2 },
  { id: 'chat-2', name: 'Bob The Builder', avatarFallback: 'BB', lastMessage: 'Can we build it?', timestamp: 'Yesterday' },
  { id: 'chat-3', name: 'Charlie Chaplin', avatarFallback: 'CC', lastMessage: 'A day without laughter...', timestamp: 'Mon' },
];

const DashboardPage = () => {
  const [activeNav, setActiveNav] = useState<'teams' | 'chats' | 'activity' | 'settings'>('teams');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const location = useLocation(); // To highlight active main content if needed

  console.log('DashboardPage loaded');

  const handlePrimaryNavClick = (navItem: 'teams' | 'chats' | 'activity' | 'settings') => {
    setActiveNav(navItem);
    setSelectedItemId(null); // Reset selection in secondary panel
  };

  const handleSecondaryItemClick = (id: string) => {
    setSelectedItemId(id);
    // In a real app, this would navigate to a specific chat or channel page
    // e.g., navigate(`/dashboard/${activeNav}/${id}`);
    console.log(`Selected ${activeNav} item: ${id}`);
  };
  
  const renderSecondaryPanelContent = () => {
    switch (activeNav) {
      case 'teams':
        return (
          <ScrollArea className="h-full p-2">
            <h2 className="text-lg font-semibold p-2 sticky top-0 bg-background z-10">Teams</h2>
            {mockTeams.map(team => (
              <TeamChannelListItem
                key={team.id}
                id={team.id}
                name={team.name}
                avatarFallback={team.avatarFallback}
                unreadCount={team.unreadCount}
                isActive={selectedItemId === team.id}
                onClick={handleSecondaryItemClick}
                avatarUrl={`https://i.pravatar.cc/40?u=${team.id}`}
              />
            ))}
          </ScrollArea>
        );
      case 'chats':
        return (
          <ScrollArea className="h-full p-2">
            <h2 className="text-lg font-semibold p-2 sticky top-0 bg-background z-10">Chats</h2>
            {mockChats.map(chat => (
              <ChatListItem
                key={chat.id}
                id={chat.id}
                name={chat.name}
                avatarFallback={chat.avatarFallback}
                lastMessage={chat.lastMessage}
                timestamp={chat.timestamp}
                unreadCount={chat.unreadCount}
                isActive={selectedItemId === chat.id}
                onClick={handleSecondaryItemClick}
                avatarUrl={`https://i.pravatar.cc/40?u=${chat.id}`}
              />
            ))}
          </ScrollArea>
        );
      case 'activity':
        return <div className="p-4 text-center">Activity Feed (coming soon)</div>;
      case 'settings':
        return <div className="p-4 text-center">Application Settings (coming soon)</div>;
      default:
        return null;
    }
  };

  // Determine what to show in the main content area based on selection or Outlet
  // For this example, if an item is selected, we show its name.
  // In a real app with nested routes, <Outlet /> would render the matched child route.
  const renderMainContent = () => {
    // If location.pathname suggests a child route is active, Outlet will handle it.
    // Otherwise, show a placeholder or detail based on selectedItemId.
    if (location.pathname !== '/dashboard' && location.pathname !== '/dashboard/') {
      return <Outlet />;
    }
    if (selectedItemId) {
        const selectedItem = activeNav === 'teams'
            ? mockTeams.find(t => t.id === selectedItemId)
            : mockChats.find(c => c.id === selectedItemId);
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Viewing: {selectedItem?.name}</h1>
                <p className="mt-4 text-gray-600">
                    This is where the detailed content for '{selectedItem?.name}' would appear.
                    For example, a <Link to={`/chat/${selectedItemId}`} className="text-blue-500 hover:underline">ChatPage</Link> or <Link to={`/team-channel/${selectedItemId}`} className="text-blue-500 hover:underline">TeamChannelPage</Link>.
                </p>
            </div>
        );
    }
    return (
        <div className="p-6 flex flex-col items-center justify-center h-full">
            <LayoutGrid className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">Select an item</h2>
            <p className="text-gray-500">Choose a team or chat from the sidebar to view details.</p>
        </div>
    );
  };


  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            <img src="https://placehold.co/100x30/007bff/white?text=Logo" alt="App Logo" className="h-8" />
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input placeholder="Search..." className="pl-8 w-64" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/40?u=user-profile" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><UserCircle className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /> Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Layout */}
        <ResizablePanelGroup direction="horizontal" className="flex-grow">
          {/* Primary Navigation Sidebar */}
          <ResizablePanel defaultSize={5} minSize={5} maxSize={10} className="bg-gray-50 dark:bg-gray-800 p-2 flex flex-col items-center space-y-3">
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={activeNav === 'teams' ? 'secondary' : 'ghost'} size="icon" onClick={() => handlePrimaryNavClick('teams')}>
                        <Users className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Teams</TooltipContent>
             </Tooltip>
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={activeNav === 'chats' ? 'secondary' : 'ghost'} size="icon" onClick={() => handlePrimaryNavClick('chats')}>
                        <MessageSquare className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Chats</TooltipContent>
             </Tooltip>
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={activeNav === 'activity' ? 'secondary' : 'ghost'} size="icon" onClick={() => handlePrimaryNavClick('activity')}>
                        <Bell className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Activity</TooltipContent>
             </Tooltip>
             <div className="mt-auto"> {/* Pushes settings to bottom */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={activeNav === 'settings' ? 'secondary' : 'ghost'} size="icon" onClick={() => handlePrimaryNavClick('settings')}>
                            <Settings className="h-5 w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>
             </div>
          </ResizablePanel>
          <ResizableHandle withHandle />

          {/* Secondary Panel (Teams/Chats List) */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full border-r">
              {renderSecondaryPanelContent()}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />

          {/* Main Content Area */}
          <ResizablePanel defaultSize={75}>
            <main className="h-full bg-background">
              {/* Outlet will render child routes like ChatPage or TeamChannelPage */}
              {/* If no child route is active, render a placeholder */}
              {renderMainContent()}
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TooltipProvider>
  );
};

export default DashboardPage;