'use client';

import Link from 'next/link';
import { Heart, MessageCircle, ArrowUpRight, Calendar, UserCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  createdAt: string;
  user: { email: string };
  _count: { likes: number; comments: number };
}

export default function BlogCard({ title, slug, summary, createdAt, user, _count }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block no-underline">
      <article className={cn(
        "relative overflow-hidden p-8 transition-all duration-500 ease-out",
        "bg-card border border-border rounded-[var(--radius)]",
        "hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5",
        "active:scale-[0.99] active:duration-150"
      )}>
        
        {/* Subtle Background Accent on Hover */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex justify-between items-start gap-6">
          <div className="flex-1 space-y-4">
            
            {/* Author & Date Meta */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary border border-border text-[10px] font-black uppercase tracking-widest text-primary">
                <UserCircle2 size={12} />
                {user.email.split('@')[0]}
              </div>
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter flex items-center gap-1">
                <Calendar size={12} className="opacity-50" />
                {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {/* Title & Summary */}
            <div className="space-y-2">
              <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h2>
              {summary && (
                <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2">
                  {summary}
                </p>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-1.5 group/stat">
                <Heart 
                  size={14} 
                  className="text-muted-foreground group-hover/stat:text-destructive transition-colors duration-300" 
                />
                <span className="text-xs font-bold text-muted-foreground group-hover/stat:text-foreground">
                  {_count.likes}
                </span>
              </div>
              <div className="flex items-center gap-1.5 group/stat">
                <MessageCircle 
                  size={14} 
                  className="text-muted-foreground group-hover/stat:text-primary transition-colors duration-300" 
                />
                <span className="text-xs font-bold text-muted-foreground group-hover/stat:text-foreground">
                  {_count.comments}
                </span>
              </div>
            </div>
          </div>

          {/* Action Icon */}
          <div className="flex-shrink-0">
            <div className="p-2 rounded-full bg-secondary border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:rotate-45">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}