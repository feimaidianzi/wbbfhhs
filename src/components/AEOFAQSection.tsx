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

export const AEOFAQSection = () => {
  const { t } = useLanguage();

  const faqs: FAQItem[] = [
    { question: t('aeo.faq.q1'), answer: t('aeo.faq.a1') },
    { question: t('aeo.faq.q2'), answer: t('aeo.faq.a2') },
    { question: t('aeo.faq.q3'), answer: t('aeo.faq.a3.aeo') || t('aeo.faq.a3') },
    { question: t('aeo.faq.q4'), answer: t('aeo.faq.a4') },
    { question: t('aeo.faq.q5'), answer: t('aeo.faq.a5') },
  ];

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
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {t('aeo.faq.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('aeo.faq.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`aeo-${index}`}
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </div>
    </section>
  );
};

export default AEOFAQSection;
