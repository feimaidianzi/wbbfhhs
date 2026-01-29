import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AIAssistant } from "@/components/AIAssistant";
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
import AccessoriesCustom from "./pages/custom-research/AccessoriesCustom";
import DroneCustom from "./pages/custom-research/DroneCustom";
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
// Accessories detail pages
import VtxVrx from "./pages/products/accessories/VtxVrx";
import VtxDetail from "./pages/products/accessories/VtxDetail";
import FcEsc from "./pages/products/accessories/FcEsc";
import FcEscDetail from "./pages/products/accessories/FcEscDetail";
import Gimbal from "./pages/products/accessories/Gimbal";
import GimbalDetail from "./pages/products/accessories/GimbalDetail";
import CameraPage from "./pages/products/accessories/Camera";
import CameraDetail from "./pages/products/accessories/CameraDetail";
import DigitalFpv from "./pages/fpv/DigitalFpv";
import DigitalFpvDetail from "./pages/fpv/DigitalFpvDetail";
import Elrs from "./pages/products/accessories/Elrs";
import ElrsDetail from "./pages/products/accessories/ElrsDetail";
import OtherAccessories from "./pages/products/accessories/OtherAccessories";
import OtherAccessoriesDetail from "./pages/products/accessories/OtherAccessoriesDetail";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import NewsManagement from "./pages/admin/NewsManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import InquiryManagement from "./pages/admin/InquiryManagement";
import SystemSettings from "./pages/admin/SystemSettings";
import ActivityLogs from "./pages/admin/ActivityLogs";
import SpecificationTemplates from "./pages/admin/SpecificationTemplates";
import DataImport from "./pages/admin/DataImport";
import NewsCollection from "./pages/admin/NewsCollection";
import CustomerLeads from "./pages/admin/CustomerLeads";
import CustomerServiceChat from "./pages/admin/CustomerServiceChat";
import CustomerServiceLogin from "./pages/admin/CustomerServiceLogin";
import VisitorAnalytics from "./pages/admin/VisitorAnalytics";
import TranslationManagement from "./pages/admin/TranslationManagement";
import HardcodedTextScanner from "./pages/admin/HardcodedTextScanner";
import SEOManagement from "./pages/admin/SEOManagement";
import AutoTranslation from "./pages/admin/AutoTranslation";
import PageMigration from "./pages/admin/PageMigration";
import VisitorTracker from "./components/VisitorTracker";
import NewsDetail from "./pages/NewsDetail";
import DatabaseProductDetail from "./pages/products/DatabaseProductDetail";
import DatabaseProductList from "./pages/products/DatabaseProductList";
import AmovlabProducts from "./pages/products/amovlab/AmovlabProducts";
import AmovlabCategoryList from "./pages/products/amovlab/AmovlabCategoryList";
import AmovlabProductDetail from "./pages/products/amovlab/AmovlabProductDetail";
import CarrierBoards from "./pages/products/CarrierBoards";
import GroundStations from "./pages/products/GroundStations";
import ResearchUGV from "./pages/products/ResearchUGV";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/news" element={<NewsManagement />} />
            <Route path="/admin/products" element={<ProductManagement />} />
            <Route path="/admin/inquiries" element={<InquiryManagement />} />
            <Route path="/admin/settings" element={<SystemSettings />} />
            <Route path="/admin/logs" element={<ActivityLogs />} />
            <Route path="/admin/specification-templates" element={<SpecificationTemplates />} />
            <Route path="/admin/data-import" element={<DataImport />} />
            <Route path="/admin/news-collection" element={<NewsCollection />} />
            <Route path="/admin/customer-leads" element={<CustomerLeads />} />
            <Route path="/admin/customer-service" element={<CustomerServiceChat />} />
            <Route path="/admin/customer-service/login" element={<CustomerServiceLogin />} />
            <Route path="/admin/visitor-analytics" element={<VisitorAnalytics />} />
            <Route path="/admin/translations" element={<TranslationManagement />} />
            <Route path="/admin/hardcoded-scanner" element={<HardcodedTextScanner />} />
            <Route path="/admin/seo-management" element={<SEOManagement />} />
            <Route path="/admin/auto-translate" element={<AutoTranslation />} />
            <Route path="/admin/page-migration" element={<PageMigration />} />
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
          <Route path="/custom-research/accessories" element={<AccessoriesCustom />} />
          <Route path="/custom-research/drone" element={<DroneCustom />} />
          <Route path="/fpv" element={<FPV />} />
          <Route path="/fpv/:category" element={<FPVCategory />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/catalog" element={<DatabaseProductList />} />
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
          <Route path="/products/accessories/vtx-vrx" element={<VtxVrx />} />
          <Route path="/products/accessories/vtx-vrx/:productId" element={<VtxDetail />} />
          <Route path="/products/accessories/fc-esc" element={<FcEsc />} />
          <Route path="/products/accessories/fc-esc/:productId" element={<FcEscDetail />} />
          <Route path="/products/accessories/gimbal" element={<Gimbal />} />
          <Route path="/products/accessories/gimbal/:productId" element={<GimbalDetail />} />
          <Route path="/products/accessories/camera" element={<CameraPage />} />
          <Route path="/products/accessories/camera/:productId" element={<CameraDetail />} />
          <Route path="/products/accessories/digital-fpv" element={<DigitalFpv />} />
          <Route path="/products/accessories/digital-fpv/:productId" element={<DigitalFpvDetail />} />
          <Route path="/products/accessories/elrs" element={<Elrs />} />
          <Route path="/products/accessories/elrs/:productId" element={<ElrsDetail />} />
          <Route path="/products/accessories/others" element={<OtherAccessories />} />
          <Route path="/products/accessories/others/:productId" element={<OtherAccessoriesDetail />} />
          <Route path="/products/detail/:productId" element={<DatabaseProductDetail />} />
          <Route path="/products/amovlab" element={<AmovlabProducts />} />
          <Route path="/products/amovlab/:categoryId" element={<AmovlabCategoryList />} />
          <Route path="/products/amovlab/:categoryId/:productId" element={<AmovlabProductDetail />} />
          <Route path="/products/carrier-boards" element={<CarrierBoards />} />
          <Route path="/products/ground-stations" element={<GroundStations />} />
          <Route path="/products/research-ugv" element={<ResearchUGV />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Global Visitor Tracking */}
          <VisitorTracker />
          {/* Global AI Assistant - visible on all pages */}
          <AIAssistant />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
