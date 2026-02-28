import { Badge } from "@/components/ui/badge";

interface TechKeywordsBadgeProps {
  keywords: string[] | null;
  max?: number;
}

/**
 * Displays article tech keywords as badges.
 * Used on both list cards and detail pages to surface technical entities for GEO.
 */
export const TechKeywordsBadge = ({ keywords, max = 3 }: TechKeywordsBadgeProps) => {
  if (!keywords || keywords.length === 0) return null;

  const display = keywords.slice(0, max);

  return (
    <div className="flex flex-wrap gap-1.5">
      {display.map((kw, idx) => (
        <Badge
          key={idx}
          variant="secondary"
          className="text-xs font-medium bg-accent/10 text-accent border-accent/20 hover:bg-accent/20"
        >
          {kw}
        </Badge>
      ))}
      {keywords.length > max && (
        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
          +{keywords.length - max}
        </Badge>
      )}
    </div>
  );
};
