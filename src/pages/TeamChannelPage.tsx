import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input"; // Or Textarea for posts
import { Button } from "@/components/ui/button";
import ChannelPostCard from '@/components/ChannelPostCard'; // Custom
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label"; // Not directly used, but good for form context
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip, Image as ImageIcon, Users, FileText, Settings } from 'lucide-react';
// import { useParams } from 'react-router-dom'; // If using dynamic team/channel IDs

// Mock Data
const mockPosts = [
  { id: 'post1', authorName: 'Dr. Elara Vance', authorAvatarFallback: 'EV', timestamp: '2 hours ago', content: 'Hey team, just pushed the latest updates to the dev branch. Please pull and test. Key changes include performance optimizations in the data processing module. #updates #dev', likesCount: 15, commentsCount: 3, authorAvatarUrl: 'https://i.pravatar.cc/40?u=elara' },
  { id: 'post2', authorName: 'Marcus Cole', authorAvatarFallback: 'MC', timestamp: '5 hours ago', content: 'Quick reminder: The client demo is scheduled for tomorrow at 10 AM. All presentation slides are in the shared drive. Let\'s sync up an hour before. @channel', likesCount: 22, commentsCount: 5, authorAvatarUrl: 'https://i.pravatar.cc/40?u=marcus' },
  { id: 'post3', authorName: 'Lena Petrova', authorAvatarFallback: 'LP', timestamp: 'Yesterday', content: 'Found an interesting article on new AI trends relevant to our project: [link]. Could be worth discussing in our next brainstorming session.', likesCount: 8, commentsCount: 1, authorAvatarUrl: 'https://i.pravatar.cc/40?u=lena' },
];

const TeamChannelPage = () => {
  // const { teamId, channelId } = useParams(); // Example: if path is /team/:teamId/channel/:channelId
  const [posts, setPosts] = useState(mockPosts);
  const [newPostContent, setNewPostContent] = useState('');

  console.log('TeamChannelPage loaded'); // console.log(`TeamChannelPage loaded for team ${teamId}, channel ${channelId}`);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim() === '') return;

    const newPost = {
      id: `post${posts.length + 1}`,
      authorName: 'CurrentUser', // From auth context
      authorAvatarFallback: 'ME',
      authorAvatarUrl: 'https://i.pravatar.cc/40?u=currentuser',
      timestamp: 'Just now',
      content: newPostContent,
      likesCount: 0,
      commentsCount: 0,
    };
    setPosts([newPost, ...posts]); // Add new post to the top
    setNewPostContent('');
  };
  
  // Placeholder: In a real app, fetch channel details based on IDs
  const channelDetails = { name: 'General Discussion', description: 'Talk about anything and everything related to Project Alpha.' };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-950">
        {/* Channel Header */}
        <header className="p-4 border-b dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex justify-between items-center">
            <div>
                <h1 className="text-xl font-semibold">{channelDetails.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{channelDetails.description}</p>
            </div>
            <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/40?u=team-alpha" alt="Team Alpha" />
                    <AvatarFallback>TA</AvatarFallback>
                </Avatar>
                <Badge variant="outline">3 Active</Badge>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon"><Users className="h-5 w-5" /></Button>
                    </TooltipTrigger>
                    <TooltipContent>View Members</TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
                    </TooltipTrigger>
                    <TooltipContent>Channel Settings</TooltipContent>
                </Tooltip>
            </div>
          </div>
        </header>

        <Tabs defaultValue="posts" className="flex-grow flex flex-col">
          <TabsList className="mx-4 mt-4 bg-white dark:bg-gray-900 rounded-t-md justify-start">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="flex-grow flex flex-col overflow-hidden p-4 pt-0">
            {/* Post Creation Area */}
            <form onSubmit={handleCreatePost} className="mb-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
              <Label htmlFor="new-post" className="sr-only">Create new post</Label>
              <Textarea
                id="new-post"
                placeholder="Share an update or ask a question..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[80px] mb-2"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  <Tooltip>
                    <TooltipTrigger asChild><Button variant="ghost" size="icon" type="button"><Paperclip className="h-5 w-5" /></Button></TooltipTrigger>
                    <TooltipContent>Attach file</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild><Button variant="ghost" size="icon" type="button"><ImageIcon className="h-5 w-5" /></Button></TooltipTrigger>
                    <TooltipContent>Add image</TooltipContent>
                  </Tooltip>
                </div>
                <Button type="submit" disabled={!newPostContent.trim()}>
                  <Send className="h-4 w-4 mr-2" /> Post
                </Button>
              </div>
            </form>

            {/* Posts List */}
            <ScrollArea className="flex-grow bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
              <div className="space-y-4">
                {posts.map(post => (
                  <ChannelPostCard
                    key={post.id}
                    id={post.id}
                    authorName={post.authorName}
                    authorAvatarUrl={post.authorAvatarUrl}
                    authorAvatarFallback={post.authorAvatarFallback}
                    timestamp={post.timestamp}
                    content={post.content}
                    likesCount={post.likesCount}
                    commentsCount={post.commentsCount}
                    onLike={(id) => console.log('Liked post:', id)}
                    onComment={(id) => console.log('Comment on post:', id)}
                    onShare={(id) => console.log('Shared post:', id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="files" className="flex-grow p-4">
            <div className="text-center py-10">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No files shared</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Files shared in this channel will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent value="integrations" className="flex-grow p-4">
             <div className="text-center py-10">
              <Settings className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No active integrations</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage channel integrations here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default TeamChannelPage;