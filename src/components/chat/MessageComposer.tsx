import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Send, Sparkles } from 'lucide-react';
import { AISuggestions } from './AISuggestions';

interface MessageComposerProps {
  onSend: (content: string, isAnonymous: boolean) => void;
  conversationId: string;
}

export const MessageComposer = ({ onSend, conversationId }: MessageComposerProps) => {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSend = () => {
    if (!content.trim()) return;

    onSend(content.trim(), isAnonymous);
    setContent('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setContent(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="border-t border-border p-4 bg-card">
      {showSuggestions && content && (
        <AISuggestions
          conversationId={conversationId}
          currentMessage={content}
          onSelect={handleSuggestionSelect}
          onClose={() => setShowSuggestions(false)}
        />
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Switch
            id="anonymous-mode"
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
          />
          <Label htmlFor="anonymous-mode" className="text-sm cursor-pointer">
            Send anonymously
          </Label>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="ml-auto text-accent"
        >
          <Sparkles className="w-4 h-4 mr-1" />
          AI Suggestions
        </Button>
      </div>

      <div className="flex gap-2">
        <Textarea
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          className="min-h-[60px] max-h-[200px] resize-none"
        />
        <Button
          onClick={handleSend}
          disabled={!content.trim()}
          className="self-end"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
