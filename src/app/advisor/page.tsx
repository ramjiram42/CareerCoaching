'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Send, Sparkles, User, ChevronRight, BookOpen, Users, TrendingUp, Briefcase, Brain, BarChart3, ArrowRight, X } from 'lucide-react'

// ─── Knowledge Base for John ─────────────────────────────
const JOHN_PROFILE = {
  name: 'John Smith',
  currentRole: 'Branch Manager / Operations',
  level: 'Mid-Senior',
  yearsExp: 9,
  location: 'Tulsa, OK',
  skills: ['Team Leadership', 'High-Volume Operations', 'Customer Experience', 'Process Management', 'Performance Coaching', 'Fleet Coordination'],
  gaps: ['P&L Ownership', 'Fleet Systems (inTouched)', 'Formal Budget Management', 'Enterprise Reporting'],
  readiness: 73,
  targetRole: 'Regional Operations Director',
  learningProgress: '2 / 5 modules complete',
  mentorSession: 'Alice Johnson — Tomorrow 10AM',
}

const HERTZ_ORG = {
  openRoles: ['Fleet Operations Coordinator', 'Operations Supervisor', 'HR Learning Coordinator', 'Mobility Site Lead', 'Enterprise Compliance Analyst'],
  inDemandSkills: ['P&L Management', 'Fleet Systems', 'Data Analysis', 'Cross-functional Leadership'],
  verticals: ['Fleet Management', 'Core Operations', 'Human Resources', 'Finance & Planning', 'Mobility', 'Legal & Compliance', 'International Ops', 'Communications', 'Tech & Digital'],
  upcomingGigs: ['Fleet Audit Support (2 weeks, Dallas)', 'HR Onboarding Facilitator (NY)', 'Financial Reporting Q2 (Chicago)'],
}

// ─── Response Engine ─────────────────────────────────────
type ResponseCard = {
  type: 'roles' | 'skills' | 'mentors' | 'readiness' | 'gigs' | 'paths' | 'adjacent' | 'succession'
  data: {
    title: string
    items: Array<{
      label: string
      sublabel?: string
      badge?: string
      badgeColor?: string
      pct?: number
      color?: string
    }>
  }
}

type Message = {
  role: 'user' | 'advisor'
  text: string
  time: string
  cards?: ResponseCard[]
  actions?: string[]
}

function now() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function buildResponse(input: string): { text: string; cards?: ResponseCard[]; actions?: string[] } {
  const q = input.toLowerCase()

  // ── Succession / backfill
  if (q.includes('backfill') || q.includes('succession') || q.includes('replace') || q.includes('who could')) {
    return {
      text: "Analysing succession readiness for **Operations Supervisor** across active employee signals, skill trajectory, and performance data:",
      cards: [{
        type: 'succession',
        data: {
          title: 'Succession Readiness — Operations Supervisor',
          items: [
            { label: 'John — You', sublabel: 'Strong operational leadership & team mgmt. Gap: formal P&L accountability.', badge: 'Ready now (73%)', badgeColor: '#22C55E', pct: 73, color: '#22C55E' },
            { label: 'Priya Mehta', sublabel: 'Cross-functional coordination & growing fleet exposure. Needs 6 months more.', badge: 'Ready in 6-12 mo (61%)', badgeColor: '#F59E0B', pct: 61, color: '#F59E0B' },
            { label: 'James Park', sublabel: 'High potential trajectory. Currently in leadership cohort. On track.', badge: 'Ready in 12-18 mo (44%)', badgeColor: '#EF4444', pct: 44, color: '#EF4444' },
          ]
        }
      }],
      actions: ['Who is ready for Fleet Ops Manager?', 'What gaps does John have?', 'Compare development plans']
    }
  }

  // ── Skills / gaps
  if (q.includes('skill') || q.includes('gap') || q.includes('develop') || q.includes('learn') || q.includes('improve')) {
    return {
      text: "Based on John's current role and target of **Regional Operations Director**, here are the priority skill gaps and recommended actions:",
      cards: [{
        type: 'skills',
        data: {
          title: "John's Skill Priority Map",
          items: [
            { label: 'P&L & Budget Ownership', sublabel: 'Critical gap — complete Finance for Ops Managers course (2 weeks)', badge: 'High Priority', badgeColor: '#EF4444', pct: 20, color: '#EF4444' },
            { label: 'Fleet Systems (inTouched)', sublabel: 'Take the Fleet Readiness gig in Dallas — 2 weeks hands-on', badge: 'Medium', badgeColor: '#F59E0B', pct: 35, color: '#F59E0B' },
            { label: 'Enterprise Reporting', sublabel: 'Module 3 in active learning path — 15hrs remaining', badge: 'In Progress', badgeColor: '#3B82F6', pct: 55, color: '#3B82F6' },
            { label: 'Cross-functional Leadership', sublabel: 'Already strong — leverage with mentor Alice Johnson', badge: 'Strong', badgeColor: '#22C55E', pct: 80, color: '#22C55E' },
          ]
        }
      }],
      actions: ['Show me the learning path', 'Find a gig that builds Fleet skills', 'Book a mentor session']
    }
  }

  // ── Mentor matching
  if (q.includes('mentor') || q.includes('coach') || q.includes('guide') || q.includes('session') || q.includes('book')) {
    return {
      text: "Matching mentors based on **career path similarity to John**, skill overlap, and active availability:",
      cards: [{
        type: 'mentors',
        data: {
          title: 'Mentor Matches for John',
          items: [
            { label: 'Alice Johnson — SAP Project Mgmt', sublabel: 'Made exact Operations → Director transition. ⭐ 4.8 rating, 45 sessions. Available tomorrow 10AM', badge: '98% match', badgeColor: '#22C55E' },
            { label: 'Liam Neeson — Risk Management', sublabel: 'Strong compliance & reporting background. 120 sessions, 22 years exp.', badge: '84% match', badgeColor: '#3B82F6' },
            { label: 'Diana Prince — Digital Transformation', sublabel: 'Fleet systems expertise. Closed similar skill gaps. ⭐ 5.0 rating.', badge: '79% match', badgeColor: '#6B7280' },
          ]
        }
      }],
      actions: ['Book Alice Johnson', 'See all mentors', 'What should I discuss with a mentor?']
    }
  }

  // ── Adjacent roles / what others did
  if (q.includes('adjacent') || q.includes('similar') || q.includes('others') || q.includes('profile') || q.includes('like me') || q.includes('transition')) {
    return {
      text: "Employees with **similar profiles to John** (Branch Manager / Ops, 9 years) have successfully transitioned into these roles at Hertz:",
      cards: [{
        type: 'adjacent',
        data: {
          title: 'What Employees Like John Did Next',
          items: [
            { label: 'Fleet Operations Coordinator', sublabel: '62% of similar employees moved here first — fastest path', badge: 'Most Common', badgeColor: '#22C55E', pct: 62, color: '#22C55E' },
            { label: 'Operations Supervisor', sublabel: '51% moved directly — strong overlap with current responsibilities', badge: 'Direct Match', badgeColor: '#3B82F6', pct: 51, color: '#3B82F6' },
            { label: 'HR Learning Coordinator', sublabel: '28% with coaching interest made this lateral move', badge: 'Lateral', badgeColor: '#8B5CF6', pct: 28, color: '#8B5CF6' },
            { label: 'Mobility Site Lead', sublabel: '18% took a gig here and converted to full-time', badge: 'Gig-to-Hire', badgeColor: '#F59E0B', pct: 18, color: '#F59E0B' },
          ]
        }
      }],
      actions: ['Tell me more about Operations Supervisor', 'What gigs lead to Fleet Ops?', 'Show full career paths']
    }
  }

  // ── Gigs
  if (q.includes('gig') || q.includes('project') || q.includes('short') || q.includes('assignment') || q.includes('temporary')) {
    return {
      text: "Here are **active gigs** that match John's profile and build toward the target role of Regional Operations Director:",
      cards: [{
        type: 'gigs',
        data: {
          title: 'Recommended Gigs for John',
          items: [
            { label: 'Fleet Audit Support — 2 Weeks', sublabel: 'Dallas, TX · Fleet Management · $28/hr · Builds inTouched fleet system skills', badge: 'Urgent', badgeColor: '#EF4444' },
            { label: 'HR Onboarding Facilitator', sublabel: 'New York, NY · People Dev · $30/hr · Strengthens coaching capability', badge: 'Great Fit', badgeColor: '#22C55E' },
            { label: 'Financial Reporting Analyst — Q2', sublabel: 'Chicago, IL · Finance · $33/hr · Closes P&L gap fastest', badge: 'Top Pick', badgeColor: '#FFD100' },
          ]
        }
      }],
      actions: ['Apply to Fleet Audit gig', 'What skills does each gig build?', 'Show all gigs']
    }
  }

  // ── Readiness / am I ready
  if (q.includes('ready') || q.includes('readiness') || q.includes('prepared') || q.includes('score') || q.includes('promotion')) {
    return {
      text: `John is currently **${JOHN_PROFILE.readiness}% ready** for Regional Operations Director. Here's the breakdown:`,
      cards: [{
        type: 'readiness',
        data: {
          title: `Readiness Breakdown — ${JOHN_PROFILE.targetRole}`,
          items: [
            { label: 'Operational Leadership', sublabel: 'Exceeds requirements — 9 yrs high-volume ops', badge: '95%', badgeColor: '#22C55E', pct: 95, color: '#22C55E' },
            { label: 'Team Management', sublabel: 'Regular performance coaching — strong signals', badge: '88%', badgeColor: '#22C55E', pct: 88, color: '#22C55E' },
            { label: 'Learning Progress', sublabel: '2 of 5 modules complete — 3 remaining', badge: '40%', badgeColor: '#F59E0B', pct: 40, color: '#F59E0B' },
            { label: 'Budget / P&L Ownership', sublabel: 'No formal experience yet — biggest gap to close', badge: '20%', badgeColor: '#EF4444', pct: 20, color: '#EF4444' },
            { label: 'Cross-Vertical Exposure', sublabel: 'Some fleet experience — needs more breadth', badge: '48%', badgeColor: '#F59E0B', pct: 48, color: '#F59E0B' },
          ]
        }
      }],
      actions: ['What must I do to reach 85%?', 'How long will it take?', 'Show me a 90-day plan']
    }
  }

  // ── 90-day plan
  if (q.includes('90') || q.includes('plan') || q.includes('action') || q.includes('steps') || q.includes('roadmap') || q.includes('timeline')) {
    return {
      text: "Here's John's **personalised 90-day development plan** based on current readiness gaps and available opportunities:",
      cards: [{
        type: 'paths',
        data: {
          title: '90-Day Action Plan for John',
          items: [
            { label: 'Week 1-2: Complete Enterprise Reporting module', sublabel: 'Module 3 in active learning path — closes reporting gap', badge: 'Learning', badgeColor: '#3B82F6' },
            { label: 'Week 3-4: Fleet Audit Gig (Dallas)', sublabel: 'Build inTouched system hands-on — Urgent, available now', badge: 'Gig', badgeColor: '#F59E0B' },
            { label: 'Week 5-6: Mentor session with Alice Johnson', sublabel: 'Focus: P&L accountability + executive presence coaching', badge: 'Mentor', badgeColor: '#8B5CF6' },
            { label: 'Week 7-10: Finance for Ops Managers course', sublabel: 'Closes the P&L budget ownership gap — highest priority', badge: 'Learning', badgeColor: '#3B82F6' },
            { label: 'Week 11-13: Apply for Operations Supervisor role', sublabel: 'Internal posting expected Q2 — John will be 85%+ ready', badge: 'Apply', badgeColor: '#22C55E' },
          ]
        }
      }],
      actions: ['Book mentor session', 'Apply to Fleet Audit gig', 'Start Enterprise Reporting module']
    }
  }

  // ── What roles match / role recommendations
  if (q.includes('role') || q.includes('match') || q.includes('recommend') || q.includes('next') || q.includes('move') || q.includes('option')) {
    return {
      text: "Based on John's profile, skills, and the current Hertz opportunity landscape — here are the **best-fit role moves** right now:",
      cards: [{
        type: 'roles',
        data: {
          title: 'Best Role Matches for John',
          items: [
            { label: 'Operations Supervisor — Core Ops', sublabel: 'Strongest skills overlap. 73% ready. Internal posting in Q2.', badge: '87% match', badgeColor: '#22C55E', pct: 87, color: '#22C55E' },
            { label: 'Fleet Operations Coordinator — Fleet Mgmt', sublabel: 'Natural next step. Builds fleet system skills for future Director role.', badge: '81% match', badgeColor: '#22C55E', pct: 81, color: '#22C55E' },
            { label: 'HR Learning Coordinator — People Dev', sublabel: 'Lateral move leveraging coaching background. Lower competition.', badge: '68% match', badgeColor: '#F59E0B', pct: 68, color: '#F59E0B' },
            { label: 'Mobility Site Lead — Mobility', sublabel: 'Growth vertical with leadership headroom. Bold move.', badge: '59% match', badgeColor: '#F59E0B', pct: 59, color: '#F59E0B' },
          ]
        }
      }],
      actions: ['Tell me more about Operations Supervisor', 'What do I need for Fleet Ops Coordinator?', 'Show my skill gaps']
    }
  }

  // ── Default
  return {
    text: `I'm your Hertz Career Advisor. I know John's profile, all open Hertz roles, and what your 9 corporate verticals require. Ask me anything about career moves, skill gaps, mentors, or gig opportunities.`,
    actions: ['What roles match my profile?', 'Where am I ready today?', 'What are my top skill gaps?', 'Who should I get as a mentor?']
  }
}

// ─── Suggestion Groups ───────────────────────────────────
const SUGGESTION_GROUPS = [
  { icon: TrendingUp, label: 'What roles match my profile?', color: '#22C55E' },
  { icon: Brain, label: 'What are my top skill gaps?', color: '#EF4444' },
  { icon: BarChart3, label: 'How ready am I for promotion?', color: '#FFD100' },
  { icon: Users, label: 'Match me with a mentor', color: '#8B5CF6' },
  { icon: Briefcase, label: 'Find gigs that build my skills', color: '#F59E0B' },
  { icon: BookOpen, label: 'Build my 90-day plan', color: '#3B82F6' },
  { icon: User, label: 'What did others like me do?', color: '#14B8A6' },
  { icon: Sparkles, label: 'Who could backfill my role?', color: '#EC4899' },
]

// ─── Card Renderer ───────────────────────────────────────
function ResponseCardView({ card }: { card: ResponseCard }) {
  return (
    <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: 16, overflow: 'hidden', marginTop: '0.75rem' }}>
      <div style={{ background: '#000', padding: '0.75rem 1.25rem' }}>
        <p style={{ color: '#FFD100', fontWeight: 800, fontSize: '0.8rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{card.data.title}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
        {card.data.items.map((item, i) => (
          <div key={i} style={{ padding: '0.9rem 1.25rem', background: i % 2 === 0 ? '#fff' : '#FAFAFA', borderBottom: i < card.data.items.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 800, fontSize: '0.875rem', color: '#111827', margin: '0 0 0.2rem' }}>{item.label}</p>
                {item.sublabel && <p style={{ fontSize: '0.78rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{item.sublabel}</p>}
                {item.pct !== undefined && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ height: 4, background: '#E5E7EB', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.pct}%`, background: item.color || '#FFD100', borderRadius: 99, transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                )}
              </div>
              {item.badge && (
                <span style={{ background: item.badgeColor + '18', color: item.badgeColor, border: `1px solid ${item.badgeColor}40`, padding: '0.2rem 0.65rem', borderRadius: 999, fontSize: '0.7rem', fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────
export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'advisor',
      time: now(),
      text: `Hello John! I'm your Hertz Career Advisor. I have full context on your profile, all open roles across Hertz's 9 verticals, your skill gaps, available gigs, and mentors who've made similar transitions.\n\nWhat would you like to explore today?`,
      actions: ['What roles match my profile?', 'How ready am I for promotion?', 'Build my 90-day plan', 'Who should mentor me?']
    }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text?: string) => {
    const q = (text || input).trim()
    if (!q) return
    const userMsg: Message = { role: 'user', text: q, time: now() }
    setMessages(p => [...p, userMsg])
    setInput('')
    setTyping(true)

    const delay = 900 + Math.random() * 600
    setTimeout(() => {
      const res = buildResponse(q)
      setTyping(false)
      setMessages(p => [...p, { role: 'advisor', text: res.text, time: now(), cards: res.cards, actions: res.actions }])
    }, delay)
  }

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Page Header ─────────────────── */}
      <div style={{ background: '#000', padding: '2rem 0', borderBottom: '4px solid #FFD100' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#FFD100', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 0.4rem' }}>Hertz Internal</p>
            <h1 style={{ color: '#fff', fontSize: '2.25rem', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>Career Advisor</h1>
            <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: '0.4rem' }}>Knows your profile · All Hertz roles · Live gigs · Mentors · Your skill gaps</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ background: '#111827', borderRadius: 16, padding: '1rem 1.5rem', textAlign: 'right' }}>
              <p style={{ color: '#FFD100', fontWeight: 900, fontSize: '1.8rem', margin: 0, lineHeight: 1 }}>{JOHN_PROFILE.readiness}%</p>
              <p style={{ color: '#9CA3AF', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>Readiness Score</p>
            </div>
            <div style={{ background: '#111827', borderRadius: 16, padding: '1rem 1.5rem' }}>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem', margin: '0 0 0.15rem' }}>{JOHN_PROFILE.name}</p>
              <p style={{ color: '#9CA3AF', fontSize: '0.72rem', margin: 0 }}>{JOHN_PROFILE.currentRole}</p>
              <p style={{ color: '#FFD100', fontSize: '0.72rem', fontWeight: 700, margin: '0.15rem 0 0' }}>→ {JOHN_PROFILE.targetRole}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', paddingTop: '2rem', paddingBottom: '3rem', alignItems: 'start' }}>

        {/* ── Left Sidebar ─────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '5rem' }}>

          {/* Quick Start Panel */}
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F1F5F9' }}>
              <p style={{ fontWeight: 900, fontSize: '0.8rem', color: '#000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ask the Advisor</p>
            </div>
            <div style={{ padding: '0.5rem' }}>
              {SUGGESTION_GROUPS.map((s, i) => {
                const Icon = s.icon
                return (
                  <button key={i} onClick={() => send(s.label)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0.75rem', borderRadius: 12, border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{ width: 32, height: 32, background: s.color + '18', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} color={s.color} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', lineHeight: 1.3 }}>{s.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Ram's Status */}
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <p style={{ fontWeight: 900, fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 1rem' }}>John's Profile</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Current Role', val: JOHN_PROFILE.currentRole },
                { label: 'Target', val: JOHN_PROFILE.targetRole },
                { label: 'Experience', val: `${JOHN_PROFILE.yearsExp} years` },
                { label: 'Learning', val: JOHN_PROFILE.learningProgress },
                { label: 'Next Mentor', val: JOHN_PROFILE.mentorSession },
              ].map(row => (
                <div key={row.label}>
                  <p style={{ fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.2rem' }}>{row.label}</p>
                  <p style={{ fontSize: '0.8rem', color: '#111827', fontWeight: 700, margin: 0 }}>{row.val}</p>
                </div>
              ))}
            </div>
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginTop: '1.25rem', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '0.6rem', fontSize: '0.75rem', fontWeight: 800, color: '#374151', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              View Full Dashboard <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* ── Chat Area ────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: '70vh' }}>

          {/* Messages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '0.5rem' }}>

                {/* Avatar + Name */}
                {msg.role === 'advisor' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 28, height: 28, background: '#FFD100', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={14} color="#000" />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#000' }}>Hertz Career Advisor</span>
                    <span style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>{msg.time}</span>
                  </div>
                )}

                {/* Bubble */}
                <div style={{
                  maxWidth: msg.role === 'user' ? '65%' : '100%',
                  background: msg.role === 'user' ? '#000' : '#fff',
                  border: msg.role === 'advisor' ? '1px solid #E5E7EB' : 'none',
                  borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '4px 20px 20px 20px',
                  padding: '1rem 1.25rem',
                  boxShadow: msg.role === 'advisor' ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                  width: msg.role === 'advisor' ? '100%' : 'auto',
                }}>
                  <p style={{ fontSize: '0.925rem', lineHeight: 1.65, color: msg.role === 'user' ? '#fff' : '#111827', fontWeight: 500, margin: 0, whiteSpace: 'pre-wrap' }}>
                    {msg.text.split('**').map((part, j) =>
                      j % 2 === 1
                        ? <strong key={j} style={{ color: msg.role === 'user' ? '#FFD100' : '#000', fontWeight: 900 }}>{part}</strong>
                        : part
                    )}
                  </p>
                </div>

                {/* Cards */}
                {msg.role === 'advisor' && msg.cards && msg.cards.map((card, ci) => (
                  <div key={ci} style={{ width: '100%' }}>
                    <ResponseCardView card={card} />
                  </div>
                ))}

                {/* Follow-up action chips */}
                {msg.role === 'advisor' && msg.actions && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                    {msg.actions.map(action => (
                      <button key={action} onClick={() => send(action)} style={{ background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 999, padding: '0.4rem 0.9rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', color: '#374151', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#FFD100'; e.currentTarget.style.borderColor = '#FFD100'; e.currentTarget.style.color = '#000' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#F9FAFB'; e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#374151' }}>
                        <ChevronRight size={12} /> {action}
                      </button>
                    ))}
                  </div>
                )}

                {/* User timestamp */}
                {msg.role === 'user' && <span style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>John · {msg.time}</span>}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 28, height: 28, background: '#FFD100', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={14} color="#000" />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#000' }}>Hertz Career Advisor</span>
                </div>
                <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '4px 20px 20px 20px', padding: '1rem 1.25rem', display: 'flex', gap: '4px', alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  {[0, 1, 2].map(d => (
                    <div key={d} style={{ width: 7, height: 7, background: '#FFD100', borderRadius: '50%', animation: `advisorBounce 1.2s ease-in-out ${d * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── Input Bar ────────────────── */}
          <div style={{ position: 'sticky', bottom: '1.5rem', background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 20, padding: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-end', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Ask about your career path, skill gaps, open roles, gigs, mentors..."
              rows={1}
              style={{ flex: 1, resize: 'none', border: 'none', outline: 'none', fontSize: '0.95rem', lineHeight: 1.5, color: '#111827', background: 'transparent', padding: '0.25rem 0.5rem' }}
            />
            <button onClick={() => send()} style={{ width: 44, height: 44, background: input.trim() ? '#FFD100' : '#F1F5F9', border: 'none', borderRadius: 14, cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
              <Send size={18} color={input.trim() ? '#000' : '#9CA3AF'} />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes advisorBounce { 0%,100%{transform:translateY(0);opacity:0.4} 50%{transform:translateY(-5px);opacity:1} }
        textarea { scrollbar-width: none; }
        textarea::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  )
}
