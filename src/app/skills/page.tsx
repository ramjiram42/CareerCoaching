'use client'
import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, Zap, Target, BookOpen, BarChart3, AlertTriangle, CheckCircle, ArrowRight, ChevronRight, Star, Sparkles, Shield, Compass, Award } from 'lucide-react'
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

// ─── Skills Data ─────────────────────────────────────────
const SKILL_PORTFOLIO = [
  { name: 'Team Leadership',          score: 90, category: 'Operations',  demand: 'High',   market: 92, trend: 'stable',   owned: true },
  { name: 'High-Volume Operations',   score: 88, category: 'Operations',  demand: 'High',   market: 85, trend: 'stable',   owned: true },
  { name: 'Customer Experience',      score: 82, category: 'CX',          demand: 'High',   market: 88, trend: 'growing',  owned: true },
  { name: 'Process Management',       score: 78, category: 'Operations',  demand: 'Medium', market: 80, trend: 'stable',   owned: true },
  { name: 'Performance Coaching',     score: 74, category: 'Leadership',  demand: 'High',   market: 85, trend: 'growing',  owned: true },
  { name: 'Stakeholder Communication',score: 72, category: 'Leadership',  demand: 'High',   market: 87, trend: 'growing',  owned: true },
  { name: 'Data Analysis',            score: 55, category: 'Analytics',   demand: 'Very High', market: 93, trend: 'growing', owned: false },
  { name: 'Enterprise Reporting',     score: 38, category: 'Analytics',   demand: 'Medium', market: 78, trend: 'stable',   owned: false },
  { name: 'Budget Management',        score: 24, category: 'Finance',     demand: 'High',   market: 88, trend: 'stable',   owned: false },
  { name: 'P&L Ownership',            score: 12, category: 'Finance',     demand: 'Very High', market: 91, trend: 'growing', owned: false },
  { name: 'Fleet Systems (inTouched)',score: 15, category: 'Fleet Tech',  demand: 'High',   market: 82, trend: 'growing',  owned: false },
]

const EMERGING_SKILLS = [
  { name: 'AI-Assisted Fleet Operations',  growth: '+340%', signal: 'Internal + Market', priority: 'Critical', color: '#EF4444' },
  { name: 'Workforce Analytics',           growth: '+185%', signal: 'Internal adoption', priority: 'High',     color: '#F59E0B' },
  { name: 'Digital Customer Journeys',     growth: '+120%', signal: 'Market trend',      priority: 'High',     color: '#F59E0B' },
]

const UPSKILLING_PATHS = [
  {
    skill: 'P&L & Budget Ownership',
    urgency: 'High',
    actions: [
      { type: 'Course',      label: 'Finance for Operations Managers',     duration: '3 weeks', link: '/learn' },
      { type: 'Gig',         label: 'Financial Reporting Analyst Q2',      duration: '4 weeks', link: '/gigs' },
      { type: 'Mentor',      label: 'Session with Alice Johnson on P&L',    duration: '2 sessions', link: '/mentorship' },
    ]
  },
]

const TABS = ['portfolio', 'gaps', 'benchmarking', 'emerging', 'upskilling'] as const
type Tab = typeof TABS[number]

export default function SkillsPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>('portfolio')
  const [category, setCategory] = useState('All')

  const tabLabels: Record<Tab, string> = {
    portfolio: t('SKILL_PORTFOLIO'),
    gaps: 'Gap Resolver',
    benchmarking: 'Benchmarking',
    emerging: 'Emerging Radar',
    upskilling: 'Upskilling Plan',
  }

  const filtered = category === 'All' ? SKILL_PORTFOLIO : SKILL_PORTFOLIO.filter(s => s.category === category)
  const owned = filtered.filter(s => s.owned)
  const gaps = filtered.filter(s => !s.owned)

  return (
    <main style={{ 
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 40%, #EDE9FE 100%)', 
      minHeight: '100vh', 
      paddingBottom: '8rem',
      }}>
      {/* Premium Fading Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #4C1D95 0%, #5B21B6 100%)', 
        padding: '120px 0 180px', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.4 }}></div>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 450, height: 450, background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', borderRadius: '50%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
             <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#A78BFA', boxShadow: '0 0 20px rgba(167, 139, 250, 0.6)' }} />
             <p style={{ color: '#A78BFA', fontSize: 13, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>Human Capital Intelligence</p>
          </div>
          <h1 style={{ color: '#fff', fontSize: 84, fontWeight: 1000, letterSpacing: '-0.05em', margin: '0 0 16px', lineHeight: 0.85 }}>
            {t('SKILLS')} <br /> <span style={{ background: 'linear-gradient(90deg, #A78BFA, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Portfolio</span>
          </h1>
          <p style={{ color: '#DDD6FE', fontSize: 22, maxWidth: 650, fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.5, opacity: 0.8 }}>Calibrate your technical arsenal. Deep analysis of your current capabilities against global Hertz benchmarks.</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: -100, position: 'relative', zIndex: 10 }}>
        {/* Navigation & Tabs */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.9)', 
          backdropFilter: 'blur(20px)',
          borderRadius: 32, 
          padding: '12px 24px', 
          boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)', 
          border: '1px solid rgba(255,255,255,0.5)',
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          marginBottom: 60
        }}>
           {TABS.map(t_id => (
             <button 
              key={t_id} 
              onClick={() => setTab(t_id)} 
              style={{ 
                padding: '16px 32px', 
                borderRadius: 18, 
                border: 'none', 
                background: tab === t_id ? '#4C1D95' : 'transparent', 
                color: tab === t_id ? '#fff' : '#64748B', 
                fontWeight: 1000, 
                fontSize: 13, 
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
             >
                {tabLabels[t_id].toUpperCase()}
             </button>
           ))}
        </div>

        {/* Content Section */}
        <div style={{ 
          background: 'rgba(255,255,255,0.8)', 
          backdropFilter: 'blur(20px)',
          borderRadius: 44, 
          padding: 60, 
          boxShadow: '0 50px 100px -20px rgba(0,0,0,0.08)', 
          border: '1px solid rgba(255,255,255,0.5)' 
        }}>
           {tab === 'portfolio' && (
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
                {/* Owned Skills */}
                <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
                      <CheckCircle size={28} color="#10B981" />
                      <h2 style={{ fontSize: 32, fontWeight: 1000, color: '#1E293B', margin: 0 }}>{t('VALIDATED_MASTERY')}</h2>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                      {owned.map(s => (
                        <div key={s.name} className="skill-row-premium">
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                              <span style={{ fontWeight: 1000, fontSize: 18, color: '#1E293B' }}>{s.name}</span>
                              <span style={{ fontWeight: 1000, color: '#4C1D95' }}>{s.score}%</span>
                           </div>
                           <div style={{ height: 10, background: '#F1F5F9', borderRadius: 5, overflow: 'hidden' }}>
                              <div style={{ width: `${s.score}%`, height: '100%', background: 'linear-gradient(90deg, #A78BFA, #4C1D95)', borderRadius: 5 }} />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Gap Skills */}
                <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
                      <AlertTriangle size={28} color="#F59E0B" />
                      <h2 style={{ fontSize: 32, fontWeight: 1000, color: '#1E293B', margin: 0 }}>{t('STRATEGIC_GAPS')}</h2>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                      {gaps.map(s => (
                        <div key={s.name} className="skill-row-premium">
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                              <span style={{ fontWeight: 1000, fontSize: 18, color: '#64748B' }}>{s.name}</span>
                              <span style={{ fontWeight: 1000, color: '#F59E0B' }}>{s.score}%</span>
                           </div>
                           <div style={{ height: 10, background: '#FFF7ED', borderRadius: 5, overflow: 'hidden' }}>
                              <div style={{ width: `${s.score}%`, height: '100%', background: 'linear-gradient(90deg, #FDBA74, #F59E0B)', borderRadius: 5 }} />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {tab !== 'portfolio' && (
             <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <Sparkles size={64} color="#A78BFA" style={{ marginBottom: 24 }} />
                <h2 style={{ fontSize: 32, fontWeight: 1000, color: '#1E293B', marginBottom: 16 }}>{t('INTELLIGENCE_LOADING')}</h2>
                <p style={{ color: '#64748B', fontSize: 18, fontWeight: 600 }}>{t('CLOSING_LOOP')}</p>
             </div>
           )}
        </div>
      </div>

      <style>{`
        .skill-row-premium:hover { transform: translateX(10px); }
        .skill-row-premium { transition: all 0.3s ease; }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
      `}</style>
    </main>
  )
}
