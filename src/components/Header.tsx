import { useState, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const productCategories = [
  { name: "长凌机场", href: "/products/airport", description: "全自动无人机起降平台", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=120&q=80" },
  { name: "系留无人机", href: "/products/tethered", description: "24小时不间断工作", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&q=80" },
  { name: "物流无人机", href: "/products/logistics", description: "高效智能配送系统", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=120&q=80" },
  { name: "架线无人机", href: "/products/wire-laying", description: "电力架线专用机型", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=120&q=80" },
  { name: "多旋翼无人机", href: "/products/multi-rotor", description: "工业级多旋翼平台", image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=120&q=80" },
  { name: "集群无人机", href: "/products/swarm", description: "智能集群控制系统", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80" },
  { name: "植保无人机", href: "/products/agriculture", description: "智慧农业喷洒作业", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=120&q=80" },
  { name: "教练无人机", href: "/products/training", description: "专业培训教学机型", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&q=80" },
  { name: "作业无人机", href: "/products/work-drone", description: "复合翼长航时平台", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=120&q=80" },
  { name: "FPV穿越机", href: "/fpv", description: "第一视角飞行体验", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&q=80" },
  { name: "无人机配件", href: "/products/accessories", description: "原装配件与工具", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80" },
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

const navItems = [
  { name: "首页", href: "/" },
  { name: "关于长凌", href: "/about" },
  { name: "系列产品", href: "/products", hasDropdown: true, children: productCategories },
  { name: "行业应用", href: "/applications", hasDropdown: true, children: applicationCategories },
  { name: "软件系统", href: "/software" },
  { name: "低空经济", href: "/low-altitude" },
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
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">长</span>
              </div>
              <span className="text-primary-foreground font-bold text-xl hidden sm:block">长凌电子</span>
            </div>
          </Link>

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
                  <div className={`grid gap-6 ${item.children.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'}`}>
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
