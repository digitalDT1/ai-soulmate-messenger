import { Button } from '../ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface Conversation {
  id: string;
  title: string;
  last_message_at: string;
  summary?: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  loading: boolean;
}

export const ConversationList = ({
  conversations,
  selectedId,
  onSelect,
  onNew,
  loading,
}: ConversationListProps) => {
  return (
    <div className="w-80 border-r border-border flex flex-col bg-card">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-lg">Conversations</h2>
        <Button size="icon" variant="ghost" onClick={onNew}>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-muted-foreground">Loading...</div>
        ) : conversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No conversations yet</p>
            <p className="text-sm">Start a new conversation</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={cn(
                  'w-full p-3 rounded-xl text-left transition-all hover:bg-muted',
                  selectedId === conv.id && 'bg-primary/10 border-l-4 border-primary'
                )}
              >
                <div className="font-medium truncate">{conv.title}</div>
                {conv.summary && (
                  <div className="text-sm text-muted-foreground truncate mt-1">
                    {conv.summary}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
