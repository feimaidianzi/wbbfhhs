import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Globe, RefreshCw, Check, Loader2, Square, Play, Search, Zap, Eye, FileCode, Download, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { zhTranslations } from '@/i18n/zh';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/i18n/languages';

interface LanguageStatus {
  code: LanguageCode;
  name: string;
  translated: number;
  missing: number;
  total: number;
  isComplete: boolean;
}

interface DetectedText {
  text: string;
  location: string;
  suggestedKey?: string;
  inDictionary: boolean;
  selected?: boolean;
}

interface CodeScanResult {
  file: string;
  line: number;
  text: string;
  context: string;
  suggestedKey: string;
  selected?: boolean;
}

// Generate a valid translation key from Chinese text
const generateKey = (text: string, prefix: string = 'auto'): string => {
  // Use pinyin-like conversion for common words
  const keyMap: Record<string, string> = {
    '首页': 'home',
    '产品': 'product',
    '服务': 'service',
    '关于': 'about',
    '联系': 'contact',
    '新闻': 'news',
    '详情': 'detail',
    '更多': 'more',
    '查看': 'view',
    '下载': 'download',
    '提交': 'submit',
    '确认': 'confirm',
    '取消': 'cancel',
    '保存': 'save',
    '编辑': 'edit',
    '删除': 'delete',
    '添加': 'add',
    '搜索': 'search',
    '返回': 'back',
    '无人机': 'drone',
    '飞行': 'flight',
    '电池': 'battery',
    '遥控': 'remote',
    '图传': 'fpv',
    '云台': 'gimbal',
    '相机': 'camera',
    '巡检': 'inspection',
    '电力': 'power',
    '物流': 'logistics',
    '消防': 'firefighting',
    '环保': 'environment',
  };

  // Try to match known words
  for (const [cn, en] of Object.entries(keyMap)) {
    if (text.includes(cn)) {
      const suffix = Date.now().toString(36).slice(-4);
      return `${prefix}.${en}_${suffix}`;
    }
  }

  // Fallback: use hash
  const hash = text.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0).toString(36).slice(-6);
  return `${prefix}.text_${hash}`;
};

const AutoTranslation = () => {
  const navigate = useNavigate();
  const [isDetecting, setIsDetecting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isScanningPage, setIsScanningPage] = useState(false);
  const [isScanningCode, setIsScanningCode] = useState(false);
  const [languageStatuses, setLanguageStatuses] = useState<LanguageStatus[]>([]);
  const [currentLang, setCurrentLang] = useState('');
  const [overallProgress, setOverallProgress] = useState(0);
  const [detectedTexts, setDetectedTexts] = useState<DetectedText[]>([]);
  const [codeScanResults, setCodeScanResults] = useState<CodeScanResult[]>([]);
  const [activeTab, setActiveTab] = useState('translate');
  const [scanProgress, setScanProgress] = useState({ current: 0, total: 0, page: '' });
  const [generatedCode, setGeneratedCode] = useState('');
  const stopRef = useRef(false);

  const totalSourceKeys = Object.keys(zhTranslations).length;

  // Load current translation status for all languages
  const loadStatuses = useCallback(async () => {
    const statuses: LanguageStatus[] = [];
    
    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang.code === 'zh' || lang.code === 'en') {
        statuses.push({
          code: lang.code,
          name: lang.name,
          translated: totalSourceKeys,
          missing: 0,
          total: totalSourceKeys,
          isComplete: true,
        });
        continue;
      }

      try {
        const { data } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', `translations_${lang.code}`)
          .maybeSingle();

        if (data?.value) {
          const translations = JSON.parse(data.value);
          // Count only valid translations (no Chinese characters)
          const containsChinese = (str: string) => /[\u4e00-\u9fa5]/.test(str);
          let validCount = 0;
          for (const [key, value] of Object.entries(translations)) {
            if (value && !containsChinese(value as string)) {
              validCount++;
            }
          }
          statuses.push({
            code: lang.code,
            name: lang.name,
            translated: validCount,
            missing: Math.max(0, totalSourceKeys - validCount),
            total: totalSourceKeys,
            isComplete: validCount >= totalSourceKeys,
          });
        } else {
          statuses.push({
            code: lang.code,
            name: lang.name,
            translated: 0,
            missing: totalSourceKeys,
            total: totalSourceKeys,
            isComplete: false,
          });
        }
      } catch {
        statuses.push({
          code: lang.code,
          name: lang.name,
          translated: 0,
          missing: totalSourceKeys,
          total: totalSourceKeys,
          isComplete: false,
        });
      }
    }

    setLanguageStatuses(statuses);
  }, [totalSourceKeys]);

  useEffect(() => {
    loadStatuses();
  }, [loadStatuses]);

  // Detect missing translations using DeepSeek
  const detectMissing = async () => {
    setIsDetecting(true);
    toast.info('正在使用 DeepSeek 检测未翻译内容...');

    try {
      const { data, error } = await supabase.functions.invoke('auto-detect-translate', {
        body: {
          action: 'detect',
          sourceContent: zhTranslations,
        },
      });

      if (error) throw error;

      if (data?.success && data?.results) {
        setLanguageStatuses(prev => prev.map(status => {
          if (status.code === 'zh' || status.code === 'en') return status;
          
          const result = data.results[status.code];
          if (result) {
            return {
              ...status,
              missing: result.missing,
              translated: totalSourceKeys - result.missing,
              isComplete: result.missing === 0,
            };
          }
          return status;
        }));

        const totalMissing = Object.values(data.results as Record<string, { missing: number }>)
          .reduce((sum, r) => sum + r.missing, 0);
        
        if (totalMissing === 0) {
          toast.success('所有语言翻译已完成！');
        } else {
          toast.success(`检测完成：共发现 ${totalMissing} 处缺失翻译`);
        }
      }
    } catch (error) {
      console.error('Detection error:', error);
      toast.error('检测失败：' + (error instanceof Error ? error.message : '未知错误'));
    } finally {
      setIsDetecting(false);
    }
  };

  // Scan rendered page for Chinese text not in dictionary
  const scanPageContent = async () => {
    setIsScanningPage(true);
    toast.info('正在扫描网页中的中文内容...');

    try {
      const getAllTextNodes = (element: Element): string[] => {
        const texts: string[] = [];
        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              const parent = node.parentElement;
              if (!parent) return NodeFilter.FILTER_REJECT;
              const tag = parent.tagName.toLowerCase();
              if (['script', 'style', 'noscript', 'iframe'].includes(tag)) {
                return NodeFilter.FILTER_REJECT;
              }
              if (node.textContent?.trim()) {
                return NodeFilter.FILTER_ACCEPT;
              }
              return NodeFilter.FILTER_REJECT;
            }
          }
        );

        let node;
        while ((node = walker.nextNode())) {
          const text = node.textContent?.trim();
          if (text) texts.push(text);
        }
        return texts;
      };

      const containsChinese = (str: string): boolean => /[\u4e00-\u9fa5]/.test(str);
      const dictionaryValues = new Set(Object.values(zhTranslations));

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const pagesToScan = [
        '/', '/about', '/contact', '/news', '/products', '/applications',
        '/products/airport', '/products/tethered', '/products/logistics', 
        '/products/firefighting', '/products/wire-laying', '/products/multi-rotor',
        '/products/swarm', '/products/agriculture', '/products/training',
        '/products/work-drone', '/products/accessories',
        '/products/airport/vehicle-mounted', '/products/airport/uhs-1000',
        '/products/airport/uhs-600', '/products/airport/uhs-400p',
        '/products/tethered/th-100', '/products/tethered/th-200', '/products/tethered/th-300',
        '/products/logistics/wl-10', '/products/logistics/wl-20', '/products/logistics/wl-30',
        '/products/multi-rotor/x650', '/products/multi-rotor/x850',
        '/products/multi-rotor/x1200', '/products/multi-rotor/x1600',
        '/products/accessories/vtx-vrx', '/products/accessories/fc-esc',
        '/products/accessories/gimbal', '/products/accessories/camera',
        '/products/accessories/digital-fpv', '/products/accessories/elrs',
        '/products/accessories/others',
        '/applications/power-inspection', '/applications/logistics',
        '/applications/military', '/applications/environment',
        '/applications/firefighting', '/applications/tethered', '/applications/solutions',
        '/software', '/software/exam-system', '/software/pv-inspection',
        '/software/drone-management', '/software/power-inspection-system',
        '/projects', '/projects/training', '/projects/show',
        '/custom-research', '/custom-research/drone', '/custom-research/payload',
        '/fpv',
      ];
      
      const allDetected: DetectedText[] = [];
      setScanProgress({ current: 0, total: pagesToScan.length, page: '' });

      for (let i = 0; i < pagesToScan.length; i++) {
        const path = pagesToScan[i];
        setScanProgress({ current: i + 1, total: pagesToScan.length, page: path });
        
        try {
          const url = window.location.origin + path;
          
          await new Promise<void>((resolve) => {
            iframe.onload = () => resolve();
            iframe.onerror = () => resolve();
            iframe.src = url;
            setTimeout(() => resolve(), 1500);
          });

          if (iframe.contentDocument) {
            const texts = getAllTextNodes(iframe.contentDocument.body);
            
            for (const text of texts) {
              if (containsChinese(text) && text.length > 1 && text.length < 200) {
                const inDict = dictionaryValues.has(text);
                if (!inDict && !allDetected.some(d => d.text === text)) {
                  allDetected.push({
                    text,
                    location: path,
                    suggestedKey: generateKey(text, 'page'),
                    inDictionary: false,
                    selected: false,
                  });
                }
              }
            }
          }
        } catch (e) {
          console.warn(`Failed to scan ${path}:`, e);
        }
      }

      document.body.removeChild(iframe);
      setScanProgress({ current: 0, total: 0, page: '' });

      setDetectedTexts(allDetected);
      
      if (allDetected.length === 0) {
        toast.success('未发现遗漏的中文内容');
      } else {
        toast.warning(`发现 ${allDetected.length} 处中文内容未在翻译字典中`);
        setActiveTab('scan');
      }
    } catch (error) {
      console.error('Page scan error:', error);
      toast.error('扫描失败');
    } finally {
      setIsScanningPage(false);
    }
  };

  // Scan TSX code for hardcoded Chinese strings
  const scanCodeFiles = async () => {
    setIsScanningCode(true);
    toast.info('正在扫描代码文件中的硬编码中文...');

    try {
      const { data, error } = await supabase.functions.invoke('scan-code-chinese', {
        body: { action: 'scan' },
      });

      if (error) throw error;

      if (data?.success && data?.results) {
        const results: CodeScanResult[] = data.results.map((r: any) => ({
          ...r,
          suggestedKey: generateKey(r.text, 'code'),
          selected: false,
        }));
        setCodeScanResults(results);
        
        if (results.length === 0) {
          toast.success('未发现硬编码的中文字符串');
        } else {
          toast.warning(`发现 ${results.length} 处硬编码中文，需要使用 t() 函数`);
          setActiveTab('code');
        }
      }
    } catch (error) {
      console.error('Code scan error:', error);
      toast.error('代码扫描功能需要后端支持');
      
      // Fallback: simulate with known patterns
      simulateCodeScan();
    } finally {
      setIsScanningCode(false);
    }
  };

  // Simulate code scan (fallback when edge function not available)
  const simulateCodeScan = () => {
    const knownPatterns: CodeScanResult[] = [
      { file: 'src/components/CertificationsSection.tsx', line: 9, text: 'ISO 9001', context: 'certifications', suggestedKey: 'certs.iso9001', selected: false },
      { file: 'src/components/FAQSection.tsx', line: 25, text: '常见问题', context: 'FAQ title', suggestedKey: 'faq.title', selected: false },
    ];
    
    // Filter out items already in dictionary
    const filtered = knownPatterns.filter(p => !Object.values(zhTranslations).includes(p.text));
    setCodeScanResults(filtered);
    
    if (filtered.length > 0) {
      toast.info(`发现 ${filtered.length} 处可能的硬编码文本`);
      setActiveTab('code');
    }
  };

  // Generate zh.ts code snippet for selected items
  const generateZhCode = () => {
    const selectedPage = detectedTexts.filter(t => t.selected);
    const selectedCode = codeScanResults.filter(r => r.selected);
    
    if (selectedPage.length === 0 && selectedCode.length === 0) {
      toast.error('请先选择要添加的内容');
      return;
    }

    let code = '// 新增翻译 key（添加到 src/i18n/zh.ts）\n';
    code += '// ================================\n\n';

    if (selectedPage.length > 0) {
      code += '// 从网页扫描发现\n';
      selectedPage.forEach(item => {
        const key = item.suggestedKey || generateKey(item.text, 'page');
        code += `  '${key}': '${item.text}',\n`;
      });
      code += '\n';
    }

    if (selectedCode.length > 0) {
      code += '// 从代码扫描发现\n';
      selectedCode.forEach(item => {
        code += `  '${item.suggestedKey}': '${item.text}',\n`;
      });
    }

    setGeneratedCode(code);
    toast.success('代码已生成，请复制并添加到 zh.ts 文件');
  };

  // Toggle selection
  const togglePageSelection = (index: number) => {
    setDetectedTexts(prev => prev.map((t, i) => 
      i === index ? { ...t, selected: !t.selected } : t
    ));
  };

  const toggleCodeSelection = (index: number) => {
    setCodeScanResults(prev => prev.map((r, i) => 
      i === index ? { ...r, selected: !r.selected } : r
    ));
  };

  const selectAllPage = () => {
    setDetectedTexts(prev => prev.map(t => ({ ...t, selected: true })));
  };

  const selectAllCode = () => {
    setCodeScanResults(prev => prev.map(r => ({ ...r, selected: true })));
  };

  // Translate one language until complete
  const translateLanguage = async (lang: LanguageCode): Promise<boolean> => {
    setCurrentLang(lang);
    let batchCount = 0;
    const maxBatches = 200; // Safety limit
    
    while (!stopRef.current && batchCount < maxBatches) {
      batchCount++;
      
      const { data, error } = await supabase.functions.invoke('batch-translate', {
        body: {
          sourceContent: zhTranslations,
          languages: [lang],
          mode: 'incremental',
        },
      });

      if (error) {
        console.error(`Translation error for ${lang}:`, error);
        return false;
      }

      if (data?.[lang]?.success) {
        const result = data[lang];
        
        // Update status for this language
        setLanguageStatuses(prev => prev.map(status => {
          if (status.code === lang) {
            const validCount = result.count - result.remaining;
            return {
              ...status,
              translated: validCount,
              missing: result.remaining,
              isComplete: result.completed || result.remaining === 0,
            };
          }
          return status;
        }));

        console.log(`[${lang}] Batch ${batchCount}: ${result.remaining} remaining`);

        if (result.completed || result.remaining === 0) {
          return true;
        }

        // Small delay between batches
        await new Promise(r => setTimeout(r, 500));
      } else {
        return false;
      }
    }

    return batchCount >= maxBatches;
  };

  // Translate all languages
  const translateAll = async () => {
    setIsTranslating(true);
    stopRef.current = false;
    setOverallProgress(0);

    const languagesToTranslate = SUPPORTED_LANGUAGES
      .filter(l => l.code !== 'zh' && l.code !== 'en')
      .map(l => l.code);

    toast.info('开始自动翻译所有语言...');

    let completedCount = 0;
    for (const lang of languagesToTranslate) {
      if (stopRef.current) {
        toast.info('翻译已停止');
        break;
      }

      const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
      toast.info(`正在翻译 ${langName}...`);

      const success = await translateLanguage(lang);
      
      if (success) {
        completedCount++;
        toast.success(`${langName} 翻译完成`);
      }

      setOverallProgress(Math.round((completedCount / languagesToTranslate.length) * 100));
      await loadStatuses();
    }

    setIsTranslating(false);
    setCurrentLang('');
    
    if (!stopRef.current) {
      toast.success('所有语言翻译完成！');
    }
  };

  // Translate single language
  const translateSingle = async (lang: LanguageCode) => {
    setIsTranslating(true);
    stopRef.current = false;

    const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
    toast.info(`正在翻译 ${langName}...`);

    const success = await translateLanguage(lang);
    
    if (success) {
      toast.success(`${langName} 翻译完成`);
    }

    await loadStatuses();
    setIsTranslating(false);
    setCurrentLang('');
  };

  const stopTranslation = () => {
    stopRef.current = true;
    toast.info('正在停止翻译...');
  };

  // Calculate overall stats
  const totalTranslated = languageStatuses
    .filter(s => s.code !== 'zh' && s.code !== 'en')
    .reduce((sum, s) => sum + s.translated, 0);
  const totalNeeded = languageStatuses
    .filter(s => s.code !== 'zh' && s.code !== 'en').length * totalSourceKeys;
  const overallPercent = totalNeeded > 0 ? Math.round((totalTranslated / totalNeeded) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              自动翻译系统
            </h1>
            <p className="text-muted-foreground">使用 DeepSeek AI 自动检测和翻译网站内容</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="translate" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              翻译管理
            </TabsTrigger>
            <TabsTrigger value="scan" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              网页扫描
              {detectedTexts.length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {detectedTexts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              代码扫描
              {codeScanResults.length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {codeScanResults.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Translation Management Tab */}
          <TabsContent value="translate" className="space-y-6">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>整体翻译进度</span>
                  <Badge variant={overallPercent === 100 ? "default" : "secondary"}>
                    {overallPercent}%
                  </Badge>
                </CardTitle>
                <CardDescription>
                  源文件包含 {totalSourceKeys} 个翻译 key，需要翻译到 12 种语言
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={overallPercent} className="h-3" />
                
                <div className="flex flex-wrap gap-2">
                  <Button onClick={detectMissing} disabled={isDetecting || isTranslating}>
                    {isDetecting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 检测中...</>
                    ) : (
                      <><Search className="mr-2 h-4 w-4" /> 检测缺失翻译</>
                    )}
                  </Button>
                  
                  <Button onClick={translateAll} disabled={isTranslating} variant="default">
                    {isTranslating ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 翻译中 ({currentLang})...</>
                    ) : (
                      <><Zap className="mr-2 h-4 w-4" /> 一键翻译全部</>
                    )}
                  </Button>

                  {isTranslating && (
                    <Button onClick={stopTranslation} variant="destructive">
                      <Square className="mr-2 h-4 w-4" /> 停止
                    </Button>
                  )}

                  <Button onClick={loadStatuses} variant="outline" disabled={isTranslating}>
                    <RefreshCw className="mr-2 h-4 w-4" /> 刷新状态
                  </Button>
                </div>

                {isTranslating && overallProgress > 0 && (
                  <div className="text-sm text-muted-foreground">
                    语言进度: {overallProgress}%
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Language Status Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {languageStatuses.map(status => (
                <Card key={status.code} className={status.isComplete ? 'border-green-500/50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{status.name}</span>
                      {status.isComplete ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Badge variant="outline">{status.missing} 缺失</Badge>
                      )}
                    </div>
                    <Progress 
                      value={(status.translated / status.total) * 100} 
                      className="h-2 mb-2"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {status.translated} / {status.total}
                      </span>
                      {!status.isComplete && status.code !== 'zh' && status.code !== 'en' && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => translateSingle(status.code)}
                          disabled={isTranslating}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Page Scan Tab */}
          <TabsContent value="scan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>网页内容扫描</CardTitle>
                <CardDescription>
                  扫描已渲染的网页，发现未收录到翻译字典的中文内容
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={scanPageContent} disabled={isScanningPage}>
                    {isScanningPage ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        扫描中 ({scanProgress.current}/{scanProgress.total})...
                      </>
                    ) : (
                      <><Eye className="mr-2 h-4 w-4" /> 扫描网页内容</>
                    )}
                  </Button>
                  
                  {detectedTexts.length > 0 && (
                    <>
                      <Button onClick={selectAllPage} variant="outline">
                        全选
                      </Button>
                      <Button onClick={generateZhCode} variant="secondary">
                        <Download className="mr-2 h-4 w-4" /> 生成代码
                      </Button>
                    </>
                  )}
                </div>

                {scanProgress.page && (
                  <div className="text-sm text-muted-foreground">
                    正在扫描: {scanProgress.page}
                  </div>
                )}

                {detectedTexts.length > 0 && (
                  <div className="border rounded-lg divide-y max-h-96 overflow-auto">
                    {detectedTexts.map((item, index) => (
                      <div key={index} className="p-3 flex items-start gap-3 hover:bg-muted/50">
                        <Checkbox 
                          checked={item.selected}
                          onCheckedChange={() => togglePageSelection(index)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.text}</p>
                          <p className="text-xs text-muted-foreground">
                            位置: {item.location} | Key: {item.suggestedKey}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Scan Tab */}
          <TabsContent value="code" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>代码文件扫描</CardTitle>
                <CardDescription>
                  扫描 TSX 文件，找出未使用 t() 函数的硬编码中文字符串
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={scanCodeFiles} disabled={isScanningCode}>
                    {isScanningCode ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 扫描中...</>
                    ) : (
                      <><FileCode className="mr-2 h-4 w-4" /> 扫描代码文件</>
                    )}
                  </Button>
                  
                  {codeScanResults.length > 0 && (
                    <>
                      <Button onClick={selectAllCode} variant="outline">
                        全选
                      </Button>
                      <Button onClick={generateZhCode} variant="secondary">
                        <Download className="mr-2 h-4 w-4" /> 生成代码
                      </Button>
                    </>
                  )}
                </div>

                {codeScanResults.length > 0 && (
                  <div className="border rounded-lg divide-y max-h-96 overflow-auto">
                    {codeScanResults.map((item, index) => (
                      <div key={index} className="p-3 flex items-start gap-3 hover:bg-muted/50">
                        <Checkbox 
                          checked={item.selected}
                          onCheckedChange={() => toggleCodeSelection(index)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{item.text}</p>
                          <p className="text-xs text-muted-foreground">
                            文件: {item.file}:{item.line}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            建议 Key: {item.suggestedKey}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generated Code */}
            {generatedCode && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    生成的翻译代码
                  </CardTitle>
                  <CardDescription>
                    复制以下代码并添加到 src/i18n/zh.ts 文件中
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                    {generatedCode}
                  </pre>
                  <Button 
                    className="mt-4" 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                      toast.success('代码已复制到剪贴板');
                    }}
                  >
                    复制代码
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* SEO Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>多语言 SEO 优化</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              翻译完成后，系统将自动为每种语言生成：
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>hreflang 标签 - 告诉搜索引擎页面的语言版本</li>
              <li>本地化 canonical URL - 每种语言独立的规范链接</li>
              <li>本地化 Open Graph 元数据 - 社交媒体分享优化</li>
              <li>结构化数据 (JSON-LD) - 搜索引擎丰富结果</li>
              <li>多语言 sitemap.xml - 帮助搜索引擎索引所有语言版本</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutoTranslation;
