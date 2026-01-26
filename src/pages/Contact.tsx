import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const RATE_LIMIT_SECONDS = 60; // 60 second cooldown between submissions

const Contact = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [cooldown, setCooldown] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  // Check localStorage for rate limit on mount
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

  // Countdown timer
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
    { icon: Phone, title: t('contact.info.phone'), value: "+8617674048404", href: "tel:+8617674048404" },
    { icon: Mail, title: t('contact.info.email'), value: "market@caniuav.com", href: "mailto:market@caniuav.com" },
    { icon: MessageCircle, title: t('contact.info.wechat'), value: "17674048404", href: "#" },
    { icon: Clock, title: t('contact.info.workingHours'), value: t('contact.info.workingHours.value'), href: null },
  ];

  const offices = [
    {
      city: t('contact.office.changsha'),
      address: t('contact.office.changsha.address'),
      phone: "+8617674048404",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limit check
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

    // Basic input validation
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
      const inquirySubject = formData.subject.trim() || (language === 'zh' ? '网站咨询' : 'Website Inquiry');
      
      // Save to database
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          company: formData.company.trim() || null,
          subject: inquirySubject,
          message: formData.message.trim(),
        });

      if (error) throw error;

      // Get admin email from settings
      let adminEmail = 'market@caniuav.com';
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

      // Send email notification (don't fail if email fails)
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
        // Don't throw - still show success since data was saved
      }

      // Set rate limit
      localStorage.setItem('lastInquirySubmit', Date.now().toString());
      setCanSubmit(false);
      setCooldown(RATE_LIMIT_SECONDS);

      toast({
        title: t('contact.success.title'),
        description: t('contact.success.message'),
      });
      setFormData({ name: "", phone: "", email: "", company: "", subject: "", message: "" });
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
    name: language === 'zh' ? '联系长凌科技' : 'Contact CANI',
    description: language === 'zh' ? '获取长凌科技的联系方式，咨询无人机产品和定制服务' : 'Get contact info for CANI, inquire about drone products and custom services',
    mainEntity: {
      '@type': 'Organization',
      name: 'CANI Technology',
      telephone: '+8617674048404',
      email: 'market@caniuav.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Changsha',
        addressRegion: 'Hunan',
        addressCountry: 'CN',
      },
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={language === 'zh' ? "联系我们" : "Contact Us"}
        description={language === 'zh' ? "联系长凌科技，获取专业无人机解决方案咨询服务。电话：+8617674048404，总部地址：湖南省长沙市。" : "Contact CANI for professional drone solution consultation. Phone: +8617674048404, HQ: Changsha, Hunan, China."}
        keywords="联系长凌,CANI,无人机咨询,无人机定制服务,长沙无人机公司"
        url="/contact"
        structuredData={contactStructuredData}
      />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[250px] md:h-[300px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                {language === 'zh' ? '联系我们' : 'Contact Us'}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                {language === 'zh' ? '期待与您的合作，为您提供专业的无人机解决方案' : 'Looking forward to working with you, providing professional drone solutions'}
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
                  {language === 'zh' ? '在线咨询' : 'Online Inquiry'}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {language === 'zh' ? '填写以下表单，我们的专业团队将尽快与您联系' : 'Fill in the form below, our professional team will contact you soon'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'zh' ? '姓名 *' : 'Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={language === 'zh' ? "请输入姓名" : "Enter your name"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'zh' ? '电话 *' : 'Phone *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={language === 'zh' ? "请输入联系电话" : "Enter phone number"}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'zh' ? '邮箱 *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={language === 'zh' ? "请输入邮箱地址" : "Enter email address"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {language === 'zh' ? '公司名称' : 'Company'}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={language === 'zh' ? "请输入公司名称" : "Enter company name"}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {language === 'zh' ? '咨询主题' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder={language === 'zh' ? "请输入咨询主题" : "Enter subject"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {language === 'zh' ? '咨询内容 *' : 'Message *'}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder={language === 'zh' ? "请描述您的需求或问题" : "Describe your requirements or questions"}
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
                        {language === 'zh' ? '提交中...' : 'Submitting...'}
                      </>
                    ) : !canSubmit ? (
                      <>
                        <Clock className="w-4 h-4 mr-2" />
                        {language === 'zh' ? `请等待 ${cooldown} 秒` : `Wait ${cooldown}s`}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {language === 'zh' ? '提交咨询' : 'Submit Inquiry'}
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Offices */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {language === 'zh' ? '办公地址' : 'Office Address'}
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
                          <Phone className="w-5 h-5 text-accent" />
                          {office.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map - OpenStreetMap */}
                <div className="mt-6 aspect-video bg-muted rounded-xl overflow-hidden relative">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=112.8650%2C28.2550%2C112.8850%2C28.2750&layer=mapnik&marker=28.2655%2C112.8755"
                    className="w-full h-full border-0"
                    title={language === 'zh' ? "公司地址地图" : "Company Location Map"}
                    loading="lazy"
                    style={{ minHeight: '300px' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card/90 to-transparent p-4">
                    <p className="text-sm text-card-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      {language === 'zh' ? '湖南省长沙市望城区月亮岛街道罐子岭澳优全球总部大楼' : 'Ausnutria Global HQ, Wangcheng District, Changsha, Hunan, China'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Contact;
