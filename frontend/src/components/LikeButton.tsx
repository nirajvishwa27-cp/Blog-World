'use client';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { likeBlog, unlikeBlog } from '@/lib/api';
import { isLoggedIn } from '@/lib/auth';

export default function LikeButton({ blogId, initialLikes }: { blogId: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!isLoggedIn()) { window.location.href = '/login'; return; }
    setLoading(true);
    try {
      if (liked) {
        const res = await unlikeBlog(blogId);
        setLikes(res.data.likes); setLiked(false);
      } else {
        const res = await likeBlog(blogId);
        setLikes(res.data.likes); setLiked(true);
      }
    } finally { setLoading(false); }
  };

  return (
    <button onClick={handle} disabled={loading} style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      background: liked ? 'var(--accent)' : 'transparent',
      border: `1px solid ${liked ? 'var(--accent)' : 'var(--border)'}`,
      color: liked ? 'var(--bg)' : 'var(--muted)',
      padding: '8px 20px', borderRadius: '4px', cursor: 'pointer',
      fontSize: '14px', transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
    }}>
      <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
      {likes} {likes === 1 ? 'Like' : 'Likes'}
    </button>
  );
}