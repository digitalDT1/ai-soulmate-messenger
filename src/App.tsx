import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Feed from "./pages/Feed";
import Games from "./pages/Games";
import News from "./pages/News";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={session ? <Navigate to="/chat" /> : <Navigate to="/auth" />}
            />
            <Route path="/auth" element={session ? <Navigate to="/chat" /> : <Auth />} />
            <Route
              path="/chat"
              element={session ? <Chat /> : <Navigate to="/auth" />}
            />
            <Route
              path="/feed"
              element={session ? <Feed /> : <Navigate to="/auth" />}
            />
            <Route
              path="/games"
              element={session ? <Games /> : <Navigate to="/auth" />}
            />
            <Route
              path="/news"
              element={session ? <News /> : <Navigate to="/auth" />}
            />
            <Route
              path="/ai"
              element={session ? <AIAssistant /> : <Navigate to="/auth" />}
            />
            <Route
              path="/profile"
              element={session ? <Profile /> : <Navigate to="/auth" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
