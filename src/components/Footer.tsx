import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";

const productLinks = [
  { name: "飞迈机场", href: "/products/airport" },
  { name: "系留无人机", href: "/products/tethered" },
  { name: "物流无人机", href: "/products/logistics" },
  { name: "集群无人机", href: "/products/swarm" },
  { name: "消防救援", href: "/products/firefighting" },
  { name: "配件及设备", href: "/products/accessories" },
];

const applicationLinks = [
  { name: "电力巡检", href: "/applications/power-inspection" },
  { name: "物流配送", href: "/applications/logistics" },
  { name: "应急救援", href: "/applications/firefighting" },
  { name: "环境监测", href: "/applications/environment" },
  { name: "系留应用", href: "/applications/tethered" },
  { name: "解决方案", href: "/applications/solutions" },
];

const accessoryLinks = [
  { name: "VTX/VRX", href: "/products/accessories/vtx-vrx" },
  { name: "飞控/电调", href: "/products/accessories/fc-esc" },
  { name: "吊舱/云台", href: "/products/accessories/gimbal" },
  { name: "数字图传", href: "/products/accessories/digital-fpv" },
  { name: "ELRS", href: "/products/accessories/elrs" },
  { name: "其他配件", href: "/products/accessories/others" },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo showLink={false} />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              专业无人机研发制造商，提供无人机定制、物流无人机、消防无人机、系留无人机等全系列产品和解决方案。
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-lg mb-4">产品中心</h4>
            <ul className="space-y-2">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accessories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">配件及设备</h4>
            <ul className="space-y-2">
              {accessoryLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div>
            <h4 className="font-semibold text-lg mb-4">行业应用</h4>
            <ul className="space-y-2">
              {applicationLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">联系我们</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-sm">+8617674048404</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-accent" />
                <span className="text-sm">QQ客服在线</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-sm">market@flymind.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm">湖南省长沙市</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm text-center md:text-left">
            © 2024 飞迈科技有限公司 版权所有
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
            <Link to="/about" className="hover:text-accent transition-colors">
              关于我们
            </Link>
            <Link to="/contact" className="hover:text-accent transition-colors">
              联系我们
            </Link>
            <a href="#" className="hover:text-accent transition-colors">
              湘ICP备xxxxxx号
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
