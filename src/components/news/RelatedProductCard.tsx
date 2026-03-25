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

export const RelatedProductCard = ({ products }: RelatedProductCardProps) => {
  const { t, baseLang } = useLanguage();

  if (products.length === 0) return null;

  // Deduplicate by URL
  const unique = products.filter(
    (p, i, arr) => arr.findIndex(x => x.url === p.url) === i
  ).slice(0, 4);

  return (
    <aside className="bg-card border border-border rounded-xl p-6" aria-label={t('news.relatedProducts.title')}>
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-accent" />
        <h3 className="font-bold text-foreground text-lg">
          {t('news.relatedProducts.title')}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {t('news.relatedProducts.desc')}
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
                {t(`news.relatedProducts.cat.${product.category}`) || product.category}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
          </LangLink>
        ))}
      </div>
    </aside>
  );
};
