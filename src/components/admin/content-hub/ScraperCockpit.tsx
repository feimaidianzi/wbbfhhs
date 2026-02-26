import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Loader2, Plus, Edit, Trash2, Play, Pause, RefreshCw, Search, Sparkles,
  Bot, Globe, Rss, Clock, CheckCircle, XCircle, Filter, Settings, Zap
} from 'lucide-react';
import { CollectionLogPanel, CollectionLog } from '@/components/admin/CollectionLogPanel';

interface AIRules {
  scoreThreshold?: number;
  scoringPrompt?: string;
  optimizationPrompt?: string;
  contentRequirements?: string;
  enabled?: boolean;
}

interface NewsKeyword {
  id: string;
  keyword: string;
  keyword_en: string | null;
  category: string;
  is_active: boolean;
  priority: number;
  ai_rules?: AIRules;
}

interface ScheduledTask {
  id: string;
  name: string;
  description: string | null;
  cron_expression: string;
  is_enabled: boolean;
  last_run_at: string | null;
  last_status: string | null;
  category?: string;
  article_count?: number;
  auto_publish?: boolean;
  ai_rules?: AIRules;
}

interface CollectionTask {
  id: string;
  keyword: string;
  category: string;
  articles_collected: number;
  articles_published: number;
  status: string;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

const CATEGORIES = [
  { value: '公司新闻', label: '公司新闻', icon: Rss, color: 'text-blue-400' },
  { value: '行业动态', label: '行业动态', icon: Globe, color: 'text-emerald-400' },
  { value: '技术分享', label: '技术分享', icon: Bot, color: 'text-violet-400' },
];

export const ScraperCockpit = () => {
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<NewsKeyword[]>([]);
  const [tasks, setTasks] = useState<CollectionTask[]>([]);
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [collecting, setCollecting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionLogs, setCollectionLogs] = useState<CollectionLog[]>([]);

  // Keyword dialog
  const [kwDialogOpen, setKwDialogOpen] = useState(false);
  const [editingKw, setEditingKw] = useState<NewsKeyword | null>(null);
  const [deleteKwId, setDeleteKwId] = useState<string | null>(null);
  const [kwForm, setKwForm] = useState({ keyword: '', keyword_en: '', category: '', is_active: true, priority: 5 });

  // Scheduled task dialog
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ScheduledTask | null>(null);
  const [taskForm, setTaskForm] = useState({
    name: '', description: '', cron_expression: '0 8 * * *', category: '', article_count: 1, auto_publish: true,
  });

  const backgroundRef = useRef<number | null>(null);

  const addLog = (log: Omit<CollectionLog, 'id' | 'timestamp'>) => {
    setCollectionLogs(prev => [...prev, { ...log, id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`, timestamp: new Date() }]);
  };

  const fetchData = async () => {
    try {
      const [kwRes, taskRes, schedRes] = await Promise.all([
        supabase.from('news_keywords').select('*').order('priority', { ascending: false }),
        supabase.from('news_collection_tasks').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('scheduled_tasks').select('*').order('created_at', { ascending: false }),
      ]);
      setKeywords((kwRes.data || []).map(k => ({ ...k, ai_rules: k.ai_rules as AIRules | undefined })));
      setTasks(taskRes.data || []);
      setScheduledTasks((schedRes.data || []).map(t => ({ ...t, ai_rules: t.ai_rules as AIRules | undefined })));
    } catch (err: any) {
      toast({ title: '获取数据失败', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); return () => { if (backgroundRef.current) clearInterval(backgroundRef.current); }; }, []);

  const filteredKeywords = keywords.filter(kw => {
    const catMatch = selectedCategory === '全部' || kw.category === selectedCategory;
    const searchMatch = !searchQuery || kw.keyword.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const handleSaveKw = async () => {
    if (!kwForm.keyword.trim() || !kwForm.category) { toast({ title: '请填写关键词和分类', variant: 'destructive' }); return; }
    try {
      const data = { keyword: kwForm.keyword.trim(), keyword_en: kwForm.keyword_en.trim() || null, category: kwForm.category, is_active: kwForm.is_active, priority: kwForm.priority };
      if (editingKw) {
        const { error } = await supabase.from('news_keywords').update(data).eq('id', editingKw.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news_keywords').insert([data]);
        if (error) throw error;
      }
      toast({ title: editingKw ? '已更新' : '已添加' });
      setKwDialogOpen(false);
      fetchData();
    } catch (err: any) { toast({ title: '保存失败', description: err.message, variant: 'destructive' }); }
  };

  const handleDeleteKw = async () => {
    if (!deleteKwId) return;
    try {
      const { error } = await supabase.from('news_keywords').delete().eq('id', deleteKwId);
      if (error) throw error;
      toast({ title: '已删除' });
      fetchData();
    } catch (err: any) { toast({ title: '删除失败', description: err.message, variant: 'destructive' }); }
    finally { setDeleteKwId(null); }
  };

  const startCollection = async (action: string, body: any) => {
    setCollecting(true);
    setCollectionLogs([]);
    addLog({ type: 'step', step: 'search', message: `🚀 开始${action}...` });
    
    // Start background monitor
    backgroundRef.current = window.setInterval(() => fetchData(), 5000);

    try {
      const response = await supabase.functions.invoke('collect-news-firecrawl', { body });
      if (response.data?.logs) {
        const logs = response.data.logs as any[];
        logs.forEach((l, i) => setCollectionLogs(prev => [...prev, {
          ...l, id: `resp-${i}`, timestamp: new Date(l.timestamp),
        }]));
      }
      addLog({ type: 'success', step: 'save', message: '✅ 采集完成' });
      fetchData();
    } catch (err: any) {
      addLog({ type: err.message?.includes('Failed to fetch') ? 'info' : 'error', message: err.message?.includes('Failed to fetch') ? '⏳ 后台继续执行中...' : `❌ ${err.message}` });
    } finally {
      setCollecting(false);
      if (backgroundRef.current) { clearInterval(backgroundRef.current); backgroundRef.current = null; }
    }
  };

  const handleSaveTask = async () => {
    if (!taskForm.name.trim() || !taskForm.category) { toast({ title: '请填写必填项', variant: 'destructive' }); return; }
    try {
      const data = { name: taskForm.name.trim(), description: taskForm.description.trim() || null, cron_expression: taskForm.cron_expression, category: taskForm.category, article_count: taskForm.article_count, auto_publish: taskForm.auto_publish };
      if (editingTask) {
        const { error } = await supabase.from('scheduled_tasks').update(data).eq('id', editingTask.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('scheduled_tasks').insert([{ ...data, is_enabled: true }]);
        if (error) throw error;
      }
      toast({ title: editingTask ? '已更新' : '已创建' });
      setTaskDialogOpen(false);
      fetchData();
    } catch (err: any) { toast({ title: '保存失败', description: err.message, variant: 'destructive' }); }
  };

  const toggleTask = async (task: ScheduledTask) => {
    try {
      const { error } = await supabase.from('scheduled_tasks').update({ is_enabled: !task.is_enabled }).eq('id', task.id);
      if (error) throw error;
      fetchData();
    } catch (err: any) { toast({ title: '操作失败', description: err.message, variant: 'destructive' }); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-amber-500" /></div>;

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          onClick={() => startCollection('AI全自动采集', { action: 'auto-generate-and-collect', count: 10, autoPublish: true })}
          disabled={collecting}
          className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700"
        >
          {collecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Bot className="w-4 h-4 mr-2" />}
          AI 全自动采集
        </Button>
        {CATEGORIES.map(cat => (
          <Button
            key={cat.value}
            variant="outline"
            size="sm"
            disabled={collecting}
            onClick={() => startCollection(`${cat.label}采集`, { action: 'collect-by-category', category: cat.value, count: 3, autoPublish: true })}
            className="border-slate-700 text-slate-300 hover:text-white"
          >
            <cat.icon className={`w-3.5 h-3.5 mr-1.5 ${cat.color}`} />
            采集{cat.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Keywords Panel */}
        <Card className="col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <Search className="w-4 h-4" />关键词矩阵
                <Badge variant="secondary" className="text-[10px]">{keywords.length}</Badge>
              </CardTitle>
              <Button size="sm" onClick={() => { setEditingKw(null); setKwForm({ keyword: '', keyword_en: '', category: '', is_active: true, priority: 5 }); setKwDialogOpen(true); }}
                className="h-7 text-xs bg-amber-500 hover:bg-amber-600">
                <Plus className="w-3 h-3 mr-1" />添加
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Input placeholder="搜索关键词..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="h-7 text-xs bg-slate-700 border-slate-600 flex-1" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-28 h-7 text-xs bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="全部">全部</SelectItem>
                  {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-1">
                {filteredKeywords.map(kw => (
                  <div key={kw.id} className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-700/50 group">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Switch checked={kw.is_active} onCheckedChange={() => {
                        supabase.from('news_keywords').update({ is_active: !kw.is_active }).eq('id', kw.id).then(() => fetchData());
                      }} className="scale-75" />
                      <span className={`text-xs truncate ${kw.is_active ? 'text-white' : 'text-slate-500'}`}>{kw.keyword}</span>
                      {kw.keyword_en && <span className="text-[10px] text-slate-500 truncate">({kw.keyword_en})</span>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge className={`text-[9px] px-1.5 py-0 ${
                        kw.category === '公司新闻' ? 'bg-blue-500/20 text-blue-300' :
                        kw.category === '行业动态' ? 'bg-emerald-500/20 text-emerald-300' :
                        'bg-violet-500/20 text-violet-300'
                      }`}>{kw.category}</Badge>
                      <div className="opacity-0 group-hover:opacity-100 flex gap-0.5">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                          onClick={() => { setEditingKw(kw); setKwForm({ keyword: kw.keyword, keyword_en: kw.keyword_en || '', category: kw.category, is_active: kw.is_active, priority: kw.priority }); setKwDialogOpen(true); }}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                          onClick={() => setDeleteKwId(kw.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Scheduled Tasks */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4" />定时任务
              </CardTitle>
              <Button size="sm" onClick={() => {
                setEditingTask(null); setTaskForm({ name: '', description: '', cron_expression: '0 8 * * *', category: '', article_count: 1, auto_publish: true });
                setTaskDialogOpen(true);
              }} className="h-7 text-xs bg-amber-500 hover:bg-amber-600">
                <Plus className="w-3 h-3 mr-1" />添加
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {scheduledTasks.map(task => (
                  <div key={task.id} className="p-2.5 rounded-lg bg-slate-700/30 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white">{task.name}</span>
                      <Switch checked={task.is_enabled} onCheckedChange={() => toggleTask(task)} className="scale-75" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>{task.cron_expression}</span>
                      {task.category && <Badge className="text-[9px] px-1 py-0 bg-slate-600/50">{task.category}</Badge>}
                    </div>
                    {task.last_status && (
                      <div className="flex items-center gap-1 mt-1">
                        {task.last_status === 'completed' ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <XCircle className="w-3 h-3 text-red-400" />}
                        <span className="text-[10px] text-slate-500">{task.last_run_at ? new Date(task.last_run_at).toLocaleString('zh-CN') : ''}</span>
                      </div>
                    )}
                    <div className="flex gap-1 mt-1.5">
                      <Button size="sm" variant="ghost" className="h-6 text-[10px] text-slate-400 hover:text-white px-2"
                        disabled={collecting}
                        onClick={() => startCollection(task.name, { action: 'auto-generate-and-collect', count: task.article_count || 4, autoPublish: task.auto_publish !== false, category: task.category })}>
                        <Play className="w-3 h-3 mr-1" />执行
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 text-[10px] text-slate-400 hover:text-white px-2"
                        onClick={() => { setEditingTask(task); setTaskForm({ name: task.name, description: task.description || '', cron_expression: task.cron_expression, category: task.category || '', article_count: task.article_count || 1, auto_publish: task.auto_publish !== false }); setTaskDialogOpen(true); }}>
                        <Edit className="w-3 h-3 mr-1" />编辑
                      </Button>
                    </div>
                  </div>
                ))}
                {scheduledTasks.length === 0 && <p className="text-center text-[10px] text-slate-500 py-4">暂无定时任务</p>}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Collection Logs */}
      <CollectionLogPanel logs={collectionLogs} isCollecting={collecting} onClear={() => setCollectionLogs([])} />

      {/* Recent Tasks */}
      {tasks.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">最近采集记录</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[150px]">
              <div className="space-y-1">
                {tasks.slice(0, 10).map(t => (
                  <div key={t.id} className="flex items-center justify-between text-[11px] px-2 py-1 rounded hover:bg-slate-700/30">
                    <div className="flex items-center gap-2">
                      {t.status === 'completed' ? <CheckCircle className="w-3 h-3 text-emerald-400" /> :
                        t.status === 'failed' ? <XCircle className="w-3 h-3 text-red-400" /> :
                        <Clock className="w-3 h-3 text-slate-400" />}
                      <span className="text-slate-300 truncate max-w-[200px]">{t.keyword}</span>
                      <Badge className="text-[9px] px-1 py-0 bg-slate-600/50">{t.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <span>{t.articles_collected}篇</span>
                      <span>{new Date(t.created_at).toLocaleString('zh-CN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Keyword Dialog */}
      <Dialog open={kwDialogOpen} onOpenChange={setKwDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{editingKw ? '编辑关键词' : '添加关键词'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div><Label className="text-xs">关键词 *</Label><Input value={kwForm.keyword} onChange={e => setKwForm({ ...kwForm, keyword: e.target.value })} className="bg-slate-700 border-slate-600 mt-1" /></div>
            <div><Label className="text-xs">英文关键词</Label><Input value={kwForm.keyword_en} onChange={e => setKwForm({ ...kwForm, keyword_en: e.target.value })} className="bg-slate-700 border-slate-600 mt-1" /></div>
            <div><Label className="text-xs">分类 *</Label>
              <Select value={kwForm.category} onValueChange={v => setKwForm({ ...kwForm, category: v })}>
                <SelectTrigger className="bg-slate-700 border-slate-600 mt-1"><SelectValue placeholder="选择分类" /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2"><Switch checked={kwForm.is_active} onCheckedChange={c => setKwForm({ ...kwForm, is_active: c })} /><Label className="text-xs">启用</Label></div>
              <div><Label className="text-xs">优先级</Label><Input type="number" value={kwForm.priority} onChange={e => setKwForm({ ...kwForm, priority: parseInt(e.target.value) || 0 })} className="w-20 bg-slate-700 border-slate-600 h-8 text-xs ml-1" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setKwDialogOpen(false)}>取消</Button>
            <Button onClick={handleSaveKw} className="bg-amber-500 hover:bg-amber-600">保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTask ? '编辑任务' : '创建任务'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div><Label className="text-xs">任务名称 *</Label><Input value={taskForm.name} onChange={e => setTaskForm({ ...taskForm, name: e.target.value })} className="bg-slate-700 border-slate-600 mt-1" /></div>
            <div><Label className="text-xs">Cron 表达式</Label><Input value={taskForm.cron_expression} onChange={e => setTaskForm({ ...taskForm, cron_expression: e.target.value })} className="bg-slate-700 border-slate-600 mt-1" /></div>
            <div><Label className="text-xs">采集分类 *</Label>
              <Select value={taskForm.category} onValueChange={v => setTaskForm({ ...taskForm, category: v })}>
                <SelectTrigger className="bg-slate-700 border-slate-600 mt-1"><SelectValue placeholder="选择分类" /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <div><Label className="text-xs">每次采集数</Label><Input type="number" value={taskForm.article_count} onChange={e => setTaskForm({ ...taskForm, article_count: parseInt(e.target.value) || 1 })} className="w-20 bg-slate-700 border-slate-600 h-8 text-xs mt-1" /></div>
              <div className="flex items-center gap-2 pt-4"><Switch checked={taskForm.auto_publish} onCheckedChange={c => setTaskForm({ ...taskForm, auto_publish: c })} /><Label className="text-xs">自动发布</Label></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setTaskDialogOpen(false)}>取消</Button>
            <Button onClick={handleSaveTask} className="bg-amber-500 hover:bg-amber-600">保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteKwId} onOpenChange={() => setDeleteKwId(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">确认删除关键词</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">此操作无法撤销</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteKw} className="bg-red-500 hover:bg-red-600">删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
