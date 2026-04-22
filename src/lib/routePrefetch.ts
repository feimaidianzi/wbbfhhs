/**
 * Route prefetch map — keys are route patterns matching App.tsx publicRoutes.
 * Each value is the dynamic import factory for that route's chunk.
 *
 * On hover/focus/touchstart of a <LangLink>, we resolve the link's path to a
 * factory and trigger the import (the chunk is then cached by the browser /
 * Vite's module graph). Subsequent navigation skips the network round-trip.
 *
 * Cheap & idempotent: each factory is wrapped so it only fires once.
 */

type Factory = () => Promise<unknown>;

const once = (fn: Factory): Factory => {
  let p: Promise<unknown> | null = null;
  return () => (p ??= fn().catch(() => { p = null; }));
};

// Static route → chunk factory. Dynamic segments use ":param".
const routeMap: Record<string, Factory> = {
  "/about": once(() => import("@/pages/About")),
  "/applications": once(() => import("@/pages/Applications")),
  "/applications/power-inspection": once(() => import("@/pages/applications/PowerInspection")),
  "/applications/power-inspection/transmission-line": once(() => import("@/pages/applications/power/TransmissionLine")),
  "/applications/power-inspection/substation": once(() => import("@/pages/applications/power/Substation")),
  "/applications/power-inspection/solar-panel": once(() => import("@/pages/applications/power/SolarPanel")),
  "/applications/logistics": once(() => import("@/pages/applications/LogisticsApp")),
  "/applications/military": once(() => import("@/pages/applications/Military")),
  "/applications/solutions": once(() => import("@/pages/applications/Solutions")),
  "/solutions/industrial-uav-environmental-monitoring": once(() => import("@/pages/applications/EnvironmentalMonitoring")),
  "/solutions/uav-firefighting-emergency-rescue": once(() => import("@/pages/solutions/FirefightingEmergency")),
  "/solutions/industrial-uav-water-conservancy": once(() => import("@/pages/applications/WaterConservancy")),
  "/solutions/industrial-uav-transportation-monitoring": once(() => import("@/pages/applications/TransportationMonitoring")),
  "/solutions/industrial-uav-surveying-mapping": once(() => import("@/pages/solutions/SurveyingMapping")),
  "/software": once(() => import("@/pages/Software")),
  "/software/exam-system": once(() => import("@/pages/software/ExamSystem")),
  "/software/pv-inspection": once(() => import("@/pages/software/PVInspection")),
  "/software/drone-management": once(() => import("@/pages/software/DroneManagement")),
  "/software/power-inspection-system": once(() => import("@/pages/software/PowerInspectionSystem")),
  "/software/pv-system": once(() => import("@/pages/software/PVSystem")),
  "/software/environment-system": once(() => import("@/pages/software/EnvironmentSystem")),
  "/software/ground-station": once(() => import("@/pages/software/GroundStation")),
  "/software/swarm-ground-station": once(() => import("@/pages/software/SwarmGroundStation")),
  "/projects": once(() => import("@/pages/Projects")),
  "/projects/training": once(() => import("@/pages/projects/ProjectTraining")),
  "/projects/show": once(() => import("@/pages/projects/DroneShow")),
  "/projects/flight-service": once(() => import("@/pages/projects/FlightService")),
  "/projects/cooperation": once(() => import("@/pages/projects/ProjectCooperation")),
  "/custom-research": once(() => import("@/pages/CustomResearch")),
  "/custom-research/swarm": once(() => import("@/pages/custom-research/SwarmCustom")),
  "/custom-research/software": once(() => import("@/pages/custom-research/Software")),
  "/custom-research/payload": once(() => import("@/pages/custom-research/PayloadCustom")),
  "/custom-research/accessories": once(() => import("@/pages/custom-research/AccessoriesCustom")),
  "/custom-research/drone": once(() => import("@/pages/custom-research/DroneCustom")),
  "/fpv": once(() => import("@/pages/FPV")),
  "/news": once(() => import("@/pages/News")),
  "/contact": once(() => import("@/pages/Contact")),
  "/products": once(() => import("@/pages/Products")),
  "/products/catalog": once(() => import("@/pages/products/DatabaseProductList")),
  "/products/tethered": once(() => import("@/pages/products/Tethered")),
  "/products/tethered/th-100": once(() => import("@/pages/products/tethered/TH100")),
  "/products/tethered/th-200": once(() => import("@/pages/products/tethered/TH200")),
  "/products/tethered/th-300": once(() => import("@/pages/products/tethered/TH300")),
  "/products/logistics": once(() => import("@/pages/products/Logistics")),
  "/products/logistics/wl-10": once(() => import("@/pages/products/logistics/WL10")),
  "/products/logistics/wl-20": once(() => import("@/pages/products/logistics/WL20")),
  "/products/logistics/wl-30": once(() => import("@/pages/products/logistics/WL30")),
  "/products/firefighting": once(() => import("@/pages/products/Firefighting")),
  "/products/wire-laying": once(() => import("@/pages/products/WireLaying")),
  "/products/multi-rotor": once(() => import("@/pages/products/MultiRotor")),
  "/products/multi-rotor/x650": once(() => import("@/pages/products/multi-rotor/X650")),
  "/products/multi-rotor/x850": once(() => import("@/pages/products/multi-rotor/X850")),
  "/products/multi-rotor/x1200": once(() => import("@/pages/products/multi-rotor/X1200")),
  "/products/multi-rotor/x1600": once(() => import("@/pages/products/multi-rotor/X1600")),
  "/products/swarm": once(() => import("@/pages/products/Swarm")),
  "/products/swarm-kit": once(() => import("@/pages/products/SwarmKit")),
  "/products/swarm/w200": once(() => import("@/pages/products/swarm/W200")),
  "/products/swarm/w300": once(() => import("@/pages/products/swarm/W300")),
  "/products/swarm/w400": once(() => import("@/pages/products/swarm/W400")),
  "/products/agriculture": once(() => import("@/pages/products/Agriculture")),
  "/products/training": once(() => import("@/pages/products/Training")),
  "/products/work-drone": once(() => import("@/pages/products/WorkDrone")),
  "/products/accessories": once(() => import("@/pages/products/Accessories")),
  "/products/accessories/vtx-vrx": once(() => import("@/pages/products/accessories/VtxVrx")),
  "/products/accessories/fc-esc": once(() => import("@/pages/products/accessories/FcEsc")),
  "/products/accessories/fc-esc/cani-fmt": once(() => import("@/pages/products/accessories/CaniFmtDetail")),
  "/products/accessories/gimbal": once(() => import("@/pages/products/accessories/Gimbal")),
  "/products/accessories/camera": once(() => import("@/pages/products/accessories/Camera")),
  "/products/accessories/digital-fpv": once(() => import("@/pages/products/accessories/Camera")),
  "/products/accessories/elrs": once(() => import("@/pages/products/accessories/Elrs")),
  "/products/accessories/others": once(() => import("@/pages/products/accessories/OtherAccessories")),
  "/products/accessories/mesh-link": once(() => import("@/pages/products/accessories/MeshLink")),
  "/products/accessories/ai-module": once(() => import("@/pages/products/accessories/AiModule")),
};

// Dynamic-segment prefix → factory (matches first segment-after-prefix as a single param)
const dynamicMap: Array<{ prefix: string; factory: Factory }> = [
  { prefix: "/news/", factory: once(() => import("@/pages/NewsDetail")) },
  { prefix: "/fpv/", factory: once(() => import("@/pages/fpv/FPVCategory")) },
  { prefix: "/products/detail/", factory: once(() => import("@/pages/products/DatabaseProductDetail")) },
  { prefix: "/products/accessories/vtx-vrx/vrx/", factory: once(() => import("@/pages/products/accessories/VrxDetail")) },
  { prefix: "/products/accessories/vtx-vrx/", factory: once(() => import("@/pages/products/accessories/VtxDetail")) },
  { prefix: "/products/accessories/fc-esc/", factory: once(() => import("@/pages/products/accessories/FcEscDetail")) },
  { prefix: "/products/accessories/gimbal/", factory: once(() => import("@/pages/products/accessories/GimbalDetail")) },
  { prefix: "/products/accessories/camera/", factory: once(() => import("@/pages/products/accessories/CameraDetail")) },
  { prefix: "/products/accessories/digital-fpv/", factory: once(() => import("@/pages/products/accessories/DigitalFpvDetail").catch(() => import("@/pages/fpv/DigitalFpvDetail"))) },
  { prefix: "/products/accessories/elrs/", factory: once(() => import("@/pages/products/accessories/ElrsDetail")) },
  { prefix: "/products/accessories/others/", factory: once(() => import("@/pages/products/accessories/OtherAccessoriesDetail")) },
  { prefix: "/products/accessories/ai-module/", factory: once(() => import("@/pages/products/accessories/AiModuleDetail")) },
  { prefix: "/applications/power-inspection/case/", factory: once(() => import("@/pages/applications/power/CaseDetail")) },
];

const prefetched = new Set<string>();

/**
 * Strip lang prefix and querystring from a path so we can match route patterns.
 */
const normalize = (path: string): string => {
  if (!path || path.startsWith("http") || path.startsWith("//")) return "";
  // Drop hash/query
  const clean = path.split("#")[0].split("?")[0];
  // Strip leading lang segment (e.g. /en, /zh, /ja, /es-mx, /zh-tw)
  const m = clean.match(/^\/([a-z]{2}(?:-[a-z]{2})?)(\/.*|$)/i);
  const stripped = m ? (m[2] || "/") : clean;
  return stripped === "" ? "/" : stripped;
};

export const prefetchRoute = (rawPath: string): void => {
  const path = normalize(rawPath);
  if (!path || path === "/" || prefetched.has(path)) return;

  const exact = routeMap[path];
  if (exact) {
    prefetched.add(path);
    exact();
    return;
  }
  for (const { prefix, factory } of dynamicMap) {
    if (path.startsWith(prefix)) {
      prefetched.add(path);
      factory();
      return;
    }
  }
};
