import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Globe, RefreshCw, Check, X, Loader2, Square, Play, FileText, Trash2, Languages } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { zhTranslations } from '@/i18n/zh';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/i18n/languages';
import HardcodedScanner from '@/components/admin/HardcodedScanner';

interface TranslationStatus {
  lang: LanguageCode;
  name: string;
  hasTranslation: boolean;
  keyCount: number;
  lastUpdated?: string;
}

interface PendingTranslation {
  keys: string[];
  content: Record<string, string>;
  submitted_at: string;
  source: string;
}

const TranslationManagement = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState<TranslationStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLang, setCurrentLang] = useState<string>('');
  const [currentProgress, setCurrentProgress] = useState({ done: 0, total: 0, remaining: 0 });
  const stopAutoRef = useRef(false);
  
  // Pending translations state
  const [pendingTranslations, setPendingTranslations] = useState<PendingTranslation | null>(null);
  const [isPendingLoading, setIsPendingLoading] = useState(false);
  const [isTranslatingPending, setIsTranslatingPending] = useState(false);

  // 源语言总key数
  const totalSourceKeys = Object.keys(zhTranslations).length;

  const loadPendingTranslations = useCallback(async () => {
    setIsPendingLoading(true);
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'pending_translations')
        .maybeSingle();

      if (data?.value) {
        const parsed = JSON.parse(data.value);
        setPendingTranslations(parsed);
      } else {
        setPendingTranslations(null);
      }
    } catch (error) {
      console.error('Failed to load pending translations:', error);
      setPendingTranslations(null);
    } finally {
      setIsPendingLoading(false);
    }
  }, []);

  // Handle new items migrated from scanner
  const handleNewItemsMigrated = useCallback((count: number) => {
    loadPendingTranslations();
  }, [loadPendingTranslations]);

  const loadTranslationStatuses = async () => {
    setIsLoading(true);
    const results: TranslationStatus[] = [];

    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang.code === 'zh' || lang.code === 'en') {
        results.push({
          lang: lang.code,
          name: lang.name,
          hasTranslation: true,
          keyCount: totalSourceKeys,
          lastUpdated: '内置',
        });
        continue;
      }

      try {
        const { data, error } = await supabase
          .from('system_settings')
          .select('value, updated_at')
          .eq('key', `translations_${lang.code}`)
          .single();

        if (data?.value) {
          const translations = JSON.parse(data.value);
          const translatedCount = Object.keys(translations).length;
          results.push({
            lang: lang.code,
            name: lang.name,
            hasTranslation: true,
            keyCount: translatedCount,
            lastUpdated: new Date(data.updated_at).toLocaleString('zh-CN'),
          });
        } else {
          results.push({
            lang: lang.code,
            name: lang.name,
            hasTranslation: false,
            keyCount: 0,
          });
        }
      } catch (error) {
        results.push({
          lang: lang.code,
          name: lang.name,
          hasTranslation: false,
          keyCount: 0,
        });
      }
    }

    setStatuses(results);
    setIsLoading(false);
  };

  useEffect(() => {
    loadTranslationStatuses();
    loadPendingTranslations();
  }, []);

  // 翻译单个语言的一个批次
  const translateOneBatch = async (lang: LanguageCode): Promise<{ success: boolean; remaining: number; count: number; total: number }> => {
    try {
      const totalKeys = Object.keys(zhTranslations).length;
      console.log(`[TranslateOneBatch] Starting for ${lang}, source has ${totalKeys} keys`);
      
      const { data, error } = await supabase.functions.invoke('batch-translate', {
        body: {
          mode: 'incremental',
          languages: [lang],
          sourceContent: zhTranslations, // Always send full source content
        },
      });

      if (error) {
        console.error(`[TranslateOneBatch] Error for ${lang}:`, error);
        throw error;
      }

      const result = data?.results?.[lang];
      console.log(`[TranslateOneBatch] Result for ${lang}:`, result);
      
      if (!result?.success) {
        throw new Error(result?.error || '翻译失败');
      }

      return {
        success: true,
        remaining: result.remaining ?? 0,
        count: result.count ?? 0,
        total: result.total ?? totalKeys,
      };
    } catch (error) {
      console.error('Translation batch error:', error);
      return { success: false, remaining: -1, count: 0, total: Object.keys(zhTranslations).length };
    }
  };

  // 自动翻译单个语言直到完成
  const autoTranslateSingleLanguage = async (lang: LanguageCode) => {
    const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
    setCurrentLang(lang);
    
    const totalKeys = Object.keys(zhTranslations).length;
    let retryCount = 0;
    const maxRetries = 3;

    console.log(`[AutoTranslate] Starting ${langName}, total keys: ${totalKeys}`);

    while (!stopAutoRef.current) {
      const result = await translateOneBatch(lang);
      
      console.log(`[AutoTranslate] Batch result for ${langName}:`, result);
      
      if (!result.success) {
        retryCount++;
        if (retryCount >= maxRetries) {
          toast.error(`${langName} 翻译失败，已重试${maxRetries}次`);
          return false;
        }
        toast.warning(`${langName} 翻译出错，正在重试 (${retryCount}/${maxRetries})...`);
        await new Promise(r => setTimeout(r, 2000)); // 等待2秒后重试
        continue;
      }

      retryCount = 0; // 重置重试计数
      
      const done = result.count;
      const remaining = result.remaining;
      const total = result.total || totalKeys;
      
      setCurrentProgress({ done, total, remaining });
      setProgress(Math.round((done / total) * 100));
      
      console.log(`[AutoTranslate] ${langName}: ${done}/${total} done, ${remaining} remaining`);

      // Check if translation is complete
      if (remaining === 0 || done >= total) {
        toast.success(`${langName} 翻译完成！共 ${done} 条`);
        return true;
      }

      // 短暂延迟避免请求过快
      await new Promise(r => setTimeout(r, 500));
    }

    return false;
  };

  // 自动翻译所有语言
  const autoTranslateAll = async () => {
    const languagesToTranslate = SUPPORTED_LANGUAGES
      .filter(l => l.code !== 'zh' && l.code !== 'en')
      .map(l => l.code);

    setIsTranslating(true);
    setIsAutoMode(true);
    stopAutoRef.current = false;
    setProgress(0);

    toast.info('开始自动翻译所有语言...');

    for (let i = 0; i < languagesToTranslate.length; i++) {
      if (stopAutoRef.current) {
        toast.info('翻译已停止');
        break;
      }

      const lang = languagesToTranslate[i];
      const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
      
      toast.info(`正在翻译 ${langName} (${i + 1}/${languagesToTranslate.length})...`);
      
      const success = await autoTranslateSingleLanguage(lang);
      
      if (!success && !stopAutoRef.current) {
        // 继续下一个语言
        toast.warning(`${langName} 未完成，继续处理下一个语言`);
      }

      await loadTranslationStatuses();
    }

    setIsTranslating(false);
    setIsAutoMode(false);
    setCurrentLang('');
    
    if (!stopAutoRef.current) {
      toast.success('所有语言翻译完成！');
    }
  };

  // 自动翻译单个语言
  const startAutoTranslateSingle = async (lang: LanguageCode) => {
    setIsTranslating(true);
    setIsAutoMode(true);
    stopAutoRef.current = false;
    setProgress(0);

    const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
    toast.info(`开始自动翻译 ${langName}...`);

    await autoTranslateSingleLanguage(lang);
    await loadTranslationStatuses();

    setIsTranslating(false);
    setIsAutoMode(false);
    setCurrentLang('');
  };

  // 停止自动翻译
  const stopAutoTranslate = () => {
    stopAutoRef.current = true;
    toast.info('正在停止翻译...');
  };

  // 翻译待处理的内容
  const translatePendingContent = async () => {
    if (!pendingTranslations || Object.keys(pendingTranslations.content).length === 0) {
      toast.error('没有待翻译的内容');
      return;
    }

    setIsTranslatingPending(true);
    stopAutoRef.current = false;

    try {
      // Merge pending translations with existing zhTranslations
      const mergedContent = { ...zhTranslations, ...pendingTranslations.content };
      const targetLanguages = SUPPORTED_LANGUAGES
        .filter(l => l.code !== 'zh' && l.code !== 'en')
        .map(l => l.code);

      toast.info(`开始翻译 ${Object.keys(pendingTranslations.content).length} 个新key到 ${targetLanguages.length} 种语言...`);

      for (let i = 0; i < targetLanguages.length; i++) {
        if (stopAutoRef.current) {
          toast.info('翻译已停止');
          break;
        }

        const lang = targetLanguages[i];
        const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
        setCurrentLang(lang);
        setProgress(Math.round((i / targetLanguages.length) * 100));

        toast.info(`正在翻译 ${langName} (${i + 1}/${targetLanguages.length})...`);

        // Translate to this language
        const { data, error } = await supabase.functions.invoke('batch-translate', {
          body: {
            sourceContent: mergedContent,
            languages: [lang],
            mode: 'incremental',
          },
        });

        if (error) {
          console.error(`Translation error for ${lang}:`, error);
          toast.error(`${langName} 翻译失败`);
          continue;
        }

        const result = data?.results?.[lang];
        if (result?.success) {
          toast.success(`${langName} 翻译完成`);
        }

        await loadTranslationStatuses();
        await new Promise(r => setTimeout(r, 500));
      }

      // Clear pending translations after successful translation
      if (!stopAutoRef.current) {
        await supabase
          .from('system_settings')
          .delete()
          .eq('key', 'pending_translations');
        
        setPendingTranslations(null);
        toast.success('所有待翻译内容已处理完成！');
      }
    } catch (error) {
      console.error('Translate pending error:', error);
      toast.error('翻译过程中发生错误');
    } finally {
      setIsTranslatingPending(false);
      setCurrentLang('');
      setProgress(0);
    }
  };

  // 清除待翻译内容
  const clearPendingTranslations = async () => {
    try {
      await supabase
        .from('system_settings')
        .delete()
        .eq('key', 'pending_translations');
      
      setPendingTranslations(null);
      toast.success('待翻译内容已清除');
    } catch (error) {
      console.error('Clear pending error:', error);
      toast.error('清除失败');
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
              <h1 className="text-2xl font-bold">多语言翻译管理</h1>
              <p className="text-gray-600">使用DeepSeek AI自动翻译网站内容</p>
            </div>
          </div>
          {isAutoMode ? (
            <Button 
              onClick={stopAutoTranslate} 
              variant="destructive"
            >
              <Square className="h-4 w-4 mr-2" />
              停止翻译
            </Button>
          ) : (
            <Button 
              onClick={autoTranslateAll} 
              disabled={isTranslating}
              className="bg-primary"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  翻译中...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  自动翻译全部
                </>
              )}
            </Button>
          )}
        </div>

        {isTranslating && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="font-medium">
                    正在翻译: {SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.name || currentLang}
                  </span>
                </div>
                {currentProgress.total > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {currentProgress.done} / {currentProgress.total} 条
                    {currentProgress.remaining > 0 && ` (剩余 ${currentProgress.remaining})`}
                  </span>
                )}
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{progress}% 完成</span>
                {isAutoMode && (
                  <span className="text-primary">自动模式运行中...</span>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hardcoded Scanner Section */}
        <div className="mb-6">
          <HardcodedScanner onNewItemsMigrated={handleNewItemsMigrated} />
        </div>

        {/* Pending Translations Panel */}
        {pendingTranslations && Object.keys(pendingTranslations.content).length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  <CardTitle className="text-lg text-orange-800">待翻译内容</CardTitle>
                  <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                    {Object.keys(pendingTranslations.content).length} 条
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearPendingTranslations}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    清除
                  </Button>
                  <Button
                    size="sm"
                    onClick={translatePendingContent}
                    disabled={isTranslatingPending || isTranslating}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    {isTranslatingPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        翻译中...
                      </>
                    ) : (
                      <>
                        <Languages className="h-4 w-4 mr-2" />
                        开始翻译
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <CardDescription className="text-orange-700">
                来自硬编码检测工具 · 提交于 {new Date(pendingTranslations.submitted_at).toLocaleString('zh-CN')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {Object.entries(pendingTranslations.content).map(([key, value]) => (
                    <div key={key} className="p-2 bg-white rounded border border-orange-200">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-orange-600 font-mono truncate">{key}</p>
                          <p className="text-sm text-gray-800 truncate">{value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            statuses.map((status) => {
              const progressPercent = status.keyCount > 0 
                ? Math.round((status.keyCount / totalSourceKeys) * 100) 
                : 0;
              const isComplete = status.keyCount >= totalSourceKeys;
              const missingKeys = totalSourceKeys - status.keyCount;
              
              return (
                <Card key={status.lang} className={currentLang === status.lang ? 'ring-2 ring-primary' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{status.name}</CardTitle>
                      {isComplete ? (
                        <Badge variant="default" className="bg-green-500">
                          <Check className="h-3 w-3 mr-1" />
                          完成
                        </Badge>
                      ) : status.hasTranslation ? (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          {progressPercent}%
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <X className="h-3 w-3 mr-1" />
                          未翻译
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      语言代码: {status.lang}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">翻译进度:</span>
                        <span className={missingKeys > 0 ? 'text-orange-600 font-medium' : 'text-green-600'}>
                          {status.keyCount} / {totalSourceKeys}
                          {missingKeys > 0 && ` (缺${missingKeys})`}
                        </span>
                      </div>
                      {status.keyCount > 0 && status.keyCount < totalSourceKeys && (
                        <Progress value={progressPercent} className="h-1.5" />
                      )}
                      {status.lastUpdated && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">更新时间:</span>
                          <span className="text-xs">{status.lastUpdated}</span>
                        </div>
                      )}
                    </div>
                    {status.lang !== 'zh' && status.lang !== 'en' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => startAutoTranslateSingle(status.lang)}
                        disabled={isTranslating}
                      >
                        {currentLang === status.lang ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            翻译中...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            {isComplete ? '重新翻译' : status.hasTranslation ? '继续翻译' : '开始翻译'}
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>1. 点击 <strong>"自动翻译全部"</strong> 自动翻译所有语言，无需手动干预</p>
            <p>2. 翻译过程中可随时点击 <strong>"停止翻译"</strong> 暂停，下次会从断点继续</p>
            <p>3. 单个语言翻译完成后会自动继续下一个语言</p>
            <p>4. 如遇网络问题会自动重试最多3次</p>
            <p>5. 翻译完成后，用户切换语言时会直接加载预翻译内容</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TranslationManagement;
