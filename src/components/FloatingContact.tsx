import { Phone, MessageCircle, Home, QrCode } from "lucide-react";
import { useState } from "react";

export const FloatingContact = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      {/* Floating buttons on the right */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
        <button
          className="w-12 h-12 bg-accent rounded-lg shadow-lg flex items-center justify-center text-accent-foreground hover:bg-orange-light transition-colors"
          title="返回首页"
        >
          <Home className="w-5 h-5" />
        </button>
        <a
          href="tel:+8617674048404"
          className="w-12 h-12 bg-primary rounded-lg shadow-lg flex items-center justify-center text-primary-foreground hover:bg-navy-light transition-colors"
          title="电话咨询"
        >
          <Phone className="w-5 h-5" />
        </a>
        <button
          className="w-12 h-12 bg-primary rounded-lg shadow-lg flex items-center justify-center text-primary-foreground hover:bg-navy-light transition-colors"
          title="QQ客服"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
        <button
          className="w-12 h-12 bg-primary rounded-lg shadow-lg flex items-center justify-center text-primary-foreground hover:bg-navy-light transition-colors relative"
          title="微信客服"
          onMouseEnter={() => setShowQR(true)}
          onMouseLeave={() => setShowQR(false)}
        >
          <QrCode className="w-5 h-5" />
          {showQR && (
            <div className="absolute right-full mr-3 bg-card rounded-lg shadow-xl p-4">
              <p className="text-sm text-foreground font-medium mb-2 whitespace-nowrap">
                扫码添加微信
              </p>
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <QrCode className="w-16 h-16 text-muted-foreground" />
              </div>
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
        <span className="text-sm font-medium">点击拨打电话</span>
      </a>

      {/* Coming Soon banner */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 hidden md:block animate-fade-in">
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-4 rounded-xl shadow-xl border border-accent/30 relative overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="relative z-10 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-[pulse_2s_ease-in-out_infinite]">🚀</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-accent">即将上市</span>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">NEW</span>
                </div>
                <h4 className="font-bold text-primary-foreground">无人机AI制导模块</h4>
              </div>
            </div>
            <p className="text-sm opacity-90 max-w-xs">
              智能目标识别、自主航迹规划、精准制导控制
            </p>
            <a
              href="/products"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors"
            >
              了解更多
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
