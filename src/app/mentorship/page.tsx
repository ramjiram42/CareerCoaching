'use client';

import { useState } from 'react';
import { Star, Calendar, MessageCircle, Award, Search, Filter, ChevronRight, Zap, Target, Cpu, Globe, Users, Sparkles, MapPin, Shield, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const DOMAINS = [
  'Fleet Management', 'Branch Operations', 'Customer Experience', 'Revenue Management', 
  'Vehicle Maintenance', 'EV & Electrification', 'Corporate Strategy', 'Technology & Engineering'
];

const mentorImages = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  'https://images.unsplash.com/photo-1506794778242-aff5640707bf?w=200&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80',
  'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=200&q=80',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80',
  'https://images.unsplash.com/photo-1598550874175-4d0fe4a2c906?w=200&q=80',
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&q=80',
];

const MENTORS = [
  // Core Mentors
  { id: '1', name: 'Alice Johnson', expertiseArea: 'Global Fleet Optimization & Logistics', rating: 4.9, yearsExperience: 18, sessionsDone: 142, domain: 'Fleet Management', avatar: mentorImages[0] },
  { id: '2', name: 'Chris Berg', expertiseArea: 'Regional Branch Operations & Scaling', rating: 4.8, yearsExperience: 22, sessionsDone: 89, domain: 'Branch Operations', avatar: mentorImages[1] },
  { id: '3', name: 'Sandra Lee', expertiseArea: 'Premium Customer Experience Delivery', rating: 4.9, yearsExperience: 15, sessionsDone: 201, domain: 'Customer Experience', avatar: mentorImages[2] },
  { id: '4', name: 'Arjun Mehta', expertiseArea: 'Dynamic Pricing & Revenue Management', rating: 4.9, yearsExperience: 12, sessionsDone: 156, domain: 'Revenue Management', avatar: mentorImages[3] },
  
  // Additional Mentors
  { id: 'in1', name: 'Priya Sharma', expertiseArea: 'Predictive Vehicle Maintenance Strategy', rating: 5.0, yearsExperience: 14, sessionsDone: 110, domain: 'Vehicle Maintenance', avatar: mentorImages[8] },
  { id: 'in2', name: 'Rajesh Gupta', expertiseArea: 'EV Fleet Transition & Infrastructure', rating: 4.9, yearsExperience: 16, sessionsDone: 95, domain: 'EV & Electrification', avatar: mentorImages[9] },
  { id: 'in3', name: 'Ananya Rao', expertiseArea: 'Car Rental Technology Systems', rating: 4.8, yearsExperience: 11, sessionsDone: 68, domain: 'Technology & Engineering', avatar: mentorImages[10] },
  { id: 'in4', name: 'Vikram Singh', expertiseArea: 'Corporate Finance & Expansion', rating: 4.7, yearsExperience: 20, sessionsDone: 130, domain: 'Corporate Strategy', avatar: mentorImages[11] },
  { id: 'in5', name: 'Deepika Iyer', expertiseArea: 'Branch Manager Leadership Training', rating: 4.9, yearsExperience: 15, sessionsDone: 180, domain: 'Branch Operations', avatar: mentorImages[12] },
  { id: 'in6', name: 'Rohan Deshmukh', expertiseArea: 'B2B Corporate Rental Accounts', rating: 4.8, yearsExperience: 12, sessionsDone: 75, domain: 'Customer Experience', avatar: mentorImages[13] },
  { id: 'in7', name: 'Sanjay Reddy', expertiseArea: 'Fleet Acquisition & Disposal', rating: 5.0, yearsExperience: 18, sessionsDone: 120, domain: 'Fleet Management', avatar: mentorImages[14] },
  { id: 'in8', name: 'Meera Kapur', expertiseArea: 'Yield Management & Forecasting', rating: 4.9, yearsExperience: 13, sessionsDone: 88, domain: 'Revenue Management', avatar: mentorImages[15] },

  // Generative Expansion to reach 50+
  ...Array.from({ length: 42 }, (_, i) => ({
    id: `gen-${i}`,
    name: [`Mentor ${i + 9}`, `Specialist ${i + 5}`, `Lead ${i + 2}`][i % 3],
    expertiseArea: `Advanced coaching in ${DOMAINS[i % DOMAINS.length]} within car rental operations.`,
    rating: ((i % 5) * 0.1 + 4.5).toFixed(1),
    yearsExperience: (i * 7) % 15 + 8,
    sessionsDone: (i * 23) % 200 + 50,
    domain: DOMAINS[i % DOMAINS.length],
    avatar: mentorImages[i % mentorImages.length]
  }))
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
