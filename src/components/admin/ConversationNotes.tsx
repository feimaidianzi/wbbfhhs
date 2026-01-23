import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StickyNote, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  content: string;
  created_at: string;
}

interface ConversationNotesProps {
  conversationId: string;
}

export default function ConversationNotes({ conversationId }: ConversationNotesProps) {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!conversationId) return;
    loadNotes();
  }, [conversationId]);

  const loadNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('conversation_notes')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotes(data);
    }
    setLoading(false);
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setSaving(true);
    const { data: session } = await supabase.auth.getSession();
    
    const { error } = await supabase
      .from('conversation_notes')
      .insert({
        conversation_id: conversationId,
        content: newNote.trim(),
        agent_id: session.session?.user.id,
      });

    if (error) {
      toast({ variant: 'destructive', title: '添加失败' });
    } else {
      toast({ title: '备注已添加' });
      setNewNote('');
      loadNotes();
    }
    setSaving(false);
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm('确定删除此备注？')) return;

    const { error } = await supabase
      .from('conversation_notes')
      .delete()
      .eq('id', id);

    if (!error) {
      setNotes(notes.filter(n => n.id !== id));
      toast({ title: '已删除' });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <StickyNote className="h-4 w-4" />
        <span className="text-sm font-medium">会话备注</span>
      </div>

      {/* Add note input */}
      <div className="space-y-2">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="添加会话备注..."
          rows={2}
          className="text-sm resize-none"
        />
        <Button 
          size="sm" 
          onClick={handleAddNote} 
          disabled={saving || !newNote.trim()}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-1" />
          添加备注
        </Button>
      </div>

      {/* Notes list */}
      <ScrollArea className="h-[150px]">
        {loading ? (
          <div className="text-center py-4 text-muted-foreground text-sm">加载中...</div>
        ) : notes.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground text-sm">暂无备注</div>
        ) : (
          <div className="space-y-2">
            {notes.map((note) => (
              <div key={note.id} className="group bg-muted/50 rounded-lg p-2 text-sm">
                <div className="flex items-start justify-between">
                  <p className="text-foreground whitespace-pre-wrap flex-1">{note.content}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{formatTime(note.created_at)}</p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
