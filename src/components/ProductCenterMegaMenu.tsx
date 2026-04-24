import { useState } from "react";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import { LangLink as Link } from "@/components/LangLink";

export interface ProductCenterCategory {
  name: string;
  href: string;
  description: string;
  image?: string;
  detail?: string;
}

interface ProductCenterMegaMenuProps {
  categories: ProductCenterCategory[];
  onSelect: () => void;
  viewAllLabel: string;
  viewDetailLabel: string;
}

/**
 * Product Center Mega Menu
 * Layout: Left sidebar (category list) + Right preview panel (image + description + CTA)
 * Hovering a category in the left list updates the right preview panel.
 */
export const ProductCenterMegaMenu = ({
  categories,
  onSelect,
  viewAllLabel,
  viewDetailLabel,
}: ProductCenterMegaMenuProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = categories[activeIndex];

  if (!active) return null;

  return (
    <div className="grid grid-cols-12 gap-8 min-h-[340px]">
      {/* Left sidebar: category list */}
      <div className="col-span-4 lg:col-span-3 border-r border-border/60 pr-4">
        <ul className="space-y-1">
          {categories.map((cat, idx) => {
            const isActive = idx === activeIndex;
            return (
              <li key={cat.href}>
                <Link
                  to={cat.href}
                  onClick={onSelect}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  className={`group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-all ${
                    isActive
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      isActive ? "translate-x-0.5 text-accent" : "text-muted-foreground/60 group-hover:translate-x-0.5"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          {/* View all link */}
          <li className="pt-2 mt-2 border-t border-border/40">
            <Link
              to="/products"
              onClick={onSelect}
              className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-accent hover:bg-secondary transition-all"
            >
              <span>{viewAllLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Right preview panel */}
      <div className="col-span-8 lg:col-span-9">
        <Link
          to={active.href}
          onClick={onSelect}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 group"
        >
          {/* Image */}
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-secondary/40 border border-border/40">
            {active.image && (
              <img
                key={active.image}
                src={active.image}
                alt={active.name}
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
              {active.name}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {active.description}
            </p>
            {active.detail && (
              <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4 line-clamp-4">
                {active.detail}
              </p>
            )}
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
              {viewDetailLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
