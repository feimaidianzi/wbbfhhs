import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ArticleCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-primary-foreground">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          {t('news.cta.title')}
        </h3>
        <p className="text-primary-foreground/80 mb-6 text-lg">
          {t('news.cta.desc')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LangLink to="/contact">
            <Button
              size="lg"
              className="gap-2 font-semibold px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <MessageSquare className="w-4 h-4" />
              {t('news.cta.quote')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </LangLink>
          <LangLink to="/products">
            <Button
              size="lg"
              className="gap-2 font-semibold px-8 border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <FileText className="w-4 h-4" />
              {t('news.cta.catalog')}
            </Button>
          </LangLink>
        </div>
      </div>
    </section>
  );
};
