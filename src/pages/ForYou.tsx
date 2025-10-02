import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Play } from 'lucide-react';

const ForYou = () => {
  const feedPosts = [
    {
      id: '1',
      author: { name: 'Creative User', avatar: '' },
      content: 'Check out this amazing video about AI!',
      mediaType: 'video',
      likes: 245,
      comments: 12,
    },
    {
      id: '2',
      author: { name: 'Anon-8F2A', avatar: '' },
      content: 'Just discovered something incredible...',
      mediaType: 'image',
      likes: 189,
      comments: 23,
    },
  ];

  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">For You</h1>

          <div className="space-y-4">
            {feedPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar>
                      <AvatarFallback>
                        {post.author.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{post.author.name}</h3>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>

                  <p className="mb-3">{post.content}</p>

                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-3">
                    {post.mediaType === 'video' ? (
                      <Play className="w-16 h-16 text-primary" />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p>Image Preview</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForYou;
