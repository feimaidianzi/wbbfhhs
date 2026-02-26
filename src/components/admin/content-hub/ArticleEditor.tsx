import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ArrowLeft, Save, Loader2, Sparkles, ExternalLink, FileText,
  Scissors, TrendingUp, HelpCircle, Type, Eye, Image, Download,
  Send, RefreshCw, Zap, Expand, Eraser, Bot, ImagePlus, Lock,
  Unlock, AlertTriangle, Tag, Globe, ShieldCheck
} from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import SingleImageUpload from '@/components/admin/SingleImageUpload';

interface Article {
  id: string;
  title: string;
  summary: string | null;
  content: string;
  cover_image: string | null;
  author_name: string | null;
  category: string | null;
  is_published: boolean;
  source_url: string | null;
  source_name: string | null;
  original_title: string | null;
  keywords: string[] | null;
  review_status: string | null;
  ai_edited: boolean | null;
  created_at: string;
}

interface ArticleEditorProps {
  article: Article | null;
  onBack: () => void;
  onSaved: () => void;
  currentUserId: string | null;
}

const AI_TOOLS = [
  { label: '缩短篇幅', icon: Scissors, prompt: '请将文章精简至原来的60%长度，保留核心信息和关键数据' },
  { label: '增加深度', icon: TrendingUp, prompt: '请增加更多技术细节和专业分析，引用CANI产品参数，添加对比表格和Mermaid流程图代码' },
  { label: '优化标题', icon: Type, prompt: '请为这篇文章生成3个更具SEO吸引力的标题备选，标题需包含CANI品牌词和核心产品型号' },
  { label: '生成FAQ', icon: HelpCircle, prompt: '请根据文章内容生成3-5个常见问题和答案（FAQ），使用JSON-LD格式的FAQPage Schema标记' },
  { label: '自动配图', icon: Image, prompt: '请根据文章标题和内容，为文章中的关键段落建议合适的配图描述，并搜索相关的免版权图片' },
  { label: '图片本地化', icon: Download, prompt: '请将文章中所有外部图片下载到本地存储，替换为本地链接，并自动生成SEO友好的alt标签' },
];

const DOUBAO_POWER_TOOLS = [
  {
    label: '豆包一键扩写',
    icon: Expand,
    description: '素材太短？AI根据知识库自动填充技术细节至800字+',
    prompt: '这篇文章内容过短，请根据CANI核心知识库中的产品参数和技术细节，将文章扩写至800字以上。要求：1)补充相关的技术参数对比表格 2)添加应用场景描述 3)加入"CANI视角"专家点评段落 4)确保SEO关键词密度达标（CANI、图传、VTX等）5)保持原文核心观点不变',
  },
  {
    label: '豆包智能修图',
    icon: Eraser,
    description: '一键擦除图片水印/Logo，重绘为CANI原创',
    action: 'image-inpaint',
  },
];

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  '技术分享': { label: '技术', color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  '行业动态': { label: '动态', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  '公司新闻': { label: '公司', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
};

// 分类专用基调选项
const TONE_OPTIONS: Record<string, { value: string; label: string; icon: string }[]> = {
  '公司新闻': [
    { value: '严谨', label: '严谨', icon: '🔬' },
    { value: '振奋', label: '振奋', icon: '🚀' },
  ],
  '行业动态': [
    { value: '中立', label: '中立', icon: '⚖️' },
    { value: '专业分析', label: '专业分析', icon: '📊' },
  ],
  '技术分享': [
    { value: '严谨', label: '严谨', icon: '🔬' },
    { value: '专业分析', label: '专业分析', icon: '📊' },
  ],
};

// 分类专用参数核对项（公司新闻重点核对）
const PARAM_CHECK_ITEMS: Record<string, string[]> = {
  '公司新闻': ['图传延迟 <30ms', '4K传输', 'AES-256-GCM加密', 'F7/H7芯片', '双冗余IMU', 'ELRS 50km+', 'BLHeli_32 48KHz', 'IP67', '4K 40x变焦'],
  '行业动态': [],
  '技术分享': ['图传延迟 <30ms', 'F7/H7芯片', 'BLHeli_32 48KHz', 'ELRS 500Hz', '双频RTK'],
};

export const ArticleEditor = ({ article, onBack, onSaved, currentUserId }: ArticleEditorProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [coverGenerating, setCoverGenerating] = useState(false);
  const [rewriteStatus, setRewriteStatus] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string>('');
  const [lockedParams, setLockedParams] = useState<string[]>([]);
  const [newLockedParam, setNewLockedParam] = useState('');
  const [factCheckNotes, setFactCheckNotes] = useState<string | null>(null);
  const [autoClassifyResult, setAutoClassifyResult] = useState<{ category: string; confidence: number } | null>(null);

  const [form, setForm] = useState({
    title: article?.title || '',
    summary: article?.summary || '',
    content: article?.content || '',
    cover_image: article?.cover_image || '',
    author_name: article?.author_name || '',
    category: article?.category || '公司新闻',
    is_published: article?.is_published || false,
  });

  // Auto-classify on load for new articles or when content changes significantly
  useEffect(() => {
    if (article && form.content.length > 100) {
      const text = `${form.title} ${form.content.replace(/<[^>]*>/g, '').substring(0, 500)}`;
      // Simple client-side pre-check
      const hasCANI = /CANI|长凌|我们的|自主研发/i.test(text);
      const hasIndustry = /FAA|DJI|大疆|政策|市场规模|融资|监管/i.test(text);
      const hasTech = /教程|原理|对比测试|调参|PID|协议/i.test(text);
      
      if (hasCANI && !hasIndustry) setAutoClassifyResult({ category: '公司新闻', confidence: 0.8 });
      else if (hasIndustry && !hasCANI) setAutoClassifyResult({ category: '行业动态', confidence: 0.7 });
      else if (hasTech) setAutoClassifyResult({ category: '技术分享', confidence: 0.6 });
    }
  }, []);

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast({ title: '标题和内容不能为空', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      const data = {
        title: form.title.trim(),
        summary: form.summary.trim() || null,
        content: form.content.trim(),
        cover_image: form.cover_image.trim() || null,
        author_name: form.author_name.trim() || null,
        category: form.category,
        is_published: form.is_published,
        published_at: form.is_published ? new Date().toISOString() : null,
        author_id: currentUserId,
        review_status: 'approved',
        reviewed_at: new Date().toISOString(),
        reviewed_by: currentUserId,
      };

      if (article) {
        const { error } = await supabase.from('news_articles').update(data).eq('id', article.id);
        if (error) throw error;
        toast({ title: '文章已更新' });
      } else {
        const { error } = await supabase.from('news_articles').insert(data);
        if (error) throw error;
        toast({ title: '文章已创建' });
      }
      onSaved();
    } catch (err: any) {
      toast({ title: '保存失败', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handlePublishAndPush = async () => {
    if (!article?.id) {
      toast({ title: '请先保存文章', variant: 'destructive' });
      return;
    }
    setPublishing(true);
    try {
      const { error: pubErr } = await supabase.from('news_articles').update({
        is_published: true,
        published_at: new Date().toISOString(),
        review_status: 'approved',
      }).eq('id', article.id);
      if (pubErr) throw pubErr;

      try {
        await supabase.functions.invoke('submit-sitemap', {
          body: { action: 'ping', languages: ['zh', 'en'] },
        });
      } catch { /* non-critical */ }

      setForm(prev => ({ ...prev, is_published: true }));
      toast({ title: '🚀 已发布并推送索引', description: '文章已同步到前台，索引已提交' });
    } catch (err: any) {
      toast({ title: '发布失败', description: err.message, variant: 'destructive' });
    } finally {
      setPublishing(false);
    }
  };

  const handleAITool = async (prompt: string) => {
    if (!article?.id) {
      toast({ title: '请先保存文章再使用AI工具', variant: 'destructive' });
      return;
    }
    setAiProcessing(true);
    try {
      const response = await supabase.functions.invoke('ai-modify-article', {
        body: { articleId: article.id, modificationRequest: prompt, modifyImages: prompt.includes('图片') },
      });
      if (response.error) throw new Error(response.error.message);
      toast({ title: 'AI修改完成', description: response.data?.changes || '文章已更新' });
      const { data: refreshed } = await supabase.from('news_articles').select('*').eq('id', article.id).single();
      if (refreshed) {
        setForm({
          title: refreshed.title,
          summary: refreshed.summary || '',
          content: refreshed.content,
          cover_image: refreshed.cover_image || '',
          author_name: refreshed.author_name || '',
          category: refreshed.category || '公司新闻',
          is_published: refreshed.is_published,
        });
      }
    } catch (err: any) {
      toast({ title: 'AI处理失败', description: err.message, variant: 'destructive' });
    } finally {
      setAiProcessing(false);
    }
  };

  // ========== 流式洗稿：打字机效果 + 异步封面生成 ==========
  const handleStreamingRewrite = useCallback(async () => {
    if (!article?.id) {
      toast({ title: '请先保存文章再使用AI洗稿', variant: 'destructive' });
      return;
    }
    setAiProcessing(true);
    setRewriteStatus('connecting');
    setCoverGenerating(false);
    setFactCheckNotes(null);

    try {
      const FUNC_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-rewrite-article`;
      const { data: { session } } = await supabase.auth.getSession();
      
      const resp = await fetch(FUNC_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          category: form.category,
          coverImage: form.cover_image,
          isEnglish: /[a-zA-Z]{10,}/.test(form.content.substring(0, 200)),
          stream: true,
          tone: selectedTone || undefined,
          lockedParams: lockedParams.length > 0 ? lockedParams : undefined,
        }),
      });

      if (!resp.ok || !resp.body) throw new Error(`API error: ${resp.status}`);

      setRewriteStatus('streaming');
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            
            if (parsed.type === 'text') {
              // Streaming text accumulation
            } else if (parsed.type === 'status') {
              if (parsed.message === 'parsing') setRewriteStatus('解析中...');
              else if (parsed.message === 'generating_cover') {
                setRewriteStatus('🎨 生成AI封面图...');
                setCoverGenerating(true);
              } else if (parsed.message === 'cover_failed') {
                setCoverGenerating(false);
                toast({ title: '封面图生成失败', description: '已保留原封面', variant: 'destructive' });
              }
            } else if (parsed.type === 'result' && parsed.data) {
              setForm(prev => ({
                ...prev,
                title: parsed.data.title || prev.title,
                summary: parsed.data.summary || prev.summary,
                content: parsed.data.content || prev.content,
              }));
              // Capture fact-check notes and auto-category
              if (parsed.data.fact_check_notes) {
                setFactCheckNotes(parsed.data.fact_check_notes);
              }
              if (parsed.data.auto_category && parsed.data.auto_category !== form.category) {
                setAutoClassifyResult({ category: parsed.data.auto_category, confidence: 0.9 });
              }
              setRewriteStatus('✨ 文字创作完成，等待封面...');
            } else if (parsed.type === 'cover' && parsed.url) {
              setForm(prev => ({ ...prev, cover_image: parsed.url }));
              setCoverGenerating(false);
              toast({ title: '🎨 AI原创封面图已生成' });
            } else if (parsed.type === 'error') {
              throw new Error(parsed.message);
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
      }

      setRewriteStatus(null);
      toast({ title: '✨ AI洗稿完成', description: '文章已重新创作，请检查后保存' });
    } catch (err: any) {
      toast({ title: '洗稿失败', description: err.message, variant: 'destructive' });
      setRewriteStatus(null);
      setCoverGenerating(false);
    } finally {
      setAiProcessing(false);
    }
  }, [article?.id, form.title, form.content, form.category, form.cover_image, selectedTone, lockedParams, toast]);

  const handleImageLocalize = async () => {
    if (!article?.id) return;
    setAiProcessing(true);
    try {
      const response = await supabase.functions.invoke('process-news-images', {
        body: { action: 'process-article', articleId: article.id },
      });
      if (response.error) throw new Error(response.error.message);
      toast({ title: '图片本地化完成', description: `处理了 ${response.data?.processedCount || 0} 张图片` });
      const { data: refreshed } = await supabase.from('news_articles').select('*').eq('id', article.id).single();
      if (refreshed) {
        setForm(prev => ({ ...prev, content: refreshed.content, cover_image: refreshed.cover_image || '' }));
      }
    } catch (err: any) {
      toast({ title: '图片处理失败', description: err.message, variant: 'destructive' });
    } finally {
      setAiProcessing(false);
    }
  };

  const addLockedParam = () => {
    if (newLockedParam.trim() && !lockedParams.includes(newLockedParam.trim())) {
      setLockedParams(prev => [...prev, newLockedParam.trim()]);
      setNewLockedParam('');
    }
  };

  const removeLockedParam = (param: string) => {
    setLockedParams(prev => prev.filter(p => p !== param));
  };

  // Extract numbers/params from content for quick-lock
  const extractParams = (): string[] => {
    const text = form.content.replace(/<[^>]*>/g, '');
    const patterns = [
      /\d+(?:\.\d+)?(?:km|m|ms|Hz|KHz|MHz|GHz|W|A|V|dBm|fps|Mbps|Gbps|TOPS|℃|°C)/gi,
      /(?:F7|H7|STM32|BLHeli_32|AES-256|IP67|IP65|COFDM|ELRS|MAVLink|DShot)/gi,
    ];
    const found = new Set<string>();
    for (const p of patterns) {
      const matches = text.match(p);
      if (matches) matches.forEach(m => found.add(m));
    }
    return Array.from(found).slice(0, 15);
  };

  // Keyword density & stats
  const contentText = form.content.replace(/<[^>]*>/g, '');
  const wordCount = contentText.length;
  const keywordChecks = [
    { word: 'CANI', count: (contentText.match(/CANI/gi) || []).length },
    { word: '图传', count: (contentText.match(/图传/g) || []).length },
    { word: 'VTX', count: (contentText.match(/VTX/gi) || []).length },
    { word: '飞控', count: (contentText.match(/飞控/g) || []).length },
    { word: 'ELRS', count: (contentText.match(/ELRS/gi) || []).length },
  ];

  const toneOptions = TONE_OPTIONS[form.category] || TONE_OPTIONS['行业动态'];
  const paramChecks = PARAM_CHECK_ITEMS[form.category] || [];

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-1" />返回
          </Button>
          <div className="h-5 w-px bg-slate-700" />
          {/* Category Switcher */}
          <div className="flex items-center gap-1">
            {Object.entries(CATEGORY_LABELS).map(([cat, meta]) => (
              <Button
                key={cat}
                variant={form.category === cat ? 'default' : 'ghost'}
                size="sm"
                onClick={() => { setForm({ ...form, category: cat }); setSelectedTone(''); }}
                className={form.category === cat
                  ? 'h-7 text-[11px] bg-slate-600 text-white'
                  : 'h-7 text-[11px] text-slate-500 hover:text-white'}
              >
                {cat}
              </Button>
            ))}
          </div>
          {/* Auto-classify suggestion */}
          {autoClassifyResult && autoClassifyResult.category !== form.category && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost" size="sm"
                    onClick={() => { setForm({ ...form, category: autoClassifyResult.category }); setAutoClassifyResult(null); }}
                    className="h-7 text-[10px] text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    建议: {autoClassifyResult.category} ({Math.round(autoClassifyResult.confidence * 100)}%)
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-700 text-slate-200 border-slate-600">
                  <p className="text-xs">AI根据内容自动判断，点击应用此分类</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {/* Tone Selector */}
          <div className="h-5 w-px bg-slate-700" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-500">基调:</span>
            {toneOptions.map(t => (
              <Button
                key={t.value}
                variant={selectedTone === t.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTone(selectedTone === t.value ? '' : t.value)}
                className={selectedTone === t.value
                  ? 'h-6 text-[10px] bg-violet-600 text-white px-2'
                  : 'h-6 text-[10px] text-slate-500 hover:text-white px-2'}
              >
                {t.icon} {t.label}
              </Button>
            ))}
          </div>
          {article?.ai_edited && (
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px]">
              <Sparkles className="w-3 h-3 mr-1" />AI已编辑
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-3">
            <Switch checked={form.is_published} onCheckedChange={c => setForm({ ...form, is_published: c })} id="pub" />
            <Label htmlFor="pub" className="text-xs text-slate-400">发布</Label>
          </div>
          <Button size="sm" onClick={handleSave} disabled={saving} className="bg-slate-600 hover:bg-slate-500 h-8">
            {saving ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1" />}
            保存
          </Button>
        </div>
      </div>

      {/* Three-panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Reference Panel */}
        {article?.source_url && (
          <div className="w-64 border-r border-slate-700 bg-slate-800/30 flex flex-col">
            <div className="px-3 py-2 border-b border-slate-700">
              <h3 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />参考源
              </h3>
            </div>
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {article.source_url && (
                  <div>
                    <p className="text-[10px] text-slate-500 mb-1">原始链接</p>
                    <a href={article.source_url} target="_blank" rel="noopener noreferrer"
                      className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 break-all">
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      {article.source_name || article.source_url}
                    </a>
                  </div>
                )}
                {article.original_title && (
                  <div>
                    <p className="text-[10px] text-slate-500 mb-1">原始标题</p>
                    <p className="text-[11px] text-slate-300">{article.original_title}</p>
                  </div>
                )}
                {article.keywords && article.keywords.length > 0 && (
                  <div>
                    <p className="text-[10px] text-slate-500 mb-1">提取关键词</p>
                    <div className="flex flex-wrap gap-1">
                      {article.keywords.map((kw, i) => (
                        <Badge key={i} className="bg-slate-700/50 text-slate-300 text-[9px] px-1.5 py-0">{kw}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {/* Fact Check Notes from AI */}
                {factCheckNotes && (
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-[10px] text-amber-400 mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />AI自检报告
                    </p>
                    <p className="text-[10px] text-amber-300/80 leading-relaxed">{factCheckNotes}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Center: Main Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-3xl mx-auto space-y-4 pb-20">
              <Input
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="输入文章标题..."
                className="bg-slate-700/50 border-slate-600 text-lg font-semibold h-12"
              />
              <Textarea
                value={form.summary}
                onChange={e => setForm({ ...form, summary: e.target.value })}
                placeholder="摘要（可选）"
                className="bg-slate-700/50 border-slate-600 min-h-[60px] text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  value={form.author_name}
                  onChange={e => setForm({ ...form, author_name: e.target.value })}
                  placeholder="作者"
                  className="bg-slate-700/50 border-slate-600 text-sm h-9"
                />
                <div className="relative">
                  <SingleImageUpload
                    image={form.cover_image}
                    onImageChange={img => setForm({ ...form, cover_image: img })}
                    folder="news"
                  />
                  {coverGenerating && (
                    <div className="absolute inset-0 bg-slate-900/80 rounded-lg flex flex-col items-center justify-center gap-1.5 z-10">
                      <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                      <span className="text-[10px] text-amber-300">AI 封面生成中...</span>
                    </div>
                  )}
                </div>
              </div>
              <RichTextEditor
                content={form.content}
                onChange={content => setForm({ ...form, content })}
              />
            </div>
          </ScrollArea>

          {/* Floating Action Bar */}
          <div className="border-t border-slate-700 bg-slate-800/90 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm" variant="outline"
                disabled={aiProcessing || !article?.id}
                onClick={handleStreamingRewrite}
                className="h-8 text-[10px] border-violet-500/40 text-violet-300 hover:text-violet-200 hover:bg-violet-500/10 font-medium"
              >
                {aiProcessing && rewriteStatus ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                )}
                {rewriteStatus || '🤖 AI洗稿 + 封面'}
              </Button>
              <div className="h-4 w-px bg-slate-700" />
              <Button
                size="sm" variant="outline"
                disabled={aiProcessing || !article?.id}
                onClick={() => handleAITool(DOUBAO_POWER_TOOLS[0].prompt!)}
                className="h-7 text-[10px] border-amber-500/30 text-amber-300 hover:text-amber-200 hover:bg-amber-500/10"
              >
                <Expand className="w-3 h-3 mr-1" />扩写
              </Button>
              <Button
                size="sm" variant="outline"
                disabled={aiProcessing || !article?.id}
                onClick={() => handleAITool('请根据文章内容生成3-5个常见问题和答案（FAQ），使用JSON-LD格式的FAQPage Schema标记，追加在文末')}
                className="h-7 text-[10px] border-slate-700 text-slate-300 hover:text-white"
              >
                <HelpCircle className="w-3 h-3 mr-1" />FAQ
              </Button>
              <Button
                size="sm" variant="outline"
                disabled={aiProcessing || !article?.id}
                onClick={handleImageLocalize}
                className="h-7 text-[10px] border-slate-700 text-slate-300 hover:text-white"
              >
                <Download className="w-3 h-3 mr-1" />图片本地化
              </Button>
            </div>
            <Button
              size="sm"
              disabled={publishing || !article?.id}
              onClick={handlePublishAndPush}
              className="h-8 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
            >
              {publishing ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Send className="w-3.5 h-3.5 mr-1" />}
              一键发布并推送
            </Button>
          </div>
        </div>

        {/* Right: SEO & AI Toolbox */}
        <div className="w-72 border-l border-slate-700 bg-slate-800/30 flex flex-col">
          <div className="px-3 py-2 border-b border-slate-700">
            <h3 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />AI & SEO 工具箱
            </h3>
          </div>
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-4">
              {/* 🔒 Parameter Lock (公司新闻 & 技术分享 重点) */}
              {(form.category === '公司新闻' || form.category === '技术分享') && (
                <div>
                  <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1">
                    <Lock className="w-3 h-3" />参数锁定
                  </p>
                  <p className="text-[9px] text-slate-600 mb-2">锁定的参数在AI处理时不会被修改</p>
                  {/* Quick-lock from content */}
                  {extractParams().length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {extractParams().filter(p => !lockedParams.includes(p)).slice(0, 8).map(param => (
                        <Button
                          key={param}
                          variant="ghost"
                          size="sm"
                          onClick={() => setLockedParams(prev => [...prev, param])}
                          className="h-5 text-[9px] text-slate-500 hover:text-amber-300 hover:bg-amber-500/10 px-1.5 py-0"
                        >
                          <Unlock className="w-2.5 h-2.5 mr-0.5" />{param}
                        </Button>
                      ))}
                    </div>
                  )}
                  {/* Locked params */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {lockedParams.map(param => (
                      <Badge
                        key={param}
                        className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[9px] px-1.5 py-0 cursor-pointer hover:bg-red-500/20 hover:text-red-300"
                        onClick={() => removeLockedParam(param)}
                      >
                        <Lock className="w-2.5 h-2.5 mr-0.5" />{param} ×
                      </Badge>
                    ))}
                  </div>
                  {/* Manual add */}
                  <div className="flex gap-1">
                    <Input
                      value={newLockedParam}
                      onChange={e => setNewLockedParam(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addLockedParam()}
                      placeholder="手动添加参数..."
                      className="h-6 text-[10px] bg-slate-700 border-slate-600 flex-1"
                    />
                    <Button size="sm" onClick={addLockedParam} className="h-6 w-6 p-0 bg-slate-700 hover:bg-slate-600">
                      <Lock className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}

              {/* 📋 Param Check Table (公司新闻) */}
              {form.category === '公司新闻' && paramChecks.length > 0 && (
                <div>
                  <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />参数核对表
                  </p>
                  <div className="space-y-1">
                    {paramChecks.map(param => {
                      const found = contentText.includes(param.split(' ')[0]) || contentText.toLowerCase().includes(param.toLowerCase().split(' ')[0]);
                      return (
                        <div key={param} className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${found ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                          <span className={`text-[10px] ${found ? 'text-slate-300' : 'text-slate-500'}`}>{param}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 🌐 Source Tracing (行业动态) */}
              {form.category === '行业动态' && article?.source_url && (
                <div>
                  <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1">
                    <Globe className="w-3 h-3" />全球信源追溯
                  </p>
                  <div className="p-2 rounded-lg bg-slate-700/30 border border-slate-700/50 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1 py-0">主源</Badge>
                      <a href={article.source_url} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] text-amber-400 hover:text-amber-300 truncate flex-1">
                        {article.source_name || new URL(article.source_url).hostname}
                      </a>
                    </div>
                    {article.original_title && (
                      <p className="text-[9px] text-slate-500 italic">"{article.original_title}"</p>
                    )}
                    <p className="text-[9px] text-slate-600">💡 行业动态应综合3-5个信源。AI洗稿时会自动补充行业背景分析。</p>
                  </div>
                </div>
              )}

              {/* AI Quick Tools */}
              <div>
                <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">AI 修改器</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {AI_TOOLS.map(tool => (
                    <Button
                      key={tool.label}
                      variant="outline"
                      size="sm"
                      disabled={aiProcessing || !article?.id}
                      onClick={() => tool.label === '图片本地化' ? handleImageLocalize() : handleAITool(tool.prompt)}
                      className="h-8 text-[10px] border-slate-700 text-slate-300 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 justify-start"
                    >
                      <tool.icon className="w-3 h-3 mr-1 flex-shrink-0" />
                      {tool.label}
                    </Button>
                  ))}
                </div>
                {aiProcessing && (
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-violet-400">
                    <Loader2 className="w-3 h-3 animate-spin" />AI处理中...
                  </div>
                )}
              </div>

              {/* Doubao Power Tools */}
              <div>
                <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1">
                  <Bot className="w-3 h-3" />豆包黑科技
                </p>
                <div className="space-y-1.5">
                  {DOUBAO_POWER_TOOLS.map(tool => (
                    <Button
                      key={tool.label}
                      variant="outline"
                      size="sm"
                      disabled={aiProcessing || !article?.id}
                      onClick={() => tool.action === 'image-inpaint' ? handleImageLocalize() : handleAITool(tool.prompt!)}
                      className="w-full h-auto py-2 text-[10px] border-amber-500/20 text-amber-300 hover:text-amber-200 hover:border-amber-500/40 hover:bg-amber-500/10 justify-start flex-col items-start gap-0.5"
                    >
                      <span className="flex items-center gap-1">
                        <tool.icon className="w-3 h-3 flex-shrink-0" />
                        {tool.label}
                      </span>
                      <span className="text-[9px] text-slate-500 font-normal">{tool.description}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Keyword Density */}
              <div>
                <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">关键词密度</p>
                <div className="space-y-1">
                  {keywordChecks.map(kc => (
                    <div key={kc.word} className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{kc.word}</span>
                      <Badge className={`text-[9px] px-1.5 py-0 ${kc.count > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700/50 text-slate-500'}`}>
                        {kc.count}次
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Stats */}
              <div>
                <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">内容统计</p>
                <div className="space-y-1 text-[11px] text-slate-400">
                  <div className="flex justify-between">
                    <span>字数</span>
                    <span className="text-slate-300">{wordCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>标题长度</span>
                    <span className={form.title.length > 60 ? 'text-amber-400' : 'text-slate-300'}>
                      {form.title.length}/60
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>摘要长度</span>
                    <span className={form.summary.length > 160 ? 'text-amber-400' : 'text-slate-300'}>
                      {form.summary.length}/160
                    </span>
                  </div>
                </div>
              </div>

              {/* SEO Quality Indicators */}
              <div>
                <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">SEO 质量</p>
                <div className="space-y-1.5">
                  {[
                    { label: '标题含品牌词', pass: /CANI/i.test(form.title) },
                    { label: '摘要已填写', pass: form.summary.length > 20 },
                    { label: '正文>500字', pass: wordCount > 500 },
                    { label: '封面图已设置', pass: !!form.cover_image },
                    { label: '含技术参数表', pass: /<table/i.test(form.content) },
                    ...(form.category === '行业动态' ? [{ label: '含【CANI视点】', pass: /CANI视点|CANI观点/i.test(contentText) }] : []),
                    ...(form.category === '公司新闻' ? [{ label: '含CTA转化框', pass: /获取报价|联系我们|contact/i.test(contentText) }] : []),
                  ].map(check => (
                    <div key={check.label} className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${check.pass ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                      <span className={`text-[10px] ${check.pass ? 'text-slate-300' : 'text-slate-500'}`}>{check.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Link */}
              {article?.id && (
                <a href={`/news/${article.id}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full h-8 text-[10px] border-slate-700 text-slate-300">
                    <Eye className="w-3 h-3 mr-1" />预览文章
                  </Button>
                </a>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
