'use client';
import { Users, Search, Filter, MessageCircle, UserPlus, Globe, Zap, Sparkles, MapPin, Target, Share2, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const PEERS = [
  { id: 1, name: 'Sarah Chen', role: 'Data Scientist', location: 'London, UK', match: 94, avatar: 'https://i.pravatar.cc/150?u=sarah', skills: ['Python', 'Tableau', 'AWS'] },
  { id: 2, name: 'Marcus Thorne', role: 'Operations Lead', location: 'Chicago, IL', match: 88, avatar: 'https://i.pravatar.cc/150?u=marcus', skills: ['Six Sigma', 'Logistics', 'Teams'] },
  { id: 3, name: 'Elena Rodriguez', role: 'Product Manager', location: 'Madrid, ES', match: 91, avatar: 'https://i.pravatar.cc/150?u=elena', skills: ['Agile', 'Strategy', 'Jira'] },
  { id: 4, name: 'David Okafor', role: 'Strategic Finance', location: 'Lagos, NG', match: 85, avatar: 'https://i.pravatar.cc/150?u=david', skills: ['Financial Modeling', 'Risk', 'Excel'] },
];

export default function NetworkPage() {
  return (
    <main style={{ 
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 40%, #F0FDF4 100%)', 
      minHeight: '100vh', 
      paddingBottom: '8rem',
      }}>
      {/* Premium Fading Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)', 
        padding: '80px 0 140px', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.4 }}></div>
        <div style={{ position: 'absolute', top: -100, left: -100, width: 450, height: 450, background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
             <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)' }} />
             <p style={{ color: '#10B981', fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>Global Talent Pipeline Analysis</p>
          </div>
          <h1 style={{ color: '#fff', fontSize: 84, fontWeight: 1000, letterSpacing: '-0.05em', margin: '0 0 16px', lineHeight: 0.85 }}>
            Professional <br /> <span style={{ background: 'linear-gradient(90deg, #10B981, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Network</span>
          </h1>
          <p style={{ color: '#D1FAE5', fontSize: 22, maxWidth: 650, fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.5, opacity: 0.8 }}>Forge high-impact connections with specialized peers across the global Hertz ecosystem. Synergistic expansion is the key to acceleration.</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: -60, position: 'relative', zIndex: 10 }}>
        {/* Navigation & Search Bar */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.9)', 
          backdropFilter: 'blur(20px)',
          borderRadius: 32, 
          padding: '16px 40px', 
          boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)', 
          border: '1px solid rgba(255,255,255,0.5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32
        }}>
           <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ padding: '12px 24px', borderRadius: 14, border: 'none', background: '#064E3B', color: '#fff', fontWeight: 1000, fontSize: 13, letterSpacing: '0.02em', cursor: 'pointer' }}>ALL CONNECTIONS</button>
              <button style={{ padding: '12px 24px', borderRadius: 14, border: '1px solid #E2E8F0', background: '#fff', color: '#64748B', fontWeight: 950, fontSize: 13, letterSpacing: '0.02em', cursor: 'pointer' }}>DISCOVERY POOL</button>
           </div>
           
           <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 340 }}>
                 <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)' }} />
                 <input placeholder="Search global expertise..." style={{ width: '100%', padding: '16px 20px 16px 52px', borderRadius: 18, border: '1px solid #E2E8F0', outline: 'none', fontWeight: 700, fontSize: 14, background: '#F8FAFC' }} />
              </div>
              <button style={{ padding: '16px', borderRadius: 18, border: '1px solid #E2E8F0', background: '#fff', color: '#64748B', cursor: 'pointer' }}><Filter size={18} /></button>
           </div>
        </div>

        {/* Network Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
           {PEERS.map(peer => (
             <div key={peer.id} className="network-card-premium" style={{ 
               background: '#fff', 
               borderRadius: 40, 
               padding: 40, 
               textAlign: 'center', 
               border: '1px solid rgba(241, 245, 249, 0.8)',
               boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
               transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
               cursor: 'pointer',
               position: 'relative',
               overflow: 'hidden'
             }}>
                <div style={{ position: 'absolute', top: 20, right: 20, color: '#CBD5E1' }}><MoreHorizontal size={20} /></div>
                
                <div style={{ position: 'relative', width: 110, height: 110, margin: '0 auto 24px' }}>
                   <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: `3px solid ${peer.match > 90 ? '#10B981' : '#F59E0B'}`, opacity: 0.2 }} />
                   <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '5px solid #fff', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
                      <Image src={peer.avatar} width={110} height={110} alt={peer.name} unoptimized={true} style={{ objectFit: 'cover' }} />
                   </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                   <h3 style={{ fontWeight: 1000, fontSize: 22, color: '#1E293B', margin: '0 0 6px', letterSpacing: '-0.02em' }}>{peer.name}</h3>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#64748B', fontSize: 13, fontWeight: 700 }}>
                      <Target size={14} color="#94A3B8" /> {peer.role}
                   </div>
                   <p style={{ fontSize: 12, color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <MapPin size={12} /> {peer.location}
                   </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                   {peer.skills.map(skill => (
                      <span key={skill} style={{ background: '#F1F5F9', color: '#475569', fontSize: 10, fontWeight: 900, padding: '4px 10px', borderRadius: 8, letterSpacing: '0.02em' }}>{skill}</span>
                   ))}
                </div>

                <div style={{ background: '#F0FDF4', color: '#10B981', padding: '12px', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, fontWeight: 1000, marginBottom: 28, border: '1px solid #DCFCE7' }}>
                   <Zap size={14} fill="#10B981" /> {peer.match}% ELIGIBILITY SYNC
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                   <button style={{ flex: 1, padding: '16px', borderRadius: 18, border: 'none', background: '#111827', color: '#fff', fontSize: 13, fontWeight: 1000, cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>CONNECT</button>
                   <button style={{ padding: '16px', borderRadius: 18, border: '1px solid #E2E8F0', background: '#fff', color: '#64748B', cursor: 'pointer' }}><MessageCircle size={20} /></button>
                </div>
             </div>
           ))}
        </div>
      </div>

      <style>{`
        .network-card-premium:hover { transform: translateY(-12px); border-color: #10B981; box-shadow: 0 40px 90px -20px rgba(16, 185, 129, 0.15); }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
      `}</style>
    </main>
  );
}
