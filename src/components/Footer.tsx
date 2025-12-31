import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="晓鸟科技LOGO" className="h-10 w-auto" />
              <span className="font-bold text-xl">晓鸟科技</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              专业无人机研发制造商，提供无人机定制、物流无人机、消防无人机、系留无人机等全系列产品和解决方案。
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-lg mb-4">产品中心</h4>
            <ul className="space-y-2">
              {["长凌机场", "系留无人机", "物流无人机", "消防救援", "架线无人机", "多旋翼无人机"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Applications */}
          <div>
            <h4 className="font-semibold text-lg mb-4">行业应用</h4>
            <ul className="space-y-2">
              {["水利", "交通", "环保", "智慧城市", "应急", "警用", "测绘", "电力"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
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
                <span className="text-sm">market@chaniuav.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm">湖南省邵阳市</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm text-center md:text-left">
            © 2024 晓鸟科技有限公司 版权所有
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-accent transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              服务条款
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              湘ICP备xxxxxx号
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};