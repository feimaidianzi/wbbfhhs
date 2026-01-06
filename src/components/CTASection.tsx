import { Phone, MessageCircle, Mail, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent text-2xl font-black">&lt;</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                开启无人机应用之旅
              </h2>
              <span className="text-accent text-2xl font-black">\&gt;</span>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              无论您需要产品咨询、技术支持，还是定制化解决方案，我们的专业团队随时为您服务。
              立即联系我们，获取免费方案咨询。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                  立即咨询
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+8617674048404">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  电话联系
                </Button>
              </a>
            </div>
          </div>

          {/* Right Content - Contact Info */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <h3 className="text-xl font-bold text-card-foreground mb-6">联系方式</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">服务热线</div>
                  <div className="font-semibold text-card-foreground">+86 176 7404 8404</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">微信咨询</div>
                  <div className="font-semibold text-card-foreground">flymind_uav</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">电子邮箱</div>
                  <div className="font-semibold text-card-foreground">market@flymind.com</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">公司地址</div>
                  <div className="font-semibold text-card-foreground">湖南省长沙市</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
