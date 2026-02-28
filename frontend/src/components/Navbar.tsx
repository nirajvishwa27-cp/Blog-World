'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Rss, User } from 'lucide-react';

export default function Navbar() {
  const { isLoggedIn, email, logout } = useAuth();
  const userInitial = email ? email[0].toUpperCase() : '?';

  return (
    <nav className="sticky top-0 z-[100] bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand - Serif & Elegant */}
        <Link href="/feed" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-serif italic font-bold text-lg shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
            B
          </div>
          <span className="font-serif text-xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors">
            BlogWorld
          </span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-1 md:gap-4">
          <Link href="/feed">
            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/5 hover:text-primary transition-all">
              <Rss className="w-3.5 h-3.5 mr-2 opacity-50" />
              Feed
            </Button>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-2 md:gap-4 pl-2 border-l border-border/60 ml-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/5">
                  <LayoutDashboard className="w-3.5 h-3.5 mr-2 opacity-50" />
                  Studio
                </Button>
              </Link>

              {/* User Identity Chip */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border/40 shadow-inner">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">
                  {userInitial}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground max-w-[100px] truncate">
                  {email?.split('@')[0]}
                </span>
              </div>

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-destructive hover:text-destructive hover:bg-destructive/5 px-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary text-white rounded-full px-6 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  Join
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}