import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import { PortfolioProvider } from '@/contexts/PortfolioContext';
import Index from "./pages/Index";
import CreateAccount from "./pages/CreateAccount";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import PortfolioDetails from "./pages/PortfolioDetails";
import Admin from "./pages/Admin";
import Swap from "./pages/Swap";
import Roadmap from "./pages/Roadmap";
import ProtectedRoute from '@/components/ProtectedRoute';

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PortfolioProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/welcome" element={<ProtectedRoute><div>Welcome Page</div></ProtectedRoute>} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/details" element={<PortfolioDetails />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/roadmap" element={<Roadmap />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PortfolioProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
