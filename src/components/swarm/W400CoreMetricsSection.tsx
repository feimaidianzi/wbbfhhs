import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Battery, Weight, Timer, Zap, Ruler, Wind } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import enduranceImg from "@/assets/products/w400-endurance.png";

const W400CoreMetricsSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const metrics = [
    { icon: <Timer className="h-6 w-6" />, value: "30min", label: isZh ? "最长续航时间" : "Max Flight Time", desc: isZh ? "大容量电池支持长时间任务执行" : "Large capacity battery for extended missions" },
    { icon: <Weight className="h-6 w-6" />, value: "4kg", label: isZh ? "最大起飞重量" : "Max Takeoff Weight", desc: isZh ? "可搭载多种传感器进行二次开发" : "Supports various sensor payloads for development" },
    { icon: <Battery className="h-6 w-6" />, value: "10000mAh", label: isZh ? "高电压电池" : "High-Voltage Battery", desc: isZh ? "22.2V / 222Wh 高能量密度锂聚合物" : "22.2V / 222Wh high energy density LiPo" },
    { icon: <Zap className="h-6 w-6" />, value: "22.2V", label: isZh ? "电池电压" : "Battery Voltage", desc: isZh ? "6S高压平台，动力储备充裕" : "6S high-voltage platform with ample power reserve" },
    { icon: <Ruler className="h-6 w-6" />, value: "600mm", label: isZh ? "对角线轴距" : "Diagonal Wheelbase", desc: isZh ? "六旋翼构型，稳定性与载重兼顾" : "Hexacopter config balancing stability & payload" },
    { icon: <Wind className="h-6 w-6" />, value: isZh ? "5级" : "Level 5", label: isZh ? "抗风等级" : "Wind Resistance", desc: isZh ? "室外复杂环境稳定作业" : "Stable operations in complex outdoor conditions" },
  ];

  return (
    <section className="py-20 bg-[hsl(220,20%,8%)] text-white relative overflow-hidden">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      
      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {isZh ? '长续航 · 大载重' : 'Long Endurance · Heavy Payload'}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {isZh ? '续航时间30min，最大起飞重量4kg，可搭载其他传感器进行二次开发' : '30min flight time, 4kg max takeoff weight, supports additional sensors for secondary development'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product image */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <OptimizedImage src={enduranceImg} alt={isZh ? "CANI-W400 长续航大载重" : "CANI-W400 Long Endurance Heavy Payload"} aspectRatio="4/3" className="w-full rounded-2xl" objectFit="contain" />
          </motion.div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent/40 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/30 transition-colors">
                    {m.icon}
                  </div>
                  <div className="text-2xl font-black text-accent">{m.value}</div>
                </div>
                <div className="font-bold text-sm text-white/90">{m.label}</div>
                <div className="text-xs text-white/50 mt-1">{m.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Battery energy dashboard */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white/5 border border-accent/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-center text-sm font-bold text-accent mb-6 uppercase tracking-wider flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" />
              {isZh ? '电池能量仪表' : 'Battery Energy Dashboard'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { val: "22.2V", lab: isZh ? "额定电压" : "Voltage" },
                { val: "10000mAh", lab: isZh ? "电池容量" : "Capacity" },
                { val: "222Wh", lab: isZh ? "能量密度" : "Energy" },
                { val: "XT60", lab: isZh ? "接口类型" : "Connector" },
              ].map((b, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-xl md:text-2xl font-black text-accent">{b.val}</div>
                  <div className="text-xs text-white/50 mt-1">{b.lab}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default W400CoreMetricsSection;
