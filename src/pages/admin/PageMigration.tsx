import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileCode, CheckCircle, RefreshCw, Copy, Check, Sparkles, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// ========== 全量页面扫描配置 ==========
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

  // 配件详情页
  { path: 'src/pages/products/accessories/VtxDetail.tsx', name: 'VTX详情' },
  { path: 'src/pages/products/accessories/FcEscDetail.tsx', name: '飞控电调详情' },

  // 低空经济
  { path: 'src/pages/low-altitude/Industry.tsx', name: '低空产业' },
  { path: 'src/pages/low-altitude/Policy.tsx', name: '低空政策' },
  { path: 'src/pages/low-altitude/Technology.tsx', name: '低空技术' },

  // AI 模块
  { path: 'src/pages/products/AiModule.tsx', name: 'AI制导模块' },
];

interface PageInfo {
  path: string;
  name: string;
  migrated: boolean;
}

const PageMigration = () => {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [migratedPaths, setMigratedPaths] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());

  const loadMigratedPages = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'migrated_pages')
        .maybeSingle();
      
      const migrated = data?.value ? new Set<string>(JSON.parse(data.value)) : new Set<string>();
      setMigratedPaths(migrated);
      
      setPages(ALL_PAGES_TO_SCAN.map(p => ({
        ...p,
        migrated: migrated.has(p.path),
      })));
    } catch (error) {
      console.error('Failed to load:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadMigratedPages(); }, [loadMigratedPages]);

  const pendingPages = pages.filter(p => !p.migrated);
  const migratedCount = pages.filter(p => p.migrated).length;

  // Toggle selection
  const toggleSelect = (path: string) => {
    setSelectedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  };

  const selectAllPending = () => {
    if (selectedPaths.size === pendingPages.length) {
      setSelectedPaths(new Set());
    } else {
      setSelectedPaths(new Set(pendingPages.map(p => p.path)));
    }
  };

  // 生成可直接粘贴给 AI 的指令
  const generateAIPrompt = (paths: string[]) => {
    const pageList = paths.map(path => {
      const page = ALL_PAGES_TO_SCAN.find(p => p.path === path);
      return `- ${path} (${page?.name || ''})`;
    }).join('\n');

    return `请帮我将以下页面中的硬编码中文字符串迁移到 t() 翻译函数。

要求：
1. 读取每个文件，找出所有硬编码中文（不含注释和已有 t() 的行）
2. 为每个中文字符串生成合适的翻译 key（基于页面上下文命名）
3. 将硬编码替换为 t('key') 调用
4. 确保文件导入了 useLanguage 并在组件中调用 const { t } = useLanguage()
5. 将新的翻译键值对添加到 src/i18n/zh.ts
6. 同时更新 src/i18n/en.ts 添加对应英文翻译

待迁移文件列表：
${pageList}

请逐个文件处理，每处理完一个文件就显示变更摘要。`;
  };

  // 复制 AI 指令
  const copyForAI = () => {
    const paths = selectedPaths.size > 0 
      ? Array.from(selectedPaths) 
      : pendingPages.map(p => p.path);
    
    if (paths.length === 0) {
      toast.error('没有待迁移的页面');
      return;
    }

    // 如果太多，分批
    const BATCH_SIZE = 5;
    if (paths.length > BATCH_SIZE) {
      const batch = paths.slice(0, BATCH_SIZE);
      const prompt = generateAIPrompt(batch);
      navigator.clipboard.writeText(prompt);
      toast.success(`已复制前 ${BATCH_SIZE} 个页面的 AI 指令（共 ${paths.length} 个待迁移，建议分批处理）`);
    } else {
      const prompt = generateAIPrompt(paths);
      navigator.clipboard.writeText(prompt);
      toast.success(`已复制 ${paths.length} 个页面的 AI 指令，粘贴到 AI 对话即可`);
    }
  };

  // 标记选中的为已迁移
  const markSelectedAsMigrated = async () => {
    if (selectedPaths.size === 0) {
      toast.error('请先选择页面');
      return;
    }

    try {
      const newMigrated = new Set(migratedPaths);
      selectedPaths.forEach(p => newMigrated.add(p));
      
      await supabase
        .from('system_settings')
        .upsert({
          key: 'migrated_pages',
          value: JSON.stringify(Array.from(newMigrated)),
          description: '已迁移到t()函数的页面列表',
        }, { onConflict: 'key' });

      setMigratedPaths(newMigrated);
      setPages(prev => prev.map(p => ({
        ...p,
        migrated: newMigrated.has(p.path),
      })));
      setSelectedPaths(new Set());
      toast.success(`✅ 已标记 ${selectedPaths.size} 个页面为已迁移`);
    } catch (error) {
      console.error('Failed to save:', error);
      toast.error('保存失败');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
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
              页面翻译迁移
            </h1>
            <p className="text-muted-foreground text-sm">
              选择页面 → 复制指令 → 粘贴给 AI → 完成迁移
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-orange-500">{pendingPages.length}</div>
              <div className="text-sm text-muted-foreground">待迁移</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-500">{migratedCount}</div>
              <div className="text-sm text-muted-foreground">已完成</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-500">{ALL_PAGES_TO_SCAN.length}</div>
              <div className="text-sm text-muted-foreground">总页面</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button onClick={copyForAI} className="gap-2">
            <Copy className="w-4 h-4" />
            {selectedPaths.size > 0 
              ? `复制 ${selectedPaths.size} 个页面的 AI 指令` 
              : '复制全部待迁移 AI 指令'}
          </Button>
          {selectedPaths.size > 0 && (
            <Button onClick={markSelectedAsMigrated} variant="outline" className="gap-2">
              <Check className="w-4 h-4" />
              标记 {selectedPaths.size} 个为已迁移
            </Button>
          )}
          <Button onClick={loadMigratedPages} variant="ghost" size="icon" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Pending Pages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ClipboardList className="w-5 h-5" />
                待迁移页面
                <Badge variant="outline">{pendingPages.length}</Badge>
              </CardTitle>
              {pendingPages.length > 0 && (
                <Button variant="ghost" size="sm" onClick={selectAllPending}>
                  {selectedPaths.size === pendingPages.length ? '取消全选' : '全选'}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {pendingPages.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-600">全部迁移完成！ 🎉</h3>
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-1 pr-4">
                  {pendingPages.map((page) => (
                    <button
                      key={page.path}
                      onClick={() => toggleSelect(page.path)}
                      className={`w-full text-left flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        selectedPaths.has(page.path)
                          ? 'bg-primary/10 border-primary'
                          : 'bg-card hover:bg-muted/50 border-transparent'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedPaths.has(page.path) 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'border-muted-foreground/30'
                      }`}>
                        {selectedPaths.has(page.path) && <Check className="w-3 h-3" />}
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-sm">{page.name}</span>
                        <span className="text-xs text-muted-foreground font-mono ml-2 truncate">
                          {page.path.replace('src/pages/', '')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Already Migrated (collapsed) */}
        {migratedCount > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                已迁移
                <Badge variant="secondary">{migratedCount}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {pages.filter(p => p.migrated).map(page => (
                  <Badge key={page.path} variant="secondary" className="text-xs">
                    {page.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PageMigration;
