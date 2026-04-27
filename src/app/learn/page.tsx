'use client';

import { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Star, Play, CheckCircle, Award, Compass, Layout, Zap, Target, ArrowRight, Brain, Cpu, Database, Network, Users, Shield, Terminal, Globe, Code, Layers, Server, Car, Briefcase, TrendingUp, Anchor } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Automation & RPA', 'Agentic AI & IPA', 'IT & Software', 'Fleet & Ops', 'Leadership & HR'];

// Optimized, stable Unsplash collection for high-fidelity course cards
const courseImages = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555255707-c07966488bc0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
];

const courseDefinitions = [
  // Automation & RPA
  { title: 'Advanced UiPath Orchestrator Management', category: 'Automation & RPA', level: 'Advanced', tags: ['RPA', 'UiPath'] },
  { title: 'Blue Prism Professional Developer', category: 'Automation & RPA', level: 'Advanced', tags: ['RPA', 'Blue Prism'] },
  { title: 'Automation Anywhere: Master Class', category: 'Automation & RPA', level: 'Intermediate', tags: ['RPA', 'AA'] },
  
  // Agentic AI & IPA
  { title: 'Building Autonomous AI Agents with LangChain', category: 'Agentic AI & IPA', level: 'Advanced', tags: ['Agentic', 'AI'] },
  { title: 'IPA: Combining AI and RPA for Business Value', category: 'Agentic AI & IPA', level: 'Intermediate', tags: ['IPA', 'Cognitive'] },
  { title: 'Agentic Workflows for Enterprise Automation', category: 'Agentic AI & IPA', level: 'Advanced', tags: ['Agents', 'Automation'] },
  
  // Fleet & Ops
  { title: 'Global Fleet Logistics & Asset ROI', category: 'Fleet & Ops', level: 'Intermediate', tags: ['Fleet', 'Logistics'] },
  { title: 'EV Fleet Management & Infrastructure', category: 'Fleet & Ops', level: 'Advanced', tags: ['EV', 'Ops'] },
  { title: 'Predictive Maintenance in Fleet Tech', category: 'Fleet & Ops', level: 'Advanced', tags: ['AI', 'Fleet'] },

  // Leadership & HR
  { title: 'Strategic HRBP: Driving Organizational Value', category: 'Leadership & HR', level: 'Advanced', tags: ['HR', 'Business'] },
  { title: 'People Analytics for HR Leaders', category: 'Leadership & HR', level: 'Intermediate', tags: ['Data', 'HR'] },
  { title: 'Modern Talent Acquisition Strategies', category: 'Leadership & HR', level: 'Beginner', tags: ['Recruitment', 'HR'] },

  // Program Management & Solutions Architect
  { title: 'Technical Program Management: The TPM Playbook', category: 'IT & Software', level: 'Advanced', tags: ['Program', 'PM'] },
  { title: 'Enterprise Solutions Architecture Foundations', category: 'IT & Software', level: 'Intermediate', tags: ['Architecture', 'IT'] },
  { title: 'Cloud-Native Solutions Architect Certification', category: 'IT & Software', level: 'Advanced', tags: ['Cloud', 'Architect'] },

  ...Array.from({ length: 45 }, (_, i) => ({
    title: [
      `Advanced ${['RPA', 'Agentic AI', 'IPA', 'Fleet', 'HR', 'Program Mgmt', 'Architecture'][i % 7]} Specialization ${i + 1}`,
      `${['Strategic', 'Modern', 'Technical', 'Enterprise'][i % 4]} ${['Leadership', 'Development', 'Analysis', 'Strategy'][i % 4]} ${i + 1}`
    ][i % 2],
    category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1],
    level: ['Beginner', 'Intermediate', 'Advanced'][i % 3],
    tags: ['Core', 'Advanced', 'Specialization']
  }))
];

const ALL_COURSES = courseDefinitions.map((c, i) => ({
  id: `course-${i}`,
  title: c.title,
  category: c.category,
  rating: (Math.random() * 0.5 + 4.5).toFixed(1),
  students: (Math.random() * 4 + 1).toFixed(1) + 'k',
  duration: (Math.floor(Math.random() * 15) + 4) + 'h ' + (Math.floor(Math.random() * 59)) + 'm',
  image: courseImages[i % courseImages.length],
  provider: ['Hertz Academy', 'Global COE', 'Tech Institute'][i % 3],
  level: c.level,
  tags: c.tags
}));

export default function LearningHubPage() {
  const [activeTab, setActiveTab] = useState('Courses');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses = ALL_COURSES.filter(c => activeCategory === 'All' || c.category === activeCategory);

  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Hero Banner */}
      <div style={{ width: '100%', height: 260, position: 'relative', overflow: 'hidden' }}>
         <Image 
           src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop" 
           alt="Learning & Development" 
           fill 
           style={{ objectFit: 'cover' }}
           unoptimized
         />
         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, transparent 80%)' }} />
         <div style={{ position: 'relative', zIndex: 1, padding: '60px 100px' }}>
            <p style={{ fontSize: 12, fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>Learning Hub</p>
            <h1 style={{ fontSize: 42, fontWeight: 950, color: '#fff', margin: 0, lineHeight: 1.1 }}>PRECISION<br />LEARNING.</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 12, maxWidth: 600 }}>Precision-engineered courses and paths to close your skill gaps for your next move.</p>
         </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 20px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, borderBottom: '1px solid #f1f5f9', paddingBottom: 20 }}>
           <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                 <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  style={{ 
                    padding: '10px 20px', 
                    borderRadius: 12, 
                    border: 'none', 
                    background: activeCategory === cat ? '#1e293b' : '#f8fafc', 
                    color: activeCategory === cat ? '#fff' : '#64748b', 
                    fontWeight: 800, 
                    fontSize: 11, 
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                 >
                   {cat.toUpperCase()}
                 </button>
              ))}
           </div>
           <div style={{ background: '#f1f5f9', padding: '4px', borderRadius: 12, display: 'flex', gap: 4 }}>
              {['Courses', 'Pathways'].map(tab => (
                 <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  style={{ 
                    padding: '8px 24px', 
                    borderRadius: 10, 
                    border: 'none', 
                    background: activeTab === tab ? '#fff' : 'transparent', 
                    color: activeTab === tab ? '#1e293b' : '#64748b', 
                    fontWeight: 900, 
                    fontSize: 12, 
                    cursor: 'pointer',
                    boxShadow: activeTab === tab ? '0 4px 10px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.3s'
                  }}
                 >
                   {tab}
                 </button>
              ))}
           </div>
        </div>

        {activeTab === 'Courses' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30, paddingBottom: 100 }}>
             {filteredCourses.map(course => (
                <motion.div 
                  key={course.id} 
                  whileHover={{ y: -8 }}
                  style={{ 
                    background: '#fff', 
                    borderRadius: 24, 
                    border: '1px solid #f1f5f9', 
                    overflow: 'hidden', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)' 
                  }}
                >
                   <div style={{ width: '100%', height: 160, position: 'relative', background: '#f8fafc' }}>
                      <Image 
                        src={course.image} 
                        fill 
                        alt={course.title} 
                        style={{ objectFit: 'cover' }} 
                        unoptimized 
                      />
                      <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 900, color: '#1e293b', zIndex: 2 }}>
                         {course.level}
                      </div>
                   </div>
                   <div style={{ padding: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                         <span style={{ fontSize: 10, fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase' }}>{course.category}</span>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 800, color: '#b45309' }}>
                            <Star size={12} fill="#f59e0b" color="#f59e0b" /> {course.rating}
                         </div>
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 850, color: '#111827', margin: '0 0 12px', height: 44, overflow: 'hidden' }}>{course.title}</h3>
                      <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#94a3b8', fontWeight: 700, marginBottom: 20 }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {course.duration}</div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={12} /> {course.students}</div>
                      </div>
                      <button style={{ 
                        width: '100%', 
                        padding: '12px', 
                        borderRadius: 14, 
                        border: 'none', 
                        background: 'linear-gradient(90deg, #f59e0b, #ec4899)', 
                        color: '#fff', 
                        fontSize: 12, 
                        fontWeight: 900, 
                        textTransform: 'uppercase', 
                        cursor: 'pointer' 
                      }}>Start Learning</button>
                   </div>
                </motion.div>
             ))}
          </div>
        )}
      </div>
    </main>
  );
}
