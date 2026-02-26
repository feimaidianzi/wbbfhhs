import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Shield, 
  LogOut, 
  Home,
  Loader2,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  RefreshCw,
  Rss,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  Bot,
  Globe,
  Search,
  Sparkles,
  Star,
  Filter,
  Settings,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  FileText
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
  created_at: string;
  ai_rules?: AIRules;
}

// 固定的三分类 - 与新闻中心板块对应
const NEWS_CATEGORIES = [
  { 
    value: "全部", 
    label: "全部", 
    description: "显示所有板块的关键词",
    color: "text-slate-400",
    bgColor: "bg-slate-500/20",
    icon: LayoutGrid,
  },
  { 
    value: "公司新闻", 
    label: "公司新闻", 
    description: "企业动态、合作、融资等",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    icon: Rss,
  },
  { 
    value: "行业动态", 
    label: "行业动态", 
    description: "政策法规、市场分析、行业趋势",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    icon: Globe,
  },
  {
    value: "技术分享", 
    label: "技术分享", 
    description: "技术原理、教程、知识科普",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    icon: Bot,
  },
] as const;

// 用于选择的分类（不含"全部"）
const SELECTABLE_CATEGORIES = NEWS_CATEGORIES.filter(c => c.value !== "全部");

// 质量评分阈值
const QUALITY_THRESHOLD = 8.0;

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

interface ScheduledTaskAIRules {
  scoreThreshold?: number;
  scoringPrompt?: string;
  optimizationPrompt?: string;
  contentRequirements?: string;
  enabled?: boolean;
}

interface ScheduledTask {
  id: string;
  name: string;
  description: string | null;
  cron_expression: string;
  is_enabled: boolean;
  last_run_at: string | null;
  next_run_at: string | null;
  last_status: string | null;
  last_error: string | null;
  created_at: string;
  category?: string;
  article_count?: number;
  auto_publish?: boolean;
  ai_rules?: ScheduledTaskAIRules;
}

const NewsCollection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [keywords, setKeywords] = useState<NewsKeyword[]>([]);
  const [tasks, setTasks] = useState<CollectionTask[]>([]);
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [collecting, setCollecting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<NewsKeyword | null>(null);
  const [deleteKeywordId, setDeleteKeywordId] = useState<string | null>(null);

  // 定时任务编辑状态
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<ScheduledTask | null>(null);
  const [runningScheduledTaskId, setRunningScheduledTaskId] = useState<string | null>(null);
  const [taskFormData, setTaskFormData] = useState({
    name: '',
    description: '',
    cron_expression: '0 8 * * *',
    category: '',
    article_count: 1,
    auto_publish: true,
    ai_rules: {
      enabled: false,
      scoreThreshold: 8.0,
      scoringPrompt: '',
      optimizationPrompt: '',
      contentRequirements: '',
    } as ScheduledTaskAIRules,
  });

  // 当前选中的分类过滤
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  // 关键词搜索
  const [keywordSearch, setKeywordSearch] = useState<string>("");
  // 关键词分页
  const [keywordPage, setKeywordPage] = useState(1);
  const KEYWORDS_PER_PAGE = 100;
  const MAX_KEYWORD_PAGES = 20;

  const [formData, setFormData] = useState({
    keyword: '',
    keyword_en: '',
    category: '',
    is_active: true,
    priority: 5,
    ai_rules: {
      enabled: false,
      scoreThreshold: 8.0,
      scoringPrompt: '',
      optimizationPrompt: '',
      contentRequirements: '',
    } as AIRules,
  });

  // Firecrawl 相关状态
  const [firecrawlCollecting, setFirecrawlCollecting] = useState(false);
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ url: string; title: string; description: string }>>([]);

  // AI生成关键词状态
  const [generatingKeywords, setGeneratingKeywords] = useState(false);
  const [generatedKeywords, setGeneratedKeywords] = useState<Record<string, string[]> | null>(null);
  const [isKeywordResultDialogOpen, setIsKeywordResultDialogOpen] = useState(false);

  // 翻译状态
  const [translating, setTranslating] = useState(false);
  
  // 采集日志状态
  const [collectionLogs, setCollectionLogs] = useState<CollectionLog[]>([]);

  // 图片清理状态
  const [cleaningImages, setCleaningImages] = useState(false);
  const [cleaningProgress, setCleaningProgress] = useState<{
    processedArticles: number;
    updatedArticles: number;
    totalImagesProcessed: number;
    totalImagesConverted: number;
    totalImagesRejected: number;
  } | null>(null);

  // 采集“后台仍在执行”时的前端监控（定时刷新数据，避免误判为执行失败）
  const backgroundMonitorIntervalRef = useRef<number | null>(null);
  const backgroundMonitorTimeoutRef = useRef<number | null>(null);
  const backgroundMonitorStartedAtRef = useRef<number | null>(null);

  const stopCollectingUI = () => {
    setFirecrawlCollecting(false);
    setRunningScheduledTaskId(null);
  };
  
  // 添加日志的工具函数
  const addCollectionLog = (log: Omit<CollectionLog, 'id' | 'timestamp'>) => {
    setCollectionLogs(prev => [...prev, {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    }]);
  };
  
  // 清空日志
  const clearCollectionLogs = () => {
    setCollectionLogs([]);
  };

  const stopBackgroundMonitor = () => {
    if (backgroundMonitorIntervalRef.current) {
      window.clearInterval(backgroundMonitorIntervalRef.current);
      backgroundMonitorIntervalRef.current = null;
    }
    if (backgroundMonitorTimeoutRef.current) {
      window.clearTimeout(backgroundMonitorTimeoutRef.current);
      backgroundMonitorTimeoutRef.current = null;
    }
    backgroundMonitorStartedAtRef.current = null;
  };

  const isTransientCollectionError = (error: any) => {
    const msg = String(error?.message || error || '');
    return (
      msg.includes('Failed to fetch') ||
      msg.includes('AbortError') ||
      msg.includes('Failed to send a request to the Edge Function')
    );
  };

  const checkIfCollectionFinished = async () => {
    // 如果没有监控中的“开始时间”，无法判断本轮采集是否结束
    if (!backgroundMonitorStartedAtRef.current) return;

    try {
      const { data, error } = await supabase
        .from('news_collection_tasks')
        .select('id,status,created_at,completed_at,error_message')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return;

      const startedAt = backgroundMonitorStartedAtRef.current;
      const createdAt = new Date(data.created_at).getTime();
      const isThisRunOrLater = createdAt >= startedAt - 5000; // 给一点时间误差

      if (!isThisRunOrLater) return;

      const isDone = Boolean(data.completed_at) || ['completed', 'failed', 'error'].includes(String(data.status || '').toLowerCase());
      if (!isDone) return;

      stopBackgroundMonitor();
      stopCollectingUI();

      addCollectionLog({
        type: data.error_message ? 'warning' : 'success',
        step: 'save',
        message: data.error_message
          ? '⚠️ 检测到后台采集已结束（存在报错），已停止“采集中”状态'
          : '✅ 检测到后台采集已结束，已停止“采集中”状态',
        details: data.error_message || undefined,
      });

      fetchData();
    } catch {
      // 这里不要打断用户体验：如果查询失败，就继续保持自动刷新
    }
  };

  // 当网络中断/超时，但后台可能仍在继续执行时：保持“采集中”并自动刷新数据
  const startBackgroundMonitor = (reason: string) => {
    stopBackgroundMonitor();
    backgroundMonitorStartedAtRef.current = Date.now();

    addCollectionLog({
      type: 'info',
      step: 'save',
      message: '⏳ 连接中断，但采集可能仍在后台继续执行中…',
      details: reason,
    });

    // 每 5 秒刷新一次数据，让用户看到新文章/关键词出现；并检测后台是否已完成
    backgroundMonitorIntervalRef.current = window.setInterval(() => {
      fetchData();
      void checkIfCollectionFinished();
    }, 5000);

    // 最多监控 30 分钟：如果仍未检测到结束，则认为本次前端已无法追踪，停止“采集中”避免一直卡住
    backgroundMonitorTimeoutRef.current = window.setTimeout(() => {
      stopBackgroundMonitor();
      stopCollectingUI();
      addCollectionLog({
        type: 'warning',
        message: '⚠️ 超过30分钟仍未检测到采集结束，已停止“采集中”状态（可手动刷新查看是否有新内容）',
      });
    }, 30 * 60 * 1000);
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      stopBackgroundMonitor();
    };
  }, []);
  
  
  // 从API响应解析日志
  const parseLogsFromResponse = (responseLogs: Array<{
    timestamp: string;
    type: 'info' | 'success' | 'warning' | 'error' | 'step';
    step?: string;
    message: string;
    details?: string;
    articleTitle?: string;
    score?: number;
    isReviewOrAd?: boolean;
  }>) => {
    if (!responseLogs || !Array.isArray(responseLogs)) return;
    
    const newLogs: CollectionLog[] = responseLogs.map((log, index) => ({
      id: `log-${Date.now()}-${index}`,
      timestamp: new Date(log.timestamp),
      type: log.type,
      step: log.step as CollectionLog['step'],
      message: log.message,
      details: log.details,
      articleTitle: log.articleTitle,
      score: log.score,
      isReviewOrAd: log.isReviewOrAd,
    }));
    
    setCollectionLogs(prev => [...prev, ...newLogs]);
  };

  // 使用 Gemini 翻译关键词
  const translateKeyword = async (keyword: string) => {
    if (!keyword.trim()) return;

    setTranslating(true);
    try {
      const response = await supabase.functions.invoke('translate-keyword', {
        body: { keyword: keyword.trim() },
      });

      if (response.error) throw response.error;

      const translatedKeyword = response.data?.translation || '';
      if (translatedKeyword) {
        setFormData((prev) => ({ ...prev, keyword_en: translatedKeyword }));
        toast({ title: '翻译成功', description: `${keyword} → ${translatedKeyword}` });
      }
    } catch (error: any) {
      console.error('Translation error:', error);
      toast({
        title: '翻译失败',
        description: error.message || '请手动输入英文关键词',
        variant: 'destructive',
      });
    } finally {
      setTranslating(false);
    }
  };

  const fetchData = async () => {
    try {
      const [keywordsRes, tasksRes, scheduledRes] = await Promise.all([
        supabase
          .from('news_keywords')
          .select('*')
          .order('priority', { ascending: false }),
        supabase
          .from('news_collection_tasks')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20),
        supabase
          .from('scheduled_tasks')
          .select('*')
          .order('created_at', { ascending: false }),
      ]);

      if (keywordsRes.error) throw keywordsRes.error;
      if (tasksRes.error) throw tasksRes.error;

      setKeywords((keywordsRes.data || []).map(k => ({
        ...k,
        ai_rules: k.ai_rules as AIRules | undefined
      })));
      setTasks(tasksRes.data || []);
      setScheduledTasks((scheduledRes.data || []).map(t => ({
        ...t,
        ai_rules: t.ai_rules as ScheduledTaskAIRules | undefined
      })));
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: '获取数据失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // 使用AI生成热门关键词
  const generateHotKeywords = async () => {
    setGeneratingKeywords(true);
    try {
      const response = await supabase.functions.invoke('collect-news-firecrawl', {
        body: { action: 'generate-keywords' },
      });

      if (response.error) throw response.error;

      if (response.data?.keywords) {
        setGeneratedKeywords(response.data.keywords);
        setIsKeywordResultDialogOpen(true);
        toast({
          title: 'AI关键词生成成功',
          description: `已生成新关键词（排除${response.data.existingCount || 0}个已有关键词）`,
        });
      }
    } catch (error: any) {
      console.error('Generate keywords error:', error);
      toast({
        title: '生成失败',
        description: error.message || '请稍后重试',
        variant: 'destructive',
      });
    } finally {
      setGeneratingKeywords(false);
    }
  };

  // AI自动生成关键词 - 真正的异步模式：立即返回，后台执行
  const autoGenerateAndCollect = async () => {
    setFirecrawlCollecting(true);
    stopBackgroundMonitor();
    clearCollectionLogs();
    
    addCollectionLog({
      type: 'step',
      step: 'keyword',
      message: '🚀 AI关键词生成任务已提交',
      details: '后台执行中，页面将自动刷新状态',
    });

    // 立即开始后台监控（不等待响应）
    startBackgroundMonitor('AI关键词生成任务已提交到后台执行');
    
    toast({
      title: '✅ 任务已提交',
      description: '关键词生成任务正在后台执行，页面将自动刷新显示进度。',
    });

    // 发起请求但不阻塞（fire-and-forget模式）
    supabase.functions.invoke('collect-news-firecrawl', {
      body: {
        action: 'auto-generate-keywords',
      },
    }).then((response) => {
      if (response.data?.logs) {
        parseLogsFromResponse(response.data.logs);
      }
      if (response.data?.generatedKeywords) {
        setGeneratedKeywords(response.data.generatedKeywords);
      }
      console.log('[AsyncTask] Keywords generation response:', response.data);
    }).catch((err) => {
      console.log('[AsyncTask] Connection closed (expected):', err?.message || err);
    });
  };

  // 将生成的关键词添加到数据库
  const addGeneratedKeyword = async (keyword: string, category: string) => {
    try {
      // 检查是否已存在
      const { data: existing } = await supabase
        .from('news_keywords')
        .select('id')
        .eq('keyword', keyword)
        .single();

      if (existing) {
        toast({
          title: '关键词已存在',
          description: `"${keyword}" 已在关键词列表中`,
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('news_keywords')
        .insert({
          keyword,
          keyword_en: keyword, // AI生成的通常是英文或中英混合
          category,
          is_active: true,
          priority: 50,
        });

      if (error) throw error;

      toast({
        title: '添加成功',
        description: `关键词 "${keyword}" 已添加到 ${category}`,
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: '添加失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // 切换定时任务状态
  const toggleScheduledTask = async (task: ScheduledTask) => {
    try {
      const { error } = await supabase
        .from('scheduled_tasks')
        .update({ is_enabled: !task.is_enabled })
        .eq('id', task.id);

      if (error) throw error;
      toast({ title: task.is_enabled ? '已暂停定时任务' : '已启用定时任务' });
      fetchData();
    } catch (error: any) {
      toast({
        title: '操作失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // 手动触发单个定时任务 - 真正的异步模式：立即返回，后台执行
  const triggerSingleTask = async (task: ScheduledTask) => {
    setRunningScheduledTaskId(task.id);
    stopBackgroundMonitor();
    clearCollectionLogs();
    
    addCollectionLog({
      type: 'step',
      step: 'search',
      message: `🚀 开始采集任务: ${task.name}`,
      details: `分类: ${task.category || '全部分类'}`,
    });

    // 启动静默后台监控（不显示"连接中断"消息）
    backgroundMonitorStartedAtRef.current = Date.now();
    backgroundMonitorIntervalRef.current = window.setInterval(() => {
      fetchData();
      void checkIfCollectionFinished();
    }, 5000);
    
    toast({
      title: '🚀 开始采集',
      description: '正在执行采集任务，请查看下方日志面板...',
    });

    // 发起请求并等待响应
    try {
      const response = await supabase.functions.invoke('collect-news-firecrawl', {
        body: {
          action: 'auto-generate-and-collect',
          count: task.article_count || 4,
          autoPublish: task.auto_publish !== false,
          category: task.category || undefined,
        },
      });
      
      // 收到响应后解析日志
      if (response.data?.logs) {
        parseLogsFromResponse(response.data.logs);
      }
      if (response.data?.generatedKeywords) {
        setGeneratedKeywords(response.data.generatedKeywords);
      }
      
      // 采集完成
      stopBackgroundMonitor();
      stopCollectingUI();
      fetchData();
      
      addCollectionLog({
        type: 'success',
        step: 'save',
        message: '✅ 采集任务完成',
      });
    } catch (err: any) {
      // 连接超时/中断时，显示提示并继续后台监控
      if (isTransientCollectionError(err)) {
        addCollectionLog({
          type: 'info',
          step: 'save',
          message: '⏳ 连接中断，但采集仍在后台继续执行中…',
          details: '页面将自动刷新显示新内容',
        });
      } else {
        console.error('[AsyncTask] Error:', err);
      }
    }
  };

  // 手动触发定时任务（全部）
  const triggerScheduledTask = async () => {
    setFirecrawlCollecting(true);
    stopBackgroundMonitor();
    clearCollectionLogs();
    
    addCollectionLog({
      type: 'step',
      step: 'search',
      message: '🚀 开始全量采集任务',
      details: '正在执行采集...',
    });

    // 启动静默后台监控
    backgroundMonitorStartedAtRef.current = Date.now();
    backgroundMonitorIntervalRef.current = window.setInterval(() => {
      fetchData();
      void checkIfCollectionFinished();
    }, 5000);
    
    toast({
      title: '🚀 开始采集',
      description: '正在执行全量采集任务，请查看下方日志面板...',
    });

    try {
      const response = await supabase.functions.invoke('collect-news-firecrawl', {
        body: {
          action: 'auto-generate-and-collect',
          count: 10,
          autoPublish: true,
        },
      });
      
      if (response.data?.logs) {
        parseLogsFromResponse(response.data.logs);
      }
      if (response.data?.generatedKeywords) {
        setGeneratedKeywords(response.data.generatedKeywords);
      }
      
      stopBackgroundMonitor();
      stopCollectingUI();
      fetchData();
      
      addCollectionLog({
        type: 'success',
        step: 'save',
        message: '✅ 全量采集任务完成',
      });
    } catch (err: any) {
      if (isTransientCollectionError(err)) {
        addCollectionLog({
          type: 'info',
          step: 'save',
          message: '⏳ 连接中断，但采集仍在后台继续执行中…',
          details: '页面将自动刷新显示新内容',
        });
      } else {
        console.error('[AsyncTask] Error:', err);
      }
    }
  };

  // 打开任务编辑对话框
  const openTaskEditDialog = (task: ScheduledTask) => {
    setEditingTask(task);
    const aiRules = task.ai_rules || {};
    setTaskFormData({
      name: task.name,
      description: task.description || '',
      cron_expression: task.cron_expression,
      category: task.category || '',
      article_count: task.article_count || 1,
      auto_publish: task.auto_publish !== false,
      ai_rules: {
        enabled: aiRules.enabled || false,
        scoreThreshold: aiRules.scoreThreshold || 8.0,
        scoringPrompt: aiRules.scoringPrompt || '',
        optimizationPrompt: aiRules.optimizationPrompt || '',
        contentRequirements: aiRules.contentRequirements || '',
      },
    });
    setIsTaskDialogOpen(true);
  };

  // 打开新建任务对话框
  const openTaskCreateDialog = () => {
    setEditingTask(null);
    setTaskFormData({
      name: '',
      description: '',
      cron_expression: '0 8 * * *',
      category: '',
      article_count: 1,
      auto_publish: true,
      ai_rules: {
        enabled: false,
        scoreThreshold: 8.0,
        scoringPrompt: '',
        optimizationPrompt: '',
        contentRequirements: '',
      },
    });
    setIsTaskDialogOpen(true);
  };

  // 保存任务
  const handleSaveTask = async () => {
    if (!taskFormData.name.trim() || !taskFormData.category.trim()) {
      toast({
        title: '请填写必填项',
        description: '任务名称和采集分类不能为空',
        variant: 'destructive',
      });
      return;
    }

    try {
      const aiRulesJson = JSON.parse(JSON.stringify(taskFormData.ai_rules));
      const data = {
        name: taskFormData.name.trim(),
        description: taskFormData.description.trim() || null,
        cron_expression: taskFormData.cron_expression,
        category: taskFormData.category,
        article_count: taskFormData.article_count,
        auto_publish: taskFormData.auto_publish,
        ai_rules: aiRulesJson,
      };

      if (editingTask) {
        const { error } = await supabase
          .from('scheduled_tasks')
          .update(data)
          .eq('id', editingTask.id);
        if (error) throw error;
        toast({ title: '任务已更新' });
      } else {
        const { error } = await supabase
          .from('scheduled_tasks')
          .insert([{
            ...data,
            is_enabled: true,
            next_run_at: new Date().toISOString(),
          }]);
        if (error) throw error;
        toast({ title: '任务已创建' });
      }

      setIsTaskDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: '保存失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // 删除任务
  const handleDeleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('scheduled_tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      toast({ title: '任务已删除' });
      fetchData();
    } catch (error: any) {
      toast({
        title: '删除失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/admin/login');
        return;
      }

      const { data: isAdmin } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (!isAdmin) {
        toast({
          title: '访问拒绝',
          description: '您没有管理员权限',
          variant: 'destructive',
        });
        navigate('/admin/login');
        return;
      }

      fetchData();
    };

    checkAdminAccess();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const openCreateDialog = () => {
    setEditingKeyword(null);
    setFormData({
      keyword: '',
      keyword_en: '',
      category: '',
      is_active: true,
      priority: 5,
      ai_rules: {
        enabled: false,
        scoreThreshold: 8.0,
        scoringPrompt: '',
        optimizationPrompt: '',
        contentRequirements: '',
      },
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (kw: NewsKeyword) => {
    setEditingKeyword(kw);
    const aiRules = kw.ai_rules || {};
    setFormData({
      keyword: kw.keyword,
      keyword_en: kw.keyword_en || '',
      category: kw.category,
      is_active: kw.is_active,
      priority: kw.priority,
      ai_rules: {
        enabled: aiRules.enabled || false,
        scoreThreshold: aiRules.scoreThreshold || 8.0,
        scoringPrompt: aiRules.scoringPrompt || '',
        optimizationPrompt: aiRules.optimizationPrompt || '',
        contentRequirements: aiRules.contentRequirements || '',
      },
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.keyword.trim() || !formData.category.trim()) {
      toast({
        title: '请填写必填项',
        description: '关键词和分类不能为空',
        variant: 'destructive',
      });
      return;
    }

    try {
      const aiRulesJson = JSON.parse(JSON.stringify(formData.ai_rules));
      const data = {
        keyword: formData.keyword.trim(),
        keyword_en: formData.keyword_en.trim() || null,
        category: formData.category.trim(),
        is_active: formData.is_active,
        priority: formData.priority,
        ai_rules: aiRulesJson,
      };

      if (editingKeyword) {
        const { error } = await supabase
          .from('news_keywords')
          .update(data)
          .eq('id', editingKeyword.id);
        if (error) throw error;
        toast({ title: '关键词已更新' });
      } else {
        const { error } = await supabase
          .from('news_keywords')
          .insert([data]);
        if (error) throw error;
        toast({ title: '关键词已添加' });
      }

      setIsDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({
        title: '保存失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteKeywordId) return;

    try {
      const { error } = await supabase
        .from('news_keywords')
        .delete()
        .eq('id', deleteKeywordId);

      if (error) throw error;
      toast({ title: '关键词已删除' });
      fetchData();
    } catch (error: any) {
      toast({
        title: '删除失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteKeywordId(null);
    }
  };

  const toggleKeywordActive = async (kw: NewsKeyword) => {
    try {
      const { error } = await supabase
        .from('news_keywords')
        .update({ is_active: !kw.is_active })
        .eq('id', kw.id);

      if (error) throw error;
      toast({ title: kw.is_active ? '已暂停采集' : '已启用采集' });
      fetchData();
    } catch (error: any) {
      toast({
        title: '操作失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const collectSingleKeyword = async (kw: NewsKeyword) => {
    setCollecting(true);
    try {
      const response = await supabase.functions.invoke('collect-news', {
        body: {
          action: 'collect',
          keyword: kw.keyword,
          category: kw.category,
          limit: 3,
          autoPublish: false,
          aiRules: kw.ai_rules, // 传递 AI 规则
        },
      });

      if (response.error) throw response.error;

      toast({
        title: '采集完成',
        description: `成功采集 ${response.data.articlesCollected} 篇文章`,
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: '采集失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setCollecting(false);
    }
  };

  const collectAllKeywords = async (autoPublish: boolean = false) => {
    setCollecting(true);
    try {
      const response = await supabase.functions.invoke('collect-news', {
        body: {
          action: 'collect-all',
          limit: 10,
          autoPublish,
        },
      });

      if (response.error) throw response.error;

      toast({
        title: '批量采集完成',
        description: `成功采集 ${response.data.totalCollected} 篇文章${autoPublish ? `，已发布 ${response.data.totalPublished} 篇` : ''}`,
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: '采集失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setCollecting(false);
    }
  };

  // Firecrawl 每日采集（三分类）
  const collectWithFirecrawl = async (autoPublish: boolean = false) => {
    setFirecrawlCollecting(true);
    stopBackgroundMonitor();
    clearCollectionLogs();
    addCollectionLog({ type: 'step', step: 'search', message: '开始三分类采集...' });

    let keepRunning = false;
    
    try {
      const response = await supabase.functions.invoke('collect-news-firecrawl', {
        body: {
          action: 'collect-daily',
          dailyConfig: {
            "公司新闻": 1,
            "行业动态": 1,
            "技术分享": 1,
          },
          autoPublish,
        },
      });

      if (response.error) throw response.error;

      // 解析日志
      if (response.data?.logs) {
        parseLogsFromResponse(response.data.logs);
      }

      const results = response.data.results || {};
      const details = Object.entries(results)
        .map(([cat, data]: [string, any]) => {
          const collected = Number(data?.collected ?? 0);
          const filtered = Number(data?.filtered ?? 0);
          return filtered > 0 ? `${cat}: ${collected}篇（过滤${filtered}）` : `${cat}: ${collected}篇`;
        })
        .join('，');

      const totalCollected = Number(response.data.articlesCollected ?? 0);
      const totalFiltered = Number(response.data.articlesFiltered ?? 0);

      addCollectionLog({ type: 'success', message: `三分类采集完成: ${details || `采集${totalCollected}篇`}` });

      toast({
        title: '三分类采集完成',
        description:
          details ||
          (totalCollected > 0
            ? `成功采集 ${totalCollected} 篇文章`
            : `未采集到新文章（过滤 ${totalFiltered} 篇；可能已存在或被质量规则过滤）`),
      });
      fetchData();
    } catch (error: any) {
      const isTransient = isTransientCollectionError(error);
      if (isTransient) {
        keepRunning = true;
        startBackgroundMonitor(String(error?.message || error));
      }

      addCollectionLog({
        type: isTransient ? 'info' : 'error',
        message: isTransient
          ? '⏳ 采集中（前端连接中断，已启动自动刷新）'
          : `采集失败: ${error.message}`,
      });

      toast({
        title: isTransient ? '采集进行中' : '采集失败',
        description: isTransient
          ? '前端与后台连接中断，但后台可能仍在继续执行。系统将自动刷新数据（约3分钟）。'
          : error.message,
        variant: isTransient ? 'default' : 'destructive',
      });
    } finally {
      if (!keepRunning) setFirecrawlCollecting(false);
    }
  };

  // 按单个分类采集
  const collectByCategory = async (category: string, count: number = 3) => {
    setFirecrawlCollecting(true);
    stopBackgroundMonitor();
    clearCollectionLogs();
    addCollectionLog({ type: 'step', step: 'search', message: `开始采集 ${category} 分类...` });

    let keepRunning = false;
    
    try {
      const response = await supabase.functions.invoke('collect-news-firecrawl', {
        body: {
          action: 'collect-by-category',
          category,
          count,
          autoPublish: true,
        },
      });

      if (response.error) throw response.error;

      // 解析日志
      if (response.data?.logs) {
        parseLogsFromResponse(response.data.logs);
      }

      const collected = Number(response.data.collected ?? 0);
      const filtered = Number(response.data.filtered ?? 0);

      addCollectionLog({ type: 'success', message: `${category} 采集完成: ${collected}篇${filtered ? `（过滤${filtered}篇）` : ''}` });

      toast({
        title: `${category} 采集完成`,
        description:
          collected > 0
            ? `成功采集 ${collected} 篇文章${filtered ? `（过滤 ${filtered} 篇）` : ''}`
            : `未采集到新文章（过滤 ${filtered} 篇；可能已存在或被质量规则过滤）`,
      });
      fetchData();
    } catch (error: any) {
      const isTransient = isTransientCollectionError(error);
      if (isTransient) {
        keepRunning = true;
        startBackgroundMonitor(String(error?.message || error));
      }

      addCollectionLog({
        type: isTransient ? 'info' : 'error',
        message: isTransient
          ? '⏳ 采集中（前端连接中断，已启动自动刷新）'
          : `采集失败: ${error.message}`,
      });

      toast({
        title: isTransient ? '采集进行中' : '采集失败',
        description: isTransient
          ? '前端与后台连接中断，但后台可能仍在继续执行。系统将自动刷新数据（约3分钟）。'
          : error.message,
        variant: isTransient ? 'default' : 'destructive',
      });
    } finally {
      if (!keepRunning) setFirecrawlCollecting(false);
    }
  };
  const handleCustomSearch = async () => {
    if (!customSearchQuery.trim()) {
      toast({
        title: '请输入搜索关键词',
        variant: 'destructive',
      });
      return;
    }

    setFirecrawlCollecting(true);
    try {
      const response = await supabase.functions.invoke('collect-news-firecrawl', {
        body: {
          action: 'search-custom',
          searchQuery: customSearchQuery.trim(),
        },
      });

      if (response.error) throw response.error;

      setSearchResults(response.data.results || []);
      toast({
        title: '搜索完成',
        description: `找到 ${response.data.results?.length || 0} 条结果`,
      });
    } catch (error: any) {
      toast({
        title: '搜索失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setFirecrawlCollecting(false);
    }
  };

  // 清理历史文章图片（分批处理避免超时）
  const cleanupHistoricalImages = async (totalLimit: number = 50) => {
    setCleaningImages(true);
    setCleaningProgress(null);
    
    const batchSize = 3; // 每批3篇避免超时
    let offset = 0;
    let totalProcessed = 0;
    let totalUpdated = 0;
    let totalConverted = 0;
    let totalRejected = 0;
    let totalImagesProcessedCount = 0;
    const allErrors: string[] = [];

    addCollectionLog({ type: 'step', message: `开始清理历史文章图片（共${totalLimit}篇，每批${batchSize}篇）...` });
    
    try {
      while (offset < totalLimit) {
        const currentBatch = Math.min(batchSize, totalLimit - offset);
        addCollectionLog({ type: 'step', message: `处理第 ${offset + 1}-${offset + currentBatch} 篇...` });

        const response = await supabase.functions.invoke('process-news-images', {
          body: {
            action: 'cleanup-history',
            limit: currentBatch,
            offset,
          },
        });

        if (response.error) throw response.error;

        const data = response.data?.data;
        if (data) {
          totalProcessed += data.processedArticles || 0;
          totalUpdated += data.updatedArticles || 0;
          totalConverted += data.totalImagesConverted || 0;
          totalRejected += data.totalImagesRejected || 0;
          totalImagesProcessedCount += data.totalImagesProcessed || 0;
          if (data.errors) allErrors.push(...data.errors);

          // 如果返回的文章数少于请求数，说明没有更多文章了
          if ((data.processedArticles || 0) < currentBatch) {
            addCollectionLog({ type: 'step', message: '没有更多文章需要处理' });
            break;
          }
        }

        setCleaningProgress({
          processedArticles: totalProcessed,
          updatedArticles: totalUpdated,
          totalImagesProcessed: totalImagesProcessedCount,
          totalImagesConverted: totalConverted,
          totalImagesRejected: totalRejected,
        });

        offset += currentBatch;
        
        // 批次间短暂延迟
        if (offset < totalLimit) {
          await new Promise(r => setTimeout(r, 1000));
        }
      }

      addCollectionLog({ 
        type: 'success', 
        message: `图片清理完成: 处理${totalProcessed}篇文章，更新${totalUpdated}篇`,
        details: `转存${totalConverted}张，移除不相关${totalRejected}张`,
      });

      if (allErrors.length > 0) {
        allErrors.forEach((err: string) => {
          addCollectionLog({ type: 'warning', message: err });
        });
      }

      toast({
        title: '图片清理完成',
        description: `处理了 ${totalProcessed} 篇文章，更新了 ${totalUpdated} 篇`,
      });
    } catch (error: any) {
      addCollectionLog({ type: 'error', message: `清理失败: ${error.message}` });
      toast({
        title: '清理失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setCleaningImages(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400"><CheckCircle className="w-3 h-3 mr-1" />完成</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500/20 text-blue-400"><Loader2 className="w-3 h-3 mr-1 animate-spin" />处理中</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400"><XCircle className="w-3 h-3 mr-1" />失败</Badge>;
      default:
        return <Badge className="bg-slate-500/20 text-slate-400"><Clock className="w-3 h-3 mr-1" />等待</Badge>;
    }
  };

  // 过滤后的关键词列表
  const filteredKeywords = keywords.filter(kw => {
    const matchesCategory = selectedCategory === "全部" || kw.category === selectedCategory;
    const matchesSearch = keywordSearch === "" || 
      kw.keyword.toLowerCase().includes(keywordSearch.toLowerCase()) ||
      (kw.keyword_en && kw.keyword_en.toLowerCase().includes(keywordSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // 分页后的关键词列表
  const totalKeywordPages = Math.min(Math.ceil(filteredKeywords.length / KEYWORDS_PER_PAGE), MAX_KEYWORD_PAGES);
  const paginatedKeywords = filteredKeywords.slice(
    (keywordPage - 1) * KEYWORDS_PER_PAGE,
    keywordPage * KEYWORDS_PER_PAGE
  );

  // 当过滤条件改变时重置页码
  useEffect(() => {
    setKeywordPage(1);
  }, [selectedCategory, keywordSearch]);

  // 获取分类统计
  const getCategoryCount = (category: string) => {
    if (category === "全部") return keywords.length;
    return keywords.filter(k => k.category === category).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">自动新闻采集</h1>
              <p className="text-xs text-slate-400">AI-Powered News Collection</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Home className="w-4 h-4 mr-2" />
                返回前台
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-400 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              退出
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between">
          <Link to="/admin">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回管理后台
            </Button>
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              onClick={autoGenerateAndCollect}
              disabled={firecrawlCollecting || generatingKeywords}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {firecrawlCollecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Bot className="w-4 h-4 mr-2" />}
              AI自动采集
            </Button>
            <Button
              onClick={generateHotKeywords}
              disabled={generatingKeywords || firecrawlCollecting}
              variant="outline"
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
            >
              {generatingKeywords ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
              AI生成关键词
            </Button>
            <Button 
              onClick={() => collectAllKeywords(false)}
              disabled={collecting || firecrawlCollecting}
              variant="outline"
              className="border-slate-600"
            >
              {collecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              采集为草稿
            </Button>
            <Button 
              onClick={() => collectAllKeywords(true)}
              disabled={collecting || firecrawlCollecting}
              className="bg-amber-500 hover:bg-amber-600"
            >
              {collecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
              采集并发布
            </Button>
          </div>
        </div>

        {/* 质量评分说明 */}
        <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-base">
              <Star className="w-5 h-5 text-amber-400" />
              AI 质量评分系统
              <Badge className="bg-amber-500/20 text-amber-300 ml-2">已启用</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">评分阈值: <span className="text-amber-400 font-bold">{QUALITY_THRESHOLD}</span> 分</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-green-400" />
                <span className="text-slate-300">满分: <span className="text-green-400 font-bold">10</span> 分</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" />
                <span className="text-slate-300">低于 {QUALITY_THRESHOLD} 分自动过滤</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              评分维度：内容相关性、信息价值、内容质量、原创深度、可读性（各2分）
            </p>
          </CardContent>
        </Card>

        {/* 新闻板块分类导航 - 可点击 */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-base">
              <LayoutGrid className="w-5 h-5 text-purple-400" />
              新闻中心板块
            </CardTitle>
            <CardDescription className="text-slate-400">
              点击板块查看对应关键词，快速采集指定板块新闻
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {NEWS_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.value;
                const count = getCategoryCount(cat.value);
                
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`p-4 rounded-lg border text-left transition-all hover:scale-[1.02] ${
                      isActive
                        ? `${cat.bgColor} border-2 ${cat.color.replace('text-', 'border-')}`
                        : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${isActive ? cat.color : 'text-slate-400'}`} />
                      <Badge variant="secondary" className="text-xs">
                        {count}
                      </Badge>
                    </div>
                    <span className={`font-medium text-sm ${isActive ? cat.color : 'text-white'}`}>
                      {cat.label}
                    </span>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{cat.description}</p>
                    {cat.value !== "全部" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`mt-2 w-full text-xs h-7 ${cat.color} hover:${cat.bgColor}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          collectByCategory(cat.value, 3);
                        }}
                        disabled={firecrawlCollecting}
                      >
                        {firecrawlCollecting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3 mr-1" />}
                        采集3篇
                      </Button>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 三分类智能采集区域 */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              新闻中心板块采集
              <Badge className="bg-purple-500/20 text-purple-300 ml-2">与前台对应</Badge>
            </CardTitle>
            <CardDescription className="text-slate-400">
              按新闻中心三个板块（公司新闻、行业动态、技术分享）智能采集，AI 评分筛选后发布
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 一键三分类采集 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={() => collectWithFirecrawl(false)}
                disabled={firecrawlCollecting}
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              >
                {firecrawlCollecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                三分类采集 (草稿)
              </Button>
              <Button 
                onClick={() => collectWithFirecrawl(true)}
                disabled={firecrawlCollecting}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {firecrawlCollecting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                三分类采集并发布
              </Button>
            </div>

            {/* 自定义搜索 */}
            <div className="flex gap-2">
              <Input
                value={customSearchQuery}
                onChange={(e) => setCustomSearchQuery(e.target.value)}
                placeholder="输入自定义搜索关键词，如：tethered drone technology"
                className="bg-slate-700/50 border-slate-600"
                onKeyDown={(e) => e.key === 'Enter' && handleCustomSearch()}
              />
              <Button 
                onClick={handleCustomSearch}
                disabled={firecrawlCollecting}
                variant="outline"
                className="border-slate-600"
              >
                {firecrawlCollecting ? <Loader2 className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>

            {/* 搜索结果 */}
            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <p className="text-sm text-slate-400">搜索结果 ({searchResults.length}):</p>
                {searchResults.map((result, index) => (
                  <div key={index} className="p-3 bg-slate-800/50 rounded-lg">
                    <a 
                      href={result.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:underline line-clamp-1"
                    >
                      {result.title || result.url}
                    </a>
                    {result.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{result.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 历史图片清理 */}
        <Card className="bg-gradient-to-r from-rose-900/30 to-pink-900/30 border-rose-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-rose-400" />
              历史文章图片清理
              <Badge className="bg-rose-500/20 text-rose-300 ml-2">AI评估</Badge>
            </CardTitle>
            <CardDescription className="text-slate-400">
              批量处理历史文章图片：转存防盗链图片到本地、AI评估图片相关性（6分以上通过）、移除不相关图片
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={() => cleanupHistoricalImages(20)}
                disabled={cleaningImages}
                variant="outline"
                className="border-rose-500/50 text-rose-300 hover:bg-rose-500/20"
              >
                {cleaningImages ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                清理20篇文章
              </Button>
              <Button 
                onClick={() => cleanupHistoricalImages(50)}
                disabled={cleaningImages}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                {cleaningImages ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                清理50篇文章
              </Button>
            </div>
            
            {cleaningProgress && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">{cleaningProgress.processedArticles}</div>
                  <div className="text-slate-400 text-xs">处理文章</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">{cleaningProgress.updatedArticles}</div>
                  <div className="text-slate-400 text-xs">更新文章</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">{cleaningProgress.totalImagesProcessed}</div>
                  <div className="text-slate-400 text-xs">处理图片</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-amber-400">{cleaningProgress.totalImagesConverted}</div>
                  <div className="text-slate-400 text-xs">转存图片</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-400">{cleaningProgress.totalImagesRejected}</div>
                  <div className="text-slate-400 text-xs">移除图片</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 定时任务配置 */}
        <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  定时任务配置
                  <Badge className="bg-green-500/20 text-green-300 ml-2">自动</Badge>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  配置每日自动采集任务，支持自定义 AI 优化规则，系统将在指定时间自动执行采集并发布
                </CardDescription>
              </div>
              <Button
                onClick={openTaskCreateDialog}
                className="bg-green-500 hover:bg-green-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                新建任务
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {scheduledTasks.length > 0 ? (
              <div className="space-y-4">
                {scheduledTasks.map((task) => {
                  const categoryInfo = SELECTABLE_CATEGORIES.find(c => c.value === task.category);
                  const CategoryIcon = categoryInfo?.icon || Clock;
                  return (
                    <div key={task.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${task.is_enabled ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-white">{task.name}</p>
                              {categoryInfo && (
                                <Badge className={`${categoryInfo.bgColor} ${categoryInfo.color}`}>
                                  <CategoryIcon className="w-3 h-3 mr-1" />
                                  {categoryInfo.label}
                                </Badge>
                              )}
                              {task.ai_rules?.enabled && (
                                <Badge className="bg-purple-500/20 text-purple-400">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  自定义AI规则
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                              {task.description} · Cron: {task.cron_expression} · 每次采集 {task.article_count || 1} 篇
                              {task.auto_publish !== false ? ' · 自动发布' : ' · 草稿模式'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openTaskEditDialog(task)}
                            className="border-slate-600 text-slate-300 hover:text-white"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            编辑
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleScheduledTask(task)}
                            className={task.is_enabled ? 'border-orange-500/50 text-orange-300' : 'border-green-500/50 text-green-300'}
                          >
                            {task.is_enabled ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                            {task.is_enabled ? '暂停' : '启用'}
                          </Button>
                          <Button
                            onClick={() => triggerSingleTask(task)}
                            disabled={!!runningScheduledTaskId}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            {runningScheduledTaskId === task.id ? (
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <Play className="w-4 h-4 mr-1" />
                            )}
                            立即执行
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">上次执行</p>
                          <p className="text-white">{task.last_run_at ? formatDate(task.last_run_at) : '尚未执行'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">执行状态</p>
                          <p className={`${task.last_status === 'completed' ? 'text-green-400' : task.last_status === 'failed' ? 'text-red-400' : 'text-slate-300'}`}>
                            {task.last_status === 'completed' ? '成功' : task.last_status === 'failed' ? '失败' : task.last_status === 'running' ? '运行中' : '等待中'}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400">下次执行</p>
                          <p className="text-white">{task.next_run_at ? formatDate(task.next_run_at) : '等待调度'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">评分阈值</p>
                          <p className="text-amber-400">{task.ai_rules?.scoreThreshold || 8.0} 分</p>
                        </div>
                      </div>
                      {task.last_error && (
                        <div className="mt-2 p-2 bg-red-500/10 rounded text-xs text-red-400">
                          错误: {task.last_error}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>暂无定时任务配置</p>
                <Button
                  onClick={openTaskCreateDialog}
                  variant="outline"
                  className="mt-4 border-green-500/50 text-green-300"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  创建第一个任务
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Collection Log Panel */}
        <CollectionLogPanel 
          logs={collectionLogs} 
          isCollecting={!!runningScheduledTaskId || firecrawlCollecting}
          onClear={clearCollectionLogs}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Rss className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{keywords.length}</p>
                  <p className="text-sm text-slate-400">采集关键词</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{keywords.filter(k => k.is_active).length}</p>
                  <p className="text-sm text-slate-400">活跃关键词</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {tasks.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.articles_collected, 0)}
                  </p>
                  <p className="text-sm text-slate-400">已采集文章</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {tasks.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.articles_published, 0)}
                  </p>
                  <p className="text-sm text-slate-400">已发布文章</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Keywords Management */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Rss className="w-5 h-5" />
                  采集关键词配置
                  {selectedCategory !== "全部" && (
                    <Badge className={NEWS_CATEGORIES.find(c => c.value === selectedCategory)?.bgColor}>
                      {selectedCategory}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-slate-400 mt-1">
                  配置并管理自动采集的关键词，每个关键词可单独配置 Gemini AI 规则
                </CardDescription>
              </div>
              <Button onClick={openCreateDialog} className="bg-amber-500 hover:bg-amber-600">
                <Plus className="w-4 h-4 mr-2" />
                添加关键词
              </Button>
            </div>
            {/* 关键词搜索框 */}
            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={keywordSearch}
                  onChange={(e) => setKeywordSearch(e.target.value)}
                  placeholder="搜索关键词..."
                  className="bg-slate-700/50 border-slate-600 pl-10"
                />
              </div>
              {keywordSearch && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setKeywordSearch('')}
                  className="text-slate-400"
                >
                  清除
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">关键词</TableHead>
                  <TableHead className="text-slate-400">英文关键词</TableHead>
                  <TableHead className="text-slate-400">对应板块</TableHead>
                  <TableHead className="text-slate-400">AI规则</TableHead>
                  <TableHead className="text-slate-400">优先级</TableHead>
                  <TableHead className="text-slate-400">状态</TableHead>
                  <TableHead className="text-slate-400 text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedKeywords.map((kw) => {
                  const catConfig = NEWS_CATEGORIES.find(c => c.value === kw.category);
                  const hasAiRules = kw.ai_rules?.enabled;
                  return (
                    <TableRow key={kw.id} className="border-slate-700">
                      <TableCell className="text-white font-medium">{kw.keyword}</TableCell>
                      <TableCell className="text-slate-400">{kw.keyword_en || '-'}</TableCell>
                      <TableCell>
                        <Badge className={`${catConfig?.bgColor || 'bg-slate-500/20'} ${catConfig?.color || 'text-slate-400'}`}>
                          {kw.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {hasAiRules ? (
                          <Badge className="bg-purple-500/20 text-purple-400">
                            <Settings className="w-3 h-3 mr-1" />
                            已配置
                          </Badge>
                        ) : (
                          <span className="text-slate-500 text-xs">默认规则</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-400">{kw.priority}</TableCell>
                      <TableCell>
                        <Badge className={kw.is_active ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'}>
                          {kw.is_active ? '活跃' : '暂停'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => collectSingleKeyword(kw)}
                            disabled={collecting}
                            className="text-amber-400 hover:text-amber-300"
                            title="采集此关键词"
                          >
                            {collecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleKeywordActive(kw)}
                            className={kw.is_active ? 'text-orange-400 hover:text-orange-300' : 'text-green-400 hover:text-green-300'}
                          >
                            {kw.is_active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(kw)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setDeleteKeywordId(kw.id);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredKeywords.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-slate-400 py-8">
                      {keywordSearch ? '没有找到匹配的关键词' : '暂无采集关键词，点击"添加关键词"开始配置'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {/* 分页控件 */}
            {totalKeywordPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                <div className="text-sm text-slate-400">
                  共 {filteredKeywords.length} 个关键词，第 {keywordPage} / {totalKeywordPages} 页
                  {filteredKeywords.length > MAX_KEYWORD_PAGES * KEYWORDS_PER_PAGE && (
                    <span className="text-amber-400 ml-2">（仅显示前 {MAX_KEYWORD_PAGES * KEYWORDS_PER_PAGE} 个）</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setKeywordPage(1)}
                    disabled={keywordPage === 1}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    首页
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setKeywordPage(prev => Math.max(1, prev - 1))}
                    disabled={keywordPage === 1}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  {/* 页码按钮 */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalKeywordPages) }, (_, i) => {
                      let pageNum: number;
                      if (totalKeywordPages <= 5) {
                        pageNum = i + 1;
                      } else if (keywordPage <= 3) {
                        pageNum = i + 1;
                      } else if (keywordPage >= totalKeywordPages - 2) {
                        pageNum = totalKeywordPages - 4 + i;
                      } else {
                        pageNum = keywordPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === keywordPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => setKeywordPage(pageNum)}
                          className={pageNum === keywordPage 
                            ? "bg-amber-500 hover:bg-amber-600 text-white" 
                            : "border-slate-600 text-slate-300 hover:bg-slate-700"
                          }
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setKeywordPage(prev => Math.min(totalKeywordPages, prev + 1))}
                    disabled={keywordPage === totalKeywordPages}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setKeywordPage(totalKeywordPages)}
                    disabled={keywordPage === totalKeywordPages}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    末页
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Collection Tasks History */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              采集任务历史
            </CardTitle>
            <CardDescription className="text-slate-400">
              查看最近的新闻采集任务执行记录
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">关键词</TableHead>
                  <TableHead className="text-slate-400">分类</TableHead>
                  <TableHead className="text-slate-400">采集数</TableHead>
                  <TableHead className="text-slate-400">发布数</TableHead>
                  <TableHead className="text-slate-400">状态</TableHead>
                  <TableHead className="text-slate-400">执行时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="border-slate-700">
                    <TableCell className="text-white">{task.keyword}</TableCell>
                    <TableCell className="text-slate-400">{task.category}</TableCell>
                    <TableCell className="text-slate-400">{task.articles_collected}</TableCell>
                    <TableCell className="text-slate-400">{task.articles_published}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell className="text-slate-400 text-sm">{formatDate(task.created_at)}</TableCell>
                  </TableRow>
                ))}
                {tasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-slate-400 py-8">
                      暂无采集任务记录
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Add/Edit Keyword Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingKeyword ? '编辑关键词' : '添加关键词'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              配置要自动采集的新闻关键词，可单独设置 Gemini AI 规则
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">中文关键词 *</Label>
              <div className="flex gap-2">
                <Input
                  id="keyword"
                  value={formData.keyword}
                  onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                  placeholder="例如：无人机、电力巡检"
                  className="bg-slate-700 border-slate-600 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => translateKeyword(formData.keyword)}
                  disabled={translating || !formData.keyword.trim()}
                  className="border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
                >
                  {translating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI翻译
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-slate-500">输入中文关键词后点击"AI翻译"自动生成英文</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyword_en">英文关键词（用于搜索）</Label>
              <Input
                id="keyword_en"
                value={formData.keyword_en}
                onChange={(e) => setFormData({ ...formData, keyword_en: e.target.value })}
                placeholder="自动翻译或手动输入"
                className="bg-slate-700 border-slate-600"
              />
              {formData.keyword_en && (
                <p className="text-xs text-green-400">✓ 将使用此关键词进行英文新闻搜索</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">对应新闻板块 *</Label>
              <p className="text-xs text-slate-500 mb-2">
                选择该关键词采集的文章将发布到新闻中心的哪个板块
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SELECTABLE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.value })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      formData.category === cat.value
                        ? `${cat.bgColor} border-2 ${cat.color.replace('text-', 'border-')}`
                        : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <span className={`font-medium ${formData.category === cat.value ? cat.color : 'text-white'}`}>
                      {cat.label}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{cat.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">优先级 (1-10)</Label>
              <Input
                id="priority"
                type="number"
                min="1"
                max="10"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 5 })}
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">启用采集</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>

            {/* AI 规则配置 */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="ai-rules" className="border-slate-600">
                <AccordionTrigger className="text-white hover:text-amber-400">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Gemini AI 规则配置
                    {formData.ai_rules.enabled && (
                      <Badge className="bg-purple-500/20 text-purple-400 ml-2">已启用</Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ai_enabled">启用自定义 AI 规则</Label>
                      <p className="text-xs text-slate-500">启用后将使用自定义规则替代全局规则</p>
                    </div>
                    <Switch
                      id="ai_enabled"
                      checked={formData.ai_rules.enabled}
                      onCheckedChange={(checked) => setFormData({ 
                        ...formData, 
                        ai_rules: { ...formData.ai_rules, enabled: checked }
                      })}
                    />
                  </div>

                  {formData.ai_rules.enabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="scoreThreshold">评分阈值 (1-10)</Label>
                        <Input
                          id="scoreThreshold"
                          type="number"
                          min="1"
                          max="10"
                          step="0.5"
                          value={formData.ai_rules.scoreThreshold}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            ai_rules: { ...formData.ai_rules, scoreThreshold: parseFloat(e.target.value) || 8.0 }
                          })}
                          className="bg-slate-700 border-slate-600"
                        />
                        <p className="text-xs text-slate-500">低于此分数的文章将被自动过滤</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="scoringPrompt">评分规则提示词</Label>
                        <Textarea
                          id="scoringPrompt"
                          value={formData.ai_rules.scoringPrompt}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            ai_rules: { ...formData.ai_rules, scoringPrompt: e.target.value }
                          })}
                          placeholder="自定义评分规则，例如：重点关注技术深度和实用性..."
                          className="bg-slate-700 border-slate-600 min-h-[80px]"
                        />
                        <p className="text-xs text-slate-500">自定义 AI 评分时的关注点和标准</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="optimizationPrompt">文章优化提示词</Label>
                        <Textarea
                          id="optimizationPrompt"
                          value={formData.ai_rules.optimizationPrompt}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            ai_rules: { ...formData.ai_rules, optimizationPrompt: e.target.value }
                          })}
                          placeholder="自定义文章优化规则，例如：保持专业性，添加行业数据支撑..."
                          className="bg-slate-700 border-slate-600 min-h-[80px]"
                        />
                        <p className="text-xs text-slate-500">AI 润色和优化文章时的指导规则</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contentRequirements">内容要求</Label>
                        <Textarea
                          id="contentRequirements"
                          value={formData.ai_rules.contentRequirements}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            ai_rules: { ...formData.ai_rules, contentRequirements: e.target.value }
                          })}
                          placeholder="文章内容要求，例如：必须包含数据支撑、需要有实际案例..."
                          className="bg-slate-700 border-slate-600 min-h-[80px]"
                        />
                        <p className="text-xs text-slate-500">对采集文章内容的特殊要求</p>
                      </div>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} className="bg-amber-500 hover:bg-amber-600">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">确认删除</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              确定要删除这个关键词吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              取消
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Task Edit/Create Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              {editingTask ? '编辑定时任务' : '新建定时任务'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              配置定时采集任务，支持自定义采集规则和 AI 优化参数
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* 基本信息 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task_name">任务名称 *</Label>
                <Input
                  id="task_name"
                  value={taskFormData.name}
                  onChange={(e) => setTaskFormData({ ...taskFormData, name: e.target.value })}
                  placeholder="例如：每日行业动态采集"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task_cron">Cron 表达式</Label>
                <Input
                  id="task_cron"
                  value={taskFormData.cron_expression}
                  onChange={(e) => setTaskFormData({ ...taskFormData, cron_expression: e.target.value })}
                  placeholder="0 8 * * *"
                  className="bg-slate-700 border-slate-600"
                />
                <p className="text-xs text-slate-500">默认: 0 8 * * * (每天早上8点)</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task_description">任务描述</Label>
              <Input
                id="task_description"
                value={taskFormData.description}
                onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                placeholder="描述任务的功能，例如：每天采集1篇行业动态文章"
                className="bg-slate-700 border-slate-600"
              />
            </div>

            {/* 采集配置 */}
            <div className="space-y-2">
              <Label>采集分类 *</Label>
              <div className="grid grid-cols-2 gap-2">
                {SELECTABLE_CATEGORIES.map((cat) => {
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setTaskFormData({ ...taskFormData, category: cat.value })}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        taskFormData.category === cat.value
                          ? `${cat.bgColor} border-current ${cat.color}`
                          : 'bg-slate-700/50 border-slate-600 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CatIcon className="w-4 h-4" />
                        <span className="font-medium">{cat.label}</span>
                      </div>
                      <p className="text-xs opacity-70 mt-1">{cat.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task_article_count">每次采集数量</Label>
                <Input
                  id="task_article_count"
                  type="number"
                  min="1"
                  max="10"
                  value={taskFormData.article_count}
                  onChange={(e) => setTaskFormData({ ...taskFormData, article_count: parseInt(e.target.value) || 1 })}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <Label htmlFor="task_auto_publish">自动发布</Label>
                  <p className="text-xs text-slate-500">采集后直接发布</p>
                </div>
                <Switch
                  id="task_auto_publish"
                  checked={taskFormData.auto_publish}
                  onCheckedChange={(checked) => setTaskFormData({ ...taskFormData, auto_publish: checked })}
                />
              </div>
            </div>

            {/* AI 规则配置 */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="task-ai-rules" className="border-slate-600">
                <AccordionTrigger className="text-white hover:text-green-400">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI 优化规则配置
                    {taskFormData.ai_rules.enabled && (
                      <Badge className="bg-purple-500/20 text-purple-400 ml-2">已启用</Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <Label htmlFor="task_ai_enabled">启用自定义 AI 规则</Label>
                      <p className="text-xs text-slate-500">启用后将使用任务专属的 AI 规则</p>
                    </div>
                    <Switch
                      id="task_ai_enabled"
                      checked={taskFormData.ai_rules.enabled}
                      onCheckedChange={(checked) => setTaskFormData({ 
                        ...taskFormData, 
                        ai_rules: { ...taskFormData.ai_rules, enabled: checked }
                      })}
                    />
                  </div>

                  {taskFormData.ai_rules.enabled && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="task_scoreThreshold">评分阈值 (1-10)</Label>
                        <Input
                          id="task_scoreThreshold"
                          type="number"
                          min="1"
                          max="10"
                          step="0.5"
                          value={taskFormData.ai_rules.scoreThreshold}
                          onChange={(e) => setTaskFormData({ 
                            ...taskFormData, 
                            ai_rules: { ...taskFormData.ai_rules, scoreThreshold: parseFloat(e.target.value) || 8.0 }
                          })}
                          className="bg-slate-700 border-slate-600"
                        />
                        <p className="text-xs text-slate-500">低于此分数的文章将被自动过滤</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="task_scoringPrompt">评分规则提示词</Label>
                        <Textarea
                          id="task_scoringPrompt"
                          value={taskFormData.ai_rules.scoringPrompt}
                          onChange={(e) => setTaskFormData({ 
                            ...taskFormData, 
                            ai_rules: { ...taskFormData.ai_rules, scoringPrompt: e.target.value }
                          })}
                          placeholder="自定义评分规则，例如：重点关注技术深度和实用性..."
                          className="bg-slate-700 border-slate-600 min-h-[80px]"
                        />
                        <p className="text-xs text-slate-500">自定义 AI 评分时的关注点和标准</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="task_optimizationPrompt">文章优化提示词</Label>
                        <Textarea
                          id="task_optimizationPrompt"
                          value={taskFormData.ai_rules.optimizationPrompt}
                          onChange={(e) => setTaskFormData({ 
                            ...taskFormData, 
                            ai_rules: { ...taskFormData.ai_rules, optimizationPrompt: e.target.value }
                          })}
                          placeholder="自定义文章优化规则，例如：保持专业性，添加行业数据支撑..."
                          className="bg-slate-700 border-slate-600 min-h-[80px]"
                        />
                        <p className="text-xs text-slate-500">AI 润色和优化文章时的指导规则</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="task_contentRequirements">内容要求</Label>
                        <Textarea
                          id="task_contentRequirements"
                          value={taskFormData.ai_rules.contentRequirements}
                          onChange={(e) => setTaskFormData({ 
                            ...taskFormData, 
                            ai_rules: { ...taskFormData.ai_rules, contentRequirements: e.target.value }
                          })}
                          placeholder="文章内容要求，例如：必须包含数据支撑、需要有实际案例..."
                          className="bg-slate-700 border-slate-600 min-h-[80px]"
                        />
                        <p className="text-xs text-slate-500">对采集文章内容的特殊要求</p>
                      </div>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsTaskDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveTask} className="bg-green-500 hover:bg-green-600">
              {editingTask ? '保存修改' : '创建任务'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI生成关键词结果对话框 */}
      <Dialog open={isKeywordResultDialogOpen} onOpenChange={setIsKeywordResultDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              AI 生成的热门关键词
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              根据当前无人机行业热点和产品线生成，点击关键词可添加到采集列表
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {generatedKeywords && Object.entries(generatedKeywords).map(([category, keywords]) => {
              const catConfig = NEWS_CATEGORIES.find(c => c.value === category);
              const Icon = catConfig?.icon || Rss;
              const color = catConfig?.color || 'text-slate-400';
              const bgColor = catConfig?.bgColor || 'bg-slate-500/20';

              return (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${bgColor}`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <h3 className={`font-semibold ${color}`}>{category}</h3>
                    <Badge variant="outline" className="text-slate-400 border-slate-600">
                      {keywords.length} 个关键词
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-10">
                    {keywords.map((keyword, index) => (
                      <button
                        key={index}
                        onClick={() => addGeneratedKeyword(keyword, category)}
                        className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-full border border-slate-600 hover:border-slate-500 transition-all flex items-center gap-1.5 group"
                      >
                        <span>{keyword}</span>
                        <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-green-400" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            {!generatedKeywords && (
              <div className="text-center py-8 text-slate-500">
                暂无生成的关键词
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-slate-700 pt-4">
            <Button variant="ghost" onClick={() => setIsKeywordResultDialogOpen(false)}>
              关闭
            </Button>
            <Button 
              onClick={generateHotKeywords}
              disabled={generatingKeywords}
              className="bg-purple-500 hover:bg-purple-600"
            >
              {generatingKeywords ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              重新生成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsCollection;
