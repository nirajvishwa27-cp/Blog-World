'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog } from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) router.push('/login');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createBlog({ title, content, isPublished });
      router.push('/dashboard');
    } catch {
      setError('Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="My awesome blog post" required minLength={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write your blog content here..."
                rows={12} required minLength={10} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="publish" checked={isPublished}
                onChange={e => setIsPublished(e.target.checked)}
                className="w-4 h-4" />
              <Label htmlFor="publish">Publish immediately</Label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : isPublished ? 'Publish Blog' : 'Save as Draft'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push('/dashboard')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}