import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Globe, RefreshCw, Check, Loader2, Square, Play, Search, Zap, Eye, FileText } from 'lucide-react';
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
  key?: string;
  inDictionary: boolean;
}

const AutoTranslation = () => {
  const navigate = useNavigate();
  const [isDetecting, setIsDetecting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isScanningPage, setIsScanningPage] = useState(false);
  const [languageStatuses, setLanguageStatuses] = useState<LanguageStatus[]>([]);
  const [currentLang, setCurrentLang] = useState('');
  const [overallProgress, setOverallProgress] = useState(0);
  const [detectedTexts, setDetectedTexts] = useState<DetectedText[]>([]);
  const [activeTab, setActiveTab] = useState('translate');
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
          const count = Object.keys(translations).length;
          statuses.push({
            code: lang.code,
            name: lang.name,
            translated: count,
            missing: totalSourceKeys - count,
            total: totalSourceKeys,
            isComplete: count >= totalSourceKeys,
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
        // Update statuses with detection results
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
      // Get all text content from the page
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

      // Check if text contains Chinese
      const containsChinese = (str: string): boolean => /[\u4e00-\u9fa5]/.test(str);

      // Get existing dictionary values
      const dictionaryValues = new Set(Object.values(zhTranslations));

      // Open main site in hidden iframe to scan
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const pagesToScan = ['/', '/products', '/about', '/contact', '/applications'];
      const allDetected: DetectedText[] = [];

      for (const path of pagesToScan) {
        try {
          const url = window.location.origin + path;
          
          await new Promise<void>((resolve, reject) => {
            iframe.onload = () => resolve();
            iframe.onerror = () => reject(new Error('Failed to load page'));
            iframe.src = url;
            setTimeout(() => resolve(), 3000); // Timeout after 3s
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
                    inDictionary: false,
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

  // Translate one language until complete
  const translateLanguage = async (lang: LanguageCode): Promise<boolean> => {
    setCurrentLang(lang);
    
    while (!stopRef.current) {
      const { data, error } = await supabase.functions.invoke('auto-detect-translate', {
        body: {
          action: 'translate',
          sourceContent: zhTranslations,
          targetLanguages: [lang],
          batchSize: 20,
        },
      });

      if (error) {
        console.error(`Translation error for ${lang}:`, error);
        return false;
      }

      if (data?.success) {
        // Update status for this language
        setLanguageStatuses(prev => prev.map(status => {
          if (status.code === lang) {
            return {
              ...status,
              translated: data.translated,
              missing: data.remaining,
              isComplete: data.completed,
            };
          }
          return status;
        }));

        if (data.completed) {
          return true;
        }

        // Small delay between batches
        await new Promise(r => setTimeout(r, 300));
      } else {
        return false;
      }
    }

    return false;
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

  // Add detected texts to dictionary
  const addToQueue = async (texts: DetectedText[]) => {
    try {
      // Create keys and add to pending translations
      const newTranslations: Record<string, string> = {};
      texts.forEach((t, i) => {
        const key = `detected.${Date.now()}_${i}`;
        newTranslations[key] = t.text;
      });

      // Get existing pending translations
      const { data: existingData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'pending_translations')
        .maybeSingle();

      let pending: Record<string, string> = {};
      if (existingData?.value) {
        pending = JSON.parse(existingData.value);
      }

      // Merge new translations
      const merged = { ...pending, ...newTranslations };

      await supabase
        .from('system_settings')
        .upsert({
          key: 'pending_translations',
          value: JSON.stringify(merged),
          description: `待翻译队列 - ${Object.keys(merged).length} 项`,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'key' });

      toast.success(`已添加 ${texts.length} 项到翻译队列`);
      setDetectedTexts(prev => prev.filter(d => !texts.includes(d)));
    } catch (error) {
      console.error('Add to queue error:', error);
      toast.error('添加失败');
    }
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
          </TabsList>

          <TabsContent value="translate" className="space-y-6">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>翻译进度总览</span>
                  <Badge variant={overallPercent === 100 ? 'default' : 'secondary'}>
                    {overallPercent}%
                  </Badge>
                </CardTitle>
                <CardDescription>
                  共 {totalSourceKeys} 个翻译项 × 12 种语言 = {totalNeeded.toLocaleString()} 总翻译量
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={overallPercent} className="h-3 mb-4" />
                
                <div className="flex gap-3 flex-wrap">
                  <Button
                    onClick={detectMissing}
                    disabled={isDetecting || isTranslating}
                    variant="outline"
                  >
                    {isDetecting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4 mr-2" />
                    )}
                    检测缺失翻译
                  </Button>

                  <Button
                    onClick={translateAll}
                    disabled={isTranslating || isDetecting}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500"
                  >
                    {isTranslating ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Zap className="h-4 w-4 mr-2" />
                    )}
                    一键翻译全部
                  </Button>

                  {isTranslating && (
                    <Button variant="destructive" onClick={stopTranslation}>
                      <Square className="h-4 w-4 mr-2" />
                      停止翻译
                    </Button>
                  )}

                  <Button variant="outline" onClick={loadStatuses} disabled={isTranslating}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    刷新状态
                  </Button>
                </div>

                {isTranslating && currentLang && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      正在翻译: <strong>{SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.name}</strong>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Language Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {languageStatuses.map(status => {
                const percent = status.total > 0 ? Math.round((status.translated / status.total) * 100) : 0;
                const isBuiltIn = status.code === 'zh' || status.code === 'en';
                const isActive = currentLang === status.code;

                return (
                  <Card 
                    key={status.code} 
                    className={`transition-all ${isActive ? 'ring-2 ring-primary' : ''} ${status.isComplete ? 'bg-green-50 dark:bg-green-950/20' : ''}`}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <span className="truncate">{status.name}</span>
                        {status.isComplete ? (
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : isActive ? (
                          <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
                        ) : null}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Progress value={percent} className="h-2 mb-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{status.translated}/{status.total}</span>
                        <span>{percent}%</span>
                      </div>
                      
                      {!isBuiltIn && !status.isComplete && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-full mt-2 h-7 text-xs"
                          onClick={() => translateSingle(status.code)}
                          disabled={isTranslating}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          翻译
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="scan" className="space-y-6">
            {/* Page Scanner */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  网页内容扫描
                </CardTitle>
                <CardDescription>
                  扫描实际渲染的网页，发现未收录到翻译字典中的中文内容
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-4">
                  <Button
                    onClick={scanPageContent}
                    disabled={isScanningPage}
                  >
                    {isScanningPage ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Eye className="h-4 w-4 mr-2" />
                    )}
                    扫描网页内容
                  </Button>

                  {detectedTexts.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => addToQueue(detectedTexts)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      全部添加到翻译队列
                    </Button>
                  )}
                </div>

                {detectedTexts.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="max-h-96 overflow-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted sticky top-0">
                          <tr>
                            <th className="text-left p-2">中文内容</th>
                            <th className="text-left p-2 w-24">页面</th>
                            <th className="text-left p-2 w-20">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detectedTexts.map((item, i) => (
                            <tr key={i} className="border-t hover:bg-muted/50">
                              <td className="p-2">
                                <code className="text-xs bg-muted px-1 rounded">
                                  {item.text.length > 60 ? item.text.slice(0, 60) + '...' : item.text}
                                </code>
                              </td>
                              <td className="p-2 text-muted-foreground">{item.location}</td>
                              <td className="p-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 text-xs"
                                  onClick={() => addToQueue([item])}
                                >
                                  添加
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Eye className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>点击"扫描网页内容"开始检测</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* SEO Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">多语言 SEO 优化</CardTitle>
            <CardDescription>
              翻译完成后，网站将自动支持以下 SEO 优化
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>自动生成多语言 hreflang 标签</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>语言特定的 canonical URL</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>本地化的 Open Graph 和 Twitter Card 元数据</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>多语言 sitemap.xml 自动生成</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>JSON-LD 结构化数据本地化</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutoTranslation;
