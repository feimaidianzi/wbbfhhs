import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";
import fullKitImg from "@/assets/products/w400-full-kit.webp";

const W400PackageSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const items = [
    { name: isZh ? "CANI-W400 六旋翼无人机" : "CANI-W400 Hexacopter Drone", qty: "×3", cat: isZh ? "飞行平台" : "Platform" },
    { name: isZh ? "Pixhawk 6C 飞控（已安装）" : "Pixhawk 6C FC (Pre-installed)", qty: "×3", cat: isZh ? "航电" : "Avionics" },
    { name: isZh ? "GPS 多星定位模块" : "Multi-GNSS Module", qty: "×3", cat: isZh ? "导航" : "Navigation" },
    { name: "Allspark2 + Jetson Orin NX", qty: "×3", cat: isZh ? "计算" : "Computing" },
    { name: isZh ? "Mini Homer Mesh通讯模块" : "Mini Homer Mesh Module", qty: "×3", cat: isZh ? "通讯" : "Comms" },
    { name: "6S 5200mAh LiPo", qty: "×6", cat: isZh ? "电源" : "Power" },
    { name: isZh ? "平衡充电器" : "Balance Charger", qty: "×3", cat: isZh ? "电源" : "Power" },
    { name: isZh ? "Qt 地面站软件" : "Qt Ground Station Software", qty: "×1", cat: isZh ? "软件" : "Software" },
    { name: "Prometheus R1.6", qty: "×1", cat: isZh ? "软件" : "Software" },
    { name: isZh ? "地面站电脑（可选）" : "GCS Computer (Optional)", qty: "×1", cat: isZh ? "地面站" : "GCS" },
    { name: isZh ? "工具箱 + 备件包" : "Tool Kit + Spare Parts", qty: "×1", cat: isZh ? "配件" : "Accessories" },
    { name: isZh ? "培训与技术支持" : "Training & Technical Support", qty: "—", cat: isZh ? "服务" : "Service" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{isZh ? '配置清单' : 'Package Contents'}</h2>
          <p className="text-muted-foreground">{isZh ? 'CANI-W400 GPS旗舰集群套件标准配置' : 'CANI-W400 GPS Flagship Swarm Kit Standard Configuration'}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-10">
          <OptimizedImage src={fullKitImg} alt={isZh ? "CANI-W400 完整套件箱" : "CANI-W400 Complete Kit Case"} aspectRatio="16/9" className="w-full rounded-2xl" objectFit="cover" />
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="bg-accent/10">
                      <th className="px-6 py-3 text-left text-sm font-bold text-foreground">{isZh ? '分类' : 'Category'}</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-foreground">{isZh ? '项目' : 'Item'}</th>
                      <th className="px-6 py-3 text-center text-sm font-bold text-foreground">{isZh ? '数量' : 'Qty'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? 'bg-muted/50' : 'bg-card'} hover:bg-accent/5 transition-colors`}>
                        <td className="px-6 py-3 text-sm text-accent font-medium border-b border-border/30">{item.cat}</td>
                        <td className="px-6 py-3 text-sm text-foreground border-b border-border/30">{item.name}</td>
                        <td className="px-6 py-3 text-sm text-center text-muted-foreground border-b border-border/30 font-mono">{item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default W400PackageSection;
