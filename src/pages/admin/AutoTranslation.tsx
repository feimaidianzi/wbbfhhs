import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Globe, RefreshCw, Check, Loader2, Square, Play, Search, Zap } from 'lucide-react';
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

const AutoTranslation = () => {
  const navigate = useNavigate();
  const [isDetecting, setIsDetecting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [languageStatuses, setLanguageStatuses] = useState<LanguageStatus[]>([]);
  const [currentLang, setCurrentLang] = useState('');
  const [overallProgress, setOverallProgress] = useState(0);
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

        {/* Overall Progress */}
        <Card className="mb-6">
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
