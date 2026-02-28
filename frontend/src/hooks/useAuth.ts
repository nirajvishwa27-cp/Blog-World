'use client';
import { useState, useEffect } from 'react';
import { getToken, getEmail, logout as logoutFn, isLoggedIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setToken(getToken());
    setEmail(getEmail());
  }, []);

  const logout = () => {
    logoutFn();
    setToken(null);
    setEmail(null);
    router.push('/login');
  };

  return { token, email, isLoggedIn: !!token, logout };
}