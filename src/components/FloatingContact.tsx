import { Mail, Home, X, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export const FloatingContact = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [showBanner, setShowBanner] = useState(false);

  // Only show banner on first visit (session-based)
  useEffect(() => {
    const hasSeenBanner = sessionStorage.getItem('hasSeenBanner');
    if (!hasSeenBanner) {
      setShowBanner(true);
      sessionStorage.setItem('hasSeenBanner', 'true');
      
      // Auto-hide banner after 8 seconds
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Floating buttons - small, bottom right */}
      <div className="fixed right-4 bottom-24 z-30 flex flex-col gap-1.5">
        <Link
          to="/"
          className="w-9 h-9 bg-accent/90 rounded-full shadow-md flex items-center justify-center text-accent-foreground hover:bg-accent transition-colors"
          title={isEn ? "Home" : "返回首页"}
        >
          <Home className="w-4 h-4" />
        </Link>
        <a
          href="mailto:market@caniuav.com"
          className="w-9 h-9 bg-primary/90 rounded-full shadow-md flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
          title={isEn ? "Email Us" : "邮件咨询"}
        >
          <Mail className="w-4 h-4" />
        </a>
        <a
          href="https://wa.me/84123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 bg-green-500 rounded-full shadow-md flex items-center justify-center text-white hover:bg-green-600 transition-colors"
          title="WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </a>
      </div>

      {/* Bottom floating WhatsApp button (mobile) */}
      <a
        href="https://wa.me/84123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-4 bottom-4 z-40 md:hidden flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg animate-pulse"
      >
        <WhatsAppIcon className="w-5 h-5" />
        <span className="text-sm font-medium">{isEn ? "Chat on WhatsApp" : "WhatsApp咨询"}</span>
      </a>

      {/* Coming Soon banner - right side, auto-dismiss */}
      {showBanner && (
        <div className="fixed bottom-20 right-4 z-30 hidden md:block animate-fade-in">
          <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-4 rounded-xl shadow-xl border border-accent/30 relative overflow-hidden max-w-xs">
            {/* Close button */}
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              title={isEn ? "Close" : "关闭"}
            >
              <X className="w-4 h-4 text-primary-foreground" />
            </button>
            
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 animate-[pulse_3s_ease-in-out_infinite]" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl animate-[pulse_2s_ease-in-out_infinite]">🚀</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-accent">{isEn ? "Coming Soon" : "即将上市"}</span>
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">NEW</span>
                  </div>
                  <h4 className="font-bold text-primary-foreground">{isEn ? "Drone AI Guidance Module" : "无人机AI制导模块"}</h4>
                </div>
              </div>
              <p className="text-sm opacity-90 mb-3">
                {isEn 
                  ? "Smart target recognition, autonomous path planning, precision guidance control"
                  : "智能目标识别、自主航迹规划、精准制导控制"}
              </p>
              <Link
                to="/products"
                className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                {isEn ? "Learn More" : "了解更多"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};