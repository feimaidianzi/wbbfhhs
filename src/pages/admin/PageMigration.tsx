import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, FileCode, CheckCircle, RefreshCw, Search, Wand2, Copy, Loader2, ArrowRight, AlertCircle, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// ========== 全量页面扫描配置 ==========
// 所有需要检查的页面路径
const ALL_PAGES_TO_SCAN = [
  // 主页面
  { path: 'src/pages/Index.tsx', name: '首页' },
  { path: 'src/pages/About.tsx', name: '关于我们' },
  { path: 'src/pages/Contact.tsx', name: '联系我们' },
  { path: 'src/pages/Products.tsx', name: '产品中心' },
  { path: 'src/pages/News.tsx', name: '新闻列表' },
  { path: 'src/pages/NewsDetail.tsx', name: '新闻详情' },
  { path: 'src/pages/Applications.tsx', name: '应用场景' },
  { path: 'src/pages/Software.tsx', name: '软件系统' },
  { path: 'src/pages/CustomResearch.tsx', name: '科研定制' },
  { path: 'src/pages/Projects.tsx', name: '项目服务' },
  { path: 'src/pages/FPV.tsx', name: 'FPV' },
  { path: 'src/pages/LowAltitude.tsx', name: '低空经济' },
  
  // 产品 - 配件
  { path: 'src/pages/products/Accessories.tsx', name: '配件列表' },
  { path: 'src/pages/products/accessories/VtxVrx.tsx', name: 'VTX/VRX' },
  { path: 'src/pages/products/accessories/FcEsc.tsx', name: '飞控电调' },
  { path: 'src/pages/products/accessories/Camera.tsx', name: '相机' },
  { path: 'src/pages/products/accessories/Gimbal.tsx', name: '云台' },
  { path: 'src/pages/products/accessories/Elrs.tsx', name: 'ELRS' },
  { path: 'src/pages/products/accessories/OtherAccessories.tsx', name: '其他配件' },
  
  // 产品 - 主要产品
  { path: 'src/pages/products/Tethered.tsx', name: '系留无人机' },
  { path: 'src/pages/products/Logistics.tsx', name: '物流无人机' },
  { path: 'src/pages/products/Airport.tsx', name: '机场系统' },
  { path: 'src/pages/products/MultiRotor.tsx', name: '多旋翼' },
  { path: 'src/pages/products/Swarm.tsx', name: '集群系统' },
  { path: 'src/pages/products/SwarmKit.tsx', name: '集群套件' },
  { path: 'src/pages/products/Firefighting.tsx', name: '消防无人机' },
  { path: 'src/pages/products/Agriculture.tsx', name: '农业无人机' },
  { path: 'src/pages/products/Training.tsx', name: '培训无人机' },
  { path: 'src/pages/products/WireLaying.tsx', name: '放线无人机' },
  { path: 'src/pages/products/WorkDrone.tsx', name: '作业无人机' },
  
  // 产品详情 - 系留
  { path: 'src/pages/products/tethered/TH100.tsx', name: 'TH-100' },
  { path: 'src/pages/products/tethered/TH200.tsx', name: 'TH-200' },
  { path: 'src/pages/products/tethered/TH300.tsx', name: 'TH-300' },
  
  // 产品详情 - 物流
  { path: 'src/pages/products/logistics/WL10.tsx', name: 'WL-10' },
  { path: 'src/pages/products/logistics/WL20.tsx', name: 'WL-20' },
  { path: 'src/pages/products/logistics/WL30.tsx', name: 'WL-30' },
  
  // 产品详情 - 机场
  { path: 'src/pages/products/airport/UHS400P.tsx', name: 'UHS-400P' },
  { path: 'src/pages/products/airport/UHS600.tsx', name: 'UHS-600' },
  { path: 'src/pages/products/airport/UHS1000.tsx', name: 'UHS-1000' },
  { path: 'src/pages/products/airport/VehicleMountedAirport.tsx', name: '车载机场' },
  
  // 产品详情 - 多旋翼
  { path: 'src/pages/products/multi-rotor/X650.tsx', name: 'X650' },
  { path: 'src/pages/products/multi-rotor/X850.tsx', name: 'X850' },
  { path: 'src/pages/products/multi-rotor/X1200.tsx', name: 'X1200' },
  { path: 'src/pages/products/multi-rotor/X1600.tsx', name: 'X1600' },
  
  // 应用场景
  { path: 'src/pages/applications/Power.tsx', name: '电力巡检' },
  { path: 'src/pages/applications/PowerInspection.tsx', name: '电力巡检方案' },
  { path: 'src/pages/applications/power/TransmissionLine.tsx', name: '输电线路' },
  { path: 'src/pages/applications/power/Substation.tsx', name: '变电站' },
  { path: 'src/pages/applications/power/SolarPanel.tsx', name: '光伏电站' },
  { path: 'src/pages/applications/LogisticsApp.tsx', name: '物流应用' },
  { path: 'src/pages/applications/Emergency.tsx', name: '应急救援' },
  { path: 'src/pages/applications/Environment.tsx', name: '环境监测' },
  { path: 'src/pages/applications/EnvironmentApp.tsx', name: '环保应用' },
  { path: 'src/pages/applications/FirefightingApp.tsx', name: '消防应用' },
  { path: 'src/pages/applications/Military.tsx', name: '军事应用' },
  { path: 'src/pages/applications/Police.tsx', name: '警用安防' },
  { path: 'src/pages/applications/SmartCity.tsx', name: '智慧城市' },
  { path: 'src/pages/applications/Surveying.tsx', name: '测绘应用' },
  { path: 'src/pages/applications/Traffic.tsx', name: '交通监管' },
  { path: 'src/pages/applications/Water.tsx', name: '水利应用' },
  { path: 'src/pages/applications/TetheredApp.tsx', name: '系留应用' },
  { path: 'src/pages/applications/FiveG.tsx', name: '5G应用' },
  { path: 'src/pages/applications/Solutions.tsx', name: '解决方案' },
  
  // 软件
  { path: 'src/pages/software/ExamSystem.tsx', name: '考试系统' },
  { path: 'src/pages/software/DroneManagement.tsx', name: '无人机管理' },
  { path: 'src/pages/software/GroundStation.tsx', name: '地面站' },
  { path: 'src/pages/software/SwarmGroundStation.tsx', name: '集群地面站' },
  { path: 'src/pages/software/PVSystem.tsx', name: '光伏系统' },
  { path: 'src/pages/software/PVInspection.tsx', name: '光伏巡检' },
  { path: 'src/pages/software/PowerInspectionSystem.tsx', name: '电力巡检系统' },
  { path: 'src/pages/software/EnvironmentSystem.tsx', name: '环境系统' },
  
  // 科研定制
  { path: 'src/pages/custom-research/DroneCustom.tsx', name: '无人机定制' },
  { path: 'src/pages/custom-research/PayloadCustom.tsx', name: '载荷定制' },
  { path: 'src/pages/custom-research/AccessoriesCustom.tsx', name: '配件定制' },
  { path: 'src/pages/custom-research/AirportCustom.tsx', name: '机场定制' },
  { path: 'src/pages/custom-research/SwarmCustom.tsx', name: '集群定制' },
  { path: 'src/pages/custom-research/Software.tsx', name: '软件定制' },
  
  // 项目服务
  { path: 'src/pages/projects/ProjectTraining.tsx', name: '项目培训' },
  { path: 'src/pages/projects/DroneShow.tsx', name: '无人机表演' },
  { path: 'src/pages/projects/FlightService.tsx', name: '飞行服务' },
  { path: 'src/pages/projects/ProjectCooperation.tsx', name: '项目合作' },
  
  // FPV
  { path: 'src/pages/fpv/DigitalFpv.tsx', name: '数字图传' },
  { path: 'src/pages/fpv/FPVCategory.tsx', name: 'FPV分类' },
];

interface PageInfo {
  path: string;
  name: string;
  status: 'pending' | 'migrated' | 'already-done';
  chineseCount: number;
  usesTFunction: boolean;
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

// ========== 智能检测函数 ==========

// 检测页面是否已使用 t() 函数
const checkUsesTFunction = (code: string): boolean => {
  // 检查是否导入了 useLanguage
  const hasUseLanguageImport = code.includes('@/contexts/LanguageContext') || 
                               code.includes('useLanguage');
  // 检查是否使用了 t() 函数
  const usesTFunction = /\bt\(['"`]/.test(code);
  
  return hasUseLanguageImport && usesTFunction;
};

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

// 模拟获取页面源码（在实际场景中，这些代码会通过其他方式获取）
const getPageSourceCode = async (path: string): Promise<string | null> => {
  // 这里返回一个标记，表示需要用户手动提供代码
  // 因为我们无法在前端直接读取源码文件
  return null;
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
  const [codeInput, setCodeInput] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

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

  // 扫描所有页面
  const scanPages = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setPages([]);

    const loadedMigrated = await loadMigratedPages();
    setMigratedPages(loadedMigrated);

    // 模拟扫描延迟
    await new Promise(r => setTimeout(r, 500));

    // 生成待检查列表（排除已标记为迁移的）
    const pageList: PageInfo[] = ALL_PAGES_TO_SCAN
      .filter(p => !loadedMigrated.has(p.path))
      .map(p => ({
        ...p,
        status: 'pending' as const,
        chineseCount: 0, // 需要用户粘贴代码后才能检测
        usesTFunction: false,
      }));

    setPages(pageList);
    setIsScanning(false);
    setScanComplete(true);

    toast.info(`扫描完成：${pageList.length} 个页面待检查，${loadedMigrated.size} 个已迁移`);
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
      setSelectedPage(null);
      setMigrationResult(null);
      setCodeInput('');
      
      toast.success(`✅ 已标记 ${paths.length} 个页面为已迁移`);
    } catch (error) {
      console.error('Failed to mark as migrated:', error);
      toast.error('保存失败');
    }
  };

  // 点击页面时显示代码输入框
  const handlePageClick = (page: PageInfo) => {
    setSelectedPage(page);
    setShowCodeInput(true);
    setMigrationResult(null);
    setCodeInput('');
  };

  // 分析用户粘贴的代码
  const analyzeUserCode = () => {
    if (!codeInput.trim() || !selectedPage) {
      toast.error('请先粘贴页面源码');
      return;
    }

    setIsAnalyzing(true);
    setShowCodeInput(false);

    setTimeout(() => {
      // 检测是否已使用 t() 函数
      const usesTFunc = checkUsesTFunction(codeInput);
      
      if (usesTFunc) {
        // 已经迁移过了
        toast.success('🎉 该页面已使用 t() 函数，无需迁移！');
        setMigrationResult(null);
        setIsAnalyzing(false);
        // 自动标记为已迁移
        markAsMigrated([selectedPage.path]);
        return;
      }

      // 执行分析
      const result = analyzeCode(codeInput, selectedPage.path);
      setMigrationResult(result);
      setIsAnalyzing(false);
      
      if (result.hardcodedChinese.length === 0) {
        toast.info('未检测到硬编码中文，该页面可能不需要迁移');
      } else {
        toast.success(`🔍 发现 ${result.hardcodedChinese.length} 处硬编码中文，已生成迁移代码`);
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

  // 一键复制全部（代码 + 翻译键 + 说明）
  const copyAll = () => {
    if (migrationResult && selectedPage) {
      const allContent = `// ========== 迁移说明 ==========
// 文件: ${selectedPage.path}
// 检测到 ${migrationResult.hardcodedChinese.length} 处硬编码中文
// 
// 步骤1: 将下方代码替换原文件全部内容
// 步骤2: 将翻译键添加到 src/i18n/zh.ts

// ========== 迁移后的代码 ==========
${migrationResult.migratedCode}

// ========== 翻译键（添加到 zh.ts）==========
${Object.entries(migrationResult.translationKeys)
  .map(([key, value]) => `  '${key}': '${value}',`)
  .join('\n')}
`;
      navigator.clipboard.writeText(allContent);
      toast.success('✅ 全部内容已复制！包含代码和翻译键');
    }
  };

  useEffect(() => {
    scanPages();
  }, []);

  const pendingCount = pages.length;

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
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              傻瓜式一键迁移
            </h1>
            <p className="text-muted-foreground">
              粘贴代码 → 自动分析 → 复制替换 → 完成迁移（无需AI）
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
              <div className="text-sm text-orange-600/80">待检查页面</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600">{migratedPages.size}</div>
              <div className="text-sm text-green-600/80">已迁移完成</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600">{ALL_PAGES_TO_SCAN.length}</div>
              <div className="text-sm text-blue-600/80">总页面数</div>
            </CardContent>
          </Card>
        </div>

        {/* 操作说明 */}
        <Card className="border-primary/30 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <Badge className="bg-blue-500">1</Badge>
              <span className="font-medium">点击页面</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-blue-500">2</Badge>
              <span className="font-medium">粘贴源码</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-blue-500">3</Badge>
              <span className="font-medium">自动分析</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-blue-500">4</Badge>
              <span className="font-medium">复制替换</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-green-500">✓</Badge>
              <span className="font-medium text-green-600">完成</span>
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
                  待检查页面
                  <Badge variant="outline">{pendingCount}</Badge>
                </CardTitle>
                <CardDescription>
                  点击页面，粘贴源码，自动分析并生成迁移代码
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
                  <><Search className="w-4 h-4 mr-2" />刷新列表</>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {pendingCount === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-600">全部检查完成！</h3>
                <p className="text-muted-foreground mt-2">
                  所有页面都已检查或迁移完毕
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pr-4">
                  {pages.map((page) => (
                    <button
                      key={page.path}
                      onClick={() => handlePageClick(page)}
                      className={`text-left p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                        selectedPage?.path === page.path 
                          ? 'bg-primary/10 border-primary ring-2 ring-primary/30' 
                          : 'bg-card hover:bg-muted/50 hover:border-primary/50 border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{page.name}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="text-xs text-muted-foreground font-mono truncate">
                        {page.path.replace('src/pages/', '')}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* 代码输入弹窗 */}
        <Dialog open={showCodeInput && !!selectedPage} onOpenChange={(open) => {
          if (!open) {
            setShowCodeInput(false);
          }
        }}>
          <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-primary" />
                粘贴 {selectedPage?.name} 源码
              </DialogTitle>
              <p className="text-sm text-muted-foreground font-mono">{selectedPage?.path}</p>
            </DialogHeader>
            
            <div className="flex-1 min-h-0 space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg text-sm">
                <p className="font-medium mb-2">📋 操作步骤：</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>在编辑器中打开 <code className="bg-muted px-1 rounded">{selectedPage?.path}</code></li>
                  <li>全选文件内容（Ctrl+A / Cmd+A）</li>
                  <li>复制（Ctrl+C / Cmd+C）</li>
                  <li>粘贴到下方文本框</li>
                  <li>点击"分析代码"按钮</li>
                </ol>
              </div>
              
              <textarea
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="将页面源码粘贴到这里..."
                className="w-full h-48 p-4 font-mono text-sm border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary bg-background"
              />
              
              <div className="flex gap-3">
                <Button 
                  onClick={analyzeUserCode}
                  className="flex-1 h-12"
                  disabled={!codeInput.trim()}
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  分析代码
                </Button>
                <Button 
                  onClick={() => markAsMigrated([selectedPage!.path])}
                  variant="outline"
                  className="h-12"
                >
                  <Check className="w-5 h-5 mr-2" />
                  已迁移
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 迁移结果弹窗 */}
        <Dialog open={!!migrationResult} onOpenChange={(open) => {
          if (!open) {
            setMigrationResult(null);
          }
        }}>
          <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                {selectedPage?.name} - 迁移结果
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
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg text-center">
                    <div className="text-3xl font-bold text-orange-600">{migrationResult.hardcodedChinese.length}</div>
                    <div className="text-sm text-orange-600">检测到硬编码中文</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600">{Object.keys(migrationResult.translationKeys).length}</div>
                    <div className="text-sm text-green-600">生成翻译键</div>
                  </div>
                </div>

                {/* 快速操作按钮 */}
                <div className="flex gap-3">
                  <Button 
                    onClick={copyAll}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80 h-12"
                    disabled={migrationResult.hardcodedChinese.length === 0}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    一键复制全部
                  </Button>
                  <Button 
                    onClick={copyMigratedCode} 
                    variant="outline"
                    className="h-12"
                    disabled={migrationResult.hardcodedChinese.length === 0}
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    复制代码
                  </Button>
                  <Button 
                    onClick={copyTranslationKeys} 
                    variant="outline" 
                    className="h-12"
                    disabled={migrationResult.hardcodedChinese.length === 0}
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    复制翻译键
                  </Button>
                </div>

                {/* 使用说明 */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium text-sm mb-2">📝 完成迁移：</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>点击"一键复制全部"</li>
                    <li>用迁移后的代码替换原文件内容</li>
                    <li>将翻译键添加到 <code className="bg-muted px-1 rounded">src/i18n/zh.ts</code></li>
                    <li>点击下方"标记已迁移"按钮</li>
                  </ol>
                </div>

                {/* 检测到的中文列表 */}
                {migrationResult.hardcodedChinese.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 border-b">
                      <span className="font-medium text-sm">检测到的硬编码中文</span>
                    </div>
                    <ScrollArea className="h-32">
                      <div className="p-2 space-y-1">
                        {migrationResult.hardcodedChinese.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                            <Badge variant="outline" className="text-xs">L{item.lineNumber}</Badge>
                            <span className="font-mono text-muted-foreground">{item.key}</span>
                            <span className="text-foreground truncate">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* 底部操作 */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setMigrationResult(null)}>
                    返回
                  </Button>
                  <Button 
                    onClick={() => markAsMigrated([selectedPage!.path])}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    标记已迁移
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
