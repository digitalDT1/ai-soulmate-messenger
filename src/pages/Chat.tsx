import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/Layout';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { useToast } from '@/hooks/use-toast';

const Chat = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadConversations();

    // Subscribe to conversation updates
    const channel = supabase
      .channel('conversations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
        },
        () => {
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadConversations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('conversation_participants')
      .select(`
        conversation_id,
        conversations (
          id,
          title,
          last_message_at,
          summary
        )
      `)
      .eq('user_id', user.id)
      .order('conversations(last_message_at)', { ascending: false });

    if (error) {
      toast({
        title: 'Error loading conversations',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setConversations(data?.map((d: any) => d.conversations).filter(Boolean) || []);
    }

    setLoading(false);
  };

  const createNewConversation = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .insert({
        title: 'New Conversation',
      })
      .select()
      .single();

    if (convError) {
      toast({
        title: 'Error creating conversation',
        description: convError.message,
        variant: 'destructive',
      });
      return;
    }

    const { error: participantError } = await supabase
      .from('conversation_participants')
      .insert({
        conversation_id: conversation.id,
        user_id: user.id,
      });

    if (participantError) {
      toast({
        title: 'Error joining conversation',
        description: participantError.message,
        variant: 'destructive',
      });
    } else {
      setSelectedConversationId(conversation.id);
      loadConversations();
    }
  };

  return (
    <Layout>
      <div className="flex h-full">
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
          onNew={createNewConversation}
          loading={loading}
        />
        {selectedConversationId ? (
          <ChatWindow conversationId={selectedConversationId} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation or create a new one
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Chat;
