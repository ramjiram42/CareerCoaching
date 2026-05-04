'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import careerPathsData from '../../data/careerPaths.json';
import { Bookmark, ChevronRight, CheckCircle, Crosshair, Target, Briefcase, Zap, Info, Compass, ArrowLeft, Star, Shield, TrendingUp, Sparkles, MapPin } from 'lucide-react';

export default function CareerCoachingPortal({ overridePath, onBack }: { overridePath?: string, onBack?: () => void }) {
  const [activePath, setActivePath] = useState<any>(null);
  const [savedPaths, setSavedPaths] = useState<string[]>([]);

  // If overridePath is passed, initialize activePath matching it
  useEffect(() => {
    if (overridePath) {
      for (const category of careerPathsData.categories) {
        const found = category.paths.find(p => p.id === overridePath);
        if (found) {
          setActivePath(found);
          break;
        }
      }
    }
  }, [overridePath]);

  const toggleSave = (pathId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPaths(prev => prev.includes(pathId) ? prev.filter(id => id !== pathId) : [...prev, pathId]);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setActivePath(null);
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      marginTop: 20, 
      animation: 'cardIn 0.8s ease forwards', 
      color: '#111827', 
      fontFamily: "'Outfit', 'Inter', sans-serif" 
    }}>
      
      {!activePath ? (
        <RecommendedView 
          data={careerPathsData} 
          onSelectPath={setActivePath} 
          savedPaths={savedPaths}
          toggleSave={toggleSave}
        />
      ) : (
        <ExpandedJourneyView 
          path={activePath} 
          goBack={handleBack} 
          isSaved={savedPaths.includes(activePath.id)}
          toggleSave={(e: any) => toggleSave(activePath.id, e)}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        @keyframes cardIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .roadmap-card-hover:hover { 
          transform: translateY(-8px);
          border-color: #3B82F6 !important;
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1) !important;
        }
        .premium-blur { background: rgba(255, 255, 255, 0.6) !important; backdrop-filter: blur(20px); }
        .marching-border {
          background-image: linear-gradient(90deg, #E2E8F0 50%, transparent 50%);
          background-size: 20px 2px;
          background-repeat: repeat-x;
        }
      `}</style>
    </div>
  );
}

// ==========================================
// RECOMMENDED VIEW
// ==========================================
function RecommendedView({ data, onSelectPath, savedPaths, toggleSave }: any) {
  const lanes = [
    { path: data.categories[0].paths[0], label: "Best Fit", color: "#ec4899", icon: <Star size={16} fill="#fff" /> },
    { path: data.categories[1].paths[0], label: "High Match", color: "#F59E0B", icon: <TrendingUp size={16} color="#fff" /> },
    { path: data.categories[2].paths[0], label: "Potential", color: "#10B981", icon: <Zap size={16} fill="#fff" /> },
    { path: data.categories[3].paths[0], label: "New Horizon", color: "#8B5CF6", icon: <Compass size={16} color="#fff" /> }
  ];

  return (
    <div style={{ padding: '0 40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ margin: '80px 0 100px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 56, fontWeight: 1000, letterSpacing: '-0.04em', color: '#0F172A', marginBottom: 20 }}>Tailored Connections</h2>
        <p style={{ color: '#64748B', fontSize: 22, fontWeight: 500, maxWidth: 600, margin: '0 auto' }}>Strategic career pathways computed from your profile strengths and Hertz market intelligence.</p>
      </div>

      <div style={{ display: 'flex', position: 'relative', minHeight: 700 }}>
        <div style={{ width: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, zIndex: 10 }}>
           <div style={{ width: 90, height: 90, borderRadius: '50%', overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', position: 'relative' }}>
              <Image src="/john_profile.png" width={90} height={90} alt="Profile" style={{ objectFit: 'cover' }} priority />
           </div>
           <div style={{ background: '#111827', color: '#fff', fontSize: 10, fontWeight: 1000, padding: '4px 10px', borderRadius: 20, marginTop: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current</div>
        </div>

        <div style={{ flex: 1, paddingLeft: 100, position: 'relative' }}>
           {lanes.map((lane, idx) => (
             <div key={lane.path.id} style={{ marginBottom: 100, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 30 }}>
                   <div style={{ background: lane.color, color: '#fff', fontSize: 13, fontWeight: 1000, padding: '8px 18px', borderRadius: 12, display: 'flex', alignItems: 'center', boxShadow: `0 10px 20px ${lane.color}44` }}>
                      <span style={{ marginRight: 10 }}>{lane.icon}</span>
                      <span style={{ marginRight: 10, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{lane.label}</span>
                      <span style={{ opacity: 0.9, background: 'rgba(255,255,255,0.3)', padding: '2px 10px', borderRadius: 8 }}>{lane.path.nodes.length} Stages</span>
                   </div>
                   <div style={{ marginLeft: 24, color: '#64748B', fontSize: 16, fontWeight: 600 }}>
                      Target Destination: <span style={{ color: '#0F172A', fontWeight: 1000 }}>{lane.path.name}</span>
                   </div>
                   <div style={{ flex: 1 }}></div>
                   <button onClick={(e: any) => toggleSave(lane.path.id, e)} style={{ border: 'none', background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#475569', padding: '10px 20px', borderRadius: 14, fontSize: 14, fontWeight: 800, transition: 'all 0.2s' }}>
                      <Bookmark size={18} style={{ marginRight: 8 }} fill={savedPaths.includes(lane.path.id) ? lane.color : 'none'} color={savedPaths.includes(lane.path.id) ? lane.color : '#94A3B8'} /> Save Milestone
                   </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                   {lane.path.nodes.filter((n: any) => n.status !== 'past').slice(0, 3).map((node: any, nIdx: number) => (
                      <React.Fragment key={nIdx}>
                         <div 
                           onClick={() => onSelectPath(lane.path)}
                           style={{ 
                             background: '#fff', 
                             border: '1px solid rgba(226, 232, 240, 0.8)', 
                             borderRadius: 30, 
                             padding: '34px',
                             width: 350,
                             boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
                             transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                             cursor: 'pointer',
                             position: 'relative',
                             overflow: 'hidden'
                           }}
                           className="roadmap-card-hover"
                         >
                            {nIdx === 0 && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 6, background: lane.color }} />}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                               <h4 style={{ fontSize: 20, fontWeight: 1000, color: '#0F172A', lineHeight: 1.2 }}>{node.role}</h4>
                               <div style={{ background: `${lane.color}15`, padding: 10, borderRadius: 14 }}><TrendingUp size={20} color={lane.color} /></div>
                            </div>
                            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 700, marginBottom: 16 }}>
                               Velocity Score: <span style={{ color: lane.color, fontWeight: 1000 }}>{lane.path.matchScore * 10}% Match</span>
                            </div>
                            <div style={{ height: 10, background: '#F1F5F9', borderRadius: 8, overflow: 'hidden' }}>
                               <div style={{ width: `${lane.path.matchScore * 10}%`, height: '100%', background: `linear-gradient(90deg, ${lane.color}, ${lane.color}CC)`, borderRadius: 8 }}></div>
                            </div>
                         </div>
                         {nIdx < 2 && <ChevronRight size={32} color="#CBD5E1" strokeWidth={3} />}
                      </React.Fragment>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// EXPANDED JOURNEY VIEW
// ==========================================
function ExpandedJourneyView({ path, goBack, isSaved, toggleSave }: any) {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    const nextNode = path.nodes.find((n: any) => n.status === 'next');
    if (nextNode) setSelectedNode(nextNode);
  }, [path]);

  return (
    <div style={{ padding: '60px 80px', animation: 'fadeIn 0.8s ease forwards' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 80 }}>
         <button onClick={goBack} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.5)', border: '1px solid #E2E8F0', padding: '14px 24px', borderRadius: 16, cursor: 'pointer', fontWeight: 900, color: '#475569', fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.05em', backdropFilter: 'blur(10px)' }}>
            <ArrowLeft size={18} style={{ marginRight: 12 }} /> Exit Experience
         </button>
         <button onClick={toggleSave} style={{ display: 'flex', alignItems: 'center', padding: '16px 36px', borderRadius: 18, background: isSaved ? '#10B981' : '#111827', color: '#fff', border: 'none', fontWeight: 1000, cursor: 'pointer', boxShadow: '0 15px 35px -10px rgba(0,0,0,0.2)', transition: 'all 0.3s' }}>
           <Bookmark size={20} fill={isSaved ? '#fff' : 'none'} style={{ marginRight: 12 }} /> {isSaved ? 'Syncing Pathway' : 'Lock Progress'}
         </button>
      </div>

      <div style={{ display: 'flex', gap: 80, alignItems: 'flex-start' }}>
        {/* Main Roadmap Container */}
        <div style={{ flex: '1', background: 'rgba(255,255,255,0.7)', borderRadius: 50, border: '1px solid rgba(226, 232, 240, 0.5)', padding: 70, backdropFilter: 'blur(40px)', boxShadow: '0 50px 120px -30px rgba(0,0,0,0.08)' }}>
           <div style={{ marginBottom: 70 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                 <Sparkles size={20} color="#F59E0B" fill="#F59E0B" />
                 <span style={{ fontSize: 13, fontWeight: 1000, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Intelligence-Driven</span>
              </div>
              <h2 style={{ fontSize: 52, fontWeight: 1000, color: '#0F172A', letterSpacing: '-0.05em', lineHeight: 1.0 }}>{path.name}<br/><span style={{ color: '#94A3B8' }}>Future Trajectory</span></h2>
           </div>

           <div style={{ position: 'relative', paddingLeft: 60 }}>
              {/* Animated Spine */}
              <div style={{ position: 'absolute', left: 88, top: 0, bottom: 0, width: 6, background: 'linear-gradient(180deg, #E2E8F0 0%, #10B981 20%, #F59E0B 50%, #3B82F6 100%)', zIndex: 1, borderRadius: 3 }} />
              
              {path.nodes.map((node: any, idx: number) => {
                const isSelected = selectedNode?.role === node.role;
                let nodeColor = '#94A3B8';
                let icon = <CheckCircle size={20} color="#fff" />;
                
                if (node.status === 'past') { nodeColor = '#E2E8F0'; }
                if (node.status === 'current') { nodeColor = '#111827'; icon = <Briefcase size={18} color="#fff"/>; }
                if (node.status === 'next') { nodeColor = '#3B82F6'; icon = <Crosshair size={18} color="#fff"/>; }
                if (node.status === 'future') { nodeColor = '#8B5CF6'; icon = <Zap size={18} color="#fff"/>; }

                return (
                  <div key={idx} onClick={() => setSelectedNode(node)} style={{ display: 'flex', alignItems: 'center', marginBottom: 44, cursor: 'pointer', transform: isSelected ? 'translateX(24px)' : 'none', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 2 }}>
                     <div style={{ 
                       width: 54, 
                       height: 54, 
                       borderRadius: '50%', 
                       background: nodeColor, 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       marginRight: 40, 
                       border: '6px solid #fff', 
                       boxShadow: '0 10px 25px rgba(0,0,0,0.12)', 
                       flexShrink: 0, 
                       transition: 'all 0.3s' 
                     }}>{icon}</div>
                     
                     <div style={{ 
                       flex: 1, 
                       padding: '30px 44px', 
                       background: isSelected ? '#fff' : 'rgba(255,255,255,0.4)', 
                       border: `2px solid ${isSelected ? '#3B82F6' : 'transparent'}`, 
                       borderRadius: 36, 
                       boxShadow: isSelected ? '0 30px 70px -15px rgba(59,130,246,0.2)' : '0 4px 12px rgba(0,0,0,0.01)', 
                       display: 'flex', 
                       justifyContent: 'space-between', 
                       alignItems: 'center', 
                       transition: 'all 0.4s' 
                     }}>
                        <div>
                           <div style={{ fontSize: 11, fontWeight: 1000, color: nodeColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>{node.status.toUpperCase()} VERTICAL</div>
                           <h4 style={{ fontSize: 26, fontWeight: 1000, color: node.status === 'past' ? '#CBD5E1' : '#0F172A', letterSpacing: '-0.03em' }}>{node.role}</h4>
                        </div>
                        {isSelected && <ChevronRight size={28} color="#3B82F6" strokeWidth={3} />}
                     </div>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Sidebar Insights */}
        <div style={{ width: 500, position: 'sticky', top: 60 }}>
          {selectedNode ? (
            <div style={{ padding: '10px' }}>
              <div style={{ background: '#fff', borderRadius: 44, border: '1px solid #E2E8F0', padding: 50, boxShadow: '0 40px 90px -20px rgba(0,0,0,0.12)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
                    <div style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', width: 60, height: 60, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 10px 20px rgba(59,130,246,0.3)' }}><Star size={30} fill="#fff" /></div>
                    <h3 style={{ fontSize: 32, fontWeight: 1000, color: '#0F172A', letterSpacing: '-0.04em' }}>Role Intelligence</h3>
                 </div>
                 
                 <div style={{ padding: '30px', background: 'linear-gradient(145deg, #F8FAFC 0%, #F1F5F9 100%)', borderRadius: 32, marginBottom: 44, borderLeft: '8px solid #3B82F6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                       <MapPin size={16} color="#3B82F6" />
                       <span style={{ fontSize: 14, fontWeight: 900, color: '#3B82F6', textTransform: 'uppercase' }}>Strategic Position</span>
                    </div>
                    <h4 style={{ fontSize: 20, fontWeight: 1000, color: '#0F172A', marginBottom: 10 }}>Target: {selectedNode.role}</h4>
                    <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, fontWeight: 500 }}>{selectedNode.status === 'past' ? 'Historical domain mastery. These skills form the bedrock of your high-velocity trajectory.' : selectedNode.status === 'current' ? 'Active optimization phase. You are currently leveraging core strengths for maximum impact.' : 'High-value career target. Reaching this milestone signifies architectural maturity.'}</p>
                 </div>

                 <div style={{ marginBottom: 44 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 1000, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 20, letterSpacing: '0.15em' }}>Unlocked Power</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                      {path.alignedSkills.map((s: string, i: number) => (
                         <span key={i} style={{ background: '#F1FDF9', color: '#059669', fontSize: 14, fontWeight: 800, padding: '10px 20px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #D1FAE5' }}><Shield size={16} /> {s}</span>
                      ))}
                    </div>
                 </div>
                 
                 <div style={{ marginBottom: 50 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 1000, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 20, letterSpacing: '0.15em' }}>Target Deficits</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                      {(selectedNode.status === 'next' || selectedNode.status === 'future') && path.missingSkills.map((s: string, i: number) => (
                         <span key={i} style={{ background: '#FFF7ED', color: '#EA580C', fontSize: 14, fontWeight: 800, padding: '10px 20px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #FFEDD5' }}><Info size={16} /> {s}</span>
                      ))}
                    </div>
                 </div>

                 <div style={{ background: '#111827', borderRadius: 40, padding: '40px', color: '#fff', boxShadow: '0 30px 60px -10px rgba(0,0,0,0.3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
                       <Sparkles size={20} color="#F59E0B" fill="#F59E0B" />
                       <h4 style={{ fontSize: 22, fontWeight: 1000, color: '#fff' }}>Accelerator Protocol</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                       {[
                         { d: '30', t: 'Skill Conversion', c: `Benchmark profile against ${selectedNode.role} KPIs.` },
                         { d: '90', t: 'Core Authority', c: `Validate expertise via ${path.missingSkills[0] || 'Technical Stack'} certs.` },
                         { d: '180', t: 'Internal Deployment', c: 'Secure high-impact shadow projects for domain mastery.' }
                       ].map((item, i) => (
                         <div key={i} style={{ display: 'flex', gap: 20 }}>
                            <div style={{ minWidth: 50, height: 50, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 1000, fontSize: 14, color: '#F59E0B' }}>{item.d}d</div>
                            <div>
                               <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 4 }}>{item.t}</div>
                               <div style={{ fontSize: 14, opacity: 0.6, fontWeight: 500 }}>{item.c}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 50, border: '3px dashed rgba(226, 232, 240, 1)', padding: 80, textAlign: 'center', color: '#94A3B8', backdropFilter: 'blur(20px)' }}>
               <Compass size={80} style={{ marginBottom: 30, opacity: 0.2 }} />
               <h3 style={{ fontSize: 24, fontWeight: 1000, marginBottom: 12, color: '#475569' }}>Select a Destination</h3>
               <p style={{ fontSize: 17, fontWeight: 500, opacity: 0.8 }}>Choose a career milestone on the left to reveal your strategic acceleration plan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
