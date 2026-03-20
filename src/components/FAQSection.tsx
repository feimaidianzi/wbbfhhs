import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  category?: 'general' | 'products' | 'technical' | 'purchase';
  showTitle?: boolean;
  limit?: number;
  includeSchema?: boolean;
}

export const FAQSection = ({ category = 'general', showTitle = true, limit, includeSchema = true }: FAQSectionProps) => {
  const { t } = useLanguage();

  const getFAQs = (): FAQItem[] => {
    const allFAQs: Record<string, FAQItem[]> = {
      general: [
        { question: t('faq.general.q1'), answer: t('faq.general.a1') },
        { question: t('faq.general.q2'), answer: t('faq.general.a2') },
        { question: t('faq.general.q3'), answer: t('faq.general.a3') },
        { question: t('faq.general.q4'), answer: t('faq.general.a4') },
      ],
      products: [
        { question: t('faq.products.q1'), answer: t('faq.products.a1') },
        { question: t('faq.products.q2'), answer: t('faq.products.a2') },
        { question: t('faq.products.q3'), answer: t('faq.products.a3') },
        { question: t('faq.products.q4'), answer: t('faq.products.a4') },
      ],
      technical: [
        { question: t('faq.technical.q1'), answer: t('faq.technical.a1') },
        { question: t('faq.technical.q2'), answer: t('faq.technical.a2') },
        { question: t('faq.technical.q3'), answer: t('faq.technical.a3') },
        { question: t('faq.technical.q4'), answer: t('faq.technical.a4') },
      ],
      purchase: [
        { question: t('faq.purchase.q1'), answer: t('faq.purchase.a1') },
        { question: t('faq.purchase.q2'), answer: t('faq.purchase.a2') },
        { question: t('faq.purchase.q3'), answer: t('faq.purchase.a3') },
        { question: t('faq.purchase.q4'), answer: t('faq.purchase.a4') },
      ],
    };

    const faqs = allFAQs[category] || allFAQs.general;
    return limit ? faqs.slice(0, limit) : faqs;
  };

  const faqs = getFAQs();

  // 生成FAQ结构化数据
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="container-custom">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {includeSchema && (
          <script 
            type="application/ld+json" 
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} 
          />
        )}
      </div>
    </section>
  );
};

export default FAQSection;
