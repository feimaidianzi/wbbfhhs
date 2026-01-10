import { Link } from "react-router-dom";
import logoImage from "@/assets/logo-cani.png";

interface LogoProps {
  className?: string;
  showLink?: boolean;
}

export const Logo = ({ className = "", showLink = true }: LogoProps) => {
  const logoContent = (
    <img 
      src={logoImage} 
      alt="CANI" 
      className={`h-8 md:h-10 w-auto ${className}`}
    />
  );

  if (showLink) {
    return <Link to="/">{logoContent}</Link>;
  }

  return logoContent;
};

export const LogoDark = ({ className = "" }: { className?: string }) => (
  <img 
    src={logoImage} 
    alt="CANI" 
    className={`h-8 md:h-10 w-auto ${className}`}
  />
);
