import { useState } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '@/contexts/LanguageContext';
import { Globe, ChevronDown, Check, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'default' | 'minimal' | 'full';
  className?: string;
}

export const LanguageSwitcher = ({ variant = 'default', className }: LanguageSwitcherProps) => {
  const { language, setLanguage, isLoading } = useLanguage();
  const [open, setOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language);
  
  // Group languages by region
  const asiaLanguages = SUPPORTED_LANGUAGES.filter(l => l.region === 'asia');
  const europeLanguages = SUPPORTED_LANGUAGES.filter(l => l.region === 'europe');
  const middleEastLanguages = SUPPORTED_LANGUAGES.filter(l => l.region === 'middle-east');

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setOpen(false);
  };

  const renderLanguageItem = (lang: typeof SUPPORTED_LANGUAGES[0]) => (
    <DropdownMenuItem
      key={lang.code}
      onClick={() => handleSelect(lang.code)}
      className={cn(
        "flex items-center gap-2 cursor-pointer",
        language === lang.code && "bg-accent"
      )}
    >
      <span className="text-base">{lang.flag}</span>
      <span className="flex-1">{lang.name}</span>
      {language === lang.code && <Check className="w-4 h-4 text-primary" />}
    </DropdownMenuItem>
  );

  if (variant === 'minimal') {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-1 px-2 py-1.5 rounded-md text-sm transition-colors",
              "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20",
              className
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>{currentLang?.flag}</span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {SUPPORTED_LANGUAGES.map(renderLanguageItem)}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
            "bg-primary-foreground/10 hover:bg-primary-foreground/20",
            "text-primary-foreground text-sm font-medium transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary-foreground/30",
            className
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Globe className="w-4 h-4" />
              <span>{currentLang?.flag} {variant === 'full' ? currentLang?.name : currentLang?.code.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto">
        {/* Asia */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          亚洲 / Asia
        </DropdownMenuLabel>
        {asiaLanguages.map(renderLanguageItem)}
        
        <DropdownMenuSeparator />
        
        {/* Europe */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          欧洲 / Europe
        </DropdownMenuLabel>
        {europeLanguages.map(renderLanguageItem)}
        
        <DropdownMenuSeparator />
        
        {/* Middle East */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          中东 / Middle East
        </DropdownMenuLabel>
        {middleEastLanguages.map(renderLanguageItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
