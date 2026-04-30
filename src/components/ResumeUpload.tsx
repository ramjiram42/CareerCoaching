'use client';

import { UploadCloud, Cpu, Sparkles, ShieldCheck, ArrowRight, Zap, Target } from "lucide-react"
import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function ResumeUploadSection() {
  const [isUploading] = useState(false)
  const [resumeUploaded] = useState(true) 
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!resumeUploaded) {
    return (
       <div 
         onClick={() => !isUploading && fileInputRef.current?.click()}
         style={{
           width: '100%',
           background: '#0B1120',
           border: '2px dashed rgba(255,255,255,0.1)',
           padding: '80px',
           borderRadius: 32,
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           cursor: 'pointer',
           transition: 'all 0.4s ease',
           position: 'relative',
           overflow: 'hidden',
           boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
         }}
       >
         <input type="file" ref={fileInputRef} hidden />
         <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <UploadCloud size={32} color="#f59e0b" />
         </div>
         <h2 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: 0, fontFamily: '"Outfit", sans-serif' }}>Upload Professional History</h2>
         <p style={{ color: '#94A3B8', marginTop: 8, fontSize: 14 }}>Let our Neural Engine map your Hertz trajectory</p>
       </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, position: 'relative' }}>
       
       <div style={{
         width: '100%',
         maxWidth: 1000,
         background: 'transparent',
         borderRadius: 24,
         padding: '40px 50px',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         position: 'relative',
         overflow: 'hidden',
       }}>
          {/* NEURAL GRID BACKGROUND (SUBTLE) */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none', zIndex: 0 }}>
            <svg width="100%" height="100%">
              <pattern id="darkGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#darkGrid)" />
            </svg>
          </div>

          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'radial-gradient(circle at 0% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.08) 0%, transparent 40%)',
            zIndex: 0 
          }} />

          {/* LEFT: PROFILE DATA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, position: 'relative', zIndex: 1 }}>
             <div style={{ 
                position: 'relative',
                width: 120, 
                height: 120, 
                borderRadius: '50%', 
                padding: 4, 
                background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                boxShadow: '0 0 30px rgba(236, 72, 153, 0.2)',
             }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '5px solid #030B17' }}>
                   <Image src="/john_profile.png" width={120} height={120} alt="John" style={{ objectFit: 'cover', transform: 'scale(1.2) translateY(5%)' }} />
                </div>
                {/* Active Status Badge */}
                <div style={{ 
                   position: 'absolute', 
                   bottom: 4, 
                   right: 4, 
                   width: 32, 
                   height: 32, 
                   background: '#10B981', 
                   borderRadius: '50%', 
                   border: '4px solid #030B17', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center',
                   boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}>
                   <ShieldCheck size={16} color="#fff" />
                </div>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                   <h1 style={{ fontSize: 44, color: '#fff', margin: 0, fontWeight: 1000, fontFamily: '"Outfit", sans-serif', letterSpacing: '-0.02em', lineHeight: 0.9 }}>John Smith</h1>
                   <div style={{ 
                      padding: '4px 12px', 
                      background: 'rgba(16, 185, 129, 0.1)', 
                      border: '1px solid rgba(16, 185, 129, 0.2)', 
                      borderRadius: 12, 
                      fontSize: 10, 
                      fontWeight: 900, 
                      color: '#10B981', 
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                   }}>
                      Resume Active
                   </div>
                </div>
                <p style={{ fontSize: 18, color: '#94A3B8', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '4px 0', opacity: 0.8 }}>
                   Customer Service Rep
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                   <Cpu size={14} color="#f59e0b" />
                   <span style={{ fontSize: 13, fontWeight: 800, color: '#f59e0b', letterSpacing: '0.05em' }}>Neural Engine Ready</span>
                </div>
             </div>
          </div>

          {/* RIGHT: ACTIONS */}
          <div style={{ display: 'flex', gap: 20, position: 'relative', zIndex: 1 }}>
             <button 
               style={{ 
                 background: 'rgba(255,255,255,0.05)', 
                 color: '#fff', 
                 padding: '24px 36px', 
                 borderRadius: 18, 
                 fontWeight: 900, 
                 border: 'none', 
                 fontSize: 14, 
                 textTransform: 'uppercase', 
                 letterSpacing: '0.15em',
                 cursor: 'pointer',
                 transition: 'all 0.3s ease',
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                 e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                 e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
               }}
             >
                Upload Resume
             </button>
             <Link 
               href="/your-move"
               style={{ 
                 background: 'linear-gradient(135deg, #f59e0b, #ec4899)', 
                 color: '#fff', 
                 padding: '24px 36px', 
                 borderRadius: 20, 
                 fontWeight: 1000, 
                 border: 'none', 
                 fontSize: 14, 
                 textTransform: 'uppercase', 
                 letterSpacing: '0.15em',
                 cursor: 'pointer',
                 textDecoration: 'none',
                 display: 'flex',
                 alignItems: 'center',
                 gap: 12,
                 boxShadow: '0 15px 35px rgba(236, 72, 153, 0.4)',
                 transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                 e.currentTarget.style.boxShadow = '0 20px 45px rgba(236, 72, 153, 0.5)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0) scale(1)';
                 e.currentTarget.style.boxShadow = '0 15px 35px rgba(236, 72, 153, 0.4)';
               }}
             >
                Skip to Results <ArrowRight size={18} />
             </Link>
          </div>
       </div>

       {/* POWERED BY LINE */}
       <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: 0.6 }}>
          <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))' }} />
          <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, letterSpacing: '0.15em', margin: 0, textTransform: 'uppercase' }}>
             Hertz Career Forge is powered by <span style={{ color: '#fff' }}>Intelligent Neural Pathfinding.</span>
          </p>
          <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)' }} />
       </div>
    </div>
  );
}
