import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageSquareText, Plus, Pencil, Trash2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface QuickReply {
  id: string;
  title: string;
  content: string;
  category: string;
  sort_order: number;
}

interface QuickRepliesProps {
  onSelect: (content: string) => void;
  isManageMode?: boolean;
}

const categoryLabels: Record<string, string> = {
  greeting: '问候',
  general: '通用',
  product: '产品',
  price: '价格',
  contact: '联系',
  closing: '结束',
};

export default function QuickReplies({ onSelect, isManageMode = false }: QuickRepliesProps) {
  const { toast } = useToast();
  const [replies, setReplies] = useState<QuickReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingReply, setEditingReply] = useState<QuickReply | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'general' });

  useEffect(() => {
    loadReplies();
  }, []);

  const loadReplies = async () => {
    const { data, error } = await supabase
      .from('quick_replies')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error && data) {
      setReplies(data);
    }
    setLoading(false);
  };

  const handleEdit = (reply: QuickReply) => {
    setEditingReply(reply);
    setFormData({ title: reply.title, content: reply.content, category: reply.category });
    setEditDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingReply(null);
    setFormData({ title: '', content: '', category: 'general' });
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({ variant: 'destructive', title: '请填写完整信息' });
      return;
    }

    try {
      if (editingReply) {
        await supabase
          .from('quick_replies')
          .update({ title: formData.title, content: formData.content, category: formData.category })
          .eq('id', editingReply.id);
      } else {
        await supabase
          .from('quick_replies')
          .insert({ title: formData.title, content: formData.content, category: formData.category });
      }
      toast({ title: '保存成功' });
      setEditDialogOpen(false);
      loadReplies();
    } catch (error) {
      toast({ variant: 'destructive', title: '保存失败' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除此快捷回复？')) return;
    
    await supabase.from('quick_replies').update({ is_active: false }).eq('id', id);
    loadReplies();
    toast({ title: '已删除' });
  };

  if (loading) {
    return <div className="text-center py-4 text-muted-foreground text-sm">加载中...</div>;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium flex items-center gap-1">
          <MessageSquareText className="h-4 w-4" />
          快捷回复
        </span>
        <Button variant="ghost" size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[200px]">
        <div className="space-y-1">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="group flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
              onClick={() => onSelect(reply.content)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">{reply.title}</span>
                  <Badge variant="outline" className="text-[10px] px-1">
                    {categoryLabels[reply.category] || reply.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{reply.content}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); handleEdit(reply); }}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={(e) => { e.stopPropagation(); handleDelete(reply.id); }}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingReply ? '编辑快捷回复' : '添加快捷回复'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">标题</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="快捷回复标题"
              />
            </div>
            <div>
              <label className="text-sm font-medium">内容</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="快捷回复内容"
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium">分类</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
