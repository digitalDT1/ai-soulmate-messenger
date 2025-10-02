import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Video, Phone, Search, MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
  conversationId: string;
}

export const ChatHeader = ({ conversationId }: ChatHeaderProps) => {
  const [conversation, setConversation] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    loadConversationDetails();
  }, [conversationId]);

  const loadConversationDetails = async () => {
    const { data: conv } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single();

    const { data: parts } = await supabase
      .from('conversation_participants')
      .select(`
        profiles (
          display_name,
          avatar_url
        )
      `)
      .eq('conversation_id', conversationId);

    setConversation(conv);
    setParticipants(parts?.map((p: any) => p.profiles) || []);
  };

  if (!conversation) return null;

  const displayTitle = conversation.title || 'Conversation';
  const displayParticipants = participants.map(p => p.display_name).join(', ');

  return (
    <div className="border-b border-border bg-card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          {participants[0]?.avatar_url && (
            <AvatarImage src={participants[0].avatar_url} />
          )}
          <AvatarFallback>
            {displayTitle.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="font-semibold">{displayTitle}</h2>
          <p className="text-sm text-muted-foreground">{displayParticipants || 'No participants'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Video className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
