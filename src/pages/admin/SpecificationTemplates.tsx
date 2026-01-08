import { useState, useEffect } from 'react';
import type { Json } from '@/integrations/supabase/types';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
  Home,
  Loader2,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Copy,
  FileText,
  GripVertical,
} from 'lucide-react';

interface SpecField {
  key: string;
  label: string;
  unit?: string;
  defaultValue?: string;
}

interface Template {
  id: string;
  name: string;
  category: string;
  fields: SpecField[];
  is_default: boolean;
  created_at: string;
}

const CATEGORIES = [
  { value: 'multi-rotor', label: '多旋翼飞行器' },
  { value: 'vtx-vrx', label: '图传发射/接收' },
  { value: 'fc-esc', label: '飞控/电调' },
  { value: 'gimbal', label: '吊舱/云台' },
  { value: 'camera', label: '相机' },
  { value: 'digital-fpv', label: '数字FPV' },
  { value: 'elrs', label: 'ELRS' },
  { value: 'tethered', label: '系留无人机' },
  { value: 'logistics', label: '物流无人机' },
  { value: 'airport', label: '机场' },
  { value: 'other', label: '其他配件' },
];

const SpecificationTemplates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [deleteTemplateId, setDeleteTemplateId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    fields: [] as SpecField[],
    is_default: false,
  });

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('specification_templates')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      
      // Parse fields from JSON
      const parsed = (data || []).map(t => ({
        id: t.id,
        name: t.name,
        category: t.category,
        is_default: t.is_default ?? false,
        created_at: t.created_at,
        fields: (Array.isArray(t.fields) ? t.fields : []).map((f: any) => ({
          key: f.key || '',
          label: f.label || '',
          unit: f.unit || '',
          defaultValue: f.defaultValue || '',
        })),
      }));
      
      setTemplates(parsed);
    } catch (error: any) {
      console.error('Error fetching templates:', error);
      toast({
        title: '获取模板列表失败',
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
        navigate('/feimai-admin-login');
        return;
      }

      const { data: isAdmin } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin',
      });

      if (!isAdmin) {
        toast({
          title: '访问拒绝',
          description: '您没有管理员权限',
          variant: 'destructive',
        });
        navigate('/feimai-admin-login');
        return;
      }

      fetchTemplates();
    };

    checkAdminAccess();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/feimai-admin-login');
  };

  const openCreateDialog = () => {
    setEditingTemplate(null);
    setFormData({
      name: '',
      category: '',
      fields: [],
      is_default: false,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      category: template.category,
      fields: template.fields,
      is_default: template.is_default,
    });
    setIsDialogOpen(true);
  };

  const duplicateTemplate = (template: Template) => {
    setEditingTemplate(null);
    setFormData({
      name: `${template.name} (副本)`,
      category: template.category,
      fields: template.fields.map((f) => ({ ...f, key: `field_${Date.now()}_${Math.random()}` })),
      is_default: false,
    });
    setIsDialogOpen(true);
  };

  const addField = () => {
    setFormData({
      ...formData,
      fields: [
        ...formData.fields,
        { key: `field_${Date.now()}`, label: '', unit: '', defaultValue: '' },
      ],
    });
  };

  const removeField = (index: number) => {
    const newFields = [...formData.fields];
    newFields.splice(index, 1);
    setFormData({ ...formData, fields: newFields });
  };

  const updateField = (index: number, updates: Partial<SpecField>) => {
    const newFields = [...formData.fields];
    newFields[index] = { ...newFields[index], ...updates };
    setFormData({ ...formData, fields: newFields });
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.category) {
      toast({
        title: '请填写必填项',
        description: '模板名称和分类不能为空',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const templateData = {
        name: formData.name.trim(),
        category: formData.category,
        fields: formData.fields as unknown as Json,
        is_default: formData.is_default,
      };

      // If setting as default, unset other defaults for this category
      if (formData.is_default) {
        await supabase
          .from('specification_templates')
          .update({ is_default: false })
          .eq('category', formData.category);
      }

      if (editingTemplate) {
        const { error } = await supabase
          .from('specification_templates')
          .update(templateData)
          .eq('id', editingTemplate.id);

        if (error) throw error;
        toast({ title: '模板已更新' });
      } else {
        const { error } = await supabase
          .from('specification_templates')
          .insert([templateData]);

        if (error) throw error;
        toast({ title: '模板已创建' });
      }

      setIsDialogOpen(false);
      fetchTemplates();
    } catch (error: any) {
      console.error('Error saving template:', error);
      toast({
        title: '保存失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTemplateId) return;

    try {
      const { error } = await supabase
        .from('specification_templates')
        .delete()
        .eq('id', deleteTemplateId);

      if (error) throw error;
      toast({ title: '模板已删除' });
      fetchTemplates();
    } catch (error: any) {
      console.error('Error deleting template:', error);
      toast({
        title: '删除失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteTemplateId(null);
    }
  };

  const getCategoryLabel = (value: string) => {
    return CATEGORIES.find((c) => c.value === value)?.label || value;
  };

  const filteredTemplates =
    filterCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === filterCategory);

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
              <h1 className="text-lg font-bold text-white">规格参数模板</h1>
              <p className="text-xs text-slate-400">Specification Templates</p>
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
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <Link to="/feimai-admin-console/products">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回产品管理
            </Button>
          </Link>
          <div className="flex items-center gap-4 flex-wrap">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="筛选分类" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">全部分类</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={openCreateDialog} className="bg-amber-500 hover:bg-amber-600">
              <Plus className="w-4 h-4 mr-2" />
              添加模板
            </Button>
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              模板列表
              <Badge variant="secondary" className="ml-2">
                {filteredTemplates.length} 个模板
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">模板名称</TableHead>
                    <TableHead className="text-slate-400">分类</TableHead>
                    <TableHead className="text-slate-400">参数数量</TableHead>
                    <TableHead className="text-slate-400">状态</TableHead>
                    <TableHead className="text-slate-400 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow key={template.id} className="border-slate-700">
                      <TableCell className="text-white font-medium">
                        {template.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-slate-400 border-slate-500">
                          {getCategoryLabel(template.category)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {template.fields.length} 个参数
                      </TableCell>
                      <TableCell>
                        {template.is_default && (
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                            默认
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => duplicateTemplate(template)}
                            className="text-slate-400 hover:text-slate-300"
                            title="复制模板"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(template)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setDeleteTemplateId(template.id);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">暂无模板</p>
                <Button onClick={openCreateDialog} variant="link" className="text-amber-500 mt-2">
                  创建第一个模板
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? '编辑模板' : '添加模板'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              定义规格参数模板，便于快速填写产品规格
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">模板名称 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="如：多旋翼基础规格"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">适用分类 *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_default"
                checked={formData.is_default}
                onCheckedChange={(checked) => setFormData({ ...formData, is_default: checked })}
              />
              <Label htmlFor="is_default">设为该分类的默认模板</Label>
            </div>

            {/* Fields Editor */}
            <div className="space-y-2">
              <Label>规格参数字段</Label>
              <div className="space-y-2">
                {formData.fields.map((field, index) => (
                  <div
                    key={field.key}
                    className="flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg"
                  >
                    <GripVertical className="w-4 h-4 text-slate-500 cursor-move flex-shrink-0" />
                    <Input
                      value={field.label}
                      onChange={(e) => updateField(index, { label: e.target.value })}
                      placeholder="参数名称 (如：尺寸)"
                      className="flex-1 bg-slate-700 border-slate-600 h-8 text-sm"
                    />
                    <Input
                      value={field.unit || ''}
                      onChange={(e) => updateField(index, { unit: e.target.value })}
                      placeholder="单位 (如：mm)"
                      className="w-24 bg-slate-700 border-slate-600 h-8 text-sm"
                    />
                    <Input
                      value={field.defaultValue || ''}
                      onChange={(e) => updateField(index, { defaultValue: e.target.value })}
                      placeholder="默认值"
                      className="w-28 bg-slate-700 border-slate-600 h-8 text-sm"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeField(index)}
                      className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addField}
                className="w-full border-dashed border-slate-600 text-slate-400 hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                添加参数字段
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingTemplate ? '保存更改' : '创建模板'}
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
              此操作无法撤销，确定要删除这个模板吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">
              取消
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SpecificationTemplates;
