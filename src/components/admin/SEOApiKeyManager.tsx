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
  const [yandexUserId, setYandexUserId] = useState('');
  const [yandexApiKey, setYandexApiKey] = useState('');
  const [so360SiteToken, setSo360SiteToken] = useState('');
  
  const [configuredKeys, setConfiguredKeys] = useState<Record<string, boolean>>({
    google_oauth_token: false,
    baidu_token: false,
    bing_api_key: false,
    yandex_user_id: false,
    yandex_api_key: false,
    so360_site_token: false,
  });

  useEffect(() => {
    loadApiKeyStatus();
  }, []);

  const loadApiKeyStatus = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-seo-keys', {
        body: { action: 'get-status' },
      });

      if (error) throw error;

      if (data?.status) {
        setConfiguredKeys({
          google_oauth_token: data.status.google_oauth_token || false,
          baidu_token: data.status.baidu_token || false,
          bing_api_key: data.status.bing_api_key || false,
          yandex_user_id: data.status.yandex_user_id || false,
          yandex_api_key: data.status.yandex_api_key || false,
          so360_site_token: data.status.so360_site_token || false,
        });
      }

      if (onKeysLoaded) {
        onKeysLoaded({ googleToken: '', baiduToken: '', bingApiKey: '' });
      }
    } catch (error) {
      console.error('Failed to load API key status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKeys = async () => {
    setIsSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-seo-keys', {
        body: {
          action: 'save-keys',
          keys: {
            google_oauth_token: googleToken || null,
            baidu_token: baiduToken || null,
            bing_api_key: bingApiKey || null,
          },
        },
      });

      if (error) throw error;

      setConfiguredKeys({
        google_oauth_token: !!googleToken,
        baidu_token: !!baiduToken,
        bing_api_key: !!bingApiKey,
      });

      // Clear local state after save - keys stay server-side only
      setGoogleToken('');
      setBaiduToken('');
      setBingApiKey('');

      toast.success('API密钥已安全保存');
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
                  placeholder={configuredKeys.google_oauth_token ? '••••••••（已配置，留空不修改）' : 'Google API Token'}
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
                  placeholder={configuredKeys.baidu_token ? '••••••••（已配置，留空不修改）' : '百度推送Token'}
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
                  placeholder={configuredKeys.bing_api_key ? '••••••••（已配置，留空不修改）' : 'Bing Webmaster API Key'}
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
                <p>API密钥安全存储在服务端，不会传输到浏览器。不配置时系统将使用Ping方式通知搜索引擎。</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SEOApiKeyManager;
