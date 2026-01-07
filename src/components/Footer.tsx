import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Send } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const productLinks = [{
  name: "多旋翼无人机",
  path: "/products/multi-rotor"
}, {
  name: "自动机场",
  path: "/products/airport"
}, {
  name: "系留无人机",
  path: "/products/tethered"
}, {
  name: "物流无人机",
  path: "/products/logistics"
}, {
  name: "消防无人机",
  path: "/products/firefighting"
}, {
  name: "集群无人机",
  path: "/products/swarm"
}, {
  name: "植保无人机",
  path: "/products/agriculture"
}, {
  name: "FPV穿越机",
  path: "/fpv"
}, {
  name: "无人机配件",
  path: "/products/accessories"
}];

const applicationLinks = [{
  name: "电力巡检",
  path: "/applications/power-inspection"
}, {
  name: "无人机物流",
  path: "/applications/logistics"
}, {
  name: "环境监测",
  path: "/applications/environment"
}, {
  name: "消防应急",
  path: "/applications/firefighting"
}, {
  name: "系留应用",
  path: "/applications/tethered"
}, {
  name: "解决方案",
  path: "/applications/solutions"
}];

const softwareLinks = [{
  name: "考试系统",
  path: "/software/exam-system"
}, {
  name: "光伏巡检",
  path: "/software/pv-inspection"
}, {
  name: "无人机管理",
  path: "/software/drone-management"
}, {
  name: "电力巡检系统",
  path: "/software/power-inspection-system"
}, {
  name: "地面站",
  path: "/software/ground-station"
}];

const serviceLinks = [{
  name: "飞行服务",
  path: "/projects/flight-service"
}, {
  name: "无人机培训",
  path: "/projects/training"
}, {
  name: "无人机表演",
  path: "/projects/show"
}, {
  name: "项目合作",
  path: "/projects/cooperation"
}, {
  name: "定制研发",
  path: "/custom-research"
}];
export const Footer = () => {
  return <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Newsletter Section */}
        <div className="py-10 border-b border-primary-foreground/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold mb-2">订阅我们的最新动态</h3>
              <p className="text-primary-foreground/70 text-sm">获取最新产品资讯、行业解决方案和技术分享</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input type="email" placeholder="请输入您的邮箱" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent" />
              <Button variant="secondary" className="shrink-0 gap-2">
                <Send className="w-4 h-4" />
                订阅
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Logo showLink={false} />
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6 max-w-sm">飞迈科技是专业的无人机研发制造商，专注于工业级无人机配件的研发、生产与销售，为电力、物流、消防、应急等行业提供智能化飞行解决方案。</p>
              
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="tel:+8617674048404" className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60">服务热线</p>
                    <p className="text-sm font-medium group-hover:text-accent transition-colors">176-7404-8404</p>
                  </div>
                </a>
                <a href="mailto:market@flymind.com" className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60">商务邮箱</p>
                    <p className="text-sm font-medium group-hover:text-accent transition-colors">market@flymind.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-accent rounded-full"></span>
                产品中心
              </h4>
              <ul className="space-y-3">
                {productLinks.map(item => <li key={item.name}>
                    <Link to={item.path} className="text-primary-foreground/70 hover:text-accent text-sm transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h4 className="font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-accent rounded-full"></span>
                行业应用
              </h4>
              <ul className="space-y-3">
                {applicationLinks.map(item => <li key={item.name}>
                    <Link to={item.path} className="text-primary-foreground/70 hover:text-accent text-sm transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-accent rounded-full"></span>
                软件系统
              </h4>
              <ul className="space-y-3">
                {softwareLinks.map(item => <li key={item.name}>
                    <Link to={item.path} className="text-primary-foreground/70 hover:text-accent text-sm transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-accent rounded-full"></span>
                服务支持
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map(item => <li key={item.name}>
                    <Link to={item.path} className="text-primary-foreground/70 hover:text-accent text-sm transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item.name}
                    </Link>
                  </li>)}
              </ul>
              
              {/* Address */}
              <div className="mt-6 pt-6 border-t border-primary-foreground/10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-primary-foreground/60 mb-1">公司地址</p>
                    <p className="text-sm text-primary-foreground/80 leading-relaxed">
                      湖南省长沙市望城区<br />
                      月亮岛街道罐子岭<br />
                      澳优全球总部大楼
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-primary-foreground/60">
              <p>© 2024 飞迈科技有限公司</p>
              <span className="hidden sm:inline">|</span>
              <p>版权所有</p>
            </div>
            <div className="flex items-center flex-wrap justify-center gap-4 text-sm text-primary-foreground/60">
              <Link to="/about" className="hover:text-accent transition-colors">
                关于我们
              </Link>
              <Link to="/contact" className="hover:text-accent transition-colors">
                联系我们
              </Link>
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
      </div>
    </footer>;
};