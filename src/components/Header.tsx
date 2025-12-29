import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const productCategories = [
  { name: "长凌机场", href: "/products/airport", description: "全自动无人机起降平台" },
  { name: "系留无人机", href: "/products/tethered", description: "24小时不间断工作" },
  { name: "物流无人机", href: "/products/logistics", description: "高效智能配送系统" },
  { name: "消防救援", href: "/products/firefighting", description: "应急救援解决方案" },
  { name: "架线无人机", href: "/products/wire-laying", description: "电力架线专用机型" },
  { name: "多旋翼无人机", href: "/products/multi-rotor", description: "工业级多旋翼平台" },
  { name: "集群无人机", href: "/products/swarm", description: "智能集群控制系统" },
];

const navItems = [
  { name: "首页", href: "/" },
  { name: "关于长凌", href: "#about", hasDropdown: true },
  { name: "系列产品", href: "/products", hasDropdown: true, children: productCategories },
  { name: "行业应用", href: "#applications", hasDropdown: true },
  { name: "软件系统", href: "#software", hasDropdown: true },
  { name: "低空经济", href: "#economy", hasDropdown: true },
  { name: "科研定制", href: "#custom", hasDropdown: true },
  { name: "FPV", href: "#fpv" },
  { name: "新闻中心", href: "#news", hasDropdown: true },
  { name: "联系我们", href: "#contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </a>
                )}

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 w-64 bg-card rounded-lg shadow-xl py-2 mt-1 border border-border animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-3 hover:bg-accent/10 transition-colors"
                      >
                        <div className="font-medium text-card-foreground">{child.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{child.description}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Phone & Mobile Menu */}
          <div className="flex items-center gap-4">
            <a
              href="tel:18771937458"
              className="hidden md:flex items-center gap-2 text-primary-foreground"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">18771937458</span>
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
          <nav className="lg:hidden py-4 border-t border-primary-foreground/10">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-4 py-3 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-lg transition-colors"
                      onClick={() => !item.children && setIsOpen(false)}
                    >
                      {item.name}
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </a>
                  )}
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
