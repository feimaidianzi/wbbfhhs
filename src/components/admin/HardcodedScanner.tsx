import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, AlertTriangle, CheckCircle, Loader2, ArrowRight, Languages, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { zhTranslations } from '@/i18n/zh';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/i18n/languages';

interface MissingTranslation {
  key: string;
  zhValue: string;
  missingInLanguages: string[];
}

interface HardcodedScannerProps {
  onNewItemsMigrated?: (count: number) => void;
}

const HardcodedScanner: React.FC<HardcodedScannerProps> = ({ onNewItemsMigrated }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<MissingTranslation[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | 'all'>('all');
  const [languageStats, setLanguageStats] = useState<Record<string, { total: number; translated: number }>>({});

  // 获取所有语言的已翻译内容
  const fetchAllTranslations = async (): Promise<Record<string, Record<string, string>>> => {
    const translations: Record<string, Record<string, string>> = {};
    
    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang.code === 'zh') {
        translations[lang.code] = zhTranslations;
        continue;
      }
      if (lang.code === 'en') {
        // 英文是内置的，跳过检测
        continue;
      }
      
      try {
        const { data } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', `translations_${lang.code}`)
          .maybeSingle();
        
        if (data?.value) {
          translations[lang.code] = JSON.parse(data.value);
        } else {
          translations[lang.code] = {};
        }
      } catch (error) {
        console.error(`Failed to fetch translations for ${lang.code}:`, error);
        translations[lang.code] = {};
      }
    }
    
    return translations;
  };

  // 扫描所有语言，找出缺失的翻译
  const startScan = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setResults([]);
    setScanProgress(0);
    setLanguageStats({});

    try {
      // 获取所有语言的翻译
      setScanProgress(10);
      const allTranslations = await fetchAllTranslations();
      setScanProgress(30);

      // 获取源语言的所有 key
      const sourceKeys = Object.keys(zhTranslations);
      const totalKeys = sourceKeys.length;

      // 获取待翻译队列中已有的 key
      const { data: pendingData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'pending_translations')
        .maybeSingle();
      
      let pendingKeys = new Set<string>();
      if (pendingData?.value) {
        try {
          const parsed = JSON.parse(pendingData.value);
          pendingKeys = new Set(Object.keys(parsed.content || {}));
        } catch (e) {
          console.error('Failed to parse pending:', e);
        }
      }
      setScanProgress(40);

      // 统计各语言的翻译情况
      const stats: Record<string, { total: number; translated: number }> = {};
      const languagesToCheck = SUPPORTED_LANGUAGES.filter(l => l.code !== 'zh' && l.code !== 'en');
      
      for (const lang of languagesToCheck) {
        const langTranslations = allTranslations[lang.code] || {};
        const translatedCount = Object.keys(langTranslations).filter(k => sourceKeys.includes(k)).length;
        stats[lang.code] = {
          total: totalKeys,
          translated: translatedCount
        };
      }
      setLanguageStats(stats);
      setScanProgress(60);

      // 找出所有语言中缺失的翻译
      const missingTranslations: MissingTranslation[] = [];

      for (let i = 0; i < sourceKeys.length; i++) {
        const key = sourceKeys[i];
        const zhValue = zhTranslations[key as keyof typeof zhTranslations];
        
        // 跳过已在待翻译队列中的 key
        if (pendingKeys.has(key)) continue;

        // 检查哪些语言缺少这个 key
        const missingLanguages: string[] = [];
        
        for (const lang of languagesToCheck) {
          const langTranslations = allTranslations[lang.code] || {};
          if (!langTranslations[key]) {
            missingLanguages.push(lang.code);
          }
        }

        // 如果有任何语言缺少这个翻译，添加到结果中
        if (missingLanguages.length > 0) {
          missingTranslations.push({
            key,
            zhValue: String(zhValue),
            missingInLanguages: missingLanguages
          });
        }

        // 更新进度
        if (i % 100 === 0) {
          setScanProgress(60 + (i / sourceKeys.length) * 40);
        }
      }

      setScanProgress(100);
      setResults(missingTranslations);
      setScanComplete(true);

      if (missingTranslations.length > 0) {
        toast.info(`发现 ${missingTranslations.length} 个需要翻译的 key`);
      } else {
        toast.success('所有内容都已翻译完成！');
      }
    } catch (error) {
      console.error('Scan error:', error);
      toast.error('扫描失败');
    } finally {
      setIsScanning(false);
    }
  };

  // 迁移缺失的翻译到待翻译队列
  const migrateToQueue = async () => {
    if (results.length === 0) return;

    setIsMigrating(true);
    try {
      // 根据选择的语言过滤结果
      const itemsToMigrate = selectedLanguage === 'all' 
        ? results 
        : results.filter(r => r.missingInLanguages.includes(selectedLanguage));

      if (itemsToMigrate.length === 0) {
        toast.info('没有需要迁移的内容');
        setIsMigrating(false);
        return;
      }

      // 构建新的待翻译内容
      const newTranslations: Record<string, string> = {};
      itemsToMigrate.forEach(item => {
        newTranslations[item.key] = item.zhValue;
      });

      // 加载现有的待翻译内容
      const { data: existingData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'pending_translations')
        .maybeSingle();

      let existingPending: Record<string, string> = {};
      
      if (existingData?.value) {
        try {
          const parsed = JSON.parse(existingData.value);
          existingPending = parsed.content || {};
        } catch (e) {
          console.error('Failed to parse existing pending');
        }
      }

      // 合并新旧内容
      const mergedContent = { ...existingPending, ...newTranslations };
      const allKeys = Object.keys(mergedContent);

      // 保存到数据库
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          key: 'pending_translations',
          value: JSON.stringify({
            content: mergedContent,
            keys: allKeys,
            updated_at: new Date().toISOString()
          }),
          description: '待翻译的内容队列'
        }, { onConflict: 'key' });

      if (error) throw error;

      toast.success(`成功迁移 ${Object.keys(newTranslations).length} 个 key 到翻译队列`);
      
      // 清除已迁移的结果
      if (selectedLanguage === 'all') {
        setResults([]);
      } else {
        setResults(results.filter(r => !r.missingInLanguages.includes(selectedLanguage)));
      }

      // 通知父组件
      if (onNewItemsMigrated) {
        onNewItemsMigrated(Object.keys(newTranslations).length);
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast.error('迁移失败');
    } finally {
      setIsMigrating(false);
    }
  };

  // 过滤结果
  const filteredResults = selectedLanguage === 'all'
    ? results
    : results.filter(r => r.missingInLanguages.includes(selectedLanguage));

  // 计算按语言分组的缺失数量
  const getMissingCountByLanguage = (langCode: string) => {
    return results.filter(r => r.missingInLanguages.includes(langCode)).length;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              翻译缺失检测
            </CardTitle>
            <CardDescription>
              扫描所有语言，检测尚未翻译的 key
            </CardDescription>
          </div>
          <Button
            onClick={startScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                扫描中...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                开始扫描
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {isScanning && (
          <div className="space-y-2 mb-4">
            <Progress value={scanProgress} />
            <p className="text-sm text-muted-foreground text-center">
              正在扫描翻译状态... {Math.round(scanProgress)}%
            </p>
          </div>
        )}

        {/* 语言统计 */}
        {Object.keys(languageStats).length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">各语言翻译进度</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {SUPPORTED_LANGUAGES.filter(l => l.code !== 'zh' && l.code !== 'en').map(lang => {
                const stats = languageStats[lang.code];
                const missingCount = getMissingCountByLanguage(lang.code);
                if (!stats) return null;
                return (
                  <div 
                    key={lang.code}
                    className={`p-2 rounded border cursor-pointer transition-colors ${
                      selectedLanguage === lang.code 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedLanguage(selectedLanguage === lang.code ? 'all' : lang.code)}
                  >
                    <div className="text-xs font-medium truncate">{lang.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {stats.translated}/{stats.total}
                    </div>
                    {missingCount > 0 && (
                      <Badge variant="destructive" className="text-xs mt-1">
                        缺 {missingCount}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLanguage('all')}
                className={selectedLanguage === 'all' ? 'bg-primary/10' : ''}
              >
                显示全部 ({results.length})
              </Button>
            </div>
          </div>
        )}

        {scanComplete && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {filteredResults.length > 0 ? (
                  <>
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <span className="font-medium">
                      发现 {filteredResults.length} 个缺失翻译
                      {selectedLanguage !== 'all' && ` (${SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.name})`}
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">所有内容已翻译</span>
                  </>
                )}
              </div>

              {filteredResults.length > 0 && (
                <Button
                  onClick={migrateToQueue}
                  disabled={isMigrating}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {isMigrating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      迁移中...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      迁移到翻译队列 ({filteredResults.length})
                    </>
                  )}
                </Button>
              )}
            </div>

            {filteredResults.length > 0 && (
              <ScrollArea className="h-[300px] border rounded-lg p-2">
                <div className="space-y-2">
                  {filteredResults.slice(0, 100).map((item, index) => (
                    <div
                      key={item.key}
                      className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-mono text-muted-foreground truncate">
                            {item.key}
                          </div>
                          <div className="text-sm mt-1 truncate">
                            {item.zhValue}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {item.missingInLanguages.slice(0, 5).map(lang => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                          {item.missingInLanguages.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.missingInLanguages.length - 5}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredResults.length > 100 && (
                    <div className="text-center text-sm text-muted-foreground py-2">
                      还有 {filteredResults.length - 100} 条未显示...
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        )}

        {!isScanning && !scanComplete && (
          <div className="text-center py-8 text-muted-foreground">
            <Languages className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>点击"开始扫描"检测各语言的翻译缺失情况</p>
            <p className="text-xs mt-1">将对比 zhTranslations 与各语言已存储的翻译内容</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HardcodedScanner;
