export default function CommentItem({ content, createdAt, user }: {
  content: string; createdAt: string; user: { email: string };
}) {
  return (
    <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'var(--surface2)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', color: 'var(--accent)', fontWeight: 600,
        }}>
          {user.email[0].toUpperCase()}
        </div>
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>
          {user.email.split('@')[0]}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
          {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
      <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, paddingLeft: '38px' }}>
        {content}
      </p>
    </div>
  );
}