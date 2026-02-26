import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft, Save, Loader2, Sparkles, ExternalLink, FileText,
  Scissors, TrendingUp, HelpCircle, Type, Eye, Image, Download,
  Send, RefreshCw, Zap
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
  { label: '增加深度', icon: TrendingUp, prompt: '请增加更多技术细节和专业分析，引用CANI产品参数' },
  { label: '优化标题', icon: Type, prompt: '请为这篇文章生成3个更具SEO吸引力的标题备选' },
  { label: '生成FAQ', icon: HelpCircle, prompt: '请根据文章内容生成3-5个常见问题和答案（FAQ），使用JSON-LD格式的FAQPage Schema标记' },
  { label: '自动配图', icon: Image, prompt: '请根据文章标题和内容，为文章中的关键段落建议合适的配图描述，并搜索相关的免版权图片' },
  { label: '图片本地化', icon: Download, prompt: '请将文章中所有外部图片下载到本地存储，替换为本地链接，并自动生成SEO友好的alt标签' },
];

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  '技术分享': { label: '技术', color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  '行业动态': { label: '动态', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  '公司新闻': { label: '公司', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
};

export const ArticleEditor = ({ article, onBack, onSaved, currentUserId }: ArticleEditorProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [form, setForm] = useState({
    title: article?.title || '',
    summary: article?.summary || '',
    content: article?.content || '',
    cover_image: article?.cover_image || '',
    author_name: article?.author_name || '',
    category: article?.category || '公司新闻',
    is_published: article?.is_published || false,
  });

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
      // 1. Publish article
      const { error: pubErr } = await supabase.from('news_articles').update({
        is_published: true,
        published_at: new Date().toISOString(),
        review_status: 'approved',
      }).eq('id', article.id);
      if (pubErr) throw pubErr;

      // 2. Submit to search engine index
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

  const catMeta = CATEGORY_LABELS[form.category] || CATEGORY_LABELS['公司新闻'];

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-1" />返回
          </Button>
          <div className="h-5 w-px bg-slate-700" />
          {/* Category Switcher - switching reloads AI context */}
          <div className="flex items-center gap-1">
            {Object.entries(CATEGORY_LABELS).map(([cat, meta]) => (
              <Button
                key={cat}
                variant={form.category === cat ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setForm({ ...form, category: cat })}
                className={form.category === cat
                  ? 'h-7 text-[11px] bg-slate-600 text-white'
                  : 'h-7 text-[11px] text-slate-500 hover:text-white'}
              >
                {cat}
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
                <SingleImageUpload
                  image={form.cover_image}
                  onImageChange={img => setForm({ ...form, cover_image: img })}
                  folder="news"
                />
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
                onClick={() => handleAITool('请根据文章内容生成3-5个常见问题和答案（FAQ），使用JSON-LD格式的FAQPage Schema标记，追加在文末')}
                className="h-7 text-[10px] border-slate-700 text-slate-300 hover:text-white"
              >
                <HelpCircle className="w-3 h-3 mr-1" />生成 FAQ
              </Button>
              <Button
                size="sm" variant="outline"
                disabled={aiProcessing || !article?.id}
                onClick={handleImageLocalize}
                className="h-7 text-[10px] border-slate-700 text-slate-300 hover:text-white"
              >
                <Download className="w-3 h-3 mr-1" />图片本地化
              </Button>
              {aiProcessing && (
                <div className="flex items-center gap-1.5 text-[10px] text-violet-400">
                  <Loader2 className="w-3 h-3 animate-spin" />处理中...
                </div>
              )}
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
        <div className="w-64 border-l border-slate-700 bg-slate-800/30 flex flex-col">
          <div className="px-3 py-2 border-b border-slate-700">
            <h3 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />AI & SEO 工具箱
            </h3>
          </div>
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-4">
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
