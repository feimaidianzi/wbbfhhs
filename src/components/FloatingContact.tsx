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
          href="tel:18771937458"
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
        href="tel:18771937458"
        className="fixed left-4 bottom-4 z-40 md:hidden flex items-center gap-2 bg-accent text-accent-foreground px-4 py-3 rounded-full shadow-lg animate-pulse"
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm font-medium">点击拨打电话</span>
      </a>

      {/* Promo banner */}
      <div className="fixed bottom-4 right-4 z-40 hidden md:block">
        <div className="bg-accent text-accent-foreground p-4 rounded-xl shadow-xl max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎉</span>
            <span className="font-semibold">限时优惠</span>
          </div>
          <h4 className="font-bold mb-1">新品上市 · 钜惠来袭</h4>
          <p className="text-sm opacity-90">
            智能无人机快递柜即将推出，立即咨询享优惠!
          </p>
        </div>
      </div>
    </>
  );
};
