'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMyBlogs, deleteBlog, updateBlog } from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';
import { 
  Loader2, Plus, Trash2, Eye, EyeOff, 
  Heart, MessageCircle, BarChart3, Clock, MoreHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login'); return; }
    getMyBlogs().then(res => setBlogs(res.data)).finally(() => setLoading(false));
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm('This action cannot be undone. Delete story?')) return;
    await deleteBlog(id);
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const handleToggle = async (id: string, current: boolean) => {
    await updateBlog(id, { isPublished: !current });
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, isPublished: !current } : b));
  };

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  const stats = [
    { label: 'Stories', value: blogs.length, icon: Clock },
    { label: 'Published', value: blogs.filter(b => b.isPublished).length, icon: Eye },
    { label: 'Appreciations', value: blogs.reduce((acc, b) => acc + b._count.likes, 0), icon: Heart },
    { label: 'Responses', value: blogs.reduce((acc, b) => acc + b._count.comments, 0), icon: MessageCircle },
  ];

  return (
    <div className="max-w-6xl mx-auto pt-16 pb-24 px-6 space-y-12">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-2">
          <p className="text-primary text-[11px] font-black uppercase tracking-[0.3em]">Creator Studio</p>
          <h1 className="font-serif text-5xl font-black tracking-tighter">Your Dashboard</h1>
        </div>
        <Button asChild className="rounded-full bg-primary h-12 px-8 shadow-xl shadow-primary/20 transition-transform active:scale-95">
          <Link href="/dashboard/new" className="flex items-center gap-2">
            <Plus size={18} />
            <span className="font-bold tracking-tight">Write New Story</span>
          </Link>
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border p-6 rounded-[var(--radius)] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <stat.icon size={16} className="text-muted-foreground" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-3xl font-serif font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Content List */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2">
          <BarChart3 size={18} className="text-primary" />
          <h2 className="text-sm font-black uppercase tracking-widest">Manage Content</h2>
        </div>

        {blogs.length === 0 ? (
          <div className="border-2 border-dashed border-border rounded-[var(--radius)] py-20 text-center">
            <p className="font-serif text-2xl text-muted-foreground">The ink hasn't flowed yet.</p>
            <Button variant="link" asChild className="mt-2 text-primary">
              <Link href="/dashboard/new">Start your first draft →</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-3">
            {blogs.map(blog => (
              <div key={blog.id} className="group flex items-center justify-between p-4 bg-card border border-border hover:border-primary/50 rounded-[calc(var(--radius)-8px)] transition-all duration-300 shadow-sm">
                
                <div className="flex flex-col min-w-0 pr-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-foreground truncate max-w-[200px] md:max-w-md tracking-tight group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <div className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                      blog.isPublished 
                        ? "bg-primary/5 text-primary border-primary/20" 
                        : "bg-muted text-muted-foreground border-transparent"
                    )}>
                      {blog.isPublished ? 'Live' : 'Draft'}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                    <span className="flex items-center gap-1"><Heart size={12} /> {blog._count.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={12} /> {blog._count.comments}</span>
                    <span className="hidden md:inline">• Created {new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {blog.isPublished && (
                    <Button variant="ghost" size="sm" asChild className="hidden md:flex rounded-full text-xs font-bold uppercase tracking-widest h-9 border border-transparent hover:border-border">
                      <Link href={`/blog/${blog.slug}`}>View</Link>
                    </Button>
                  )}
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handleToggle(blog.id, blog.isPublished)}
                    className="rounded-full text-[10px] font-black uppercase tracking-widest h-9 px-4"
                  >
                    {blog.isPublished ? <><EyeOff size={14} className="mr-2"/> Unpublish</> : <><Eye size={14} className="mr-2"/> Publish</>}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(blog.id)}
                    className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-9 w-9"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}