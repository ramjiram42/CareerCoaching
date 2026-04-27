'use client';

import { Briefcase, Search, ArrowRight, TrendingUp, UploadCloud, CheckCircle2, Loader2, X, Sparkles, Filter, MapPin, Building2, Zap, Target } from "lucide-react"
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import jobsData from '../../../public/data/jobs.json'

export default function JobsPortal() {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true)
      setTimeout(() => { setIsUploading(false); setResumeUploaded(true) }, 2500)
    }
  }

  let filteredJobs = jobsData.filter(job =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (location === '' || job.location.toLowerCase().includes(location.toLowerCase()))
  )

  if (resumeUploaded && searchTerm === '' && location === '') {
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes('manager') ||
      job.title.toLowerCase().includes('director') ||
      job.title.toLowerCase().includes('strategy') ||
      job.title.toLowerCase().includes('architect')
    ).slice(0, 8)
  } else {
    filteredJobs = filteredJobs.slice(0, 100)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden' }}>
      {/* Dynamic Animated Hero with Beautiful Background */}
      <div style={{ 
        background: '#020617', 
        backgroundImage: 'linear-gradient(rgba(2, 6, 23, 0.85), rgba(2, 6, 23, 0.95)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 0 100px', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Animated background elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
          >
             <div style={{ position: 'relative' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 20px #3B82F6' }}></div>
                <motion.div 
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid #60A5FA' }}
                />
             </div>
             <p style={{ color: '#60A5FA', fontSize: 14, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', margin: 0 }}>Strategic Recruitment ECU</p>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ color: '#fff', fontSize: 82, fontWeight: 1000, letterSpacing: '-0.05em', margin: '0 0 20px', lineHeight: 0.85 }}
          >
            Unified <br /> 
            <span style={{ position: 'relative' }}>
              <span style={{ background: 'linear-gradient(90deg, #60A5FA, #A855F7, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Opportunities</span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1 }}
                style={{ position: 'absolute', bottom: 10, left: 0, height: 4, background: 'linear-gradient(90deg, #60A5FA, transparent)', borderRadius: 2 }}
              />
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ color: '#94A3B8', fontSize: 22, maxWidth: 650, fontWeight: 500, lineHeight: 1.4, letterSpacing: '0.01em' }}
          >
            Access <span style={{ color: '#fff', fontWeight: 700 }}>{jobsData.length.toLocaleString()}+</span> high-altitude vacancies precision-matched by Hertz Intelligence.
          </motion.p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1400, margin: '-60px auto 0', padding: '0 40px', position: 'relative', zIndex: 10 }}>
        
        {/* Enhanced Search & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', background: '#fff', borderRadius: 24, padding: '10px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', border: '1px solid #E2E8F0', marginBottom: 40 }}
        >
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 20px', borderRight: '1px solid #F1F5F9' }}>
            <Search size={20} color="#94A3B8" style={{ marginRight: 15 }} />
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.1em' }}>Role Search</div>
              <input
                type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                placeholder="Job title or keywords..."
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: 16, color: '#0F172A', fontWeight: 600, padding: '4px 0' }}
              />
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 20px', borderRight: '1px solid #F1F5F9' }}>
            <MapPin size={20} color="#94A3B8" style={{ marginRight: 15 }} />
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.1em' }}>Location</div>
              <input
                type="text" value={location} onChange={e => setLocation(e.target.value)}
                placeholder="City or remote..."
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: 16, color: '#0F172A', fontWeight: 600, padding: '4px 0' }}
              />
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ padding: '0 35px', background: 'linear-gradient(135deg, #0F172A, #1E293B)', color: '#fff', border: 'none', borderRadius: 16, cursor: 'pointer', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', gap: 10 }}
          >
            Explore Roles <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        {/* Dynamic Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 40 }}>
          {/* Sidebar Tools */}
          <aside>
            <AnimatePresence mode="wait">
              {!resumeUploaded ? (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => fileInputRef.current?.click()}
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', borderRadius: 24, padding: 30, color: '#fff', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '50%' }}
                  />
                  <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                      {isUploading ? <Loader2 className="animate-spin" size={24} /> : <UploadCloud size={24} />}
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 10px', lineHeight: 1.2 }}>Profile Intelligence</h3>
                    <p style={{ fontSize: 13, opacity: 0.9, fontWeight: 500, margin: 0 }}>Upload your resume to unlock AI-powered precision matching.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ background: '#fff', border: '1px solid #10B981', borderRadius: 24, padding: 24, textAlign: 'center' }}
                >
                  <div style={{ background: '#ECFDF5', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                    <CheckCircle2 size={24} color="#10B981" />
                  </div>
                  <h4 style={{ color: '#064E3B', fontWeight: 800, margin: '0 0 5px' }}>Profile Optimized</h4>
                  <p style={{ color: '#34D399', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Hertz Intelligence Active</p>
                  <button 
                    onClick={() => setResumeUploaded(false)}
                    style={{ marginTop: 15, background: '#F1F5F9', border: 'none', padding: '8px 16px', borderRadius: 8, color: '#64748B', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Reset Filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ marginTop: 30, background: '#fff', borderRadius: 24, padding: 24, border: '1px solid #E2E8F0' }}>
              <h4 style={{ color: '#0F172A', fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Filter size={14} /> Quick Filters
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Full Time', 'Remote', 'Contract', 'Gigs', 'Executive', 'Entry Level'].map(f => (
                  <button key={f} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#64748B', cursor: 'pointer' }}>{f}</button>
                ))}
              </div>
            </div>
          </aside>

          {/* Jobs List */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {resumeUploaded ? 'Precision Matches for You' : 'Live Opportunities'} 
                <span style={{ color: '#94A3B8', fontWeight: 500, marginLeft: 10 }}>({filteredJobs.length})</span>
              </h2>
              <div style={{ display: 'flex', gap: 15, color: '#64748B', fontSize: 13, fontWeight: 600 }}>
                <span>Sort by: <strong style={{ color: '#0F172A' }}>Newest</strong></span>
              </div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, paddingBottom: 100 }}
            >
              {filteredJobs.map((job, idx) => {
                const isMatch = resumeUploaded && searchTerm === '' && location === '';
                const matchScore = 85 + (idx % 10);
                
                return (
                  <motion.div
                    key={job.id + idx}
                    variants={itemVariants}
                    whileHover={{ x: 10, borderColor: '#3B82F6' }}
                    style={{ 
                      background: '#fff', 
                      borderRadius: 24, 
                      padding: 24, 
                      border: '1px solid #E2E8F0', 
                      display: 'grid', 
                      gridTemplateColumns: '1fr auto',
                      gap: 20,
                      alignItems: 'center',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isMatch && (
                      <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: 'linear-gradient(to bottom, #3B82F6, #EC4899)' }} />
                    )}

                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                      <div style={{ width: 60, height: 60, borderRadius: 16, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                        <Building2 size={24} color="#64748B" />
                      </div>
                      <div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#3B82F6', background: '#EFF6FF', padding: '2px 8px', borderRadius: 4 }}>{job.category}</span>
                          {isMatch && (
                            <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8B5CF6', background: '#F5F3FF', padding: '2px 8px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Sparkles size={10} /> {matchScore}% Match
                            </span>
                          )}
                        </div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>{job.title}</h3>
                        <div style={{ display: 'flex', gap: 15, fontSize: 14, color: '#64748B', fontWeight: 500 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {job.location}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Zap size={14} /> Immediate Start</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                      <Link 
                        href="/career-tree" 
                        style={{ padding: '12px 20px', borderRadius: 12, border: '1px solid #E2E8F0', color: '#0F172A', textDecoration: 'none', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}
                      >
                        <Target size={16} /> Simulate Path
                      </Link>
                      <Link 
                        href="/jobs" 
                        style={{ padding: '12px 24px', borderRadius: 12, background: '#0F172A', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}
                      >
                        Apply <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
