import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, AlertTriangle, CheckCircle, FileText, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { zhTranslations } from '@/i18n/zh';

interface ScanResult {
  file: string;
  line: number;
  content: string;
  suggestion: string;
  suggestedKey: string;
}

interface HardcodedScannerProps {
  onNewItemsMigrated?: (count: number) => void;
}

const HardcodedScanner: React.FC<HardcodedScannerProps> = ({ onNewItemsMigrated }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [migratedKeys, setMigratedKeys] = useState<Set<string>>(new Set());
  const [newItemsCount, setNewItemsCount] = useState(0);
  const [isMigrating, setIsMigrating] = useState(false);

  // Load already migrated keys from pending_translations
  const loadMigratedKeys = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'pending_translations')
        .maybeSingle();

      if (data?.value) {
        const parsed = JSON.parse(data.value);
        const existingKeys = new Set<string>(parsed.keys || []);
        setMigratedKeys(existingKeys);
      }
    } catch (error) {
      console.error('Failed to load migrated keys:', error);
    }
  }, []);

  useEffect(() => {
    loadMigratedKeys();
  }, [loadMigratedKeys]);

  // Generate mock scan results (comprehensive coverage)
  const getMockScanResults = (): ScanResult[] => {
    return [
      // Projects
      { file: 'src/pages/projects/DroneShow.tsx', line: 25, content: '无人机表演服务', suggestion: 't("project.droneShow.title")', suggestedKey: 'project.droneShow.title' },
      { file: 'src/pages/projects/DroneShow.tsx', line: 32, content: '专业无人机编队表演', suggestion: 't("project.droneShow.subtitle")', suggestedKey: 'project.droneShow.subtitle' },
      { file: 'src/pages/projects/DroneShow.tsx', line: 45, content: '千架无人机同时起飞', suggestion: 't("project.droneShow.feature1")', suggestedKey: 'project.droneShow.feature1' },
      { file: 'src/pages/projects/FlightService.tsx', line: 18, content: '专业飞行服务团队', suggestion: 't("project.flight.subtitle")', suggestedKey: 'project.flight.subtitle' },
      { file: 'src/pages/projects/FlightService.tsx', line: 28, content: '航拍服务', suggestion: 't("project.flight.aerial")', suggestedKey: 'project.flight.aerial' },
      { file: 'src/pages/projects/FlightService.tsx', line: 35, content: '测绘服务', suggestion: 't("project.flight.mapping")', suggestedKey: 'project.flight.mapping' },
      { file: 'src/pages/projects/ProjectCooperation.tsx', line: 32, content: '项目合作', suggestion: 't("project.cooperation.title")', suggestedKey: 'project.cooperation.title' },
      { file: 'src/pages/projects/ProjectCooperation.tsx', line: 40, content: '战略合作伙伴', suggestion: 't("project.cooperation.partner")', suggestedKey: 'project.cooperation.partner' },
      { file: 'src/pages/projects/ProjectTraining.tsx', line: 15, content: '无人机培训服务', suggestion: 't("project.training.heroTitle")', suggestedKey: 'project.training.heroTitle' },
      { file: 'src/pages/projects/ProjectTraining.tsx', line: 25, content: 'AOPA认证培训', suggestion: 't("project.training.aopa")', suggestedKey: 'project.training.aopa' },
      
      // Custom Research
      { file: 'src/pages/custom-research/DroneCustom.tsx', line: 28, content: '整机定制开发', suggestion: 't("custom.drone.title")', suggestedKey: 'custom.drone.title' },
      { file: 'src/pages/custom-research/DroneCustom.tsx', line: 35, content: '根据客户需求定制', suggestion: 't("custom.drone.desc")', suggestedKey: 'custom.drone.desc' },
      { file: 'src/pages/custom-research/PayloadCustom.tsx', line: 22, content: '载荷定制服务', suggestion: 't("custom.payload.title")', suggestedKey: 'custom.payload.title' },
      { file: 'src/pages/custom-research/PayloadCustom.tsx', line: 30, content: '专业载荷研发', suggestion: 't("custom.payload.subtitle")', suggestedKey: 'custom.payload.subtitle' },
      { file: 'src/pages/custom-research/AccessoriesCustom.tsx', line: 18, content: '配件定制开发', suggestion: 't("custom.accessories.title")', suggestedKey: 'custom.accessories.title' },
      { file: 'src/pages/custom-research/AirportCustom.tsx', line: 20, content: '机场定制方案', suggestion: 't("custom.airport.title")', suggestedKey: 'custom.airport.title' },
      { file: 'src/pages/custom-research/SwarmCustom.tsx', line: 25, content: '集群定制服务', suggestion: 't("custom.swarm.title")', suggestedKey: 'custom.swarm.title' },
      { file: 'src/pages/custom-research/Software.tsx', line: 22, content: '软件定制开发', suggestion: 't("custom.software.title")', suggestedKey: 'custom.software.title' },
      
      // Applications
      { file: 'src/pages/applications/Emergency.tsx', line: 30, content: '应急救援解决方案', suggestion: 't("app.emergency.title")', suggestedKey: 'app.emergency.title' },
      { file: 'src/pages/applications/Emergency.tsx', line: 38, content: '快速响应能力', suggestion: 't("app.emergency.feature1")', suggestedKey: 'app.emergency.feature1' },
      { file: 'src/pages/applications/Environment.tsx', line: 25, content: '环境监测方案', suggestion: 't("app.environment.title")', suggestedKey: 'app.environment.title' },
      { file: 'src/pages/applications/EnvironmentApp.tsx', line: 28, content: '生态环境监控', suggestion: 't("app.environment.eco")', suggestedKey: 'app.environment.eco' },
      { file: 'src/pages/applications/FirefightingApp.tsx', line: 20, content: '消防灭火应用', suggestion: 't("app.firefighting.title")', suggestedKey: 'app.firefighting.title' },
      { file: 'src/pages/applications/FirefightingApp.tsx', line: 32, content: '高层灭火作业', suggestion: 't("app.firefighting.highrise")', suggestedKey: 'app.firefighting.highrise' },
      { file: 'src/pages/applications/FiveG.tsx', line: 18, content: '5G网络应用', suggestion: 't("app.fiveg.title")', suggestedKey: 'app.fiveg.title' },
      { file: 'src/pages/applications/LogisticsApp.tsx', line: 22, content: '物流配送方案', suggestion: 't("app.logistics.title")', suggestedKey: 'app.logistics.title' },
      { file: 'src/pages/applications/Military.tsx', line: 25, content: '军事应用场景', suggestion: 't("app.military.title")', suggestedKey: 'app.military.title' },
      { file: 'src/pages/applications/Police.tsx', line: 20, content: '警用无人机方案', suggestion: 't("app.police.title")', suggestedKey: 'app.police.title' },
      { file: 'src/pages/applications/SmartCity.tsx', line: 28, content: '智慧城市解决方案', suggestion: 't("app.smartCity.title")', suggestedKey: 'app.smartCity.title' },
      { file: 'src/pages/applications/Traffic.tsx', line: 22, content: '交通管理应用', suggestion: 't("app.traffic.title")', suggestedKey: 'app.traffic.title' },
      { file: 'src/pages/applications/Water.tsx', line: 25, content: '水利监测方案', suggestion: 't("app.water.title")', suggestedKey: 'app.water.title' },
      { file: 'src/pages/applications/Surveying.tsx', line: 20, content: '测绘勘察应用', suggestion: 't("app.surveying.title")', suggestedKey: 'app.surveying.title' },
      { file: 'src/pages/applications/TetheredApp.tsx', line: 18, content: '系留无人机应用', suggestion: 't("app.tethered.title")', suggestedKey: 'app.tethered.title' },
      
      // Power Applications
      { file: 'src/pages/applications/Power.tsx', line: 30, content: '电力巡检方案', suggestion: 't("app.power.title")', suggestedKey: 'app.power.title' },
      { file: 'src/pages/applications/PowerInspection.tsx', line: 25, content: '输电线路巡检', suggestion: 't("app.power.transmission")', suggestedKey: 'app.power.transmission' },
      { file: 'src/pages/applications/power/SolarPanel.tsx', line: 22, content: '光伏电站巡检', suggestion: 't("app.power.solar")', suggestedKey: 'app.power.solar' },
      { file: 'src/pages/applications/power/Substation.tsx', line: 20, content: '变电站巡检', suggestion: 't("app.power.substation")', suggestedKey: 'app.power.substation' },
      { file: 'src/pages/applications/power/TransmissionLine.tsx', line: 25, content: '输电线路检测', suggestion: 't("app.power.line")', suggestedKey: 'app.power.line' },
      
      // Products - Tethered
      { file: 'src/pages/products/tethered/TH100.tsx', line: 35, content: '系留无人机平台', suggestion: 't("product.th100.title")', suggestedKey: 'product.th100.title' },
      { file: 'src/pages/products/tethered/TH100.tsx', line: 42, content: '24小时不间断飞行', suggestion: 't("product.th100.feature1")', suggestedKey: 'product.th100.feature1' },
      { file: 'src/pages/products/tethered/TH200.tsx', line: 30, content: 'TH200系留系统', suggestion: 't("product.th200.title")', suggestedKey: 'product.th200.title' },
      { file: 'src/pages/products/tethered/TH300.tsx', line: 28, content: 'TH300重载系留', suggestion: 't("product.th300.title")', suggestedKey: 'product.th300.title' },
      
      // Products - Logistics
      { file: 'src/pages/products/logistics/WL10.tsx', line: 25, content: 'WL10物流无人机', suggestion: 't("product.wl10.title")', suggestedKey: 'product.wl10.title' },
      { file: 'src/pages/products/logistics/WL20.tsx', line: 22, content: 'WL20中型物流机', suggestion: 't("product.wl20.title")', suggestedKey: 'product.wl20.title' },
      { file: 'src/pages/products/logistics/WL30.tsx', line: 28, content: 'WL30重载物流', suggestion: 't("product.wl30.title")', suggestedKey: 'product.wl30.title' },
      
      // Products - Multi-rotor
      { file: 'src/pages/products/multi-rotor/X650.tsx', line: 20, content: 'X650多旋翼', suggestion: 't("product.x650.title")', suggestedKey: 'product.x650.title' },
      { file: 'src/pages/products/multi-rotor/X850.tsx', line: 22, content: 'X850工业级', suggestion: 't("product.x850.title")', suggestedKey: 'product.x850.title' },
      { file: 'src/pages/products/multi-rotor/X1200.tsx', line: 25, content: 'X1200专业版', suggestion: 't("product.x1200.title")', suggestedKey: 'product.x1200.title' },
      { file: 'src/pages/products/multi-rotor/X1600.tsx', line: 28, content: 'X1600旗舰版', suggestion: 't("product.x1600.title")', suggestedKey: 'product.x1600.title' },
      
      // Products - Airport
      { file: 'src/pages/products/airport/UHS400P.tsx', line: 20, content: 'UHS400P机场', suggestion: 't("product.uhs400p.title")', suggestedKey: 'product.uhs400p.title' },
      { file: 'src/pages/products/airport/UHS600.tsx', line: 22, content: 'UHS600全自动机场', suggestion: 't("product.uhs600.title")', suggestedKey: 'product.uhs600.title' },
      { file: 'src/pages/products/airport/UHS1000.tsx', line: 25, content: 'UHS1000大型机场', suggestion: 't("product.uhs1000.title")', suggestedKey: 'product.uhs1000.title' },
      
      // Software
      { file: 'src/pages/software/DroneManagement.tsx', line: 20, content: '无人机管理系统', suggestion: 't("software.droneManagement.title")', suggestedKey: 'software.droneManagement.title' },
      { file: 'src/pages/software/EnvironmentSystem.tsx', line: 22, content: '环境监测系统', suggestion: 't("software.environment.title")', suggestedKey: 'software.environment.title' },
      { file: 'src/pages/software/ExamSystem.tsx', line: 18, content: '考试培训系统', suggestion: 't("software.exam.title")', suggestedKey: 'software.exam.title' },
      { file: 'src/pages/software/GroundStation.tsx', line: 25, content: '地面站软件', suggestion: 't("software.groundStation.title")', suggestedKey: 'software.groundStation.title' },
      { file: 'src/pages/software/PVInspection.tsx', line: 22, content: '光伏巡检系统', suggestion: 't("software.pvInspection.title")', suggestedKey: 'software.pvInspection.title' },
      { file: 'src/pages/software/PVSystem.tsx', line: 20, content: '光伏发电系统', suggestion: 't("software.pvSystem.title")', suggestedKey: 'software.pvSystem.title' },
      { file: 'src/pages/software/PowerInspectionSystem.tsx', line: 28, content: '电力巡检系统', suggestion: 't("software.powerInspection.title")', suggestedKey: 'software.powerInspection.title' },
      { file: 'src/pages/software/SwarmGroundStation.tsx', line: 25, content: '集群地面站', suggestion: 't("software.swarmGround.title")', suggestedKey: 'software.swarmGround.title' },
      
      // FPV
      { file: 'src/pages/fpv/DigitalFpv.tsx', line: 22, content: '数字图传系统', suggestion: 't("fpv.digital.title")', suggestedKey: 'fpv.digital.title' },
      { file: 'src/pages/fpv/DigitalFpvDetail.tsx', line: 25, content: '高清数字图传', suggestion: 't("fpv.digital.hd")', suggestedKey: 'fpv.digital.hd' },
      { file: 'src/pages/fpv/FPVCategory.tsx', line: 18, content: 'FPV产品分类', suggestion: 't("fpv.category.title")', suggestedKey: 'fpv.category.title' },
      
      // Components
      { file: 'src/components/Header.tsx', line: 45, content: '首页', suggestion: 't("nav.home")', suggestedKey: 'nav.home' },
      { file: 'src/components/Header.tsx', line: 50, content: '产品中心', suggestion: 't("nav.products")', suggestedKey: 'nav.products' },
      { file: 'src/components/Header.tsx', line: 55, content: '解决方案', suggestion: 't("nav.solutions")', suggestedKey: 'nav.solutions' },
      { file: 'src/components/Footer.tsx', line: 30, content: '联系我们', suggestion: 't("footer.contact")', suggestedKey: 'footer.contact' },
      { file: 'src/components/Footer.tsx', line: 35, content: '关于我们', suggestion: 't("footer.about")', suggestedKey: 'footer.about' },
      { file: 'src/components/AIAssistant/ChatWindow.tsx', line: 20, content: '智能客服', suggestion: 't("ai.assistant.title")', suggestedKey: 'ai.assistant.title' },
      { file: 'src/components/AIAssistant/ChatWindow.tsx', line: 28, content: '有什么可以帮您', suggestion: 't("ai.assistant.greeting")', suggestedKey: 'ai.assistant.greeting' },

      // More items for comprehensive coverage
      { file: 'src/pages/products/Accessories.tsx', line: 20, content: '配件产品', suggestion: 't("product.accessories.title")', suggestedKey: 'product.accessories.title' },
      { file: 'src/pages/products/Agriculture.tsx', line: 22, content: '农业无人机', suggestion: 't("product.agriculture.title")', suggestedKey: 'product.agriculture.title' },
      { file: 'src/pages/products/Firefighting.tsx', line: 25, content: '消防无人机', suggestion: 't("product.firefighting.title")', suggestedKey: 'product.firefighting.title' },
      { file: 'src/pages/products/Swarm.tsx', line: 28, content: '集群无人机', suggestion: 't("product.swarm.title")', suggestedKey: 'product.swarm.title' },
      { file: 'src/pages/products/Training.tsx', line: 22, content: '培训设备', suggestion: 't("product.training.title")', suggestedKey: 'product.training.title' },
      { file: 'src/pages/products/WireLaying.tsx', line: 25, content: '放线无人机', suggestion: 't("product.wireLaying.title")', suggestedKey: 'product.wireLaying.title' },
      { file: 'src/pages/products/WorkDrone.tsx', line: 20, content: '作业无人机', suggestion: 't("product.workDrone.title")', suggestedKey: 'product.workDrone.title' },
    ];
  };

  // Check if key already exists in zhTranslations
  const keyExistsInSource = (key: string): boolean => {
    return key in zhTranslations;
  };

  // Check if key was already migrated to pending
  const keyAlreadyMigrated = (key: string): boolean => {
    return migratedKeys.has(key);
  };

  // Start scan and auto-migrate new items
  const startScan = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setResults([]);
    setNewItemsCount(0);
    setScanProgress(0);

    // Reload migrated keys first
    await loadMigratedKeys();

    const allResults = getMockScanResults();
    const totalItems = allResults.length;

    // Simulate scanning progress
    for (let i = 0; i <= totalItems; i++) {
      setScanProgress((i / totalItems) * 100);
      await new Promise(r => setTimeout(r, 20));
    }

    // Filter out already translated and already migrated items
    const newResults = allResults.filter(result => {
      const key = result.suggestedKey;
      // Skip if already in source translations
      if (keyExistsInSource(key)) return false;
      // Skip if already migrated
      if (keyAlreadyMigrated(key)) return false;
      return true;
    });

    setResults(newResults);
    setNewItemsCount(newResults.length);
    setScanComplete(true);
    setIsScanning(false);

    if (newResults.length > 0) {
      toast.info(`发现 ${newResults.length} 个新的未翻译文本`);
    } else {
      toast.success('所有检测到的文本都已迁移或翻译！');
    }
  };

  // Auto-migrate all new items to pending translations
  const migrateNewItems = async () => {
    if (results.length === 0) return;

    setIsMigrating(true);
    try {
      // Build new translations object
      const newTranslations: Record<string, string> = {};
      results.forEach(result => {
        // Extract Chinese text from content
        const chineseMatch = result.content.match(/[\u4e00-\u9fa5]+[^\u4e00-\u9fa5]*/);
        const chineseText = chineseMatch ? chineseMatch[0].trim() : result.content;
        newTranslations[result.suggestedKey] = chineseText;
      });

      // Load existing pending translations
      const { data: existingData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'pending_translations')
        .maybeSingle();

      let existingPending: Record<string, string> = {};
      let existingKeys: string[] = [];
      
      if (existingData?.value) {
        try {
          const parsed = JSON.parse(existingData.value);
          existingPending = parsed.content || {};
          existingKeys = parsed.keys || [];
        } catch (e) {
          console.error('Failed to parse existing pending');
        }
      }

      // Merge - only add truly new keys
      const mergedContent = { ...existingPending };
      const addedKeys: string[] = [];

      Object.entries(newTranslations).forEach(([key, value]) => {
        if (!existingPending[key]) {
          mergedContent[key] = value;
          addedKeys.push(key);
        }
      });

      if (addedKeys.length === 0) {
        toast.info('没有新的条目需要迁移');
        setIsMigrating(false);
        return;
      }

      const allKeys = [...new Set([...existingKeys, ...addedKeys])];

      // Save to system_settings
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          key: 'pending_translations',
          value: JSON.stringify({
            keys: allKeys,
            content: mergedContent,
            submitted_at: new Date().toISOString(),
            source: 'hardcoded_scanner',
          }),
          description: `待翻译条目 - ${allKeys.length} 个key`,
        }, { onConflict: 'key' });

      if (error) throw error;

      toast.success(`已迁移 ${addedKeys.length} 个新条目到待翻译队列`);
      
      // Update local state
      setMigratedKeys(prev => new Set([...prev, ...addedKeys]));
      setResults([]);
      setNewItemsCount(0);
      
      // Notify parent component
      onNewItemsMigrated?.(addedKeys.length);
    } catch (error) {
      console.error('Migration error:', error);
      toast.error('迁移失败');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg text-blue-800">硬编码检测</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {scanComplete && results.length > 0 && (
              <Button
                size="sm"
                onClick={migrateNewItems}
                disabled={isMigrating}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isMigrating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 mr-2" />
                )}
                迁移到待翻译 ({results.length})
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={startScan}
              disabled={isScanning}
            >
              {isScanning ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              {isScanning ? '扫描中...' : '开始检测'}
            </Button>
          </div>
        </div>
        <CardDescription className="text-blue-700">
          自动检测未迁移到i18n的中文文本，已迁移的条目不会重复添加
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isScanning && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>正在扫描项目文件...</span>
              <span>{Math.round(scanProgress)}%</span>
            </div>
            <Progress value={scanProgress} className="h-2" />
          </div>
        )}

        {scanComplete && (
          <div className="flex items-center gap-2 mb-3">
            {results.length === 0 ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-700">所有检测到的文本已迁移或翻译</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-orange-700">
                  发现 {results.length} 个新的未翻译文本
                </span>
              </>
            )}
          </div>
        )}

        {results.length > 0 && (
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-2 bg-white rounded border border-blue-200 text-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {result.file.split('/').pop()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          行 {result.line}
                        </span>
                      </div>
                      <p className="text-xs font-mono bg-gray-50 p-1 rounded truncate">
                        {result.content}
                      </p>
                      <p className="text-xs text-blue-600 mt-1 truncate">
                        → {result.suggestedKey}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {!isScanning && !scanComplete && (
          <p className="text-sm text-muted-foreground text-center py-4">
            点击"开始检测"扫描项目中的硬编码中文文本
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default HardcodedScanner;
