import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, alarmKlaxon } from '../../helpers/soundEffects';

export const IntroGenericsStory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let sceneIndex = 0;
  let sceneFrame = 0;
  if (frame < 250) { sceneIndex = 0; sceneFrame = frame; }
  else if (frame < 550) { sceneIndex = 1; sceneFrame = frame - 250; }
  else if (frame < 800) { sceneIndex = 2; sceneFrame = frame - 550; }
  else if (frame < 1050) { sceneIndex = 3; sceneFrame = frame - 800; }
  else { sceneIndex = 4; sceneFrame = frame - 1050; }

  const cardScale = spring({ frame: sceneFrame, fps, config: { damping: 13, mass: 0.8 } });
  const pulse = Math.sin(frame * 0.15) > 0 ? 1 : 0.85;

  return (
    <div style={{ flex: 1, height: '100%', backgroundColor: '#030712', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '36px 48px', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-120px', left: sceneIndex >= 3 ? '50%' : '30%', width: '550px', height: '550px', backgroundColor: sceneIndex === 4 ? 'rgba(251, 191, 36, 0.22)' : sceneIndex === 3 ? 'rgba(59, 130, 246, 0.18)' : sceneIndex === 2 ? 'rgba(245, 158, 11, 0.15)' : sceneIndex === 1 ? 'rgba(239, 68, 68, 0.22)' : 'rgba(100, 116, 139, 0.12)', borderRadius: '50%', filter: 'blur(130px)', pointerEvents: 'none' }} />

      <Sequence from={125} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={250} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={270} durationInFrames={25}><Audio src={alarmKlaxon} volume={0.6} /></Sequence>
      <Sequence from={550} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={800} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={820} durationInFrames={20}><Audio src={successChime} volume={0.7} /></Sequence>

      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: '#0f172a', border: `1px solid ${sceneIndex >= 3 ? '#fbbf24' : sceneIndex === 1 ? '#ef4444' : '#64748b'}`, borderRadius: '9999px', fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', color: sceneIndex >= 3 ? '#fde68a' : sceneIndex === 1 ? '#f87171' : '#94a3b8' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sceneIndex >= 3 ? '#fbbf24' : sceneIndex === 1 ? '#ef4444' : '#64748b', boxShadow: `0 0 10px ${sceneIndex >= 3 ? '#fbbf24' : sceneIndex === 1 ? '#ef4444' : '#64748b'}` }} />
          <span>{sceneIndex === 0 ? '09:00 AM • Warehouse' : sceneIndex === 1 ? '02:14 AM • Chaos' : sceneIndex === 2 ? '10:00 AM • Breakthrough' : sceneIndex === 3 ? '10:30 AM • First Box' : '11:00 AM • Transformed'}</span>
        </div>
        {sceneIndex === 1 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '12px', color: '#fca5a5', fontSize: '12px', fontWeight: 700, transform: `scale(${pulse})` }}>
            <span>🚨 50 Duplicate Functions — No Reuse!</span>
          </div>
        ) : sceneIndex >= 3 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: 'rgba(251, 191, 36, 0.2)', border: '1px solid #fbbf24', borderRadius: '12px', color: '#fde68a', fontSize: '12px', fontWeight: 700 }}>
            <span>📦 Generic Boxes Active</span>
          </div>
        ) : (
          <div style={{ padding: '6px 14px', backgroundColor: '#1e293b', borderRadius: '9999px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{sceneIndex === 0 ? '📦 Counting boxes...' : sceneIndex === 2 ? '💡 Aha moment' : ''}</div>
        )}
      </div>

      <div style={{ width: '100%', maxWidth: '1000px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
        {sceneIndex === 0 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 1 • The Warehouse Problem</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>50 Different Boxes for 50 Different Items</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>Every type needs its own container function. StringBox, NumberBox, UserBox... The code duplication is insane.</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '20px', padding: '24px 28px', fontFamily: '"Fira Code", monospace', fontSize: '15px', color: '#e2e8f0', lineHeight: 1.8, boxShadow: '0 20px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px' }}>// Before Generics — Duplicate Code</div>
              <div><span style={{ color: '#f43f5e' }}>function</span> <span style={{ color: '#38bdf8' }}>stringBox</span>(value: string): &#123; value: string &#125; &#123; ... &#125;</div>
              <div><span style={{ color: '#f43f5e' }}>function</span> <span style={{ color: '#38bdf8' }}>numberBox</span>(value: number): &#123; value: number &#125; &#123; ... &#125;</div>
              <div><span style={{ color: '#f43f5e' }}>function</span> <span style={{ color: '#38bdf8' }}>userBox</span>(value: User): &#123; value: User &#125; &#123; ... &#125;</div>
              <div style={{ color: '#ef4444', marginTop: '8px' }}>// ... and 47 more! Same code, different types.</div>
            </div>
          </div>
        )}
        {sceneIndex === 1 && (
          <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 2 • The Maintenance Nightmare</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #f87171, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fixing a Bug Means Editing 50 Files</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>One bug fix requires touching every single box function. Someone always forgets one. Production breaks.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', alignItems: 'center', backgroundColor: '#0f172a', border: '2px solid rgba(239, 68, 68, 0.4)', borderRadius: '24px', padding: '28px', boxShadow: '0 25px 40px rgba(239, 68, 68, 0.2)' }}>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px dashed #ef4444', borderRadius: '16px' }}>
                <div style={{ fontSize: '28px' }}>🔧</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f87171', marginTop: '8px' }}>Fix Applied</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#ffffff', margin: '6px 0' }}>47 of 50 files fixed</div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 900, color: '#f43f5e' }}>→</div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#7f1d1d', borderRadius: '16px', border: '1px solid #ef4444' }}>
                <div style={{ fontSize: '28px' }}>💥</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '8px' }}>3 Files Missed</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#fecaca', margin: '6px 0' }}>Production crashed!</div>
              </div>
            </div>
          </div>
        )}
        {sceneIndex === 2 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 3 • The Breakthrough</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>What If One Box Could Hold ANYTHING?</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>TypeScript's generics let you write ONE function that works with ANY type, while preserving type safety.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Without Generics</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  50 functions, all the same logic<br/>
                  <span style={{ color: '#ef4444' }}>50 files to maintain</span>
                </div>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #fbbf24', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#fde68a', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>With Generics</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  1 function, works with ALL types<br/>
                  <span style={{ color: '#10b981' }}>1 file to maintain</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {sceneIndex === 3 && (
          <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#fbbf24', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 4 • The Generic Box</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>One Box Type — <span style={{ color: '#fbbf24' }}>T</span> — Works With Everything</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>The type parameter T is a placeholder. When you use Box&lt;string&gt;, T becomes string. When you use Box&lt;number&gt;, T becomes number.</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '2px solid #fbbf24', borderRadius: '24px', padding: '24px 28px', fontFamily: '"Fira Code", monospace', fontSize: '17px', color: '#e2e8f0', lineHeight: 1.8, boxShadow: '0 20px 40px rgba(251, 191, 36, 0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '14px', fontSize: '13px' }}>
                <span style={{ color: '#fde68a', fontWeight: 700 }}>Box.ts — Generic Box</span>
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>📦 One Box, Any Type</span>
              </div>
              <div><span style={{ color: '#34d399' }}>interface</span> <span style={{ color: '#fbbf24', fontWeight: 700 }}>Box</span>&lt;<span style={{ color: '#a78bfa' }}>T</span>&gt; &#123;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#fbbf24' }}>value</span>: <span style={{ color: '#a78bfa' }}>T</span>;</div>
              <div>&#125;</div>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #334155' }}><span style={{ color: '#94a3b8' }}>const strBox: Box&lt;string&gt; = &#123; value: "hello" &#125;;</span></div>
              <div style={{ marginTop: '4px' }}><span style={{ color: '#94a3b8' }}>const numBox: Box&lt;number&gt; = &#123; value: 42 &#125;;</span></div>
            </div>
          </div>
        )}
        {sceneIndex === 4 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#fde68a', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 5 • Transformed</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #fbbf24, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One Generic Function Replaces 50 Duplicates</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>Write once, use everywhere. TypeScript tracks the exact type at each call site. Type safety + code reuse.</p>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px', width: '100%' }}>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>// Before: 50 box functions</div>
              <div style={{ color: '#64748b' }}>stringBox(), numberBox(), userBox()... <span style={{ color: '#64748b' }}>50 files</span></div>
              <div style={{ marginTop: '12px', color: '#94a3b8' }}>// After: One generic function</div>
              <div style={{ color: '#e2e8f0' }}>function box&lt;T&gt;(v: T): Box&lt;T&gt; &#123; ... &#125; <span style={{ color: '#10b981' }}>✅</span></div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Generic Protocol Active</span><span>•</span><span>Remotion Audio Engine 🔊</span><span>•</span><span>FPS: {fps}</span>
      </div>
    </div>
  );
};
