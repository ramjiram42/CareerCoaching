import { Award, Download, ShieldCheck } from 'lucide-react'

// Static data — DB removed for Vercel deployment
const REPORT_DATA = {
  name: 'John',
  targetRole: 'Regional Operations Director',
  totalHours: 12,
  completedModules: 1,
  mentorSessions: 2,
  topSkillLevel: 'Level 5',
}

export default function ReportsPage() {
  return (
    <main className="container">
      <div className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Readiness Summary</h1>
          <p>Your official transition report and certificate.</p>
        </div>
        <button className="btn btn-outline">
          <Download size={18} /> Download PDF
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="premium-card flex flex-col gap-6">
          <h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem', margin: 0 }}>
            Metrics &amp; Achievements
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{REPORT_DATA.totalHours}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Learning Hours</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>{REPORT_DATA.completedModules}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Completed Module</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>{REPORT_DATA.mentorSessions}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Mentor Sessions</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#F59E0B' }}>{REPORT_DATA.topSkillLevel}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Top Skill Level</div>
            </div>
          </div>
        </div>

        <div className="premium-card flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)', width: '200px', height: '200px', opacity: 0.2, filter: 'blur(30px)' }} />
          <Award size={64} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Certificate of Readiness</h2>
          <p style={{ margin: '0 0 1.5rem 0', maxWidth: '300px' }}>
            This certifies that <strong>{REPORT_DATA.name}</strong> is executing the structured learning path towards <strong>{REPORT_DATA.targetRole}</strong>.
          </p>
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
            <ShieldCheck size={18} /> Hertz Verified
          </div>
        </div>
      </div>
    </main>
  )
}
