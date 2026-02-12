import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  questionKey: string;
  answerKey: string;
}

interface PageFAQProps {
  titleKey?: string;
  items: FAQItem[];
  className?: string;
}

export const PageFAQ = ({ titleKey, items, className = "" }: PageFAQProps) => {
  const { t } = useLanguage();

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: t(item.questionKey),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(item.answerKey),
      },
    })),
  };

  return (
    <section className={`py-16 bg-secondary ${className}`}>
      <div className="container mx-auto px-4">
        {titleKey && (
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t(titleKey)}
            </h2>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-5">
                  {t(item.questionKey)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {t(item.answerKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </div>
    </section>
  );
};

export default PageFAQ;
