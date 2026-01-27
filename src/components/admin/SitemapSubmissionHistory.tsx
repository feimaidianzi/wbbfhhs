import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  History,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

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

interface SitemapSubmissionHistoryProps {
  history: SubmissionHistoryItem[];
  isLoading: boolean;
  onRefresh: () => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'success':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />成功</Badge>;
    case 'partial':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><AlertCircle className="h-3 w-3 mr-1" />部分成功</Badge>;
    case 'failed':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="h-3 w-3 mr-1" />失败</Badge>;
    case 'pending':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Clock className="h-3 w-3 mr-1" />待处理</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'generate':
      return <Badge variant="outline">生成</Badge>;
    case 'submit':
      return <Badge variant="secondary">提交</Badge>;
    case 'ping':
      return <Badge variant="outline" className="bg-purple-50">Ping</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

const getTriggerBadge = (trigger: string) => {
  switch (trigger) {
    case 'manual':
      return <span className="text-xs text-muted-foreground">手动</span>;
    case 'scheduled':
      return <span className="text-xs text-blue-600">定时</span>;
    case 'content_update':
      return <span className="text-xs text-green-600">内容更新</span>;
    default:
      return <span className="text-xs text-muted-foreground">{trigger}</span>;
  }
};

const SitemapSubmissionHistory: React.FC<SitemapSubmissionHistoryProps> = ({
  history,
  isLoading,
  onRefresh
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          提交历史记录
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onRefresh} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>暂无提交记录</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">类型</TableHead>
                  <TableHead className="w-[80px]">状态</TableHead>
                  <TableHead className="w-[80px]">触发方式</TableHead>
                  <TableHead className="w-[60px]">语言数</TableHead>
                  <TableHead className="w-[60px]">路由数</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead>错误信息</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{getTypeBadge(item.submission_type)}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{getTriggerBadge(item.triggered_by)}</TableCell>
                    <TableCell className="text-center">{item.languages?.length || 0}</TableCell>
                    <TableCell className="text-center">{item.route_count || 0}</TableCell>
                    <TableCell className="text-xs">
                      {format(new Date(item.created_at), 'MM-dd HH:mm', { locale: zhCN })}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs text-red-600">
                      {item.error_message || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default SitemapSubmissionHistory;
