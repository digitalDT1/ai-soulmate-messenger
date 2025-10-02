import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Sparkles, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AISuggestionsProps {
  conversationId: string;
  currentMessage: string;
  onSelect: (suggestion: string) => void;
  onClose: () => void;
}

export const AISuggestions = ({
  conversationId,
  currentMessage,
  onSelect,
  onClose,
}: AISuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    generateSuggestions();
  }, [currentMessage]);

  const generateSuggestions = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.functions.invoke('generate-suggestions', {
        body: {
          message: currentMessage,
          conversationId,
        },
      });

      if (error) throw error;

      setSuggestions(data.suggestions || []);
    } catch (error: any) {
      toast({
        title: 'Error generating suggestions',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="mb-3 p-3 bg-accent/5 border-accent/20">
        <div className="flex items-center gap-2 text-accent">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-sm">Generating AI suggestions...</span>
        </div>
      </Card>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <Card className="mb-3 p-3 bg-accent/5 border-accent/20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-accent">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI Suggestions</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start text-left h-auto py-2 px-3"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </Card>
  );
};
