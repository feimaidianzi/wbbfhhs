import { useState, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

const droneCategories = [
  { name: "飞迈机场", href: "/products/airport", description: "全自动无人机起降平台", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=120&q=80" },
  { name: "系留无人机", href: "/products/tethered", description: "24小时不间断工作", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&q=80" },
  { name: "物流无人机", href: "/products/logistics", description: "高效智能配送系统", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=120&q=80" },
  { name: "集群无人机", href: "/products/swarm", description: "智能集群控制系统", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80" },
  { name: "FPV穿越机", href: "/fpv", description: "第一视角飞行体验", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&q=80" },
];

const accessoryCategories = [
  { name: "VTX视频发射器", href: "/products/accessories/vtx", description: "高功率视频发射器", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&q=80" },
  { name: "VRX视频接收器", href: "/products/accessories/vrx", description: "高灵敏度视频接收", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=120&q=80" },
  { name: "其他配件", href: "/products/accessories/others", description: "辅助配件装备", image: "https://images.unsplash.com/photo-1619641805634-98e5c7f0c8d3?w=120&q=80" },
  { name: "电控系列", href: "/products/accessories/esc", description: "高性能电子调速器", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&q=80" },
  { name: "电池/充电器", href: "/products/accessories/battery", description: "高能量电池与充电设备", image: "https://images.unsplash.com/photo-1619641805634-98e5c7f0d3?w=120&q=80" },
  { name: "飞控", href: "/products/accessories/flight-controller", description: "专业飞控系统", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=120&q=80" },
  { name: "螺旋桨", href: "/products/accessories/propeller", description: "高效碳纤维螺旋桨", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&q=80" },
  { name: "ELRS", href: "/products/accessories/elrs", description: "远距离控制链路", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=120&q=80" },
  { name: "无人机吊舱", href: "/products/accessories/gimbal", description: "高性能光电吊舱", image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=120&q=80" },
];

const applicationCategories = [
  { name: "电力巡检", href: "/applications/power-inspection", description: "输电线路智能巡检", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=120&q=80" },
  { name: "物流应用", href: "/applications/logistics", description: "无人机物流配送", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=120&q=80" },
  { name: "军事应用", href: "/applications/military", description: "侦察监视与通信中继", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=120&q=80" },
  { name: "环保应用", href: "/applications/environment", description: "环境监测与治理", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&q=80" },
  { name: "消防应急", href: "/applications/firefighting", description: "火情侦察与应急救援", image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=120&q=80" },
  { name: "系留应用", href: "/applications/tethered", description: "24小时持续滞空", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&q=80" },
  { name: "解决方案", href: "/applications/solutions", description: "完整行业解决方案", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&q=80" },
];

const researchCategories = [
  { name: "机场定制", href: "/custom-research/airport", description: "无人机机场系统定制", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=120&q=80" },
  { name: "集群定制", href: "/custom-research/swarm", description: "集群无人机系统定制", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80" },
  { name: "软件定制", href: "/custom-research/software", description: "地面站与算法定制", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&q=80" },
  { name: "挂载定制", href: "/custom-research/payload", description: "专业挂载载荷定制", image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=120&q=80" },
];

const softwareCategories = [
  { name: "模拟考试系统", href: "/software/exam-system", description: "无人机培训考核平台", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=120&q=80" },
  { name: "光伏巡检识别系统", href: "/software/pv-inspection", description: "AI光伏缺陷识别", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=120&q=80" },
  { name: "无人机管理平台", href: "/software/drone-management", description: "设备与任务管理", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&q=80" },
  { name: "电力巡检管理系统", href: "/software/power-inspection-system", description: "输电线路智能巡检", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=120&q=80" },
  { name: "光伏巡检系统", href: "/software/pv-system", description: "光伏电站运维管理", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=120&q=80" },
  { name: "环保管理系统", href: "/software/environment-system", description: "环境监测管理平台", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&q=80" },
  { name: "无人机地面站软件", href: "/software/ground-station", description: "专业飞控地面站", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=120&q=80" },
  { name: "集群地面站软件", href: "/software/swarm-ground-station", description: "集群编队控制", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80" },
];

const projectCategories = [
  { name: "无人机培训", href: "/projects/training", description: "专业飞手培训服务", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=120&q=80" },
  { name: "无人机表演", href: "/projects/show", description: "集群灯光表演服务", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80" },
  { name: "飞行服务", href: "/projects/flight-service", description: "专业飞行作业服务", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&q=80" },
  { name: "项目合作", href: "/projects/cooperation", description: "定制化项目合作", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=120&q=80" },
];

const productCenterCategories = [
  { name: "多旋翼无人机", href: "/products", description: "专业多旋翼无人机系列", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&q=80", hasSubmenu: true, submenuItems: droneCategories },
  ...accessoryCategories
];

const navItems = [
  { name: "首页", href: "/" },
  { name: "关于飞迈", href: "/about" },
  { name: "产品中心", href: "/products", hasDropdown: true, children: productCenterCategories },
  { name: "行业应用", href: "/applications", hasDropdown: true, children: applicationCategories },
  { name: "软件系统", href: "/software", hasDropdown: true, children: softwareCategories },
  { name: "科研定制", href: "/custom-research", hasDropdown: true, children: researchCategories },
  { name: "新闻中心", href: "/news" },
  { name: "联系我们", href: "/contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
                        <div className="aspect-[4/3] overflow-hidden bg-muted">
                          <img 
                            src={child.image} 
                            alt={child.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
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

          {/* Phone & Mobile Menu */}
          <div className="flex items-center gap-4">
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