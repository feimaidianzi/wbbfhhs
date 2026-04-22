import { LangLink } from "@/components/LangLink";

// Use small public asset (11KB WebP) instead of bundled large PNG (96KB)
const LOGO_SRC = "/logo-cani-small.webp";

interface LogoProps {
  className?: string;
  showLink?: boolean;
}

export const Logo = ({ className = "", showLink = true }: LogoProps) => {
  const logoContent = (
    <img
      src={LOGO_SRC}
      alt="CANI长凌科技 - 工业无人机核心配件制造商"
      width={200}
      height={69}
      fetchPriority="high"
      decoding="async"
      className={`h-8 md:h-10 w-auto ${className}`}
    />
  );

  if (showLink) {
    return <LangLink to="/">{logoContent}</LangLink>;
  }

  return logoContent;
};

export const LogoDark = ({ className = "" }: { className?: string }) => (
  <img
    src={LOGO_SRC}
    alt="CANI长凌科技 - 工业无人机核心配件制造商"
    width={200}
    height={69}
    decoding="async"
    className={`h-8 md:h-10 w-auto ${className}`}
  />
);
