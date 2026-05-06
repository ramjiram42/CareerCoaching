'use client';
import React, { useState } from 'react';
import { Search, User, ArrowRight, ChevronDown, HelpCircle, X, Compass, ChevronLeft, ChevronRight, Rocket, Cpu, Zap, Target } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface NewJourneyFlowProps {
  onFindJourney: (role: string) => void;
  onCancel: () => void;
}

const TARGET_ROLE_OPTIONS = [
  { label: 'IN_MY_FUNCTION', roles: ['Incentive Compensation', 'Technology'] },
  { label: 'OTHER_FUNCTIONS', roles: ['Learning & Development', 'Operations'] }
];

// Removed the last one ("Product Manager (AI)") as requested
const STRETCH_ROLES_DATA = [
  { name: 'Lead AI Engineer', match: '64%', avatar: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&q=80' },
  { name: 'Chief Technology Officer', match: '56%', avatar: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&q=80' },
  { name: 'Data Scientist', match: '56%', avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80' },
];

const NEXT_STEPS_DATA = [
  { name: 'Automation Architect', match: '70%', avatar: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&q=80' },
  { name: 'Intelligent Automation Lead', match: '70%', avatar: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&q=80' },
  { name: 'Cloud Integration Expert', match: '70%', avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80' },
];

export default function NewJourneyFlow({ onFindJourney, onCancel }: NewJourneyFlowProps) {
  const { t } = useLanguage();
  const [stage, setStage] = useState<'form' | 'simulating' | 'results'>('form');
  const [targetRole, setTargetRole] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('IN_MY_FUNCTION');

  const filteredRoles = TARGET_ROLE_OPTIONS.find(t => t.label === activeTab)?.roles || [];

  const handleSimulate = () => {
    if (!targetRole) return;
    setStage('simulating');
    setTimeout(() => {
      setStage('results');
    }, 5000);
  };

  if (stage === 'simulating') {
    return (
      <div style={{ 
        background: '#fff', 
        borderRadius: 32, 
        padding: '100px 50px', 
        border: '1px solid #E5E7EB', 
        boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.12)',
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '20px auto',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ position: 'relative', width: 200, height: 200, marginBottom: 40 }}>
           <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #3B82F6', opacity: 0.2, animation: 'ping 2s infinite' }} />
           <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', border: '2px solid #EC4899', opacity: 0.3, animation: 'ping 2.5s infinite reverse' }} />
           <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                 <Rocket size={80} color="#3B82F6" style={{ animation: 'float 3s ease-in-out infinite' }} />
              </div>
           </div>
           {/* Scanning line */}
           <div style={{ position: 'absolute', top: '50%', left: '-20%', right: '-20%', height: 2, background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)', boxShadow: '0 0 15px #3B82F6', animation: 'scan 2s linear infinite' }} />
        </div>
        
        <h2 style={{ fontSize: 32, fontWeight: 900, color: '#111827', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('CALIBRATING_TRAJECTORY')}</h2>
        <p style={{ fontSize: 18, color: '#6B7280', fontWeight: 500, maxWidth: 500 }}>{t('AI_ENGINE_ANALYZING_1')}<span style={{ color: '#3B82F6', fontWeight: 800 }}>{targetRole}</span>{t('AI_ENGINE_ANALYZING_2')}</p>
        
        <div style={{ marginTop: 40, width: 300, height: 6, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden' }}>
           <div style={{ height: '100%', background: 'linear-gradient(90deg, #3B82F6, #EC4899)', width: '0%', animation: 'progress 5s linear forwards' }} />
        </div>

        <style>{`
           @keyframes ping { 0% { transform: scale(1); opacity: 0.3; } 100% { transform: scale(1.5); opacity: 0; } }
           @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
           @keyframes scan { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
           @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
        `}</style>
      </div>
    );
  }

  if (stage === 'results') {
    return (
      <div style={{ 
        background: '#fff', 
        borderRadius: 32, 
        padding: '60px 40px', 
        border: '1px solid #E5E7EB', 
        boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
        animation: 'cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        maxWidth: '1200px',
        margin: '20px auto',
        minHeight: '800px',
        overflow: 'hidden'
      }}>
        <button 
          onClick={() => setStage('form')}
          style={{ position: 'absolute', top: 32, left: 32, background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13 }}
        >
          <ChevronLeft size={20} /> {t('BACK_TO_SEARCH')}
        </button>

        <button 
          onClick={onCancel}
          style={{ position: 'absolute', top: 32, right: 32, background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
        >
          <X size={24} />
        </button>

        <div style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
           <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.1 }}>
              <circle cx="50%" cy="50%" r="180" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="8 8" />
              <circle cx="50%" cy="50%" r="90" fill="none" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 4" />
           </svg>

           <div style={{ position: 'absolute', zIndex: 10 }}>
              <div style={{ 
                width: 120, 
                height: 120, 
                borderRadius: '50%', 
                padding: 4,
                background: '#fff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                overflow: 'hidden' 
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                   <Image src="/john_profile.png" width={120} height={120} alt="User" priority />
                </div>
              </div>
           </div>

           {NEXT_STEPS_DATA.map((role, i) => {
              const angles = [-145, -35, 145, 35];
              const dist = 220;
              const angle = angles[i] * (Math.PI / 180);
              const x = Math.cos(angle) * dist;
              const y = Math.sin(angle) * dist;

              return (
                 <div key={role.name} style={{ position: 'absolute', transform: `translate(${x}px, ${y}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5, animation: 'popIn 0.5s ease forwards', animationDelay: `${i * 2}s`, opacity: 0 }}>
                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                       <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#F9FAFB', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                          <User size={32} color="#9CA3AF" />
                       </div>
                       <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#10B981', color: '#fff', fontSize: 10, fontWeight: 800, width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>{role.match}</div>
                    </div>
                    <span style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: '#4B5563', textAlign: 'center', maxWidth: 140 }}>{role.name}</span>
                 </div>
              );
           })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '40px 0 60px' }}>
            <div style={{ height: 1, flex: 1, background: '#E5E7EB' }}></div>
            <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
               <span style={{ fontSize: 11, fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{t('STRETCH_OPPORTUNITIES')}</span>
            </div>
            <div style={{ height: 1, flex: 1, background: '#E5E7EB' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', marginBottom: 40 }}>
           {STRETCH_ROLES_DATA.map((role, i) => (
               <div key={role.name} onClick={() => onFindJourney(role.name)} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 24, padding: '24px', width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
                      <Image src={role.avatar} width={80} height={80} alt={role.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1F2937', textAlign: 'center', margin: 0 }}>{role.name}</h3>
                  <div style={{ width: 40, height: 4, borderRadius: 2, background: '#3B82F6', marginTop: 20 }}></div>
               </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#fff', 
      borderRadius: 32, 
      padding: '70px 50px', 
      border: '1px solid #E5E7EB', 
      boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.12)',
      animation: 'cardIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      position: 'relative',
      maxWidth: '1000px',
      margin: '20px auto',
      overflow: 'hidden'
    }}>
      <button 
        onClick={onCancel}
        style={{ position: 'absolute', top: 32, right: 32, background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
      >
        <X size={24} />
      </button>

      <div style={{ textAlign: 'center', marginBottom: 70 }}>
        <h2 style={{ fontSize: 48, fontWeight: 850, color: '#111827', marginBottom: 12, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          {t('FIND_A_JOURNEY')}<span style={{ color: '#3B82F6' }}>journey</span>
        </h2>
        <p style={{ fontSize: 18, color: '#6B7280', fontWeight: 500 }}>{t('SIMULATE_CAREER_TRAJECTORY')}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 50, marginBottom: 90, position: 'relative' }}>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', padding: 4, background: '#F3F4F6', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                <Image src="/john_profile.png" width={100} height={100} alt="Start" style={{ objectFit: 'cover' }} priority />
              </div>
            </div>
            <span style={{ marginTop: 16, fontSize: 11, fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('CURRENT_LOCATION')}</span>
         </div>

         <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: '#E5E7EB' }}></div>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', position: 'relative', zIndex: 2 }}><HelpCircle size={20} /></div>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', position: 'relative', zIndex: 2 }}><HelpCircle size={20} /></div>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', position: 'relative', zIndex: 2 }}><HelpCircle size={20} /></div>
         </div>

         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#F9FAFB', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: targetRole ? '#3B82F6' : '#D1D5DB', transition: 'all 0.3s' }}>
              <Rocket size={44} />
            </div>
            <span style={{ marginTop: 16, fontSize: 11, fontWeight: 800, color: targetRole ? '#3B82F6' : '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('DESTINATION')}</span>
         </div>
      </div>

      <div style={{ display: 'flex', gap: 30, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>
         <div style={{ flex: 1, minWidth: '320px' }}>
            <div style={{ padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#6B7280', letterSpacing: '0.05em', marginBottom: 8, textTransform: 'uppercase' }}>{t('CURRENT_DESIGNATION')}</div>
            <input readOnly value="High School Tutor & Server" style={{ width: '100%', padding: '18px 24px', borderRadius: 16, border: '1px solid #E5E7EB', fontSize: 16, fontWeight: 700, color: '#111827', background: '#F9FAFB', outline: 'none' }} />
         </div>

         <div style={{ position: 'relative', flex: 1, minWidth: '320px' }}>
            <div style={{ padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#6B7280', letterSpacing: '0.05em', marginBottom: 8, textTransform: 'uppercase' }}>{t('TARGET_DESIGNATION')}</div>
            <div onClick={() => setShowDropdown(!showDropdown)} style={{ width: '100%', padding: '18px 24px', borderRadius: 16, border: showDropdown ? '2px solid #3B82F6' : '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', cursor: 'pointer', transition: 'all 0.2s' }}>
               <span style={{ color: targetRole ? '#111827' : '#9CA3AF', fontSize: 16, fontWeight: 700 }}>{targetRole || t('SELECT_TARGET_ROLE')}</span>
               <ChevronDown size={22} color={targetRole ? '#3B82F6' : '#9CA3AF'} />
            </div>
            {showDropdown && (
               <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: '#fff', borderRadius: 16, border: '1px solid #E5E7EB', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', zIndex: 100, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', background: '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
                     {TARGET_ROLE_OPTIONS.map(opt => (
                        <button key={opt.label} onClick={(e) => { e.stopPropagation(); setActiveTab(opt.label); }} style={{ flex: 1, padding: '16px', border: 'none', background: activeTab === opt.label ? '#fff' : 'transparent', borderBottom: activeTab === opt.label ? '2px solid #3B82F6' : 'none', fontSize: 12, fontWeight: 700, color: activeTab === opt.label ? '#111827' : '#6B7280', textTransform: 'uppercase', cursor: 'pointer' }}>{t(opt.label)}</button>
                     ))}
                  </div>
                  <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '10px 0' }}>
                     {filteredRoles.map(role => (
                        <div key={role} style={{ padding: '14px 24px', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#4B5563' }} onMouseOver={(e) => e.currentTarget.style.background = '#F9FAFB'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'} onClick={(e) => { e.stopPropagation(); setTargetRole(role); setShowDropdown(false); }}>{role}</div>
                     ))}
                  </div>
               </div>
            )}
         </div>

         <button onClick={handleSimulate} style={{ background: targetRole ? '#111827' : '#E5E7EB', color: '#fff', border: 'none', padding: '18px 50px', borderRadius: 16, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', cursor: targetRole ? 'pointer' : 'not-allowed', marginTop: 38, transition: 'all 0.2s' }}>{t('SIMULATE_PATHWAY')}</button>
      </div>

      <div style={{ marginTop: 90, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
             <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#F9FAFB', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', id: 'engine-icon' }}><Cpu size={22} /></div>
             <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.1rem', textTransform: 'uppercase' }}>{t('SIMULATION_CORE')}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4B5563' }}>{t('SYSTEMS_OPTIMAL')}</div>
             </div>
          </div>
      </div>

      <style>{`
         #engine-icon { animation: spin 10s linear infinite; }
         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
         @keyframes cardIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
