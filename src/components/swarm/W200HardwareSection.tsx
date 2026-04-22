import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "@/lib/motion-shim";
import componentsImage from "@/assets/products/swarm-w200-components.jpg";

const W200HardwareSection = () => {
  const { t } = useLanguage();

  const labels = [
    { key: "w200.hardware.label.gps", top: "12%", left: "38%", lineEnd: { top: "20%", left: "42%" }, side: "left" },
    { key: "w200.hardware.label.uwb", top: "12%", right: "15%", lineEnd: { top: "22%", left: "58%" }, side: "right" },
    { key: "w200.hardware.label.propeller", top: "18%", right: "5%", lineEnd: { top: "28%", left: "70%" }, side: "right" },
    { key: "w200.hardware.label.fc", top: "30%", left: "10%", lineEnd: { top: "35%", left: "38%" }, side: "left" },
    { key: "w200.hardware.label.battery", top: "50%", left: "10%", lineEnd: { top: "48%", left: "38%" }, side: "left" },
    { key: "w200.hardware.label.opticalFlow", top: "58%", left: "5%", lineEnd: { top: "55%", left: "35%" }, side: "left" },
    { key: "w200.hardware.label.comm", top: "45%", right: "5%", lineEnd: { top: "42%", left: "65%" }, side: "right" },
    { key: "w200.hardware.label.computer", top: "70%", left: "50%", transform: "translateX(-50%)", lineEnd: { top: "62%", left: "50%" }, side: "center" },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            {t('w200.hardware.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('w200.hardware.desc')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Hardware diagram with HTML labels */}
          <div className="relative bg-card rounded-2xl shadow-2xl overflow-hidden">
            <img
              src={componentsImage}
              alt={t('w200.hardware.title')}
              className="w-full"
            />

            {/* Overlay labels */}
            <div className="absolute inset-0">
              {labels.map((label, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="absolute"
                  style={{
                    top: label.top,
                    left: label.left,
                    right: label.right,
                    transform: label.transform,
                  }}
                >
                  <span className="inline-block px-3 py-1.5 bg-accent/90 text-accent-foreground text-xs md:text-sm font-bold rounded-full shadow-lg whitespace-nowrap backdrop-blur-sm">
                    {t(label.key)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hardware component grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: "🎯", labelKey: "w200.hardware.label.uwb", desc: "Linktrack P-B" },
              { icon: "🖥️", labelKey: "w200.hardware.label.computer", desc: "NVIDIA Orin NX" },
              { icon: "🎮", labelKey: "w200.hardware.label.fc", desc: "Pixhawk 6C" },
              { icon: "📡", labelKey: "w200.hardware.label.comm", desc: "TCP/IP" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-card border border-border/30 rounded-xl p-4 text-center hover:border-accent/30 transition-colors"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-bold text-foreground">{t(item.labelKey)}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default W200HardwareSection;
