import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Globe, RefreshCw, Check, X, Loader2 } from 'lucide-react';
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
}

const TranslationManagement = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState<TranslationStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLang, setCurrentLang] = useState<string>('');

  const loadTranslationStatuses = async () => {
    setIsLoading(true);
    const results: TranslationStatus[] = [];

    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang.code === 'zh' || lang.code === 'en') {
        results.push({
          lang: lang.code,
          name: lang.name,
          hasTranslation: true,
          keyCount: Object.keys(zhTranslations).length,
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
          results.push({
            lang: lang.code,
            name: lang.name,
            hasTranslation: true,
            keyCount: Object.keys(translations).length,
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
  }, []);

  // 单次翻译一批（60个key），不自动循环
  const translateSingleBatch = async (lang: LanguageCode) => {
    setIsTranslating(true);
    setCurrentLang(lang);

    try {
      const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
      toast.info(`正在翻译 ${langName}（单批次）...`);

      const { data, error } = await supabase.functions.invoke('batch-translate', {
        body: {
          mode: 'incremental',
          languages: [lang],
          sourceContent: zhTranslations, // 传递源内容
        },
      });

      if (error) throw error;

      const result = data?.results?.[lang];
      if (!result?.success) {
        throw new Error(result?.error || '翻译失败');
      }
      
      const progressPercent = Math.round((result.count / result.total) * 100);
      setProgress(progressPercent);
      
      if (result.remaining > 0) {
        toast.success(`${langName}: ${result.count}/${result.total} 已完成，还剩 ${result.remaining} 条待翻译`);
      } else {
        toast.success(`${langName} 翻译完成！共 ${result.count} 条`);
      }
      
      await loadTranslationStatuses();
    } catch (error) {
      console.error('Translation error:', error);
      toast.error(`翻译失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsTranslating(false);
      setCurrentLang('');
    }
  };

  // 单批次翻译所有语言（每个语言翻译一批60个key）
  const translateAllOneStep = async () => {
    const languagesToTranslate = SUPPORTED_LANGUAGES
      .filter(l => l.code !== 'zh' && l.code !== 'en')
      .map(l => l.code);

    setIsTranslating(true);
    setProgress(0);

    try {
      toast.info('正在翻译所有语言（单批次）...');

      for (let i = 0; i < languagesToTranslate.length; i++) {
        const lang = languagesToTranslate[i];
        const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name;
        setCurrentLang(lang);

        const { data, error } = await supabase.functions.invoke('batch-translate', {
          body: {
            mode: 'incremental',
            languages: [lang],
            sourceContent: zhTranslations, // 传递源内容
          },
        });

        if (error) {
          console.error(`Error translating ${lang}:`, error);
          toast.error(`${langName} 翻译失败`);
          continue;
        }
        
        const result = data?.results?.[lang];
        if (!result?.success) {
          toast.error(`${langName} 翻译失败`);
          continue;
        }
        
        if (result.remaining > 0) {
          toast.info(`${langName}: ${result.count}/${result.total}，剩余 ${result.remaining} 条`);
        } else {
          toast.success(`${langName} 完成`);
        }

        const overallProgress = Math.round(((i + 1) / languagesToTranslate.length) * 100);
        setProgress(overallProgress);
      }

      toast.success('单轮翻译完成！如有未完成的语言，请再次点击继续');
      await loadTranslationStatuses();
    } catch (error) {
      console.error('Batch translation error:', error);
      toast.error('批量翻译出错');
    } finally {
      setIsTranslating(false);
      setCurrentLang('');
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
              <p className="text-gray-600">使用豆包AI预翻译网站内容，存储为静态文件</p>
            </div>
          </div>
          <Button 
            onClick={translateAllOneStep} 
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
                <Globe className="h-4 w-4 mr-2" />
                翻译一轮（所有语言）
              </>
            )}
          </Button>
        </div>

        {isTranslating && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span>正在翻译: {currentLang}</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-500 mt-2">{progress}% 完成</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            statuses.map((status) => (
              <Card key={status.lang}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{status.name}</CardTitle>
                    {status.hasTranslation ? (
                      <Badge variant="default" className="bg-green-500">
                        <Check className="h-3 w-3 mr-1" />
                        已翻译
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
                      <span className="text-gray-500">翻译词条:</span>
                      <span>{status.keyCount} / {Object.keys(zhTranslations).length}</span>
                    </div>
                    {status.lastUpdated && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">更新时间:</span>
                        <span>{status.lastUpdated}</span>
                      </div>
                    )}
                  </div>
                  {status.lang !== 'zh' && status.lang !== 'en' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => translateSingleBatch(status.lang)}
                      disabled={isTranslating}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      {status.hasTranslation ? '继续翻译' : '开始翻译'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>1. 点击"翻译所有语言"批量翻译所有支持的语言</p>
            <p>2. 翻译完成后，内容将保存在数据库中</p>
            <p>3. 用户切换语言时会直接加载预翻译的内容，无需等待</p>
            <p>4. 网站会根据访客IP自动检测并切换到对应语言</p>
            <p>5. 如需更新翻译，点击单个语言卡片的"重新翻译"按钮</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TranslationManagement;
