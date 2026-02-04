import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag, CheckCircle, Zap, Shield, TrendingUp, Target } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { MultiLanguageSEO } from "@/components/MultiLanguageSEO";
import { useLanguage } from "@/contexts/LanguageContext";

// 导入案例配图
import caseTransmissionInspection from "@/assets/power/case-transmission-inspection.jpg";
import caseSubstationInspection from "@/assets/power/case-substation-inspection.jpg";
import caseSolarInspection from "@/assets/power/case-solar-inspection.jpg";
import caseInsulatorCheck from "@/assets/power/case-insulator-check.jpg";
import caseCorridorInspection from "@/assets/power/case-corridor-inspection.jpg";
import caseAutonomousSystem from "@/assets/power/case-autonomous-system.jpg";

const CaseDetail = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { t } = useLanguage();
  
  // 案例详情数据
  const caseDetails = {
    "1": {
      id: 1,
      titleKey: "power.case1.title",
      date: "2024-03-05",
      categoryKey: "power.case.category.industry",
      image: caseTransmissionInspection,
      tagKeys: ["power.case.tag.autonomous", "power.case.tag.inspection", "power.case.tag.drone"],
      content: {
        introKey: "power.case1.intro",
        sections: [
          { titleKey: "power.case1.section1.title", contentKey: "power.case1.section1.content" },
          { titleKey: "power.case1.section2.title", contentKey: "power.case1.section2.content" },
          { titleKey: "power.case1.section3.title", contentKey: "power.case1.section3.content" }
        ],
        highlights: [
          { icon: Zap, titleKey: "power.case.highlight.efficiency", valueKey: "power.case1.highlight1.value" },
          { icon: Shield, titleKey: "power.case.highlight.cost", valueKey: "power.case1.highlight2.value" },
          { icon: Target, titleKey: "power.case.highlight.detection", valueKey: "power.case1.highlight3.value" },
          { icon: TrendingUp, titleKey: "power.case.highlight.coverage", valueKey: "power.case1.highlight4.value" }
        ],
        technologyKeys: ["power.case.tech.multirotor", "power.case.tech.hd", "power.case.tech.thermal", "power.case.tech.ai", "power.case.tech.route", "power.case.tech.platform"]
      }
    },
    "2": {
      id: 2,
      titleKey: "power.case2.title",
      date: "2024-01-26",
      categoryKey: "power.case.category.industry",
      image: caseSubstationInspection,
      tagKeys: ["power.case.tag.inspection", "power.case.tag.drone", "power.case.tag.powerInspection"],
      content: {
        introKey: "power.case2.intro",
        sections: [
          { titleKey: "power.case2.section1.title", contentKey: "power.case2.section1.content" },
          { titleKey: "power.case2.section2.title", contentKey: "power.case2.section2.content" },
          { titleKey: "power.case2.section3.title", contentKey: "power.case2.section3.content" }
        ],
        highlights: [
          { icon: Zap, titleKey: "power.case.highlight.mileage", valueKey: "power.case2.highlight1.value" },
          { icon: Shield, titleKey: "power.case.highlight.hazards", valueKey: "power.case2.highlight2.value" },
          { icon: Target, titleKey: "power.case.highlight.automation", valueKey: "power.case2.highlight3.value" },
          { icon: TrendingUp, titleKey: "power.case.highlight.response", valueKey: "power.case2.highlight4.value" }
        ],
        technologyKeys: ["power.case.tech.autoAirport", "power.case.tech.smartRoute", "power.case.tech.aiDefect", "power.case.tech.5g", "power.case.tech.edge", "power.case.tech.cloud"]
      }
    },
    "3": {
      id: 3,
      titleKey: "power.case3.title",
      date: "2024-01-25",
      categoryKey: "power.case.category.industry",
      image: caseSolarInspection,
      tagKeys: ["power.case.tag.inspection", "power.case.tag.drone", "power.case.tag.application"],
      content: {
        introKey: "power.case3.intro",
        sections: [
          { titleKey: "power.case3.section1.title", contentKey: "power.case3.section1.content" },
          { titleKey: "power.case3.section2.title", contentKey: "power.case3.section2.content" },
          { titleKey: "power.case3.section3.title", contentKey: "power.case3.section3.content" }
        ],
        highlights: [
          { icon: Zap, titleKey: "power.case.highlight.efficiency", valueKey: "power.case3.highlight1.value" },
          { icon: Shield, titleKey: "power.case.highlight.safety", valueKey: "power.case3.highlight2.value" },
          { icon: Target, titleKey: "power.case.highlight.precision", valueKey: "power.case3.highlight3.value" },
          { icon: TrendingUp, titleKey: "power.case.highlight.savings", valueKey: "power.case3.highlight4.value" }
        ],
        technologyKeys: ["power.case.tech.multiSensor", "power.case.tech.3d", "power.case.tech.smartDefect", "power.case.tech.autoReport", "power.case.tech.gis", "power.case.tech.mobileApp"]
      }
    },
    "4": {
      id: 4,
      titleKey: "power.case4.title",
      date: "2024-01-23",
      categoryKey: "power.case.category.industry",
      image: caseInsulatorCheck,
      tagKeys: ["power.case.tag.inspection", "power.case.tag.drone", "power.case.tag.application"],
      content: {
        introKey: "power.case4.intro",
        sections: [
          { titleKey: "power.case4.section1.title", contentKey: "power.case4.section1.content" },
          { titleKey: "power.case4.section2.title", contentKey: "power.case4.section2.content" },
          { titleKey: "power.case4.section3.title", contentKey: "power.case4.section3.content" }
        ],
        highlights: [
          { icon: Zap, titleKey: "power.case.highlight.cycle", valueKey: "power.case4.highlight1.value" },
          { icon: Shield, titleKey: "power.case.highlight.operation", valueKey: "power.case4.highlight2.value" },
          { icon: Target, titleKey: "power.case.highlight.resolution", valueKey: "power.case4.highlight3.value" },
          { icon: TrendingUp, titleKey: "power.case.highlight.accuracy", valueKey: "power.case4.highlight4.value" }
        ],
        technologyKeys: ["power.case.tech.zoomCamera", "power.case.tech.thermalImaging", "power.case.tech.uv", "power.case.tech.positioning", "power.case.tech.antiInterference", "power.case.tech.realtime"]
      }
    },
    "5": {
      id: 5,
      titleKey: "power.case5.title",
      date: "2024-01-23",
      categoryKey: "power.case.category.industry",
      image: caseCorridorInspection,
      tagKeys: ["power.case.tag.inspection", "power.case.tag.drone", "power.case.tag.application"],
      content: {
        introKey: "power.case5.intro",
        sections: [
          { titleKey: "power.case5.section1.title", contentKey: "power.case5.section1.content" },
          { titleKey: "power.case5.section2.title", contentKey: "power.case5.section2.content" },
          { titleKey: "power.case5.section3.title", contentKey: "power.case5.section3.content" }
        ],
        highlights: [
          { icon: Zap, titleKey: "power.case.highlight.quantity", valueKey: "power.case5.highlight1.value" },
          { icon: Shield, titleKey: "power.case.highlight.recognitionRate", valueKey: "power.case5.highlight2.value" },
          { icon: Target, titleKey: "power.case.highlight.defectTypes", valueKey: "power.case5.highlight3.value" },
          { icon: TrendingUp, titleKey: "power.case.highlight.processingEfficiency", valueKey: "power.case5.highlight4.value" }
        ],
        technologyKeys: ["power.case.tech.deepLearning", "power.case.tech.imageRecognition", "power.case.tech.classification", "power.case.tech.autoLabel", "power.case.tech.knowledge", "power.case.tech.warning"]
      }
    },
    "6": {
      id: 6,
      titleKey: "power.case6.title",
      date: "2024-01-20",
      categoryKey: "power.case.category.tech",
      image: caseAutonomousSystem,
      tagKeys: ["power.case.tag.autoAirport", "power.case.tag.unmanned", "power.case.tag.smartInspection"],
      content: {
        introKey: "power.case6.intro",
        sections: [
          { titleKey: "power.case6.section1.title", contentKey: "power.case6.section1.content" },
          { titleKey: "power.case6.section2.title", contentKey: "power.case6.section2.content" },
          { titleKey: "power.case6.section3.title", contentKey: "power.case6.section3.content" }
        ],
        highlights: [
          { icon: Zap, titleKey: "power.case.highlight.responseTime", valueKey: "power.case6.highlight1.value" },
          { icon: Shield, titleKey: "power.case.highlight.coverageRange", valueKey: "power.case6.highlight2.value" },
          { icon: Target, titleKey: "power.case.highlight.automationLevel", valueKey: "power.case6.highlight3.value" },
          { icon: TrendingUp, titleKey: "power.case.highlight.maintenanceCost", valueKey: "power.case6.highlight4.value" }
        ],
        technologyKeys: ["power.case.tech.autoLanding", "power.case.tech.smartCharging", "power.case.tech.envSensing", "power.case.tech.remoteControl", "power.case.tech.cloudScheduling", "power.case.tech.edgeComputing"]
      }
    }
  };
  
  const caseData = caseId ? caseDetails[caseId as keyof typeof caseDetails] : null;
  
  if (!caseData) {
    return <Navigate to="/applications/power-inspection" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <MultiLanguageSEO
        title={`${t(caseData.titleKey)} - ${t('power.case.seo.suffix')}`}
        description={t(caseData.content.introKey)}
        keywords={caseData.tagKeys.map(key => t(key)).join(",")}
        path={`/applications/power-inspection/case/${caseId}`}
      />
      <Header />
      <FloatingContact />

      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${caseData.image})` }}
          >
          </div>
          <div className="container-custom relative z-10 h-full flex items-end pb-12">
            <div className="max-w-4xl">
              <BackButton to="/applications/power-inspection" label={t('power.case.back')} />
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  {t(caseData.categoryKey)}
                </span>
                <span className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="mr-1 h-4 w-4" />
                  {caseData.date}
                </span>
              </div>
              <div className="rounded-3xl bg-background/70 backdrop-blur-md border border-border p-6 md:p-8 shadow-card">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {t(caseData.titleKey)}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {t(caseData.content.introKey)}
                  </p>
                  
                  {caseData.content.sections.map((section, index) => (
                    <div key={index} className="mb-10">
                      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                        <span className="w-1 h-6 bg-primary mr-3 rounded"></span>
                        {t(section.titleKey)}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {t(section.contentKey)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="mt-12 p-6 bg-muted rounded-xl">
                  <h3 className="text-xl font-bold text-foreground mb-4">{t('power.case.appliedTech')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {caseData.content.technologyKeys.map((techKey, index) => (
                      <span 
                        key={index} 
                        className="bg-background text-foreground px-4 py-2 rounded-full text-sm border border-border"
                      >
                        {t(techKey)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Highlights */}
                <div className="bg-card rounded-xl p-6 shadow-card mb-8">
                  <h3 className="text-xl font-bold text-card-foreground mb-6">{t('power.case.projectResults')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {caseData.content.highlights.map((item, index) => (
                      <div key={index} className="text-center p-4 bg-muted rounded-lg">
                        <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-primary">{t(item.valueKey)}</div>
                        <div className="text-sm text-muted-foreground">{t(item.titleKey)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-card rounded-xl p-6 shadow-card mb-8">
                  <h3 className="text-xl font-bold text-card-foreground mb-4">{t('power.case.relatedTags')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseData.tagKeys.map((tagKey, index) => (
                      <span 
                        key={index} 
                        className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {t(tagKey)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-4">{t('power.case.cta.title')}</h3>
                  <p className="opacity-90 mb-6 text-sm">
                    {t('power.case.cta.desc')}
                  </p>
                  <Link to="/contact">
                    <Button variant="secondary" className="w-full group">
                      {t('power.case.cta.btn')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Cases */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-foreground mb-8">{t('power.case.moreCases')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(caseDetails)
                .filter(c => c.id !== caseData.id)
                .slice(0, 3)
                .map((relatedCase) => (
                  <Link 
                    key={relatedCase.id} 
                    to={`/applications/power-inspection/case/${relatedCase.id}`}
                    className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedCase.image} 
                        alt={t(relatedCase.titleKey)} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {t(relatedCase.titleKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">{relatedCase.date}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseDetail;
