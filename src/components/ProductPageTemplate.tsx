import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone, Mail } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Product {
  name: string;
  description: string;
  specs: string[];
  image: string;
}

interface Stat {
  value: string;
  title: string;
  description: string;
}

interface Application {
  title: string;
  description: string;
  image?: string;
}

interface ProductPageTemplateProps {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  features: Feature[];
  featuresTitle?: string;
  products: Product[];
  productsTitle?: string;
  productsSubtitle?: string;
  stats?: Stat[];
  applications?: Application[];
  applicationsTitle?: string;
  techSpecs?: { label: string; value: string }[];
  cases?: { title: string; description: string; image: string }[];
}

const ProductPageTemplate = ({
  heroTitle,
  heroSubtitle,
  heroImage,
  features,
  featuresTitle = "核心优势",
  products,
  productsTitle = "产品系列",
  productsSubtitle,
  stats,
  applications,
  applicationsTitle = "应用场景",
  techSpecs,
  cases,
}: ProductPageTemplateProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative h-[450px] md:h-[550px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl animate-fade-in">
              <div className="inline-block px-4 py-1 bg-accent/20 rounded-full text-accent text-sm font-medium mb-4">
                长凌电子 · 专业无人机解决方案
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
                {heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                {heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg shadow-lg">
                  获取报价
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-8 py-6 text-lg backdrop-blur-sm">
                  <Phone className="w-5 h-5 mr-2" />
                  电话咨询
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-secondary to-transparent" />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{featuresTitle}</h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group text-center p-8 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-xl text-card-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <section className="py-16 bg-primary">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                    <div className="text-lg font-semibold text-primary-foreground mb-1">{stat.title}</div>
                    <div className="text-sm text-primary-foreground/70">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Section */}
        <section className="py-20 bg-background">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{productsTitle}</h2>
              {productsSubtitle && (
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{productsSubtitle}</p>
              )}
              <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-4" />
            </div>
            <div className={`grid grid-cols-1 ${products.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-8`}>
              {products.map((product, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-card-foreground mb-3">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mb-5">{product.description}</p>
                    <div className="space-y-2 mb-6 bg-secondary/50 rounded-xl p-4">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          {spec}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground font-medium">
                      了解详情
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Specs Section */}
        {techSpecs && techSpecs.length > 0 && (
          <section className="py-20 bg-secondary">
            <div className="container-custom">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">技术参数</h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {techSpecs.map((spec, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-secondary/30' : ''}>
                          <td className="px-6 py-4 font-medium text-card-foreground border-b border-border/50">
                            {spec.label}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground border-b border-border/50">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cases Section */}
        {cases && cases.length > 0 && (
          <section className="py-20 bg-background">
            <div className="container-custom">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">成功案例</h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cases.map((caseItem, index) => (
                  <div key={index} className="group rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={caseItem.image}
                        alt={caseItem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 bg-card">
                      <h3 className="font-bold text-lg text-card-foreground mb-2">{caseItem.title}</h3>
                      <p className="text-muted-foreground text-sm">{caseItem.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Applications Section */}
        {applications && applications.length > 0 && (
          <section className="py-20 bg-secondary">
            <div className="container-custom">
              <div className="text-center mb-14">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">{applicationsTitle}</h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {applications.map((app, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                  >
                    <h3 className="font-bold text-lg text-card-foreground mb-2 group-hover:text-accent transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{app.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container-custom relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
                准备好开启您的无人机解决方案了吗？
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10">
                联系我们的专业团队，获取定制化解决方案和详细报价
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg shadow-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  立即咨询
                </Button>
                <Button className="bg-primary-foreground/20 border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/30 px-10 py-6 text-lg backdrop-blur-sm">
                  <Phone className="w-5 h-5 mr-2" />
                  400-888-8888
                </Button>
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

export default ProductPageTemplate;
