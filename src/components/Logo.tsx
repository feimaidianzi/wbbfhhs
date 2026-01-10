import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  showLink?: boolean;
}

export const Logo = ({ className = "", showLink = true }: LogoProps) => {
  const logoContent = (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="font-black text-xl md:text-2xl tracking-tight">
        <span className="text-accent">CA</span>
        <span className="text-primary-foreground">NI</span>
      </span>
    </div>
  );

  if (showLink) {
    return <Link to="/">{logoContent}</Link>;
  }

  return logoContent;
};

export const LogoDark = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    <span className="font-black text-xl md:text-2xl tracking-tight">
      <span className="text-accent">CA</span>
      <span className="text-foreground">NI</span>
    </span>
  </div>
);
