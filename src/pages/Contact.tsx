import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });

  const contactInfo = [
    { icon: Phone, title: language === 'zh' ? "电话咨询" : "Phone", value: "+8617674048404", href: "tel:+8617674048404" },
    { icon: Mail, title: language === 'zh' ? "邮箱" : "Email", value: "market@flymind.com", href: "mailto:market@flymind.com" },
    { icon: MessageCircle, title: language === 'zh' ? "QQ客服" : "QQ Service", value: "123456789", href: "#" },
    { icon: Clock, title: language === 'zh' ? "工作时间" : "Working Hours", value: language === 'zh' ? "周一至周五 9:00-18:00" : "Mon-Fri 9:00-18:00", href: null },
  ];

  const offices = [
    {
      city: language === 'zh' ? "长沙总部" : "Changsha HQ",
      address: language === 'zh' ? "湖南省长沙市望城区月亮岛街道罐子岭澳优全球总部大楼" : "Ausnutria Global HQ, Wangcheng District, Changsha, Hunan, China",
      phone: "+8617674048404",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === 'zh' ? "提交成功" : "Submitted Successfully",
      description: language === 'zh' ? "我们会尽快与您联系！" : "We will contact you soon!",
    });
    setFormData({ name: "", phone: "", email: "", company: "", message: "" });
  };

  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: language === 'zh' ? '联系飞迈科技' : 'Contact FlyMind',
    description: language === 'zh' ? '获取飞迈科技的联系方式，咨询无人机产品和定制服务' : 'Get contact info for FlyMind, inquire about drone products and custom services',
    mainEntity: {
      '@type': 'Organization',
      name: 'FlyMind Technology',
      telephone: '+8617674048404',
      email: 'market@flymind.com',
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
        description={language === 'zh' ? "联系飞迈科技，获取专业无人机解决方案咨询服务。电话：+8617674048404，总部地址：湖南省长沙市。" : "Contact FlyMind for professional drone solution consultation. Phone: +8617674048404, HQ: Changsha, Hunan, China."}
        keywords="联系飞迈,FlyMind,无人机咨询,无人机定制服务,长沙无人机公司"
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
                        {language === 'zh' ? '邮箱' : 'Email'}
                      </label>
                      <input
                        type="email"
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
                  <Button type="submit" className="w-full bg-accent hover:bg-orange-light text-accent-foreground py-3">
                    {language === 'zh' ? '提交咨询' : 'Submit Inquiry'}
                    <Send className="w-4 h-4 ml-2" />
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
