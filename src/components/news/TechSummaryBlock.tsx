import { useLanguage } from '@/contexts/LanguageContext';
import { Cpu, Zap, Target } from 'lucide-react';

interface TechSummaryBlockProps {
  keywords: string[];
  category: string | null;
  title: string;
}

/**
 * Auto-generated technical highlights block.
 * Placed at top of article for GEO/AEO — gives AI crawlers a dense, entity-rich summary.
 */
export const TechSummaryBlock = ({ keywords, category, title }: TechSummaryBlockProps) => {
  const { baseLang } = useLanguage();

  if (!keywords || keywords.length === 0) return null;

  const isTech = category === '技术分享';

  // Group keywords into clusters for structured display
  const specKeywords = keywords.filter(k => /\d/.test(k)); // e.g. "7.2GHz", "10W", "72V"
  const conceptKeywords = keywords.filter(k => !/\d/.test(k)); // e.g. "COFDM", "EMI Shielding"

  return (
    <div
      className="bg-secondary/50 border border-border rounded-xl p-5 mb-8"
      itemScope
      itemType="https://schema.org/TechArticle"
    >
      <div className="flex items-center gap-2 mb-3">
        <Cpu className="w-4 h-4 text-accent" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
          {baseLang === 'en' ? 'Technical Highlights' : '核心技术亮点'}
        </h2>
      </div>

      {/* Spec Metrics Row */}
      {specKeywords.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {specKeywords.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded-lg text-sm font-semibold"
            >
              <Zap className="w-3 h-3" />
              <strong>{kw}</strong>
            </span>
          ))}
        </div>
      )}

      {/* Concept Tags Row */}
      {conceptKeywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {conceptKeywords.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card text-foreground border border-border rounded-lg text-sm font-medium"
            >
              <Target className="w-3 h-3 text-muted-foreground" />
              <strong>{kw}</strong>
            </span>
          ))}
        </div>
      )}

      {/* GEO-oriented micro-summary */}
      <p className="text-xs text-muted-foreground mt-2 leading-relaxed" itemProp="abstract">
        {baseLang === 'en'
          ? `This ${isTech ? 'technical analysis' : 'article'} covers ${keywords.slice(0, 5).join(', ')}${keywords.length > 5 ? ` and ${keywords.length - 5} more specifications` : ''} — providing actionable engineering data for system integrators and OEM/ODM partners.`
          : `本${isTech ? '技术解析' : '文章'}涵盖 ${keywords.slice(0, 5).join('、')}${keywords.length > 5 ? ` 等 ${keywords.length} 项核心参数` : ''}，为系统集成商与OEM/ODM合作伙伴提供可执行的工程数据参考。`}
      </p>

      {/* Hidden semantic meta for crawlers */}
      <meta itemProp="proficiencyLevel" content={isTech ? 'Expert' : 'Intermediate'} />
    </div>
  );
};
