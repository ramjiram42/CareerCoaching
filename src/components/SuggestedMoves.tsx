'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Info, X, Filter, Target, Users, Map, Network, ArrowRight, TrendingUp, Compass, Flag, BookOpen, UserPlus, ChevronDown, Building2, Briefcase, Globe, Database, Cpu, Shield, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SuggestedMovesProps {
  onBack: () => void;
  userProfile: {
    name: string;
    role: string;
    image: string;
  };
}

interface RoleData {
  id: string;
  name: string;
  match: string;
  image: string;
  vacancy: boolean;
  group: 'parallel' | 'stretch';
}

export default function SuggestedMoves({ onBack, userProfile }: SuggestedMovesProps) {
  const [activeTab, setActiveTab] = useState('MY SUGGESTED MOVES');
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const tabs = ['MY SUGGESTED MOVES', 'CAREER JOURNEYS', 'OUR ORGANIZATION', 'REPORTING LINES'];

  const peerImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  ];

  // Specific pathways from user request
  const careerJourneys = [
<<<<<<< HEAD
    { title: 'Intelligent Automation Architect', description: 'Master RPA and cognitive automation at scale.', level: 'Milestone', match: 'High Match Potential', color: '#f59e0b', target: 'Customer Service Rep' },
=======
    { title: 'Intelligent Automation Architect', description: 'Master RPA and cognitive automation at scale.', level: 'Milestone', match: 'High Match Potential', color: '#f59e0b', target: 'High School Tutor & Server' },
>>>>>>> 0ee8d5b4dc861dd89fed0b044a1a428de994dc79
    { title: 'Enterprise Automation Architect', description: 'Design end-to-end automated business processes.', level: 'Milestone', match: 'High Match Potential', color: '#7c3aed', target: 'Technical Program Manager' },
    { title: 'Technical Project Manager', description: 'Lead high-complexity technical delivery teams.', level: 'Target', match: 'NEXT LVL', color: '#3b82f6', target: 'Technical Program Manager' },
    { title: 'AI Architect', description: 'Implement neural networks and LLMs for enterprise.', level: 'Milestone', match: 'High Match Potential', color: '#ec4899', target: 'Data Engineer' },
    { title: 'AI Engineer', description: 'Develop predictive models and AI-driven solutions.', level: 'Milestone', match: 'High Match Potential', color: '#ec4899', target: 'Data Engineer' },
    ...Array.from({ length: 45 }, (_, i) => ({
      title: `Global Pathway ${i + 6}`,
      description: `A strategic roadmap focused on mastering key competencies.`,
      level: ['Milestone', 'Target', 'NEXT LVL'][i % 3],
      match: ['High Match Potential', '85%', '92%'][i % 3],
      color: ['#7c3aed', '#10b981', '#3b82f6', '#059669', '#f59e0b'][i % 5],
      target: 'Senior Leadership'
    }))
  ];

  const orgUnits = Array.from({ length: 50 }, (_, i) => ({
    name: [`Automation COE`, `Digital Hub Mumbai`, `Fleet Logistics`, `Innovation Lab`][i % 4] + ` ${Math.floor(i/4) + 1}`,
    type: ['Functional Hub', 'Regional Team', 'Excellence Center', 'Project Unit'][i % 4],
    icon: [Network, Building2, Globe, Database, Cpu, Shield, Zap][i % 7],
    color: ['#7c3aed', '#10b981', '#3b82f6', '#059669', '#f59e0b', '#ef4444', '#06b6d4'][i % 7]
  }));

  const reportingLines = [
    { name: 'Sarah Jenkins', role: 'VP of Global Technology', level: 'Leader', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
<<<<<<< HEAD
    { name: 'John Smith (You)', role: 'Customer Service Rep', level: 'Me', image: userProfile.image },
=======
    { name: 'John Smith (You)', role: 'High School Tutor & Server', level: 'Me', image: userProfile.image },
>>>>>>> 0ee8d5b4dc861dd89fed0b044a1a428de994dc79
    ...Array.from({ length: 50 }, (_, i) => ({
      name: `Peer Specialist ${i + 1}`,
      role: ['Automation Lead', 'RPA Developer', 'Data Engineer', 'Product Owner'][i % 4],
      level: 'Peer',
      image: peerImages[i % peerImages.length]
    }))
  ];

  const parallelRoles: RoleData[] = [
    { id: 'p1', name: 'Intelligent Automation Architect', match: '92%', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', vacancy: true, group: 'parallel' },
    { id: 'p2', name: 'Senior Solutions Architect', match: '88%', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=200&h=200&fit=crop', vacancy: false, group: 'parallel' },
    { id: 'p3', name: 'Cloud Strategy Manager', match: '79%', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop', vacancy: false, group: 'parallel' },
    { id: 'p4', name: 'Technical Product Manager', match: '85%', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', vacancy: true, group: 'parallel' },
  ];

  const stretchRoles: RoleData[] = [
    { id: 's1', name: 'Enterprise Architect', match: '74%', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', vacancy: true, group: 'stretch' },
    { id: 's2', name: 'VP of Engineering', match: '68%', image: 'https://images.unsplash.com/photo-1560250094-0b914a27ae39?w=200&h=200&fit=crop', vacancy: true, group: 'stretch' },
    { id: 's3', name: 'Chief Architect', match: '72%', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', vacancy: false, group: 'stretch' },
    { id: 's4', name: 'Product Sales Area Manager', match: '81%', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop', vacancy: true, group: 'stretch' },
    { id: 's5', name: 'Senior Manager, Inside Sales', match: '75%', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', vacancy: false, group: 'stretch' },
  ];

  const renderRole = (role: RoleData) => (
    <div key={role.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 140 }}>
      <div style={{ position: 'relative', marginBottom: 6 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', cursor: 'pointer' }}>
          <Image src={role.image} width={64} height={64} alt={role.name} style={{ objectFit: 'cover' }} unoptimized />
        </div>
        <div style={{ position: 'absolute', bottom: -4, right: -4, background: '#84cc16', color: '#fff', fontSize: 9, fontWeight: 900, padding: '2px 5px', borderRadius: 8, border: '1.5px solid #fff', cursor: 'pointer' }}>{role.match}</div>
      </div>
      <p style={{ fontSize: 10, fontWeight: 800, color: '#334155', textAlign: 'center', margin: '0 0 2px', lineHeight: 1.2, height: 24, overflow: 'hidden' }}>{role.name}</p>
      {role.vacancy && <div style={{ background: '#84cc16', color: '#fff', fontSize: 7, fontWeight: 900, padding: '1px 5px', borderRadius: 2, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 2 }}><Target size={7} /> VACANCY</div>}
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 2000, fontFamily: "'Inter', sans-serif", overflowY: 'auto', color: '#1f2937' }}>
      
      {/* 1. Hero Banner */}
      <div style={{ width: '100%', height: 200, position: 'relative', overflow: 'hidden' }}>
         <Image src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1600&h=400&fit=crop" alt="Hertz Fleet" fill style={{ objectFit: 'cover' }} />
         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 70%)' }} />
         <div style={{ position: 'relative', zIndex: 1, padding: '40px 80px' }}>
            <h1 style={{ fontSize: 34, fontWeight: 950, color: '#fff', margin: 0, lineHeight: 1.1 }}>DRIVE YOUR<br />CAREER FORWARD.</h1>
         </div>
      </div>

      {/* 2. Tabs Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', borderBottom: '1px solid #e5e7eb', background: '#fff', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', gap: 30 }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '12px 0', background: 'none', border: 'none', fontSize: 12, fontWeight: 800, color: activeTab === tab ? '#7c3aed' : '#6b7280', borderBottom: activeTab === tab ? '3px solid #7c3aed' : '3px solid transparent', cursor: 'pointer', textTransform: 'uppercase' }}>{tab}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <div style={{ background: '#0ea5e9', color: '#fff', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12 }}>i</div>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}><X size={20} /></button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '15px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input type="text" placeholder="Search for roles or people in your organization" style={{ width: '100%', padding: '10px 16px', borderRadius: 4, border: '1px solid #d1d5db', fontSize: 13 }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 44, background: '#4b5563', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0 4px 4px 0' }}><Search size={18} /></div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1 style={{ fontSize: 24, color: '#7e22ce', fontWeight: 600 }}>{activeTab === 'MY SUGGESTED MOVES' ? 'What else could I do?...' : (activeTab === 'CAREER JOURNEYS' ? 'Explore Global Pathways' : (activeTab === 'OUR ORGANIZATION' ? 'Company Ecosystem' : 'Leadership Structure'))}</h1>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 60, position: 'relative' }}>
        {activeTab === 'MY SUGGESTED MOVES' && (
          <div style={{ position: 'relative' }}>
             
             {/* Dotted Curved Arrows Layer */}
             <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                <defs>
                  <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="#10b981" />
                  </marker>
                </defs>
                
                {/* Curved paths to Parallel Roles */}
                <path d="M 50% 50% Q 25% 45% 25% 18%" stroke="url(#curveGrad)" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrowhead)" opacity="0.4" />
                <path d="M 50% 50% Q 40% 45% 42% 18%" stroke="url(#curveGrad)" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrowhead)" opacity="0.4" />
                <path d="M 50% 50% Q 60% 45% 58% 18%" stroke="url(#curveGrad)" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrowhead)" opacity="0.4" />
                <path d="M 50% 50% Q 75% 45% 75% 18%" stroke="url(#curveGrad)" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrowhead)" opacity="0.4" />

                {/* Curved paths to Stretch Roles */}
                <path d="M 50% 50% Q 25% 55% 25% 82%" stroke="url(#curveGrad)" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrowhead)" opacity="0.4" />
                <path d="M 50% 50% Q 40% 55% 42% 82%" stroke="url(#curveGrad)" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrowhead)" opacity="0.4" />
                <path d="M 50% 50% Q 60% 55% 58% 82%" stroke="url(#curveGrad)" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrowhead)" opacity="0.4" />
                <path d="M 50% 50% Q 75% 55% 75% 82%" stroke="url(#curveGrad)" strokeWidth="2" strokeDasharray="6,4" fill="none" markerEnd="url(#arrowhead)" opacity="0.4" />
             </svg>

             <div style={{ marginBottom: 60 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 40px', borderBottom: '1px solid #f1f5f9', paddingBottom: 6, marginBottom: 20 }}>
                <h2 style={{ fontSize: 11, fontWeight: 900, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Parallel Roles</h2>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>{parallelRoles.map(renderRole)}</div>
            </div>

            <div style={{ position: 'relative', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', padding: 5, background: 'linear-gradient(135deg, #f59e0b, #10b981)', boxShadow: '0 0 35px rgba(16, 185, 129, 0.5)' }}>
                   <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff' }}><Image src={userProfile.image} width={100} height={100} alt="Me" style={{ objectFit: 'cover' }} /></div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 40px', borderTop: '1px solid #f1f5f9', paddingTop: 6, marginBottom: 20 }}>
                <h2 style={{ fontSize: 11, fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stretch Roles</h2>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>{stretchRoles.map(renderRole)}</div>
            </div>
          </div>
        )}

        {activeTab === 'CAREER JOURNEYS' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, padding: '0 40px' }}>
             {careerJourneys.map((path, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '20px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${path.color}15`, color: path.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Compass size={24} /></div>
                      <div style={{ background: '#f3f4f6', padding: '2px 8px', borderRadius: 10, fontSize: 9, fontWeight: 900, color: '#4b5563', textTransform: 'uppercase' }}>{path.level}</div>
                   </div>
                   <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111827', marginBottom: 6 }}>{path.title}</h3>
                   <p style={{ fontSize: 11, color: '#64748b', marginBottom: 12 }}>{path.description}</p>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                      <div>
                         <span style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>Target</span>
                         <span style={{ fontSize: 11, fontWeight: 800, color: '#1e293b' }}>{path.target}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <span style={{ fontSize: 10, fontWeight: 800, color: path.color, textTransform: 'uppercase', display: 'block' }}>Match</span>
                         <span style={{ fontSize: 11, fontWeight: 900, color: path.color }}>{path.match}</span>
                      </div>
                   </div>
                </motion.div>
             ))}
          </div>
        )}

        {/* ... (rest of the tabs content remains the same) */}
      </div>
    </div>
  );
}
