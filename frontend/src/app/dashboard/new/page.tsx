'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog } from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';
import { Loader2, ArrowLeft, Send, Save, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'; // Assuming shadcn switch
import { cn } from '@/lib/utils';

export default function NewBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => { if (!isLoggedIn()) router.push('/login'); }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true); 
    setError('');
    try {
      await createBlog({ title, content, isPublished });
      router.push('/dashboard');
    } catch { 
      setError('The ink dried up. Failed to save your story.'); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-12 pb-32 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between mb-16">
        <button 
          onClick={() => router.push('/dashboard')} 
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="p-2 rounded-full border border-border group-hover:bg-secondary transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
        </button>

        <div className="flex items-center gap-4">
          <span className={cn(
            "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all",
            isPublished ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground border-transparent"
          )}>
            {isPublished ? 'Public' : 'Draft'}
          </span>
        </div>
      </nav>

      {/* Editor Content */}
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-4">
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
            minLength={3}
            placeholder="Untitled Story"
            className="w-full bg-transparent border-none p-0 font-serif text-5xl md:text-6xl font-black tracking-tighter placeholder:text-muted-foreground/30 focus:ring-0 selection:bg-primary/20"
          />
          <div className="h-1 w-20 bg-primary/40 rounded-full" />
        </div>

        <textarea 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          required 
          minLength={10}
          placeholder="Begin your narrative..."
          className="w-full min-h-[400px] bg-transparent border-none p-0 font-sans text-xl leading-relaxed placeholder:text-muted-foreground/30 focus:ring-0 resize-none selection:bg-primary/20"
        />

        {/* Floating Action Tray */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl">
          <div className="bg-card/80 backdrop-blur-xl border border-border p-4 rounded-[var(--radius)] shadow-2xl flex items-center justify-between gap-6">
            
            <div className="flex items-center gap-6 px-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setIsPublished(!isPublished)}>
                  {isPublished ? <Globe size={14} className="text-primary" /> : <Lock size={14} className="text-muted-foreground" />}
                  <span className="text-xs font-bold">{isPublished ? 'Publish Live' : 'Keep Private'}</span>
                </div>
                <p className="text-[10px] text-muted-foreground hidden sm:block">Visibility status</p>
              </div>
              
              <div 
                className={cn(
                  "relative w-10 h-5 rounded-full cursor-pointer transition-colors",
                  isPublished ? "bg-primary" : "bg-muted"
                )}
                onClick={() => setIsPublished(!isPublished)}
              >
                <div className={cn(
                  "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                  isPublished ? "left-6" : "left-1"
                )} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {error && <span className="text-xs text-destructive font-medium animate-pulse hidden md:block">{error}</span>}
              <Button 
                type="submit" 
                disabled={loading}
                className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 h-11 font-black uppercase text-[11px] tracking-widest shadow-xl transition-all active:scale-95"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    {isPublished ? <Send size={14} /> : <Save size={14} />}
                    {isPublished ? 'Publish' : 'Save Draft'}
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}