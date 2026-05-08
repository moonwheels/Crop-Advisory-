import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import FarmerDashboard from "./pages/FarmerDashboard";
import Chats from "./pages/Chats";
import DiseaseDetect from "./pages/DiseaseDetect";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/Overview";
import FarmsPage from "./pages/dashboard/Farms";
import CropsPage from "./pages/dashboard/Crops";
import AnalyticsPage from "./pages/dashboard/Analytics";
import AdvisorPage from "./pages/dashboard/Advisor";
import WeatherPage from "./pages/dashboard/Weather";
import AlertsPage from "./pages/dashboard/Alerts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/disease-detect" element={<DiseaseDetect />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="farms" element={<FarmsPage />} />
                <Route path="crops" element={<CropsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="advisor" element={<AdvisorPage />} />
                <Route path="weather" element={<WeatherPage />} />
                <Route path="alerts" element={<AlertsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
