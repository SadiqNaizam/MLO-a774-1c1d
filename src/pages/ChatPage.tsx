import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MessageBubble from '@/components/MessageBubble'; // Custom
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label"; // Not directly used, but good for form context
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, Smile } from 'lucide-react';
// import { useParams } from 'react-router-dom'; // If using dynamic chat IDs

// Mock Data
const mockMessages = [
  { id: 'msg1', senderName: 'Alice Wonderland', senderAvatarFallback: 'AW', message: 'Hey Bob, how are you doing?', timestamp: '10:30 AM', isSender: false, senderAvatarUrl: 'https://i.pravatar.cc/40?u=alice' },
  { id: 'msg2', senderName: 'CurrentUser', senderAvatarFallback: 'ME', message: "Hi Alice! I'm good, thanks for asking. Just working on the new project.", timestamp: '10:31 AM', isSender: true, senderAvatarUrl: 'https://i.pravatar.cc/40?u=currentuser' },
  { id: 'msg3', senderName: 'Alice Wonderland', senderAvatarFallback: 'AW', message: 'Oh, exciting! How is it progressing?', timestamp: '10:32 AM', isSender: false, senderAvatarUrl: 'https://i.pravatar.cc/40?u=alice' },
  { id: 'msg4', senderName: 'CurrentUser', senderAvatarFallback: 'ME', message: "It's challenging but rewarding. We're hoping to launch next month.", timestamp: '10:33 AM', isSender: true, senderAvatarUrl: 'https://i.pravatar.cc/40?u=currentuser' },
  { id: 'msg5', senderName: 'Alice Wonderland', senderAvatarFallback: 'AW', message: "That's great news! Let me know if you need any help.", timestamp: '10:34 AM', isSender: false, senderAvatarUrl: 'https://i.pravatar.cc/40?u=alice' },
];

const ChatPage = () => {
  // const { chatId } = useParams(); // Example: if path is /chat/:chatId
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  console.log('ChatPage loaded'); // For chatId: console.log(`ChatPage loaded for chat ID: ${chatId}`);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsgObj = {
      id: `msg${messages.length + 1}`,
      senderName: 'CurrentUser', // This would come from auth context
      senderAvatarFallback: 'ME',
      senderAvatarUrl: 'https://i.pravatar.cc/40?u=currentuser',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
    };
    setMessages([...messages, newMsgObj]);
    setNewMessage('');
  };
  
  // Placeholder: In a real app, fetch chat partner details based on chatId
  const chatPartner = { name: 'Alice Wonderland', avatarUrl: 'https://i.pravatar.cc/40?u=alice', fallback: 'AW', status: 'Online' };


  return (
    <TooltipProvider>
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        {/* Chat Header */}
        <header className="p-4 border-b flex items-center space-x-3 dark:border-gray-700">
          <Avatar>
            <AvatarImage src={chatPartner.avatarUrl} alt={chatPartner.name} />
            <AvatarFallback>{chatPartner.fallback}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">{chatPartner.name}</h2>
            <Badge variant={chatPartner.status === 'Online' ? 'default' : 'secondary'} className={chatPartner.status === 'Online' ? 'bg-green-500' : ''}>
                {chatPartner.status}
            </Badge>
          </div>
        </header>

        {/* Messages Area */}
        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                id={msg.id}
                senderName={msg.senderName}
                senderAvatarUrl={msg.senderAvatarUrl}
                senderAvatarFallback={msg.senderAvatarFallback}
                message={msg.message}
                timestamp={msg.timestamp}
                isSender={msg.isSender}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Message Input Area */}
        <footer className="p-4 border-t dark:border-gray-700">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" type="button">
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach file</TooltipContent>
            </Tooltip>
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
              aria-label="Message input"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" type="button">
                  <Smile className="h-5 w-5" />
                  <span className="sr-only">Add emoji</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add emoji</TooltipContent>
            </Tooltip>
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default ChatPage;