import { useState, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const getDroneCategories = (language: 'zh' | 'en') => [
  { name: language === 'zh' ? "飞迈机场" : "Drone Nest", href: "/products/airport", description: language === 'zh' ? "全自动无人机起降平台" : "Automatic drone take-off and landing platform" },
  { name: language === 'zh' ? "系留无人机" : "Tethered Drone", href: "/products/tethered", description: language === 'zh' ? "24小时不间断工作" : "24-hour continuous operation" },
  { name: language === 'zh' ? "物流无人机" : "Logistics Drone", href: "/products/logistics", description: language === 'zh' ? "高效智能配送系统" : "Efficient intelligent delivery system" },
  { name: language === 'zh' ? "集群无人机" : "Swarm Drone", href: "/products/swarm", description: language === 'zh' ? "智能集群控制系统" : "Intelligent swarm control system" },
  { name: language === 'zh' ? "FPV穿越机" : "FPV Drone", href: "/fpv", description: language === 'zh' ? "第一视角飞行体验" : "First-person view flight experience" },
];

const getAccessoryCategories = (language: 'zh' | 'en') => [
  { name: "VTX/VRX", href: "/products/accessories/vtx-vrx", description: language === 'zh' ? "视频发射与接收模块" : "Video transmitter and receiver modules" },
  { name: language === 'zh' ? "飞控/电调" : "FC/ESC", href: "/products/accessories/fc-esc", description: language === 'zh' ? "飞控与电调系统" : "Flight controller and ESC systems" },
  { name: language === 'zh' ? "吊舱/云台" : "Gimbal/Pod", href: "/products/accessories/gimbal", description: language === 'zh' ? "专业稳定云台系统" : "Professional stabilization gimbal systems" },
  { name: language === 'zh' ? "数字图传" : "Digital FPV", href: "/products/accessories/digital-fpv", description: language === 'zh' ? "高清数字图像传输" : "HD digital video transmission" },
  { name: language === 'zh' ? "相机" : "Camera", href: "/products/accessories/camera", description: language === 'zh' ? "专业航拍相机" : "Professional aerial cameras" },
  { name: "ELRS", href: "/products/accessories/elrs", description: language === 'zh' ? "远距离控制链路" : "Long-range control link" },
  { name: language === 'zh' ? "其他配件" : "Other Accessories", href: "/products/accessories/others", description: language === 'zh' ? "辅助配件装备" : "Auxiliary accessories and equipment" },
];

const getApplicationCategories = (language: 'zh' | 'en') => [
  { name: language === 'zh' ? "电力巡检" : "Power Inspection", href: "/applications/power-inspection", description: language === 'zh' ? "输电线路智能巡检" : "Smart transmission line inspection" },
  { name: language === 'zh' ? "物流应用" : "Logistics", href: "/applications/logistics", description: language === 'zh' ? "无人机物流配送" : "Drone logistics delivery" },
  { name: language === 'zh' ? "军事应用" : "Military", href: "/applications/military", description: language === 'zh' ? "侦察监视与通信中继" : "Reconnaissance and communication relay" },
  { name: language === 'zh' ? "环保应用" : "Environmental", href: "/applications/environment", description: language === 'zh' ? "环境监测与治理" : "Environmental monitoring and management" },
  { name: language === 'zh' ? "消防应急" : "Firefighting", href: "/applications/firefighting", description: language === 'zh' ? "火情侦察与应急救援" : "Fire reconnaissance and emergency rescue" },
  { name: language === 'zh' ? "系留应用" : "Tethered", href: "/applications/tethered", description: language === 'zh' ? "24小时持续滞空" : "24-hour continuous aerial operations" },
  { name: language === 'zh' ? "解决方案" : "Solutions", href: "/applications/solutions", description: language === 'zh' ? "完整行业解决方案" : "Complete industry solutions" },
];

const getCustomCategories = (language: 'zh' | 'en') => [
  { name: language === 'zh' ? "无人机配件定制" : "Accessory Customization", href: "/custom-research/accessories", description: language === 'zh' ? "专业配件定制服务" : "Professional accessory customization" },
  { name: language === 'zh' ? "无人机整机定制" : "Drone Customization", href: "/custom-research/drone", description: language === 'zh' ? "整机系统定制开发" : "Complete drone system customization" },
  { name: language === 'zh' ? "无人机软件定制" : "Software Customization", href: "/custom-research/software", description: language === 'zh' ? "地面站与算法定制" : "Ground station and algorithm customization" },
  { name: language === 'zh' ? "无人机挂载定制" : "Payload Customization", href: "/custom-research/payload", description: language === 'zh' ? "专业挂载载荷定制" : "Professional payload customization" },
];

const getSoftwareCategories = (language: 'zh' | 'en') => [
  { name: language === 'zh' ? "模拟考试系统" : "Exam Simulation", href: "/software/exam-system", description: language === 'zh' ? "无人机培训考核平台" : "Drone training assessment platform" },
  { name: language === 'zh' ? "光伏巡检识别系统" : "PV Inspection AI", href: "/software/pv-inspection", description: language === 'zh' ? "AI光伏缺陷识别" : "AI solar panel defect detection" },
  { name: language === 'zh' ? "无人机管理平台" : "Drone Management", href: "/software/drone-management", description: language === 'zh' ? "设备与任务管理" : "Equipment and task management" },
  { name: language === 'zh' ? "电力巡检管理系统" : "Power Inspection", href: "/software/power-inspection-system", description: language === 'zh' ? "输电线路智能巡检" : "Smart transmission line inspection" },
  { name: language === 'zh' ? "光伏巡检系统" : "PV System", href: "/software/pv-system", description: language === 'zh' ? "光伏电站运维管理" : "Solar plant O&M management" },
  { name: language === 'zh' ? "环保管理系统" : "Environmental System", href: "/software/environment-system", description: language === 'zh' ? "环境监测管理平台" : "Environmental monitoring platform" },
  { name: language === 'zh' ? "无人机地面站软件" : "Ground Station", href: "/software/ground-station", description: language === 'zh' ? "专业飞控地面站" : "Professional flight control station" },
  { name: language === 'zh' ? "集群地面站软件" : "Swarm Station", href: "/software/swarm-ground-station", description: language === 'zh' ? "集群编队控制" : "Swarm formation control" },
];

const getProjectCategories = (language: 'zh' | 'en') => [
  { name: language === 'zh' ? "无人机培训" : "Drone Training", href: "/projects/training", description: language === 'zh' ? "专业飞手培训服务" : "Professional pilot training" },
  { name: language === 'zh' ? "无人机表演" : "Drone Show", href: "/projects/show", description: language === 'zh' ? "集群灯光表演服务" : "Swarm light show services" },
  { name: language === 'zh' ? "飞行服务" : "Flight Service", href: "/projects/flight-service", description: language === 'zh' ? "专业飞行作业服务" : "Professional flight operation services" },
  { name: language === 'zh' ? "项目合作" : "Cooperation", href: "/projects/cooperation", description: language === 'zh' ? "定制化项目合作" : "Customized project cooperation" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t, language } = useLanguage();

  const droneCategories = getDroneCategories(language);
  const accessoryCategories = getAccessoryCategories(language);
  const applicationCategories = getApplicationCategories(language);
  const customCategories = getCustomCategories(language);
  const softwareCategories = getSoftwareCategories(language);
  const projectCategories = getProjectCategories(language);

  const productCenterCategories = [
    { name: language === 'zh' ? "多旋翼无人机" : "Multi-Rotor Drone", href: "/products", description: language === 'zh' ? "专业多旋翼无人机系列" : "Professional multi-rotor drone series", hasSubmenu: true, submenuItems: droneCategories },
    ...accessoryCategories
  ];

  const navItems = [
    { name: t('nav.home'), href: "/" },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
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
                  className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors ${
                    activeDropdown === item.name 
                      ? 'text-primary-foreground' 
                      : 'text-primary-foreground/90 hover:text-primary-foreground'
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
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
                className="fixed left-0 right-0 top-16 md:top-20 backdrop-blur-xl bg-background/95 shadow-2xl border-t border-b border-border/30 animate-dropdown-in z-40"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="container-custom py-8">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                  </div>
                  <div className={`grid gap-6 ${item.children.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}>
                    {item.children.map((child, index) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="group flex flex-col rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-accent/50 hover:-translate-y-1"
                        onClick={() => setActiveDropdown(null)}
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <div className="p-4">
                          <div className="font-semibold text-foreground group-hover:text-accent transition-colors text-base mb-1">{child.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">{child.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          ))}

          {/* Language Switcher, Phone & Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <a
              href="tel:+8617674048404"
              className="hidden md:flex items-center gap-2 text-primary-foreground"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+8617674048404</span>
            </a>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-primary-foreground/10 max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
              <div className="px-4 py-2 mb-2">
                <LanguageSwitcher />
              </div>
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center justify-between px-4 py-3 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-lg transition-colors"
                    onClick={() => !item.children && setIsOpen(false)}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  {/* Mobile Dropdown */}
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
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
