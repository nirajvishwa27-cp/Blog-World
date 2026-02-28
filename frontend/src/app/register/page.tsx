'use client';
import { useState } from 'react';
import Link from 'next/link';
import { register } from '@/lib/api';
import { setToken, setEmail } from '@/lib/auth';

export default function RegisterPage() {
  const [email, setEmailVal] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await register(email, password);
      setToken(res.data.access_token);
      setEmail(res.data.email);
      await new Promise(resolve => setTimeout(resolve, 50));
      window.location.href = '/dashboard';
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Email already in use or invalid';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Logo */}
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: 'linear-gradient(135deg, var(--primary), #a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 4px 16px rgba(112,51,255,0.3)',
        }}>
          <span style={{ color: 'white', fontSize: '22px', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>B</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px', fontWeight: 700,
          letterSpacing: '-0.03em', marginBottom: '6px',
          color: 'var(--foreground)',
        }}>
          Join BlogWorld
        </h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '14px', marginBottom: '32px' }}>
          Start sharing your stories today
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div>
            <label style={lbl}>Email address</label>
            <input
              type="email" value={email} required
              onChange={e => setEmailVal(e.target.value)}
              placeholder="you@example.com"
              style={inp}
              onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(112,51,255,0.1)'; }}
              onBlur={e =>  { e.target.style.borderColor = 'var(--border)';  e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div>
            <label style={lbl}>Password</label>
            <input
              type="password" value={password} required minLength={6}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              style={inp}
              onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(112,51,255,0.1)'; }}
              onBlur={e =>  { e.target.style.borderColor = 'var(--border)';  e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: '8px',
              background: 'rgba(229,75,79,0.08)',
              border: '1px solid rgba(229,75,79,0.3)',
              fontSize: '13px', color: 'var(--destructive)',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              padding: '12px', borderRadius: '10px',
              background: 'var(--primary)', color: 'white',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px', fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 12px rgba(112,51,255,0.25)',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.15s',
              marginTop: '4px',
            }}
          >
            {loading ? 'Creating account...' : 'Create account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--muted-foreground)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

const lbl: React.CSSProperties = {
  display: 'block', fontSize: '12px', fontWeight: 600,
  color: 'var(--muted-foreground)', marginBottom: '8px',
  letterSpacing: '0.02em', textTransform: 'uppercase',
  fontFamily: 'var(--font-mono)',
};

const inp: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  color: 'var(--foreground)',
  fontSize: '14px', outline: 'none',
  fontFamily: 'var(--font-sans)',
  letterSpacing: 'var(--tracking-normal)',
  transition: 'border-color 0.15s, box-shadow 0.15s',
};