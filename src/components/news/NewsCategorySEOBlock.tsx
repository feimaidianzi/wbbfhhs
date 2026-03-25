import { LangLink as Link } from '@/components/LangLink';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategorySEOContentProps {
  category: string; // 'company' | 'industry' | 'tech'
}

const CATEGORY_LINKS: Record<string, { href: string }[]> = {
  company: [
    { href: '/products' },
    { href: '/contact' },
    { href: '/about' },
  ],
  industry: [
    { href: '/applications/power-inspection' },
    { href: '/applications/emergency-rescue' },
    { href: '/products/accessories/vtx-vrx' },
  ],
  tech: [
    { href: '/products/accessories/vtx-vrx/fv10w-72' },
    { href: '/products/accessories/vtx-vrx/s900' },
    { href: '/products/accessories/fc-esc' },
    { href: '/products/accessories/elrs' },
  ],
};

/**
 * SEO-rich content block for news category pages.
 * Provides crawlable text, internal links, and semantic markup per category.
 */
export const NewsCategorySEOBlock = ({ category }: CategorySEOContentProps) => {
  const { t } = useLanguage();

  const links = CATEGORY_LINKS[category];
  if (!links) return null;

  const heading = t(`news.categorySeo.${category}.heading`);
  const p1 = t(`news.categorySeo.${category}.p1`);
  const p2 = t(`news.categorySeo.${category}.p2`);

  return (
    <section className="py-12 bg-secondary/50 border-t border-border">
      <div className="container-custom">
        <article itemScope itemType="https://schema.org/WebPage" className="max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{p1}</p>
          <p className="text-muted-foreground leading-relaxed mb-4">{p2}</p>

          {/* Internal Links for SEO */}
          <nav aria-label="Related resources" className="mt-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              {t('news.categorySeo.relatedResources')}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {links.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:text-accent hover:border-accent/30 transition-colors"
                  >
                    {t(`news.categorySeo.${category}.link${i + 1}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </div>
    </section>
  );
};
