import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { AlertTriangle, Camera, Maximize, Users } from "lucide-react";

const C30WarningNotesSection = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const notes = [
    {
      icon: Maximize,
      title: isZh ? "空间要求" : "Space Requirements",
      items: [
        isZh ? "三机编队：场地面积需大于 30㎡" : "3-drone formation: venue area must exceed 30㎡",
        isZh ? "五机编队：场地面积需大于 50㎡" : "5-drone formation: venue area must exceed 50㎡",
        isZh ? "空间形状尽量接近正方形" : "Space shape should be as close to square as possible",
      ],
    },
    {
      icon: Camera,
      title: isZh ? "动捕相机数量" : "MoCap Camera Count",
      items: [
        isZh ? "30㎡ 空间一般需要 12 个以上动捕相机" : "30㎡ space typically requires 12+ MoCap cameras",
        isZh ? "50㎡ 空间一般需要 20 个以上动捕相机" : "50㎡ space typically requires 20+ MoCap cameras",
        isZh ? "空间越大，相机数量越多" : "Larger space requires more cameras",
      ],
    },
    {
      icon: Users,
      title: isZh ? "特殊说明" : "Special Notes",
      items: [
        isZh ? "特殊场地情况需特殊考虑，详情可咨询客服" : "Special venue conditions require individual assessment, please consult our team",
        isZh ? "购买此产品需考虑以上空间与设备要求" : "Consider the above space and equipment requirements before purchase",
      ],
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-destructive/5 border-2 border-destructive/20 overflow-hidden"
        >
          {/* Header bar */}
          <div className="bg-destructive/10 px-6 py-4 flex items-center gap-3 border-b border-destructive/20">
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
            <h3 className="text-lg font-bold text-destructive">
              {isZh ? '注意事项' : 'Important Notes'}
            </h3>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {notes.map((note, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-3">
                    <note.icon className="w-5 h-5 text-destructive/70" />
                    <h4 className="font-bold text-foreground text-sm">{note.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {note.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-destructive/60 mt-1 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default C30WarningNotesSection;
