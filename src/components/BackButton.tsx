import { ArrowLeft } from "lucide-react";
import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";

interface BackButtonProps {
  to: string;
  label?: string;
}

export const BackButton = ({ to, label }: BackButtonProps) => {
  const { t } = useLanguage();
  const displayLabel = label || t('common.back') || '返回';
  
  return (
    <LangLink 
      to={to} 
      className="fixed top-28 md:top-32 left-4 md:left-8 z-40 inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-105"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden md:inline">{displayLabel}</span>
    </LangLink>
  );
};
