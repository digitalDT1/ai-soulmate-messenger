import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  content: string;
  author_id: string;
  is_anonymous: boolean;
  sentiment_score?: number;
  created_at: string;
  profiles: {
    display_name: string;
    avatar_url?: string;
    anon_handle: string;
  };
}

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
  loading: boolean;
}

export const MessageList = ({ messages, currentUserId, loading }: MessageListProps) => {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground">Loading messages...</div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-lg mb-2">No messages yet</p>
          <p className="text-sm">Start the conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isOwn = message.author_id === currentUserId;
        const displayName = message.is_anonymous 
          ? message.profiles.anon_handle 
          : message.profiles.display_name;

        return (
          <div
            key={message.id}
            className={cn(
              'flex gap-3 items-start',
              isOwn && 'flex-row-reverse'
            )}
          >
            <Avatar className="w-10 h-10">
              {!message.is_anonymous && message.profiles.avatar_url && (
                <AvatarImage src={message.profiles.avatar_url} />
              )}
              <AvatarFallback className={message.is_anonymous ? 'bg-muted' : ''}>
                {displayName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className={cn('flex flex-col max-w-[70%]', isOwn && 'items-end')}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">{displayName}</span>
                {message.is_anonymous && (
                  <Badge variant="secondary" className="text-xs">
                    Anonymous
                  </Badge>
                )}
              </div>

              <div
                className={cn(
                  'rounded-2xl px-4 py-2',
                  isOwn
                    ? 'bg-gradient-to-br from-secondary to-secondary/80 text-white'
                    : 'bg-muted'
                )}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
              </div>

              <span className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
