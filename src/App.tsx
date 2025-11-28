import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Experience from "./pages/Experience";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/dashboard/Users";
import TrainingModules from "./pages/dashboard/TrainingModules";
import AIGuide from "./pages/dashboard/AIGuide";
import Environments from "./pages/dashboard/Environments";
import LiveSessions from "./pages/dashboard/LiveSessions";
import Analytics from "./pages/dashboard/Analytics";
import AssetsManager from "./pages/dashboard/AssetsManager";
import Settings from "./pages/dashboard/Settings";
import ChatAssistant from "./components/ChatAssistant";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="nextverse-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ChatAssistant />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/users" element={<Users />} />
              <Route path="/dashboard/modules" element={<TrainingModules />} />
              <Route path="/dashboard/ai-guide" element={<AIGuide />} />
              <Route path="/dashboard/environments" element={<Environments />} />
              <Route path="/dashboard/live-sessions" element={<LiveSessions />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/assets" element={<AssetsManager />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
