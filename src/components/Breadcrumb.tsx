import { useLocation } from "react-router-dom";
import { LangLink as Link } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, Home } from "lucide-react";

// Route segment to translation key mapping
const SEGMENT_LABELS: Record<string, string> = {
  // Top-level
  products: "nav.products",
  about: "about.title",
  contact: "nav.contact",
  news: "nav.news",
  fpv: "product.fpv",
  applications: "app.solutions",
  solutions: "app.solutions",
  software: "nav.software",
  projects: "project.show",
  "custom-research": "nav.custom",

  // Products sub
  tethered: "app.tethered",
  logistics: "app.logistics",
  swarm: "platforms.swarm.title",
  "swarm-kit": "platforms.swarm.title",
  "multi-rotor": "platforms.categories.title",
  accessories: "elrs.breadcrumb.accessories",
  firefighting: "flight.rescue",
  "wire-laying": "nav.products",
  agriculture: "nav.products",
  training: "training.desc",
  "work-drone": "nav.products",
  catalog: "products.all",

  // Accessories sub
  "vtx-vrx": "header.vtx",
  "fc-esc": "header.fcEsc",
  gimbal: "header.gimbal",
  camera: "header.camera",
  "digital-fpv": "accessory.vtx",
  elrs: "header.elrs",
  others: "header.others",
  "mesh-link": "Mesh Link",
  "ai-module": "AI Module",

  // Tethered models
  "th-100": "TH-100",
  "th-200": "TH-200",
  "th-300": "TH-300",

  // Logistics models
  "wl-10": "WL-10",
  "wl-20": "WL-20",
  "wl-30": "WL-30",

  // Multi-rotor models
  x650: "X650",
  x850: "X850",
  x1200: "X1200",
  x1600: "X1600",

  // Swarm models
  w200: "W200",
  w300: "W300",
  w400: "W400",

  // Applications sub
  "power-inspection": "power.title",
  military: "app.military",
  "transmission-line": "power.title",
  substation: "power.title",
  "solar-panel": "power.title",

  // Software sub
  "exam-system": "software.exam",
  "pv-inspection": "nav.software",
  "drone-management": "nav.software",
  "power-inspection-system": "nav.software",
  "pv-system": "nav.software",
  "environment-system": "nav.software",
  "ground-station": "nav.software",
  "swarm-ground-station": "nav.software",

  // Projects sub
  show: "show.title",
  "flight-service": "flight.title",
  cooperation: "nav.products",

  // Custom research sub
  payload: "nav.custom",
  drone: "custom.drone",
};

// Segments that are static labels (not translation keys)
const STATIC_LABELS: Record<string, string> = {
  "th-100": "TH-100",
  "th-200": "TH-200",
  "th-300": "TH-300",
  "wl-10": "WL-10",
  "wl-20": "WL-20",
  "wl-30": "WL-30",
  x650: "X650",
  x850: "X850",
  x1200: "X1200",
  x1600: "X1600",
  w200: "W200",
  w300: "W300",
  w400: "W400",
  "cani-fmt": "CANI FMT",
  "cani-pixhawk4": "CANI Pixhawk4",
};

interface BreadcrumbProps {
  /** Override automatic breadcrumb items */
  items?: { label: string; path?: string }[];
  className?: string;
}

export const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  const { t } = useLanguage();
  const location = useLocation();

  // Strip language prefix from pathname
  const langPrefixes = [
    "/en", "/zh", "/vi", "/th", "/ms", "/id",
    "/ja", "/ko", "/fr", "/de", "/es", "/ru", "/ar", "/tr",
  ];
  let pathname = location.pathname;
  for (const prefix of langPrefixes) {
    if (pathname.startsWith(prefix + "/") || pathname === prefix) {
      pathname = pathname.slice(prefix.length) || "/";
      break;
    }
  }

  // Don't render on homepage
  if (pathname === "/" || pathname === "") return null;

  // Build breadcrumb items
  const crumbs: { label: string; path?: string }[] = [];

  if (items) {
    // Use provided items
    crumbs.push(...items);
  } else {
    // Auto-generate from path
    const segments = pathname.split("/").filter(Boolean);

    segments.forEach((segment, index) => {
      const path = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;

      // Check if it's a static label (model number etc.)
      if (STATIC_LABELS[segment]) {
        crumbs.push({
          label: STATIC_LABELS[segment],
          path: isLast ? undefined : path,
        });
        return;
      }

      // Check translation key mapping
      const translationKey = SEGMENT_LABELS[segment];
      if (translationKey) {
        const label = t(translationKey) || segment;
        crumbs.push({
          label,
          path: isLast ? undefined : path,
        });
      } else {
        // For dynamic segments (UUIDs, product IDs), skip or show generic
        // Skip UUID-like segments in breadcrumb display
        if (segment.length > 20) return;
        crumbs.push({
          label: segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          path: isLast ? undefined : path,
        });
      }
    });
  }

  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`bg-secondary/80 backdrop-blur-sm border-b border-border/50 ${className}`}
    >
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-1.5 py-3 text-sm overflow-x-auto">
          {/* Home */}
          <li className="flex items-center gap-1.5 shrink-0">
            <Link
              to="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
              aria-label={t("nav.home")}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t("nav.home")}</span>
            </Link>
          </li>

          {crumbs.map((crumb, index) => (
            <li key={index} className="flex items-center gap-1.5 shrink-0">
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="text-muted-foreground hover:text-accent transition-colors whitespace-nowrap"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium whitespace-nowrap">
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};
