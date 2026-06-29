import { useState, useRef, useEffect, useCallback } from "react";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import Mail from "lucide-react/dist/esm/icons/mail";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import User from "lucide-react/dist/esm/icons/user";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import { Button } from "@/components/ui/button";
import { LangLink as Link } from "@/components/LangLink";
import { useLangNavigate } from "@/hooks/useLangNavigate";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProductCenterMegaMenu } from "@/components/ProductCenterMegaMenu";
import swarmHeroImg from "@/assets/products/swarm-uwb-showcase.jpg";
import tetheredHeroImg from "@/assets/products/th-200-hero.png";
import logisticsHeroImg from "@/assets/seo/logistics-hero.png";
import fpvSfR5Asset from "@/assets/fpv/sf-r5.png.asset.json";
const fpvHeroImg = fpvSfR5Asset.url;

// Supabase client + types are dynamically imported to keep them off the homepage's
// critical JS path (~90KB gzip). They load during browser idle after first paint.
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t, language, isLoading } = useLanguage();
  const navigate = useLangNavigate();
  const { toast } = useToast();
  const navScrollRef = useRef<HTMLElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkNavScroll = useCallback(() => {
    const el = navScrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 5);
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  }, []);

  const scrollNav = useCallback((dir: 'left' | 'right') => {
    const el = navScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -150 : 150, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = navScrollRef.current;
    if (!el) return;

    const runCheck = () => {
      requestAnimationFrame(() => checkNavScroll());
    };

    runCheck();
    const timeoutIds = [100, 300, 700].map((delay) => window.setTimeout(runCheck, delay));

    const resizeObserver = new ResizeObserver(() => runCheck());
    resizeObserver.observe(el);
    if (el.parentElement) resizeObserver.observe(el.parentElement);

    const mutationObserver = new MutationObserver(() => runCheck());
    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    window.addEventListener('resize', runCheck);
    window.addEventListener('load', runCheck);

    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', runCheck);
      window.removeEventListener('load', runCheck);
    };
  }, [checkNavScroll, language, isLoading, user]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    const loadAuth = async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      if (cancelled) return;

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      unsubscribe = () => subscription.unsubscribe();

      const { data: { session } } = await supabase.auth.getSession();
      if (!cancelled) setUser(session?.user ?? null);
    };

    // Defer to browser idle so Supabase JS doesn't compete with LCP
    const idleId =
      'requestIdleCallback' in window
        ? (window as any).requestIdleCallback(loadAuth, { timeout: 3000 })
        : (setTimeout(loadAuth, 1500) as unknown as number);

    return () => {
      cancelled = true;
      unsubscribe?.();
      if ('cancelIdleCallback' in window && typeof idleId === 'number') {
        (window as any).cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId as unknown as ReturnType<typeof setTimeout>);
      }
    };
  }, []);

  const handleLogout = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.auth.signOut();
    toast({
      title: t('auth.success'),
      description: t('auth.logoutSuccess'),
    });
    navigate('/');
  };

  // SITE FOCUS: Industrial UAV Flight Platforms (caniuav.com)
  // Accessory categories (VTX/FC/Gimbal/Camera/ELRS/AI Module) are HIDDEN from navigation.
  // They are migrated to canilink.com (link site) and remain accessible via direct URL only.
  const droneCategories = [
    { name: t('header.tethered'), href: "/products/tethered", description: t('header.tethered.desc') },
    { name: t('header.logistics'), href: "/products/logistics", description: t('header.logistics.desc') },
    { name: t('header.swarm'), href: "/products/swarm", description: t('header.swarm.desc') },
    { name: t('header.fpvDrone'), href: "/fpv", description: t('header.fpvDrone.desc') },
  ];

  // Accessories hidden — empty array keeps the structure intact for future restoration
  const accessoryCategories: { name: string; href: string; description: string }[] = [];

  const applicationCategories = [
    { name: t('header.powerInspection'), href: "/applications/power-inspection", description: t('header.powerInspection.desc') },
    { name: t('header.logisticsApp'), href: "/applications/logistics", description: t('header.logisticsApp.desc') },
    { name: t('header.military'), href: "/applications/military", description: t('header.military.desc') },
    { name: t('header.environment'), href: "/solutions/industrial-uav-environmental-monitoring", description: t('header.environment.desc') },
    { name: t('header.firefighting'), href: "/solutions/uav-firefighting-emergency-rescue", description: t('header.firefighting.desc') },
    { name: t('header.transport'), href: "/solutions/industrial-uav-transportation-monitoring", description: t('header.transport.desc') },
    { name: t('header.tetheredApp'), href: "/products/tethered", description: t('header.tetheredApp.desc') },
    { name: t('header.solutions'), href: "/applications/solutions", description: t('header.solutions.desc') },
  ];

  const customCategories = [
    { name: t('header.accessoryCustom'), href: "/custom-research/accessories", description: t('header.accessoryCustom.desc') },
    { name: t('header.droneCustom'), href: "/custom-research/drone", description: t('header.droneCustom.desc') },
    { name: t('header.softwareCustom'), href: "/custom-research/software", description: t('header.softwareCustom.desc') },
    { name: t('header.payloadCustom'), href: "/custom-research/payload", description: t('header.payloadCustom.desc') },
  ];

  const softwareCategories = [
    { name: t('header.examSystem'), href: "/software/exam-system", description: t('header.examSystem.desc') },
    { name: t('header.pvInspection'), href: "/software/pv-inspection", description: t('header.pvInspection.desc') },
    { name: t('header.droneManagement'), href: "/software/drone-management", description: t('header.droneManagement.desc') },
    { name: t('header.powerSystem'), href: "/software/power-inspection-system", description: t('header.powerSystem.desc') },
    { name: t('header.pvSystem'), href: "/software/pv-system", description: t('header.pvSystem.desc') },
    { name: t('header.envSystem'), href: "/software/environment-system", description: t('header.envSystem.desc') },
    { name: t('header.groundStation'), href: "/software/ground-station", description: t('header.groundStation.desc') },
    { name: t('header.swarmStation'), href: "/software/swarm-ground-station", description: t('header.swarmStation.desc') },
  ];

  const projectCategories = [
    { name: t('header.droneTraining'), href: "/projects/training", description: t('header.droneTraining.desc') },
    { name: t('header.droneShow'), href: "/projects/show", description: t('header.droneShow.desc') },
    { name: t('header.flightService'), href: "/projects/flight-service", description: t('header.flightService.desc') },
    { name: t('header.cooperation'), href: "/projects/cooperation", description: t('header.cooperation.desc') },
  ];

  // 5大整机品类平铺,每个直达对应品类总览页(带配图+详细介绍的可视化大菜单)
  const productCenterCategories = [
    {
      name: t('header.swarm'),
      href: "/products/swarm",
      description: t('header.swarm.desc'),
      image: swarmHeroImg,
      detail: t('header.swarm.detail'),
    },
    {
      name: t('header.tethered'),
      href: "/products/tethered",
      description: t('header.tethered.desc'),
      image: tetheredHeroImg,
      detail: t('header.tethered.detail'),
    },
    {
      name: t('header.logistics'),
      href: "/products/logistics",
      description: t('header.logistics.desc'),
      image: logisticsHeroImg,
      detail: t('header.logistics.detail'),
    },
    {
      name: t('header.fpvDrone'),
      href: "/fpv",
      description: t('header.fpvDrone.desc'),
      image: fpvHeroImg,
      detail: t('header.fpvDrone.detail'),
    },
    ...accessoryCategories,
  ];

  const navItems = [
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.products'), href: "/products", hasDropdown: true, children: productCenterCategories },
    { name: t('nav.applications'), href: "/applications", hasDropdown: true, children: applicationCategories },
    { name: t('nav.software'), href: "/software", hasDropdown: true, children: softwareCategories },
    { name: t('nav.custom'), href: "/custom-research", hasDropdown: true, children: customCategories },
    { name: t('nav.news'), href: "/news" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50' 
        : 'bg-foreground/80 backdrop-blur-sm'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden nav:flex items-center justify-center flex-1 min-w-0 mx-1 relative overflow-hidden">
            {showLeftArrow && (
              <button
                onClick={() => scrollNav('left')}
                className={`absolute left-0 z-10 p-2 rounded-full shadow-lg border-2 transition-all hover:scale-115 active:scale-95 ${
                  isScrolled 
                    ? 'bg-accent text-accent-foreground border-accent shadow-accent/30 hover:bg-accent/90' 
                    : 'bg-background text-foreground border-border shadow-black/20 hover:bg-secondary'
                }`}
              >
                <ChevronLeft className="w-5 h-5 stroke-[3]" />
              </button>
            )}
            <nav
              ref={navScrollRef}
              onScroll={checkNavScroll}
              className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide scroll-smooth max-w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => item.children && handleMouseEnter(item.href)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-0.5 px-2 xl:px-3 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-full whitespace-nowrap ${
                      isScrolled
                        ? 'text-foreground hover:text-accent hover:bg-accent/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    } ${activeDropdown === item.href ? (isScrolled ? 'text-accent bg-accent/5' : 'text-white bg-white/10') : ''}`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${
                        activeDropdown === item.href ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>
                </div>
              ))}
            </nav>
            {showRightArrow && (
              <button
                onClick={() => scrollNav('right')}
                className={`absolute right-0 z-10 p-2 rounded-full shadow-lg border-2 transition-all hover:scale-115 active:scale-95 ${
                  isScrolled 
                    ? 'bg-accent text-accent-foreground border-accent shadow-accent/30 hover:bg-accent/90' 
                    : 'bg-background text-foreground border-border shadow-black/20 hover:bg-secondary'
                }`}
              >
                <ChevronRight className="w-5 h-5 stroke-[3]" />
              </button>
            )}
          </div>

          {/* Full-width Dropdown Menu */}
          {navItems.map((item) => (
            item.children && activeDropdown === item.href && (
              <div
                key={`dropdown-${item.href}`}
                className="fixed left-0 right-0 top-16 md:top-20 bg-background border-b border-border shadow-lg dropdown-enter z-40"
                onMouseEnter={() => handleMouseEnter(item.href)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="container-custom py-8">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                    <div className="w-12 h-0.5 bg-accent mt-2"></div>
                  </div>
                  {item.href === '/products' ? (
                    /* 产品中心:左侧分类列表 + 右侧大图介绍 (类似工业相机站标题栏) */
                    <ProductCenterMegaMenu
                      categories={item.children as any[]}
                      onSelect={() => setActiveDropdown(null)}
                      viewAllLabel={t('header.viewAllProducts') || '所有产品'}
                      viewDetailLabel={t('header.viewDetail') || '查看详情'}
                    />
                  ) : (
                    <div className={`grid gap-4 ${item.children.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}>
                      {item.children.map((child, index) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="group p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:-translate-y-0.5"
                          onClick={() => setActiveDropdown(null)}
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          <div className="font-medium text-foreground group-hover:text-accent transition-colors mb-1">
                            {child.name}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {child.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          ))}

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <LanguageSwitcher variant="minimal" className="nav:hidden" />
            <div className="hidden nav:block">
              <LanguageSwitcher className={isScrolled ? 'bg-secondary text-foreground hover:bg-secondary/80' : ''} />
            </div>
            
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className={isScrolled ? 'text-foreground hover:text-accent' : 'text-white hover:bg-white/10'}
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  {t('auth.logout')}
                </Button>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isScrolled ? 'text-foreground hover:text-accent' : 'text-white hover:bg-white/10'}
                  >
                    <User className="w-4 h-4 mr-1" />
                    {t('auth.login')}
                  </Button>
                </Link>
              )}
            </div>
            
            <a
              href="mailto:sales@caniuav.com"
              className={`hidden nav:flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                isScrolled 
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title="sales@caniuav.com"
            >
              <Mail className="w-4 h-4" />
              <span className="text-xs font-medium hidden 2xl:inline">sales@caniuav.com</span>
            </a>

            <Button
              variant="ghost"
              size="icon"
              className={`nav:hidden ${isScrolled ? 'text-foreground' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="nav:hidden py-4 border-t border-border bg-background max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
              <div className="px-4 py-2 mb-2 flex items-center justify-between">
                <LanguageSwitcher />
                {user ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    {t('auth.logout')}
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="sm" className="text-foreground">
                      <User className="w-4 h-4 mr-1" />
                      {t('auth.login')}
                    </Button>
                  </Link>
                )}
              </div>
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors"
                    onClick={() => !item.children && setIsOpen(false)}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
