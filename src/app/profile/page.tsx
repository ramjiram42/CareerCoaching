"use client";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Edit2, CheckCircle, Plus, X, Star, MapPin, Calendar, Award, 
  Target, TrendingUp, Upload, ChevronRight, Sparkles, Shield, 
  Zap, Mail, Briefcase, User, Info, MessageSquare, Heart, Settings,
  ChevronDown, ExternalLink, Globe, Layout, UserCircle
} from 'lucide-react'
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// ─── Profile Data for John (Resume Focused) ─────────────────────────
const PROFILE = {
  name: 'John Smith',
  title: 'High School Tutor & Server',
  bio: 'Varsity Lacrosse Team Captain | State Championship Winner',
  location: 'Gnaw Bone, IN',
  type: 'Service Professional',
  country: 'United States',
  region: 'North America',
  program: 'MBA Summer Associate Program',
  skills: [
    "Tutoring & Academic Support", 
    "Clear Communication", 
    "Rapport Building", 
    "Customer Service", 
    "Conflict De-escalation", 
    "Time Management", 
    "Teamwork", 
    "Peer Leadership"
  ],
  certifications: [
    "Reliability", 
    "Professionalism", 
    "Strong Work Ethic"
  ]
}

const TabIcon = ({ icon: Icon, color, isActive }: { icon: any, color: string, isActive: boolean }) => (
  <div style={{ 
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '14px',
    background: isActive ? color : `${color}15`,
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: isActive ? `0 8px 24px ${color}55` : `0 4px 12px ${color}11`,
    border: `1px solid ${isActive ? 'transparent' : `${color}33`}`
  }}>
    <Icon 
      size={22} 
      color={isActive ? '#fff' : color} 
      strokeWidth={isActive ? 2.5 : 2}
      style={{ 
        filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none',
        transition: 'all 0.4s ease'
      }}
    />
    {isActive && (
      <div style={{ 
        position: 'absolute',
        inset: '-5px',
        borderRadius: '18px',
        border: `2px solid ${color}`,
        opacity: 0.4,
        animation: 'pulseIcon 2s infinite'
      }} />
    )}
  </div>
)

const TABS = (t: (key: string) => string, activeTab: string) => [
  { id: 'personalize', label: t('PERSONALIZE'), icon: (isActive: boolean) => <TabIcon icon={Settings} color="#FF8C00" isActive={isActive} /> },
  { id: 'talents', label: t('TALENTS'), icon: (isActive: boolean) => <TabIcon icon={Star} color="#FFD700" isActive={isActive} /> },
  { id: 'feedback', label: t('FEEDBACK'), icon: (isActive: boolean) => <TabIcon icon={MessageSquare} color="#3B82F6" isActive={isActive} /> },
  { id: 'about', label: t('ABOUT_ME'), icon: (isActive: boolean) => <TabIcon icon={UserCircle} color="#EC4899" isActive={isActive} /> },
]

export default function ProfilePage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('personalize')

  return (
    <main style={{ 
      backgroundColor: '#f4f5f7', 
      minHeight: '100vh', 
      color: '#1a202c'
    }}>
      {/* Banner Section */}
      <div style={{ 
        position: 'relative', 
        height: '120px', 
        width: '100%',
        backgroundImage: 'url("/profile_banner.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container" style={{ position: 'relative', height: '100%' }}>
           <div style={{ position: 'absolute', top: 15, right: 0 }}>
              <button style={{ 
                background: 'rgba(0,0,0,0.6)', 
                color: '#fff', 
                border: 'none', 
                padding: '6px 14px', 
                borderRadius: '8px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {t('VIEW_PROFILE_AS_ME')} <ChevronDown size={14} />
              </button>
           </div>
        </div>
      </div>

      {/* Profile Header Wrapper */}
      <div className="container" style={{ position: 'relative', marginTop: '-45px', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {/* Avatar */}
          <div style={{ 
            width: '180px', 
            height: '180px', 
            borderRadius: '50%', 
            border: '4px solid #fff',
            overflow: 'hidden',
            backgroundColor: '#fff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            flexShrink: 0
          }}>
            <Image 
              src="/john_profile.png" 
              width={180} 
              height={180} 
              alt="John"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          {/* User Info */}
          <div style={{ paddingTop: '50px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
               <h1 style={{ 
                 fontSize: '36px', 
                 fontWeight: 900, 
                 margin: 0,
                 background: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 textShadow: '0 2px 15px rgba(0,0,0,0.2)',
                 letterSpacing: '-0.03em'
               }}>
                 {PROFILE.name}
               </h1>
               <div style={{ 
                 background: '#fff', 
                 borderRadius: '50%', 
                 width: 22, 
                 height: 22, 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
               }}>
                 <Edit2 size={12} color="#D81B60" />
               </div>
            </div>
            <p style={{ 
              fontSize: '22px', 
              margin: '0 0 6px 0', 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFA726 0%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em',
              opacity: 1 
            }}>
              {PROFILE.title}
            </p>
            <p style={{ 
              fontSize: '16px', 
              margin: '0 0 20px 0', 
              fontWeight: 600,
              background: 'linear-gradient(135deg, #FFCC80 0%, #FFF9C4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: 0.95
            }}>
              {PROFILE.bio}
            </p>
 
            {/* Badges / Skills / Certs - Themed Colors */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, maxWidth: '950px' }}>
               {/* Core Skills - Theme Charcoal/Orange */}
               {PROFILE.skills.map((skill, i) => (
                 <Badge 
                   key={`skill-${i}`} 
                   icon={<Zap size={12} color="#FF8C00" />} 
                   text={skill} 
                   color="#1a202c" 
                   textColor="#fff" 
                 />
               ))}
               
               {/* Certifications - Professional Gold */}
               {PROFILE.certifications.map((cert, i) => (
                 <Badge 
                   key={`cert-${i}`} 
                   icon={<Award size={12} />} 
                   text={cert} 
                   color="#FFD700" 
                   textColor="#000" 
                 />
               ))}

               {/* Profile Details - Sleek Theme Accents */}
               <Badge text={PROFILE.location} icon={<MapPin size={12} />} color="rgba(26, 32, 44, 0.05)" textColor="#4A5568" />
               <Badge text={PROFILE.type} icon={<Briefcase size={12} />} color="rgba(26, 32, 44, 0.05)" textColor="#4A5568" />
               <Badge text={PROFILE.country} color="rgba(26, 32, 44, 0.05)" textColor="#4A5568" />
               <Badge text={PROFILE.region} color="rgba(26, 32, 44, 0.05)" textColor="#4A5568" />
               <Badge text={PROFILE.program} color="rgba(26, 32, 44, 0.05)" textColor="#4A5568" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: '#fff', marginTop: '20px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 64 }}>
            {TABS(t, activeTab).map(tab => (
              <button 
                key={tab.id}
                className="tab-button"
                onClick={() => setActiveTab(tab.id)}
                style={{ 
                  padding: '24px 0',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 14,
                  fontSize: '12px',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  color: activeTab === tab.id ? '#111827' : '#94A3B8',
                  borderBottom: `3px solid ${activeTab === tab.id ? '#D81B60' : 'transparent'}`,
                  transition: 'all 0.4s ease',
                  minWidth: '120px',
                  position: 'relative'
                }}
              >
                {tab.icon(activeTab === tab.id)}
                <span style={{ transition: 'all 0.4s ease' }}>{tab.label}</span>
                {activeTab === tab.id && (
                   <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#D81B60', boxShadow: '0 0 12px rgba(216, 27, 96, 0.4)' }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container" style={{ marginTop: '32px', paddingBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32 }}>
          
          {/* Main Card */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            padding: '40px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            minHeight: '400px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
               <div style={{ background: '#333', color: '#fff', borderRadius: '50%', padding: 8 }}>
                  <User size={20} />
               </div>
               <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#333', margin: 0 }}>{t('CAREER_ENGAGERS_SATISFACTION')}</h2>
            </div>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: 32 }}>
              {t('COMPLETE_SATISFACTION_TEXT_1')}<span style={{ color: '#D81B60', textDecoration: 'underline', cursor: 'pointer', fontWeight: 700 }}>{t('SATISFACTION_RATINGS')}</span>{t('COMPLETE_SATISFACTION_TEXT_2')}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
               <ResultCard label={t('RESULTS')} icon="🏆" />
               <ResultCard label={t('TEAMWORK_TITLE')} icon="👥" />
               <ResultCard label={t('ACHIEVEMENT')} icon="⛰️" />
               <ResultCard label={t('QUALITY')} icon="🖊️" />
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
             <div style={{ 
               background: '#fff', 
               borderRadius: '12px', 
               padding: '24px',
               boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
             }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#333', margin: '0 0 16px 0' }}>{t('NEXT_UP')}</h3>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  {t('COMPLETE_SATISFACTION_TEXT_1').split(' ').slice(0, 3).join(' ')} {t('MY_SATISFACTION')}
                </p>
             </div>

             <div style={{ 
               background: '#fff', 
               borderRadius: '12px', 
               padding: '24px',
               boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
             }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333', margin: '0 0 20px 0' }}>{t('INSIGHTS_FOR')}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                   <InsightItem t={t} title={t('ENGAGERS_SATISFACTION_VALUES_ALIGNMENT')} />
                   <InsightItem t={t} title={t('WORK_STYLE')} />
                   <InsightItem t={t} title={t('AGILITY_FACTORS')} />
                </div>
             </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .tab-button:hover {
          transform: translateY(-4px);
        }
        .tab-button:hover div {
          transform: scale(1.1);
        }
        .tab-button:hover span {
          color: #111827;
        }
        @keyframes pulseIcon {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.4; }
        }
      `}</style>
    </main>
  )
}

function Badge({ icon, text, color = 'rgba(0,0,0,0.3)', textColor = '#fff' }: { icon?: React.ReactNode, text: string, color?: string, textColor?: string }) {
  return (
    <div style={{ 
      background: color, 
      color: textColor, 
      padding: '4px 12px', 
      borderRadius: '20px', 
      fontSize: '12px', 
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      backdropFilter: color.includes('rgba') ? 'blur(4px)' : 'none',
      border: color === 'rgba(0,0,0,0.3)' ? '1px solid rgba(255,255,255,0.1)' : 'none'
    }}>
      {icon}
      {text}
    </div>
  )
}

function ResultCard({ label, icon }: { label: string, icon: string }) {
  return (
    <div style={{ 
      border: '1px solid #eee', 
      borderRadius: '12px', 
      padding: '20px', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#999', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: '40px' }}>{icon}</div>
      <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid #ccc', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eee' }}></div>
      </div>
    </div>
  )
}

function InsightItem({ t, title }: { t: (key: string) => string, title: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
       <div style={{ width: 20, height: 20, borderRadius: '4px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
          <Layout size={12} color="#999" />
       </div>
       <div style={{ flex: 1 }}>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#333', margin: '0 0 4px 0' }}>{title}</p>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            padding: 0, 
            color: '#D81B60', 
            fontSize: '12px', 
            fontWeight: 800,
            textDecoration: 'underline',
            cursor: 'pointer'
          }}>{t('READ_REPORT')}</button>
       </div>
    </div>
  )
}
