'use client';

import { useState, useEffect } from 'react';
import { getFeed } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Blog {
  id: string; title: string; slug: string; summary?: string;
  createdAt: string; user: { email: string }; _count: { likes: number; comments: number };
}

export default function FeedPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    getFeed(page).then(res => {
      setBlogs(res.data.data);
      setTotalPages(res.data.meta.totalPages);
      setTotal(res.data.meta.total);
    }).finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto pt-16 pb-24 px-6">
      {/* Editorial Header */}
      <header className="mb-20 border-b border-border pb-12">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-primary" />
          <p className="text-primary text-[11px] font-black uppercase tracking-[0.3em]">
            Public Feed
          </p>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter text-foreground">
          Stories worth<br />
          <span className="text-primary italic font-medium tracking-normal inline-block mt-2">reading.</span>
        </h1>

        {total > 0 && (
          <div className="mt-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              {total} total publications
            </p>
          </div>
        )}
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 size={40} className="animate-spin text-primary/40" />
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Gathering thoughts</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-32 border-2 border-dashed border-border rounded-[var(--radius)]">
          <p className="text-5xl mb-6">✦</p>
          <h2 className="font-serif text-3xl font-bold mb-2">The shelf is empty</h2>
          <p className="text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed">
            There are no stories here yet. Be the pioneer and publish the first one.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6">
            {blogs.map((blog, i) => (
              <div 
                key={blog.id} 
                className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <BlogCard {...blog} />
              </div>
            ))}
          </div>

          {/* Minimalist Pagination */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-between pt-16 border-t border-border mt-12">
              <Button
                variant="ghost"
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1}
                className="rounded-full gap-2 font-bold uppercase text-[11px] tracking-widest px-6"
              >
                <ChevronLeft size={16} /> Prev
              </Button>

              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-border" />
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  {page.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
                </span>
                <span className="h-px w-8 bg-border" />
              </div>

              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-2 font-bold uppercase text-[11px] tracking-widest px-6 py-2 rounded-full hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                Next <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}