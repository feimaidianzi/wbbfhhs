import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, AlertTriangle, Activity, Cpu, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/OptimizedImage";
import selfcheckImg from "@/assets/products/w400-selfcheck.png";
import rtkImg from "@/assets/products/w400-rtk-coordinate.png";

const W400IntelligentSystemSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const selfCheckItems = [
    { icon: <CheckCircle className="h-5 w-5" />, title: isZh ? "传感器校验" : "Sensor Calibration", desc: isZh ? "IMU、气压计、磁力计自动校验与异常报警" : "Auto-calibration & anomaly alerts for IMU, barometer, magnetometer" },
    { icon: <Activity className="h-5 w-5" />, title: isZh ? "电池状态监测" : "Battery Health Monitor", desc: isZh ? "实时电压、电流、温度监控，低电量自动返航" : "Real-time voltage/current/temp monitoring with auto RTH" },
    { icon: <Cpu className="h-5 w-5" />, title: isZh ? "通信链路检测" : "Comm Link Check", desc: isZh ? "Mesh网络连通性验证，信号强度实时反馈" : "Mesh connectivity verification with real-time signal feedback" },
    { icon: <AlertTriangle className="h-5 w-5" />, title: isZh ? "防误操作保护" : "Misoperation Protection", desc: isZh ? "关键操作二次确认，异常指令自动拦截" : "Critical action double-confirm, anomalous command auto-block" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        {/* Self-Check System */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold mb-4">
            <ShieldCheck className="h-4 w-4" />
            {isZh ? '智能安全系统' : 'Intelligent Safety System'}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {isZh ? '无人机自检系统' : 'UAV Self-Diagnostics System'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isZh ? '保障系统正常稳定运行以及避免用户误操作，全方位预检确保每次飞行安全可靠' : 'Ensures stable operation and prevents user misoperation — comprehensive pre-flight checks for safe, reliable flights'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <OptimizedImage src={selfcheckImg} alt={isZh ? "无人机自检系统" : "UAV Self-Diagnostics"} aspectRatio="1/1" className="w-full max-w-md mx-auto rounded-2xl" objectFit="contain" />
          </motion.div>
          <div className="space-y-4">
            {selfCheckItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-card border-border/30 hover:border-accent/30 transition-colors">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RTK Coordinate Correction */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Search className="h-4 w-4" />
            {isZh ? '精准定位算法' : 'Precision Positioning Algorithm'}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {isZh ? '位置数据修正' : 'Position Data Correction'}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {isZh 
              ? '根据RTK定位数据自主对坐标系原点进行调整，统一坐标系原点。每架无人机启动时以自身GPS位置为(0,0)原点，通过RTK差分数据实时修正，将所有飞机映射到统一全局坐标系中，确保集群编队的位置精度。'
              : 'Autonomously adjusts coordinate origins based on RTK positioning data to unify the coordinate system. Each drone starts with its GPS position as the (0,0) origin, then RTK differential data corrects in real-time, mapping all UAVs into a unified global coordinate frame for precise swarm formation positioning.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Before: individual origins */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="bg-card border-border/30 overflow-hidden">
              <CardContent className="p-0">
                <OptimizedImage src={rtkImg} alt={isZh ? "RTK坐标系修正示意图" : "RTK Coordinate Correction Diagram"} aspectRatio="4/3" className="w-full" objectFit="contain" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Explanation cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
            <Card className="bg-card border-accent/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-accent font-bold mb-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">1</span>
                  {isZh ? '独立坐标系初始化' : 'Independent Origin Init'}
                </div>
                <p className="text-sm text-muted-foreground">
                  {isZh ? '每架无人机上电后，以自身GPS位置为本地坐标系(0,0)原点，各机坐标系相互独立' : 'On power-up, each drone sets its GPS position as local (0,0) origin — coordinate systems are independent'}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-accent/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-accent font-bold mb-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">2</span>
                  {isZh ? 'RTK差分修正' : 'RTK Differential Correction'}
                </div>
                <p className="text-sm text-muted-foreground">
                  {isZh ? '通过RTK基站广播差分数据，各机实时修正位置偏差，精度达厘米级' : 'RTK base station broadcasts differential data, each UAV corrects position drift in real-time to cm-level accuracy'}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-accent/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-accent font-bold mb-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">3</span>
                  {isZh ? '统一全局坐标' : 'Unified Global Frame'}
                </div>
                <p className="text-sm text-muted-foreground">
                  {isZh ? '所有无人机映射到同一全局坐标系，例如(0,0)、(-1,1)、(-1,-1)，编队位置精确可控' : 'All UAVs mapped to a single global frame — e.g., (0,0), (-1,1), (-1,-1) — formation positions are precisely controlled'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default W400IntelligentSystemSection;
