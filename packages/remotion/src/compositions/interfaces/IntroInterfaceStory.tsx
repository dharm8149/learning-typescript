import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, alarmKlaxon } from '../../helpers/soundEffects';

export const IntroInterfaceStory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 5 Scenes (40s = 1200 frames @ 30fps)
  // Scene 1: (0 - 240) The Messy Codebase — no interfaces anywhere
  // Scene 2: (240 - 540) Bugs everywhere — wrong shapes passed around
  // Scene 3: (540 - 780) The Breakthrough — what if objects had contracts?
  // Scene 4: (780 - 1020) Introducing Interfaces — the first one
  // Scene 5: (1020 - 1200) The Transformation — codebase becomes self-documenting

  let sceneIndex = 0;
  let sceneFrame = 0;

  if (frame < 240) { sceneIndex = 0; sceneFrame = frame; }
  else if (frame < 540) { sceneIndex = 1; sceneFrame = frame - 240; }
  else if (frame < 780) { sceneIndex = 2; sceneFrame = frame - 540; }
  else if (frame < 1020) { sceneIndex = 3; sceneFrame = frame - 780; }
  else { sceneIndex = 4; sceneFrame = frame - 1020; }

  const cardScale = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 13, mass: 0.8 }
  });

  const pulse = Math.sin(frame * 0.15) > 0 ? 1 : 0.85;

  return (
    <div style={{
      flex: 1, height: '100%', backgroundColor: '#030712',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', alignItems: 'center',
      padding: '36px 48px', color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Dynamic Background */}
      <div style={{
        position: 'absolute', top: '-120px',
        left: sceneIndex >= 3 ? '50%' : '30%',
        width: '550px', height: '550px',
        backgroundColor: sceneIndex === 4 ? 'rgba(139, 92, 246, 0.22)' :
          sceneIndex === 3 ? 'rgba(59, 130, 246, 0.18)' :
            sceneIndex === 2 ? 'rgba(245, 158, 11, 0.15)' :
              sceneIndex === 1 ? 'rgba(239, 68, 68, 0.22)' :
                'rgba(100, 116, 139, 0.12)',
        borderRadius: '50%', filter: 'blur(130px)',
        pointerEvents: 'none', transition: 'all 0.8s ease'
      }} />

      {/* Sound Effects */}
      <Sequence from={120} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={240} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={260} durationInFrames={25}><Audio src={alarmKlaxon} volume={0.6} /></Sequence>
      <Sequence from={540} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={780} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={800} durationInFrames={20}><Audio src={successChime} volume={0.7} /></Sequence>

      {/* TOP BAR */}
      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: '#0f172a', border: `1px solid ${sceneIndex >= 3 ? '#7c3aed' : sceneIndex === 1 ? '#ef4444' : '#64748b'}`, borderRadius: '9999px', fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', color: sceneIndex >= 3 ? '#c4b5fd' : sceneIndex === 1 ? '#f87171' : '#94a3b8' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sceneIndex >= 3 ? '#8b5cf6' : sceneIndex === 1 ? '#ef4444' : '#64748b', boxShadow: `0 0 10px ${sceneIndex >= 3 ? '#8b5cf6' : sceneIndex === 1 ? '#ef4444' : '#64748b'}` }} />
          <span>{sceneIndex === 0 ? '09:00 AM • Code Review' : sceneIndex === 1 ? '02:14 AM • Production' : sceneIndex === 2 ? '10:00 AM • Breakthrough' : sceneIndex === 3 ? '10:30 AM • First Interface' : '11:00 AM • Transformed'}</span>
        </div>
        {sceneIndex === 1 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '12px', color: '#fca5a5', fontSize: '12px', fontWeight: 700, transform: `scale(${pulse})` }}>
            <span>🚨 Type 'any' Everywhere — No Shape Contracts!</span>
          </div>
        ) : sceneIndex >= 3 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: 'rgba(139, 92, 246, 0.2)', border: '1px solid #8b5cf6', borderRadius: '12px', color: '#c4b5fd', fontSize: '12px', fontWeight: 700 }}>
            <span>🛡️ Interface Contracts Active</span>
          </div>
        ) : (
          <div style={{ padding: '6px 14px', backgroundColor: '#1e293b', borderRadius: '9999px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
            {sceneIndex === 0 ? '⏱ Review in progress' : sceneIndex === 2 ? '💡 Aha moment' : ''}
          </div>
        )}
      </div>

      {/* CENTER STAGE */}
      <div style={{ width: '100%', maxWidth: '1000px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>

        {/* Scene 1: The Messy Codebase */}
        {sceneIndex === 0 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 1 • The Messy Codebase</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>Every Object is Just "any" — No Contracts</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>The team built everything with dynamic objects. No interfaces, no type safety. Just hope.</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '20px', padding: '24px 28px', fontFamily: '"Fira Code", monospace', fontSize: '17px', color: '#e2e8f0', lineHeight: 1.8, boxShadow: '0 20px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>// checkout.ts — Before Interfaces</div>
              <div><span style={{ color: '#f43f5e' }}>function</span> <span style={{ color: '#38bdf8' }}>createUser</span>(data) &#123;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#f43f5e' }}>return</span> &#123;</div>
              <div style={{ paddingLeft: '48px' }}><span style={{ color: '#94a3b8' }}>// Hope data has 'name'... it doesn't always</span></div>
              <div style={{ paddingLeft: '48px' }}><span style={{ color: '#fbbf24' }}>name</span>: data.name, <span style={{ color: '#64748b' }}>// any?</span></div>
              <div style={{ paddingLeft: '48px' }}><span style={{ color: '#fbbf24' }}>id</span>: data.id, <span style={{ color: '#64748b' }}>// any?</span></div>
              <div style={{ paddingLeft: '48px' }}><span style={{ color: '#fbbf24' }}>email</span>: data.email</div>
              <div style={{ paddingLeft: '24px' }}>&#125;;</div>
              <div>&#125;</div>
            </div>
          </div>
        )}

        {/* Scene 2: Bugs Everywhere */}
        {sceneIndex === 1 && (
          <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 2 • The Bugs</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #f87171, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>No Interfaces = No One Knows What Shape to Expect</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>A function expects {name, id}, receives {username, userId}. No one notices until production crashes.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', alignItems: 'center', backgroundColor: '#0f172a', border: '2px solid rgba(239, 68, 68, 0.4)', borderRadius: '24px', padding: '28px', boxShadow: '0 25px 40px rgba(239, 68, 68, 0.2)' }}>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px dashed #ef4444', borderRadius: '16px' }}>
                <div style={{ fontSize: '28px' }}>📦</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f87171', marginTop: '8px' }}>Function Expects</div>
                <div style={{ fontFamily: 'monospace', fontSize: '15px', color: '#ffffff', margin: '6px 0' }}><span style={{ color: '#fbbf24' }}>name</span>, <span style={{ color: '#fbbf24' }}>id</span>, <span style={{ color: '#fbbf24' }}>email</span></div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 900, color: '#f43f5e' }}>→</div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#7f1d1d', borderRadius: '16px', border: '1px solid #ef4444' }}>
                <div style={{ fontSize: '28px' }}>💥</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '8px' }}>Received</div>
                <div style={{ fontFamily: 'monospace', fontSize: '15px', color: '#fecaca', margin: '6px 0' }}><span style={{ color: '#fbbf24' }}>username</span>, <span style={{ color: '#fbbf24' }}>userId</span></div>
                <div style={{ fontSize: '11px', color: '#fecaca', fontWeight: 600 }}>undefined, undefined, undefined!</div>
              </div>
            </div>
          </div>
        )}

        {/* Scene 3: The Breakthrough */}
        {sceneIndex === 2 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 3 • The Breakthrough</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>What If Objects Had Contracts? Like Functions Do!</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>Every function has a signature that defines its input shape. What if objects had the same?</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Functions Have Signatures</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  <span style={{ color: '#f43f5e' }}>function</span> add(<span style={{ color: '#34d399' }}>a: number</span>, <span style={{ color: '#34d399' }}>b: number</span>): <span style={{ color: '#34d399' }}>number</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Compiler knows exactly what goes in and what comes out.</div>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #8b5cf6', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#c4b5fd', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Objects Need Contracts Too</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  <span style={{ color: '#a78bfa' }}>interface</span> User &#123; ... &#125;
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Compiler knows exactly what shape an object must have.</div>
              </div>
            </div>
          </div>
        )}

        {/* Scene 4: First Interface */}
        {sceneIndex === 3 && (
          <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 4 • The First Interface</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>An Interface is Just an Object Contract — A Promise</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>Write it once. TypeScript enforces it everywhere the object flows through your codebase.</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '2px solid #8b5cf6', borderRadius: '24px', padding: '24px 28px', fontFamily: '"Fira Code", monospace', fontSize: '17px', color: '#e2e8f0', lineHeight: 1.8, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '14px', fontSize: '13px' }}>
                <span style={{ color: '#c4b5fd', fontWeight: 700 }}>User.ts — First Interface</span>
                <span style={{ color: '#8b5cf6', fontWeight: 700 }}>🛡️ Contract Active</span>
              </div>
              <div><span style={{ color: '#a78bfa' }}>interface</span> <span style={{ color: '#c084fc', fontWeight: 700 }}>User</span> &#123;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#fbbf24' }}>id</span>: <span style={{ color: '#34d399' }}>number</span>;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#fbbf24' }}>name</span>: <span style={{ color: '#34d399' }}>string</span>;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#fbbf24' }}>email</span>: <span style={{ color: '#34d399' }}>string</span>;</div>
              <div>&#125;</div>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #334155' }}><span style={{ color: '#94a3b8' }}>const user: User = &#123; id: 1, name: "Alice", email: "alice@test.com" &#125;; // ✅</span></div>
            </div>
          </div>
        )}

        {/* Scene 5: Transformed */}
        {sceneIndex === 4 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#c4b5fd', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 5 • Transformed</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #8b5cf6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Interfaces Make Code Self-Documenting</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>Every object shape has a name. Every contract is visible. No more guessing what data looks like.</p>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px', width: '100%' }}>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>// Before: "What does this function expect?"</div>
              <div style={{ color: '#64748b' }}>function createUser(data) &#123; ... &#125; <span style={{ color: '#64748b' }}>// ???</span></div>
              <div style={{ marginTop: '12px', color: '#94a3b8' }}>// After: The interface IS the documentation</div>
              <div style={{ color: '#e2e8f0' }}>function createUser(<span style={{ color: '#c4b5fd' }}>user</span>: <span style={{ color: '#c084fc' }}>User</span>) &#123; ... &#125; <span style={{ color: '#10b981' }}>✅</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Interface Protocol Active</span>
        <span>•</span>
        <span>Remotion Audio Engine 🔊</span>
        <span>•</span>
        <span>FPS: {fps}</span>
      </div>
    </div>
  );
};
