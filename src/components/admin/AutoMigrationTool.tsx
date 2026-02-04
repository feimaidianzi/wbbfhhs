import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Wand2, 
  Copy, 
  CheckCircle, 
  Code, 
  FileText, 
  AlertCircle,
  Play,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

interface MigrationResult {
  originalCode: string;
  migratedCode: string;
  translationKeys: Record<string, string>;
  replacements: Array<{
    original: string;
    replacement: string;
    key: string;
  }>;
}

interface AutoMigrationToolProps {
  selectedPages: string[];
}

// 工具函数：将中文转换为翻译键
const generateTranslationKey = (chinese: string, context: string = ''): string => {
  // 简单的拼音/英文映射表
  const keywordMap: Record<string, string> = {
    '首页': 'home',
    '关于': 'about',
    '联系': 'contact',
    '产品': 'product',
    '无人机': 'drone',
    '系留': 'tethered',
    '物流': 'logistics',
    '配送': 'delivery',
    '巡检': 'inspection',
    '电力': 'power',
    '光伏': 'solar',
    '消防': 'firefighting',
    '农业': 'agriculture',
    '培训': 'training',
    '集群': 'swarm',
    '机场': 'airport',
    '飞控': 'flightController',
    '云台': 'gimbal',
    '相机': 'camera',
    '图传': 'vtx',
    '载重': 'payload',
    '续航': 'endurance',
    '速度': 'speed',
    '距离': 'range',
    '功能': 'feature',
    '特点': 'highlight',
    '优势': 'advantage',
    '应用': 'application',
    '场景': 'scenario',
    '解决方案': 'solution',
    '规格': 'specification',
    '参数': 'parameter',
    '了解更多': 'learnMore',
    '立即咨询': 'contactNow',
    '查看详情': 'viewDetails',
    '返回': 'back',
    '描述': 'description',
    '标题': 'title',
    '介绍': 'intro',
  };

  // 生成基础键名
  let baseKey = context || 'common';
  
  // 尝试从映射表中找到关键词
  for (const [zh, en] of Object.entries(keywordMap)) {
    if (chinese.includes(zh)) {
      baseKey = `${baseKey}.${en}`;
      break;
    }
  }

  // 如果太长，截取前20个字符生成hash
  if (chinese.length > 10) {
    const hash = chinese.slice(0, 10).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;
    return `${baseKey}.text${hash}`;
  }

  return baseKey;
};

// 分析代码中的 isEn 模式
const analyzeIsEnPatterns = (code: string): Array<{
  original: string;
  english: string;
  chinese: string;
  lineNumber: number;
}> => {
  const patterns: Array<{
    original: string;
    english: string;
    chinese: string;
    lineNumber: number;
  }> = [];

  const lines = code.split('\n');
  
  // 匹配 isEn ? "English" : "中文" 模式
  const isEnRegex = /isEn\s*\?\s*["'`]([^"'`]*)["'`]\s*:\s*["'`]([^"'`]*)["'`]/g;
  
  // 匹配 language === 'en' ? "English" : "中文" 模式
  const langRegex = /language\s*===\s*['"]en['"]\s*\?\s*["'`]([^"'`]*)["'`]\s*:\s*["'`]([^"'`]*)["'`]/g;

  // 匹配 language === 'zh' ? "中文" : "English" 模式
  const langZhRegex = /language\s*===\s*['"]zh['"]\s*\?\s*["'`]([^"'`]*)["'`]\s*:\s*["'`]([^"'`]*)["'`]/g;

  lines.forEach((line, index) => {
    let match;
    
    // 检查 isEn 模式
    while ((match = isEnRegex.exec(line)) !== null) {
      patterns.push({
        original: match[0],
        english: match[1],
        chinese: match[2],
        lineNumber: index + 1,
      });
    }
    isEnRegex.lastIndex = 0;

    // 检查 language === 'en' 模式
    while ((match = langRegex.exec(line)) !== null) {
      patterns.push({
        original: match[0],
        english: match[1],
        chinese: match[2],
        lineNumber: index + 1,
      });
    }
    langRegex.lastIndex = 0;

    // 检查 language === 'zh' 模式
    while ((match = langZhRegex.exec(line)) !== null) {
      patterns.push({
        original: match[0],
        english: match[2], // 注意顺序相反
        chinese: match[1],
        lineNumber: index + 1,
      });
    }
    langZhRegex.lastIndex = 0;
  });

  return patterns;
};

// 检测硬编码中文字符串
const detectHardcodedChinese = (code: string): Array<{
  text: string;
  lineNumber: number;
  context: string;
}> => {
  const results: Array<{
    text: string;
    lineNumber: number;
    context: string;
  }> = [];

  const lines = code.split('\n');
  const chineseRegex = /["'`]([^"'`]*[\u4e00-\u9fa5]+[^"'`]*)["'`]/g;

  lines.forEach((line, index) => {
    // 跳过注释和import语句
    if (line.trim().startsWith('//') || line.trim().startsWith('import')) {
      return;
    }

    let match;
    while ((match = chineseRegex.exec(line)) !== null) {
      // 跳过已经在 isEn 或 t() 中的
      if (line.includes('isEn') || line.includes('t(') || line.includes('language')) {
        continue;
      }
      results.push({
        text: match[1],
        lineNumber: index + 1,
        context: line.trim().slice(0, 50),
      });
    }
    chineseRegex.lastIndex = 0;
  });

  return results;
};

// 生成迁移代码
const generateMigratedCode = (
  code: string, 
  patterns: ReturnType<typeof analyzeIsEnPatterns>,
  pageContext: string
): MigrationResult => {
  let migratedCode = code;
  const translationKeys: Record<string, string> = {};
  const replacements: MigrationResult['replacements'] = [];

  // 确保导入 useLanguage
  if (!migratedCode.includes('useLanguage')) {
    migratedCode = migratedCode.replace(
      /import\s*{([^}]+)}\s*from\s*["']react["']/,
      (match, imports) => {
        return match;
      }
    );
    
    // 在第一个 import 后添加 useLanguage 导入
    const firstImportEnd = migratedCode.indexOf(';') + 1;
    const beforeImport = migratedCode.slice(0, firstImportEnd);
    const afterImport = migratedCode.slice(firstImportEnd);
    
    if (!migratedCode.includes('@/contexts/LanguageContext')) {
      migratedCode = beforeImport + '\nimport { useLanguage } from "@/contexts/LanguageContext";' + afterImport;
    }
  }

  // 替换 isEn 模式为 t() 调用
  patterns.forEach((pattern, index) => {
    const keyBase = pageContext.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const key = `${keyBase}.text${index + 1}`;
    
    // 生成 t() 调用
    const replacement = `t('${key}')`;
    
    migratedCode = migratedCode.replace(pattern.original, replacement);
    
    translationKeys[key] = pattern.chinese;
    replacements.push({
      original: pattern.original,
      replacement,
      key,
    });
  });

  return {
    originalCode: code,
    migratedCode,
    translationKeys,
    replacements,
  };
};

const AutoMigrationTool = ({ selectedPages }: AutoMigrationToolProps) => {
  const [inputCode, setInputCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{
    patterns: ReturnType<typeof analyzeIsEnPatterns>;
    hardcoded: ReturnType<typeof detectHardcodedChinese>;
    migrationResult: MigrationResult | null;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pageContext, setPageContext] = useState('page');

  const handleAnalyze = () => {
    if (!inputCode.trim()) {
      toast.error('请先粘贴需要分析的代码');
      return;
    }

    setIsAnalyzing(true);
    
    // 模拟分析延迟
    setTimeout(() => {
      const patterns = analyzeIsEnPatterns(inputCode);
      const hardcoded = detectHardcodedChinese(inputCode);
      const migrationResult = patterns.length > 0 
        ? generateMigratedCode(inputCode, patterns, pageContext)
        : null;

      setAnalysisResult({
        patterns,
        hardcoded,
        migrationResult,
      });
      
      setIsAnalyzing(false);
      
      if (patterns.length === 0 && hardcoded.length === 0) {
        toast.success('代码分析完成：未发现需要迁移的内容');
      } else {
        toast.success(`发现 ${patterns.length} 个 isEn 模式，${hardcoded.length} 个硬编码中文`);
      }
    }, 300);
  };

  const copyMigratedCode = () => {
    if (analysisResult?.migrationResult) {
      navigator.clipboard.writeText(analysisResult.migrationResult.migratedCode);
      toast.success('已复制迁移后的代码');
    }
  };

  const copyTranslationKeys = () => {
    if (analysisResult?.migrationResult) {
      const keysCode = Object.entries(analysisResult.migrationResult.translationKeys)
        .map(([key, value]) => `  '${key}': '${value}',`)
        .join('\n');
      navigator.clipboard.writeText(keysCode);
      toast.success('已复制翻译键');
    }
  };

  const patternCount = analysisResult?.patterns.length || 0;
  const hardcodedCount = analysisResult?.hardcoded.length || 0;

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-blue-600" />
          🔧 本地代码迁移工具
          <Badge variant="secondary" className="ml-2">无需AI</Badge>
        </CardTitle>
        <CardDescription>
          粘贴页面代码，自动分析并生成 t() 多语言替换方案
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 输入区域 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">粘贴页面代码</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="页面名称 (用于生成键名)"
                className="px-2 py-1 text-sm border rounded"
                value={pageContext}
                onChange={(e) => setPageContext(e.target.value)}
              />
              <Button 
                size="sm" 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputCode.trim()}
              >
                {isAnalyzing ? (
                  <>分析中...</>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    分析代码
                  </>
                )}
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="将页面的 .tsx 代码粘贴到这里..."
            className="font-mono text-xs h-40"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
        </div>

        {/* 分析结果 */}
        {analysisResult && (
          <div className="space-y-4">
            {/* 统计卡片 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-lg border text-center">
                <div className="text-2xl font-bold text-blue-600">{patternCount}</div>
                <div className="text-xs text-muted-foreground">isEn 模式</div>
              </div>
              <div className="p-3 bg-white rounded-lg border text-center">
                <div className="text-2xl font-bold text-orange-600">{hardcodedCount}</div>
                <div className="text-xs text-muted-foreground">硬编码中文</div>
              </div>
              <div className="p-3 bg-white rounded-lg border text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Object.keys(analysisResult.migrationResult?.translationKeys || {}).length}
                </div>
                <div className="text-xs text-muted-foreground">生成翻译键</div>
              </div>
            </div>

            {/* 详细结果标签页 */}
            <Tabs defaultValue="patterns" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="patterns" className="text-xs">
                  isEn 模式 ({patternCount})
                </TabsTrigger>
                <TabsTrigger value="migrated" className="text-xs">
                  迁移代码
                </TabsTrigger>
                <TabsTrigger value="keys" className="text-xs">
                  翻译键
                </TabsTrigger>
              </TabsList>

              {/* isEn 模式列表 */}
              <TabsContent value="patterns">
                <ScrollArea className="h-60 border rounded-lg p-3 bg-white">
                  {patternCount === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      未发现 isEn 模式
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {analysisResult.patterns.map((p, i) => (
                        <div key={i} className="p-2 bg-gray-50 rounded text-xs font-mono">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px]">L{p.lineNumber}</Badge>
                            <ArrowRight className="w-3 h-3" />
                            <code className="text-blue-600">t('{pageContext}.text{i + 1}')</code>
                          </div>
                          <div className="text-muted-foreground truncate">{p.original}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              {/* 迁移后代码 */}
              <TabsContent value="migrated">
                <div className="space-y-2">
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" onClick={copyMigratedCode}>
                      <Copy className="w-4 h-4 mr-1" />
                      复制代码
                    </Button>
                  </div>
                  <ScrollArea className="h-60 border rounded-lg bg-gray-900 p-3">
                    <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                      {analysisResult.migrationResult?.migratedCode || '无需迁移'}
                    </pre>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/* 翻译键 */}
              <TabsContent value="keys">
                <div className="space-y-2">
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" onClick={copyTranslationKeys}>
                      <Copy className="w-4 h-4 mr-1" />
                      复制翻译键
                    </Button>
                  </div>
                  <ScrollArea className="h-60 border rounded-lg bg-white p-3">
                    {analysisResult.migrationResult ? (
                      <div className="space-y-1">
                        {Object.entries(analysisResult.migrationResult.translationKeys).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs">
                            <code className="text-blue-600 font-mono">'{key}'</code>
                            <ArrowRight className="w-3 h-3 text-muted-foreground" />
                            <span className="text-gray-700">'{value}'</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        无翻译键
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>

            {/* 硬编码中文警告 */}
            {hardcodedCount > 0 && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 text-orange-700 font-medium text-sm mb-2">
                  <AlertCircle className="w-4 h-4" />
                  发现 {hardcodedCount} 个硬编码中文字符串
                </div>
                <ScrollArea className="h-24">
                  <div className="space-y-1">
                    {analysisResult.hardcoded.slice(0, 10).map((h, i) => (
                      <div key={i} className="text-xs text-orange-600">
                        <Badge variant="outline" className="text-[10px] mr-1">L{h.lineNumber}</Badge>
                        "{h.text}"
                      </div>
                    ))}
                    {hardcodedCount > 10 && (
                      <div className="text-xs text-orange-500">...还有 {hardcodedCount - 10} 个</div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}

        {/* 使用说明 */}
        <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700 space-y-1">
          <p><strong>使用步骤：</strong></p>
          <ol className="list-decimal list-inside space-y-0.5 text-blue-600">
            <li>复制需要迁移的页面代码</li>
            <li>粘贴到上方输入框</li>
            <li>输入页面名称（用于生成翻译键前缀）</li>
            <li>点击"分析代码"</li>
            <li>复制生成的迁移代码和翻译键</li>
            <li>将翻译键添加到 zh.ts 文件</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoMigrationTool;
