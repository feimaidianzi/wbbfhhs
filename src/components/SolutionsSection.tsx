import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    title: "电力巡检",
    description: "无人机自动巡检输电线路，AI缺陷识别，提升巡检效率10倍以上",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    link: "/applications/power-inspection",
    stats: "效率提升10倍",
  },
  {
    title: "物流配送",
    description: "无人机末端配送，突破地形限制，实现高效低成本物流",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
    link: "/applications/logistics",
    stats: "配送时效提升5倍",
  },
  {
    title: "消防应急",
    description: "无人机火情侦察、高层灭火、应急救援，守护生命安全",
    image: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=600&q=80",
    link: "/applications/firefighting",
    stats: "响应速度提升3倍",
  },
  {
    title: "环境监测",
    description: "大气、水质、生态监测，为环境保护提供数据支撑",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    link: "/applications/environment",
    stats: "监测覆盖率95%+",
  },
];

export const SolutionsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-accent text-2xl font-black">&lt;</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              行业解决方案
            </h2>
            <span className="text-accent text-2xl font-black">\&gt;</span>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            深耕行业场景，提供从硬件到软件、从单机到集群的完整解决方案
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              to={solution.link}
              className="group relative h-[300px] rounded-2xl overflow-hidden"
            >
              <img
                src={solution.image}
                alt={solution.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-3">
                  {solution.stats}
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-2 group-hover:text-accent transition-colors">
                  {solution.title}
                </h3>
                <p className="text-primary-foreground/80 mb-4 line-clamp-2">
                  {solution.description}
                </p>
                <div className="flex items-center text-accent text-sm font-medium">
                  了解详情
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/applications"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            查看全部解决方案
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
