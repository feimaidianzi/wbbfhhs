import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Globe, RefreshCw, Check, X, Loader2, Square, Play, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { zhTranslations } from '@/i18n/zh';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/i18n/languages';

interface TranslationStatus {
  lang: LanguageCode;
  name: string;
  hasTranslation: boolean;
  keyCount: number;
  lastUpdated?: string;
  missingKeys: string[];
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
  
  // 后台自动翻译状态
  const [isBackgroundEnabled, setIsBackgroundEnabled] = useState(false);
  const [lastBackgroundRun, setLastBackgroundRun] = useState<string | null>(null);
  
  const totalSourceKeys = Object.keys(zhTranslations).length;

  const loadTranslationStatuses = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    const results: TranslationStatus[] = [];

    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang.code === 'zh') {
        results.push({
          lang: lang.code,
          name: lang.name,
          hasTranslation: true,
          keyCount: totalSourceKeys,
          lastUpdated: '内置',
          missingKeys: [],
        });
        continue;
      }

      try {
        const { data } = await supabase
          .from('system_settings')
          .select('value, updated_at')
          .eq('key', `translations_${lang.code}`)
          .single();

        if (data?.value) {
          const translations = JSON.parse(data.value);
          const translatedKeySet = new Set(Object.keys(translations));
          const sourceKeys = Object.keys(zhTranslations);
          const missing = sourceKeys.filter(k => !translatedKeySet.has(k));
          const coveredCount = sourceKeys.length - missing.length;
          results.push({
            lang: lang.code,
            name: lang.name,
            hasTranslation: true,
            keyCount: coveredCount,
            lastUpdated: new Date(data.updated_at).toLocaleString('zh-CN'),
            missingKeys: missing,
          });
        } else {
          results.push({ lang: lang.code, name: lang.name, hasTranslation: false, keyCount: 0, missingKeys: Object.keys(zhTranslations) });
        }
      } catch {
        results.push({ lang: lang.code, name: lang.name, hasTranslation: false, keyCount: 0, missingKeys: Object.keys(zhTranslations) });
      }
    }

    setStatuses(results);
    setIsLoading(false);
  };

  const loadBackgroundStatus = async () => {
    try {
      const { data: enabledData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'auto_translate_enabled')
        .maybeSingle();
      setIsBackgroundEnabled(enabledData?.value === 'true');

      const { data: lastRunData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'auto_translate_last_run')
        .maybeSingle();
      setLastBackgroundRun(lastRunData?.value || null);
    } catch (error) {
      console.error('Failed to load background status:', error);
    }
  };

  const toggleBackgroundTranslate = async () => {
    const newValue = !isBackgroundEnabled;
    try {
      await supabase.from('system_settings').upsert({
        key: 'auto_translate_enabled',
        value: newValue ? 'true' : 'false',
        description: '后台自动翻译开关',
      }, { onConflict: 'key' });
      setIsBackgroundEnabled(newValue);
      toast.success(newValue ? '已开启后台自动翻译' : '已关闭后台自动翻译');
    } catch {
      toast.error('操作失败');
    }
  };

  const triggerBackgroundTranslate = async () => {
    try {
      toast.info('正在触发后台翻译...');
      const { data, error } = await supabase.functions.invoke('auto-translate-background');
      if (error) throw error;
      if (data?.translated > 0) {
        toast.success(`后台翻译完成：${data.translated} 个key`);
        await loadTranslationStatuses(false);
      } else {
        toast.info(data?.message || '暂无需要翻译的内容');
      }
      await loadBackgroundStatus();
    } catch {
      toast.error('后台翻译失败');
    }
  };

  const syncSourceToDatabase = async () => {
    try {
      const sourceJson = JSON.stringify(zhTranslations);
      await supabase.from('system_settings').upsert({
        key: 'source_translations_zh',
        value: sourceJson,
        description: '源中文翻译字典（自动同步）',
      }, { onConflict: 'key' });
    } catch (e) {
      console.error('[SyncSource] Error:', e);
    }
  };

  useEffect(() => {
    syncSourceToDatabase();
    loadTranslationStatuses();
    loadBackgroundStatus();
  }, []);

  // 实时进度轮询：翻译进行中时每 4s 刷新一次各语言进度
  useEffect(() => {
    if (!isTranslating) return;
    const id = setInterval(() => {
      loadTranslationStatuses(false);
    }, 4000);
    return () => clearInterval(id);
  }, [isTranslating]);

  // 仅重试某语言的缺失键
  const retryMissingForLang = async (lang: LanguageCode, missing: string[]) => {
    if (missing.length === 0) {
      toast.success('该语言已无缺失键');
      return;
    }
    const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
    const source = zhTranslations as Record<string, string>;
    // 分块避免单次过大
    const chunkSize = 50;
    const total = missing.length;
    setIsTranslating(true);
    setIsAutoMode(false);
    setCurrentLang(lang);
    setCurrentProgress({ done: 0, total, remaining: total });
    setProgress(0);
    try {
      for (let i = 0; i < missing.length; i += chunkSize) {
        const slice = missing.slice(i, i + chunkSize);
        const sub: Record<string, string> = {};
        for (const k of slice) if (source[k] !== undefined) sub[k] = source[k];
        const { data, error } = await supabase.functions.invoke('batch-translate', {
          body: {
            mode: 'incremental',
            languages: [lang],
            sourceContent: sub,
            forceTranslateKeys: slice,
          },
        });
        if (error) throw error;
        const r = data?.results?.[lang];
        if (!r?.success) throw new Error(r?.error || '重试失败');
        const done = Math.min(total, i + slice.length);
        setCurrentProgress({ done, total, remaining: total - done });
        setProgress(Math.floor((done / total) * 100));
        await loadTranslationStatuses(false);
      }
      toast.success(`${langName} 缺失键已全部重试完成（${total} 条）`);
    } catch (e: any) {
      toast.error(`${langName} 重试失败：${e?.message || '未知错误'}`);
    } finally {
      setIsTranslating(false);
      setCurrentLang('');
    }
  };

  // 翻译单个语言的一个批次
  const translateOneBatch = async (lang: LanguageCode): Promise<{ success: boolean; remaining: number; count: number; total: number; isTimeout?: boolean }> => {
    try {
      const sourceContent = zhTranslations as Record<string, string>;
      const totalKeys = totalSourceKeys;

      // 前端预过滤：只发送未翻译的keys
      let existingTranslations: Record<string, string> = {};
      try {
        const { data: langData } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', `translations_${lang}`)
          .maybeSingle();
        if (langData?.value) {
          existingTranslations = JSON.parse(langData.value);
        }
      } catch (e) {
        console.error('Failed to get existing translations:', e);
      }

      const existingKeys = new Set(Object.keys(existingTranslations));
      const filteredContent: Record<string, string> = {};
      for (const [key, value] of Object.entries(sourceContent)) {
        if (!existingKeys.has(key)) {
          filteredContent[key] = value;
        }
      }

      const filteredCount = Object.keys(filteredContent).length;
      if (filteredCount === 0) {
        return { success: true, remaining: 0, count: 0, total: totalKeys };
      }

      // 限制单次发送量
      const maxKeysPerBatch = 30;
      let contentToSend = filteredContent;
      if (filteredCount > maxKeysPerBatch) {
        const entries = Object.entries(filteredContent).slice(0, maxKeysPerBatch);
        contentToSend = Object.fromEntries(entries);
      }

      const { data, error } = await supabase.functions.invoke('batch-translate', {
        body: {
          mode: 'incremental',
          languages: [lang],
          sourceContent: contentToSend,
        },
      });

      if (error) throw error;

      const result = data?.results?.[lang];
      if (!result?.success) throw new Error(result?.error || '翻译失败');

      // Re-query DB to get true remaining count
      let trueRemaining = totalKeys;
      try {
        const { data: updatedLangData } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', `translations_${lang}`)
          .maybeSingle();
        if (updatedLangData?.value) {
          const updatedTranslations = JSON.parse(updatedLangData.value);
          const updatedKeySet = new Set(Object.keys(updatedTranslations));
          trueRemaining = Object.keys(sourceContent).filter(k => !updatedKeySet.has(k)).length;
        }
      } catch (e) {
        trueRemaining = Math.max(0, filteredCount - (result.count ?? 0));
      }

      return { success: true, remaining: trueRemaining, count: result.count ?? 0, total: totalKeys };
    } catch (error: any) {
      const isTimeoutError = error?.message?.includes('Failed to fetch') || 
                              error?.context?.message?.includes('Failed to fetch') ||
                              error?.name === 'FunctionsFetchError';
      if (isTimeoutError) {
        return { success: false, remaining: -2, count: 0, total: totalSourceKeys, isTimeout: true };
      }
      return { success: false, remaining: -1, count: 0, total: totalSourceKeys, isTimeout: false };
    }
  };

  // 自动翻译单个语言直到完成
  const autoTranslateSingleLanguage = async (lang: LanguageCode) => {
    const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
    setCurrentLang(lang);
    const totalKeys = totalSourceKeys;
    let retryCount = 0;
    const maxRetries = 3;
    let batchCount = 0;

    // 初始化进度
    try {
      const { data: langData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', `translations_${lang}`)
        .maybeSingle();
      if (langData?.value) {
        const existing = JSON.parse(langData.value);
        const translatedCount = Object.keys(existing).length;
        const initialRemaining = Math.max(0, totalKeys - translatedCount);
        setCurrentProgress({ done: translatedCount, total: totalKeys, remaining: initialRemaining });
        setProgress(totalKeys > 0 ? Math.min(99, Math.floor((translatedCount / totalKeys) * 100)) : 0);
      } else {
        setCurrentProgress({ done: 0, total: totalKeys, remaining: totalKeys });
        setProgress(0);
      }
    } catch {
      setCurrentProgress({ done: 0, total: totalKeys, remaining: totalKeys });
      setProgress(0);
    }

    while (!stopAutoRef.current) {
      batchCount++;
      const result = await translateOneBatch(lang);

      if (!result.success) {
        retryCount++;
        if (result.isTimeout) {
          toast.info(`${langName} 请求超时，后台仍在翻译中，请等待...`, { duration: 25000 });
          for (let waitRound = 0; waitRound < 5; waitRound++) {
            await new Promise(r => setTimeout(r, 5000));
            try {
              const { data: langData } = await supabase
                .from('system_settings')
                .select('value')
                .eq('key', `translations_${lang}`)
                .maybeSingle();
              if (langData?.value) {
                const existing = JSON.parse(langData.value);
                const translatedCount = Object.keys(existing).length;
                const currentRemaining = Math.max(0, totalKeys - translatedCount);
                setCurrentProgress({ done: translatedCount, total: totalKeys, remaining: currentRemaining });
                setProgress(totalKeys > 0 ? Math.min(99, Math.floor((translatedCount / totalKeys) * 100)) : 0);
                if (currentRemaining <= 0) {
                  setProgress(100);
                  setCurrentProgress({ done: totalKeys, total: totalKeys, remaining: 0 });
                  toast.success(`${langName} 翻译完成！共 ${totalKeys} 条`);
                  return true;
                }
              }
            } catch { /* continue */ }
          }
          await loadTranslationStatuses(false);
          retryCount = 0;
          continue;
        }
        if (retryCount >= maxRetries) {
          toast.error(`${langName} 翻译失败，已重试${maxRetries}次`);
          return false;
        }
        toast.warning(`${langName} 翻译出错，正在重试 (${retryCount}/${maxRetries})...`);
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }

      retryCount = 0;
      const remaining = result.remaining;
      const done = Math.max(0, totalKeys - remaining);
      setCurrentProgress({ done, total: totalKeys, remaining });
      const progressPercent = totalKeys > 0 ? (remaining <= 0 ? 100 : Math.min(99, Math.floor((done / totalKeys) * 100))) : 0;
      setProgress(progressPercent);
      await loadTranslationStatuses(false);

      if (remaining <= 0) {
        setProgress(100);
        setCurrentProgress({ done: totalKeys, total: totalKeys, remaining: 0 });
        if (batchCount === 1) {
          toast.info(`${langName} 已全部翻译完成，无需继续翻译`);
        } else {
          toast.success(`${langName} 翻译完成！共 ${totalKeys} 条`);
        }
        return true;
      }

      await new Promise(r => setTimeout(r, 500));
    }

    return false;
  };

  const autoTranslateAll = async () => {
    const languagesToTranslate = SUPPORTED_LANGUAGES.filter(l => l.code !== 'zh').map(l => l.code);
    setIsTranslating(true);
    setIsAutoMode(true);
    stopAutoRef.current = false;
    setProgress(0);

    // Filter out already completed languages
    const pendingLanguages = languagesToTranslate.filter(lang => {
      const status = statuses.find(s => s.lang === lang);
      return !status || status.keyCount < totalSourceKeys;
    });

    if (pendingLanguages.length === 0) {
      toast.success('所有语言均已翻译完成，无需重复翻译！');
      setIsTranslating(false);
      setIsAutoMode(false);
      return;
    }

    const skippedCount = languagesToTranslate.length - pendingLanguages.length;
    if (skippedCount > 0) {
      toast.info(`跳过 ${skippedCount} 个已完成语言，开始翻译剩余 ${pendingLanguages.length} 个语言...`);
    } else {
      toast.info('开始自动翻译所有语言...');
    }

    for (let i = 0; i < pendingLanguages.length; i++) {
      if (stopAutoRef.current) { toast.info('翻译已停止'); break; }
      const lang = pendingLanguages[i];
      const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
      toast.info(`正在翻译 ${langName} (${i + 1}/${pendingLanguages.length})...`);
      const success = await autoTranslateSingleLanguage(lang);
      if (!success && !stopAutoRef.current) {
        toast.warning(`${langName} 未完成，继续处理下一个语言`);
      }
      await loadTranslationStatuses(false);
    }

    setIsTranslating(false);
    setIsAutoMode(false);
    setCurrentLang('');
    if (!stopAutoRef.current) toast.success('所有语言翻译完成！');
  };

  const startAutoTranslateSingle = async (lang: LanguageCode) => {
    // Check if already complete
    const status = statuses.find(s => s.lang === lang);
    if (status && status.keyCount >= totalSourceKeys) {
      toast.success(`${SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name} 已全部翻译完成，无需重复翻译！`);
      return;
    }

    setIsTranslating(true);
    setIsAutoMode(true);
    stopAutoRef.current = false;
    setProgress(0);

    const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
    toast.info(`开始自动翻译 ${langName}...`);
    await autoTranslateSingleLanguage(lang);
    await loadTranslationStatuses(false);

    setIsTranslating(false);
    setIsAutoMode(false);
    setCurrentLang('');
  };

  const stopAutoTranslate = () => {
    stopAutoRef.current = true;
    toast.info('正在停止翻译...');
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
            <Button onClick={stopAutoTranslate} variant="destructive">
              <Square className="h-4 w-4 mr-2" />
              停止翻译
            </Button>
          ) : (
            <Button onClick={autoTranslateAll} disabled={isTranslating} className="bg-primary">
              {isTranslating ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />翻译中...</>
              ) : (
                <><Play className="h-4 w-4 mr-2" />自动翻译全部</>
              )}
            </Button>
          )}
        </div>

        {/* Translation Progress */}
        {isTranslating && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="font-medium">正在翻译: {SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {currentProgress.done}/{currentProgress.total} ({progress}%)
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                {currentProgress.remaining > 0 && (
                  <p className="text-xs text-muted-foreground">剩余 {currentProgress.remaining} 条待翻译</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Background Auto-translate Control */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">后台自动翻译</h3>
                <p className="text-sm text-muted-foreground">
                  {isBackgroundEnabled ? '已开启 - 每5分钟自动翻译缺失内容' : '已关闭'}
                  {lastBackgroundRun && ` · 上次运行: ${new Date(lastBackgroundRun).toLocaleString('zh-CN')}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={triggerBackgroundTranslate}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  手动触发
                </Button>
                <Button
                  variant={isBackgroundEnabled ? 'destructive' : 'default'}
                  size="sm"
                  onClick={toggleBackgroundTranslate}
                >
                  {isBackgroundEnabled ? '关闭' : '开启'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cache Clear */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">翻译缓存</h3>
                <p className="text-sm text-muted-foreground">清除浏览器中的翻译缓存，强制重新加载</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const keysToRemove: string[] = [];
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && (key.startsWith('translations_') || key === 'language' || key === 'language_manual')) {
                      keysToRemove.push(key);
                    }
                  }
                  keysToRemove.forEach(k => localStorage.removeItem(k));
                  toast.success(`已清除 ${keysToRemove.length} 项翻译缓存，请刷新页面`);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                清除缓存
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            statuses.map((status) => {
              const isComplete = status.keyCount >= totalSourceKeys;
              const effectiveCount = Math.min(status.keyCount, totalSourceKeys);
              const totalMissing = Math.max(0, totalSourceKeys - status.keyCount);
              const progressPercent = totalSourceKeys > 0 
                ? (totalMissing <= 0 ? 100 : Math.min(99, Math.floor((effectiveCount / totalSourceKeys) * 100)))
                : 0;

              return (
                <Card key={status.lang} className={currentLang === status.lang ? 'ring-2 ring-primary' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{status.name}</CardTitle>
                      {isComplete ? (
                        <Badge variant="default" className="bg-green-500">
                          <Check className="h-3 w-3 mr-1" />完成
                        </Badge>
                      ) : status.hasTranslation ? (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          {progressPercent}%
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <X className="h-3 w-3 mr-1" />未翻译
                        </Badge>
                      )}
                    </div>
                    <CardDescription>语言代码: {status.lang}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">翻译进度:</span>
                        <span className={totalMissing > 0 ? 'text-orange-600 font-medium' : 'text-green-600'}>
                          {effectiveCount} / {totalSourceKeys}
                          {totalMissing > 0 && ` (缺${totalMissing})`}
                        </span>
                      </div>
                      {!isComplete && status.keyCount > 0 && (
                        <Progress value={progressPercent} className="h-1.5" />
                      )}
                      {status.lastUpdated && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">更新时间:</span>
                          <span className="text-xs">{status.lastUpdated}</span>
                        </div>
                      )}
                    </div>
                    {status.lang !== 'zh' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => startAutoTranslateSingle(status.lang)}
                        disabled={isTranslating}
                      >
                        {currentLang === status.lang ? (
                          <><Loader2 className="h-4 w-4 mr-2 animate-spin" />翻译中...</>
                        ) : (
                          <><RefreshCw className="h-4 w-4 mr-2" />{isComplete ? '重新翻译' : status.hasTranslation ? '继续翻译' : '开始翻译'}</>
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
