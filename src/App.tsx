import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip"; // Keep this if used globally
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Import Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
import TeamChannelPage from "./pages/TeamChannelPage";
import VideoCallPage from "./pages/VideoCallPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// Layout for Dashboard to handle nested routes
const DashboardLayout = () => (
  <DashboardPage>
    <Outlet /> 
  </DashboardPage>
);


const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* TooltipProvider can be here or more specific if needed */}
    {/* <TooltipProvider> */} 
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Dashboard routes with nested layout */}
          {/* The DashboardPage itself acts as the layout */}
          <Route path="/dashboard" element={<DashboardPage />}>
            {/* Index route for dashboard can be a welcome message or default view */}
            {/* For this example, DashboardPage's default content will show if no child matches */}
            {/* Specific child routes for content within DashboardPage */}
            <Route path="chat/:chatId" element={<ChatPage />} />
            <Route path="team/:teamId/channel/:channelId" element={<TeamChannelPage />} />
            {/* Add other dashboard sub-pages here */}
          </Route>
          
          <Route path="/call/:callId" element={<VideoCallPage />} />
          
          {/* Default route: If user is authenticated, redirect to dashboard, else to login */}
          {/* For simplicity, making login the default for now. Auth logic would handle redirects. */}
          <Route path="/" element={<LoginPage />} /> 

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    {/* </TooltipProvider> */}
  </QueryClientProvider>
);

export default App;