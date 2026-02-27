import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";
import fullKitImg from "@/assets/products/c30-full-kit.webp";

const C30PackageSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const packageList = [
    { name: isZh ? "CANI C30 无人机" : "CANI C30 Drone", spec: "250mm", qty: "3" },
    { name: isZh ? "螺旋桨（含备用）" : "Propellers (w/ spares)", spec: isZh ? "高效低噪桨叶" : "High-efficiency blades", qty: isZh ? "6套(含备用)" : "6 sets (w/ spares)" },
    { name: isZh ? "飞控" : "Flight Controller", spec: "Pixhawk 6C", qty: "3" },
    { name: isZh ? "机载计算机" : "Onboard Computer", spec: "Allspark2 Orin NX", qty: "3" },
    { name: isZh ? "WiFi 通讯模块" : "WiFi Comm Module", spec: isZh ? "路由器+节点" : "Router + Nodes", qty: "1+3" },
    { name: isZh ? "动捕反光标记" : "MoCap Reflective Markers", spec: isZh ? "红外反光球" : "IR Reflective Spheres", qty: isZh ? "若干" : "Multiple" },
    { name: isZh ? "4S LiPo 电池" : "4S LiPo Battery", spec: "4S 5300mAh", qty: "3" },
    { name: isZh ? "平衡充电器" : "Balance Charger", spec: "1SDT-PD60", qty: "3" },
    { name: isZh ? "遥控器" : "Remote Controller", spec: isZh ? "备用手动控制" : "Backup Manual Control", qty: "1" },
    { name: isZh ? "地面站软件" : "Ground Station SW", spec: isZh ? "Qt 地面站 + QGC" : "Qt GCS + QGC", qty: isZh ? "授权" : "License" },
    { name: isZh ? "工具及线材" : "Tools & Cables", spec: isZh ? "安装维护工具包" : "Install & maintenance kit", qty: "1" },
    { name: isZh ? "使用手册" : "User Manual", spec: isZh ? "中英文" : "CN/EN", qty: "1" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{isZh ? '配置清单' : 'Package Contents'}</h2>
          <p className="text-muted-foreground">{isZh ? '标准套件包含以下全部组件（动捕系统需另行配置）' : 'Standard kit includes all components below (MoCap system configured separately)'}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-10">
          <OptimizedImage src={fullKitImg} alt={isZh ? "CANI C30 完整套件箱" : "CANI C30 Complete Kit Case"} aspectRatio="16/9" className="w-full rounded-2xl" objectFit="cover" />
        </motion.div>
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-accent/10">
                    <th className="px-6 py-4 text-left font-bold text-foreground">{isZh ? '名称' : 'Item'}</th>
                    <th className="px-6 py-4 text-left font-bold text-foreground">{isZh ? '规格型号' : 'Specification'}</th>
                    <th className="px-6 py-4 text-center font-bold text-foreground">{isZh ? '数量' : 'Qty'}</th>
                  </tr>
                </thead>
                <tbody>
                  {packageList.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-muted/50' : 'bg-card'} hover:bg-accent/5 transition-colors`}>
                      <td className="px-6 py-3 text-foreground border-b border-border/30 font-medium">{item.name}</td>
                      <td className="px-6 py-3 text-muted-foreground border-b border-border/30">{item.spec}</td>
                      <td className="px-6 py-3 text-center text-muted-foreground border-b border-border/30">{item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default C30PackageSection;
