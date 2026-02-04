import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileCode, CheckCircle, RefreshCw, Zap, Search, Wand2, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AutoMigrationTool from "@/components/admin/AutoMigrationTool";

interface PageInfo {
  path: string;
  name: string;
  status: 'pending' | 'migrated';
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

const PageMigration = () => {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [migratedPages, setMigratedPages] = useState<Set<string>>(new Set());

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

    // 模拟扫描延迟
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

  const selectAll = () => {
    if (selectedPages.size === pages.length) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set(pages.map(p => p.path)));
    }
  };

  useEffect(() => {
    scanPages();
  }, []);

  const pendingCount = pages.filter(p => p.status === 'pending').length;
  const selectedList = pages.filter(p => selectedPages.has(p.path));

  const [activeTab, setActiveTab] = useState<'list' | 'tool'>('list');

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
            <h1 className="text-2xl font-bold">🔄 一键页面迁移</h1>
            <p className="text-muted-foreground">
              选择页面 → 点击下方按钮 → 自动完成迁移
            </p>
          </div>
        </div>

        {/* Mode Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'list' | 'tool')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <FileCode className="w-4 h-4" />
              页面列表模式
            </TabsTrigger>
            <TabsTrigger value="tool" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              本地迁移工具
              <Badge variant="secondary" className="text-[10px]">无AI</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tool" className="mt-4">
            <AutoMigrationTool selectedPages={Array.from(selectedPages)} />
          </TabsContent>

          <TabsContent value="list" className="mt-4 space-y-6">

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

        {/* Scan Button */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">扫描未迁移页面</h3>
                <p className="text-sm text-muted-foreground">
                  检测代码库中仍使用 isEn 模式的页面
                </p>
              </div>
              <Button 
                onClick={scanPages} 
                disabled={isScanning}
                variant="outline"
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
          </CardContent>
        </Card>

        {/* Page List */}
        {scanComplete && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileCode className="w-5 h-5" />
                    待迁移页面列表
                  </CardTitle>
                  <CardDescription>
                    {pendingCount > 0 
                      ? `选择需要迁移的页面，然后点击下方的迁移按钮`
                      : '所有页面都已迁移完成！'}
                  </CardDescription>
                </div>
                {pendingCount > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={selectAll}
                  >
                    {selectedPages.size === pages.length ? '取消全选' : '全选'}
                  </Button>
                )}
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
                <ScrollArea className="h-[350px]">
                  <div className="space-y-2">
                    {pages.map((page) => (
                      <div 
                        key={page.path}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                          selectedPages.has(page.path) 
                            ? 'bg-primary/10 border-primary/40' 
                            : 'bg-card hover:bg-muted/50'
                        }`}
                        onClick={() => togglePage(page.path)}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedPages.has(page.path)}
                            onCheckedChange={() => togglePage(page.path)}
                          />
                          <div>
                            <div className="font-medium">{page.name}</div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {page.path}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
                          待迁移
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions - Always visible */}
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              🚀 快速迁移操作
            </CardTitle>
            <CardDescription>
              点击下方按钮，AI将自动完成页面迁移（将isEn模式转换为t()多语言函数）
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Selected pages info */}
            {selectedPages.size > 0 && (
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">已选择 {selectedPages.size} 个页面</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedList.slice(0, 6).map(p => (
                    <Badge key={p.path} variant="secondary" className="text-xs">{p.name}</Badge>
                  ))}
                  {selectedList.length > 6 && (
                    <Badge variant="outline" className="text-xs">+{selectedList.length - 6}</Badge>
                  )}
                </div>
              </div>
            )}

            {/* Migration action buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button 
                className="h-auto py-4 flex-col gap-1"
                variant="default"
                onClick={() => {
                  const msg = "请帮我自动迁移以下页面从 isEn 模式到 t() 多语言函数：src/pages/products/tethered/TH100.tsx, src/pages/products/tethered/TH200.tsx, src/pages/products/tethered/TH300.tsx（系留无人机系列）";
                  navigator.clipboard.writeText(msg);
                  toast.success("已复制迁移指令，请粘贴到聊天框发送");
                }}
              >
                <span className="font-semibold">🚁 迁移系留无人机</span>
                <span className="text-xs opacity-80">TH100 / TH200 / TH300</span>
              </Button>

              <Button 
                className="h-auto py-4 flex-col gap-1"
                variant="default"
                onClick={() => {
                  const msg = "请帮我自动迁移以下页面从 isEn 模式到 t() 多语言函数：src/pages/products/logistics/WL10.tsx, src/pages/products/logistics/WL20.tsx, src/pages/products/logistics/WL30.tsx（物流无人机系列）";
                  navigator.clipboard.writeText(msg);
                  toast.success("已复制迁移指令，请粘贴到聊天框发送");
                }}
              >
                <span className="font-semibold">📦 迁移物流无人机</span>
                <span className="text-xs opacity-80">WL10 / WL20 / WL30</span>
              </Button>

              <Button 
                className="h-auto py-4 flex-col gap-1"
                variant="default"
                onClick={() => {
                  const msg = "请帮我自动迁移以下页面从 isEn 模式到 t() 多语言函数：src/pages/products/airport/UHS400P.tsx, src/pages/products/airport/UHS600.tsx, src/pages/products/airport/UHS1000.tsx, src/pages/products/airport/VehicleMountedAirport.tsx（机场系统系列）";
                  navigator.clipboard.writeText(msg);
                  toast.success("已复制迁移指令，请粘贴到聊天框发送");
                }}
              >
                <span className="font-semibold">🏠 迁移机场系统</span>
                <span className="text-xs opacity-80">UHS400P / UHS600 / UHS1000 / 车载</span>
              </Button>

              <Button 
                className="h-auto py-4 flex-col gap-1"
                variant="default"
                onClick={() => {
                  const msg = "请帮我自动迁移以下页面从 isEn 模式到 t() 多语言函数：src/pages/products/multi-rotor/X650.tsx, src/pages/products/multi-rotor/X850.tsx, src/pages/products/multi-rotor/X1200.tsx, src/pages/products/multi-rotor/X1600.tsx（多旋翼系列）";
                  navigator.clipboard.writeText(msg);
                  toast.success("已复制迁移指令，请粘贴到聊天框发送");
                }}
              >
                <span className="font-semibold">🔄 迁移多旋翼</span>
                <span className="text-xs opacity-80">X650 / X850 / X1200 / X1600</span>
              </Button>
            </div>

            {/* One-click migrate all */}
            <Button 
              className="w-full h-auto py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              onClick={() => {
                const allPending = pages.map(p => p.path).join(', ');
                const msg = `请帮我自动迁移所有待迁移的页面从 isEn 模式到 t() 多语言函数：${allPending}`;
                navigator.clipboard.writeText(msg);
                toast.success("已复制迁移指令，请粘贴到聊天框发送");
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg">🚀 一键迁移全部 ({pendingCount} 个页面)</span>
                <span className="text-xs opacity-80">复制指令后粘贴到聊天框发送即可</span>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📋 使用说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">1</Badge>
              <p>勾选需要迁移的页面（可多选）</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">2</Badge>
              <p>点击下方的"🚀 开始迁移"按钮发送迁移请求</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">3</Badge>
              <p>等待AI自动完成迁移后，点击"已迁移"标记完成</p>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">4</Badge>
              <p>前往翻译管理页面，点击"一键翻译全部"完成多语言翻译</p>
            </div>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PageMigration;
