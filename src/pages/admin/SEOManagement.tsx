import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Globe, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Map,
  Info,
  FolderDown,
  Send,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/i18n/languages';
import { 
  generateLanguageSitemap, 
  generateSitemapIndex, 
  generateRobotsTxt,
  downloadSitemap,
  downloadAllSitemaps,
  getAllSitemaps
} from '@/utils/sitemapGenerator';
import { getDomainForLanguage, getHtmlLang } from '@/utils/seoConfig';
import { supabase } from '@/integrations/supabase/client';
import SitemapSubmissionHistory from '@/components/admin/SitemapSubmissionHistory';
import SEOApiKeyManager from '@/components/admin/SEOApiKeyManager';

interface SubmissionResult {
  lang: string;
  url: string;
  google: { success: boolean; message: string };
  baidu: { success: boolean; message: string };
  bing: { success: boolean; message: string };
}

interface SubmissionState {
  isGenerating: boolean;
  isSubmitting: boolean;
  isPinging: boolean;
  lastGenerated: string | null;
  lastSubmitted: string | null;
  results: SubmissionResult[];
  error: string | null;
}

interface SubmissionHistoryItem {
  id: string;
  submission_type: string;
  languages: string[];
  route_count: number;
  results: Record<string, unknown>;
  status: string;
  error_message: string | null;
  triggered_by: string;
  created_at: string;
  completed_at: string | null;
}

const SEOManagement = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('zh');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  
  // API Keys from database
  const [apiKeys, setApiKeys] = useState({ googleToken: '', baiduToken: '', bingApiKey: '' });
  
  // Submission history
  const [submissionHistory, setSubmissionHistory] = useState<SubmissionHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  
  // Email notification option
  const [sendEmailNotify, setSendEmailNotify] = useState(false);

  // Baidu push state
  const [isBaiduPushing, setIsBaiduPushing] = useState(false);
  
  // Submission state
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isGenerating: false,
    isSubmitting: false,
    isPinging: false,
    lastGenerated: null,
    lastSubmitted: null,
    results: [],
    error: null,
  });

  // Load submission history
  const loadSubmissionHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('sitemap_submission_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      // Cast data to proper type
      const historyData = (data || []).map(item => ({
        ...item,
        results: (typeof item.results === 'object' ? item.results : {}) as Record<string, unknown>
      }));
      setSubmissionHistory(historyData);
    } catch (error) {
      console.error('Failed to load submission history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  // Load last submission data
  useEffect(() => {
    const loadLastSubmission = async () => {
      const { data } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'last_sitemap_submission')
        .maybeSingle();
      
      if (data?.value) {
        try {
          const parsed = JSON.parse(data.value);
          setSubmissionState(prev => ({
            ...prev,
            lastSubmitted: parsed.submitted_at,
          }));
        } catch (e) {
          console.error('Failed to parse last submission data');
        }
      }
    };
    loadLastSubmission();
    loadSubmissionHistory();
  }, [loadSubmissionHistory]);

  const copyToClipboard = async (text: string, item: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedItem(item);
    toast.success('已复制到剪贴板');
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleDownload = (lang: LanguageCode) => {
    downloadSitemap(lang);
    toast.success(`已下载 sitemap-${lang}.xml`);
  };

  const handleDownloadIndex = () => {
    downloadAllSitemaps();
    toast.success('已下载 sitemap-index.xml');
  };

  const handleDownloadAllFiles = () => {
    const allFiles = getAllSitemaps();
    Object.entries(allFiles).forEach(([filename, content], index) => {
      setTimeout(() => {
        const blob = new Blob([content], { 
          type: filename.endsWith('.xml') ? 'application/xml' : 'text/plain' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }, index * 100);
    });
    toast.success(`开始下载 ${Object.keys(allFiles).length} 个文件`);
  };

  // Generate sitemaps via edge function
  const handleGenerate = async () => {
    setSubmissionState(prev => ({ ...prev, isGenerating: true, error: null }));
    
    try {
      const { data, error } = await supabase.functions.invoke('submit-sitemap', {
        body: { action: 'generate', sendNotify: sendEmailNotify }
      });

      if (error) throw error;

      setSubmissionState(prev => ({
        ...prev,
        isGenerating: false,
        lastGenerated: new Date().toISOString(),
      }));

      loadSubmissionHistory();
      toast.success(`成功生成 ${data.metadata?.languages?.length || 14} 个语言的Sitemap文件`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '生成失败';
      setSubmissionState(prev => ({ ...prev, isGenerating: false, error: errorMessage }));
      toast.error(`生成失败: ${errorMessage}`);
    }
  };

  // Submit sitemaps to search engines (uses stored API keys from database)
  const handleSubmit = async () => {
    setSubmissionState(prev => ({ ...prev, isSubmitting: true, error: null, results: [] }));
    
    try {
      const { data, error } = await supabase.functions.invoke('submit-sitemap', {
        body: { 
          action: 'submit',
          sendNotify: sendEmailNotify,
        }
      });

      if (error) throw error;

      // Parse results
      const results: SubmissionResult[] = Object.entries(data.results || {}).map(([lang, result]: [string, any]) => ({
        lang,
        url: result.url,
        google: result.google || { success: false, message: 'Not attempted' },
        baidu: result.baidu || { success: false, message: 'Not attempted' },
        bing: result.bing || { success: false, message: 'Not attempted' },
      }));

      setSubmissionState(prev => ({
        ...prev,
        isSubmitting: false,
        lastSubmitted: new Date().toISOString(),
        results,
      }));

      loadSubmissionHistory();
      const successCount = results.filter(r => r.google.success || r.baidu.success || r.bing.success).length;
      toast.success(`提交完成: ${successCount}/${results.length} 个语言版本成功提交`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '提交失败';
      setSubmissionState(prev => ({ ...prev, isSubmitting: false, error: errorMessage }));
      toast.error(`提交失败: ${errorMessage}`);
    }
  };

  // Ping search engines
  const handlePing = async () => {
    setSubmissionState(prev => ({ ...prev, isPinging: true, error: null }));
    
    try {
      const { error } = await supabase.functions.invoke('submit-sitemap', {
        body: { action: 'ping' }
      });

      if (error) throw error;

      setSubmissionState(prev => ({ ...prev, isPinging: false }));
      loadSubmissionHistory();
      toast.success('已向搜索引擎发送更新通知');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ping失败';
      setSubmissionState(prev => ({ ...prev, isPinging: false, error: errorMessage }));
      toast.error(`Ping失败: ${errorMessage}`);
    }
  };

  // Push all URLs to Baidu (普通收录 API)
  const handleBaiduPush = async () => {
    setIsBaiduPushing(true);
    try {
      const { data, error } = await supabase.functions.invoke('baidu-push', { body: {} });
      if (error) throw error;
      if (data?.ok) {
        toast.success(`百度推送成功：提交 ${data.pushed} 条，成功 ${data.success ?? 0} 条，今日剩余配额 ${data.remain ?? '—'}`);
      } else {
        throw new Error(data?.error || '推送失败');
      }
      loadSubmissionHistory();
    } catch (err) {
      toast.error(`百度推送失败：${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsBaiduPushing(false);
    }
  };

  // Handle API keys loaded from database
  const handleApiKeysLoaded = (keys: { googleToken: string; baiduToken: string; bingApiKey: string }) => {
    setApiKeys(keys);
  };

  const StatusIcon = ({ success }: { success: boolean }) => {
    return success ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
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
              <h1 className="text-2xl font-bold">多语言SEO管理</h1>
              <p className="text-gray-600">子域名配置、Sitemap生成和自动提交</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownloadIndex} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              下载索引文件
            </Button>
            <Button onClick={handleDownloadAllFiles} className="bg-primary">
              <FolderDown className="h-4 w-4 mr-2" />
              下载全部文件
            </Button>
          </div>
        </div>

        {/* API Keys Manager */}
        <SEOApiKeyManager onKeysLoaded={handleApiKeysLoaded} />

        {/* Auto Submission Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              自动化Sitemap生成与提交
            </CardTitle>
            <CardDescription>
              一键生成所有语言版本的Sitemap，并自动提交到Google、百度、Bing搜索引擎
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Notification Toggle */}
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <input
                type="checkbox"
                id="emailNotify"
                checked={sendEmailNotify}
                onChange={(e) => setSendEmailNotify(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="emailNotify" className="text-sm">
                操作完成后发送邮件通知到管理员邮箱
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleGenerate}
                disabled={submissionState.isGenerating}
                variant="outline"
              >
                {submissionState.isGenerating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                生成Sitemap
              </Button>
              
              <Button 
                onClick={handleSubmit}
                disabled={submissionState.isSubmitting}
                className="bg-primary"
              >
                {submissionState.isSubmitting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                提交到搜索引擎
              </Button>
              
              <Button 
                onClick={handlePing}
                disabled={submissionState.isPinging}
                variant="secondary"
              >
                {submissionState.isPinging ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Ping更新通知
              </Button>

              <Button
                onClick={handleBaiduPush}
                disabled={isBaiduPushing}
                variant="secondary"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isBaiduPushing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                推送到百度（普通收录）
              </Button>
            </div>

            {/* Status Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {submissionState.lastGenerated && (
                <span>最后生成: {new Date(submissionState.lastGenerated).toLocaleString('zh-CN')}</span>
              )}
              {submissionState.lastSubmitted && (
                <span>最后提交: {new Date(submissionState.lastSubmitted).toLocaleString('zh-CN')}</span>
              )}
            </div>

            {/* Error Display */}
            {submissionState.error && (
              <div className="p-3 bg-red-50 rounded-lg flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{submissionState.error}</p>
              </div>
            )}

            {/* Results Display */}
            {submissionState.results.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">提交结果</h4>
                <ScrollArea className="h-[300px] border rounded-lg">
                  <div className="p-4 space-y-3">
                    {submissionState.results.map((result) => (
                      <div 
                        key={result.lang}
                        className="p-3 bg-muted/30 rounded-lg space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{result.lang.toUpperCase()}</Badge>
                            <code className="text-xs text-muted-foreground">{result.url}</code>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <StatusIcon success={result.google.success} />
                            <span>Google</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon success={result.baidu.success} />
                            <span>百度</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon success={result.bing.success} />
                            <span>Bing</span>
                          </div>
                        </div>
                        {(!result.google.success || !result.bing.success) && (
                          <div className="text-xs text-muted-foreground space-y-1">
                            {!result.google.success && result.google.message && (
                              <p>Google: {result.google.message}</p>
                            )}
                            {!result.bing.success && result.bing.message && (
                              <p>Bing: {result.bing.message}</p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submission History */}
        <SitemapSubmissionHistory 
          history={submissionHistory}
          isLoading={isLoadingHistory}
          onRefresh={loadSubmissionHistory}
        />

        {/* Subdomain Configuration */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              子域名配置
            </CardTitle>
            <CardDescription>
              每种语言使用独立子域名，需在DNS和服务器配置对应域名
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {SUPPORTED_LANGUAGES.map(lang => (
                <div
                  key={lang.code}
                  className="p-3 border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium text-sm">{lang.name}</span>
                  </div>
                  <code className="text-xs text-muted-foreground block truncate">
                    {getDomainForLanguage(lang.code).replace('https://', '')}
                  </code>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">DNS配置说明：</p>
                <p>为每个子域名（如 en.caniuav.com, ja.caniuav.com）添加 A 记录或 CNAME 记录，指向您的服务器IP。</p>
                <p className="mt-1">服务器需配置虚拟主机或反向代理，根据子域名设置对应的语言环境变量。</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="sitemap" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sitemap">Sitemap生成</TabsTrigger>
            <TabsTrigger value="hreflang">Hreflang标签</TabsTrigger>
            <TabsTrigger value="robots">Robots.txt</TabsTrigger>
          </TabsList>

          <TabsContent value="sitemap">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  多语言Sitemap
                </CardTitle>
                <CardDescription>
                  为每种语言生成独立的sitemap.xml，包含hreflang交叉引用
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <div
                      key={lang.code}
                      className="p-4 border rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <p className="font-medium">{lang.name}</p>
                          <code className="text-xs text-muted-foreground">
                            sitemap-{lang.code}.xml
                          </code>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(lang.code)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Sitemap索引预览</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generateSitemapIndex(), 'sitemap-index')}
                    >
                      {copiedItem === 'sitemap-index' ? (
                        <Check className="h-4 w-4 mr-1" />
                      ) : (
                        <Copy className="h-4 w-4 mr-1" />
                      )}
                      复制
                    </Button>
                  </div>
                  <ScrollArea className="h-[200px] border rounded-lg">
                    <pre className="p-4 text-xs font-mono">
                      {generateSitemapIndex()}
                    </pre>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hreflang">
            <Card>
              <CardHeader>
                <CardTitle>Hreflang标签实现</CardTitle>
                <CardDescription>
                  MultiLanguageSEO组件自动为所有页面生成hreflang标签
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">选择语言预览：</label>
                  <div className="flex flex-wrap gap-2">
                    {SUPPORTED_LANGUAGES.slice(0, 6).map(lang => (
                      <Button
                        key={lang.code}
                        variant={selectedLang === lang.code ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedLang(lang.code)}
                      >
                        {lang.flag} {lang.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Hreflang标签示例（首页）</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const tags = SUPPORTED_LANGUAGES.map(l => 
                          `<link rel="alternate" hreflang="${getHtmlLang(l.code)}" href="${getDomainForLanguage(l.code)}/" />`
                        ).join('\n') + '\n<link rel="alternate" hreflang="x-default" href="https://www.caniuav.com/en/" />';
                        copyToClipboard(tags, 'hreflang');
                      }}
                    >
                      {copiedItem === 'hreflang' ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      复制
                    </Button>
                  </div>
                  <ScrollArea className="h-[300px] border rounded-lg">
                    <pre className="p-4 text-xs font-mono">
{SUPPORTED_LANGUAGES.map(l => 
  `<link rel="alternate" hreflang="${getHtmlLang(l.code)}" href="${getDomainForLanguage(l.code)}/" />`
).join('\n')}
{'\n<link rel="alternate" hreflang="x-default" href="https://www.caniuav.com/en/" />'}
                    </pre>
                  </ScrollArea>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-800 mb-2">✅ 组件使用方式</p>
                  <code className="block bg-white p-3 rounded text-sm font-mono">
{`import { MultiLanguageSEO } from '@/components/MultiLanguageSEO';

<MultiLanguageSEO
  title="首页"
  description="CANI科技..."
  path="/"
/>`}
                  </code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="robots">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Robots.txt配置
                </CardTitle>
                <CardDescription>
                  每个子域名需要独立的robots.txt文件
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">选择语言：</label>
                  <div className="flex flex-wrap gap-2">
                    {SUPPORTED_LANGUAGES.slice(0, 6).map(lang => (
                      <Button
                        key={lang.code}
                        variant={selectedLang === lang.code ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedLang(lang.code)}
                      >
                        {lang.flag} {lang.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">robots.txt 内容 ({selectedLang})</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generateRobotsTxt(selectedLang), 'robots')}
                    >
                      {copiedItem === 'robots' ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      复制
                    </Button>
                  </div>
                  <ScrollArea className="h-[250px] border rounded-lg">
                    <pre className="p-4 text-xs font-mono">
                      {generateRobotsTxt(selectedLang)}
                    </pre>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>实施步骤</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">1</Badge>
              <p><strong>DNS配置</strong>：为每种语言添加子域名记录（en.caniuav.com, ja.caniuav.com 等）</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">2</Badge>
              <p><strong>服务器配置</strong>：设置虚拟主机或CDN规则，根据子域名返回对应语言版本</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">3</Badge>
              <p><strong>部署Sitemap</strong>：将生成的sitemap文件放置在每个子域名的根目录</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">4</Badge>
              <p><strong>配置API密钥</strong>：在上方填入Google/百度/Bing的API密钥实现自动提交</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">5</Badge>
              <p><strong>一键提交</strong>：点击"提交到搜索引擎"按钮自动提交所有语言版本的Sitemap</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SEOManagement;
