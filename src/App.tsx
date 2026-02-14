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
import SwarmKit from "./pages/products/SwarmKit";


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
import FirefightingEmergency from "./pages/solutions/FirefightingEmergency";
import EnvironmentalMonitoring from "./pages/applications/EnvironmentalMonitoring";
import Solutions from "./pages/applications/Solutions";
import TransportationMonitoring from "./pages/applications/TransportationMonitoring";
import WaterConservancy from "./pages/applications/WaterConservancy";
import SurveyingMapping from "./pages/solutions/SurveyingMapping";
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
import React from "react";

const queryClient = new QueryClient(); // force rebuild

// Define all public routes as data to avoid duplication
const publicRoutes = [
  { path: "/", element: <Index /> },
  { path: "/auth", element: <Auth /> },
  { path: "/about", element: <About /> },
  { path: "/applications", element: <Applications /> },
  { path: "/applications/power-inspection", element: <PowerInspection /> },
  { path: "/applications/power-inspection/transmission-line", element: <TransmissionLine /> },
  { path: "/applications/power-inspection/substation", element: <Substation /> },
  { path: "/applications/power-inspection/solar-panel", element: <SolarPanel /> },
  { path: "/applications/power-inspection/case/:caseId", element: <CaseDetail /> },
  { path: "/applications/logistics", element: <LogisticsApp /> },
  { path: "/applications/military", element: <Military /> },
  { path: "/solutions/industrial-uav-environmental-monitoring", element: <EnvironmentalMonitoring /> },
  { path: "/solutions/uav-firefighting-emergency-rescue", element: <FirefightingEmergency /> },
  
  { path: "/applications/solutions", element: <Solutions /> },
  { path: "/solutions/industrial-uav-water-conservancy", element: <WaterConservancy /> },
  { path: "/solutions/industrial-uav-transportation-monitoring", element: <TransportationMonitoring /> },
  { path: "/solutions/industrial-uav-surveying-mapping", element: <SurveyingMapping /> },
  { path: "/software", element: <Software /> },
  { path: "/software/exam-system", element: <ExamSystem /> },
  { path: "/software/pv-inspection", element: <PVInspection /> },
  { path: "/software/drone-management", element: <DroneManagement /> },
  { path: "/software/power-inspection-system", element: <PowerInspectionSystem /> },
  { path: "/software/pv-system", element: <PVSystem /> },
  { path: "/software/environment-system", element: <EnvironmentSystem /> },
  { path: "/software/ground-station", element: <GroundStation /> },
  { path: "/software/swarm-ground-station", element: <SwarmGroundStation /> },
  { path: "/projects", element: <Projects /> },
  { path: "/projects/training", element: <ProjectTraining /> },
  { path: "/projects/show", element: <DroneShow /> },
  { path: "/projects/flight-service", element: <FlightService /> },
  { path: "/projects/cooperation", element: <ProjectCooperation /> },
  { path: "/custom-research", element: <CustomResearch /> },
  
  { path: "/custom-research/swarm", element: <SwarmCustom /> },
  { path: "/custom-research/software", element: <SoftwareCustom /> },
  { path: "/custom-research/payload", element: <PayloadCustom /> },
  { path: "/custom-research/accessories", element: <AccessoriesCustom /> },
  { path: "/custom-research/drone", element: <DroneCustom /> },
  { path: "/fpv", element: <FPV /> },
  { path: "/fpv/:category", element: <FPVCategory /> },
  { path: "/news", element: <News /> },
  { path: "/news/:id", element: <NewsDetail /> },
  { path: "/contact", element: <Contact /> },
  { path: "/products", element: <Products /> },
  { path: "/products/catalog", element: <DatabaseProductList /> },


  { path: "/products/tethered", element: <Tethered /> },
  { path: "/products/tethered/th-100", element: <TH100 /> },
  { path: "/products/tethered/th-200", element: <TH200 /> },
  { path: "/products/tethered/th-300", element: <TH300 /> },
  { path: "/products/logistics", element: <Logistics /> },
  { path: "/products/logistics/wl-10", element: <WL10 /> },
  { path: "/products/logistics/wl-20", element: <WL20 /> },
  { path: "/products/logistics/wl-30", element: <WL30 /> },
  { path: "/products/firefighting", element: <Firefighting /> },
  { path: "/products/wire-laying", element: <WireLaying /> },
  { path: "/products/multi-rotor", element: <MultiRotor /> },
  { path: "/products/multi-rotor/x650", element: <X650 /> },
  { path: "/products/multi-rotor/x850", element: <X850 /> },
  { path: "/products/multi-rotor/x1200", element: <X1200 /> },
  { path: "/products/multi-rotor/x1600", element: <X1600 /> },
  { path: "/products/swarm", element: <Swarm /> },
  { path: "/products/swarm-kit", element: <SwarmKit /> },
  { path: "/products/agriculture", element: <Agriculture /> },
  { path: "/products/training", element: <Training /> },
  { path: "/products/work-drone", element: <WorkDrone /> },
  { path: "/products/accessories", element: <Accessories /> },
  { path: "/products/accessories/vtx-vrx", element: <VtxVrx /> },
  { path: "/products/accessories/vtx-vrx/:productId", element: <VtxDetail /> },
  { path: "/products/accessories/fc-esc", element: <FcEsc /> },
  { path: "/products/accessories/fc-esc/:productId", element: <FcEscDetail /> },
  { path: "/products/accessories/gimbal", element: <Gimbal /> },
  { path: "/products/accessories/gimbal/:productId", element: <GimbalDetail /> },
  { path: "/products/accessories/camera", element: <CameraPage /> },
  { path: "/products/accessories/camera/:productId", element: <CameraDetail /> },
  { path: "/products/accessories/digital-fpv", element: <DigitalFpv /> },
  { path: "/products/accessories/digital-fpv/:productId", element: <DigitalFpvDetail /> },
  { path: "/products/accessories/elrs", element: <Elrs /> },
  { path: "/products/accessories/elrs/:productId", element: <ElrsDetail /> },
  { path: "/products/accessories/others", element: <OtherAccessories /> },
  { path: "/products/accessories/others/:productId", element: <OtherAccessoriesDetail /> },
  { path: "/products/detail/:productId", element: <DatabaseProductDetail /> },
];

// Language codes for path prefix (excluding 'zh' which uses no prefix)
const langCodes = ['en', 'vi', 'th', 'ms', 'id', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar', 'tr'];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin routes - no language prefix needed */}
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

            {/* Public routes - no prefix (Chinese default) */}
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            {/* Public routes - with language prefix (e.g., /en/about, /ja/products) */}
            {langCodes.map(lang => (
              <Route key={lang} path={`/${lang}/*`} element={<LangRoutes />} />
            ))}

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

// Sub-routes rendered under /:lang/* prefix
const LangRoutes = () => (
  <Routes>
    {publicRoutes.map(({ path, element }) => {
      // Convert absolute path to relative (remove leading /)
      const relativePath = path === '/' ? '/' : path.slice(1);
      return <Route key={path} path={relativePath === '/' ? '/' : relativePath} element={element} />;
    })}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;