'use client';
import { CheckCircle, Clock, BookOpen, Star, User, TrendingUp, Sparkles, Target, Zap, Shield, Compass, Award } from 'lucide-react'
import Link from 'next/link'
import { ReadinessChart } from './RechartsClient'
import React from 'react';

// Static mock data
const MODULES = [
  { id: '1', title: 'P&L Fundamentals for Operations Managers',        description: 'Revenue, cost centres, and margin analysis.',    estimatedHours: 12, orderIndex: 0, status: 'COMPLETED' },
  { id: '2', title: 'Fleet Systems & inTouched Platform',              description: 'Hands-on mastery of Hertz fleet management tools.', estimatedHours: 8,  orderIndex: 1, status: 'IN_PROGRESS' },
  { id: '3', title: 'Regional Leadership & Stakeholder Management',    description: 'Leading distributed teams and executive comms.',  estimatedHours: 10, orderIndex: 2, status: 'NOT_STARTED' },
]

export default function DashboardPage() {
  const learningScore = 25
  const readinessScore = 73

  return (
    <main style={{ 
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 40%, #EFF6FF 100%)', 
      minHeight: '100vh', 
      paddingBottom: '8rem',
      fontFamily: "'Outfit', 'Inter', sans-serif"
    }}>
      {/* Premium Fading Header */}
      <div style={{ 
        backgroundImage: 'url("/hero-banner.png")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '120px 0 180px', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Blue Overlay to keep text readable */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.85) 0%, rgba(29, 78, 216, 0.7) 100%)',
          zIndex: 1
        }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.4, zIndex: 2 }}></div>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 450, height: 450, background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)', borderRadius: '50%', zIndex: 2 }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
             <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                   <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)' }} />
                   <p style={{ color: '#F59E0B', fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>Strategic Talent Dashboard</p>
                </div>
                <h1 style={{ color: '#fff', fontSize: 84, fontWeight: 1000, letterSpacing: '-0.05em', margin: '0 0 16px', lineHeight: 0.85 }}>
                   Welcome <br /> <span style={{ background: 'linear-gradient(90deg, #F59E0B, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>John Smith</span>
                </h1>
                <p style={{ color: '#BFDBFE', fontSize: 22, maxWidth: 650, fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.5, opacity: 0.8 }}>Customer Service Rep · Hertz Global operations analysis and path calibration.</p>
             </div>
             <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 96, fontWeight: 1000, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1 }}>{readinessScore}%</div>
                <p style={{ fontSize: 13, fontWeight: 950, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Current Readiness</p>
             </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: -100, position: 'relative', zIndex: 10 }}>
         {/* Stats Row */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginBottom: 60 }}>
            {[
              { label: 'Learning Velocity', val: '24%', icon: <BookOpen />, color: '#3B82F6' },
              { label: 'Network Sync', val: '88%', icon: <Users size={20} />, color: '#10B981' },
              { label: 'Target Altitude', val: '40k ft', icon: <Compass size={20} />, color: '#F59E0B' },
            ].map((stat, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderRadius: 32, padding: 40, border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 20px 50px rgba(0,0,0,0.04)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${stat.color}11`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.icon}</div>
                    <span style={{ fontSize: 13, fontWeight: 1000, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</span>
                 </div>
                 <p style={{ fontSize: 44, fontWeight: 1000, color: '#1E293B', margin: 0 }}>{stat.val}</p>
              </div>
            ))}
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 40 }}>
            {/* Learning Path */}
            <div style={{ background: '#fff', borderRadius: 44, padding: 60, border: '1px solid #F1F5F9', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.05)' }}>
               <h3 style={{ fontSize: 32, fontWeight: 1000, color: '#1E293B', marginBottom: 48 }}>Active Intelligence Modules</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                  {MODULES.map(mod => (
                    <div key={mod.id} style={{ display: 'flex', gap: 24 }}>
                       <div style={{ marginTop: 6 }}><CheckCircle size={28} color={mod.status === 'COMPLETED' ? '#10B981' : '#E2E8F0'} /></div>
                       <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: 20, fontWeight: 1000, color: '#1E293B', marginBottom: 6 }}>{mod.title}</h4>
                          <p style={{ fontSize: 16, color: '#64748B', fontWeight: 500 }}>{mod.description}</p>
                       </div>
                       <div style={{ background: '#F8FAFC', padding: '10px 20px', borderRadius: 16, border: '1px solid #F1F5F9', height: 'fit-content' }}>
                          <span style={{ fontWeight: 1000, fontSize: 13, color: '#64748B' }}>{mod.estimatedHours}H</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Sidebar Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
               <div style={{ background: '#111827', borderRadius: 44, padding: 48, color: '#fff', boxShadow: '0 40px 90px rgba(0,0,0,0.2)' }}>
                  <h3 style={{ fontSize: 24, fontWeight: 1000, marginBottom: 24, letterSpacing: '-0.02em' }}>Strategic Sync</h3>
                  <div style={{ height: 200, marginBottom: 40 }}>
                     <ReadinessChart learning={40} mentor={10} certs={0} />
                  </div>
                  <Link href="/skills" style={{ display: 'block', background: '#fff', color: '#111827', padding: '18px', borderRadius: 20, textAlign: 'center', fontWeight: 1000, fontSize: 13, textDecoration: 'none', letterSpacing: '0.05em' }}>SKILL INTELLIGENCE</Link>
               </div>

               <div style={{ background: '#FFFBEB', borderRadius: 44, padding: 48, border: '1px solid #FEF3C7' }}>
                  <p style={{ color: '#92400E', fontSize: 12, fontWeight: 1000, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>Next Mentorship Node</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
                     <div style={{ width: 64, height: 64, borderRadius: 20, background: '#F59E0B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Award size={32} />
                     </div>
                     <div>
                        <p style={{ fontSize: 18, fontWeight: 1000, color: '#1E293B', margin: 0 }}>Alice Johnson</p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#92400E', margin: 0 }}>Tomorrow, 10:00 AM</p>
                     </div>
                  </div>
                  <Link href="/mentorship" style={{ display: 'block', padding: '16px', background: '#F59E0B', color: '#fff', borderRadius: 16, textAlign: 'center', fontWeight: 1000, fontSize: 13, textDecoration: 'none' }}>SIMULATE PREP</Link>
               </div>
            </div>
         </div>
      </div>

      <style>{`
        .container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
      `}</style>
    </main>
  )
}

function Users({ size = 24 }: { size?: number }) {
  return <User size={size} />
}
