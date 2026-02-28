'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBlogBySlug, getComments, addComment } from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';
import LikeButton from '@/components/LikeButton';
import CommentItem from '@/components/CommentItem';
import { Loader2, ArrowLeft, Bookmark, Share2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle Reading Progress
  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const blogRes = await getBlogBySlug(slug as string);
        setBlog(blogRes.data);
        const commentsRes = await getComments(blogRes.data.id);
        setComments(commentsRes.data);
      } catch { setBlog(null); }
      finally { setLoading(false); }
    };
    loadData();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  if (!blog) return <div className="py-20 text-center font-serif text-2xl">Story not found.</div>;

  return (
    <div className="relative min-h-screen bg-background">
      {/* 1. Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-150" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 2. Floating Action Sidebar (Desktop) */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 p-2 border border-border bg-card/50 backdrop-blur-md rounded-full z-50">
        <LikeButton blogId={blog.id} initialLikes={blog._count.likes} />
        <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
          <MessageSquare size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
          <Bookmark size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
          <Share2 size={20} />
        </Button>
      </aside>

      <main className="max-w-3xl mx-auto px-6 pt-16 pb-32">
        {/* Header */}
        <header className="mb-12 space-y-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Feed</span>
          </button>

          <h1 className="font-serif text-5xl md:text-6xl font-black leading-tight tracking-tighter">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-y border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-serif font-bold text-primary border border-primary/20">
              {blog.user.email[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">{blog.user.email.split('@')[0]}</p>
              <p className="text-xs text-muted-foreground font-medium">
                {new Date(blog.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })} • 5 min read
              </p>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <div className="font-sans text-xl leading-relaxed text-foreground/90 whitespace-pre-wrap selection:bg-primary/30">
            {blog.content}
          </div>
        </article>

        {/* Footer Stats (Mobile) */}
        <div className="xl:hidden flex items-center gap-6 mt-16 py-4 border-t border-border">
          <LikeButton blogId={blog.id} initialLikes={blog._count.likes} />
          <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm">
            <MessageSquare size={18} />
            {comments.length} Comments
          </div>
        </div>

        {/* Comments Section */}
        <section id="comments" className="mt-24">
            <h3 className="font-serif text-3xl font-bold mb-10">Responses</h3>
            {/* Reuse your previously styled comment list and form here */}
            {comments.map((c, i) => <CommentItem key={i} {...c} />)}
        </section>
      </main>
    </div>
  );
}