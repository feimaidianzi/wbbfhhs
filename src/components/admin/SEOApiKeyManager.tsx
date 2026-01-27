import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  Save, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ApiKey {
  id: string;
  key_name: string;
  key_value: string | null;
  is_configured: boolean;
  last_used_at: string | null;
}

interface SEOApiKeyManagerProps {
  onKeysLoaded?: (keys: { googleToken: string; baiduToken: string; bingApiKey: string }) => void;
}

const SEOApiKeyManager: React.FC<SEOApiKeyManagerProps> = ({ onKeysLoaded }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  const [googleToken, setGoogleToken] = useState('');
  const [baiduToken, setBaiduToken] = useState('');
  const [bingApiKey, setBingApiKey] = useState('');
  
  const [configuredKeys, setConfiguredKeys] = useState<Record<string, boolean>>({
    google_oauth_token: false,
    baidu_token: false,
    bing_api_key: false,
  });

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('seo_api_keys')
        .select('*');

      if (error) throw error;

      const keyMap: Record<string, ApiKey> = {};
      data?.forEach(key => {
        keyMap[key.key_name] = key;
      });

      setConfiguredKeys({
        google_oauth_token: keyMap['google_oauth_token']?.is_configured || false,
        baidu_token: keyMap['baidu_token']?.is_configured || false,
        bing_api_key: keyMap['bing_api_key']?.is_configured || false,
      });

      // Set values if they exist
      if (keyMap['google_oauth_token']?.key_value) {
        setGoogleToken(keyMap['google_oauth_token'].key_value);
      }
      if (keyMap['baidu_token']?.key_value) {
        setBaiduToken(keyMap['baidu_token'].key_value);
      }
      if (keyMap['bing_api_key']?.key_value) {
        setBingApiKey(keyMap['bing_api_key'].key_value);
      }

      // Notify parent of loaded keys
      if (onKeysLoaded) {
        onKeysLoaded({
          googleToken: keyMap['google_oauth_token']?.key_value || '',
          baiduToken: keyMap['baidu_token']?.key_value || '',
          bingApiKey: keyMap['bing_api_key']?.key_value || '',
        });
      }
    } catch (error) {
      console.error('Failed to load API keys:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKeys = async () => {
    setIsSaving(true);
    try {
      const updates = [
        { 
          key_name: 'google_oauth_token', 
          key_value: googleToken || null,
          is_configured: !!googleToken,
          updated_at: new Date().toISOString()
        },
        { 
          key_name: 'baidu_token', 
          key_value: baiduToken || null,
          is_configured: !!baiduToken,
          updated_at: new Date().toISOString()
        },
        { 
          key_name: 'bing_api_key', 
          key_value: bingApiKey || null,
          is_configured: !!bingApiKey,
          updated_at: new Date().toISOString()
        },
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from('seo_api_keys')
          .update(update)
          .eq('key_name', update.key_name);

        if (error) throw error;
      }

      setConfiguredKeys({
        google_oauth_token: !!googleToken,
        baidu_token: !!baiduToken,
        bing_api_key: !!bingApiKey,
      });

      // Notify parent of updated keys
      if (onKeysLoaded) {
        onKeysLoaded({ googleToken, baiduToken, bingApiKey });
      }

      toast.success('API密钥已保存');
    } catch (error) {
      console.error('Failed to save API keys:', error);
      toast.error('保存失败');
    } finally {
      setIsSaving(false);
    }
  };

  const getConfigStatus = (isConfigured: boolean) => {
    return isConfigured ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="h-3 w-3 mr-1" />已配置
      </Badge>
    ) : (
      <Badge variant="outline" className="text-muted-foreground">
        <AlertCircle className="h-3 w-3 mr-1" />未配置
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              搜索引擎API密钥
            </CardTitle>
            <CardDescription>
              配置API密钥后可实现自动化提交Sitemap到搜索引擎
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowConfig(!showConfig)}
          >
            <Settings className="h-4 w-4 mr-1" />
            {showConfig ? '隐藏' : '配置'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Overview */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Google:</span>
            {getConfigStatus(configuredKeys.google_oauth_token)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">百度:</span>
            {getConfigStatus(configuredKeys.baidu_token)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Bing:</span>
            {getConfigStatus(configuredKeys.bing_api_key)}
          </div>
        </div>

        {showConfig && (
          <>
            {/* API Key Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="googleToken" className="text-sm flex items-center justify-between">
                  <span>Google OAuth Token</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => setShowKeys(!showKeys)}
                  >
                    {showKeys ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                </Label>
                <Input
                  id="googleToken"
                  type={showKeys ? 'text' : 'password'}
                  placeholder="Google API Token"
                  value={googleToken}
                  onChange={(e) => setGoogleToken(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  从 Google Cloud Console 获取
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="baiduToken" className="text-sm">百度站长Token</Label>
                <Input
                  id="baiduToken"
                  type={showKeys ? 'text' : 'password'}
                  placeholder="百度推送Token"
                  value={baiduToken}
                  onChange={(e) => setBaiduToken(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  从百度站长平台获取
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bingApiKey" className="text-sm">Bing API Key</Label>
                <Input
                  id="bingApiKey"
                  type={showKeys ? 'text' : 'password'}
                  placeholder="Bing Webmaster API Key"
                  value={bingApiKey}
                  onChange={(e) => setBingApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  从 Bing Webmaster Tools 获取
                </p>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={saveApiKeys} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                保存密钥
              </Button>
            </div>

            {/* Info */}
            <div className="p-3 bg-amber-50 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p>API密钥将安全存储在数据库中。不配置时系统将使用Ping方式通知搜索引擎。</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SEOApiKeyManager;
