"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function ReadinessChart({ learning, mentor, certs }: { learning: number, mentor: number, certs: number }) {
  const total = learning + mentor + certs;
  const data = [
    { value: total },
    { value: 100 - total },
    { value: 100 }, // Bottom half spacer
  ];

  return (
    <div style={{ width: '100%', height: '240px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="#F59E0B" />
            <Cell fill="rgba(255,255,255,0.1)" />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Analog Needle and Labels */}
      <div style={{ 
        position: 'absolute', 
        top: '70%', 
        left: '50%', 
        transform: `translate(-50%, -100%) rotate(${(total / 100) * 180 - 90}deg)`,
        transformOrigin: 'bottom center',
        width: '4px',
        height: '60px',
        background: '#fff',
        borderRadius: '2px',
        zIndex: 5,
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        transition: 'transform 1s ease-out'
      }} />
      <div style={{ 
        position: 'absolute', 
        top: '70%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: '#fff',
        zIndex: 6,
        border: '3px solid #111827'
      }} />
      
      <div style={{ position: 'absolute', top: '75%', textAlign: 'center' }}>
        <p style={{ color: '#fff', fontSize: '32px', fontWeight: 1000, margin: 0 }}>{total}%</p>
        <p style={{ color: '#F59E0B', fontSize: '10px', fontWeight: 1000, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Neural Readiness</p>
      </div>
    </div>
  );
}
