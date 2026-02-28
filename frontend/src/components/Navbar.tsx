'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        
        {/* Logo using Primary Color */}
        <Link href="/feed" className="flex items-center gap-2 group transition-transform active:scale-95">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tighter">
            Blog<span className="text-primary">World</span>
          </span>
        </Link>

        {/* Action Buttons using your Radius-xl */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Button 
              variant="outline" 
              onClick={logout}
              className="rounded-xl border-border hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild className="rounded-xl font-medium">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:opacity-90">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}