import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import SpaceBackground from "./components/SpaceBackground";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import Solution from "./pages/Solution";
import Prototype from "./pages/Prototype";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-foreground relative">
            <SpaceBackground />
            <Header />
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/problem" element={<Problem />} />
                <Route path="/solution" element={<Solution />} />
                <Route path="/prototype" element={<Prototype />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
