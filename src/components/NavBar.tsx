'use client';

import { Menu, X, Bell, ChevronDown, Search, LayoutGrid, Home, Star, Compass, Target, RefreshCw, Globe, Radio, Users, GraduationCap, Briefcase, Box, Layers, ShieldCheck, TrendingUp, BarChart3, User, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export const NavBar = () => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 1 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  
  const [isAppsMenuOpen, setIsAppsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'JOURNEYS', href: '/your-move' },
    { name: 'GIGS', href: '/gigs' },
    { name: 'MENTORS', href: '/mentorship' },
    { name: 'LEARN', href: '/learn' },
    { name: 'VACANCIES', href: '/jobs' },
  ];

  const appsMenuItems = [
    { name: 'Home', icon: <Home size={18} />, href: '/' },
    { name: 'Personalize', icon: <Star size={18} />, href: '/personalize' },
    { name: 'Journeys', icon: <Compass size={18} />, href: '/your-move' },
    { name: 'Goals', icon: <Target size={18} />, href: '/goals' },
    { name: 'Feedback', icon: <RefreshCw size={18} />, href: '/feedback' },
    { name: 'Gigs', icon: <Globe size={18} />, href: '/gigs' },
    { name: 'Create Gigs', icon: <Radio size={18} />, href: '/gigs/create' },
    { name: 'Mentors', icon: <Users size={18} />, href: '/mentorship' },
    { name: 'Learn+', icon: <GraduationCap size={18} />, href: '/learn' },
    { name: 'Vacancies', icon: <Briefcase size={18} />, href: '/jobs' },
    { name: 'Resources', icon: <Box size={18} />, href: '/resources' },
    { name: 'Skills', icon: <Layers size={18} />, href: '/skills' },
    { name: 'Leader View', icon: <ShieldCheck size={18} />, href: '/leader-view' },
    { name: 'Succession', icon: <TrendingUp size={18} />, href: '/succession' },
    { name: 'Insights', icon: <BarChart3 size={18} />, href: '/insights' },
    { name: 'Insights 2.0', icon: <BarChart3 size={18} />, href: '/insights-v2' },
  ];

  useEffect(() => {
    const activeIdx = navLinks.findIndex(l => l.href === pathname || (l.href !== '/' && pathname.startsWith(l.href)));
    const targetIdx = hoveredIdx !== null ? hoveredIdx : (activeIdx !== -1 ? activeIdx : 0);
    
    if (navRefs.current[targetIdx]) {
      const el = navRefs.current[targetIdx];
      setPillStyle({
        left: el?.offsetLeft || 0,
        width: el?.offsetWidth || 0,
        opacity: 1
      });
    }
  }, [hoveredIdx, pathname]);

  return (
    <nav 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        width: '100%',
        background: '#fff',
        borderBottom: '1px solid #E5E7EB',
        height: 100,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{ maxWidth: '1600px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' }}>
        
        {/* LEFT: Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ position: 'relative' }}>
             <button 
               onClick={() => setIsAppsMenuOpen(!isAppsMenuOpen)}
               style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', borderRadius: 8 }}
             >
               <LayoutGrid size={24} color="#6b7280" />
             </button>
             <AnimatePresence>
               {isAppsMenuOpen && (
                 <>
                   <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }} onClick={() => setIsAppsMenuOpen(false)} />
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} style={{ position: 'absolute', top: '100%', left: 0, width: 280, background: '#fff', borderRadius: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.15)', padding: '10px 0', zIndex: 1001, border: '1px solid #e5e7eb', marginTop: 10 }}>
                      {appsMenuItems.map((item) => (
                        <Link key={item.name} href={item.href} onClick={() => setIsAppsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 24px', textDecoration: 'none', color: '#7e22ce', fontSize: 15, fontWeight: 600 }}>
                          <span style={{ color: '#9ca3af' }}>{item.icon}</span>
                          {item.name}
                        </Link>
                      ))}
                   </motion.div>
                 </>
               )}
             </AnimatePresence>
          </div>

          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
             <div style={{ position: 'relative', width: 64, height: 64 }}>
                <svg width="64" height="64" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="#fecaca" strokeWidth="1" fill="none" />
                  <path d="M35 30 V70 M65 30 V70 M35 50 H65" stroke="url(#hertzGradient)" strokeWidth="10" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="hertzGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 24, fontWeight: 950, color: '#111827', lineHeight: 0.9 }}>CAREER</span>
                <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.25em', color: '#ec4899', marginTop: 4 }}>COACHING</span>
             </div>
          </Link>
        </div>

        {/* CENTER: Navigation Tabs with Gradient Pill */}
        <div style={{ 
          background: 'rgba(243, 244, 246, 0.5)', 
          borderRadius: 30, 
          padding: '6px', 
          display: 'flex', 
          gap: 4, 
          position: 'relative' 
        }}>
           {navLinks.map((link, idx) => {
             const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
             return (
               <Link 
                 key={link.name} 
                 href={link.href}
                 ref={(el) => { navRefs.current[idx] = el; }}
                 style={{
                   textDecoration: 'none',
                   fontSize: 13,
                   padding: '12px 24px',
                   fontWeight: 800,
                   color: isActive ? '#fff' : '#4B5563',
                   borderRadius: 24,
                   position: 'relative',
                   zIndex: 2,
                   background: isActive ? 'linear-gradient(90deg, #f59e0b, #ec4899)' : 'transparent',
                   boxShadow: isActive ? '0 10px 20px rgba(236, 72, 153, 0.3)' : 'none',
                   transition: 'all 0.3s ease'
                 }}
               >
                 {link.name}
               </Link>
             );
           })}
        </div>

        {/* RIGHT: Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', padding: '6px 12px', borderRadius: 40, transition: 'all 0.2s', background: isProfileMenuOpen ? '#f9fafb' : 'transparent' }}
          >
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 16, fontWeight: 900, color: '#111827', margin: 0 }}>John</p>
            </div>
            <div style={{ width: 50, height: 50, borderRadius: '50%', padding: 2, background: 'linear-gradient(135deg, #f59e0b, #ec4899)', boxShadow: isProfileMenuOpen ? '0 0 15px rgba(236, 72, 153, 0.3)' : 'none' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff' }}>
                <Image src="/john_profile.png" width={50} height={50} alt="Profile" style={{ objectFit: 'cover' }} priority />
              </div>
            </div>
            <ChevronDown size={16} color="#6b7280" style={{ transform: isProfileMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </div>

          <AnimatePresence>
            {isProfileMenuOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }} onClick={() => setIsProfileMenuOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                  style={{ 
                    position: 'absolute', 
                    top: '110%', 
                    right: 0, 
                    width: 220, 
                    background: '#fff', 
                    borderRadius: 16, 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)', 
                    padding: '8px', 
                    zIndex: 1001, 
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden'
                  }}
                >
                  <Link 
                    href="/profile" 
                    onClick={() => setIsProfileMenuOpen(false)} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 12, 
                      padding: '12px 16px', 
                      textDecoration: 'none', 
                      color: '#374151', 
                      fontSize: 14, 
                      fontWeight: 700,
                      borderRadius: 12,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f0f9ff', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={18} />
                    </div>
                    View Profile
                  </Link>

                  <div style={{ height: 1, background: '#f1f5f9', margin: '4px 8px' }} />

                  <button 
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      // Handle logout logic here
                      window.location.href = '/';
                    }} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      width: '100%',
                      gap: 12, 
                      padding: '12px 16px', 
                      background: 'none',
                      border: 'none',
                      color: '#ef4444', 
                      fontSize: 14, 
                      fontWeight: 700,
                      borderRadius: 12,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <LogOut size={18} />
                    </div>
                    Logout
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};
