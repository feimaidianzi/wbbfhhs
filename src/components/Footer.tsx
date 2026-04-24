import Mail from "lucide-react/dist/esm/icons/mail";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Send from "lucide-react/dist/esm/icons/send";
import { Logo } from "@/components/Logo";
import { LangLink } from "@/components/LangLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/>
  </svg>
);

export const Footer = () => {
  const { t } = useLanguage();

  // SITE FOCUS: caniuav.com — Industrial UAV Flight Platforms only.
  // Component links (VTX/FC/Gimbal/DigitalFPV/ELRS) migrated to canilink.com.
  const productLinks = [
    { name: t('header.swarm'), path: "/products/swarm" },
    { name: t('header.tethered'), path: "/products/tethered" },
    { name: t('header.logistics'), path: "/products/logistics" },
    { name: t('product.multiRotor'), path: "/products/multi-rotor" },
    { name: t('header.fpvDrone'), path: "/fpv" },
  ];

  const applicationLinks = [
    { name: t('app.power'), path: "/applications/power-inspection" },
    { name: t('app.logistics'), path: "/applications/logistics" },
    { name: t('app.environment'), path: "/solutions/industrial-uav-environmental-monitoring" },
    { name: t('app.firefighting'), path: "/solutions/uav-firefighting-emergency-rescue" },
    { name: t('app.tethered'), path: "/products/tethered" },
  ];

  const softwareLinks = [
    { name: t('software.exam'), path: "/software/exam-system" },
    { name: t('software.pvInspection'), path: "/software/pv-inspection" },
    { name: t('software.management'), path: "/software/drone-management" },
    { name: t('software.powerSystem'), path: "/software/power-inspection-system" },
  ];

  const officeLocations = [
    { country: t('footer.office.china'), city: t('footer.office.changsha'), address: t('footer.office.changsha.address') },
    { country: t('footer.office.vietnam'), city: t('footer.office.hochiminh'), address: t('footer.office.hochiminh.address') },
    { country: t('footer.office.korea'), city: t('footer.office.seoul'), address: t('footer.office.seoul.address') },
    { country: t('footer.office.malaysia'), city: t('footer.office.kualalumpur'), address: t('footer.office.kualalumpur.address') },
    { country: t('footer.office.india'), city: t('footer.office.bangalore'), address: t('footer.office.bangalore.address') },
  ];

  const socialLinks = [
    { icon: WeChatIcon, href: "weixin://dl/chat?+8618008451238", label: "WeChat", id: "+8618008451238" },
    { icon: WhatsAppIcon, href: "https://wa.me/8617674048404", label: "WhatsApp" },
    { icon: MessengerIcon, href: "https://m.me/caniuav", label: "Messenger" },
    { icon: TelegramIcon, href: "https://t.me/caniuav", label: "Telegram" },
    { icon: LinkedInIcon, href: "https://linkedin.com/company/caniuav", label: "LinkedIn" },
    { icon: InstagramIcon, href: "https://instagram.com/868163685410", label: "Instagram" },
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
              <a href="mailto:sales@caniuav.com" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors group">
                <Mail className="w-4 h-4" />
                <span className="text-sm">sales@caniuav.com</span>
              </a>
              <a href="mailto:support@caniuav.com" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors group">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@caniuav.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-medium mb-3">{t('footer.contactUs')}</h4>
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
                      <LangLink 
                        to={item.path} 
                        className="text-sm text-background/60 hover:text-background transition-colors inline-flex items-center gap-1 group"
                      >
                        {item.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      </LangLink>
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
                      <LangLink 
                        to={item.path} 
                        className="text-sm text-background/60 hover:text-background transition-colors inline-flex items-center gap-1 group"
                      >
                        {item.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      </LangLink>
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
                      <LangLink 
                        to={item.path} 
                        className="text-sm text-background/60 hover:text-background transition-colors inline-flex items-center gap-1 group"
                      >
                        {item.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      </LangLink>
                    </li>
                  ))}
                </ul>
                
                {/* Quick Links */}
                <div className="mt-8">
                  <h4 className="font-semibold mb-4 text-background">{t('footer.quickLinks')}</h4>
                  <ul className="space-y-2.5">
                    <li>
                      <LangLink to="/about" className="text-sm text-background/60 hover:text-background transition-colors">
                        {t('footer.aboutUs')}
                      </LangLink>
                    </li>
                    <li>
                      <LangLink to="/contact" className="text-sm text-background/60 hover:text-background transition-colors">
                        {t('footer.contactUs')}
                      </LangLink>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Global Offices */}
              <div>
                <h4 className="font-semibold mb-4 text-background">{t('footer.globalOffices')}</h4>
                <ul className="space-y-3">
                  {officeLocations.map(office => (
                    <li key={office.country} className="flex items-start gap-2 text-background/60">
                      <MapPin className="w-3 h-3 mt-1 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-background/80">{office.country}</span>
                        <p className="text-xs">{office.city}</p>
                        {office.address && <p className="text-xs text-background/40">{office.address}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="border-t border-background/10">
        <div className="container-custom py-8">
          {/* Company Core Info */}
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-background/70 mb-2">
              {t('footer.seo.companyTitle')}
            </p>
            <p className="text-xs text-background/50">
              Email: market@caniuav.com | sales@caniuav.com | support@caniuav.com | feedback@caniuav.com
            </p>
          </div>

          <p className="text-sm text-background/50 leading-relaxed mb-4 text-center">
            {t('footer.seoDesc')}
          </p>

          {/* E-E-A-T Trust Markers */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-background/40 mb-4">
            <span>✅ {t('footer.trust.highTech')}</span>
            <span>✅ {t('footer.trust.iso')}</span>
            <span>✅ {t('footer.trust.experience')}</span>
          </div>

          {/* Core Keyword Anchors */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-background/40 mb-4">
            <LangLink to="/" className="hover:text-background/60 transition-colors underline">{t('footer.seo.keyword.droneAccessories')}</LangLink>
            <span>|</span>
            <LangLink to="/" className="hover:text-background/60 transition-colors underline">{t('footer.seo.keyword.industrialOEM')}</LangLink>
            <span>|</span>
            <LangLink to="/products/accessories/vtx-vrx" className="hover:text-background/60 transition-colors underline">{t('footer.seo.keyword.digitalFPV')}</LangLink>
            <span>|</span>
            <LangLink to="/products/accessories/fc-esc" className="hover:text-background/60 transition-colors underline">{t('footer.seo.keyword.fcEsc')}</LangLink>
            <span>|</span>
            <LangLink to="/products/accessories/gimbal" className="hover:text-background/60 transition-colors underline">{t('footer.seo.keyword.gimbal')}</LangLink>
          </div>

          {/* Comprehensive Sitemap Links for Crawlers */}
          <nav className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-background/30" aria-label={t('footer.siteMap')}>
            <LangLink to="/" className="hover:text-background/60 transition-colors">{t('nav.home')}</LangLink>
            <LangLink to="/products" className="hover:text-background/60 transition-colors">{t('footer.products')}</LangLink>
            <LangLink to="/products/accessories/vtx-vrx" className="hover:text-background/60 transition-colors">{t('accessory.vtx')}</LangLink>
            <LangLink to="/products/accessories/fc-esc" className="hover:text-background/60 transition-colors">{t('accessory.fc')}</LangLink>
            <LangLink to="/products/accessories/gimbal" className="hover:text-background/60 transition-colors">{t('accessory.gimbal')}</LangLink>
            <LangLink to="/products/accessories/digital-fpv" className="hover:text-background/60 transition-colors">{t('accessory.digitalFpv')}</LangLink>
            <LangLink to="/products/accessories/elrs" className="hover:text-background/60 transition-colors">{t('accessory.elrs')}</LangLink>
            <LangLink to="/products/tethered" className="hover:text-background/60 transition-colors">{t('product.tethered')}</LangLink>
            <LangLink to="/products/logistics" className="hover:text-background/60 transition-colors">{t('product.logistics')}</LangLink>
            <LangLink to="/products/multi-rotor" className="hover:text-background/60 transition-colors">{t('product.multiRotor')}</LangLink>
            <LangLink to="/applications" className="hover:text-background/60 transition-colors">{t('footer.applications')}</LangLink>
            <LangLink to="/applications/power-inspection" className="hover:text-background/60 transition-colors">{t('app.power')}</LangLink>
            <LangLink to="/solutions/uav-firefighting-emergency-rescue" className="hover:text-background/60 transition-colors">{t('app.firefighting')}</LangLink>
            <LangLink to="/solutions/industrial-uav-environmental-monitoring" className="hover:text-background/60 transition-colors">{t('app.environment')}</LangLink>
            <LangLink to="/applications/logistics" className="hover:text-background/60 transition-colors">{t('app.logistics')}</LangLink>
            <LangLink to="/products/tethered" className="hover:text-background/60 transition-colors">{t('app.tethered')}</LangLink>
            <LangLink to="/software" className="hover:text-background/60 transition-colors">{t('footer.software')}</LangLink>
            <LangLink to="/custom-research" className="hover:text-background/60 transition-colors">{t('footer.custom')}</LangLink>
            <LangLink to="/projects" className="hover:text-background/60 transition-colors">{t('footer.projects')}</LangLink>
            <LangLink to="/about" className="hover:text-background/60 transition-colors">{t('footer.aboutUs')}</LangLink>
            <LangLink to="/contact" className="hover:text-background/60 transition-colors">{t('footer.contactUs')}</LangLink>
            <LangLink to="/news" className="hover:text-background/60 transition-colors">{t('nav.news')}</LangLink>
          </nav>
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
