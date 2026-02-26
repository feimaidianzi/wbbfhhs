import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2, Eye, EyeOff, Trash2, Sparkles, CheckCircle, XCircle, Clock,
  ArrowRight, GripVertical, FileText, Rss, Globe, Bot, LayoutGrid
} from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Article {
  id: string;
  title: string;
  summary: string | null;
  category: string | null;
  review_status: string | null;
  is_published: boolean;
  ai_edited: boolean | null;
  is_auto_generated: boolean | null;
  source_url: string | null;
  created_at: string;
  cover_image: string | null;
}

interface PipelineViewProps {
  articles: Article[];
  onRefresh: () => void;
  onEditArticle: (article: Article) => void;
  onAIModify: (article: Article) => void;
  categoryFilter: string;
  onCategoryFilterChange: (cat: string) => void;
}

const CATEGORIES = [
  { value: "全部", label: "全部", icon: LayoutGrid, color: "text-slate-400" },
  { value: "公司新闻", label: "公司新闻", icon: Rss, color: "text-blue-400" },
  { value: "行业动态", label: "行业动态", icon: Globe, color: "text-emerald-400" },
  { value: "技术分享", label: "技术分享", icon: Bot, color: "text-violet-400" },
];

type PipelineColumn = {
  key: string;
  label: string;
  labelEn: string;
  color: string;
  borderColor: string;
  bgColor: string;
  icon: React.ReactNode;
};

const COLUMNS: PipelineColumn[] = [
  {
    key: 'pending',
    label: '待处理',
    labelEn: 'Raw / Pending',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
    icon: <Clock className="w-4 h-4" />,
  },
  {
    key: 'processing',
    label: 'AI 处理中',
    labelEn: 'Processing',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
    icon: <Loader2 className="w-4 h-4 animate-spin" />,
  },
  {
    key: 'reviewing',
    label: '待复核',
    labelEn: 'Review',
    color: 'text-violet-400',
    borderColor: 'border-violet-500/30',
    bgColor: 'bg-violet-500/5',
    icon: <Eye className="w-4 h-4" />,
  },
  {
    key: 'published',
    label: '已发布',
    labelEn: 'Live',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
    icon: <CheckCircle className="w-4 h-4" />,
  },
];

const getArticleColumn = (article: Article): string => {
  if (article.is_published && article.review_status === 'approved') return 'published';
  if (article.review_status === 'approved' && !article.is_published) return 'reviewing';
  if (article.review_status === 'rejected') return 'pending';
  // If auto-generated and pending, it's still in processing/review
  if (article.is_auto_generated && (!article.review_status || article.review_status === 'pending')) return 'reviewing';
  return 'pending';
};

const getCategoryBadge = (category: string | null) => {
  switch (category) {
    case '公司新闻': return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-[10px] px-1.5 py-0">公司</Badge>;
    case '行业动态': return <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] px-1.5 py-0">动态</Badge>;
    case '技术分享': return <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-[10px] px-1.5 py-0">技术</Badge>;
    default: return <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30 text-[10px] px-1.5 py-0">其他</Badge>;
  }
};

export const PipelineView = ({
  articles, onRefresh, onEditArticle, onAIModify, categoryFilter, onCategoryFilterChange
}: PipelineViewProps) => {
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const filtered = categoryFilter === '全部'
    ? articles
    : articles.filter(a => a.category === categoryFilter);

  const columnArticles = (colKey: string) =>
    filtered.filter(a => getArticleColumn(a) === colKey);

  const handleQuickAction = async (articleId: string, action: 'approve' | 'reject' | 'publish' | 'unpublish' | 'delete') => {
    setActionLoading(articleId);
    try {
      let updateData: Record<string, any> = {};
      switch (action) {
        case 'approve':
          updateData = { review_status: 'approved', is_published: true, published_at: new Date().toISOString(), reviewed_at: new Date().toISOString() };
          break;
        case 'reject':
          updateData = { review_status: 'rejected', is_published: false, published_at: null };
          break;
        case 'publish':
          updateData = { is_published: true, published_at: new Date().toISOString() };
          break;
        case 'unpublish':
          updateData = { is_published: false, published_at: null };
          break;
        case 'delete':
          const { error: delErr } = await supabase.from('news_articles').delete().eq('id', articleId);
          if (delErr) throw delErr;
          toast({ title: '已删除' });
          onRefresh();
          return;
      }
      const { error } = await supabase.from('news_articles').update(updateData).eq('id', articleId);
      if (error) throw error;
      toast({ title: action === 'approve' ? '已通过并发布' : action === 'reject' ? '已拒绝' : action === 'publish' ? '已发布' : '已取消发布' });
      onRefresh();
    } catch (err: any) {
      toast({ title: '操作失败', description: err.message, variant: 'destructive' });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex items-center gap-2">
        {CATEGORIES.map(cat => (
          <Button
            key={cat.value}
            variant={categoryFilter === cat.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryFilterChange(cat.value)}
            className={categoryFilter === cat.value
              ? 'bg-slate-600 text-white border-slate-500'
              : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 bg-transparent'}
          >
            <cat.icon className={`w-3.5 h-3.5 mr-1.5 ${cat.color}`} />
            {cat.label}
            <span className="ml-1.5 text-[10px] opacity-60">
              {cat.value === '全部' ? articles.length : articles.filter(a => a.category === cat.value).length}
            </span>
          </Button>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-3 min-h-[60vh]">
        {COLUMNS.map(col => {
          const items = columnArticles(col.key);
          return (
            <div key={col.key} className={`rounded-xl border ${col.borderColor} ${col.bgColor} flex flex-col`}>
              {/* Column Header */}
              <div className="px-3 py-2.5 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={col.color}>{col.icon}</span>
                    <span className={`font-semibold text-sm ${col.color}`}>{col.label}</span>
                  </div>
                  <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 text-[10px] px-1.5">
                    {items.length}
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">{col.labelEn}</p>
              </div>

              {/* Column Content */}
              <ScrollArea className="flex-1 px-2 py-2">
                <div className="space-y-2">
                  {items.map(article => (
                    <Card
                      key={article.id}
                      className="bg-slate-800/80 border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer group p-3"
                      onClick={() => onEditArticle(article)}
                    >
                      {/* Cover image thumbnail */}
                      {article.cover_image && (
                        <div className="w-full h-20 rounded-md overflow-hidden mb-2">
                          <img src={article.cover_image} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="text-xs font-medium text-white line-clamp-2 mb-1.5 leading-relaxed">
                        {article.title}
                      </h4>

                      {/* Meta */}
                      <div className="flex items-center gap-1.5 mb-2">
                        {getCategoryBadge(article.category)}
                        {article.ai_edited && (
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px] px-1.5 py-0">
                            <Sparkles className="w-2.5 h-2.5 mr-0.5" />AI
                          </Badge>
                        )}
                        {article.source_url && (
                          <Badge className="bg-slate-600/30 text-slate-400 border-slate-600/30 text-[10px] px-1.5 py-0">采集</Badge>
                        )}
                      </div>

                      {/* Time */}
                      <p className="text-[10px] text-slate-500 mb-2">
                        {new Date(article.created_at).toLocaleDateString('zh-CN')}
                      </p>

                      {/* Quick Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                        {col.key === 'reviewing' && (
                          <>
                            <Button
                              size="sm" variant="ghost"
                              className="h-6 px-2 text-[10px] text-emerald-400 hover:bg-emerald-500/20"
                              onClick={() => handleQuickAction(article.id, 'approve')}
                              disabled={actionLoading === article.id}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />通过
                            </Button>
                            <Button
                              size="sm" variant="ghost"
                              className="h-6 px-2 text-[10px] text-red-400 hover:bg-red-500/20"
                              onClick={() => handleQuickAction(article.id, 'reject')}
                              disabled={actionLoading === article.id}
                            >
                              <XCircle className="w-3 h-3 mr-1" />拒绝
                            </Button>
                          </>
                        )}
                        {col.key === 'pending' && (
                          <Button
                            size="sm" variant="ghost"
                            className="h-6 px-2 text-[10px] text-violet-400 hover:bg-violet-500/20"
                            onClick={() => onAIModify(article)}
                            disabled={actionLoading === article.id}
                          >
                            <Sparkles className="w-3 h-3 mr-1" />AI重写
                          </Button>
                        )}
                        {col.key === 'published' && (
                          <Button
                            size="sm" variant="ghost"
                            className="h-6 px-2 text-[10px] text-amber-400 hover:bg-amber-500/20"
                            onClick={() => handleQuickAction(article.id, 'unpublish')}
                            disabled={actionLoading === article.id}
                          >
                            <EyeOff className="w-3 h-3 mr-1" />下架
                          </Button>
                        )}
                        <Button
                          size="sm" variant="ghost"
                          className="h-6 px-1.5 text-red-400 hover:bg-red-500/20"
                          onClick={() => setDeleteId(article.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {items.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <p className="text-[10px] text-slate-500">暂无内容</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">确认删除</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">此操作无法撤销</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) handleQuickAction(deleteId, 'delete'); setDeleteId(null); }} className="bg-red-500 hover:bg-red-600">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
