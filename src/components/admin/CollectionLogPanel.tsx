import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Trash2,
  Clock,
  Sparkles,
  Filter,
  Image,
  Bot,
  Key,
} from 'lucide-react';

export interface CollectionLog {
  id: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error' | 'step';
  step?: 'search' | 'scrape' | 'clean' | 'score' | 'filter' | 'save' | 'rewrite' | 'keyword';
  message: string;
  details?: string;
  articleTitle?: string;
  score?: number;
  isReviewOrAd?: boolean;
}

interface CollectionLogPanelProps {
  logs: CollectionLog[];
  isCollecting: boolean;
  onClear: () => void;
}

const stepIcons = {
  search: Search,
  scrape: FileText,
  clean: Sparkles,
  score: Bot,
  filter: Filter,
  save: CheckCircle,
  rewrite: Bot,
  keyword: Key,
};

const stepLabels = {
  search: '搜索',
  scrape: '抓取',
  clean: '清洗',
  score: '评分',
  filter: '过滤',
  save: '保存',
  rewrite: 'AI创作',
  keyword: '关键词',
};

const typeColors = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-amber-400',
  error: 'text-red-400',
  step: 'text-purple-400',
};

const typeBgColors = {
  info: 'bg-blue-500/10',
  success: 'bg-green-500/10',
  warning: 'bg-amber-500/10',
  error: 'bg-red-500/10',
  step: 'bg-purple-500/10',
};

export const CollectionLogPanel = ({ logs, isCollecting, onClear }: CollectionLogPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current && isCollecting) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isCollecting]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getStepIcon = (step?: string) => {
    if (!step) return null;
    const Icon = stepIcons[step as keyof typeof stepIcons];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
        return <XCircle className="w-4 h-4" />;
      case 'step':
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Statistics
  const stats = {
    total: logs.length,
    success: logs.filter((l) => l.type === 'success').length,
    warnings: logs.filter((l) => l.type === 'warning').length,
    errors: logs.filter((l) => l.type === 'error').length,
    filtered: logs.filter((l) => l.step === 'filter' && l.type === 'warning').length,
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="py-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-white flex items-center gap-2 text-base">
              <FileText className="w-5 h-5" />
              采集过程日志
              {isCollecting && (
                <Badge className="bg-green-500/20 text-green-400 ml-2">
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  采集中
                </Badge>
              )}
            </CardTitle>
            {logs.length > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="outline" className="border-slate-600 text-slate-400">
                  {stats.total} 条日志
                </Badge>
                {stats.success > 0 && (
                  <Badge className="bg-green-500/20 text-green-400">{stats.success} 成功</Badge>
                )}
                {stats.filtered > 0 && (
                  <Badge className="bg-amber-500/20 text-amber-400">{stats.filtered} 过滤</Badge>
                )}
                {stats.errors > 0 && (
                  <Badge className="bg-red-500/20 text-red-400">{stats.errors} 错误</Badge>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {logs.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="text-slate-400 hover:text-red-400 h-8"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                清空
              </Button>
            )}
            <Button variant="ghost" size="sm" className="text-slate-400 h-8">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          {logs.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>暂无采集日志</p>
              <p className="text-sm mt-1">执行采集任务后，日志将在此实时显示</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
              <div className="space-y-2">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-3 rounded-lg ${typeBgColors[log.type]} border border-slate-700/50`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Time */}
                      <span className="text-xs text-slate-500 font-mono min-w-[70px]">
                        {formatTime(log.timestamp)}
                      </span>

                      {/* Step badge */}
                      {log.step && (
                        <Badge
                          variant="outline"
                          className={`${typeColors[log.type]} border-current min-w-[60px] justify-center`}
                        >
                          {getStepIcon(log.step)}
                          <span className="ml-1">{stepLabels[log.step]}</span>
                        </Badge>
                      )}

                      {/* Icon */}
                      <span className={typeColors[log.type]}>{getTypeIcon(log.type)}</span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${typeColors[log.type]}`}>{log.message}</p>

                        {/* Article title */}
                        {log.articleTitle && (
                          <p className="text-xs text-slate-400 mt-1 truncate">
                            📄 {log.articleTitle}
                          </p>
                        )}

                        {/* Score info */}
                        {log.score !== undefined && (
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              className={
                                log.score >= 8
                                  ? 'bg-green-500/20 text-green-400'
                                  : log.score >= 6
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-red-500/20 text-red-400'
                              }
                            >
                              评分: {log.score}
                            </Badge>
                            {log.isReviewOrAd && (
                              <Badge className="bg-orange-500/20 text-orange-400">测评/广告</Badge>
                            )}
                          </div>
                        )}

                        {/* Details */}
                        {log.details && (
                          <p className="text-xs text-slate-500 mt-1 whitespace-pre-wrap">
                            {log.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Collecting indicator at bottom */}
                {isCollecting && (
                  <div className="flex items-center justify-center py-4 text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    <span>正在采集中...</span>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      )}
    </Card>
  );
};
