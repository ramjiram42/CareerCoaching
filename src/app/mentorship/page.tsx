'use client';

import { useState } from 'react';
import { Star, Calendar, MessageCircle, Award, Search, Filter, ChevronRight, Zap, Target, Cpu, Globe, Users, Sparkles, MapPin, Shield, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const DOMAINS = [
  'Learning & Development', 'Operations', 'IT Career Path', 'Incentive Compensation'
];

const MENTORS = [
  { id: 'm1', name: 'Megan Grose', expertiseArea: 'Sr Mgr Learning Projects', domain: 'Learning & Development', location: 'Cleveland, OH', avatar: '/mentors/megan.png', rating: 4.9, yearsExperience: 12, sessionsDone: 85 },
  { id: 'm2', name: 'Rayanna Hansford', expertiseArea: 'GM Customer Ops', domain: 'Operations', location: 'Cincinnati, OH', avatar: '/mentors/rayanna.png', rating: 5.0, yearsExperience: 15, sessionsDone: 120 },
  { id: 'm3', name: 'Brian Jones', expertiseArea: 'Sr Mgr Customer Ops', domain: 'Operations', location: 'Nashville, TN', avatar: '/mentors/brian.png', rating: 4.8, yearsExperience: 14, sessionsDone: 95 },
  { id: 'm4', name: 'Shanu Kommula', expertiseArea: 'Dir Technology', domain: 'IT Career Path', location: 'Denver, CO', avatar: '/mentors/shanu.png', rating: 4.9, yearsExperience: 18, sessionsDone: 150 },
  { id: 'm5', name: 'Esther Mcwherter', expertiseArea: 'Mgr Customer Ops', domain: 'Operations', location: 'Burbank, CA', avatar: '/mentors/esther.png', rating: 4.9, yearsExperience: 20, sessionsDone: 200 },
  { id: 'm6', name: 'Zoraya Sander', expertiseArea: 'Mgr VAS Sales', domain: 'Operations', location: 'Orlando, FL', avatar: '/mentors/zoraya.png', rating: 4.8, yearsExperience: 11, sessionsDone: 65 },
  { id: 'm7', name: 'Bryan Vachereau', expertiseArea: 'GM Customer Ops', domain: 'Operations', location: 'Burlington, VT', avatar: '/mentors/bryan.png', rating: 4.7, yearsExperience: 13, sessionsDone: 45 },
  { id: 'm8', name: 'Nicholas Vanaman', expertiseArea: 'Mgr Incentive Comp', domain: 'Incentive Compensation', location: 'Estero, FL', avatar: '/mentors/nicholas.png', rating: 4.9, yearsExperience: 16, sessionsDone: 110 }
];

export default function MentorshipPage() {
  const [activeDomain, setActiveDomain] = useState('All');
  const [search, setSearch] = useState('');

  const filteredMentors = MENTORS.filter(m => 
    (activeDomain === 'All' || m.domain === activeDomain) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.expertiseArea.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      
      {/* 1. Hero Banner */}
      <div style={{ width: '100%', height: 260, position: 'relative', overflow: 'hidden' }}>
         <Image 
           src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&h=400&fit=crop" 
           alt="Team Collaboration" 
           fill 
           style={{ objectFit: 'cover' }}
         />
         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, transparent 80%)' }} />
         <div style={{ position: 'relative', zIndex: 1, padding: '60px 100px' }}>
            <p style={{ fontSize: 12, fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>Human Intelligence Network</p>
            <h1 style={{ fontSize: 42, fontWeight: 950, color: '#fff', margin: 0, lineHeight: 1.1 }}>CAREER<br />MENTORSHIP.</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 12, maxWidth: 600 }}>Connect with seasoned leaders who have mastered the paths you aspire to take.</p>
         </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Navigation & Search Bar */}
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
              {['All', ...DOMAINS.slice(0, 5)].map(domain => (
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
                  {domain.toUpperCase()}
                </button>
              ))}
           </div>
           
           <div style={{ position: 'relative', width: 340 }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                placeholder="Search mentors by name or expertise..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '12px 20px 12px 48px', borderRadius: 14, border: '1px solid #e2e8f0', fontSize: 13, background: '#f8fafc', fontWeight: 600 }} 
              />
           </div>
        </div>

        {/* Mentor Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30, paddingBottom: 100 }}>
           {filteredMentors.map(mentor => (
              <motion.div 
                key={mentor.id} 
                whileHover={{ y: -10 }}
                style={{ 
                  background: '#fff', 
                  borderRadius: 24, 
                  padding: '24px', 
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                 <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #f59e0b, #ec4899)' }} />

                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div style={{ position: 'relative' }}>
                       <div style={{ width: 60, height: 60, borderRadius: 16, overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 8px 15px rgba(0,0,0,0.1)' }}>
                          <Image src={mentor.avatar} width={60} height={60} alt={mentor.name} style={{ objectFit: 'cover' }} unoptimized />
                       </div>
                    </div>
                 </div>

                 <div style={{ marginBottom: 16 }}>
                    <h3 style={{ fontWeight: 900, fontSize: 16, color: '#111827', margin: '0 0 2px' }}>{mentor.name}</h3>
                    <p style={{ color: '#f59e0b', fontWeight: 900, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{mentor.domain}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                      <MapPin size={10} color="#94a3b8" />
                      <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>{mentor.location}</span>
                    </div>
                 </div>

                 <div style={{ flex: 1, marginBottom: 20 }}>
                    <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>{mentor.expertiseArea}</p>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                    <div style={{ background: '#f8fafc', padding: '8px', borderRadius: 12, textAlign: 'center' }}>
                       <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Exp</div>
                       <div style={{ fontSize: 12, fontWeight: 900, color: '#1e293b' }}>{mentor.yearsExperience}Y</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '8px', borderRadius: 12, textAlign: 'center' }}>
                       <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase' }}>Sessions</div>
                       <div style={{ fontSize: 12, fontWeight: 900, color: '#1e293b' }}>{mentor.sessionsDone}+</div>
                    </div>
                 </div>

                 <div style={{ display: 'flex', gap: 10 }}>
                    <a href="https://teams.microsoft.com/" target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '10px', borderRadius: 12, background: 'linear-gradient(90deg, #f59e0b, #ec4899)', color: '#fff', fontSize: 11, fontWeight: 900, letterSpacing: '0.05em', cursor: 'pointer', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', 'Inter', sans-serif" }}>CHAT NOW</a>
                    <button style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><MessageCircle size={16} /></button>
                 </div>
              </motion.div>
           ))}
        </div>
      </div>
    </main>
  );
}
