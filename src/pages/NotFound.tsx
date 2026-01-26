import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t('notFound.title')}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{isEn ? "Oops! Page not found" : t('notFound.message')}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {isEn ? "Return to Home" : t('notFound.backHome')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
