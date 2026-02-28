import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle } from 'lucide-react';

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
    <Link href={`/blog/${slug}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Badge variant="secondary">{user.email.split('@')[0]}</Badge>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </CardHeader>
        <CardContent>
          {summary && <p className="text-slate-600 text-sm line-clamp-2 mb-3">{summary}</p>}
          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" /> {_count.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" /> {_count.comments}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}