import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Shield, 
  LogOut, 
  MessageSquare, 
  Home,
  Loader2,
  ArrowLeft,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  MessageCircle,
  XCircle,
  Mail,
  Phone,
  Building,
  User,
  Send,
  Download,
  FileSpreadsheet
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string;
  message: string;
  product_interest: string | null;
  status: string;
  admin_notes: string | null;
  replied_at: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_OPTIONS = [
  { value: 'pending', label: '待处理', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
  { value: 'processing', label: '处理中', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: MessageCircle },
  { value: 'replied', label: '已回复', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
  { value: 'closed', label: '已关闭', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30', icon: XCircle },
];

const REPLY_TEMPLATES = [
  { 
    label: "感谢咨询 - 通用回复", 
    content: "感谢您对长凌科技的关注和咨询！\n\n我们已收到您的信息，相关业务人员会尽快与您联系，为您提供详细的解决方案。\n\n如有紧急需求，您也可以直接拨打我们的服务热线：+8618008451238"
  },
  { 
    label: "产品报价 - 需求确认", 
    content: "感谢您对我们产品的兴趣！\n\n为了给您提供准确的报价方案，请您补充以下信息：\n1. 具体应用场景\n2. 预计采购数量\n3. 是否需要定制功能\n\n收到您的回复后，我们将在24小时内为您提供详细报价。"
  },
  { 
    label: "技术支持 - 问题跟进", 
    content: "感谢您的反馈！\n\n我们的技术团队已收到您描述的问题，正在进行分析处理。如需进一步了解情况，技术人员可能会通过电话与您联系。\n\n预计会在1-2个工作日内给您回复处理结果。"
  },
  { 
    label: "定制开发 - 需求沟通", 
    content: "感谢您对定制开发服务的咨询！\n\n我们提供从需求分析到交付的一站式定制服务。为了更好地评估您的需求，建议安排一次线上或线下沟通会议。\n\n请问您方便的时间段是？我们的技术顾问将与您详细讨论方案。"
  },
  { 
    label: "合作洽谈 - 初步回复", 
    content: "感谢您的合作意向！\n\n飞迈科技一直致力于与行业伙伴建立长期合作关系。我们对您提出的合作方向很感兴趣。\n\n为了深入探讨合作可能，建议安排一次商务会谈。请问您方便的时间是？"
  },
];

const InquiryManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deleteInquiryId, setDeleteInquiryId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [replyContent, setReplyContent] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error: any) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: '获取咨询列表失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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

      fetchInquiries();
    };

    checkAdminAccess();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const openDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNotes(inquiry.admin_notes || '');
    setReplyContent('');
    setIsDetailOpen(true);
  };

  const sendReply = async () => {
    if (!selectedInquiry || !replyContent.trim()) {
      toast({
        title: '请输入回复内容',
        variant: 'destructive',
      });
      return;
    }

    setSendingReply(true);
    try {
      const { error: funcError } = await supabase.functions.invoke('send-inquiry-reply', {
        body: {
          to: selectedInquiry.email,
          customerName: selectedInquiry.name,
          originalSubject: selectedInquiry.subject,
          replyContent: replyContent.trim(),
        },
      });

      if (funcError) throw funcError;

      // Update status to replied
      await supabase
        .from('inquiries')
        .update({ 
          status: 'replied', 
          replied_at: new Date().toISOString(),
          admin_notes: adminNotes ? `${adminNotes}\n\n---回复内容---\n${replyContent.trim()}` : `---回复内容---\n${replyContent.trim()}`
        })
        .eq('id', selectedInquiry.id);

      toast({ title: '回复已发送' });
      setReplyContent('');
      setSelectedInquiry({ ...selectedInquiry, status: 'replied', replied_at: new Date().toISOString() });
      fetchInquiries();
    } catch (error: any) {
      console.error('Reply error:', error);
      toast({
        title: '发送失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSendingReply(false);
    }
  };

  const updateStatus = async (inquiryId: string, newStatus: string) => {
    try {
      const updateData: any = { status: newStatus };
      if (newStatus === 'replied') {
        updateData.replied_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('inquiries')
        .update(updateData)
        .eq('id', inquiryId);

      if (error) throw error;
      toast({ title: '状态已更新' });
      fetchInquiries();
      
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (error: any) {
      toast({
        title: '更新失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const saveNotes = async () => {
    if (!selectedInquiry) return;

    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ admin_notes: adminNotes })
        .eq('id', selectedInquiry.id);

      if (error) throw error;
      toast({ title: '备注已保存' });
      fetchInquiries();
    } catch (error: any) {
      toast({
        title: '保存失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteInquiryId) return;

    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', deleteInquiryId);

      if (error) throw error;
      toast({ title: '咨询已删除' });
      fetchInquiries();
    } catch (error: any) {
      toast({
        title: '删除失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteInquiryId(null);
    }
  };

  const getStatusInfo = (status: string) => {
    return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const filteredInquiries = filterStatus === 'all' 
    ? inquiries 
    : inquiries.filter(i => i.status === filterStatus);

  const pendingCount = inquiries.filter(i => i.status === 'pending').length;

  const getStatusLabel = (status: string) => {
    const info = STATUS_OPTIONS.find(s => s.value === status);
    return info?.label || status;
  };

  const exportToCSV = () => {
    const headers = ['姓名', '邮箱', '电话', '公司', '主题', '咨询内容', '状态', '提交时间', '回复时间', '管理备注'];
    const rows = filteredInquiries.map(inquiry => [
      inquiry.name,
      inquiry.email,
      inquiry.phone || '',
      inquiry.company || '',
      inquiry.subject,
      inquiry.message.replace(/[\n\r]/g, ' '),
      getStatusLabel(inquiry.status),
      formatDate(inquiry.created_at),
      inquiry.replied_at ? formatDate(inquiry.replied_at) : '',
      (inquiry.admin_notes || '').replace(/[\n\r]/g, ' ')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `咨询记录_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);

    toast({ title: '导出成功', description: `已导出 ${filteredInquiries.length} 条记录` });
  };

  const exportToExcel = () => {
    const headers = ['姓名', '邮箱', '电话', '公司', '主题', '咨询内容', '状态', '提交时间', '回复时间', '管理备注'];
    const rows = filteredInquiries.map(inquiry => [
      inquiry.name,
      inquiry.email,
      inquiry.phone || '',
      inquiry.company || '',
      inquiry.subject,
      inquiry.message,
      getStatusLabel(inquiry.status),
      formatDate(inquiry.created_at),
      inquiry.replied_at ? formatDate(inquiry.replied_at) : '',
      inquiry.admin_notes || ''
    ]);

    // Create XML for Excel
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<?mso-application progid="Excel.Sheet"?>\n';
    xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n';
    xml += '<Worksheet ss:Name="咨询记录"><Table>\n';
    
    // Header row
    xml += '<Row>';
    headers.forEach(h => {
      xml += `<Cell><Data ss:Type="String">${h}</Data></Cell>`;
    });
    xml += '</Row>\n';
    
    // Data rows
    rows.forEach(row => {
      xml += '<Row>';
      row.forEach(cell => {
        const escaped = String(cell).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        xml += `<Cell><Data ss:Type="String">${escaped}</Data></Cell>`;
      });
      xml += '</Row>\n';
    });
    
    xml += '</Table></Worksheet></Workbook>';

    const blob = new Blob([xml], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `咨询记录_${new Date().toISOString().split('T')[0]}.xls`;
    link.click();
    URL.revokeObjectURL(link.href);

    toast({ title: '导出成功', description: `已导出 ${filteredInquiries.length} 条记录` });
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
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">咨询管理</h1>
              <p className="text-xs text-slate-400">Inquiry Management</p>
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
      <main className="container mx-auto px-4 py-8">
        {/* Back Button & Filters */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <Link to="/admin">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回管理后台
            </Button>
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            {pendingCount > 0 && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                {pendingCount} 条待处理
              </Badge>
            )}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="筛选状态" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">全部状态</SelectItem>
                {STATUS_OPTIONS.map(status => (
                  <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
                disabled={filteredInquiries.length === 0}
              >
                <Download className="w-4 h-4 mr-1" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToExcel}
                className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
                disabled={filteredInquiries.length === 0}
              >
                <FileSpreadsheet className="w-4 h-4 mr-1" />
                Excel
              </Button>
            </div>
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              咨询列表
              <Badge variant="secondary" className="ml-2">
                {filteredInquiries.length} 条咨询
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">联系人</TableHead>
                    <TableHead className="text-slate-400">主题</TableHead>
                    <TableHead className="text-slate-400">状态</TableHead>
                    <TableHead className="text-slate-400">时间</TableHead>
                    <TableHead className="text-slate-400 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInquiries.map((inquiry) => {
                    const statusInfo = getStatusInfo(inquiry.status);
                    const StatusIcon = statusInfo.icon;
                    return (
                      <TableRow key={inquiry.id} className="border-slate-700">
                        <TableCell>
                          <div>
                            <p className="text-white font-medium">{inquiry.name}</p>
                            <p className="text-slate-500 text-xs">{inquiry.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-white max-w-xs truncate">
                          {inquiry.subject}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-400 text-sm">
                          {formatDate(inquiry.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => openDetail(inquiry)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setDeleteInquiryId(inquiry.id);
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
                </TableBody>
              </Table>
            </div>

            {filteredInquiries.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">暂无咨询</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>咨询详情</DialogTitle>
            <DialogDescription className="text-slate-400">
              查看并处理用户咨询
            </DialogDescription>
          </DialogHeader>

          {selectedInquiry && (
            <div className="space-y-4 py-4">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">姓名:</span>
                  <span className="text-white">{selectedInquiry.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">邮箱:</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-blue-400 hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400">电话:</span>
                    <a href={`tel:${selectedInquiry.phone}`} className="text-blue-400 hover:underline">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}
                {selectedInquiry.company && (
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400">公司:</span>
                    <span className="text-white">{selectedInquiry.company}</span>
                  </div>
                )}
              </div>

              {/* Subject */}
              <div>
                <Label className="text-slate-400">主题</Label>
                <p className="text-white mt-1 font-medium">{selectedInquiry.subject}</p>
              </div>

              {/* Message */}
              <div>
                <Label className="text-slate-400">咨询内容</Label>
                <p className="text-white mt-1 whitespace-pre-wrap p-3 bg-slate-700/50 rounded-lg">
                  {selectedInquiry.message}
                </p>
              </div>

              {selectedInquiry.product_interest && (
                <div>
                  <Label className="text-slate-400">感兴趣的产品</Label>
                  <p className="text-white mt-1">{selectedInquiry.product_interest}</p>
                </div>
              )}

              {/* Status */}
              <div>
                <Label className="text-slate-400">状态</Label>
                <Select 
                  value={selectedInquiry.status} 
                  onValueChange={(v) => updateStatus(selectedInquiry.id, v)}
                >
                  <SelectTrigger className="w-40 mt-1 bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {STATUS_OPTIONS.map(status => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reply Section */}
              <div className="space-y-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <Label className="text-blue-400 flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  回复客户
                </Label>
                
                {/* Template Selection */}
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs">快速选择模板</Label>
                  <div className="flex flex-wrap gap-2">
                    {REPLY_TEMPLATES.map((template, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setReplyContent(template.content)}
                        className="text-xs bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
                      >
                        {template.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="输入回复内容，发送后客户将收到邮件..."
                  className="bg-slate-700 border-slate-600 min-h-[120px]"
                />
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={sendReply} 
                    disabled={sendingReply || !replyContent.trim()}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    {sendingReply ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        发送中...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        发送回复邮件
                      </>
                    )}
                  </Button>
                  {replyContent && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setReplyContent("")}
                      className="text-slate-400 hover:text-white"
                    >
                      清空
                    </Button>
                  )}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="space-y-2">
                <Label className="text-slate-400">管理备注（内部可见）</Label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="添加处理备注..."
                  className="bg-slate-700 border-slate-600 min-h-[100px]"
                />
                <Button onClick={saveNotes} size="sm" className="bg-amber-500 hover:bg-amber-600">
                  保存备注
                </Button>
              </div>

              {/* Timestamps */}
              <div className="text-xs text-slate-500 pt-4 border-t border-slate-700">
                <p>提交时间: {formatDate(selectedInquiry.created_at)}</p>
                {selectedInquiry.replied_at && (
                  <p className="text-green-400">✓ 已回复: {formatDate(selectedInquiry.replied_at)}</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDetailOpen(false)}>
              关闭
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
              此操作无法撤销，确定要删除这条咨询吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InquiryManagement;
