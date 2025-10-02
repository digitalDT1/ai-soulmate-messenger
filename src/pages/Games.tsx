import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2 } from 'lucide-react';

const Games = () => {
  return (
    <Layout>
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Games</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="cursor-pointer hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-3">
                    <Gamepad2 className="w-16 h-16 text-primary" />
                  </div>
                  <CardTitle>Game {i}</CardTitle>
                  <CardDescription>
                    A fun game to play with friends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Players: {Math.floor(Math.random() * 100)}</span>
                    <span>Rating: ⭐ {(4 + Math.random()).toFixed(1)}</span>
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

export default Games;
