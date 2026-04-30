'use client';

import { useRouter } from 'next/navigation';
import { Rocket } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  }

  return (
    <main className="container flex items-center justify-center" style={{ minHeight: '80vh' }}>
      <div className="premium-card text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <Rocket className="glow-text mx-auto" size={48} style={{ margin: '0 auto 1.5rem auto' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>Log in to Hertz Career Connections</h2>
        <p style={{ marginBottom: '2rem', fontSize: '0.875rem' }}>Use the demo account to view the MVP.</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            defaultValue="demo@pathforge.com" 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' }} 
            readOnly
          />
          <input 
            type="password" 
            defaultValue="password123" 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' }} 
            readOnly
          />
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
