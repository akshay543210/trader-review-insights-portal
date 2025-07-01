
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Import existing pages
import Index from "./pages/Index";
import AllPropFirms from "./pages/AllPropFirms";
import Comparison from "./pages/Comparison";
import CheapFirms from "./pages/CheapFirms";
import TopFirms from "./pages/TopFirms";
import PropFirmDetail from "./pages/PropFirmDetail";
import NotFound from "./pages/NotFound";

// Import new auth and admin pages
import Auth from "./pages/Auth";
import AdminLayout from "./pages/AdminLayout";
import ExploreFirms from "./pages/admin/ExploreFirms";
import CheapFirmsAdmin from "./pages/admin/CheapFirms";
import TopFirmsAdmin from "./pages/admin/TopFirms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/propfirms" element={<AllPropFirms />} />
            <Route path="/compare" element={<Comparison />} />
            <Route path="/cheap-firms" element={<CheapFirms />} />
            <Route path="/top-firms" element={<TopFirms />} />
            <Route path="/firms/:id" element={<PropFirmDetail />} />
            
            {/* Auth routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/explore-firms" replace />} />
              <Route path="explore-firms" element={<ExploreFirms />} />
              <Route path="cheap-firms" element={<CheapFirmsAdmin />} />
              <Route path="top-firms" element={<TopFirmsAdmin />} />
            </Route>
            
            {/* Legacy admin routes - redirect to new structure */}
            <Route path="/admin-login" element={<Navigate to="/auth" replace />} />
            <Route path="/admin-dashboard-2024" element={<Navigate to="/admin" replace />} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
