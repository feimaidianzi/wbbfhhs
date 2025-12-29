import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "首页", href: "#" },
  { name: "关于飞迈", href: "#about", hasDropdown: true },
  { name: "系列产品", href: "#products", hasDropdown: true },
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">飞</span>
              </div>
              <span className="text-primary-foreground font-bold text-xl hidden sm:block">飞迈智能</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </a>
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
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
