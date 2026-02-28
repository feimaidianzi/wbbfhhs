import { LangLink } from "@/components/LangLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ArticleCTA = () => {
  const { baseLang } = useLanguage();

  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-primary-foreground">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          {baseLang === 'en'
            ? 'Ready to Integrate This Solution?'
            : '准备将该方案集成到您的项目中？'}
        </h3>
        <p className="text-primary-foreground/80 mb-6 text-lg">
          {baseLang === 'en'
            ? 'Our engineering team provides OEM/ODM customization, technical consultation, and sample support for industrial UAV applications.'
            : '我们的工程团队提供 OEM/ODM 定制开发、技术咨询和样品支持，服务于全球工业无人机客户。'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LangLink to="/contact">
            <Button
              size="lg"
              className="gap-2 font-semibold px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <MessageSquare className="w-4 h-4" />
              {baseLang === 'en' ? 'Get Custom Integration Quote' : '获取定制化集成方案'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </LangLink>
          <LangLink to="/products">
            <Button
              size="lg"
              className="gap-2 font-semibold px-8 border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <FileText className="w-4 h-4" />
              {baseLang === 'en' ? 'Browse Product Catalog' : '浏览全部产品目录'}
            </Button>
          </LangLink>
        </div>
      </div>
    </section>
  );
};
