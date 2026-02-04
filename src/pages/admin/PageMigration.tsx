import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, FileCode, CheckCircle, RefreshCw, Zap, Search, Wand2, Wrench, Copy, Loader2, ArrowRight, AlertCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// 硬编码的页面源码示例（用于演示）
const PAGE_CODE_SAMPLES: Record<string, string> = {
  'src/pages/applications/power/SolarPanel.tsx': `import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sun, Thermometer, Cpu, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const challenges = [
  "光伏电站面积大，人工巡检周期长、效率低",
  "热斑故障隐蔽，人眼难以发现，易造成组件损坏",
  "地面视角受限，难以全面检测组件表面问题",
  "巡检数据分散，缺乏统一管理和分析平台"
];

const solutions = [
  {
    icon: Thermometer,
    title: "红外热斑检测",
    description: "高精度红外热成像，快速发现热斑、隐裂、PID等组件故障"
  },
  {
    icon: Sun,
    title: "可见光检测",
    description: "4K高清相机检测组件表面积灰、遮挡、破损等问题"
  }
];

const SolarPanel = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="光伏电站检测 - 电力巡检应用"
        description="飞迈科技光伏电站无人机检测解决方案，红外热斑检测，快速发现组件故障。"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">行业痛点</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              光伏电站运维面临的主要挑战
            </p>
          </div>
        </section>
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">解决方案</h2>
          </div>
        </section>
        <section className="py-16 bg-card">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">获取光伏电站检测方案</h2>
            <Link to="/contact">
              <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                立即咨询 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/applications/power-inspection">
              <Button variant="outline" className="px-8 py-3">返回电力巡检</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default SolarPanel;`,
  'src/pages/applications/power/Substation.tsx': `import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Thermometer, Eye, Shield, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const challenges = [
  "变电站设备众多，人工巡检耗时长、效率低",
  "部分设备位置较高或空间狭窄，巡检难度大"
];

const solutions = [
  {
    icon: Thermometer,
    title: "红外测温",
    description: "高精度红外热成像仪，精准检测设备过热点"
  },
  {
    icon: Eye,
    title: "可见光巡检",
    description: "4K高清相机，清晰拍摄设备外观"
  }
];

const Substation = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="py-16 bg-background">
          <h2 className="text-2xl font-bold text-center mb-4">行业痛点</h2>
          <p className="text-muted-foreground text-center">传统变电站巡检方式存在效率低、覆盖不全等问题</p>
        </section>
        <section className="py-16 bg-muted">
          <h2 className="text-2xl font-bold text-center">解决方案</h2>
        </section>
        <section className="py-16 bg-primary">
          <h2 className="text-2xl font-bold text-primary-foreground text-center">技术参数</h2>
        </section>
        <section className="py-16 bg-muted">
          <h2 className="text-2xl font-bold text-center">客户收益</h2>
        </section>
        <section className="py-16 bg-card">
          <h2 className="text-2xl font-bold text-center mb-4">获取变电站巡检方案</h2>
          <Link to="/contact">
            <Button>立即咨询</Button>
          </Link>
          <Link to="/applications/power-inspection">
            <Button variant="outline">返回电力巡检</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Substation;`,
};

interface PageInfo {
  path: string;
  name: string;
  status: 'pending' | 'migrated';
}

interface MigrationResult {
  originalCode: string;
  migratedCode: string;
  translationKeys: Record<string, string>;
  patterns: Array<{
    original: string;
    english: string;
    chinese: string;
    lineNumber: number;
    key: string;
  }>;
  hardcodedChinese: Array<{
    text: string;
    lineNumber: number;
    key: string;
  }>;
}

// 所有可能需要检查的页面
const ALL_PRODUCT_PAGES = [
  // ===== 根页面 =====
  { path: 'src/pages/Index.tsx', name: '首页' },
  { path: 'src/pages/About.tsx', name: '关于我们' },
  { path: 'src/pages/Contact.tsx', name: '联系我们' },
  { path: 'src/pages/Products.tsx', name: '产品中心' },
  { path: 'src/pages/Applications.tsx', name: '行业应用' },
  { path: 'src/pages/CustomResearch.tsx', name: '产品定制' },
  { path: 'src/pages/FPV.tsx', name: 'FPV' },
  { path: 'src/pages/LowAltitude.tsx', name: '低空经济' },
  { path: 'src/pages/News.tsx', name: '新闻中心' },
  { path: 'src/pages/NewsDetail.tsx', name: '新闻详情' },
  { path: 'src/pages/Projects.tsx', name: '项目服务' },
  { path: 'src/pages/Software.tsx', name: '软件系统' },
  
  // ===== FPV 页面 =====
  { path: 'src/pages/fpv/DigitalFpv.tsx', name: '数字图传' },
  { path: 'src/pages/fpv/DigitalFpvDetail.tsx', name: '数字图传详情' },
  { path: 'src/pages/fpv/FPVCategory.tsx', name: 'FPV分类' },
  
  // ===== 软件系统页面 =====
  { path: 'src/pages/software/DroneManagement.tsx', name: '无人机管理平台' },
  { path: 'src/pages/software/EnvironmentSystem.tsx', name: '环保管理系统' },
  { path: 'src/pages/software/ExamSystem.tsx', name: '模拟考试系统' },
  { path: 'src/pages/software/GroundStation.tsx', name: '地面站软件' },
  { path: 'src/pages/software/PVInspection.tsx', name: '光伏巡检识别' },
  { path: 'src/pages/software/PVSystem.tsx', name: '光伏巡检系统' },
  { path: 'src/pages/software/PowerInspectionSystem.tsx', name: '电力巡检管理系统' },
  { path: 'src/pages/software/SwarmGroundStation.tsx', name: '集群地面站' },
  
  // ===== 项目服务页面 =====
  { path: 'src/pages/projects/DroneShow.tsx', name: '无人机表演' },
  { path: 'src/pages/projects/FlightService.tsx', name: '飞行服务' },
  { path: 'src/pages/projects/ProjectCooperation.tsx', name: '项目合作' },
  { path: 'src/pages/projects/ProjectTraining.tsx', name: '无人机培训' },
  
  // ===== 产品页面 - 系留无人机 =====
  { path: 'src/pages/products/tethered/TH100.tsx', name: 'TH100 系留无人机' },
  { path: 'src/pages/products/tethered/TH200.tsx', name: 'TH200 系留无人机' },
  { path: 'src/pages/products/tethered/TH300.tsx', name: 'TH300 系留无人机' },
  
  // ===== 产品页面 - 物流无人机 =====
  { path: 'src/pages/products/logistics/WL10.tsx', name: 'WL10 物流无人机' },
  { path: 'src/pages/products/logistics/WL20.tsx', name: 'WL20 物流无人机' },
  { path: 'src/pages/products/logistics/WL30.tsx', name: 'WL30 物流无人机' },
  
  // ===== 产品页面 - 机场系统 =====
  { path: 'src/pages/products/airport/UHS400P.tsx', name: 'UHS 400P 机场' },
  { path: 'src/pages/products/airport/UHS600.tsx', name: 'UHS 600 机场' },
  { path: 'src/pages/products/airport/UHS1000.tsx', name: 'UHS 1000 机场' },
  { path: 'src/pages/products/airport/VehicleMountedAirport.tsx', name: '车载机场' },
  
  // ===== 产品页面 - 多旋翼 =====
  { path: 'src/pages/products/multi-rotor/X650.tsx', name: 'X650 多旋翼' },
  { path: 'src/pages/products/multi-rotor/X850.tsx', name: 'X850 多旋翼' },
  { path: 'src/pages/products/multi-rotor/X1200.tsx', name: 'X1200 多旋翼' },
  { path: 'src/pages/products/multi-rotor/X1600.tsx', name: 'X1600 多旋翼' },
  
  // ===== 产品页面 - 其他 =====
  { path: 'src/pages/products/Swarm.tsx', name: '集群无人机' },
  { path: 'src/pages/products/SwarmKit.tsx', name: '集群套件' },
  { path: 'src/pages/products/Tethered.tsx', name: '系留无人机' },
  { path: 'src/pages/products/Logistics.tsx', name: '物流无人机' },
  { path: 'src/pages/products/MultiRotor.tsx', name: '多旋翼无人机' },
  { path: 'src/pages/products/Airport.tsx', name: '机场系统' },
  { path: 'src/pages/products/Firefighting.tsx', name: '消防无人机' },
  { path: 'src/pages/products/Agriculture.tsx', name: '农业无人机' },
  { path: 'src/pages/products/Training.tsx', name: '培训无人机' },
  { path: 'src/pages/products/WireLaying.tsx', name: '放线无人机' },
  { path: 'src/pages/products/WorkDrone.tsx', name: '作业无人机' },
  { path: 'src/pages/products/Accessories.tsx', name: '配件中心' },
  
  // ===== 配件详情页 =====
  { path: 'src/pages/products/accessories/Camera.tsx', name: '相机列表' },
  { path: 'src/pages/products/accessories/CameraDetail.tsx', name: '相机详情' },
  { path: 'src/pages/products/accessories/Gimbal.tsx', name: '云台列表' },
  { path: 'src/pages/products/accessories/GimbalDetail.tsx', name: '云台详情' },
  { path: 'src/pages/products/accessories/VtxVrx.tsx', name: 'VTX/VRX列表' },
  { path: 'src/pages/products/accessories/VtxDetail.tsx', name: 'VTX详情' },
  { path: 'src/pages/products/accessories/Elrs.tsx', name: 'ELRS列表' },
  { path: 'src/pages/products/accessories/ElrsDetail.tsx', name: 'ELRS详情' },
  { path: 'src/pages/products/accessories/FcEsc.tsx', name: '飞控电调列表' },
  { path: 'src/pages/products/accessories/FcEscDetail.tsx', name: '飞控电调详情' },
  { path: 'src/pages/products/accessories/OtherAccessories.tsx', name: '其他配件列表' },
  { path: 'src/pages/products/accessories/OtherAccessoriesDetail.tsx', name: '其他配件详情' },
  
  // ===== 定制研发页面 =====
  { path: 'src/pages/custom-research/Software.tsx', name: '软件定制' },
  { path: 'src/pages/custom-research/PayloadCustom.tsx', name: '载荷定制' },
  { path: 'src/pages/custom-research/DroneCustom.tsx', name: '无人机定制' },
  { path: 'src/pages/custom-research/AccessoriesCustom.tsx', name: '配件定制' },
  { path: 'src/pages/custom-research/AirportCustom.tsx', name: '机场定制' },
  { path: 'src/pages/custom-research/SwarmCustom.tsx', name: '集群定制' },
  
  // ===== 应用场景页面 =====
  { path: 'src/pages/applications/Power.tsx', name: '电力巡检' },
  { path: 'src/pages/applications/PowerInspection.tsx', name: '电力巡检详情' },
  { path: 'src/pages/applications/LogisticsApp.tsx', name: '物流应用' },
  { path: 'src/pages/applications/Military.tsx', name: '军事应用' },
  { path: 'src/pages/applications/EnvironmentApp.tsx', name: '环境监测' },
  { path: 'src/pages/applications/FirefightingApp.tsx', name: '消防应用' },
  { path: 'src/pages/applications/TetheredApp.tsx', name: '系留应用' },
  { path: 'src/pages/applications/Emergency.tsx', name: '应急救援' },
  { path: 'src/pages/applications/Environment.tsx', name: '环境监测入口' },
  { path: 'src/pages/applications/FiveG.tsx', name: '5G应用' },
  { path: 'src/pages/applications/Police.tsx', name: '警用安防' },
  { path: 'src/pages/applications/SmartCity.tsx', name: '智慧城市' },
  { path: 'src/pages/applications/Solutions.tsx', name: '解决方案' },
  { path: 'src/pages/applications/Surveying.tsx', name: '测绘测量' },
  { path: 'src/pages/applications/Traffic.tsx', name: '交通管理' },
  { path: 'src/pages/applications/Water.tsx', name: '水利应用' },
  
  // ===== 电力子页面 =====
  { path: 'src/pages/applications/power/CaseDetail.tsx', name: '电力案例详情' },
  { path: 'src/pages/applications/power/SolarPanel.tsx', name: '光伏巡检' },
  { path: 'src/pages/applications/power/Substation.tsx', name: '变电站巡检' },
  { path: 'src/pages/applications/power/TransmissionLine.tsx', name: '输电线路巡检' },
];

// ========== 分析工具函数 ==========

// 分析 isEn 模式
const analyzeIsEnPatterns = (code: string, pageContext: string): MigrationResult['patterns'] => {
  const patterns: MigrationResult['patterns'] = [];
  const lines = code.split('\n');
  
  // 匹配 isEn ? "English" : "中文" 模式
  const isEnRegex = /isEn\s*\?\s*["'`]([^"'`]*)["'`]\s*:\s*["'`]([^"'`]*)["'`]/g;
  
  // 匹配 language === 'en' ? "English" : "中文" 模式
  const langRegex = /language\s*===\s*['"]en['"]\s*\?\s*["'`]([^"'`]*)["'`]\s*:\s*["'`]([^"'`]*)["'`]/g;

  // 匹配 language === 'zh' ? "中文" : "English" 模式
  const langZhRegex = /language\s*===\s*['"]zh['"]\s*\?\s*["'`]([^"'`]*)["'`]\s*:\s*["'`]([^"'`]*)["'`]/g;

  let keyIndex = 1;
  
  lines.forEach((line, index) => {
    let match;
    
    while ((match = isEnRegex.exec(line)) !== null) {
      patterns.push({
        original: match[0],
        english: match[1],
        chinese: match[2],
        lineNumber: index + 1,
        key: `${pageContext}.text${keyIndex++}`,
      });
    }
    isEnRegex.lastIndex = 0;

    while ((match = langRegex.exec(line)) !== null) {
      patterns.push({
        original: match[0],
        english: match[1],
        chinese: match[2],
        lineNumber: index + 1,
        key: `${pageContext}.text${keyIndex++}`,
      });
    }
    langRegex.lastIndex = 0;

    while ((match = langZhRegex.exec(line)) !== null) {
      patterns.push({
        original: match[0],
        english: match[2],
        chinese: match[1],
        lineNumber: index + 1,
        key: `${pageContext}.text${keyIndex++}`,
      });
    }
    langZhRegex.lastIndex = 0;
  });

  return patterns;
};

// 检测硬编码中文字符串
const detectHardcodedChinese = (code: string, pageContext: string, startIndex: number): MigrationResult['hardcodedChinese'] => {
  const results: MigrationResult['hardcodedChinese'] = [];
  const lines = code.split('\n');
  const chineseRegex = /["'`]([^"'`]*[\u4e00-\u9fa5]+[^"'`]*)["'`]/g;
  
  let keyIndex = startIndex;

  lines.forEach((line, index) => {
    // 跳过注释和import语句
    if (line.trim().startsWith('//') || line.trim().startsWith('import') || line.trim().startsWith('*')) {
      return;
    }

    let match;
    while ((match = chineseRegex.exec(line)) !== null) {
      // 跳过已经在 isEn 或 t() 中的
      if (line.includes('isEn') || line.includes('t(\'') || line.includes('t("') || line.includes('language ===')) {
        continue;
      }
      results.push({
        text: match[1],
        lineNumber: index + 1,
        key: `${pageContext}.text${keyIndex++}`,
      });
    }
    chineseRegex.lastIndex = 0;
  });

  return results;
};

// 生成迁移后的代码
const generateMigratedCode = (
  code: string, 
  patterns: MigrationResult['patterns'],
  hardcoded: MigrationResult['hardcodedChinese']
): string => {
  let migratedCode = code;
  
  // 首先处理 isEn 模式
  patterns.forEach((pattern) => {
    migratedCode = migratedCode.replace(pattern.original, `t('${pattern.key}')`);
  });
  
  // 然后处理硬编码中文（从后往前替换，避免位置偏移）
  const sortedHardcoded = [...hardcoded].sort((a, b) => b.lineNumber - a.lineNumber);
  sortedHardcoded.forEach((item) => {
    // 替换字符串中的中文
    const regex = new RegExp(`(["'\`])${item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
    migratedCode = migratedCode.replace(regex, `{t('${item.key}')}`);
  });
  
  // 确保有 useLanguage 导入
  if (!migratedCode.includes('@/contexts/LanguageContext')) {
    const firstImportEnd = migratedCode.indexOf('\n');
    migratedCode = migratedCode.slice(0, firstImportEnd) + 
      '\nimport { useLanguage } from "@/contexts/LanguageContext";' + 
      migratedCode.slice(firstImportEnd);
  }
  
  // 在组件开头添加 const { t } = useLanguage();
  if (!migratedCode.includes('const { t }') && !migratedCode.includes('const {t}')) {
    const componentStart = migratedCode.match(/const \w+ = \(\) => \{/);
    if (componentStart) {
      const pos = migratedCode.indexOf(componentStart[0]) + componentStart[0].length;
      migratedCode = migratedCode.slice(0, pos) + '\n  const { t } = useLanguage();' + migratedCode.slice(pos);
    }
  }
  
  return migratedCode;
};

// 执行完整的代码分析
const analyzeCode = (code: string, pagePath: string): MigrationResult => {
  // 从路径生成页面上下文
  const fileName = pagePath.split('/').pop()?.replace('.tsx', '') || 'page';
  const pageContext = fileName.charAt(0).toLowerCase() + fileName.slice(1);
  
  const patterns = analyzeIsEnPatterns(code, pageContext);
  const hardcodedChinese = detectHardcodedChinese(code, pageContext, patterns.length + 1);
  
  // 生成翻译键
  const translationKeys: Record<string, string> = {};
  patterns.forEach(p => {
    translationKeys[p.key] = p.chinese;
  });
  hardcodedChinese.forEach(h => {
    translationKeys[h.key] = h.text;
  });
  
  const migratedCode = generateMigratedCode(code, patterns, hardcodedChinese);
  
  return {
    originalCode: code,
    migratedCode,
    translationKeys,
    patterns,
    hardcodedChinese,
  };
};

const PageMigration = () => {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [migratedPages, setMigratedPages] = useState<Set<string>>(new Set());
  
  // 一键迁移状态
  const [selectedPage, setSelectedPage] = useState<PageInfo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [migrationResult, setMigrationResult] = useState<MigrationResult | null>(null);

  // 从数据库加载已迁移的页面记录
  const loadMigratedPages = async (): Promise<Set<string>> => {
    try {
      const { data } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'migrated_pages')
        .maybeSingle();
      
      if (data?.value) {
        const migratedList = JSON.parse(data.value) as string[];
        return new Set(migratedList);
      }
    } catch (error) {
      console.error('Failed to load migrated pages:', error);
    }
    return new Set();
  };

  // 扫描未迁移的页面
  const scanPages = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setPages([]);

    const loadedMigrated = await loadMigratedPages();
    setMigratedPages(loadedMigrated);

    // 过滤出未迁移的页面
    const unmigrated: PageInfo[] = ALL_PRODUCT_PAGES
      .filter(p => !loadedMigrated.has(p.path))
      .map(p => ({
        ...p,
        status: 'pending' as const,
      }));

    await new Promise(r => setTimeout(r, 500));

    setPages(unmigrated);
    setIsScanning(false);
    setScanComplete(true);

    if (unmigrated.length === 0) {
      toast.success('🎉 所有页面都已迁移完成！');
    } else {
      toast.info(`发现 ${unmigrated.length} 个待迁移页面`);
    }
  };

  // 标记页面为已迁移
  const markAsMigrated = async (paths: string[]) => {
    try {
      const newMigrated = new Set(migratedPages);
      paths.forEach(p => newMigrated.add(p));
      
      const migratedArray = Array.from(newMigrated);
      await supabase
        .from('system_settings')
        .upsert({
          key: 'migrated_pages',
          value: JSON.stringify(migratedArray),
          description: '已迁移到t()函数的页面列表',
        }, { onConflict: 'key' });

      setMigratedPages(newMigrated);
      setPages(prev => prev.filter(p => !paths.includes(p.path)));
      setSelectedPages(new Set());
      
      toast.success(`✅ 已标记 ${paths.length} 个页面为已迁移`);
    } catch (error) {
      console.error('Failed to mark as migrated:', error);
      toast.error('保存失败');
    }
  };

  const togglePage = (path: string) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(path)) {
      newSelected.delete(path);
    } else {
      newSelected.add(path);
    }
    setSelectedPages(newSelected);
  };

  // ========== 一键迁移功能 ==========
  
  // 点击页面时自动加载并分析
  const handlePageClick = async (page: PageInfo) => {
    setSelectedPage(page);
    setIsAnalyzing(true);
    setMigrationResult(null);
    
    // 尝试获取页面代码
    let code = PAGE_CODE_SAMPLES[page.path];
    
    if (!code) {
      // 尝试 fetch
      try {
        const response = await fetch(`/${page.path}`);
        if (response.ok) {
          code = await response.text();
          PAGE_CODE_SAMPLES[page.path] = code;
        }
      } catch {
        // 生成示例说明
        code = `// 无法自动加载 ${page.path}
// 请复制以下指令到聊天框让 AI 帮你迁移：
// 
// "请帮我迁移 ${page.path} 页面到 t() 多语言系统"

// 示例代码结构：
const ${page.name.replace(/\s+/g, '')} = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  
  return (
    <div>
      <h1>{isEn ? "Title" : "标题"}</h1>
      <p>这是一段硬编码的中文</p>
      <Button>立即咨询</Button>
    </div>
  );
};`;
      }
    }
    
    // 执行分析
    setTimeout(() => {
      const result = analyzeCode(code, page.path);
      setMigrationResult(result);
      setIsAnalyzing(false);
      
      const totalIssues = result.patterns.length + result.hardcodedChinese.length;
      if (totalIssues === 0) {
        toast.success('✅ 该页面已经是多语言格式，无需迁移');
      } else {
        toast.success(`🔍 发现 ${result.patterns.length} 个 isEn 模式，${result.hardcodedChinese.length} 个硬编码中文`);
      }
    }, 300);
  };

  // 复制迁移后的代码
  const copyMigratedCode = () => {
    if (migrationResult) {
      navigator.clipboard.writeText(migrationResult.migratedCode);
      toast.success('✅ 迁移代码已复制！请替换原文件内容');
    }
  };

  // 复制翻译键
  const copyTranslationKeys = () => {
    if (migrationResult) {
      const keysCode = Object.entries(migrationResult.translationKeys)
        .map(([key, value]) => `  '${key}': '${value}',`)
        .join('\n');
      navigator.clipboard.writeText(keysCode);
      toast.success('✅ 翻译键已复制！请添加到 zh.ts 文件');
    }
  };

  // 复制 AI 迁移指令
  const copyAICommand = () => {
    if (selectedPage) {
      const cmd = `请帮我迁移 ${selectedPage.path} 页面从 isEn 模式到 t() 多语言函数`;
      navigator.clipboard.writeText(cmd);
      toast.success('✅ AI 指令已复制！请粘贴到聊天框');
    }
  };

  useEffect(() => {
    scanPages();
  }, []);

  const pendingCount = pages.filter(p => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/admin/translations">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">🚀 傻瓜式一键迁移</h1>
            <p className="text-muted-foreground">
              点击页面 → 自动分析 → 复制代码 → 完成迁移
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{ALL_PRODUCT_PAGES.length}</div>
              <div className="text-sm text-muted-foreground">总页面数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-500">{pendingCount}</div>
              <div className="text-sm text-muted-foreground">待迁移</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-500">{migratedPages.size}</div>
              <div className="text-sm text-muted-foreground">已迁移</div>
            </CardContent>
          </Card>
        </div>

        {/* 操作说明 */}
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 text-sm">
              <Badge className="bg-blue-500">1</Badge>
              <span>点击下方任意页面</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-blue-500">2</Badge>
              <span>自动分析代码</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-blue-500">3</Badge>
              <span>复制迁移代码</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-green-500">✓</Badge>
              <span>替换文件完成</span>
            </div>
          </CardContent>
        </Card>

        {/* 页面列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  待迁移页面
                  <Badge variant="outline">{pendingCount}</Badge>
                </CardTitle>
                <CardDescription>
                  点击任意页面开始一键迁移
                </CardDescription>
              </div>
              <Button 
                onClick={scanPages} 
                disabled={isScanning}
                variant="outline"
                size="sm"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    扫描中...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    重新扫描
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {pendingCount === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-600">全部迁移完成！</h3>
                <p className="text-muted-foreground mt-2">
                  所有产品页面都已使用 t() 多语言函数
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {pages.map((page) => (
                    <button
                      key={page.path}
                      onClick={() => handlePageClick(page)}
                      className={`text-left p-4 rounded-lg border transition-all hover:shadow-md ${
                        selectedPage?.path === page.path 
                          ? 'bg-primary/10 border-primary ring-2 ring-primary/20' 
                          : 'bg-card hover:bg-muted/50 hover:border-primary/40'
                      }`}
                    >
                      <div className="font-medium text-sm">{page.name}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-1 truncate">
                        {page.path.split('/').pop()}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* 迁移结果面板 */}
        <Dialog open={!!selectedPage} onOpenChange={(open) => !open && setSelectedPage(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                {selectedPage?.name} - 一键迁移
              </DialogTitle>
              <p className="text-sm text-muted-foreground font-mono">{selectedPage?.path}</p>
            </DialogHeader>
            
            {isAnalyzing ? (
              <div className="flex-1 flex items-center justify-center py-16">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium">正在分析代码...</p>
                  <p className="text-sm text-muted-foreground">自动检测 isEn 模式和硬编码中文</p>
                </div>
              </div>
            ) : migrationResult ? (
              <div className="flex-1 min-h-0 space-y-4">
                {/* 分析统计 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{migrationResult.patterns.length}</div>
                    <div className="text-xs text-blue-600">isEn 模式</div>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600">{migrationResult.hardcodedChinese.length}</div>
                    <div className="text-xs text-orange-600">硬编码中文</div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{Object.keys(migrationResult.translationKeys).length}</div>
                    <div className="text-xs text-green-600">生成翻译键</div>
                  </div>
                </div>

                {/* 快速操作按钮 */}
                <div className="flex gap-3">
                  <Button onClick={copyMigratedCode} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <Copy className="w-4 h-4 mr-2" />
                    复制迁移代码
                  </Button>
                  <Button onClick={copyTranslationKeys} variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    复制翻译键
                  </Button>
                  <Button onClick={copyAICommand} variant="secondary">
                    <Zap className="w-4 h-4 mr-2" />
                    AI帮迁移
                  </Button>
                </div>

                {/* 详细结果 */}
                <Tabs defaultValue="code" className="flex-1">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="code">迁移后代码</TabsTrigger>
                    <TabsTrigger value="keys">翻译键 ({Object.keys(migrationResult.translationKeys).length})</TabsTrigger>
                    <TabsTrigger value="details">检测详情</TabsTrigger>
                  </TabsList>

                  <TabsContent value="code" className="mt-2">
                    <ScrollArea className="h-[300px] rounded-lg border bg-gray-900">
                      <pre className="p-4 text-xs text-green-400 font-mono whitespace-pre-wrap">
                        {migrationResult.migratedCode}
                      </pre>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="keys" className="mt-2">
                    <ScrollArea className="h-[300px] rounded-lg border bg-white p-4">
                      <div className="space-y-2">
                        {Object.entries(migrationResult.translationKeys).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-3 p-2 bg-gray-50 rounded text-sm">
                            <code className="text-blue-600 font-mono text-xs">'{key}'</code>
                            <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-gray-700 truncate">'{value}'</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="details" className="mt-2">
                    <ScrollArea className="h-[300px] rounded-lg border bg-white p-4">
                      <div className="space-y-4">
                        {migrationResult.patterns.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                              <Badge className="bg-blue-500">isEn</Badge>
                              条件渲染模式
                            </h4>
                            <div className="space-y-2">
                              {migrationResult.patterns.map((p, i) => (
                                <div key={i} className="p-2 bg-blue-50 rounded text-xs">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-[10px]">L{p.lineNumber}</Badge>
                                    <code className="text-blue-600">t('{p.key}')</code>
                                  </div>
                                  <div className="text-muted-foreground truncate">{p.original}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {migrationResult.hardcodedChinese.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                              <Badge className="bg-orange-500">硬编码</Badge>
                              中文字符串
                            </h4>
                            <div className="space-y-2">
                              {migrationResult.hardcodedChinese.map((h, i) => (
                                <div key={i} className="p-2 bg-orange-50 rounded text-xs">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-[10px]">L{h.lineNumber}</Badge>
                                    <code className="text-orange-600">t('{h.key}')</code>
                                    <ArrowRight className="w-3 h-3" />
                                    <span>"{h.text}"</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>

                {/* 完成迁移按钮 */}
                <div className="pt-4 border-t flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    💡 复制代码后，替换原文件内容，并将翻译键添加到 <code className="bg-muted px-1 rounded">zh.ts</code>
                  </p>
                  <Button 
                    onClick={() => {
                      if (selectedPage) {
                        markAsMigrated([selectedPage.path]);
                        setSelectedPage(null);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    标记为已迁移
                  </Button>
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>

        {/* 批量操作卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🎯 批量操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {selectedPages.size > 0 && (
                <Button 
                  onClick={() => markAsMigrated(Array.from(selectedPages))}
                  variant="outline"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  标记选中为已迁移 ({selectedPages.size})
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={() => {
                  const cmd = `请帮我批量迁移以下页面到 t() 多语言系统：${pages.slice(0, 5).map(p => p.path).join(', ')}`;
                  navigator.clipboard.writeText(cmd);
                  toast.success('✅ 批量迁移指令已复制');
                }}
              >
                <Zap className="w-4 h-4 mr-2" />
                复制AI批量迁移指令
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              {pages.slice(0, 8).map(page => (
                <label key={page.path} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedPages.has(page.path)}
                    onCheckedChange={() => togglePage(page.path)}
                  />
                  {page.name}
                </label>
              ))}
              {pages.length > 8 && (
                <span className="text-sm text-muted-foreground">...还有 {pages.length - 8} 个</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageMigration;
