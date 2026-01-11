import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Shield, 
  LogOut, 
  Users, 
  Home,
  Loader2,
  ArrowLeft,
  MoreHorizontal,
  UserPlus,
  UserMinus,
  Crown,
  UserCheck,
  User as UserIcon
} from 'lucide-react';

interface UserWithRoles {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
}

const UserManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }

      setCurrentUserId(session.user.id);

      const response = await supabase.functions.invoke('get-users', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setUsers(response.data.users || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: '获取用户列表失败',
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
        navigate('/admin/login');
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
        navigate('/admin/login');
        return;
      }

      fetchUsers();
    };

    checkAdminAccess();
  }, [navigate, toast]);

  const handleRoleAction = async (userId: string, role: string, action: 'add' | 'remove') => {
    setActionLoading(`${userId}-${role}-${action}`);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await supabase.functions.invoke('manage-user-role', {
        body: {
          action,
          targetUserId: userId,
          role,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      toast({
        title: action === 'add' ? '角色已添加' : '角色已移除',
        description: response.data.message,
      });

      // Refresh users list
      await fetchUsers();
    } catch (error: any) {
      console.error('Error managing role:', error);
      toast({
        title: '操作失败',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'moderator':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-3 h-3" />;
      case 'moderator':
        return <UserCheck className="w-3 h-3" />;
      default:
        return <UserIcon className="w-3 h-3" />;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '从未';
    return new Date(dateString).toLocaleString('zh-CN');
  };

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
              <h1 className="text-lg font-bold text-white">用户管理</h1>
              <p className="text-xs text-slate-400">User Management</p>
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
        {/* Back Button */}
        <Link to="/admin">
          <Button variant="ghost" className="text-slate-400 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回管理后台
          </Button>
        </Link>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              用户列表
              <Badge variant="secondary" className="ml-2">
                {users.length} 位用户
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">邮箱</TableHead>
                    <TableHead className="text-slate-400">角色</TableHead>
                    <TableHead className="text-slate-400">注册时间</TableHead>
                    <TableHead className="text-slate-400">最后登录</TableHead>
                    <TableHead className="text-slate-400 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-slate-700">
                      <TableCell className="text-white font-medium">
                        {user.email}
                        {user.id === currentUserId && (
                          <Badge variant="outline" className="ml-2 text-amber-500 border-amber-500">
                            当前用户
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {user.roles.length > 0 ? (
                            user.roles.map((role) => (
                              <Badge 
                                key={role} 
                                variant="outline" 
                                className={`${getRoleBadgeColor(role)} flex items-center gap-1`}
                              >
                                {getRoleIcon(role)}
                                {role === 'admin' ? '管理员' : role === 'moderator' ? '版主' : '用户'}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-slate-500 text-sm">无角色</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {formatDate(user.created_at)}
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {formatDate(user.last_sign_in_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              disabled={actionLoading?.startsWith(user.id)}
                            >
                              {actionLoading?.startsWith(user.id) ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <MoreHorizontal className="w-4 h-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                            {!user.roles.includes('admin') && (
                              <DropdownMenuItem 
                                className="text-green-400 focus:text-green-400 focus:bg-green-500/10 cursor-pointer"
                                onClick={() => handleRoleAction(user.id, 'admin', 'add')}
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                添加管理员权限
                              </DropdownMenuItem>
                            )}
                            {user.roles.includes('admin') && user.id !== currentUserId && (
                              <DropdownMenuItem 
                                className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
                                onClick={() => handleRoleAction(user.id, 'admin', 'remove')}
                              >
                                <UserMinus className="w-4 h-4 mr-2" />
                                移除管理员权限
                              </DropdownMenuItem>
                            )}
                            {!user.roles.includes('moderator') && (
                              <DropdownMenuItem 
                                className="text-blue-400 focus:text-blue-400 focus:bg-blue-500/10 cursor-pointer"
                                onClick={() => handleRoleAction(user.id, 'moderator', 'add')}
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                添加版主权限
                              </DropdownMenuItem>
                            )}
                            {user.roles.includes('moderator') && (
                              <DropdownMenuItem 
                                className="text-orange-400 focus:text-orange-400 focus:bg-orange-500/10 cursor-pointer"
                                onClick={() => handleRoleAction(user.id, 'moderator', 'remove')}
                              >
                                <UserMinus className="w-4 h-4 mr-2" />
                                移除版主权限
                              </DropdownMenuItem>
                            )}
                            {!user.roles.includes('user') && (
                              <DropdownMenuItem 
                                className="text-slate-400 focus:text-slate-300 focus:bg-slate-500/10 cursor-pointer"
                                onClick={() => handleRoleAction(user.id, 'user', 'add')}
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                添加用户角色
                              </DropdownMenuItem>
                            )}
                            {user.roles.includes('user') && (
                              <DropdownMenuItem 
                                className="text-slate-400 focus:text-slate-300 focus:bg-slate-500/10 cursor-pointer"
                                onClick={() => handleRoleAction(user.id, 'user', 'remove')}
                              >
                                <UserMinus className="w-4 h-4 mr-2" />
                                移除用户角色
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {users.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">暂无用户数据</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default UserManagement;
