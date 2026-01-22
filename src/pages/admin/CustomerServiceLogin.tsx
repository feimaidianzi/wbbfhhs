import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Loader2, Headphones } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

const CustomerServiceLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // 检查用户是否有客服权限
        const { data: hasAdminRole } = await supabase.rpc('has_role', {
          _user_id: session.user.id,
          _role: 'admin'
        });
        const { data: hasModeratorRole } = await supabase.rpc('has_role', {
          _user_id: session.user.id,
          _role: 'moderator'
        });
        
        if (hasAdminRole || hasModeratorRole) {
          navigate('/admin/customer-service');
        }
      }
    };
    
    checkSession();
  }, [navigate]);

  const validateInputs = () => {
    try {
      emailSchema.parse(email);
    } catch {
      toast({
        title: '错误',
        description: '请输入有效的邮箱地址',
        variant: 'destructive',
      });
      return false;
    }

    try {
      passwordSchema.parse(password);
    } catch {
      toast({
        title: '错误',
        description: '密码至少需要6个字符',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    setLoading(true);
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      toast({
        title: '登录失败',
        description: '邮箱或密码错误',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    if (authData.user) {
      // 检查用户是否有客服权限（admin或moderator）
      const { data: hasAdminRole } = await supabase.rpc('has_role', {
        _user_id: authData.user.id,
        _role: 'admin'
      });
      const { data: hasModeratorRole } = await supabase.rpc('has_role', {
        _user_id: authData.user.id,
        _role: 'moderator'
      });

      if (!hasAdminRole && !hasModeratorRole) {
        await supabase.auth.signOut();
        toast({
          title: '访问拒绝',
          description: '您没有客服权限',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // 更新客服状态为在线
      await supabase
        .from('customer_service_agents')
        .upsert({
          user_id: authData.user.id,
          display_name: authData.user.email?.split('@')[0] || '客服',
          status: 'online',
        }, {
          onConflict: 'user_id',
        });

      toast({
        title: '登录成功',
        description: '欢迎进入客服工作台',
      });
      navigate('/admin/customer-service');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-blue-700 bg-blue-800/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">客服登录</CardTitle>
            <CardDescription className="text-blue-200">登录客服工作台处理客户咨询</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cs-email" className="text-blue-100">工作邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                  <Input
                    id="cs-email"
                    type="email"
                    placeholder="请输入工作邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-blue-700/50 border-blue-600 text-white placeholder:text-blue-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cs-password" className="text-blue-100">密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                  <Input
                    id="cs-password"
                    type="password"
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-blue-700/50 border-blue-600 text-white placeholder:text-blue-400"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    验证中...
                  </>
                ) : (
                  '进入客服工作台'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-blue-300 text-sm mt-4">
          需要帮助？请联系管理员
        </p>
      </div>
    </div>
  );
};

export default CustomerServiceLogin;
