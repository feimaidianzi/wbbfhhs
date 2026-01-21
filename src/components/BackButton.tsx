import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BackButtonProps {
  to: string;
  label: string;
}

export const BackButton = ({ to, label }: BackButtonProps) => {
  return (
    <Link 
      to={to} 
      className="fixed top-28 md:top-32 left-4 md:left-8 z-40 inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-105"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
};
