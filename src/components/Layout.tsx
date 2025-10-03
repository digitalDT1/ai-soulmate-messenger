import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Gamepad2, Newspaper, Video, Bot, User, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: '/chat', icon: MessageSquare, label: 'Chat' },
  { to: '/feed', icon: Video, label: 'Feed' },
  { to: '/games', icon: Gamepad2, label: 'Games' },
  { to: '/news', icon: Newspaper, label: 'News' },
  { to: '/ai', icon: Bot, label: 'AI' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export const Layout = ({ children }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Desktop Left Navigation */}
      <nav className="hidden md:flex w-64 bg-card border-r border-border flex-col p-4 gap-2">
        <div className="mb-8 flex items-center gap-2 px-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">TN</span>
          </div>
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TruNanymous
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
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="mt-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-full"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">TN</span>
          </div>
          <div className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TruNanymous
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-16">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all',
                    'hover:bg-muted',
                    isActive && 'bg-primary/10 text-primary font-medium'
                  )
                }
              >
                <item.icon className="w-6 h-6 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden md:pt-0 pt-16 pb-16 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-2 py-2 flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all',
                isActive && 'text-primary'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
