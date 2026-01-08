import { supabase } from '@/integrations/supabase/client';

type EntityType = 'product' | 'news' | 'inquiry' | 'user' | 'settings' | 'system';
type ActionType = 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'reply' | 'login' | 'logout' | 'export';

interface LogActivityParams {
  action: ActionType;
  entityType: EntityType;
  entityId?: string;
  entityName?: string;
  details?: Record<string, any>;
}

export const useActivityLog = () => {
  const logActivity = async ({
    action,
    entityType,
    entityId,
    entityName,
    details,
  }: LogActivityParams) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      await supabase.from('admin_activity_logs').insert({
        user_id: session.user.id,
        user_email: session.user.email,
        action,
        entity_type: entityType,
        entity_id: entityId,
        entity_name: entityName,
        details,
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  };

  return { logActivity };
};

export type { EntityType, ActionType, LogActivityParams };
