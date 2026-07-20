import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2, Headphones, Shield, Settings, ChevronRight, Briefcase, Wrench } from "lucide-react";
import { PageFAQ } from "@/components/PageFAQ";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import contactOfficeImg from "@/assets/seo/contact-office.jpg";

const RATE_LIMIT_SECONDS = 60;

const Contact = () => {
  const { t, baseLang } = useLanguage();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [cooldown, setCooldown] = useState(0);
  const [inquiryType, setInquiryType] = useState<'business' | 'technical'>('business');
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    productInterest: "",
  });

  useEffect(() => {
    const lastSubmitTime = localStorage.getItem('lastInquirySubmit');
    if (lastSubmitTime) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSubmitTime)) / 1000);
      const remaining = RATE_LIMIT_SECONDS - elapsed;
      if (remaining > 0) {
        setCanSubmit(false);
        setCooldown(remaining);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) {
      setCanSubmit(true);
      return;
    }
    
    const timer = setInterval(() => {
      setCooldown(c => {
        if (c <= 1) {
          setCanSubmit(true);
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const contactInfo = [
    { icon: Mail, title: t('contact.info.email'), value: "so_0307@qq.com", href: "mailto:so_0307@qq.com" },
    { icon: Mail, title: t('contact.info.salesEmail') || 'Sales', value: "so_0307@qq.com", href: "mailto:so_0307@qq.com" },
    { icon: Mail, title: t('contact.info.techEmail'), value: "support@caniuav.com", href: "mailto:support@caniuav.com" },
    { icon: Mail, title: t('contact.info.feedbackEmail') || 'Feedback', value: "feedback@caniuav.com", href: "mailto:feedback@caniuav.com" },
    { icon: MessageCircle, title: t('contact.info.wechat'), value: "+8617674048404", href: "weixin://dl/chat?+8617674048404" },
    { icon: Clock, title: t('contact.info.workingHours'), value: t('contact.info.workingHours.value'), href: null },
  ];

  const offices = [
    {
      city: t('contact.office.changsha'),
      address: t('contact.office.changsha.address'),
      email: "so_0307@qq.com",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      toast({
        title: t('contact.validation.pleaseWait'),
        description: t('contact.validation.waitSeconds').replace('{{seconds}}', String(cooldown)),
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t('contact.validation.fillRequired'),
        description: t('contact.validation.requiredFields'),
        variant: "destructive",
      });
      return;
    }

    if (formData.name.length > 100 || formData.email.length > 255 || formData.message.length > 5000) {
      toast({
        title: t('contact.validation.inputTooLong'),
        description: t('contact.validation.checkLength'),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const inquirySubject = formData.subject.trim() || 
        (inquiryType === 'business' ? t('contact.form.defaultSubjectBusiness') : t('contact.form.defaultSubjectTech'));
      
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          company: formData.company.trim() || null,
          subject: `[${inquiryType === 'business' ? 'Business' : 'Tech'}] ${inquirySubject}`,
          message: formData.message.trim(),
          product_interest: formData.productInterest.trim() || null,
        });

      if (error) throw error;

      let adminEmail = inquiryType === 'business' ? 'so_0307@qq.com' : 'support@caniuav.com';
      try {
        const { data: settingData } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', 'admin_notification_email')
          .maybeSingle();
        if (settingData?.value) {
          adminEmail = settingData.value;
        }
      } catch (e) {
        console.error('Failed to get admin email setting:', e);
      }

      try {
        await supabase.functions.invoke('send-inquiry-notification', {
          body: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || undefined,
            company: formData.company.trim() || undefined,
            subject: inquirySubject,
            message: formData.message.trim(),
            adminEmail,
          },
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }

      localStorage.setItem('lastInquirySubmit', Date.now().toString());
      setCanSubmit(false);
      setCooldown(RATE_LIMIT_SECONDS);

      toast({
        title: t('contact.success.title'),
        description: t('contact.success.message'),
      });
      setFormData({ name: "", phone: "", email: "", company: "", subject: "", message: "", productInterest: "" });
    } catch (error: any) {
      console.error('Submit error:', error);
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.message'),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('contact.structured.name'),
    description: t('contact.structured.description'),
    mainEntity: {
      '@type': 'Organization',
      name: '长凌科技 (CANI Technology)',
      legalName: '邵阳长凌电子科技有限公司',
      url: 'https://www.caniuav.com/',
      logo: 'https://www.caniuav.com/logo.png',
      email: 'so_0307@qq.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Sales & OEM/ODM',
          email: 'so_0307@qq.com',
          availableLanguage: ['Chinese', 'English'],
        },
        {
          '@type': 'ContactPoint',
          email: 'support@caniuav.com',
          contactType: 'Technical Support',
          productSupported: 'Industrial UAV Payloads, VTX Systems, Gimbal Pods',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '亿达智造小镇',
        addressLocality: 'Changsha',
        addressRegion: 'Hunan',
        postalCode: '410200',
        addressCountry: 'CN',
      },
    },
  };

  return (
    <div className="min-h-screen">
      <MultiLanguageSEO
        title={t('contact.page.title')}
        description={t('contact.page.description')}
        keywords={t('contact.page.keywords')}
        path="/contact"
        structuredData={contactStructuredData}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[250px] md:h-[300px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${contactOfficeImg})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {t('contact.page.title')}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                {t('contact.page.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center">
                  <item.icon className="w-10 h-10 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-card-foreground mb-1">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-muted-foreground hover:text-accent transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form & Map */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('contact.form.title')}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t('contact.form.subtitle')}
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setInquiryType('business')}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        inquiryType === 'business' 
                          ? 'border-accent bg-accent/5 shadow-sm' 
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <Briefcase className={`w-5 h-5 ${inquiryType === 'business' ? 'text-accent' : 'text-muted-foreground'}`} />
                      <div className="text-left">
                        <div className={`text-sm font-semibold ${inquiryType === 'business' ? 'text-accent' : 'text-foreground'}`}>
                          {t('contact.form.typeBusiness')}
                        </div>
                        <div className="text-xs text-muted-foreground">{t('contact.form.typeBusinessDesc')}</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('technical')}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        inquiryType === 'technical' 
                          ? 'border-accent bg-accent/5 shadow-sm' 
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <Wrench className={`w-5 h-5 ${inquiryType === 'technical' ? 'text-accent' : 'text-muted-foreground'}`} />
                      <div className="text-left">
                        <div className={`text-sm font-semibold ${inquiryType === 'technical' ? 'text-accent' : 'text-foreground'}`}>
                          {t('contact.form.typeTech')}
                        </div>
                        <div className="text-xs text-muted-foreground">{t('contact.form.typeTechDesc')}</div>
                      </div>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t('contact.form.name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t('contact.form.phone')} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={t('contact.form.phonePlaceholder')}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t('contact.form.email')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={t('contact.form.emailPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {inquiryType === 'business' ? t('contact.form.company') : t('contact.form.productModel')}
                      </label>
                      <input
                        type="text"
                        value={inquiryType === 'business' ? formData.company : formData.productInterest}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          ...(inquiryType === 'business' 
                            ? { company: e.target.value } 
                            : { productInterest: e.target.value })
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={inquiryType === 'business' ? t('contact.form.companyPlaceholder') : t('contact.form.productModelPlaceholder')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder={inquiryType === 'business' ? t('contact.form.subjectPlaceholderBusiness') : t('contact.form.subjectPlaceholderTech')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={submitting || !canSubmit}
                    className="w-full bg-accent hover:bg-orange-light text-accent-foreground py-3"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('contact.form.submitting')}
                      </>
                    ) : !canSubmit ? (
                      <>
                        <Clock className="w-4 h-4 mr-2" />
                        {t('contact.form.waitSeconds').replace('{{seconds}}', String(cooldown))}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Offices */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t('contact.office.title')}
                </h2>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-card rounded-xl p-6 shadow-card">
                      <h3 className="font-bold text-lg text-card-foreground mb-3">{office.city}</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          {office.address}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-accent" />
                          {office.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div className="mt-6 aspect-video bg-muted rounded-xl overflow-hidden relative">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=112.8650%2C28.2550%2C112.8850%2C28.2750&layer=mapnik&marker=28.2655%2C112.8755"
                    className="w-full h-full border-0"
                    title={t('contact.map.title')}
                    loading="lazy"
                    style={{ minHeight: '300px' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card/90 to-transparent p-4">
                    <p className="text-sm text-card-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      {t('contact.office.changsha.address')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Support */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">{t('contact.service.title')}</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{t('contact.service.intro')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { titleKey: 'contact.service.tech.title', descKey: 'contact.service.tech.desc', icon: Headphones },
                { titleKey: 'contact.service.warranty.title', descKey: 'contact.service.warranty.desc', icon: Shield },
                { titleKey: 'contact.service.custom.title', descKey: 'contact.service.custom.desc', icon: Settings },
              ].map((service, index) => (
                <div key={index} className="bg-card rounded-xl p-8 shadow-card">
                  <service.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-lg font-bold text-card-foreground mb-3">{t(service.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(service.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* After-Sales Process */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('contact.afterSales.title')}</h2>
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              {['contact.afterSales.step1', 'contact.afterSales.step2', 'contact.afterSales.step3', 'contact.afterSales.step4'].map((stepKey, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-muted-foreground pt-1">{t(stepKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PageFAQ
          titleKey="contact.faq.title"
          items={[
            { questionKey: 'contact.faq.q1', answerKey: 'contact.faq.a1' },
            { questionKey: 'contact.faq.q2', answerKey: 'contact.faq.a2' },
            { questionKey: 'contact.faq.q3', answerKey: 'contact.faq.a3' },
          ]}
        />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Contact;
