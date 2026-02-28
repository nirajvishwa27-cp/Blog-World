interface CommentItemProps {
  content: string;
  createdAt: string;
  user: { email: string };
}

export default function CommentItem({ content, createdAt, user }: CommentItemProps) {
  return (
    <div className="border-b py-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-medium text-sm text-slate-700">{user.email.split('@')[0]}</span>
        <span className="text-xs text-slate-400">{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <p className="text-slate-600 text-sm">{content}</p>
    </div>
  );
}