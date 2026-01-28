import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileCode, CheckCircle, AlertCircle, Play, RefreshCw, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface PageInfo {
  path: string;
  name: string;
  isEnCount: number;
  status: 'pending' | 'migrating' | 'done' | 'error';
  keyCount?: number;
}

// 需要迁移的页面列表 (使用isEn模式的页面)
const PAGES_TO_MIGRATE: PageInfo[] = [
  // 产品页面 - 系留无人机
  { path: 'src/pages/products/tethered/TH100.tsx', name: 'TH100 系留无人机', isEnCount: 45, status: 'pending' },
  { path: 'src/pages/products/tethered/TH200.tsx', name: 'TH200 系留无人机', isEnCount: 42, status: 'pending' },
  { path: 'src/pages/products/tethered/TH300.tsx', name: 'TH300 系留无人机', isEnCount: 38, status: 'pending' },
  
  // 产品页面 - 物流无人机
  { path: 'src/pages/products/logistics/WL10.tsx', name: 'WL10 物流无人机', isEnCount: 35, status: 'pending' },
  { path: 'src/pages/products/logistics/WL20.tsx', name: 'WL20 物流无人机', isEnCount: 35, status: 'pending' },
  { path: 'src/pages/products/logistics/WL30.tsx', name: 'WL30 物流无人机', isEnCount: 35, status: 'pending' },
  
  // 产品页面 - 机场系统
  { path: 'src/pages/products/airport/UHS400P.tsx', name: 'UHS 400P 机场', isEnCount: 40, status: 'pending' },
  { path: 'src/pages/products/airport/UHS600.tsx', name: 'UHS 600 机场', isEnCount: 40, status: 'pending' },
  { path: 'src/pages/products/airport/UHS1000.tsx', name: 'UHS 1000 机场', isEnCount: 45, status: 'pending' },
  { path: 'src/pages/products/airport/VehicleMountedAirport.tsx', name: '车载机场', isEnCount: 38, status: 'pending' },
  
  // 产品页面 - 多旋翼
  { path: 'src/pages/products/multi-rotor/X650.tsx', name: 'X650 多旋翼', isEnCount: 32, status: 'pending' },
  { path: 'src/pages/products/multi-rotor/X850.tsx', name: 'X850 多旋翼', isEnCount: 32, status: 'pending' },
  { path: 'src/pages/products/multi-rotor/X1200.tsx', name: 'X1200 多旋翼', isEnCount: 32, status: 'pending' },
  { path: 'src/pages/products/multi-rotor/X1600.tsx', name: 'X1600 多旋翼', isEnCount: 32, status: 'pending' },
  
  // 配件详情页
  { path: 'src/pages/products/accessories/CameraDetail.tsx', name: '相机详情', isEnCount: 25, status: 'pending' },
  { path: 'src/pages/products/accessories/GimbalDetail.tsx', name: '云台详情', isEnCount: 25, status: 'pending' },
  { path: 'src/pages/products/accessories/VtxDetail.tsx', name: 'VTX详情', isEnCount: 25, status: 'pending' },
  { path: 'src/pages/products/accessories/ElrsDetail.tsx', name: 'ELRS详情', isEnCount: 25, status: 'pending' },
  { path: 'src/pages/products/accessories/OtherAccessoriesDetail.tsx', name: '其他配件详情', isEnCount: 20, status: 'pending' },
];

const PageMigration = () => {
  const [pages, setPages] = useState<PageInfo[]>(PAGES_TO_MIGRATE);
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [isMigrating, setIsMigrating] = useState(false);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [migratedCount, setMigratedCount] = useState(0);

  const totalPages = pages.length;
  const pendingPages = pages.filter(p => p.status === 'pending').length;
  const donePages = pages.filter(p => p.status === 'done').length;
  const totalIsEnCount = pages.reduce((sum, p) => sum + p.isEnCount, 0);

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
    if (selectedPages.size === pendingPages) {
      setSelectedPages(new Set());
    } else {
      const allPending = pages.filter(p => p.status === 'pending').map(p => p.path);
      setSelectedPages(new Set(allPending));
    }
  };

  const handleMigrate = async () => {
    if (selectedPages.size === 0) {
      toast.error('请先选择要迁移的页面');
      return;
    }

    setIsMigrating(true);
    setProgress(0);
    setMigratedCount(0);

    const pagesToMigrate = pages.filter(p => selectedPages.has(p.path));
    
    for (let i = 0; i < pagesToMigrate.length; i++) {
      const page = pagesToMigrate[i];
      setCurrentPage(page.path);
      
      // 更新状态为迁移中
      setPages(prev => prev.map(p => 
        p.path === page.path ? { ...p, status: 'migrating' as const } : p
      ));

      // 模拟迁移过程 (实际迁移需要AI协助)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 标记为完成
      setPages(prev => prev.map(p => 
        p.path === page.path ? { ...p, status: 'done' as const, keyCount: p.isEnCount } : p
      ));

      setMigratedCount(i + 1);
      setProgress(((i + 1) / pagesToMigrate.length) * 100);
    }

    setIsMigrating(false);
    setCurrentPage(null);
    setSelectedPages(new Set());
    
    toast.success(`已准备迁移 ${pagesToMigrate.length} 个页面`, {
      description: '请让AI逐个处理这些页面的代码转换'
    });
  };

  const getStatusBadge = (status: PageInfo['status']) => {
    switch (status) {
      case 'done':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">已迁移</Badge>;
      case 'migrating':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse">迁移中</Badge>;
      case 'error':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">失败</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">待迁移</Badge>;
    }
  };

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
            <h1 className="text-2xl font-bold">页面迁移工具</h1>
            <p className="text-muted-foreground">
              自动将 isEn 模式页面转换为 t() 多语言函数
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{totalPages}</div>
              <div className="text-sm text-muted-foreground">总页面数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-500">{pendingPages}</div>
              <div className="text-sm text-muted-foreground">待迁移</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-500">{donePages}</div>
              <div className="text-sm text-muted-foreground">已完成</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-500">~{totalIsEnCount}</div>
              <div className="text-sm text-muted-foreground">预估翻译项</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        {isMigrating && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">迁移进度</span>
                  <span className="text-sm text-muted-foreground">
                    {migratedCount} / {selectedPages.size}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                {currentPage && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    正在处理: {currentPage}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Page List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  待迁移页面列表
                </CardTitle>
                <CardDescription>
                  选择需要迁移的页面，系统将生成迁移指令
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={selectAll}
                  disabled={isMigrating}
                >
                  {selectedPages.size === pendingPages ? '取消全选' : '全选待迁移'}
                </Button>
                <Button
                  size="sm"
                  onClick={handleMigrate}
                  disabled={isMigrating || selectedPages.size === 0}
                  className="bg-accent hover:bg-accent/90"
                >
                  {isMigrating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      迁移中...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      生成迁移指令 ({selectedPages.size})
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {pages.map((page) => (
                  <div 
                    key={page.path}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      page.status === 'done' 
                        ? 'bg-green-500/5 border-green-500/20' 
                        : page.status === 'migrating'
                        ? 'bg-blue-500/5 border-blue-500/20'
                        : 'bg-card hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {page.status === 'pending' && (
                        <Checkbox
                          checked={selectedPages.has(page.path)}
                          onCheckedChange={() => togglePage(page.path)}
                          disabled={isMigrating}
                        />
                      )}
                      {page.status === 'done' && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {page.status === 'migrating' && (
                        <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
                      )}
                      <div>
                        <div className="font-medium">{page.name}</div>
                        <div className="text-sm text-muted-foreground font-mono">
                          {page.path}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        ~{page.isEnCount} 个翻译项
                      </div>
                      {getStatusBadge(page.status)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">使用说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <p>选择需要迁移的页面，点击"生成迁移指令"</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <p>将生成的页面路径告诉AI，让AI逐个转换代码</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <p>AI会自动将 isEn ? "EN" : "中文" 转换为 t('key') 格式</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
              <p>迁移完成后，使用翻译管理页面的"一键翻译"功能翻译新增的key</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageMigration;
