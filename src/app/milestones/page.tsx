'use client';
import { Target, Flag, Award, CheckCircle2, ChevronRight, TrendingUp, Trophy, Star, Sparkles, MapPin, Shield, Zap } from 'lucide-react';
import React from 'react';

const MILESTONES_DATA = [
  { id: 1, title: 'Strategic Operations Phase 1', status: 'Completed', date: 'Oct 2025', desc: 'Mastery of fleet utilization analytics and budget planning.', color: '#10B981', icon: <CheckCircle2 size={22} /> },
  { id: 2, title: 'Leadership Certification', status: 'In Progress', date: 'Expected Dec 2025', desc: 'Advanced management training for Regional Director eligibility.', color: '#3B82F6', icon: <Flag size={22} /> },
  { id: 3, title: 'Digital Transformation Champion', status: 'Upcoming', date: 'Jan 2026', desc: 'Implementation of AI-driven reporting systems in local branch.', color: '#F59E0B', icon: <Target size={22} /> },
];

export default function MilestonesPage() {
  return (
    <main style={{ 
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 40%, #E0F2FE 100%)', 
      minHeight: '100vh', 
      paddingBottom: '8rem',
      fontFamily: "'Outfit', 'Inter', sans-serif"
    }}>
      {/* Premium Fading Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
        padding: '80px 0 140px', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.4 }}></div>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: -50, left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)', borderRadius: '50%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
             <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)' }} />
             <p style={{ color: '#F59E0B', fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>Progress Intelligence Tracking</p>
          </div>
          <h1 style={{ color: '#fff', fontSize: 84, fontWeight: 1000, letterSpacing: '-0.05em', margin: '0 0 16px', lineHeight: 0.85 }}>
            Career <br /> <span style={{ background: 'linear-gradient(90deg, #F59E0B, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Milestones</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 22, maxWidth: 650, fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.5 }}>Visualize your professional evolution. Every milestone reached is a step closer to your final cockpit destination.</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: -60, position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 40 }}>
           
           {/* Timeline Card */}
           <div style={{ 
             background: 'rgba(255, 255, 255, 0.85)', 
             backdropFilter: 'blur(20px)',
             borderRadius: 44, 
             padding: 60, 
             boxShadow: '0 50px 100px -20px rgba(0,0,0,0.08)', 
             border: '1px solid rgba(255,255,255,0.5)' 
           }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)', width: 50, height: 50, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 10px 20px rgba(59,130,246,0.3)' }}><TrendingUp size={24} /></div>
                    <h2 style={{ fontWeight: 1000, fontSize: 32, color: '#1E293B', margin: 0, letterSpacing: '-0.02em' }}>Achievement Timeline</h2>
                 </div>
                 <button className="premium-btn-shimmer" style={{ padding: '14px 28px', borderRadius: 18, border: '1px solid #E2E8F0', background: '#fff', color: '#1E293B', fontWeight: 1000, fontSize: 13, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>AUDIT PROGRESS</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
                 <div style={{ position: 'absolute', left: 42, top: 40, bottom: 40, width: 3, background: 'linear-gradient(180deg, #10B981 0%, #3B82F6 40%, #E2E8F0 100%)', borderRadius: 3 }}></div>
                 
                 {MILESTONES_DATA.map((ms, idx) => (
                   <div key={ms.id} className="milestone-item-row" style={{ display: 'flex', gap: 40, padding: '40px 0', position: 'relative', transition: 'all 0.3s ease' }}>
                      <div style={{ 
                        width: 84, 
                        height: 84, 
                        borderRadius: 24, 
                        background: idx === 0 ? ms.color : '#fff', 
                        border: `3px solid ${idx === 0 ? 'transparent' : '#F1F5F9'}`, 
                        color: idx === 0 ? '#fff' : ms.color, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        zIndex: 2,
                        boxShadow: idx === 0 ? `0 15px 35px ${ms.color}44` : '0 10px 25px rgba(0,0,0,0.03)',
                        flexShrink: 0
                      }}>
                         {ms.icon}
                      </div>
                      <div style={{ flex: 1, padding: '10px 0' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                            <div>
                               <h3 style={{ fontWeight: 1000, fontSize: 24, color: '#1E293B', margin: '0 0 4px' }}>{ms.title}</h3>
                               <p style={{ color: ms.color, fontWeight: 950, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{ms.status}</p>
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 800, color: '#94A3B8', background: '#F8FAFC', padding: '6px 16px', borderRadius: 10 }}>{ms.date}</span>
                         </div>
                         <p style={{ color: '#64748B', fontSize: 17, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{ms.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Metrics Sidebar */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)', 
                borderRadius: 44, 
                padding: 48, 
                border: '1px solid rgba(255,255,255,0.05)', 
                color: '#fff',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                 <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}><Sparkles size={120} color="#F59E0B" /></div>
                 <Trophy size={48} color="#F59E0B" style={{ marginBottom: 30 }} />
                 <h3 style={{ fontWeight: 1000, fontSize: 28, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Current Vector</h3>
                 <p style={{ color: '#94A3B8', fontSize: 17, fontWeight: 600, lineHeight: 1.6, marginBottom: 40 }}>Your profile is currently <strong style={{ color: '#F59E0B' }}>65% synced</strong> with the Regional Operations Director requirements.</p>
                 
                 <div style={{ position: 'relative', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                       <span style={{ fontSize: 13, fontWeight: 1000, color: '#F59E0B', textTransform: 'uppercase' }}>Eligibility Pool</span>
                       <span style={{ fontSize: 13, fontWeight: 1000, color: '#fff' }}>65%</span>
                    </div>
                    <div style={{ height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 5, overflow: 'hidden' }}>
                       <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #F59E0B, #EC4899)', borderRadius: 5, boxShadow: '0 0 15px rgba(245, 158, 11, 0.5)' }}></div>
                    </div>
                 </div>
                 
                 <button style={{ width: '100%', marginTop: 32, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: 16, color: '#fff', fontWeight: 1000, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>Unlock Next Node</button>
              </div>

              <div style={{ 
                background: '#fff', 
                borderRadius: 44, 
                padding: 48, 
                border: '1px solid rgba(226, 232, 240, 0.8)', 
                boxShadow: '0 20px 60px rgba(0,0,0,0.03)' 
              }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                    <h4 style={{ fontWeight: 1000, fontSize: 20, color: '#1E293B', margin: 0 }}>Next Protocol Badge</h4>
                    <div style={{ background: '#E0F2FE', color: '#0369a1', fontSize: 10, fontWeight: 1000, padding: '4px 10px', borderRadius: 8, textTransform: 'uppercase' }}>Pending</div>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 24, background: '#F8FAFC', borderRadius: 24, border: '1px solid #F1F5F9' }}>
                    <div style={{ width: 72, height: 72, borderRadius: 20, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.04)' }}>
                       <Star size={34} color="#CBD5E1" fill="#F1F5F9" />
                    </div>
                    <div>
                       <p style={{ fontWeight: 1000, color: '#1E293B', fontSize: 18, margin: '0 0 4px' }}>System Guru</p>
                       <p style={{ fontSize: 14, color: '#64748B', fontWeight: 600, margin: 0 }}>Complete 3 shadow sessions</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>

      <style>{`
        .milestone-item-row:hover { transform: translateX(10px); }
        .premium-btn-shimmer:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .container { max-width: 1300px; margin: 0 auto; padding: 0 40px; }
      `}</style>
    </main>
  );
}
