'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/lib/api';
import { setToken, setEmail } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await register(email, password);
      setToken(res.data.access_token);
      setEmail(res.data.email);
      router.push('/dashboard');
    } catch { setError('Email already in use or invalid'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: 'var(--accent)', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Join BlogWorld</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: 700 }}>Create account</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmailState(e.target.value)} required
              style={inputStyle} placeholder="you@example.com"
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              style={inputStyle} placeholder="Min 6 characters"
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {error && <p style={{ color: 'var(--danger)', fontSize: '13px' }}>{error}</p>}

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--muted)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 16px',
  background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: '6px', color: 'var(--text)', fontSize: '14px',
  outline: 'none', transition: 'border-color 0.2s',
  fontFamily: 'DM Sans, sans-serif',
};

const btnStyle: React.CSSProperties = {
  width: '100%', padding: '13px',
  background: 'var(--accent)', color: 'var(--bg)',
  border: 'none', borderRadius: '6px', cursor: 'pointer',
  fontSize: '14px', fontWeight: 500, marginTop: '8px',
  transition: 'opacity 0.2s', display: 'flex',
  alignItems: 'center', justifyContent: 'center', gap: '8px',
  fontFamily: 'DM Sans, sans-serif',
};