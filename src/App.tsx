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
import ExamSystem from "./pages/software/ExamSystem";
import PVInspection from "./pages/software/PVInspection";
import DroneManagement from "./pages/software/DroneManagement";
import PowerInspectionSystem from "./pages/software/PowerInspectionSystem";
import PVSystem from "./pages/software/PVSystem";
import EnvironmentSystem from "./pages/software/EnvironmentSystem";
import GroundStation from "./pages/software/GroundStation";
import SwarmGroundStation from "./pages/software/SwarmGroundStation";
import Projects from "./pages/Projects";
import ProjectTraining from "./pages/projects/ProjectTraining";
import DroneShow from "./pages/projects/DroneShow";
import FlightService from "./pages/projects/FlightService";
import ProjectCooperation from "./pages/projects/ProjectCooperation";
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
import Agriculture from "./pages/products/Agriculture";
import Training from "./pages/products/Training";
import WorkDrone from "./pages/products/WorkDrone";
import Accessories from "./pages/products/Accessories";
import Swarm from "./pages/products/Swarm";
import VehicleMountedAirport from "./pages/products/airport/VehicleMountedAirport";
import UHS1000 from "./pages/products/airport/UHS1000";
import UHS600 from "./pages/products/airport/UHS600";
import UHS400P from "./pages/products/airport/UHS400P";
import TH100 from "./pages/products/tethered/TH100";
import TH200 from "./pages/products/tethered/TH200";
import TH300 from "./pages/products/tethered/TH300";
import WL10 from "./pages/products/logistics/WL10";
import WL20 from "./pages/products/logistics/WL20";
import WL30 from "./pages/products/logistics/WL30";
import X650 from "./pages/products/multi-rotor/X650";
import X850 from "./pages/products/multi-rotor/X850";
import X1200 from "./pages/products/multi-rotor/X1200";
import X1600 from "./pages/products/multi-rotor/X1600";
import AirportCustom from "./pages/custom-research/AirportCustom";
import SwarmCustom from "./pages/custom-research/SwarmCustom";
import SoftwareCustom from "./pages/custom-research/Software";
import PayloadCustom from "./pages/custom-research/PayloadCustom";
// Application detail pages
import PowerInspection from "./pages/applications/PowerInspection";
import TransmissionLine from "./pages/applications/power/TransmissionLine";
import Substation from "./pages/applications/power/Substation";
import SolarPanel from "./pages/applications/power/SolarPanel";
import CaseDetail from "./pages/applications/power/CaseDetail";
import LogisticsApp from "./pages/applications/LogisticsApp";
import Military from "./pages/applications/Military";
import EnvironmentApp from "./pages/applications/EnvironmentApp";
import FirefightingApp from "./pages/applications/FirefightingApp";
import TetheredApp from "./pages/applications/TetheredApp";
import Solutions from "./pages/applications/Solutions";

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
          <Route path="/applications/power-inspection" element={<PowerInspection />} />
          <Route path="/applications/power-inspection/transmission-line" element={<TransmissionLine />} />
          <Route path="/applications/power-inspection/substation" element={<Substation />} />
          <Route path="/applications/power-inspection/solar-panel" element={<SolarPanel />} />
          <Route path="/applications/power-inspection/case/:caseId" element={<CaseDetail />} />
          <Route path="/applications/logistics" element={<LogisticsApp />} />
          <Route path="/applications/military" element={<Military />} />
          <Route path="/applications/environment" element={<EnvironmentApp />} />
          <Route path="/applications/firefighting" element={<FirefightingApp />} />
          <Route path="/applications/tethered" element={<TetheredApp />} />
          <Route path="/applications/solutions" element={<Solutions />} />
          <Route path="/software" element={<Software />} />
          <Route path="/software/exam-system" element={<ExamSystem />} />
          <Route path="/software/pv-inspection" element={<PVInspection />} />
          <Route path="/software/drone-management" element={<DroneManagement />} />
          <Route path="/software/power-inspection-system" element={<PowerInspectionSystem />} />
          <Route path="/software/pv-system" element={<PVSystem />} />
          <Route path="/software/environment-system" element={<EnvironmentSystem />} />
          <Route path="/software/ground-station" element={<GroundStation />} />
          <Route path="/software/swarm-ground-station" element={<SwarmGroundStation />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/training" element={<ProjectTraining />} />
          <Route path="/projects/show" element={<DroneShow />} />
          <Route path="/projects/flight-service" element={<FlightService />} />
          <Route path="/projects/cooperation" element={<ProjectCooperation />} />
          <Route path="/custom-research" element={<CustomResearch />} />
          <Route path="/custom-research/airport" element={<AirportCustom />} />
          <Route path="/custom-research/swarm" element={<SwarmCustom />} />
          <Route path="/custom-research/software" element={<SoftwareCustom />} />
          <Route path="/custom-research/payload" element={<PayloadCustom />} />
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
          <Route path="/products/tethered/th-100" element={<TH100 />} />
          <Route path="/products/tethered/th-200" element={<TH200 />} />
          <Route path="/products/tethered/th-300" element={<TH300 />} />
          <Route path="/products/logistics" element={<Logistics />} />
          <Route path="/products/logistics/wl-10" element={<WL10 />} />
          <Route path="/products/logistics/wl-20" element={<WL20 />} />
          <Route path="/products/logistics/wl-30" element={<WL30 />} />
          <Route path="/products/firefighting" element={<Firefighting />} />
          <Route path="/products/wire-laying" element={<WireLaying />} />
          <Route path="/products/multi-rotor" element={<MultiRotor />} />
          <Route path="/products/multi-rotor/x650" element={<X650 />} />
          <Route path="/products/multi-rotor/x850" element={<X850 />} />
          <Route path="/products/multi-rotor/x1200" element={<X1200 />} />
          <Route path="/products/multi-rotor/x1600" element={<X1600 />} />
          <Route path="/products/swarm" element={<Swarm />} />
          <Route path="/products/agriculture" element={<Agriculture />} />
          <Route path="/products/training" element={<Training />} />
          <Route path="/products/work-drone" element={<WorkDrone />} />
          <Route path="/products/accessories" element={<Accessories />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
