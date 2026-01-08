import { Phone, MessageCircle, Home, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import wechatQR from "@/assets/wechat-qr.png";

export const FloatingContact = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [showQR, setShowQR] = useState(false);
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
      {/* Floating buttons on the right */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
        <button
          className="w-12 h-12 bg-accent rounded-lg shadow-lg flex items-center justify-center text-accent-foreground hover:bg-orange-light transition-colors"
          title={isEn ? "Home" : "返回首页"}
        >
          <Home className="w-5 h-5" />
        </button>
        <a
          href="tel:+8617674048404"
          className="w-12 h-12 bg-primary rounded-lg shadow-lg flex items-center justify-center text-primary-foreground hover:bg-navy-light transition-colors"
          title={isEn ? "Call Us" : "电话咨询"}
        >
          <Phone className="w-5 h-5" />
        </a>
        <a
          href="tel:17674048404"
          className="w-12 h-12 bg-primary rounded-lg shadow-lg flex items-center justify-center text-primary-foreground hover:bg-navy-light transition-colors"
          title={isEn ? "WeChat" : "微信客服: 17674048404"}
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <button
          className="w-12 h-12 bg-primary rounded-lg shadow-lg flex items-center justify-center text-primary-foreground hover:bg-navy-light transition-colors relative"
          title={isEn ? "WeChat Service" : "微信客服"}
          onMouseEnter={() => setShowQR(true)}
          onMouseLeave={() => setShowQR(false)}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.93 4.165c-3.811 0-6.905 2.595-6.905 5.807 0 3.211 3.094 5.806 6.906 5.806.772 0 1.525-.13 2.234-.324a.723.723 0 0 1 .594.078l1.579.934a.273.273 0 0 0 .14.047c.133 0 .242-.111.242-.246 0-.06-.024-.121-.038-.18l-.327-1.233a.49.49 0 0 1 .176-.553c1.527-1.124 2.502-2.791 2.502-4.63 0-3.21-3.094-5.805-6.906-5.805zm-2.636 2.954c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.543.434-.983.97-.983zm5.271 0c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.543.434-.983.97-.983z"/>
          </svg>
          {showQR && (
            <div className="absolute right-full mr-3 bg-card rounded-lg shadow-xl p-4">
              <p className="text-sm text-foreground font-medium mb-2 whitespace-nowrap">
                {isEn ? "Scan to add WeChat" : "扫码添加微信"}
              </p>
              <img src={wechatQR} alt="WeChat QR Code" className="w-32 h-32 rounded-lg" />
            </div>
          )}
        </button>
      </div>

      {/* Bottom floating call button (mobile) */}
      <a
        href="tel:+8617674048404"
        className="fixed left-4 bottom-4 z-40 md:hidden flex items-center gap-2 bg-accent text-accent-foreground px-4 py-3 rounded-full shadow-lg animate-pulse"
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm font-medium">{isEn ? "Call Now" : "点击拨打电话"}</span>
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
