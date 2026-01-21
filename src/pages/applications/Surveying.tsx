import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Map, Eye, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Surveying = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const features = [
    { 
      icon: Map, 
      title: isEn ? "Aerial Mapping" : "航空测绘", 
      description: isEn ? "High-efficiency, high-precision large-scale aerial survey operations" : "高效率、高精度的大面积航测作业" 
    },
    { 
      icon: Target, 
      title: isEn ? "Terrain Survey" : "地形测量", 
      description: isEn ? "Obtain high-precision terrain data and digital elevation models" : "获取高精度地形数据和数字高程模型" 
    },
    { 
      icon: Eye, 
      title: isEn ? "Orthophoto Imaging" : "正射影像", 
      description: isEn ? "Generate high-resolution orthophoto maps" : "生成高分辨率正射影像地图" 
    },
    { 
      icon: Zap, 
      title: isEn ? "3D Modeling" : "三维建模", 
      description: isEn ? "Rapidly construct realistic 3D scene models" : "快速构建真实三维场景模型" 
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={isEn ? "Surveying & Mapping Applications" : "测绘行业应用"}
        description={isEn 
          ? "Feimai Technology drone surveying solutions for aerial mapping, terrain survey, and 3D modeling."
          : "飞迈科技无人机测绘行业解决方案，应用于航空测绘、地形测量、正射影像等领域。"}
        keywords={isEn 
          ? "surveying drone,aerial mapping,terrain survey,orthophoto,3D modeling"
          : "测绘无人机,航空测绘,地形测量,正射影像,三维建模"}
        url="/applications/surveying"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="relative h-[350px] md:h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)" }}
          >
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl rounded-3xl bg-black/70 border border-white/20 p-6 md:p-8 shadow-lg">
              <p className="text-cyan-400 font-medium mb-2">{isEn ? "Industry Applications" : "行业应用"}</p>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {isEn ? "Surveying & Mapping" : "测绘"}
              </h1>
              <p className="text-lg text-white/80">
                {isEn 
                  ? "VTOL drones are ideal for high-efficiency, high-precision, large-scale aerial survey projects, widely used in land surveying and engineering measurement"
                  : "垂直起降无人机适合高效率、高精度、大面积航测项目，广泛应用于国土测绘和工程测量"}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isEn ? "Application Scenarios" : "应用场景"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-card text-center">
                  <feature.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {isEn ? "Get Surveying Solutions" : "获取测绘行业解决方案"}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Contact our professional team to learn more about surveying drone applications"
                : "联系我们的专业团队，了解更多测绘行业无人机应用详情"}
            </p>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                {isEn ? "Contact Us" : "立即咨询"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Surveying;
