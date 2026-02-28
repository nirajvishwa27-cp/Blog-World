'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/api';
import { setToken, setEmail } from '@/lib/auth';
import { Loader2, ArrowRight, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    setError('');
    try {
      const res = await login(email, password);
      setToken(res.data.access_token);
      setEmail(res.data.email);
      router.push('/dashboard');
    } catch { 
      setError('The credentials provided do not match our records.'); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 animate-in fade-in duration-1000">
      <div className="w-full max-w-[440px] space-y-8">
        
        {/* Branding Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2">
            <Lock size={24} />
          </div>
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">
            Authentication
          </p>
          <h1 className="font-serif text-4xl font-black tracking-tighter">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm font-medium italic">
            Continue your narrative.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border p-8 rounded-[var(--radius)] shadow-2xl shadow-primary/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors" size={16} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmailState(e.target.value)} 
                  required
                  placeholder="name@domain.com"
                  className="w-full bg-secondary/50 border-border rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Password
                </label>
                <Link href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors" size={16} />
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required
                  placeholder="••••••••"
                  className="w-full bg-secondary/50 border-border rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold animate-in shake-in-1">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-black uppercase text-[11px] tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Enter Studio <ArrowRight size={14} />
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-muted-foreground font-sans">
          Don't have a workspace yet?{' '}
          <Link href="/register" className="text-foreground font-bold hover:text-primary transition-colors">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}