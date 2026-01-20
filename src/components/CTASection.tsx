import { Phone, MessageCircle, Mail, MapPin, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const CTASection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-accent" />
              <span className="text-accent text-sm tracking-widest uppercase font-medium">
                {language === 'zh' ? '开始合作' : 'GET STARTED'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gradient mb-6">
              {language === 'zh' ? '让飞行更智能' : 'Make Flight Smarter'}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {language === 'zh' 
                ? '无论是产品选型、技术咨询，还是定制化方案，我们的专家团队随时准备为您提供专业支持。立即联系，获取免费技术咨询。'
                : 'Whether it\'s product selection, technical consulting, or customized solutions, our expert team is ready to provide professional support. Contact us now for free technical consultation.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg shadow-neon hover:shadow-neon-intense transition-all duration-300 hover:scale-105 group">
                  {language === 'zh' ? '立即咨询' : 'Contact Now'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <a href="tel:+8617674048404">
                <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent px-8 py-6 text-lg transition-all duration-300">
                  <Phone className="w-5 h-5 mr-2" />
                  {language === 'zh' ? '电话联系' : 'Call Us'}
                </Button>
              </a>
            </div>
          </div>

          {/* Right Content - Contact Info */}
          <div className="glass-card rounded-2xl p-8 border border-accent/20">
            <h3 className="text-xl font-bold text-foreground mb-6">
              {language === 'zh' ? '联系方式' : 'Contact Info'}
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:shadow-neon transition-all duration-300">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {language === 'zh' ? '服务热线' : 'Hotline'}
                  </div>
                  <div className="font-semibold text-foreground">+86 176 7404 8404</div>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:shadow-neon transition-all duration-300">
                  <MessageCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {language === 'zh' ? '微信咨询' : 'WeChat'}
                  </div>
                  <div className="font-semibold text-foreground">cani_uav</div>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:shadow-neon transition-all duration-300">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {language === 'zh' ? '商务邮箱' : 'Email'}
                  </div>
                  <div className="font-semibold text-foreground">market@caniuav.com</div>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:shadow-neon transition-all duration-300">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {language === 'zh' ? '公司地址' : 'Address'}
                  </div>
                  <div className="font-semibold text-foreground">
                    {language === 'zh' ? '湖南省长沙市' : 'Changsha, Hunan, China'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
