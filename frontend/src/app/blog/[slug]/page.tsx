'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBlogBySlug, getComments, addComment } from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';
import LikeButton from '@/components/LikeButton';
import CommentItem from '@/components/CommentItem';

export default function BlogPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [blog, setBlog] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    if (!slug) return;

    const load = async () => {
      setLoading(true);
      try {
        const blogRes = await getBlogBySlug(slug);
        const blogData = blogRes.data;
        setBlog(blogData);

        const commentsRes = await getComments(blogData.id);
        setComments(commentsRes.data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !blog) return;
    if (!isLoggedIn()) {
      window.location.href = '/login';
      return;
    }

    setSubmitting(true);
    setCommentError('');

    const temp = {
      id: `temp-${Date.now()}`,
      content: comment,
      createdAt: new Date().toISOString(),
      user: { email: localStorage.getItem('email') || 'you@example.com' },
    };

    setComments(prev => [temp, ...prev]);
    setComment('');

    try {
      const res = await addComment(blog.id, temp.content);
      setComments(prev => prev.map(c => c.id === temp.id ? res.data : c));
    } catch {
      setComments(prev => prev.filter(c => c.id !== temp.id));
      setComment(temp.content);
      setCommentError('Failed to post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800" />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="text-center py-32">
        <p className="text-5xl mb-4">📄</p>
        <h2 className="text-2xl font-semibold mb-2">Blog not found</h2>
        <p className="text-neutral-500 mb-6">
          This story may have been unpublished or doesn't exist.
        </p>
        <button
          onClick={() => router.push('/feed')}
          className="px-6 py-2 rounded-lg bg-black text-white hover:bg-neutral-800 transition"
        >
          ← Back to Feed
        </button>
      </div>
    );
  }

  const authorName = blog.user.email.split('@')[0];
  const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const readTime = Math.ceil(blog.content.split(' ').length / 200);

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="text-sm text-neutral-500 hover:text-black mb-10 transition"
      >
        ← Back
      </button>

      {/* Header */}
      <header className="mb-14 border-b pb-8">

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between bg-white border rounded-xl p-5 shadow-sm">

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-neutral-200 flex items-center justify-center font-semibold text-neutral-700">
              {authorName[0].toUpperCase()}
            </div>

            <div>
              <p className="font-medium text-neutral-900">{authorName}</p>
              <p className="text-sm text-neutral-500">
                {date} · {readTime} min read
              </p>
            </div>
          </div>

          <LikeButton blogId={blog.id} initialLikes={blog._count.likes} />
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-neutral max-w-none mb-20">
        {blog.content}
      </div>

      {/* Comments */}
      <section className="border-t pt-14">

        <h2 className="text-2xl font-semibold mb-8">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h2>

        {isLoggedIn() ? (
          <form onSubmit={handleComment} className="mb-10">

            <div className="border rounded-xl bg-white overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-neutral-300 transition">

              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full p-4 resize-none outline-none text-sm"
              />

              <div className="flex items-center justify-between px-4 py-3 border-t bg-neutral-50">

                <span className="text-xs text-neutral-500">
                  {comment.length} chars
                </span>

                <button
                  type="submit"
                  disabled={submitting || !comment.trim()}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition
                    ${submitting || !comment.trim()
                      ? 'bg-neutral-300 text-neutral-600 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-neutral-800'
                    }`}
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>

            {commentError && (
              <p className="text-sm text-red-500 mt-2">
                {commentError}
              </p>
            )}
          </form>
        ) : (
          <div className="flex items-center justify-between border rounded-xl p-5 bg-neutral-50 mb-10">
            <p className="text-sm text-neutral-600">
              Sign in to join the conversation
            </p>

            <button
              onClick={() => router.push('/login')}
              className="px-5 py-2 rounded-lg bg-black text-white hover:bg-neutral-800 transition text-sm"
            >
              Login
            </button>
          </div>
        )}

        {comments.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            <p className="text-3xl mb-3">💬</p>
            <p>No comments yet. Be the first!</p>
          </div>
        ) : (
          comments.map(c => <CommentItem key={c.id} {...c} />)
        )}

      </section>
    </article>
  );
}