import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Package, 
  Home,
  Loader2,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Image,
  Search
} from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Product {
  id: string;
  name: string;
  name_en: string | null;
  description: string | null;
  description_en: string | null;
  category: string;
  subcategory: string | null;
  price: number | null;
  original_price: number | null;
  images: string[] | null;
  specifications: any;
  features: string[] | null;
  is_featured: boolean | null;
  is_published: boolean | null;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
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

const ProductManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    name_en: '',
    description: '',
    description_en: '',
    category: '',
    subcategory: '',
    price: '',
    original_price: '',
    images: [] as string[],
    features: '',
    is_featured: false,
    is_published: true,
    sort_order: 0,
  });

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: '获取产品列表失败',
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
        _role: 'admin'
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

      fetchProducts();
    };

    checkAdminAccess();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/feimai-admin-login');
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      category: '',
      subcategory: '',
      price: '',
      original_price: '',
      images: [],
      features: '',
      is_featured: false,
      is_published: true,
      sort_order: 0,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      name_en: product.name_en || '',
      description: product.description || '',
      description_en: product.description_en || '',
      category: product.category,
      subcategory: product.subcategory || '',
      price: product.price?.toString() || '',
      original_price: product.original_price?.toString() || '',
      images: product.images || [],
      features: product.features?.join('\n') || '',
      is_featured: product.is_featured || false,
      is_published: product.is_published ?? true,
      sort_order: product.sort_order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.category) {
      toast({
        title: '请填写必填项',
        description: '产品名称和分类不能为空',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const featuresArray = formData.features.split('\n').filter(f => f.trim());

      const productData = {
        name: formData.name.trim(),
        name_en: formData.name_en.trim() || null,
        description: formData.description.trim() || null,
        description_en: formData.description_en.trim() || null,
        category: formData.category,
        subcategory: formData.subcategory.trim() || null,
        price: formData.price ? parseFloat(formData.price) : null,
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        images: formData.images,
        features: featuresArray,
        is_featured: formData.is_featured,
        is_published: formData.is_published,
        sort_order: formData.sort_order,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast({ title: '产品已更新' });
      } else {
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
        toast({ title: '产品已创建' });
      }

      setIsDialogOpen(false);
      fetchProducts();
    } catch (error: any) {
      console.error('Error saving product:', error);
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
    if (!deleteProductId) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deleteProductId);

      if (error) throw error;
      toast({ title: '产品已删除' });
      fetchProducts();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        title: '删除失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteProductId(null);
    }
  };

  const togglePublish = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_published: !product.is_published })
        .eq('id', product.id);

      if (error) throw error;
      toast({ title: product.is_published ? '产品已下架' : '产品已上架' });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: '操作失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleFeatured = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_featured: !product.is_featured })
        .eq('id', product.id);

      if (error) throw error;
      toast({ title: product.is_featured ? '已取消推荐' : '已设为推荐' });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: '操作失败',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getCategoryLabel = (value: string) => {
    return CATEGORIES.find(c => c.value === value)?.label || value;
  };

  let filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);
  
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.name_en && p.name_en.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

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
              <h1 className="text-lg font-bold text-white">产品管理</h1>
              <p className="text-xs text-slate-400">Product Management</p>
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
          <Link to="/feimai-admin-console">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回管理后台
            </Button>
          </Link>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索产品名称..."
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="筛选分类" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">全部分类</SelectItem>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={openCreateDialog} className="bg-amber-500 hover:bg-amber-600">
              <Plus className="w-4 h-4 mr-2" />
              添加产品
            </Button>
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="w-5 h-5" />
              产品列表
              <Badge variant="secondary" className="ml-2">
                {filteredProducts.length} 件产品
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">产品</TableHead>
                    <TableHead className="text-slate-400">分类</TableHead>
                    <TableHead className="text-slate-400">价格</TableHead>
                    <TableHead className="text-slate-400">状态</TableHead>
                    <TableHead className="text-slate-400 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="border-slate-700">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {product.images?.[0] ? (
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg bg-slate-700"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                              <Image className="w-6 h-6 text-slate-500" />
                            </div>
                          )}
                          <div>
                            <p className="text-white font-medium">{product.name}</p>
                            {product.name_en && (
                              <p className="text-slate-500 text-xs">{product.name_en}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-slate-400 border-slate-500">
                          {getCategoryLabel(product.category)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">
                        {product.price ? `¥${product.price}` : '-'}
                        {product.original_price && (
                          <span className="text-slate-500 text-xs line-through ml-2">
                            ¥{product.original_price}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {product.is_featured && (
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                              <Star className="w-3 h-3 mr-1" />
                              推荐
                            </Badge>
                          )}
                          {product.is_published ? (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              上架
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-slate-400 border-slate-500">
                              下架
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleFeatured(product)}
                            className={product.is_featured ? 'text-amber-400 hover:text-amber-300' : 'text-slate-400 hover:text-slate-300'}
                            title={product.is_featured ? '取消推荐' : '设为推荐'}
                          >
                            <Star className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => togglePublish(product)}
                            className={product.is_published ? 'text-orange-400 hover:text-orange-300' : 'text-green-400 hover:text-green-300'}
                            title={product.is_published ? '下架' : '上架'}
                          >
                            {product.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openEditDialog(product)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setDeleteProductId(product.id);
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">暂无产品</p>
                <Button onClick={openCreateDialog} variant="link" className="text-amber-500 mt-2">
                  添加第一个产品
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
            <DialogTitle>{editingProduct ? '编辑产品' : '添加产品'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              填写产品信息
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">产品名称 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="中文名称"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_en">英文名称</Label>
                <Input
                  id="name_en"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  placeholder="English name"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">分类 *</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategory">子分类</Label>
                <Input
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder="子分类（可选）"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">产品描述</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="中文描述"
                className="bg-slate-700 border-slate-600 min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_en">英文描述</Label>
              <Textarea
                id="description_en"
                value={formData.description_en}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                placeholder="English description"
                className="bg-slate-700 border-slate-600 min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">售价</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="original_price">原价</Label>
                <Input
                  id="original_price"
                  type="number"
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                  placeholder="0.00"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">排序</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="bg-slate-700 border-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>产品图片</Label>
              <ImageUpload
                images={formData.images}
                onImagesChange={(images) => setFormData({ ...formData, images })}
                maxImages={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">产品特性 (每行一个)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="特性1&#10;特性2&#10;特性3"
                className="bg-slate-700 border-slate-600 min-h-[80px]"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">上架销售</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured">推荐产品</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-amber-500 hover:bg-amber-600">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingProduct ? '保存更改' : '创建产品'}
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
              此操作无法撤销，确定要删除这个产品吗？
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

export default ProductManagement;
