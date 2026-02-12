import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LangLink } from "@/components/LangLink";
import { Home, ArrowLeft, Package, Briefcase, Phone, Info } from "lucide-react";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const popularPages = [
    { icon: Package, label: t('notFound.products'), path: '/products' },
    { icon: Briefcase, label: t('notFound.applications'), path: '/applications' },
    { icon: Phone, label: t('notFound.contact'), path: '/contact' },
    { icon: Info, label: t('notFound.about'), path: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MultiLanguageSEO
        title="404"
        description={t('notFound.description')}
        path={location.pathname}
        noIndex={true}
      />
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container-custom text-center max-w-2xl">
          <h1 className="text-8xl md:text-9xl font-black text-primary/20 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t('notFound.message')}
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            {t('notFound.description')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <LangLink to="/">
              <Button size="lg" className="gap-2">
                <Home className="w-4 h-4" />
                {t('notFound.backHome')}
              </Button>
            </LangLink>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
              {t('notFound.backPrevious')}
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t('notFound.popularPages')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularPages.map((page) => (
                <LangLink
                  key={page.path}
                  to={page.path}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted hover:bg-primary/10 transition-colors group"
                >
                  <page.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium text-foreground">{page.label}</span>
                </LangLink>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
