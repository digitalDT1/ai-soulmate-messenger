import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';

const Feed = () => {
  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Feed</h1>
          
          <Card className="p-6 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">Anon-A8F2</h3>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="mb-4">Check out this amazing post! #TruNanymous</p>
            
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4" />
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="w-4 h-4" />
                42
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                12
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Feed;