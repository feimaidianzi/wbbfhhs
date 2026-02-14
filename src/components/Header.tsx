import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LangLink as Link } from "@/components/LangLink";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: t('auth.success'),
      description: t('auth.logoutSuccess'),
    });
    navigate('/');
  };

  // All categories now use t() function
  const droneCategories = [
    { name: t('header.tethered'), href: "/products/tethered", description: t('header.tethered.desc') },
    { name: t('header.logistics'), href: "/products/logistics", description: t('header.logistics.desc') },
    { name: t('header.swarm'), href: "/products/swarm", description: t('header.swarm.desc') },
    { name: t('header.fpvDrone'), href: "/fpv", description: t('header.fpvDrone.desc') },
  ];

  const accessoryCategories = [
    { name: t('header.vtx'), href: "/products/accessories/vtx-vrx", description: t('header.vtx.desc') },
    { name: t('header.fcEsc'), href: "/products/accessories/fc-esc", description: t('header.fcEsc.desc') },
    { name: t('header.gimbal'), href: "/products/accessories/gimbal", description: t('header.gimbal.desc') },
    { name: t('header.digitalFpv'), href: "/products/accessories/digital-fpv", description: t('header.digitalFpv.desc') },
    { name: t('header.camera'), href: "/products/accessories/camera", description: t('header.camera.desc') },
    { name: t('header.elrs'), href: "/products/accessories/elrs", description: t('header.elrs.desc') },
    { name: t('header.others'), href: "/products/accessories/others", description: t('header.others.desc') },
  ];

  const applicationCategories = [
    { name: t('header.powerInspection'), href: "/applications/power-inspection", description: t('header.powerInspection.desc') },
    { name: t('header.logisticsApp'), href: "/applications/logistics", description: t('header.logisticsApp.desc') },
    { name: t('header.military'), href: "/applications/military", description: t('header.military.desc') },
    { name: t('header.environment'), href: "/solutions/industrial-uav-environmental-monitoring", description: t('header.environment.desc') },
    { name: t('header.firefighting'), href: "/solutions/uav-firefighting-emergency-rescue", description: t('header.firefighting.desc') },
    { name: t('header.transport'), href: "/solutions/industrial-uav-transportation-monitoring", description: t('header.transport.desc') },
    { name: t('header.tetheredApp'), href: "/applications/tethered", description: t('header.tetheredApp.desc') },
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

  const productCenterCategories = [
    { name: t('header.multiRotor'), href: "/products", description: t('header.multiRotor.desc'), hasSubmenu: true, submenuItems: droneCategories },
    ...accessoryCategories
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
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    isScrolled
                      ? 'text-foreground hover:text-accent hover:bg-accent/5'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  } ${activeDropdown === item.name ? (isScrolled ? 'text-accent bg-accent/5' : 'text-white bg-white/10') : ''}`}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Full-width Dropdown Menu */}
          {navItems.map((item) => (
            item.children && activeDropdown === item.name && (
              <div
                key={`dropdown-${item.name}`}
                className="fixed left-0 right-0 top-16 md:top-20 bg-background border-b border-border shadow-lg dropdown-enter z-40"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="container-custom py-8">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                    <div className="w-12 h-0.5 bg-accent mt-2"></div>
                  </div>
                  <div className={`grid gap-4 ${item.children.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}>
                    {item.children.map((child, index) => (
                      <Link
                        key={child.name}
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
                </div>
              </div>
            )
          ))}

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="minimal" className="lg:hidden" />
            <div className="hidden lg:block">
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
              href="tel:+8617674048404"
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">176-7404-8404</span>
            </a>

            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${isScrolled ? 'text-foreground' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-border bg-background max-h-[70vh] overflow-y-auto">
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
                <div key={item.name}>
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
                          key={child.name}
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
