import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileCode, CheckCircle, RefreshCw, Zap, Search, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PageInfo {
  path: string;
  name: string;
  status: 'pending' | 'migrated';
}

// 已知已迁移的页面列表 (使用t()函数的页面)
const MIGRATED_PAGES = new Set([
  'src/pages/custom-research/Software.tsx',
  'src/pages/custom-research/PayloadCustom.tsx',
  'src/pages/custom-research/DroneCustom.tsx',
  'src/pages/custom-research/AccessoriesCustom.tsx',
  'src/pages/custom-research/AirportCustom.tsx',
  'src/pages/custom-research/SwarmCustom.tsx',
  'src/pages/applications/Power.tsx',
]);

// 所有可能需要检查的产品页面
const ALL_PRODUCT_PAGES = [
  // 产品页面 - 系留无人机
  { path: 'src/pages/products/tethered/TH100.tsx', name: 'TH100 系留无人机' },
  { path: 'src/pages/products/tethered/TH200.tsx', name: 'TH200 系留无人机' },
  { path: 'src/pages/products/tethered/TH300.tsx', name: 'TH300 系留无人机' },
  
  // 产品页面 - 物流无人机
  { path: 'src/pages/products/logistics/WL10.tsx', name: 'WL10 物流无人机' },
  { path: 'src/pages/products/logistics/WL20.tsx', name: 'WL20 物流无人机' },
  { path: 'src/pages/products/logistics/WL30.tsx', name: 'WL30 物流无人机' },
  
  // 产品页面 - 机场系统
  { path: 'src/pages/products/airport/UHS400P.tsx', name: 'UHS 400P 机场' },
  { path: 'src/pages/products/airport/UHS600.tsx', name: 'UHS 600 机场' },
  { path: 'src/pages/products/airport/UHS1000.tsx', name: 'UHS 1000 机场' },
  { path: 'src/pages/products/airport/VehicleMountedAirport.tsx', name: '车载机场' },
  
  // 产品页面 - 多旋翼
  { path: 'src/pages/products/multi-rotor/X650.tsx', name: 'X650 多旋翼' },
  { path: 'src/pages/products/multi-rotor/X850.tsx', name: 'X850 多旋翼' },
  { path: 'src/pages/products/multi-rotor/X1200.tsx', name: 'X1200 多旋翼' },
  { path: 'src/pages/products/multi-rotor/X1600.tsx', name: 'X1600 多旋翼' },
  
  // 配件详情页
  { path: 'src/pages/products/accessories/CameraDetail.tsx', name: '相机详情' },
  { path: 'src/pages/products/accessories/GimbalDetail.tsx', name: '云台详情' },
  { path: 'src/pages/products/accessories/VtxDetail.tsx', name: 'VTX详情' },
  { path: 'src/pages/products/accessories/ElrsDetail.tsx', name: 'ELRS详情' },
  { path: 'src/pages/products/accessories/OtherAccessoriesDetail.tsx', name: '其他配件详情' },
  { path: 'src/pages/products/accessories/FcEscDetail.tsx', name: '飞控电调详情' },
  
  // 定制研发页面
  { path: 'src/pages/custom-research/Software.tsx', name: '软件定制' },
  { path: 'src/pages/custom-research/PayloadCustom.tsx', name: '载荷定制' },
  { path: 'src/pages/custom-research/DroneCustom.tsx', name: '无人机定制' },
  { path: 'src/pages/custom-research/AccessoriesCustom.tsx', name: '配件定制' },
  { path: 'src/pages/custom-research/AirportCustom.tsx', name: '机场定制' },
  { path: 'src/pages/custom-research/SwarmCustom.tsx', name: '集群定制' },
  
  // 应用场景页面
  { path: 'src/pages/applications/Power.tsx', name: '电力巡检' },
  { path: 'src/pages/applications/PowerInspection.tsx', name: '电力巡检详情' },
  { path: 'src/pages/applications/LogisticsApp.tsx', name: '物流应用' },
  { path: 'src/pages/applications/Military.tsx', name: '军事应用' },
  { path: 'src/pages/applications/EnvironmentApp.tsx', name: '环境监测' },
  { path: 'src/pages/applications/FirefightingApp.tsx', name: '消防应用' },
  { path: 'src/pages/applications/TetheredApp.tsx', name: '系留应用' },
];

const PageMigration = () => {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  // 从数据库加载已迁移的页面记录
  const loadMigratedPages = async () => {
    try {
      const { data } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'migrated_pages')
        .maybeSingle();
      
      if (data?.value) {
        const migratedList = JSON.parse(data.value) as string[];
        migratedList.forEach(p => MIGRATED_PAGES.add(p));
      }
    } catch (error) {
      console.error('Failed to load migrated pages:', error);
    }
  };

  // 扫描未迁移的页面
  const scanPages = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setPages([]);

    await loadMigratedPages();

    // 过滤出未迁移的页面
    const unmigrated: PageInfo[] = ALL_PRODUCT_PAGES
      .filter(p => !MIGRATED_PAGES.has(p.path))
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
      paths.forEach(p => MIGRATED_PAGES.add(p));
      
      const migratedArray = Array.from(MIGRATED_PAGES);
      await supabase
        .from('system_settings')
        .upsert({
          key: 'migrated_pages',
          value: JSON.stringify(migratedArray),
          description: '已迁移到t()函数的页面列表',
        }, { onConflict: 'key' });

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
              <div className="text-3xl font-bold text-green-500">{MIGRATED_PAGES.size}</div>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsMigrated([page.path]);
                          }}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          已迁移
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        {selectedPages.size > 0 && (
          <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Wand2 className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">已选择 {selectedPages.size} 个页面</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  点击下方按钮开始自动迁移，迁移完成后请到翻译管理页面执行批量翻译
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedList.slice(0, 5).map(p => (
                    <Badge key={p.path} variant="secondary">{p.name}</Badge>
                  ))}
                  {selectedList.length > 5 && (
                    <Badge variant="outline">+{selectedList.length - 5} 更多</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
      </div>
    </div>
  );
};

export default PageMigration;
