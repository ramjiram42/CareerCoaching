'use client';

import { useState } from 'react';
import { Calendar, Search, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const DOMAINS = [
  'Learning & Development', 'Operations', 'Technology', 'Incentive Compensation'
];

const MENTORS = [
  { id: 'm1', name: 'Megan Grose',       expertiseArea: 'Sr Manager Learning Projects',  domain: 'Learning & Development',  location: 'Cleveland, OH',  avatar: '/mentors/megan.png',    rating: 4.9, yearsExperience: 12, sessionsDone: 85  },
  { id: 'm2', name: 'Rayanna Hansford',  expertiseArea: 'GM Customer Ops',               domain: 'Operations',               location: 'Cincinnati, OH', avatar: '/mentors/rayanna.png',  rating: 5.0, yearsExperience: 15, sessionsDone: 120 },
  { id: 'm3', name: 'Brian Jones',       expertiseArea: 'Sr Manager Customer Ops',       domain: 'Operations',               location: 'Nashville, TN',  avatar: '/mentors/brian.png',    rating: 4.8, yearsExperience: 14, sessionsDone: 95  },
  { id: 'm4', name: 'Shanu Kommula',     expertiseArea: 'Director Technology',           domain: 'Technology',               location: 'Denver, CO',     avatar: '/mentors/shanu.png',    rating: 4.9, yearsExperience: 18, sessionsDone: 150 },
  { id: 'm5', name: 'Esther Mcwherter', expertiseArea: 'Manager Customer Ops',          domain: 'Operations',               location: 'Burbank, CA',    avatar: '/mentors/esther.png',   rating: 4.9, yearsExperience: 20, sessionsDone: 200 },
  { id: 'm6', name: 'Zoraya Sander',    expertiseArea: 'Manager VAS Sales',             domain: 'Operations',               location: 'Orlando, FL',    avatar: '/mentors/zoraya.png',   rating: 4.8, yearsExperience: 11, sessionsDone: 65  },
  { id: 'm7', name: 'Bryan Vachereau',  expertiseArea: 'GM Customer Ops',               domain: 'Operations',               location: 'Burlington, VT', avatar: '/mentors/bryan.png',    rating: 4.7, yearsExperience: 13, sessionsDone: 45  },
  { id: 'm8', name: 'Nicholas Vanaman', expertiseArea: 'Manager Incentive Compensation', domain: 'Incentive Compensation',  location: 'Estero, FL',     avatar: '/mentors/nicholas.png', rating: 4.9, yearsExperience: 16, sessionsDone: 110 },
];

export default function MentorshipPage() {
  const { t } = useLanguage();
  const [activeDomain, setActiveDomain] = useState('All');
  const [search, setSearch] = useState('');

  const filteredMentors = MENTORS.filter(m =>
    (activeDomain === 'All' || m.domain === activeDomain) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.expertiseArea.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main style={{ background: '#fff', minHeight: '100vh', }}>

      {/* Hero Banner */}
      <div style={{ width: '100%', height: 260, position: 'relative', overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=400&fit=crop"
          alt="Team Collaboration"
          fill
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, transparent 80%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '60px 100px' }}>
          <p style={{ fontSize: 12, fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>{t('HUMAN_INTELLIGENCE_NETWORK')}</p>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: '#fff', margin: 0, lineHeight: 1.1, whiteSpace: 'pre-line' }}>{t('CAREER_MENTORSHIP_TITLE')}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 12, maxWidth: 600 }}>{t('MENTORSHIP_HERO_DESC')}</p>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 20px' }}>

        {/* Filter + Search Bar */}
        <div style={{
          background: '#fff',
          borderRadius: 24,
          padding: '12px 30px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 50,
          border: '1px solid #f1f5f9',
          marginTop: -50,
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['All', ...DOMAINS].map(domain => (
              <button
                key={domain}
                onClick={() => setActiveDomain(domain)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 14,
                  border: 'none',
                  background: activeDomain === domain ? 'linear-gradient(90deg, #f59e0b, #ec4899)' : '#f8fafc',
                  color: activeDomain === domain ? '#fff' : '#64748b',
                  fontWeight: 900,
                  fontSize: 11,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: activeDomain === domain ? '0 4px 15px rgba(236, 72, 153, 0.2)' : 'none'
                }}
              >
                {t(domain.toUpperCase())}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: 340 }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              placeholder={t('SEARCH_MENTORS_PLACEHOLDER')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 20px 12px 48px', borderRadius: 14, border: '1px solid #e2e8f0', fontSize: 13, background: '#f8fafc', fontWeight: 600 }}
            />
          </div>
        </div>

        {/* Mentor Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, paddingBottom: 100 }}>
          {filteredMentors.map(mentor => (
            <motion.div
              key={mentor.id}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '28px 24px 20px',
                border: '1px solid #e8edf2',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #f59e0b, #ec4899)' }} />

              {/* Avatar + Name */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', border: '3px solid #f1f5f9', position: 'relative', marginBottom: 12, background: '#3a3530' }}>
                  <Image 
                    src={mentor.avatar} 
                    fill 
                    alt={mentor.name} 
                    style={{ 
                      objectFit: 'cover', 
                      objectPosition: 'center 15%',
                      transform: mentor.name === 'Shanu Kommula' ? 'scale(1.15)' : 'none'
                    }} 
                    unoptimized 
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontWeight: 800, fontSize: 15, color: '#0f172a', margin: '0 0 2px' }}>{mentor.name}</h3>
                  <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, margin: 0 }}>{t(mentor.expertiseArea.toUpperCase())}</p>
                </div>
              </div>

              {/* Domain + Location */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: '#f59e0b', background: '#fffbeb', border: '1px solid #fef3c7', padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t(mentor.domain.toUpperCase())}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={11} color="#94a3b8" />
                  <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{mentor.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: 10, padding: '6px 0', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 900, color: '#0f172a' }}>{mentor.yearsExperience}<span style={{ fontSize: 8, fontWeight: 700, color: '#94a3b8' }}>{t('YR')}</span></div>
                  <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('EXPERIENCE')}</div>
                </div>
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: 10, padding: '6px 0', textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 900, color: '#0f172a' }}>{mentor.sessionsDone}<span style={{ fontSize: 8, fontWeight: 700, color: '#94a3b8' }}>+</span></div>
                  <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('SESSIONS')}</div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://teams.microsoft.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '11px', borderRadius: 12,
                  background: 'linear-gradient(90deg, #f59e0b, #ec4899)',
                  color: '#fff', fontSize: 13, fontWeight: 800,
                  textDecoration: 'none', letterSpacing: '0.02em',
                  boxShadow: '0 4px 12px rgba(236,72,153,0.2)',
                  }}
              >
                <Calendar size={14} /> {t('BOOK_A_SESSION')}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
