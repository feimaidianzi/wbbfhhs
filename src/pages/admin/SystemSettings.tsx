import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, Loader2, Settings, Mail } from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string | null;
  description: string | null;
}

const SystemSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  useEffect(() => {
    checkAuthAndFetchSettings();
  }, []);

  const checkAuthAndFetchSettings = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/admin/login');
        return;
      }

      // Use has_role RPC for consistent authorization check
      const { data: isAdmin } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (!isAdmin) {
        toast({
          title: "权限不足",
          description: "您没有管理员权限",
          variant: "destructive",
        });
        navigate('/admin/login');
        return;
      }

      await fetchSettings();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/admin/login');
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('key');

      if (error) throw error;

      setSettings(data || []);
      const values: Record<string, string> = {};
      data?.forEach(s => {
        values[s.key] = s.value || '';
      });
      setEditedValues(values);
    } catch (error: any) {
      console.error('Fetch settings error:', error);
      toast({
        title: "加载失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const setting of settings) {
        const newValue = editedValues[setting.key];
        if (newValue !== setting.value) {
          const { error } = await supabase
            .from('system_settings')
            .update({ value: newValue })
            .eq('id', setting.id);

          if (error) throw error;
        }
      }

      toast({
        title: "保存成功",
        description: "系统设置已更新",
      });

      await fetchSettings();
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const settingLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    admin_notification_email: { label: "管理员通知邮箱", icon: <Mail className="w-5 h-5" /> },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">系统设置</h1>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            保存设置
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-accent" />
              邮件通知设置
            </h2>
            
            <div className="space-y-4">
              {settings.map((setting) => {
                const meta = settingLabels[setting.key] || { label: setting.key, icon: null };
                return (
                  <div key={setting.id} className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      {meta.icon}
                      {meta.label}
                    </label>
                    <Input
                      type={setting.key.includes('email') ? 'email' : 'text'}
                      value={editedValues[setting.key] || ''}
                      onChange={(e) => setEditedValues({
                        ...editedValues,
                        [setting.key]: e.target.value
                      })}
                      placeholder={`请输入${meta.label}`}
                    />
                    {setting.description && (
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>提示：</strong>修改管理员通知邮箱后，新咨询将发送到新邮箱。请确保邮箱地址正确，否则可能无法收到通知。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemSettings;
