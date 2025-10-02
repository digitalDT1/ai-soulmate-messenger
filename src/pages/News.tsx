import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp } from 'lucide-react';

const News = () => {
  const newsItems = [
    {
      title: 'New AI Features Released',
      description: 'Lovable AI introduces advanced sentiment analysis and reply suggestions',
      category: 'Product',
      time: '2 hours ago',
    },
    {
      title: 'Community Reaches 1M Users',
      description: 'Thank you for making Lovable AI the best anonymous chat platform',
      category: 'Community',
      time: '5 hours ago',
    },
    {
      title: 'Enhanced Privacy Controls',
      description: 'New per-message anonymization options now available',
      category: 'Privacy',
      time: '1 day ago',
    },
  ];

  return (
    <Layout>
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Latest News</h1>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </Badge>
          </div>

          <div className="space-y-4">
            {newsItems.map((item, i) => (
              <Card key={i} className="cursor-pointer hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{item.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </span>
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;
