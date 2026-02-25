import { LangLink } from "@/components/LangLink";
import logoImage from "@/assets/logo-cani.png";

interface LogoProps {
  className?: string;
  showLink?: boolean;
}

export const Logo = ({ className = "", showLink = true }: LogoProps) => {
  const logoContent = (
    <img 
      src={logoImage} 
      alt="CANI长凌科技 - 工业无人机核心配件制造商" 
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
    src={logoImage} 
    alt="CANI长凌科技 - 工业无人机核心配件制造商" 
    className={`h-8 md:h-10 w-auto ${className}`}
  />
);
