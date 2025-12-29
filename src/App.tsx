import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Airport from "./pages/products/Airport";
import Tethered from "./pages/products/Tethered";
import Logistics from "./pages/products/Logistics";
import Firefighting from "./pages/products/Firefighting";
import WireLaying from "./pages/products/WireLaying";
import MultiRotor from "./pages/products/MultiRotor";
import Swarm from "./pages/products/Swarm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products/airport" element={<Airport />} />
          <Route path="/products/tethered" element={<Tethered />} />
          <Route path="/products/logistics" element={<Logistics />} />
          <Route path="/products/firefighting" element={<Firefighting />} />
          <Route path="/products/wire-laying" element={<WireLaying />} />
          <Route path="/products/multi-rotor" element={<MultiRotor />} />
          <Route path="/products/swarm" element={<Swarm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
