import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Database, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// 导入产品数据
import { elrsProducts } from "@/data/elrsProducts";
import { vtxProducts } from "@/data/vtxProducts";
import { gimbalProducts } from "@/data/gimbalProducts";
import { cameraProducts } from "@/data/cameraProducts";
import { digitalFpvProducts } from "@/data/digitalFpvProducts";
import { 
  stackProducts, 
  sixInOneEscProducts, 
  flightControllerProducts, 
  escProducts, 
  separateEscProducts 
} from "@/data/fcEscProducts";
import { otherAccessoriesProducts } from "@/data/otherAccessoriesProducts";

interface ImportCategory {
  id: string;
  name: string;
  count: number;
  selected: boolean;
  imported: boolean;
  error: string | null;
}

// 转换ELRS产品数据
const convertElrsProduct = (product: typeof elrsProducts[0]) => ({
  name: product.name,
  name_en: product.name,
  description: product.description,
  description_en: product.description,
  category: "elrs",
  subcategory: product.category,
  price: parseFloat(product.price.replace(/[^0-9.]/g, '')) || null,
  images: [product.image, ...product.gallery.filter(g => g !== product.image)],
  specifications: {
    specs: product.specs,
    keyFeatures: product.keyFeatures,
    features: product.features
  },
  features: product.keyFeatures,
  is_published: true,
  is_featured: false
});

// 转换VTX产品数据
const convertVtxProduct = (product: typeof vtxProducts[0]) => ({
  name: product.nameKey, // Using translation key
  name_en: product.nameKey,
  description: product.descriptionKeys.join('\n'),
  description_en: product.descriptionKeys.join('\n'),
  category: "vtx",
  subcategory: product.frequencyBand,
  price: null, // VTX产品没有明确价格
  images: [product.image],
  specifications: {
    model: product.model,
    power: product.power,
    frequency: product.frequency,
    channels: product.channels,
    specs: product.specs,
    highlightKeys: product.highlightKeys,
    operationGuide: product.operationGuide,
    noteKeys: product.noteKeys
  },
  features: product.highlightKeys,
  is_published: true,
  is_featured: false
});

// 转换云台产品数据 (使用翻译键)
const convertGimbalProduct = (product: typeof gimbalProducts[0]) => ({
  name: product.nameKey,
  name_en: product.nameKey,
  description: product.descriptionKeys.join('\n'),
  description_en: product.descriptionKeys.join('\n'),
  category: "gimbal",
  subcategory: product.categoryKey,
  price: product.price === "询价" ? null : parseFloat(product.price.replace(/[^0-9.]/g, '')),
  images: product.images || [product.image],
  specifications: {
    model: product.model,
    sloganKey: product.sloganKey,
    subSloganKey: product.subSloganKey,
    keyFeatures: product.keyFeatures,
    specs: product.specs,
    featureKeys: product.featureKeys,
    applicationKeys: product.applicationKeys,
    downloads: product.downloads
  },
  features: product.highlightKeys,
  is_published: true,
  is_featured: false
});

// 转换相机产品数据 (使用翻译键)
const convertCameraProduct = (product: typeof cameraProducts[0]) => ({
  name: product.nameKey,
  name_en: product.nameKey,
  description: product.features.map(f => f.descriptionKey).join('\n'),
  description_en: product.features.map(f => f.descriptionKey).join('\n'),
  category: "camera",
  subcategory: product.categoryKey,
  price: product.price === "询价" ? null : parseFloat(product.price.replace(/[^0-9.]/g, '')),
  images: [product.image],
  specifications: {
    model: product.model,
    sloganKey: product.sloganKey,
    subSloganKey: product.subSloganKey,
    keyFeatures: product.keyFeatures,
    specs: product.specs,
    features: product.features,
    packageContentKeys: product.packageContentKeys
  },
  features: product.highlightKeys,
  is_published: true,
  is_featured: false
});

// 转换数字图传产品数据 (使用翻译键)
const convertDigitalFpvProduct = (product: typeof digitalFpvProducts[0]) => ({
  name: product.nameKey,
  name_en: product.nameKey,
  description: product.descriptionKey,
  description_en: product.descriptionKey,
  category: "digital-fpv",
  subcategory: product.category,
  price: parseFloat(product.price.replace(/[^0-9.]/g, '')) || null,
  images: [product.image, ...product.gallery.filter(g => g !== product.image)],
  specifications: {
    sloganKey: product.sloganKey,
    subSloganKey: product.subSloganKey,
    specs: product.specs,
    features: product.features
  },
  features: product.keyFeatureKeys,
  is_published: true,
  is_featured: false
});

// 转换飞控电调产品数据
const convertFcEscProduct = (product: any, subcategory: string) => ({
  name: product.name,
  name_en: product.name,
  description: product.description.join('\n'),
  description_en: product.description.join('\n'),
  category: "fc-esc",
  subcategory: subcategory,
  price: parseFloat(product.price.replace(/[^0-9.]/g, '')) || null,
  images: product.images || [product.image],
  specifications: {
    model: product.model,
    fcSpecs: product.fcSpecs,
    escSpecs: product.escSpecs,
    features: product.features,
    notes: product.notes,
    packageIncludes: product.packageIncludes
  },
  features: product.highlights,
  is_published: true,
  is_featured: false
});

// 转换其他配件产品数据
const convertOtherAccessoryProduct = (product: typeof otherAccessoriesProducts[0]) => ({
  name: product.name,
  name_en: product.name,
  description: product.description,
  description_en: product.description,
  category: "other-accessories",
  subcategory: product.category,
  price: parseFloat(product.price.replace(/[^0-9.]/g, '')) || null,
  images: [product.image, ...product.gallery.filter(g => g !== product.image)],
  specifications: {
    slogan: product.slogan,
    subSlogan: product.subSlogan,
    specs: product.specs,
    features: product.features
  },
  features: product.keyFeatures,
  is_published: true,
  is_featured: false
});

export default function DataImport() {
  const navigate = useNavigate();
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [categories, setCategories] = useState<ImportCategory[]>([
    { id: "elrs", name: "ELRS接收机/天线", count: elrsProducts.length, selected: true, imported: false, error: null },
    { id: "vtx", name: "VTX图传", count: vtxProducts.length, selected: true, imported: false, error: null },
    { id: "gimbal", name: "云台/吊舱", count: gimbalProducts.length, selected: true, imported: false, error: null },
    { id: "camera", name: "运动相机", count: cameraProducts.length, selected: true, imported: false, error: null },
    { id: "digital-fpv", name: "数字图传", count: digitalFpvProducts.length, selected: true, imported: false, error: null },
    { id: "fc-esc-stack", name: "飞塔套装", count: stackProducts.length, selected: true, imported: false, error: null },
    { id: "fc-esc-6in1", name: "六合一电调", count: sixInOneEscProducts.length, selected: true, imported: false, error: null },
    { id: "fc-esc-fc", name: "飞控", count: flightControllerProducts.length, selected: true, imported: false, error: null },
    { id: "fc-esc-4in1", name: "四合一电调", count: escProducts.length, selected: true, imported: false, error: null },
    { id: "fc-esc-separate", name: "分体电调", count: separateEscProducts.length, selected: true, imported: false, error: null },
    { id: "other-accessories", name: "其他配件(监视器/GPS)", count: otherAccessoriesProducts.length, selected: true, imported: false, error: null },
  ]);

  const toggleCategory = (id: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, selected: !cat.selected } : cat
    ));
  };

  const selectAll = () => {
    setCategories(prev => prev.map(cat => ({ ...cat, selected: true })));
  };

  const deselectAll = () => {
    setCategories(prev => prev.map(cat => ({ ...cat, selected: false })));
  };

  const getTotalSelected = () => {
    return categories.filter(c => c.selected).reduce((sum, c) => sum + c.count, 0);
  };

  const importProducts = async () => {
    const selectedCategories = categories.filter(c => c.selected);
    if (selectedCategories.length === 0) {
      toast({ title: "请选择至少一个类别", variant: "destructive" });
      return;
    }

    setImporting(true);
    setProgress(0);
    
    let totalImported = 0;
    const totalToImport = getTotalSelected();

    for (const category of selectedCategories) {
      try {
        let productsToImport: any[] = [];

        switch (category.id) {
          case "elrs":
            productsToImport = elrsProducts.map(convertElrsProduct);
            break;
          case "vtx":
            productsToImport = vtxProducts.map(convertVtxProduct);
            break;
          case "gimbal":
            productsToImport = gimbalProducts.map(convertGimbalProduct);
            break;
          case "camera":
            productsToImport = cameraProducts.map(convertCameraProduct);
            break;
          case "digital-fpv":
            productsToImport = digitalFpvProducts.map(convertDigitalFpvProduct);
            break;
          case "fc-esc-stack":
            productsToImport = stackProducts.map(p => convertFcEscProduct(p, "飞塔"));
            break;
          case "fc-esc-6in1":
            productsToImport = sixInOneEscProducts.map(p => convertFcEscProduct(p, "六合一电调"));
            break;
          case "fc-esc-fc":
            productsToImport = flightControllerProducts.map(p => convertFcEscProduct(p, "飞控"));
            break;
          case "fc-esc-4in1":
            productsToImport = escProducts.map(p => convertFcEscProduct(p, "四合一电调"));
            break;
          case "fc-esc-separate":
            productsToImport = separateEscProducts.map(p => convertFcEscProduct(p, "分体电调"));
            break;
          case "other-accessories":
            productsToImport = otherAccessoriesProducts.map(convertOtherAccessoryProduct);
            break;
        }

        // 批量插入产品
        const { error } = await supabase
          .from('products')
          .insert(productsToImport);

        if (error) throw error;

        totalImported += productsToImport.length;
        setProgress(Math.round((totalImported / totalToImport) * 100));
        
        setCategories(prev => prev.map(cat => 
          cat.id === category.id ? { ...cat, imported: true, error: null } : cat
        ));

      } catch (error: any) {
        console.error(`Error importing ${category.name}:`, error);
        setCategories(prev => prev.map(cat => 
          cat.id === category.id ? { ...cat, imported: false, error: error.message } : cat
        ));
      }
    }

    setImporting(false);
    
    const successCount = categories.filter(c => c.imported).length;
    const errorCount = categories.filter(c => c.error).length;
    
    if (errorCount === 0) {
      toast({ 
        title: "导入完成", 
        description: `成功导入 ${totalImported} 个产品` 
      });
    } else {
      toast({ 
        title: "部分导入失败", 
        description: `成功: ${successCount} 类别, 失败: ${errorCount} 类别`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">产品数据导入</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>导入硬编码产品数据到数据库</CardTitle>
            <CardDescription>
              将代码中的静态产品数据批量导入到数据库，实现后台统一管理。导入后可在产品管理页面进行编辑。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-muted-foreground">
                共 {getTotalSelected()} 个产品待导入
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAll}>全选</Button>
                <Button variant="outline" size="sm" onClick={deselectAll}>取消全选</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {categories.map(category => (
                <div 
                  key={category.id}
                  className={`flex items-center justify-between p-3 border rounded-lg ${
                    category.imported ? 'bg-green-50 border-green-200' : 
                    category.error ? 'bg-red-50 border-red-200' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={category.selected}
                      onCheckedChange={() => toggleCategory(category.id)}
                      disabled={importing || category.imported}
                    />
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground">{category.count} 个产品</div>
                    </div>
                  </div>
                  <div>
                    {category.imported && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {category.error && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {importing && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>导入进度</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <Button 
              onClick={importProducts} 
              disabled={importing || getTotalSelected() === 0}
              className="w-full"
              size="lg"
            >
              {importing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  正在导入...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  开始导入 ({getTotalSelected()} 个产品)
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>导入说明</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• 导入过程会将代码中定义的产品数据复制到数据库中</p>
            <p>• 导入后，您可以在「产品管理」页面编辑、删除或修改这些产品</p>
            <p>• 图片URL会被保留，如需更换图片请在产品管理中操作</p>
            <p>• 重复导入会创建重复记录，建议只导入一次</p>
            <p>• 导入成功后，前台页面将自动从数据库读取产品数据</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
