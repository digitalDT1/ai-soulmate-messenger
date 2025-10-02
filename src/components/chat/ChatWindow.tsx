import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';
import { ChatHeader } from './ChatHeader';
import { useToast } from '@/hooks/use-toast';

interface ChatWindowProps {
  conversationId: string;
}

export const ChatWindow = ({ conversationId }: ChatWindowProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
    loadCurrentUser();

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          loadMessageWithProfile(payload.new.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setCurrentUser({ ...user, profile });
    }
  };

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        profiles:author_id (
          display_name,
          avatar_url,
          anon_handle
        )
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      toast({
        title: 'Error loading messages',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setMessages(data || []);
    }

    setLoading(false);
  };

  const loadMessageWithProfile = async (messageId: string) => {
    const { data } = await supabase
      .from('messages')
      .select(`
        *,
        profiles:author_id (
          display_name,
          avatar_url,
          anon_handle
        )
      `)
      .eq('id', messageId)
      .single();

    if (data) {
      setMessages((prev) => [...prev, data]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string, isAnonymous: boolean) => {
    if (!currentUser) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        author_id: currentUser.id,
        content,
        is_anonymous: isAnonymous,
      });

    if (error) {
      toast({
        title: 'Error sending message',
        description: error.message,
        variant: 'destructive',
      });
    }

    // Update conversation last_message_at
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conversationId);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <ChatHeader conversationId={conversationId} />
      <MessageList
        messages={messages}
        currentUserId={currentUser?.id}
        loading={loading}
      />
      <div ref={messagesEndRef} />
      <MessageComposer
        onSend={handleSendMessage}
        conversationId={conversationId}
      />
    </div>
  );
};
