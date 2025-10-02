import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Gamepad2, Newspaper, Video, Bot, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: '/', icon: MessageSquare, label: 'Chat' },
  { to: '/games', icon: Gamepad2, label: 'Games' },
  { to: '/news', icon: Newspaper, label: 'News' },
  { to: '/for-you', icon: Video, label: 'For You' },
  { to: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const Layout = ({ children }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Left Navigation */}
      <nav className="w-20 lg:w-64 bg-card border-r border-border flex flex-col items-center lg:items-start p-4 gap-2">
        <div className="mb-8 flex items-center justify-center lg:justify-start w-full">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            <span className="hidden lg:inline">Lovable AI</span>
            <span className="lg:hidden">LA</span>
          </div>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all',
                'hover:bg-muted',
                isActive && 'bg-primary/10 text-primary font-medium'
              )
            }
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            <span className="hidden lg:inline">{item.label}</span>
          </NavLink>
        ))}

        <div className="mt-auto w-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-full lg:w-auto"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
};
