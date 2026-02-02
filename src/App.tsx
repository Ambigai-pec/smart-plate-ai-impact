import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ImpactPage from "./pages/ImpactPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MapPage from "./pages/MapPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DonorDashboard from "./pages/donor/DonorDashboard";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import NGODashboard from "./pages/ngo/NGODashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/ngo/dashboard" element={<NGODashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
