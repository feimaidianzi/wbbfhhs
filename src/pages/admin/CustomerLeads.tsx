import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Search,
  Users,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Building2,
  MessageSquare,
  RefreshCw,
  Download,
  Eye,
} from "lucide-react";
import { format } from "date-fns";

interface Lead {
  id: string;
  conversation_id: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  location: string | null;
  requirements: string | null;
  product_interest: string | null;
  budget_range: string | null;
  urgency: string | null;
  lead_score: number;
  status: string;
  notes: string | null;
  created_at: string;
}

interface ConversationMessage {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

const urgencyColors: Record<string, string> = {
  low: "bg-slate-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  immediate: "bg-red-500",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  qualified: "bg-green-500",
  converted: "bg-emerald-600",
  lost: "bg-slate-500",
};

export default function CustomerLeads() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [showConversation, setShowConversation] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    newLeads: 0,
    qualified: 0,
    avgScore: 0,
  });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("customer_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setLeads(data || []);

      // Calculate stats
      const allLeads = data || [];
      setStats({
        total: allLeads.length,
        newLeads: allLeads.filter((l) => l.status === "new").length,
        qualified: allLeads.filter((l) => l.status === "qualified" || l.status === "converted").length,
        avgScore: allLeads.length > 0
          ? Math.round(allLeads.reduce((sum, l) => sum + (l.lead_score || 0), 0) / allLeads.length)
          : 0,
      });
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      toast({
        title: "错误",
        description: "获取线索列表失败",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchConversation = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from("ai_conversation_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setConversation(data || []);
    } catch (error) {
      console.error("Failed to fetch conversation:", error);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("customer_leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;

      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );

      toast({
        title: "成功",
        description: "状态已更新",
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      toast({
        title: "错误",
        description: "更新状态失败",
        variant: "destructive",
      });
    }
  };

  const updateLeadNotes = async (leadId: string, notes: string) => {
    try {
      const { error } = await supabase
        .from("customer_leads")
        .update({ notes })
        .eq("id", leadId);

      if (error) throw error;

      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, notes } : l))
      );

      toast({
        title: "成功",
        description: "备注已保存",
      });
    } catch (error) {
      console.error("Failed to update notes:", error);
    }
  };

  const exportToCSV = () => {
    const headers = ["姓名", "电话", "邮箱", "公司", "地区", "需求", "产品意向", "预算", "紧急度", "评分", "状态", "创建时间"];
    const rows = leads.map((l) => [
      l.name || "",
      l.phone || "",
      l.email || "",
      l.company || "",
      l.location || "",
      l.requirements || "",
      l.product_interest || "",
      l.budget_range || "",
      l.urgency || "",
      l.lead_score?.toString() || "0",
      l.status,
      format(new Date(l.created_at), "yyyy-MM-dd HH:mm"),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `customer_leads_${format(new Date(), "yyyyMMdd")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const filteredLeads = leads.filter((lead) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(term) ||
      lead.phone?.includes(term) ||
      lead.email?.toLowerCase().includes(term) ||
      lead.company?.toLowerCase().includes(term) ||
      lead.requirements?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">客户线索管理</h1>
              <p className="text-muted-foreground">AI助手收集的潜在客户信息</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchLeads}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              导出CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                总线索数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                新线索
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">{stats.newLeads}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                已转化
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">{stats.qualified}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                平均评分
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="text-2xl font-bold">{stats.avgScore}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索线索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="状态筛选" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="new">新线索</SelectItem>
              <SelectItem value="contacted">已联系</SelectItem>
              <SelectItem value="qualified">已确认</SelectItem>
              <SelectItem value="converted">已转化</SelectItem>
              <SelectItem value="lost">已流失</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Leads Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客户信息</TableHead>
                  <TableHead>联系方式</TableHead>
                  <TableHead>需求</TableHead>
                  <TableHead>评分</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      加载中...
                    </TableCell>
                  </TableRow>
                ) : filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      暂无线索数据
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{lead.name || "未知"}</div>
                          {lead.company && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Building2 className="h-3 w-3" />
                              {lead.company}
                            </div>
                          )}
                          {lead.location && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {lead.location}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {lead.phone && (
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </div>
                          )}
                          {lead.email && (
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {lead.product_interest && (
                            <Badge variant="outline" className="mb-1">
                              {lead.product_interest}
                            </Badge>
                          )}
                          {lead.requirements && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {lead.requirements}
                            </p>
                          )}
                          {lead.urgency && (
                            <Badge className={`${urgencyColors[lead.urgency]} text-white mt-1`}>
                              {lead.urgency === "low" && "低"}
                              {lead.urgency === "medium" && "中"}
                              {lead.urgency === "high" && "高"}
                              {lead.urgency === "immediate" && "紧急"}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                              lead.lead_score >= 70
                                ? "bg-green-500"
                                : lead.lead_score >= 40
                                ? "bg-yellow-500"
                                : "bg-slate-400"
                            }`}
                          >
                            {lead.lead_score}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => updateLeadStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-24 h-8">
                            <Badge className={`${statusColors[lead.status]} text-white`}>
                              {lead.status === "new" && "新"}
                              {lead.status === "contacted" && "已联系"}
                              {lead.status === "qualified" && "已确认"}
                              {lead.status === "converted" && "已转化"}
                              {lead.status === "lost" && "已流失"}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">新线索</SelectItem>
                            <SelectItem value="contacted">已联系</SelectItem>
                            <SelectItem value="qualified">已确认</SelectItem>
                            <SelectItem value="converted">已转化</SelectItem>
                            <SelectItem value="lost">已流失</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(lead.created_at), "MM-dd HH:mm")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {lead.conversation_id && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedLead(lead);
                                fetchConversation(lead.conversation_id!);
                                setShowConversation(true);
                              }}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Lead Detail Dialog */}
        <Dialog open={!!selectedLead && !showConversation} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>线索详情</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">姓名</label>
                    <p className="font-medium">{selectedLead.name || "-"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">公司</label>
                    <p className="font-medium">{selectedLead.company || "-"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">电话</label>
                    <p className="font-medium">{selectedLead.phone || "-"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">邮箱</label>
                    <p className="font-medium">{selectedLead.email || "-"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">地区</label>
                    <p className="font-medium">{selectedLead.location || "-"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">预算范围</label>
                    <p className="font-medium">{selectedLead.budget_range || "-"}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">产品意向</label>
                  <p className="font-medium">{selectedLead.product_interest || "-"}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">需求描述</label>
                  <p className="font-medium">{selectedLead.requirements || "-"}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">备注</label>
                  <Textarea
                    value={selectedLead.notes || ""}
                    onChange={(e) =>
                      setSelectedLead({ ...selectedLead, notes: e.target.value })
                    }
                    onBlur={() => updateLeadNotes(selectedLead.id, selectedLead.notes || "")}
                    placeholder="添加备注..."
                  />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Conversation Dialog */}
        <Dialog open={showConversation} onOpenChange={() => setShowConversation(false)}>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>对话记录</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-primary/10 ml-8"
                      : msg.role === "assistant"
                      ? "bg-muted mr-8"
                      : "bg-yellow-100 text-center text-sm"
                  }`}
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {msg.role === "user" ? "客户" : msg.role === "assistant" ? "AI助手" : "系统"}
                    {" · "}
                    {format(new Date(msg.created_at), "HH:mm")}
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
