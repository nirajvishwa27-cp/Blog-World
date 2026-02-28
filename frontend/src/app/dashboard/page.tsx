'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMyBlogs, deleteBlog, updateBlog } from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login'); return; }
    getMyBlogs().then(res => setBlogs(res.data)).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog?')) return;
    await deleteBlog(id);
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    await updateBlog(id, { isPublished: !current });
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, isPublished: !current } : b));
  };

  if (loading) return (
    <div className="flex justify-center py-16">
      <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Dashboard</h1>
          <p className="text-slate-500 mt-1">{blogs.length} blog{blogs.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/dashboard/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Blog
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-xl">No blogs yet</p>
          <Link href="/dashboard/new">
            <Button className="mt-4">Create your first blog</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map(blog => (
            <Card key={blog.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{blog.title}</CardTitle>
                  <Badge variant={blog.isPublished ? 'default' : 'secondary'}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500">
                  {new Date(blog.createdAt).toLocaleDateString()} •{' '}
                  {blog._count.likes} likes • {blog._count.comments} comments
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {blog.isPublished && (
                    <Link href={`/blog/${blog.slug}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  )}
                  <Button variant="outline" size="sm"
                    onClick={() => handleTogglePublish(blog.id, blog.isPublished)}>
                    {blog.isPublished ? (
                      <><EyeOff className="w-4 h-4 mr-1" /> Unpublish</>
                    ) : (
                      <><Eye className="w-4 h-4 mr-1" /> Publish</>
                    )}
                  </Button>
                  <Button variant="destructive" size="sm"
                    onClick={() => handleDelete(blog.id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}