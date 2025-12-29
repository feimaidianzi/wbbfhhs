import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Applications from "./pages/Applications";
import Software from "./pages/Software";
import LowAltitude from "./pages/LowAltitude";
import CustomResearch from "./pages/CustomResearch";
import FPV from "./pages/FPV";
import FPVCategory from "./pages/fpv/FPVCategory";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Airport from "./pages/products/Airport";
import Tethered from "./pages/products/Tethered";
import Logistics from "./pages/products/Logistics";
import Firefighting from "./pages/products/Firefighting";
import WireLaying from "./pages/products/WireLaying";
import MultiRotor from "./pages/products/MultiRotor";
import Swarm from "./pages/products/Swarm";
import VehicleMountedAirport from "./pages/products/airport/VehicleMountedAirport";
import UHS1000 from "./pages/products/airport/UHS1000";
import UHS600 from "./pages/products/airport/UHS600";
import UHS400P from "./pages/products/airport/UHS400P";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/software" element={<Software />} />
          <Route path="/low-altitude" element={<LowAltitude />} />
          <Route path="/custom-research" element={<CustomResearch />} />
          <Route path="/fpv" element={<FPV />} />
          <Route path="/fpv/:category" element={<FPVCategory />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/airport" element={<Airport />} />
          <Route path="/products/airport/vehicle-mounted" element={<VehicleMountedAirport />} />
          <Route path="/products/airport/uhs-1000" element={<UHS1000 />} />
          <Route path="/products/airport/uhs-600" element={<UHS600 />} />
          <Route path="/products/airport/uhs-400p" element={<UHS400P />} />
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
