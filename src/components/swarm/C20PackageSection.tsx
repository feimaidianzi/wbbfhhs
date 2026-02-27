import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const C20PackageSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const packageList = [
    { name: isZh ? "CANI C20 无人机" : "CANI C20 Drone", spec: "230mm", qty: "3" },
    { name: isZh ? "螺旋桨（含备用）" : "Propellers (w/ spares)", spec: isZh ? '5寸三叶桨' : '5" Tri-blade', qty: isZh ? "6套(含备用)" : "6 sets (w/ spares)" },
    { name: isZh ? "飞控" : "Flight Controller", spec: "Pixhawk", qty: "3" },
    { name: isZh ? "WiFi 通讯模块" : "WiFi Comm Module", spec: isZh ? "路由+节点" : "Router+Nodes", qty: "1+3" },
    { name: isZh ? "UWB 定位基站" : "UWB Base Station", spec: "Linktrack P-B", qty: "4" },
    { name: isZh ? "UWB 定位标签" : "UWB Tag", spec: "Linktrack P-B", qty: "3" },
    { name: isZh ? "4S LiPo 电池" : "4S LiPo Battery", spec: "4S 3000mAh", qty: "3" },
    { name: isZh ? "平衡充电器" : "Balance Charger", spec: isZh ? "多路充电" : "Multi-channel", qty: "3" },
    { name: isZh ? "遥控器" : "Remote Controller", spec: isZh ? "备用遥控" : "Backup RC", qty: "1" },
    { name: isZh ? "工具及配件包" : "Tools & Accessories", spec: isZh ? "安装工具/线材" : "Install tools/cables", qty: "1" },
    { name: isZh ? "地面站软件" : "Ground Station SW", spec: "QGroundControl", qty: isZh ? "授权" : "License" },
    { name: isZh ? "使用手册" : "User Manual", spec: isZh ? "中英文" : "CN/EN", qty: "1" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{isZh ? '配置清单' : 'Package Contents'}</h2>
          <p className="text-muted-foreground">{isZh ? '标准套件包含以下全部组件' : 'Standard kit includes all components below'}</p>
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

export default C20PackageSection;
