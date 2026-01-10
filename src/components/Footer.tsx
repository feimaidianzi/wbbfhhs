import { Phone, Mail, MapPin, ArrowRight, Send } from "lucide-react";
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
}, {
  name: t('accessory.others'),
  path: "/products/accessories/others"
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
}, {
  name: t('app.solutions'),
  path: "/applications/solutions"
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
}, {
  name: t('software.groundStation'),
  path: "/software/ground-station"
}];

const getCustomLinks = (t: (key: string) => string) => [{
  name: t('custom.accessories'),
  path: "/custom-research"
}, {
  name: t('custom.drone'),
  path: "/custom-research"
}, {
  name: t('custom.software'),
  path: "/custom-research/software"
}, {
  name: t('custom.payload'),
  path: "/custom-research/payload"
}];

export const Footer = () => {
  const { t, language } = useLanguage();
  const productLinks = getProductLinks(t);
  const applicationLinks = getApplicationLinks(t);
  const softwareLinks = getSoftwareLinks(t);
  const customLinks = getCustomLinks(t);

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
              <h3 className="text-xl font-bold mb-2">{t('footer.subscribe')}</h3>
              <p className="text-primary-foreground/70 text-sm">{t('footer.subscribe.desc')}</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input type="email" placeholder={t('footer.email.placeholder')} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent" />
              <Button variant="secondary" className="shrink-0 gap-2">
                <Send className="w-4 h-4" />
                {t('footer.subscribe.btn')}
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
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6 max-w-sm">{t('footer.company.desc')}</p>
              
              {/* Contact Info Cards */}
              <div className="flex flex-col gap-3">
                <a href="tel:+8617674048404" className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60">{t('footer.hotline')}</p>
                    <p className="text-sm font-medium group-hover:text-accent transition-colors">176-7404-8404</p>
                  </div>
                </a>
                <a href="mailto:market@caniuav.com" className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60">{t('footer.email')}</p>
                    <p className="text-sm font-medium group-hover:text-accent transition-colors whitespace-nowrap">market@caniuav.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-accent rounded-full"></span>
                {t('footer.products')}
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
                {t('footer.applications')}
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
                {t('footer.software')}
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

            {/* Custom */}
            <div>
              <h4 className="font-semibold text-lg mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-accent rounded-full"></span>
                {t('footer.custom')}
              </h4>
              <ul className="space-y-3">
                {customLinks.map(item => <li key={item.name}>
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
                    <p className="text-xs text-primary-foreground/60 mb-1">{t('footer.address')}</p>
                    <p className="text-sm text-primary-foreground/80 leading-relaxed">
                      {language === 'zh' ? (
                        <>湖南省长沙市望城区<br />月亮岛街道罐子岭<br />澳优全球总部大楼</>
                      ) : (
                        <>Ausnutria Global HQ<br />Wangcheng District<br />Changsha, Hunan, China</>
                      )}
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
              <p>© 2024 {t('footer.copyright')}</p>
              <span className="hidden sm:inline">|</span>
              <p>{t('footer.rights')}</p>
            </div>
            <div className="flex items-center flex-wrap justify-center gap-4 text-sm text-primary-foreground/60">
              <Link to="/about" className="hover:text-accent transition-colors">
                {t('footer.aboutUs')}
              </Link>
              <Link to="/contact" className="hover:text-accent transition-colors">
                {t('footer.contactUs')}
              </Link>
              <a href="#" className="hover:text-accent transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                {t('footer.terms')}
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
