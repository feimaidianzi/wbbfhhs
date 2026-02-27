import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import React, { Suspense } from "react";

// Only eagerly load the homepage for fastest FCP
import Index from "./pages/Index";

// Lazy load everything else
const NotFound = React.lazy(() => import("./pages/NotFound"));
const About = React.lazy(() => import("./pages/About"));
const Applications = React.lazy(() => import("./pages/Applications"));
const Software = React.lazy(() => import("./pages/Software"));
const ExamSystem = React.lazy(() => import("./pages/software/ExamSystem"));
const PVInspection = React.lazy(() => import("./pages/software/PVInspection"));
const DroneManagement = React.lazy(() => import("./pages/software/DroneManagement"));
const PowerInspectionSystem = React.lazy(() => import("./pages/software/PowerInspectionSystem"));
const PVSystem = React.lazy(() => import("./pages/software/PVSystem"));
const EnvironmentSystem = React.lazy(() => import("./pages/software/EnvironmentSystem"));
const GroundStation = React.lazy(() => import("./pages/software/GroundStation"));
const SwarmGroundStation = React.lazy(() => import("./pages/software/SwarmGroundStation"));
const Projects = React.lazy(() => import("./pages/Projects"));
const ProjectTraining = React.lazy(() => import("./pages/projects/ProjectTraining"));
const DroneShow = React.lazy(() => import("./pages/projects/DroneShow"));
const FlightService = React.lazy(() => import("./pages/projects/FlightService"));
const ProjectCooperation = React.lazy(() => import("./pages/projects/ProjectCooperation"));
const CustomResearch = React.lazy(() => import("./pages/CustomResearch"));
const FPV = React.lazy(() => import("./pages/FPV"));
const FPVCategory = React.lazy(() => import("./pages/fpv/FPVCategory"));
const News = React.lazy(() => import("./pages/News"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Products = React.lazy(() => import("./pages/Products"));
const Tethered = React.lazy(() => import("./pages/products/Tethered"));
const Logistics = React.lazy(() => import("./pages/products/Logistics"));
const Firefighting = React.lazy(() => import("./pages/products/Firefighting"));
const WireLaying = React.lazy(() => import("./pages/products/WireLaying"));
const MultiRotor = React.lazy(() => import("./pages/products/MultiRotor"));
const Agriculture = React.lazy(() => import("./pages/products/Agriculture"));
const Training = React.lazy(() => import("./pages/products/Training"));
const WorkDrone = React.lazy(() => import("./pages/products/WorkDrone"));
const Accessories = React.lazy(() => import("./pages/products/Accessories"));
const Swarm = React.lazy(() => import("./pages/products/Swarm"));
const SwarmKit = React.lazy(() => import("./pages/products/SwarmKit"));
const SwarmW200 = React.lazy(() => import("./pages/products/swarm/W200"));
const SwarmW300 = React.lazy(() => import("./pages/products/swarm/W300"));
const SwarmW400 = React.lazy(() => import("./pages/products/swarm/W400"));
const TH100 = React.lazy(() => import("./pages/products/tethered/TH100"));
const TH200 = React.lazy(() => import("./pages/products/tethered/TH200"));
const TH300 = React.lazy(() => import("./pages/products/tethered/TH300"));
const WL10 = React.lazy(() => import("./pages/products/logistics/WL10"));
const WL20 = React.lazy(() => import("./pages/products/logistics/WL20"));
const WL30 = React.lazy(() => import("./pages/products/logistics/WL30"));
const X650 = React.lazy(() => import("./pages/products/multi-rotor/X650"));
const X850 = React.lazy(() => import("./pages/products/multi-rotor/X850"));
const X1200 = React.lazy(() => import("./pages/products/multi-rotor/X1200"));
const X1600 = React.lazy(() => import("./pages/products/multi-rotor/X1600"));
const SwarmCustom = React.lazy(() => import("./pages/custom-research/SwarmCustom"));
const SoftwareCustom = React.lazy(() => import("./pages/custom-research/Software"));
const PayloadCustom = React.lazy(() => import("./pages/custom-research/PayloadCustom"));
const AccessoriesCustom = React.lazy(() => import("./pages/custom-research/AccessoriesCustom"));
const DroneCustom = React.lazy(() => import("./pages/custom-research/DroneCustom"));
const PowerInspection = React.lazy(() => import("./pages/applications/PowerInspection"));
const TransmissionLine = React.lazy(() => import("./pages/applications/power/TransmissionLine"));
const Substation = React.lazy(() => import("./pages/applications/power/Substation"));
const SolarPanel = React.lazy(() => import("./pages/applications/power/SolarPanel"));
const CaseDetail = React.lazy(() => import("./pages/applications/power/CaseDetail"));
const LogisticsApp = React.lazy(() => import("./pages/applications/LogisticsApp"));
const Military = React.lazy(() => import("./pages/applications/Military"));
const FirefightingEmergency = React.lazy(() => import("./pages/solutions/FirefightingEmergency"));
const EnvironmentalMonitoring = React.lazy(() => import("./pages/applications/EnvironmentalMonitoring"));
const Solutions = React.lazy(() => import("./pages/applications/Solutions"));
const TransportationMonitoring = React.lazy(() => import("./pages/applications/TransportationMonitoring"));
const WaterConservancy = React.lazy(() => import("./pages/applications/WaterConservancy"));
const SurveyingMapping = React.lazy(() => import("./pages/solutions/SurveyingMapping"));
const VtxVrx = React.lazy(() => import("./pages/products/accessories/VtxVrx"));
const VtxDetail = React.lazy(() => import("./pages/products/accessories/VtxDetail"));
const FcEsc = React.lazy(() => import("./pages/products/accessories/FcEsc"));
const FcEscDetail = React.lazy(() => import("./pages/products/accessories/FcEscDetail"));
const Gimbal = React.lazy(() => import("./pages/products/accessories/Gimbal"));
const GimbalDetail = React.lazy(() => import("./pages/products/accessories/GimbalDetail"));
const CameraPage = React.lazy(() => import("./pages/products/accessories/Camera"));
const CameraDetail = React.lazy(() => import("./pages/products/accessories/CameraDetail"));
const DigitalFpv = React.lazy(() => import("./pages/fpv/DigitalFpv"));
const DigitalFpvDetail = React.lazy(() => import("./pages/fpv/DigitalFpvDetail"));
const Elrs = React.lazy(() => import("./pages/products/accessories/Elrs"));
const ElrsDetail = React.lazy(() => import("./pages/products/accessories/ElrsDetail"));
const OtherAccessories = React.lazy(() => import("./pages/products/accessories/OtherAccessories"));
const OtherAccessoriesDetail = React.lazy(() => import("./pages/products/accessories/OtherAccessoriesDetail"));
const MeshLink = React.lazy(() => import("./pages/products/accessories/MeshLink"));
const AiModule = React.lazy(() => import("./pages/products/accessories/AiModule"));
const AiModuleDetail = React.lazy(() => import("./pages/products/accessories/AiModuleDetail"));
const Auth = React.lazy(() => import("./pages/Auth"));
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const UserManagement = React.lazy(() => import("./pages/admin/UserManagement"));
const NewsManagement = React.lazy(() => import("./pages/admin/NewsManagement"));
const ContentHub = React.lazy(() => import("./pages/admin/ContentHub"));
const ProductManagement = React.lazy(() => import("./pages/admin/ProductManagement"));
const InquiryManagement = React.lazy(() => import("./pages/admin/InquiryManagement"));
const SystemSettings = React.lazy(() => import("./pages/admin/SystemSettings"));
const ActivityLogs = React.lazy(() => import("./pages/admin/ActivityLogs"));
const SpecificationTemplates = React.lazy(() => import("./pages/admin/SpecificationTemplates"));
const NewsCollection = React.lazy(() => import("./pages/admin/NewsCollection"));
const CustomerLeads = React.lazy(() => import("./pages/admin/CustomerLeads"));
const CustomerServiceChat = React.lazy(() => import("./pages/admin/CustomerServiceChat"));
const CustomerServiceLogin = React.lazy(() => import("./pages/admin/CustomerServiceLogin"));
const VisitorAnalytics = React.lazy(() => import("./pages/admin/VisitorAnalytics"));
const TranslationManagement = React.lazy(() => import("./pages/admin/TranslationManagement"));
const SEOManagement = React.lazy(() => import("./pages/admin/SEOManagement"));
const NewsDetail = React.lazy(() => import("./pages/NewsDetail"));
const DatabaseProductDetail = React.lazy(() => import("./pages/products/DatabaseProductDetail"));
const DatabaseProductList = React.lazy(() => import("./pages/products/DatabaseProductList"));

// Lazy load heavy global components
const VisitorTracker = React.lazy(() => import("./components/VisitorTracker"));
const AIAssistant = React.lazy(() => import("./components/AIAssistant").then(m => ({ default: m.AIAssistant })));
const ImageAltScanner = React.lazy(() => import("./components/ImageAltScanner").then(m => ({ default: m.ImageAltScanner })));

// ErrorBoundary is a class component - import eagerly (tiny file)
import { AIAssistantErrorBoundary } from "./components/AIAssistant/ErrorBoundary";

const queryClient = new QueryClient();

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
  { path: "/products/swarm/w200", element: <SwarmW200 /> },
  { path: "/products/swarm/w300", element: <SwarmW300 /> },
  { path: "/products/swarm/w400", element: <SwarmW400 /> },
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
  { path: "/products/accessories/mesh-link", element: <MeshLink /> },
  { path: "/products/accessories/ai-module", element: <AiModule /> },
  { path: "/products/accessories/ai-module/:productId", element: <AiModuleDetail /> },
  { path: "/products/detail/:productId", element: <DatabaseProductDetail /> },
];

// Language codes for path prefix
const langCodes = ['en', 'zh', 'vi', 'th', 'ms', 'id', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar', 'tr'];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/news" element={<NewsManagement />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/inquiries" element={<InquiryManagement />} />
              <Route path="/admin/settings" element={<SystemSettings />} />
              <Route path="/admin/logs" element={<ActivityLogs />} />
              <Route path="/admin/specification-templates" element={<SpecificationTemplates />} />
              <Route path="/admin/news-collection" element={<NewsCollection />} />
              <Route path="/admin/content-hub" element={<ContentHub />} />
              <Route path="/admin/customer-leads" element={<CustomerLeads />} />
              <Route path="/admin/customer-service" element={<CustomerServiceChat />} />
              <Route path="/admin/customer-service/login" element={<CustomerServiceLogin />} />
              <Route path="/admin/visitor-analytics" element={<VisitorAnalytics />} />
              <Route path="/admin/translations" element={<TranslationManagement />} />
              <Route path="/admin/seo-management" element={<SEOManagement />} />

              {/* Public routes */}
              {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}

              {/* Language-prefixed routes */}
              {langCodes.map(lang => (
                <Route key={lang} path={`/${lang}/*`} element={<LangRoutes />} />
              ))}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          {/* Lazy load non-critical global components */}
          <Suspense fallback={null}>
            <VisitorTracker />
            <ImageAltScanner />
            <AIAssistantErrorBoundary>
              <AIAssistant />
            </AIAssistantErrorBoundary>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

// Sub-routes rendered under /:lang/* prefix
const LangRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {publicRoutes.map(({ path, element }) => {
        const relativePath = path === '/' ? '/' : path.slice(1);
        return <Route key={path} path={relativePath === '/' ? '/' : relativePath} element={element} />;
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default App;
