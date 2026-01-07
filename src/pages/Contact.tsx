import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";

const contactInfo = [
  { icon: Phone, title: "电话咨询", value: "+8617674048404", href: "tel:+8617674048404" },
  { icon: Mail, title: "邮箱", value: "market@flymind.com", href: "mailto:market@flymind.com" },
  { icon: MessageCircle, title: "QQ客服", value: "123456789", href: "#" },
  { icon: Clock, title: "工作时间", value: "周一至周五 9:00-18:00", href: null },
];

const offices = [
  {
    city: "长沙总部",
    address: "湖南省长沙市望城区月亮岛街道罐子岭澳优全球总部大楼",
    phone: "+8617674048404",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "提交成功",
      description: "我们会尽快与您联系！",
    });
    setFormData({ name: "", phone: "", email: "", company: "", message: "" });
  };

  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: '联系飞迈科技',
    description: '获取飞迈科技的联系方式，咨询无人机产品和定制服务',
    mainEntity: {
      '@type': 'Organization',
      name: '飞迈科技有限公司',
      telephone: '+8617674048404',
      email: 'market@flymind.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '长沙',
        addressRegion: '湖南',
        addressCountry: 'CN',
      },
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="联系我们"
        description="联系飞迈科技，获取专业无人机解决方案咨询服务。电话：+8617674048404，总部地址：湖南省长沙市。"
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
                联系我们
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                期待与您的合作，为您提供专业的无人机解决方案
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
                <h2 className="text-2xl md:text-3xl font-bold mb-6">在线咨询</h2>
                <p className="text-muted-foreground mb-8">
                  填写以下表单，我们的专业团队将尽快与您联系
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="请输入姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        电话 *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="请输入联系电话"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        邮箱
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="请输入邮箱地址"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        公司名称
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="请输入公司名称"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      咨询内容 *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="请描述您的需求或问题"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-orange-light text-accent-foreground py-3">
                    提交咨询
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>

              {/* Offices */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">办公地址</h2>
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
                    title="公司地址地图"
                    loading="lazy"
                    style={{ minHeight: '300px' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card/90 to-transparent p-4">
                    <p className="text-sm text-card-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      湖南省长沙市望城区月亮岛街道罐子岭澳优全球总部大楼
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
