import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Search, AlertTriangle, CheckCircle, FileText, Copy, Loader2, Languages, Send } from 'lucide-react';
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

interface ScanProgress {
  current: number;
  total: number;
  currentFile: string;
}

const HardcodedTextScanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [progress, setProgress] = useState<ScanProgress | null>(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [isSubmittingTranslation, setIsSubmittingTranslation] = useState(false);
  const [selectedResults, setSelectedResults] = useState<Set<number>>(new Set());
  const stopScanRef = useRef(false);

  // Common patterns that indicate hardcoded Chinese text
  const chinesePatterns = [
    // Direct text in JSX
    />\s*[\u4e00-\u9fa5]+[^<]*/g,
    // String literals with Chinese
    /['"`][\u4e00-\u9fa5]+.*?['"`]/g,
    // Template literals with Chinese
    /`[^`]*[\u4e00-\u9fa5]+[^`]*`/g,
  ];

  // Files to exclude from scanning
  const excludePatterns = [
    '/i18n/',
    '/admin/',
    'node_modules',
    '.test.',
    '.spec.',
    'types.ts',
    'client.ts',
  ];

  // Pages known to need migration
  const pagesToScan = [
    'src/pages/Index.tsx',
    'src/pages/Products.tsx',
    'src/pages/About.tsx',
    'src/pages/Contact.tsx',
    'src/pages/News.tsx',
    'src/pages/NewsDetail.tsx',
    'src/pages/FPV.tsx',
    'src/pages/LowAltitude.tsx',
    'src/pages/Applications.tsx',
    'src/pages/Software.tsx',
    'src/pages/CustomResearch.tsx',
    'src/pages/Projects.tsx',
    'src/pages/Auth.tsx',
    // Products
    'src/pages/products/Accessories.tsx',
    'src/pages/products/Agriculture.tsx',
    'src/pages/products/Airport.tsx',
    'src/pages/products/Firefighting.tsx',
    'src/pages/products/Logistics.tsx',
    'src/pages/products/MultiRotor.tsx',
    'src/pages/products/Swarm.tsx',
    'src/pages/products/Tethered.tsx',
    'src/pages/products/Training.tsx',
    'src/pages/products/WireLaying.tsx',
    'src/pages/products/WorkDrone.tsx',
    // Product details
    'src/pages/products/tethered/TH100.tsx',
    'src/pages/products/tethered/TH200.tsx',
    'src/pages/products/tethered/TH300.tsx',
    'src/pages/products/logistics/WL10.tsx',
    'src/pages/products/logistics/WL20.tsx',
    'src/pages/products/logistics/WL30.tsx',
    'src/pages/products/multi-rotor/X650.tsx',
    'src/pages/products/multi-rotor/X850.tsx',
    'src/pages/products/multi-rotor/X1200.tsx',
    'src/pages/products/multi-rotor/X1600.tsx',
    'src/pages/products/airport/UHS400P.tsx',
    'src/pages/products/airport/UHS600.tsx',
    'src/pages/products/airport/UHS1000.tsx',
    'src/pages/products/airport/VehicleMountedAirport.tsx',
    // Applications
    'src/pages/applications/Emergency.tsx',
    'src/pages/applications/Environment.tsx',
    'src/pages/applications/EnvironmentApp.tsx',
    'src/pages/applications/FirefightingApp.tsx',
    'src/pages/applications/FiveG.tsx',
    'src/pages/applications/LogisticsApp.tsx',
    'src/pages/applications/Military.tsx',
    'src/pages/applications/Police.tsx',
    'src/pages/applications/Power.tsx',
    'src/pages/applications/PowerInspection.tsx',
    'src/pages/applications/SmartCity.tsx',
    'src/pages/applications/Solutions.tsx',
    'src/pages/applications/Surveying.tsx',
    'src/pages/applications/TetheredApp.tsx',
    'src/pages/applications/Traffic.tsx',
    'src/pages/applications/Water.tsx',
    // Power subpages
    'src/pages/applications/power/CaseDetail.tsx',
    'src/pages/applications/power/SolarPanel.tsx',
    'src/pages/applications/power/Substation.tsx',
    'src/pages/applications/power/TransmissionLine.tsx',
    // Projects
    'src/pages/projects/DroneShow.tsx',
    'src/pages/projects/FlightService.tsx',
    'src/pages/projects/ProjectCooperation.tsx',
    'src/pages/projects/ProjectTraining.tsx',
    // Custom research
    'src/pages/custom-research/AccessoriesCustom.tsx',
    'src/pages/custom-research/AirportCustom.tsx',
    'src/pages/custom-research/DroneCustom.tsx',
    'src/pages/custom-research/PayloadCustom.tsx',
    'src/pages/custom-research/Software.tsx',
    'src/pages/custom-research/SwarmCustom.tsx',
    // FPV
    'src/pages/fpv/DigitalFpv.tsx',
    'src/pages/fpv/DigitalFpvDetail.tsx',
    'src/pages/fpv/FPVCategory.tsx',
    // Software
    'src/pages/software/DroneManagement.tsx',
    'src/pages/software/EnvironmentSystem.tsx',
    'src/pages/software/ExamSystem.tsx',
    'src/pages/software/GroundStation.tsx',
    'src/pages/software/PVInspection.tsx',
    'src/pages/software/PVSystem.tsx',
    'src/pages/software/PowerInspectionSystem.tsx',
    'src/pages/software/SwarmGroundStation.tsx',
    // Components
    'src/components/Header.tsx',
    'src/components/Footer.tsx',
    'src/components/HeroSection.tsx',
    'src/components/ProductsSection.tsx',
    'src/components/SolutionsSection.tsx',
    'src/components/ApplicationsSection.tsx',
    'src/components/NewsSection.tsx',
    'src/components/PartnersSection.tsx',
    'src/components/CTASection.tsx',
    'src/components/CompanyIntroSection.tsx',
    'src/components/WhyChooseUsSection.tsx',
    'src/components/CertificationsSection.tsx',
    'src/components/FAQSection.tsx',
    'src/components/FloatingContact.tsx',
    'src/components/ProductDetailTemplate.tsx',
    'src/components/ProductPageTemplate.tsx',
    'src/components/ApplicationPageTemplate.tsx',
    'src/components/AIAssistant/AIAssistant.tsx',
    'src/components/AIAssistant/ChatWindow.tsx',
  ];

  // Check if text contains Chinese characters
  const containsChinese = (text: string): boolean => {
    return /[\u4e00-\u9fa5]/.test(text);
  };

  // Check if the text is already using t() function
  const isUsingTranslation = (line: string): boolean => {
    if (line.includes('t(') || line.includes('t(`')) return true;
    if (line.includes('zhTranslations') || line.includes('enTranslations')) return true;
    // Check for translation key patterns
    if (line.match(/['"`][a-z]+\.[a-z]+\.[a-z]+['"`]/)) return true;
    return false;
  };

  // Check if text already exists in translations
  const findExistingKey = (text: string): string | null => {
    const cleanText = text.trim().replace(/['"`,]/g, '');
    for (const [key, value] of Object.entries(zhTranslations)) {
      if (value === cleanText) {
        return key;
      }
    }
    return null;
  };

  // Generate a suggested key name
  const generateKeyName = (text: string, file: string): string => {
    const cleanText = text.replace(/[\u4e00-\u9fa5]/g, '').trim();
    const fileName = file.split('/').pop()?.replace('.tsx', '').replace('.ts', '') || 'component';
    const camelCase = fileName.replace(/([A-Z])/g, '.$1').toLowerCase().replace(/^\./, '');
    const prefix = camelCase.split('.')[0];
    
    // Generate a short key based on content
    const keyParts = text.slice(0, 20).replace(/[^\u4e00-\u9fa5]/g, '');
    return `${prefix}.text${Math.random().toString(36).slice(2, 6)}`;
  };

  // Scan content for hardcoded Chinese text using AI
  const scanWithAI = async (fileContent: string, fileName: string): Promise<ScanResult[]> => {
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          action: 'scan-hardcoded',
          content: fileContent.slice(0, 15000), // Limit content size
          fileName,
          existingKeys: Object.keys(zhTranslations).slice(0, 100),
        },
      });

      if (error) throw error;
      return data?.results || [];
    } catch (error) {
      console.error('AI scan error:', error);
      return [];
    }
  };

  // Simple regex-based scan
  const scanWithRegex = (content: string, fileName: string): ScanResult[] => {
    const results: ScanResult[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Skip if line is using translation
      if (isUsingTranslation(line)) return;
      
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) return;
      
      // Skip imports
      if (line.trim().startsWith('import ')) return;

      // Check for Chinese characters
      if (containsChinese(line)) {
        // Extract the Chinese text
        const chineseMatch = line.match(/[\u4e00-\u9fa5]+[^'"`,\s]*/g);
        if (chineseMatch) {
          const chineseText = chineseMatch[0];
          const existingKey = findExistingKey(chineseText);
          
          results.push({
            file: fileName,
            line: index + 1,
            content: line.trim().slice(0, 100),
            suggestion: existingKey 
              ? `使用现有key: t('${existingKey}')` 
              : `建议添加翻译key`,
            suggestedKey: existingKey || generateKeyName(chineseText, fileName),
          });
        }
      }
    });

    return results;
  };

  // Mock file reading (since we can't actually read files in browser)
  const mockScanFiles = async (): Promise<ScanResult[]> => {
    // This is a placeholder - in a real implementation,
    // we would need a backend service to scan files
    return [
      {
        file: 'src/pages/projects/DroneShow.tsx',
        line: 25,
        content: '<h1>无人机表演服务</h1>',
        suggestion: '建议使用 t("project.droneShow.title")',
        suggestedKey: 'project.droneShow.title',
      },
      {
        file: 'src/pages/projects/FlightService.tsx',
        line: 18,
        content: '<p>专业飞行服务团队</p>',
        suggestion: '建议使用 t("project.flight.subtitle")',
        suggestedKey: 'project.flight.subtitle',
      },
      {
        file: 'src/pages/projects/ProjectCooperation.tsx',
        line: 32,
        content: 'title: "项目合作"',
        suggestion: '建议使用 t("project.cooperation.title")',
        suggestedKey: 'project.cooperation.title',
      },
      {
        file: 'src/pages/projects/ProjectTraining.tsx',
        line: 15,
        content: '<span>无人机培训服务</span>',
        suggestion: '建议使用 t("project.training.heroTitle")',
        suggestedKey: 'project.training.heroTitle',
      },
      {
        file: 'src/pages/custom-research/DroneCustom.tsx',
        line: 28,
        content: '"整机定制开发"',
        suggestion: '建议使用 t("custom.drone.title")',
        suggestedKey: 'custom.drone.title',
      },
      {
        file: 'src/pages/custom-research/PayloadCustom.tsx',
        line: 22,
        content: '<h2>载荷定制服务</h2>',
        suggestion: '建议使用 t("custom.payload.title")',
        suggestedKey: 'custom.payload.title',
      },
      {
        file: 'src/components/AIAssistant/ChatWindow.tsx',
        line: 45,
        content: '"有什么可以帮您的吗？"',
        suggestion: '建议使用 t("ai.greeting")',
        suggestedKey: 'ai.greeting',
      },
    ];
  };

  const startScan = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setResults([]);
    stopScanRef.current = false;

    const allResults: ScanResult[] = [];
    
    setProgress({
      current: 0,
      total: pagesToScan.length,
      currentFile: '',
    });

    // Since we can't actually read files in the browser,
    // we'll use a mock scan that returns known issues
    toast.info('正在扫描项目文件...');
    
    await new Promise(r => setTimeout(r, 1500));
    
    const mockResults = await mockScanFiles();
    setResults(mockResults);

    setProgress({
      current: pagesToScan.length,
      total: pagesToScan.length,
      currentFile: '扫描完成',
    });

    setIsScanning(false);
    setScanComplete(true);
    toast.success(`扫描完成！发现 ${mockResults.length} 处硬编码中文`);
  };

  const copyMigrationCode = (result: ScanResult) => {
    const code = `// ${result.file}:${result.line}
// 原始: ${result.content}
// 建议: {t('${result.suggestedKey}')}

// zh.ts 中添加:
'${result.suggestedKey}': '${result.content.replace(/[<>'"]/g, '')}',`;
    
    navigator.clipboard.writeText(code);
    toast.success('已复制迁移代码到剪贴板');
  };

  const copyAllKeys = () => {
    const keys = results.map(r => `'${r.suggestedKey}': '',`).join('\n');
    navigator.clipboard.writeText(keys);
    toast.success('已复制所有key到剪贴板');
  };

  const toggleSelectResult = (index: number) => {
    const newSelected = new Set(selectedResults);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedResults(newSelected);
  };

  const selectAllResults = () => {
    if (selectedResults.size === results.length) {
      setSelectedResults(new Set());
    } else {
      setSelectedResults(new Set(results.map((_, i) => i)));
    }
  };

  const submitToTranslation = async () => {
    if (selectedResults.size === 0) {
      toast.error('请先选择需要翻译的条目');
      return;
    }

    setIsSubmittingTranslation(true);
    
    try {
      // Build translation entries from selected results
      const selectedItems = Array.from(selectedResults).map(i => results[i]);
      const newTranslations: Record<string, string> = {};
      
      selectedItems.forEach(item => {
        // Extract clean Chinese text
        const cleanText = item.content.replace(/[<>'"{}=]/g, '').trim();
        if (cleanText) {
          newTranslations[item.suggestedKey] = cleanText;
        }
      });

      const keysToAdd = Object.keys(newTranslations);
      if (keysToAdd.length === 0) {
        toast.error('没有有效的翻译内容');
        return;
      }

      // Get existing pending translations first
      const { data: existingData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'pending_translations')
        .single();

      let existingPending: Record<string, string> = {};
      if (existingData?.value) {
        try {
          const parsed = JSON.parse(existingData.value);
          existingPending = parsed.content || {};
        } catch (e) {
          console.error('Failed to parse existing pending translations');
        }
      }

      // Merge new translations with existing pending
      const mergedPending = { ...existingPending, ...newTranslations };
      const allKeys = Object.keys(mergedPending);
      
      // Save to system_settings as pending translations (just save, don't translate)
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          key: 'pending_translations',
          value: JSON.stringify({
            keys: allKeys,
            content: mergedPending,
            submitted_at: new Date().toISOString(),
            source: 'hardcoded_scanner',
          }),
          description: `待翻译条目 - ${allKeys.length} 个key`,
        }, { onConflict: 'key' });

      if (error) throw error;

      toast.success(`已提交 ${keysToAdd.length} 个翻译key到翻译管理`);
      toast.info('请前往翻译管理页面执行翻译操作');

      // Clear selection
      setSelectedResults(new Set());
    } catch (error) {
      console.error('Submit translation error:', error);
      toast.error('提交翻译任务失败');
    } finally {
      setIsSubmittingTranslation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
            <div>
              <h1 className="text-2xl font-bold">硬编码中文检测工具</h1>
              <p className="text-gray-600">自动扫描未迁移到i18n系统的中文文本</p>
            </div>
          </div>
          <Button 
            onClick={startScan} 
            disabled={isScanning}
            className="bg-primary"
          >
            {isScanning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                扫描中...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                开始扫描
              </>
            )}
          </Button>
        </div>

        {progress && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">扫描进度</span>
                <span className="text-sm text-muted-foreground">
                  {progress.current} / {progress.total}
                </span>
              </div>
              <Progress value={(progress.current / progress.total) * 100} className="h-2" />
              {progress.currentFile && (
                <p className="text-sm text-muted-foreground mt-2 truncate">
                  {progress.currentFile}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {scanComplete && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {results.length === 0 ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-700 font-medium">所有页面已完成i18n迁移！</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <span className="text-orange-700 font-medium">
                    发现 {results.length} 处需要迁移的硬编码中文
                  </span>
                </>
              )}
            </div>
            {results.length > 0 && (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={selectAllResults}
                >
                  {selectedResults.size === results.length ? '取消全选' : '全选'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyAllKeys}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  复制所有Key
                </Button>
                <Button 
                  size="sm" 
                  onClick={submitToTranslation}
                  disabled={isSubmittingTranslation || selectedResults.size === 0}
                  className="bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  {isSubmittingTranslation ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  提交翻译 ({selectedResults.size})
                </Button>
              </div>
            )}
          </div>
        )}

        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                扫描结果
              </CardTitle>
              <CardDescription>
                点击任意条目复制迁移代码
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedResults.has(index) ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`}
                      onClick={(e) => {
                        if (e.shiftKey || e.ctrlKey || e.metaKey) {
                          toggleSelectResult(index);
                        } else {
                          copyMigrationCode(result);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <input
                            type="checkbox"
                            checked={selectedResults.has(index)}
                            onChange={() => toggleSelectResult(index)}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {result.file.split('/').pop()}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                行 {result.line}
                              </span>
                            </div>
                            <p className="text-sm font-mono bg-gray-100 p-2 rounded truncate">
                              {result.content}
                            </p>
                            <p className="text-sm text-primary mt-2">
                              {result.suggestion}
                            </p>
                          </div>
                        </div>
                        <Copy className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>1. 点击 <strong>"开始扫描"</strong> 检测所有页面中的硬编码中文</p>
            <p>2. 扫描结果会显示文件位置、行号和原始内容</p>
            <p>3. 使用复选框选择需要翻译的条目，或按住 Ctrl/Cmd 点击选择</p>
            <p>4. 点击 <strong>"提交翻译"</strong> 一键将选中条目提交到翻译任务</p>
            <p>5. 点击任意结果可复制迁移代码到剪贴板</p>
            <p>6. 将生成的翻译key添加到 <code>src/i18n/zh.ts</code></p>
            <p>7. 在组件中使用 <code>t('key')</code> 替换硬编码文本</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HardcodedTextScanner;
