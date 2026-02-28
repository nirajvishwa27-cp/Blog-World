'use client';
import { useState, useEffect } from 'react';
import { getFeed } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  createdAt: string;
  user: { email: string };
  _count: { likes: number; comments: number };
}

export default function FeedPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async (p: number) => {
    setLoading(true);
    try {
      const res = await getFeed(p);
      setBlogs(res.data.data);
      setTotalPages(res.data.meta.totalPages);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFeed(page); }, [page]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Public Feed</h1>
        <p className="text-slate-500 mt-1">Latest published blogs from the community</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-xl">No blogs published yet</p>
          <p className="text-sm mt-2">Be the first to publish!</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {blogs.map(blog => <BlogCard key={blog.id} {...blog} />)}
          </div>
          <div className="flex justify-center items-center gap-3 mt-8">
            <Button variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              Previous
            </Button>
            <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
            <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}