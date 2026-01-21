import { Phone, Mail, MapPin, ArrowRight, Send, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const getProductLinks = (t: (key: string) => string) => [{
  name: t('product.multiRotor'),
  path: "/products/multi-rotor"
}, {
  name: t('accessory.vtx'),
  path: "/products/accessories/vtx-vrx"
}, {
  name: t('accessory.fc'),
  path: "/products/accessories/fc-esc"
}, {
  name: t('accessory.gimbal'),
  path: "/products/accessories/gimbal"
}, {
  name: t('accessory.digitalFpv'),
  path: "/products/accessories/digital-fpv"
}, {
  name: t('accessory.elrs'),
  path: "/products/accessories/elrs"
}];

const getApplicationLinks = (t: (key: string) => string) => [{
  name: t('app.power'),
  path: "/applications/power-inspection"
}, {
  name: t('app.logistics'),
  path: "/applications/logistics"
}, {
  name: t('app.environment'),
  path: "/applications/environment"
}, {
  name: t('app.firefighting'),
  path: "/applications/firefighting"
}, {
  name: t('app.tethered'),
  path: "/applications/tethered"
}];

const getSoftwareLinks = (t: (key: string) => string) => [{
  name: t('software.exam'),
  path: "/software/exam-system"
}, {
  name: t('software.pvInspection'),
  path: "/software/pv-inspection"
}, {
  name: t('software.management'),
  path: "/software/drone-management"
}, {
  name: t('software.powerSystem'),
  path: "/software/power-inspection-system"
}];

export const Footer = () => {
  const { t, language } = useLanguage();
  const productLinks = getProductLinks(t);
  const applicationLinks = getApplicationLinks(t);
  const softwareLinks = getSoftwareLinks(t);

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer Content */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Logo showLink={false} />
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-8 max-w-sm">
              {t('footer.company.desc')}
            </p>
            
            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-sm font-medium mb-3">{t('footer.subscribe')}</h4>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder={t('footer.email.placeholder')} 
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-accent" 
                />
                <Button size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+8617674048404" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors group">
                <Phone className="w-4 h-4" />
                <span className="text-sm">176-7404-8404</span>
              </a>
              <a href="mailto:market@caniuav.com" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors group">
                <Mail className="w-4 h-4" />
                <span className="text-sm">market@caniuav.com</span>
              </a>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="text-sm">
                  {language === 'zh' 
                    ? "湖南省长沙市望城区月亮岛街道罐子岭澳优全球总部大楼"
                    : "Ausnutria Global HQ, Wangcheng District, Changsha, Hunan, China"
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Products */}
              <div>
                <h4 className="font-semibold mb-4 text-background">{t('footer.products')}</h4>
                <ul className="space-y-2.5">
                  {productLinks.map(item => (
                    <li key={item.name}>
                      <Link 
                        to={item.path} 
                        className="text-sm text-background/60 hover:text-background transition-colors inline-flex items-center gap-1 group"
                      >
                        {item.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applications */}
              <div>
                <h4 className="font-semibold mb-4 text-background">{t('footer.applications')}</h4>
                <ul className="space-y-2.5">
                  {applicationLinks.map(item => (
                    <li key={item.name}>
                      <Link 
                        to={item.path} 
                        className="text-sm text-background/60 hover:text-background transition-colors inline-flex items-center gap-1 group"
                      >
                        {item.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Software */}
              <div>
                <h4 className="font-semibold mb-4 text-background">{t('footer.software')}</h4>
                <ul className="space-y-2.5">
                  {softwareLinks.map(item => (
                    <li key={item.name}>
                      <Link 
                        to={item.path} 
                        className="text-sm text-background/60 hover:text-background transition-colors inline-flex items-center gap-1 group"
                      >
                        {item.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
                
                {/* Quick Links */}
                <div className="mt-8">
                  <h4 className="font-semibold mb-4 text-background">{language === 'zh' ? '快速链接' : 'Quick Links'}</h4>
                  <ul className="space-y-2.5">
                    <li>
                      <Link to="/about" className="text-sm text-background/60 hover:text-background transition-colors">
                        {t('footer.aboutUs')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="text-sm text-background/60 hover:text-background transition-colors">
                        {t('footer.contactUs')}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/50">
              © 2024 {t('footer.copyright')} · {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6 text-sm text-background/50">
              <a href="#" className="hover:text-background transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-background transition-colors">{t('footer.terms')}</a>
              <span>湘ICP备xxxxxx号</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
