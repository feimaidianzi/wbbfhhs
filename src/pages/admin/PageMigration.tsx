import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, FileCode, CheckCircle, RefreshCw, Zap, Search, Wand2, Copy, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// ========== 真实的待迁移页面源码示例 ==========
// 这些是从实际文件中提取的需要迁移的代码片段
const PAGE_CODE_SAMPLES: Record<string, string> = {
  'src/pages/products/accessories/VtxVrx.tsx': `import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Radio, Zap, Settings, Shield, Thermometer, Cpu, ChevronRight } from "lucide-react";

const features = [{
  icon: Radio,
  title: "高性能射频",
  description: "采用罗杰斯4350B高性能射频PCB材料，确保优秀的射频性能"
}, {
  icon: Zap,
  title: "大功率输出",
  description: "多档功率可调，最高37W输出，远距离高清图传"
}, {
  icon: Thermometer,
  title: "优异散热",
  description: "内置散热风扇与散热器，CNC铝合金外壳，严酷环境下稳定工作"
}];

const VtxVrx = () => {
  return <>
    <SEO title="VTX/VRX 视频发射器与接收器 - 长凌科技" description="长凌科技VTX视频发射器与VRX接收器系列" />
    <Header />
    <main className="min-h-screen bg-background">
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <Link to="/products/accessories" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            返回配件列表
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">VTX/VRX 图传系统</h1>
            <p className="text-xl text-muted-foreground mb-8">
              高性能FPV视频发射器（VTX）与接收器（VRX）系列，采用罗杰斯4350B高性能射频材料
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/contact">获取报价</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#products">查看产品</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">产品特色</h2>
        </div>
      </section>
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">产品系列</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            根据频段分类，我们提供两大产品线，满足不同应用场景需求。
          </p>
        </div>
      </section>
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">使用注意事项</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-4 bg-card rounded-lg border border-border">
              <h4 className="font-semibold mb-2">⚡ 电源连接要求</h4>
              <p className="text-sm text-muted-foreground">
                必须严格按照焊盘位置焊接双12-28V电源输入线及双接地线
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <h4 className="font-semibold mb-2">📡 天线安装要求</h4>
              <p className="text-sm text-muted-foreground">
                通电前务必完成天线接口与天线的安装
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">需要定制化解决方案？</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            我们支持任意频点及频率组合定制，满足您的特殊需求。
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">联系我们</Link>
          </Button>
        </div>
      </section>
    </main>
    <Footer />
  </>;
};
export default VtxVrx;`,

  'src/pages/products/accessories/FcEsc.tsx': `import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cpu, Zap, Shield, Settings, Thermometer, Gauge, ChevronRight } from "lucide-react";

const stacks = [
  {
    id: "stack-mini-f7-55a",
    name: "FlyMind Mini F7+55A飞塔",
    category: "飞塔",
    highlights: [
      "STM32F722高性能处理器",
      "55A四合一电调，峰值65A",
      "25.5×25.5mm紧凑尺寸",
      "适配3-5寸穿越机架"
    ],
    price: "¥599"
  }
];

const features = [
  {
    icon: Cpu,
    title: "高性能处理器",
    description: "采用STM32F4/F7/H7系列处理器，高速运算，稳定飞控"
  },
  {
    icon: Zap,
    title: "大电流设计",
    description: "多层PCB设计，低电阻MOS阵列，支持高功率电机驱动"
  },
  {
    icon: Thermometer,
    title: "高效散热",
    description: "铝基板设计，优化散热路径，保障长时间稳定运行"
  }
];

const FcEsc = () => {
  return (
    <>
      <SEO 
        title="飞控/电调 - 飞塔系列 - 长凌科技"
        description="长凌科技飞控电调产品系列"
      />
      <Header />
      <main className="min-h-screen bg-background">
        <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <Link to="/products/accessories" className="inline-flex items-center gap-2 text-accent hover:underline mb-6 mt-8">
              <ArrowLeft className="w-4 h-4" />
              返回配件列表
            </Link>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">飞塔系列</h1>
              <p className="text-lg text-muted-foreground mb-6">
                高性能飞控与电调产品系列，涵盖F405/F722/H743飞控、多规格四合一电调、飞塔套装等
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">获取报价</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#products">查看产品</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">产品优势</h2>
          </div>
        </section>
        <section id="products" className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-2">飞塔套装</h2>
            <p className="text-center text-muted-foreground mb-8">飞控+电调一体化解决方案</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default FcEsc;`,

  'src/pages/applications/power/SolarPanel.tsx': `import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
  },
  {
    icon: Cpu,
    title: "AI智能分析",
    description: "AI自动识别故障类型并定位，生成可视化缺陷分布图"
  }
];

const SolarPanel = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="光伏电站检测 - 电力巡检应用"
        description="飞迈科技光伏电站无人机检测解决方案"
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
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              飞迈科技光伏无人机检测系统，高效精准运维
            </p>
          </div>
        </section>
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-12">技术参数</h2>
          </div>
        </section>
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">客户收益</h2>
          </div>
        </section>
        <section className="py-16 bg-card">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">获取光伏电站检测方案</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              联系我们获取详细技术方案和报价
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  立即咨询 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/applications/power-inspection">
                <Button variant="outline" className="px-8 py-3">返回电力巡检</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SolarPanel;`,

  'src/pages/applications/power/Substation.tsx': `import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Thermometer, Eye, Shield, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const challenges = [
  "变电站设备众多，人工巡检耗时长、效率低",
  "部分设备位置较高或空间狭窄，巡检难度大",
  "人工测温易受主观因素影响，漏检率高",
  "缺乏历史数据对比，难以发现渐变性故障"
];

const solutions = [
  {
    icon: Thermometer,
    title: "红外测温",
    description: "高精度红外热成像仪，精准检测设备过热点，温度测量精度±2℃"
  },
  {
    icon: Eye,
    title: "可见光巡检",
    description: "4K高清相机，清晰拍摄设备外观，发现锈蚀、渗漏、变形等缺陷"
  }
];

const Substation = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="变电站巡检 - 电力巡检应用"
        description="飞迈科技变电站无人机巡检解决方案"
      />
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">行业痛点</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              传统变电站巡检方式存在效率低、覆盖不全等问题
            </p>
          </div>
        </section>
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">解决方案</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              飞迈科技变电站无人机巡检系统，实现精准高效巡检
            </p>
          </div>
        </section>
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-12">技术参数</h2>
          </div>
        </section>
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">客户收益</h2>
          </div>
        </section>
        <section className="py-16 bg-card">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">获取变电站巡检方案</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              联系我们获取详细技术方案和报价
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-orange-light text-accent-foreground px-8 py-3">
                  立即咨询 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/applications/power-inspection">
                <Button variant="outline" className="px-8 py-3">返回电力巡检</Button>
              </Link>
            </div>
          </div>
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
  chineseCount?: number;
}

interface MigrationResult {
  originalCode: string;
  migratedCode: string;
  translationKeys: Record<string, string>;
  hardcodedChinese: Array<{
    text: string;
    lineNumber: number;
    key: string;
  }>;
}

// 真正需要迁移的页面（有硬编码中文的）
const PAGES_WITH_HARDCODED_CHINESE = [
  { path: 'src/pages/products/accessories/VtxVrx.tsx', name: 'VTX/VRX列表' },
  { path: 'src/pages/products/accessories/FcEsc.tsx', name: '飞控电调列表' },
  { path: 'src/pages/applications/power/SolarPanel.tsx', name: '光伏巡检' },
  { path: 'src/pages/applications/power/Substation.tsx', name: '变电站巡检' },
  { path: 'src/pages/applications/power/TransmissionLine.tsx', name: '输电线路巡检' },
  { path: 'src/pages/products/accessories/Camera.tsx', name: '相机列表' },
  { path: 'src/pages/products/accessories/Gimbal.tsx', name: '云台列表' },
  { path: 'src/pages/products/accessories/Elrs.tsx', name: 'ELRS列表' },
  { path: 'src/pages/products/accessories/OtherAccessories.tsx', name: '其他配件列表' },
];

// ========== 分析工具函数 ==========

// 检测硬编码中文字符串
const detectHardcodedChinese = (code: string, pageContext: string): MigrationResult['hardcodedChinese'] => {
  const results: MigrationResult['hardcodedChinese'] = [];
  const lines = code.split('\n');
  // 匹配包含中文的字符串
  const chineseRegex = /["'`]([^"'`]*[\u4e00-\u9fa5]+[^"'`]*)["'`]/g;
  
  let keyIndex = 1;

  lines.forEach((line, index) => {
    // 跳过注释、import语句、已经使用t()的行
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('//') || 
        trimmedLine.startsWith('import') || 
        trimmedLine.startsWith('*') ||
        line.includes("t('") || 
        line.includes('t("') ||
        line.includes('t(`')) {
      return;
    }

    let match;
    while ((match = chineseRegex.exec(line)) !== null) {
      const text = match[1];
      // 跳过太短或纯符号的
      if (text.length < 2) continue;
      
      results.push({
        text,
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
  hardcoded: MigrationResult['hardcodedChinese']
): string => {
  let migratedCode = code;
  
  // 从后往前替换，避免位置偏移
  const sorted = [...hardcoded].sort((a, b) => b.lineNumber - a.lineNumber);
  
  sorted.forEach((item) => {
    // 转义正则特殊字符
    const escaped = item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(["'\`])${escaped}\\1`, 'g');
    migratedCode = migratedCode.replace(regex, `{t('${item.key}')}`);
  });
  
  // 确保有 useLanguage 导入
  if (!migratedCode.includes('@/contexts/LanguageContext')) {
    const lines = migratedCode.split('\n');
    // 找到最后一个 import 语句的位置
    let lastImportIndex = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim().startsWith('import')) {
        lastImportIndex = i;
        break;
      }
    }
    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, 'import { useLanguage } from "@/contexts/LanguageContext";');
      migratedCode = lines.join('\n');
    }
  }
  
  // 在组件函数开头添加 const { t } = useLanguage();
  if (!migratedCode.includes('const { t }') && !migratedCode.includes('const {t}')) {
    // 匹配 const ComponentName = () => { 或 function ComponentName() {
    const patterns = [
      /const \w+ = \(\) => \{/,
      /const \w+ = \(\) => <>/, 
      /function \w+\(\) \{/
    ];
    
    for (const pattern of patterns) {
      const match = migratedCode.match(pattern);
      if (match) {
        const pos = migratedCode.indexOf(match[0]) + match[0].length;
        const insertText = match[0].includes('<>') 
          ? '\n  const { t } = useLanguage();\n  return <>'
          : '\n  const { t } = useLanguage();';
        
        if (match[0].includes('<>')) {
          migratedCode = migratedCode.replace(match[0], `const ${match[0].match(/const (\w+)/)?.[1]} = () => {${insertText}`);
        } else {
          migratedCode = migratedCode.slice(0, pos) + insertText + migratedCode.slice(pos);
        }
        break;
      }
    }
  }
  
  return migratedCode;
};

// 执行完整的代码分析
const analyzeCode = (code: string, pagePath: string): MigrationResult => {
  // 从路径生成页面上下文
  const fileName = pagePath.split('/').pop()?.replace('.tsx', '') || 'page';
  const pageContext = fileName.charAt(0).toLowerCase() + fileName.slice(1);
  
  const hardcodedChinese = detectHardcodedChinese(code, pageContext);
  
  // 生成翻译键
  const translationKeys: Record<string, string> = {};
  hardcodedChinese.forEach(h => {
    translationKeys[h.key] = h.text;
  });
  
  const migratedCode = generateMigratedCode(code, hardcodedChinese);
  
  return {
    originalCode: code,
    migratedCode,
    translationKeys,
    hardcodedChinese,
  };
};

const PageMigration = () => {
  const [pages, setPages] = useState<PageInfo[]>([]);
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

  // 扫描待迁移的页面（使用预定义的有硬编码中文的页面列表）
  const scanPages = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setPages([]);

    const loadedMigrated = await loadMigratedPages();
    setMigratedPages(loadedMigrated);

    // 只显示真正有硬编码中文且未迁移的页面
    const unmigrated: PageInfo[] = PAGES_WITH_HARDCODED_CHINESE
      .filter(p => !loadedMigrated.has(p.path))
      .map(p => {
        // 尝试计算中文数量
        const code = PAGE_CODE_SAMPLES[p.path];
        let chineseCount = 0;
        if (code) {
          const fileName = p.path.split('/').pop()?.replace('.tsx', '') || 'page';
          const result = detectHardcodedChinese(code, fileName);
          chineseCount = result.length;
        }
        return {
          ...p,
          status: 'pending' as const,
          chineseCount,
        };
      });

    await new Promise(r => setTimeout(r, 300));

    setPages(unmigrated);
    setIsScanning(false);
    setScanComplete(true);

    if (unmigrated.length === 0) {
      toast.success('🎉 所有页面都已迁移完成！');
    } else {
      const totalChinese = unmigrated.reduce((sum, p) => sum + (p.chineseCount || 0), 0);
      toast.info(`发现 ${unmigrated.length} 个待迁移页面，共 ${totalChinese} 处硬编码中文`);
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
      
      toast.success(`✅ 已标记 ${paths.length} 个页面为已迁移`);
    } catch (error) {
      console.error('Failed to mark as migrated:', error);
      toast.error('保存失败');
    }
  };

  // ========== 一键迁移功能 ==========
  
  // 点击页面时自动加载并分析
  const handlePageClick = async (page: PageInfo) => {
    setSelectedPage(page);
    setIsAnalyzing(true);
    setMigrationResult(null);
    
    // 获取页面代码
    let code = PAGE_CODE_SAMPLES[page.path];
    
    if (!code) {
      code = `// ⚠️ 暂未预置该页面的源码
// 
// 请使用以下方式之一完成迁移：
// 
// 方式1: 复制以下AI指令到聊天框
// "请帮我迁移 ${page.path} 页面到 t() 多语言系统"
// 
// 方式2: 手动操作
// 1. 在编辑器中打开 ${page.path}
// 2. 找到所有硬编码中文字符串
// 3. 替换为 t('key') 形式
// 4. 将翻译键添加到 zh.ts`;
    }
    
    // 执行分析
    setTimeout(() => {
      const result = analyzeCode(code, page.path);
      setMigrationResult(result);
      setIsAnalyzing(false);
      
      if (result.hardcodedChinese.length === 0) {
        toast.info('该页面源码未预置，请使用AI指令迁移');
      } else {
        toast.success(`🔍 发现 ${result.hardcodedChinese.length} 处硬编码中文，已生成迁移代码`);
      }
    }, 200);
  };

  // 复制迁移后的代码
  const copyMigratedCode = () => {
    if (migrationResult) {
      navigator.clipboard.writeText(migrationResult.migratedCode);
      toast.success('✅ 迁移代码已复制！请替换原文件内容');
    }
  };

  // 复制翻译键（zh.ts格式）
  const copyTranslationKeys = () => {
    if (migrationResult) {
      const keysCode = Object.entries(migrationResult.translationKeys)
        .map(([key, value]) => `  '${key}': '${value}',`)
        .join('\n');
      navigator.clipboard.writeText(keysCode);
      toast.success('✅ 翻译键已复制！请添加到 src/i18n/zh.ts');
    }
  };

  // 复制 AI 迁移指令
  const copyAICommand = () => {
    if (selectedPage) {
      const cmd = `请帮我迁移 ${selectedPage.path} 页面到 t() 多语言系统，将所有硬编码中文替换为翻译函数`;
      navigator.clipboard.writeText(cmd);
      toast.success('✅ AI指令已复制！请粘贴到聊天框发送');
    }
  };

  useEffect(() => {
    scanPages();
  }, []);

  const pendingCount = pages.length;
  const totalChinese = pages.reduce((sum, p) => sum + (p.chineseCount || 0), 0);

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
              点击页面 → 自动分析 → 复制代码 → 替换文件
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
              <div className="text-sm text-orange-600/80">待迁移页面</div>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-red-600">{totalChinese}</div>
              <div className="text-sm text-red-600/80">硬编码中文</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600">{migratedPages.size}</div>
              <div className="text-sm text-green-600/80">已迁移完成</div>
            </CardContent>
          </Card>
        </div>

        {/* 操作说明 */}
        <Card className="border-primary/30 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <Badge className="bg-blue-500">1</Badge>
              <span className="font-medium">点击页面</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-blue-500">2</Badge>
              <span className="font-medium">自动分析</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-blue-500">3</Badge>
              <span className="font-medium">复制代码</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-blue-500">4</Badge>
              <span className="font-medium">替换文件</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-green-500">✓</Badge>
              <span className="font-medium text-green-600">完成迁移</span>
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
                  <Badge variant="destructive">{pendingCount}</Badge>
                </CardTitle>
                <CardDescription>
                  点击任意页面，自动分析并生成迁移代码
                </CardDescription>
              </div>
              <Button 
                onClick={scanPages} 
                disabled={isScanning}
                variant="outline"
                size="sm"
              >
                {isScanning ? (
                  <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />扫描中...</>
                ) : (
                  <><Search className="w-4 h-4 mr-2" />重新扫描</>
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
                  所有预置页面都已迁移到 t() 多语言系统
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pages.map((page) => (
                  <button
                    key={page.path}
                    onClick={() => handlePageClick(page)}
                    className={`text-left p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
                      selectedPage?.path === page.path 
                        ? 'bg-primary/10 border-primary ring-2 ring-primary/30' 
                        : 'bg-card hover:bg-muted/50 hover:border-primary/50 border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{page.name}</span>
                      {page.chineseCount && page.chineseCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {page.chineseCount} 处中文
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono truncate">
                      {page.path}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 迁移结果弹窗 */}
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
                  <p className="text-sm text-muted-foreground">自动检测硬编码中文</p>
                </div>
              </div>
            ) : migrationResult ? (
              <div className="flex-1 min-h-0 space-y-4">
                {/* 分析统计 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center">
                    <div className="text-3xl font-bold text-orange-600">{migrationResult.hardcodedChinese.length}</div>
                    <div className="text-sm text-orange-600">检测到硬编码中文</div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600">{Object.keys(migrationResult.translationKeys).length}</div>
                    <div className="text-sm text-green-600">生成翻译键</div>
                  </div>
                </div>

                {/* 快速操作按钮 */}
                <div className="flex gap-3">
                  <Button 
                    onClick={copyMigratedCode} 
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12"
                    disabled={migrationResult.hardcodedChinese.length === 0}
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    复制迁移代码
                  </Button>
                  <Button 
                    onClick={copyTranslationKeys} 
                    variant="outline" 
                    className="flex-1 h-12"
                    disabled={migrationResult.hardcodedChinese.length === 0}
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    复制翻译键
                  </Button>
                  <Button onClick={copyAICommand} variant="secondary" className="h-12">
                    <Zap className="w-5 h-5 mr-2" />
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
                    <ScrollArea className="h-[280px] rounded-lg border bg-gray-900">
                      <pre className="p-4 text-xs text-green-400 font-mono whitespace-pre-wrap">
                        {migrationResult.migratedCode}
                      </pre>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="keys" className="mt-2">
                    <ScrollArea className="h-[280px] rounded-lg border bg-white p-4">
                      {Object.keys(migrationResult.translationKeys).length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <AlertCircle className="w-5 h-5 mr-2" />
                          暂无翻译键，请使用 AI 帮迁移
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground mb-3">
                            将以下内容添加到 <code className="bg-muted px-1 rounded">src/i18n/zh.ts</code>：
                          </p>
                          {Object.entries(migrationResult.translationKeys).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-3 p-2 bg-gray-50 rounded text-sm">
                              <code className="text-blue-600 font-mono text-xs">'{key}'</code>
                              <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-gray-700 truncate">'{value}'</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="details" className="mt-2">
                    <ScrollArea className="h-[280px] rounded-lg border bg-white p-4">
                      {migrationResult.hardcodedChinese.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                          <AlertCircle className="w-8 h-8 mb-2" />
                          <p>该页面源码未预置</p>
                          <p className="text-sm">请点击「AI帮迁移」按钮</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {migrationResult.hardcodedChinese.map((h, i) => (
                            <div key={i} className="p-3 bg-orange-50 border border-orange-100 rounded-lg text-sm">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">行 {h.lineNumber}</Badge>
                                <code className="text-blue-600 font-mono text-xs">t('{h.key}')</code>
                              </div>
                              <div className="text-gray-700">"{h.text}"</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                </Tabs>

                {/* 完成迁移按钮 */}
                <div className="pt-4 border-t flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    💡 复制代码后替换原文件，并将翻译键添加到 <code className="bg-muted px-1 rounded">zh.ts</code>
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
      </div>
    </div>
  );
};

export default PageMigration;
