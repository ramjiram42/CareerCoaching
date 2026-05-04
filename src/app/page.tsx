"use client";
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, ChevronRight } from 'lucide-react'
import { DAILY_QUOTES } from '@/data/quotes';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const dailyQuote = useMemo(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];
  }, []);

  const tiles = [
    { 
      title: 'JOURNEYS', 
      desc: 'JOURNEYS_DESC', 
      href: '/your-move', 
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80' 
    },
    { 
      title: 'SKILLS', 
      desc: 'SKILLS_DESC', 
      href: '/skills', 
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80' 
    },
    { 
      title: 'GIGS', 
      desc: 'GIGS_DESC', 
      href: '/gigs', 
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80' 
    },
    { 
      title: 'MENTORS', 
      desc: 'MENTORS_DESC', 
      href: '/mentorship', 
      image: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=800&q=80' 
    },
    { 
      title: 'MILESTONES', 
      desc: 'MILESTONES_DESC', 
      href: '/milestones', 
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' 
    },
    { 
      title: 'MASTERY', 
      desc: 'MASTERY_DESC', 
      href: '/learn', 
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80' 
    },
    { 
      title: 'PROFILE', 
      desc: 'PROFILE_DESC', 
      href: '/profile', 
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80' 
    },
    { 
      title: 'VACANCIES', 
      desc: 'VACANCIES_DESC', 
      href: '/jobs', 
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' 
    },
  ];

  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
      
      <div style={{ 
        height: '260px', 
        position: 'relative',
        backgroundImage: 'url("/hertz_fleet_hero.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: '0 80px',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)' }} />
        
        {/* Left Side Content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
          <h1 style={{ 
            color: '#fff', 
            fontSize: '3.5rem', 
            fontWeight: 900, 
            lineHeight: 1.1,
            margin: '0 0 24px',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
            whiteSpace: 'pre-line'
          }}>
            {t('DRIVE_YOUR_CAREER_FORWARD')}
          </h1>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/your-move" style={{ 
              background: 'linear-gradient(90deg, #f59e0b, #ec4899)',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 900,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)'
            }}>
              {t('EXPLORE_JOURNEYS')}
            </Link>
            <Link href="/jobs" style={{ 
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 900,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {t('VIEW_VACANCIES')}
            </Link>
          </div>
        </div>

        {/* Right Side User Card */}
        <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
          <div style={{ 
            background: 'rgba(20, 25, 35, 0.75)',
            backdropFilter: 'blur(20px)',
            borderRadius: 24,
            padding: '24px 32px',
            width: '380px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{ flex: 1 }}>
               <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>John Smith</h3>
               <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 12px' }}>{t('PROFILE_AWESOME')}</p>
               <Link href="/profile" style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: 4, 
                 fontSize: 13, 
                 fontWeight: 800, 
                 color: '#ec4899', 
                 textDecoration: 'none' 
               }}>
                 {t('ELEVATE_POTENTIAL')} <ChevronRight size={16} />
               </Link>
            </div>
            <div style={{ 
              width: 64, 
              height: 64, 
              borderRadius: '50%', 
              padding: 3, 
              background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
              flexShrink: 0
            }}>
               <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff' }}>
                 <Image src="/john_profile.png" width={64} height={64} alt="Profile" priority />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT GRID ─────────────────────────────── */}
      <div style={{ maxWidth: '1600px', margin: '40px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 60 }}>
        
        {/* Top Section: Welcome & Inspiration */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#111827', margin: '0 0 20px', lineHeight: 1 }}>
              {t('EXPLORE_FUTURE')}<span style={{ background: 'linear-gradient(90deg, #f59e0b, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hertz</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
              {t('HUB_DESCRIPTION')}
            </p>
          </div>

          <div style={{ 
             background: '#FEF9F2',
             borderRadius: 24,
             padding: '32px',
             borderLeft: '6px solid #f59e0b',
             position: 'relative',
             boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
          }}>
             <p style={{ fontSize: 11, fontWeight: 900, color: '#ec4899', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 16px' }}>
               {t('INSPIRATION')}
             </p>
             <div style={{ display: 'flex', gap: 12 }}>
               <Quote size={32} color="#f59e0b" style={{ flexShrink: 0, opacity: 0.3 }} />
               <p style={{ fontSize: '1.2rem', fontWeight: 700, fontStyle: 'italic', color: '#1F2937', margin: 0, lineHeight: 1.4 }}>
                 "{dailyQuote}"
               </p>
             </div>
          </div>
        </div>

        {/* Bottom Section: Full Width Structured Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {tiles.map((tile, idx) => (
            <Link key={idx} href={tile.href} style={{ textDecoration: 'none' }}>
              <div className="hertz-card" style={{
                background: '#fff',
                borderRadius: 24,
                overflow: 'hidden',
                border: '1px solid #F1F5F9',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ height: '220px', position: 'relative' }}>
                   <Image src={tile.image} fill alt={tile.title} style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '32px', flex: 1 }}>
                   <div style={{ 
                     background: 'linear-gradient(90deg, #f59e0b, #ec4899)',
                     color: '#fff',
                     padding: '6px 18px',
                     borderRadius: 100,
                     fontSize: 12,
                     fontWeight: 950,
                     display: 'inline-block',
                     marginBottom: 20,
                     textTransform: 'uppercase',
                     letterSpacing: '0.05em'
                   }}>
                     {t(tile.title)}
                   </div>
                   <p style={{ fontSize: 16, fontWeight: 600, color: '#475569', lineHeight: 1.5, margin: 0 }}>
                     {t(tile.desc)}
                   </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .hertz-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.1);
          border-color: #ec4899;
        }
      `}</style>
    </main>
  );
}
