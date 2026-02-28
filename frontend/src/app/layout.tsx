import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'BlogWorld — Where Ideas Live',
  description: 'A modern publishing platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}