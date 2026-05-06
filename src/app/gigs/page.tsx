'use client';

import Link from 'next/link';
import { Zap, Clock, MapPin, ArrowRight, Briefcase, Star, Search, Filter, Globe } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const gigs = [
  { title: 'Fleet Audit Support — 2 Weeks', location: 'Dallas, TX', type: 'Short Term', pay: '$28/hr', dept: 'Fleet Management', urgent: true, color: '#f59e0b' },
  { title: 'Customer Experience Coach — 1 Month', location: 'Los Angeles, CA', type: 'Project', pay: '$32/hr', dept: 'Core Operations', urgent: false, color: '#10b981' },
  { title: 'Digital Systems Rollout Lead', location: 'Remote', type: 'Project', pay: '$35/hr', dept: 'Technology', urgent: true, color: '#3b82f6' },
  { title: 'HR Onboarding Facilitator', location: 'New York, NY', type: 'Short Term', pay: '$30/hr', dept: 'People Development', urgent: false, color: '#ec4899' },
  { title: 'Financial Reporting Analyst — Q2', location: 'Chicago, IL', type: 'Seasonal', pay: '$33/hr', dept: 'Finance', urgent: false, color: '#7c3aed' },
  { title: 'Mobility Operations Support', location: 'Miami, FL', type: 'Short Term', pay: '$26/hr', dept: 'Mobility', urgent: true, color: '#ef4444' },
];

export default function GigsPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', }}>
      
      {/* 1. Hero Banner - Standardized Branding */}
      <div style={{ width: '100%', height: 260, position: 'relative', overflow: 'hidden' }}>
         <Image 
           src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1600&h=400&fit=crop" 
           alt="Hertz Fleet" 
           fill 
           style={{ objectFit: 'cover' }}
         />
         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 70%)' }} />
         <div style={{ position: 'relative', zIndex: 1, padding: '60px 100px' }}>
            <p style={{ fontSize: 12, fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>Gig Marketplace</p>
            <h1 style={{ fontSize: 42, fontWeight: 950, color: '#fff', margin: 0, lineHeight: 1.1 }}>BOOST YOUR<br />EXPERIENCE.</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 12, maxWidth: 600 }}>Short-term projects and high-impact gigs across the global organization.</p>
         </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Search & Filters Row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 40, alignItems: 'center' }}>
           <div style={{ position: 'relative', flex: 1 }}>
              <input type="text" placeholder="Search for gigs, projects, or departments..." style={{ width: '100%', padding: '14px 20px', paddingLeft: 48, borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 15, background: '#f8fafc' }} />
              <Search size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
           </div>
           <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', fontWeight: 700, fontSize: 14, color: '#475569' }}>
              <Filter size={18} /> Filters
           </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
          {gigs.map((gig, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -8 }}
              style={{ 
                background: '#fff', 
                border: '1px solid #e2e8f0', 
                borderRadius: 24, 
                padding: '24px',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Accent Bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: gig.color }} />
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ background: `${gig.color}15`, color: gig.color, padding: '4px 12px', borderRadius: 20, fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}>{gig.type}</span>
                    {gig.urgent && <span style={{ background: '#fef2f2', color: '#ef4444', padding: '4px 12px', borderRadius: 20, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', border: '1px solid #fee2e2' }}>Urgent</span>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#059669' }}>{gig.pay}</div>
                </div>
                
                <h3 style={{ fontSize: 18, fontWeight: 850, color: '#111827', lineHeight: 1.3, marginBottom: 12 }}>{gig.title}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                      <MapPin size={14} color={gig.color} /> {gig.location}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                      <Briefcase size={14} color={gig.color} /> {gig.dept}
                   </div>
                </div>
              </div>

              <Link 
                href="/jobs" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 10, 
                  background: 'linear-gradient(90deg, #f59e0b, #ec4899)', 
                  color: '#fff', 
                  padding: '14px', 
                  borderRadius: 16, 
                  fontWeight: 900, 
                  fontSize: 13, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  textDecoration: 'none',
                  boxShadow: '0 10px 20px rgba(236, 72, 153, 0.2)',
                  transition: 'all 0.3s'
                }}
              >
                Apply Now <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
