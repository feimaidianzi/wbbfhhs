import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Social media icons
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const WeChatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const MessengerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 0 0-.64.05l-2.39 1.05a.96.96 0 0 1-1.35-.85l-.07-2.14a.97.97 0 0 0-.32-.68A11.39 11.389 0 0 1 .002 11.64zm8.32-2.19-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 0 0-2.61.48z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

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

// Office locations
const getOfficeLocations = (language: 'zh' | 'en') => [
  {
    country: language === 'zh' ? '中国' : 'China',
    city: language === 'zh' ? '长沙' : 'Changsha',
    address: language === 'zh' ? '湖南省长沙市望城区' : 'Wangcheng District, Changsha, Hunan'
  },
  {
    country: language === 'zh' ? '越南' : 'Vietnam',
    city: language === 'zh' ? '胡志明市' : 'Ho Chi Minh City',
    address: language === 'zh' ? '第一郡' : 'District 1'
  },
  {
    country: language === 'zh' ? '韩国' : 'South Korea',
    city: language === 'zh' ? '首尔' : 'Seoul',
    address: language === 'zh' ? '江南区' : 'Gangnam District'
  },
  {
    country: language === 'zh' ? '马来西亚' : 'Malaysia',
    city: language === 'zh' ? '吉隆坡' : 'Kuala Lumpur',
    address: language === 'zh' ? '联邦直辖区' : 'Federal Territory'
  },
  {
    country: language === 'zh' ? '印度' : 'India',
    city: language === 'zh' ? '班加罗尔' : 'Bangalore',
    address: language === 'zh' ? '卡纳塔克邦' : 'Karnataka'
  }
];

export const Footer = () => {
  const { t, baseLang: language } = useLanguage();
  const productLinks = getProductLinks(t);
  const applicationLinks = getApplicationLinks(t);
  const softwareLinks = getSoftwareLinks(t);
  const officeLocations = getOfficeLocations(language);

  const socialLinks = [
    { icon: WeChatIcon, href: "#", label: "WeChat", id: "cani_uav" },
    { icon: WhatsAppIcon, href: "https://wa.me/84123456789", label: "WhatsApp" },
    { icon: MessengerIcon, href: "https://m.me/caniuav", label: "Messenger" },
    { icon: TelegramIcon, href: "https://t.me/caniuav", label: "Telegram" },
    { icon: LinkedInIcon, href: "https://linkedin.com/company/caniuav", label: "LinkedIn" },
  ];

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
            <div className="space-y-3 mb-6">
              <a href="mailto:market@caniuav.com" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors group">
                <Mail className="w-4 h-4" />
                <span className="text-sm">market@caniuav.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-medium mb-3">{language === 'zh' ? '联系方式' : 'Contact Us'}</h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center text-background/70 hover:text-background hover:bg-background/20 transition-colors"
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

              {/* Global Offices */}
              <div>
                <h4 className="font-semibold mb-4 text-background">{language === 'zh' ? '全球办公室' : 'Global Offices'}</h4>
                <ul className="space-y-3">
                  {officeLocations.map(office => (
                    <li key={office.country} className="flex items-start gap-2 text-background/60">
                      <MapPin className="w-3 h-3 mt-1 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-background/80">{office.country}</span>
                        <p className="text-xs">{office.city}</p>
                      </div>
                    </li>
                  ))}
                </ul>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};