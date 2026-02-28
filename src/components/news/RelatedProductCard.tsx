import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Package } from "lucide-react";
import type { ProductLinkEntry } from "@/utils/productAutoLinker";

interface RelatedProductCardProps {
  products: ProductLinkEntry[];
}

const CATEGORY_ICONS: Record<string, string> = {
  vtx: '📡',
  'fc-esc': '🎮',
  'digital-fpv': '📺',
  gimbal: '🎯',
  elrs: '📶',
  camera: '📷',
  'ai-module': '🧠',
  platform: '🚁',
};

const CATEGORY_LABELS_ZH: Record<string, string> = {
  vtx: '图传发射',
  'fc-esc': '飞控电调',
  'digital-fpv': '数字FPV',
  gimbal: '云台吊舱',
  elrs: '遥控链路',
  camera: '航拍相机',
  'ai-module': 'AI模块',
  platform: '整机平台',
};

const CATEGORY_LABELS_EN: Record<string, string> = {
  vtx: 'Video Transmitter',
  'fc-esc': 'FC & ESC',
  'digital-fpv': 'Digital FPV',
  gimbal: 'Gimbal & Pod',
  elrs: 'Control Link',
  camera: 'Camera',
  'ai-module': 'AI Module',
  platform: 'UAV Platform',
};

export const RelatedProductCard = ({ products }: RelatedProductCardProps) => {
  const { baseLang } = useLanguage();

  if (products.length === 0) return null;

  // Deduplicate by URL
  const unique = products.filter(
    (p, i, arr) => arr.findIndex(x => x.url === p.url) === i
  ).slice(0, 4);

  return (
    <aside className="bg-card border border-border rounded-xl p-6" aria-label={baseLang === 'en' ? 'Related Products' : '关联产品推荐'}>
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-accent" />
        <h3 className="font-bold text-foreground text-lg">
          {baseLang === 'en' ? 'Related Products' : '关联产品推荐'}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {baseLang === 'en'
          ? 'Products mentioned in this article'
          : '本文提及的产品与解决方案'}
      </p>
      <div className="space-y-3">
        {unique.map((product, idx) => (
          <LangLink
            key={idx}
            to={product.url}
            className="group flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-all"
          >
            <span className="text-2xl flex-shrink-0">
              {CATEGORY_ICONS[product.category] || '📦'}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                {baseLang === 'en' ? product.titleEn : product.titleZh}
              </p>
              <p className="text-xs text-muted-foreground">
                {baseLang === 'en'
                  ? CATEGORY_LABELS_EN[product.category]
                  : CATEGORY_LABELS_ZH[product.category]}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
          </LangLink>
        ))}
      </div>
    </aside>
  );
};
