'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'

const advisorResponses: Record<string, string> = {
  default: "Great question! Based on John's profile — High School Tutor & Server with strong operational leadership — let me analyse the best next moves across Hertz verticals.",
  match: "Based on John's profile: **Operations Supervisor (Core Ops)** is your strongest match at ~87% readiness. You have people leadership and high-volume execution experience that directly maps to this role. Key gap: formal P&L accountability.",
  skills: "Your top 3 skill gaps to close are: **1.** P&L and budget ownership **2.** Fleet management systems (e.g. inTouched) **3.** Formal performance coaching frameworks. Each can be addressed in 4–6 weeks with focused development.",
  mentor: "For Fleet Management, I recommend **Diana Prince** (EVP Digital Transformation, 20 years, ⭐ 5.0) or checking the Mentors page for someone with a Fleet Operations background. Both have active availability.",
  ready: "John is approximately **73% ready** for Operations Supervisor right now. The remaining 27% is addressable through: completing the Active Learning Path (2 modules left) and 1 targeted coaching session with a Branch Director.",
  path: "The fastest path for John is: **Operations Supervisor → Regional Operations Manager → Enterprise Operations Executive**. With 10hrs/week development, this is achievable in ~18–24 months. The 'Desired Path' section below shows all three route options.",
}

function getResponse(input: string): string {
  const q = input.toLowerCase()
  if (q.includes('match') || q.includes('recommend') || q.includes('suit')) return advisorResponses.match
  if (q.includes('skill') || q.includes('gap') || q.includes('develop')) return advisorResponses.skills
  if (q.includes('mentor') || q.includes('coach') || q.includes('guide')) return advisorResponses.mentor
  if (q.includes('ready') || q.includes('readiness') || q.includes('prepared')) return advisorResponses.ready
  if (q.includes('path') || q.includes('route') || q.includes('journey') || q.includes('career')) return advisorResponses.path
  return advisorResponses.default
}

type Message = { role: 'user' | 'advisor'; text: string; time: string }

const suggestions = [
  "What roles match my profile?",
  "What skills should I develop?",
  "Am I ready for Operations Supervisor?",
  "Suggest a mentor for Fleet Management",
]

export function CareerAdvisor() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'advisor', text: "Hi John! I'm your Hertz Career Advisor. I've analysed your profile and readiness signals. Ask me anything about your next move.", time: 'Now' }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text?: string) => {
    const q = text || input
    if (!q.trim()) return
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { role: 'user', text: q, time: now }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { role: 'advisor', text: getResponse(q), time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }])
    }, 1200)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: 56, height: 56, borderRadius: '50%', background: '#000', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', zIndex: 1000, transition: 'all 0.2s' }}
      >
        {open ? <X size={22} color="#FFD100" /> : <MessageCircle size={22} color="#FFD100" />}
        {!open && <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: '#22C55E', borderRadius: '50%', border: '2px solid #fff' }} />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div style={{ position: 'fixed', bottom: '5.5rem', right: '2rem', width: 420, height: 580, background: '#fff', borderRadius: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.2)', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', zIndex: 999, overflow: 'hidden' }}>

          {/* Header */}
          <div style={{ background: '#000', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, background: '#FFD100', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={18} color="#000" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 900, fontSize: '0.9rem', color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>Hertz Career Advisor</p>
              <p style={{ fontSize: '0.7rem', color: '#9CA3AF', margin: 0 }}>● Online — responds instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#F8FAFC' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '0.35rem' }}>
                {msg.role === 'advisor' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.1rem' }}>
                    <div style={{ width: 22, height: 22, background: '#FFD100', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={12} color="#000" />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#000' }}>Hertz Advisor</span>
                    <span style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>{msg.time}</span>
                  </div>
                )}
                <div style={{
                  maxWidth: '80%',
                  background: msg.role === 'user' ? '#000' : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#111827',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                  fontSize: '0.875rem',
                  lineHeight: 1.55,
                  fontWeight: 500,
                  border: msg.role === 'advisor' ? '1px solid #E5E7EB' : 'none',
                  boxShadow: msg.role === 'advisor' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.text.split('**').map((part, j) =>
                    j % 2 === 1 ? <strong key={j} style={{ color: msg.role === 'user' ? '#FFD100' : '#000' }}>{part}</strong> : part
                  )}
                </div>
                {msg.role === 'user' && <span style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>{msg.time}</span>}
              </div>
            ))}

            {typing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 22, height: 22, background: '#FFD100', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={12} color="#000" />
                </div>
                <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '4px 16px 16px 16px', padding: '0.75rem 1rem', display: 'flex', gap: '3px', alignItems: 'center' }}>
                  {[0,1,2].map(d => <div key={d} style={{ width: 6, height: 6, background: '#D1D5DB', borderRadius: '50%', animation: `bounce 1.2s ease-in-out ${d * 0.2}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', background: '#fff' }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => send(s)} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 999, padding: '0.3rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', color: '#374151', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '0.5rem', background: '#fff' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about your career path..."
              style={{ flex: 1, border: '1.5px solid #E5E7EB', borderRadius: 12, padding: '0.65rem 1rem', fontSize: '0.875rem', outline: 'none', color: '#111827', background: '#F9FAFB' }}
            />
            <button onClick={() => send()} style={{ width: 40, height: 40, background: '#FFD100', border: 'none', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Send size={16} color="#000" />
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </>
  )
}
