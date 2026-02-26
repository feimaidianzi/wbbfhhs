import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft, Save, Loader2, Sparkles, ExternalLink, FileText,
  Scissors, TrendingUp, HelpCircle, Type, Image, X, Eye
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
  article: Article | null; // null = create new
  onBack: () => void;
  onSaved: () => void;
  currentUserId: string | null;
}

const AI_TOOLS = [
  { label: '缩短篇幅', icon: Scissors, prompt: '请将文章精简至原来的60%长度，保留核心信息和关键数据' },
  { label: '增加深度', icon: TrendingUp, prompt: '请增加更多技术细节和专业分析，引用CANI产品参数' },
  { label: '优化标题', icon: Type, prompt: '请为这篇文章生成3个更具SEO吸引力的标题备选' },
  { label: '生成FAQ', icon: HelpCircle, prompt: '请根据文章内容生成3-5个常见问题和答案（FAQ）' },
];

export const ArticleEditor = ({ article, onBack, onSaved, currentUserId }: ArticleEditorProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);

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

  const handleAITool = async (prompt: string) => {
    if (!article?.id) {
      toast({ title: '请先保存文章再使用AI工具', variant: 'destructive' });
      return;
    }
    setAiProcessing(true);
    try {
      const response = await supabase.functions.invoke('ai-modify-article', {
        body: { articleId: article.id, modificationRequest: prompt, modifyImages: false },
      });
      if (response.error) throw new Error(response.error.message);
      toast({ title: 'AI修改完成', description: response.data?.changes || '文章已更新' });
      // Reload article content
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

  // Count keyword density
  const contentText = form.content.replace(/<[^>]*>/g, '');
  const wordCount = contentText.length;
  const keywordChecks = [
    { word: 'CANI', count: (contentText.match(/CANI/gi) || []).length },
    { word: '图传', count: (contentText.match(/图传/g) || []).length },
    { word: 'VTX', count: (contentText.match(/VTX/gi) || []).length },
    { word: '飞控', count: (contentText.match(/飞控/g) || []).length },
    { word: 'ELRS', count: (contentText.match(/ELRS/gi) || []).length },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-1" />返回
          </Button>
          <div className="h-5 w-px bg-slate-700" />
          <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
            <SelectTrigger className="w-28 h-8 text-xs bg-slate-700 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="公司新闻">公司新闻</SelectItem>
              <SelectItem value="行业动态">行业动态</SelectItem>
              <SelectItem value="技术分享">技术分享</SelectItem>
            </SelectContent>
          </Select>
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
          <Button size="sm" onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600 h-8">
            {saving ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1" />}
            保存
          </Button>
        </div>
      </div>

      {/* Three-panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Reference Panel */}
        {article?.source_url && (
          <div className="w-64 border-r border-slate-700 bg-slate-850 flex flex-col">
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
            <div className="max-w-3xl mx-auto space-y-4">
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
        </div>

        {/* Right: SEO & AI Toolbox */}
        <div className="w-64 border-l border-slate-700 bg-slate-850 flex flex-col">
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
                      onClick={() => handleAITool(tool.prompt)}
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
