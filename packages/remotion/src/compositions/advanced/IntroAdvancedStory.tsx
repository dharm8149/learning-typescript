import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, alarmKlaxon } from '../../helpers/soundEffects';

export const IntroAdvancedStory: React.FC = () => {
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
      <div style={{ position: 'absolute', top: '-120px', left: sceneIndex >= 3 ? '50%' : '30%', width: '550px', height: '550px', backgroundColor: sceneIndex === 4 ? 'rgba(168, 85, 247, 0.22)' : sceneIndex === 3 ? 'rgba(59, 130, 246, 0.18)' : sceneIndex === 2 ? 'rgba(245, 158, 11, 0.15)' : sceneIndex === 1 ? 'rgba(239, 68, 68, 0.22)' : 'rgba(100, 116, 139, 0.12)', borderRadius: '50%', filter: 'blur(130px)', pointerEvents: 'none' }} />

      <Sequence from={125} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={250} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={270} durationInFrames={25}><Audio src={alarmKlaxon} volume={0.6} /></Sequence>
      <Sequence from={550} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={800} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={820} durationInFrames={20}><Audio src={successChime} volume={0.7} /></Sequence>

      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: '#0f172a', border: `1px solid ${sceneIndex >= 3 ? '#a855f7' : sceneIndex === 1 ? '#ef4444' : '#64748b'}`, borderRadius: '9999px', fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', color: sceneIndex >= 3 ? '#ddd6fe' : sceneIndex === 1 ? '#f87171' : '#94a3b8' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sceneIndex >= 3 ? '#a855f7' : sceneIndex === 1 ? '#ef4444' : '#64748b', boxShadow: `0 0 10px ${sceneIndex >= 3 ? '#a855f7' : sceneIndex === 1 ? '#ef4444' : '#64748b'}` }} />
          <span>{sceneIndex === 0 ? '09:00 AM • Type Detective Agency' : sceneIndex === 1 ? '02:14 AM • Case Unsolved' : sceneIndex === 2 ? '10:00 AM • Clue Found' : sceneIndex === 3 ? '10:30 AM • Type Solved' : '11:00 AM • Case Closed'}</span>
        </div>
        {sceneIndex === 1 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '12px', color: '#fca5a5', fontSize: '12px', fontWeight: 700, transform: `scale(${pulse})` }}>
            <span>🚨 Type Unknown — Can't Proceed!</span>
          </div>
        ) : sceneIndex >= 3 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', borderRadius: '12px', color: '#e9d5ff', fontSize: '12px', fontWeight: 700 }}>
            <span>🔍 Type Detection Active</span>
          </div>
        ) : (
          <div style={{ padding: '6px 14px', backgroundColor: '#1e293b', borderRadius: '9999px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{sceneIndex === 0 ? '🔍 Searching for type clues...' : sceneIndex === 2 ? '💡 Type narrowed!' : ''}</div>
        )}
      </div>

      <div style={{ width: '100%', maxWidth: '1000px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
        {sceneIndex === 0 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 1 • The Unknown Type Mystery</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>The Type Detective Faces the Unknown</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>A value of type 'unknown' is a locked door. TypeScript refuses to let you use it until you prove what it is. Type guards are the detective's tools — clues that narrow down possibilities.</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '20px', padding: '24px 28px', fontFamily: '"Fira Code", monospace', fontSize: '15px', color: '#e2e8f0', lineHeight: 1.8, boxShadow: '0 20px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px' }}>// The Unknown — A Locked Door</div>
              <div><span style={{ color: '#34d399' }}>const</span> <span style={{ color: '#38bdf8' }}>data</span>: <span style={{ color: '#f43f5e' }}>unknown</span> = fetchData();</div>
              <div style={{ color: '#ef4444' }}>data.toString(); // ❌ Error — unknown doesn't have methods</div>
              <div style={{ marginTop: '8px' }}><span style={{ color: '#94a3b8' }}>// You must PROVE what it is first...</span></div>
              <div style={{ marginTop: '8px' }}><span style={{ color: '#f59e0b' }}>if (typeof data === 'string') &#123;</span></div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#94a3b8' }}>// Now TypeScript KNOWS data is string</span></div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#10b981' }}>data.toString(); // ✅ Works!</span></div>
              <div style={{ color: '#f59e0b' }}>&#125;</div>
            </div>
          </div>
        )}
        {sceneIndex === 1 && (
          <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 2 • The Type Safety Gap</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #f87171, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Without Type Guards, You're Flying Blind</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>Using 'any' bypasses type safety. Without type guards, you can't distinguish between a string, number, or object at runtime. Bugs slip through silently.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', alignItems: 'center', backgroundColor: '#0f172a', border: '2px solid rgba(239, 68, 68, 0.4)', borderRadius: '24px', padding: '28px', boxShadow: '0 25px 40px rgba(239, 68, 68, 0.2)' }}>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px dashed #ef4444', borderRadius: '16px' }}>
                <div style={{ fontSize: '28px' }}>🔓</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f87171', marginTop: '8px' }}>Using 'any'</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#ffffff', margin: '6px 0' }}>Type safety GONE</div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 900, color: '#f43f5e' }}>→</div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#7f1d1d', borderRadius: '16px', border: '1px solid #ef4444' }}>
                <div style={{ fontSize: '28px' }}>💥</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '8px' }}>Runtime Errors</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#fecaca', margin: '6px 0' }}>data.toUpperCase() on number!</div>
              </div>
            </div>
          </div>
        )}
        {sceneIndex === 2 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 3 • The Type Detective's Tools</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>Type Guards — The Detective's Toolkit</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>"typeof" checks, "instanceof" checks, "in" operator checks, and custom type predicates. Each is a tool that narrows down the type possibilities.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>typeof Guard</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  typeof x === 'string'<br/>
                  <span style={{ color: '#10b981' }}>Narrows to string</span>
                </div>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #a855f7', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#c084fc', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Custom Type Predicate</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  function isFoo(x: any): x is Foo
                  <span style={{ color: '#10b981' }}>Custom narrowing!</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {sceneIndex === 3 && (
          <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#a855f7', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 4 • The Case Solved</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>Type Guards Narrow Types — Exactly When You Need</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>"typeof", "instanceof", "in" operator, and custom type predicates. Each is a clue that TypeScript follows to narrow down the exact type at each point in your code.</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '2px solid #a855f7', borderRadius: '24px', padding: '24px 28px', fontFamily: '"Fira Code", monospace', fontSize: '17px', color: '#e2e8f0', lineHeight: 1.8, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '14px', fontSize: '13px' }}>
                <span style={{ color: '#e9d5ff', fontWeight: 700 }}>type-guards.ts — The Detective's Report</span>
                <span style={{ color: '#a855f7', fontWeight: 700 }}>🔍 Case Solved</span>
              </div>
              <div><span style={{ color: '#94a3b8' }}>function</span> <span style={{ color: '#38bdf8' }}>narrow</span>(val: <span style={{ color: '#f43f5e' }}>unknown</span>) &#123;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#f59e0b' }}>if</span> (<span style={{ color: '#34d399' }}>typeof</span> val === <span style={{ color: '#fbbf24' }}>'string'</span>) &#123;</div>
              <div style={{ paddingLeft: '48px' }}><span style={{ color: '#94a3b8' }}>// val is string</span></div>
              <div style={{ paddingLeft: '24px' }}>&#125; <span style={{ color: '#f59e0b' }}>else if</span> (<span style={{ color: '#34d399' }}>typeof</span> val === <span style={{ color: '#fbbf24' }}>'number'</span>) &#123;</div>
              <div style={{ paddingLeft: '48px' }}><span style={{ color: '#94a3b8' }}>// val is number</span></div>
              <div style={{ paddingLeft: '24px' }}>&#125; <span style={{ color: '#f59e0b' }}>else</span> &#123;</div>
              <div style={{ paddingLeft: '48px' }}><span style={{ color: '#94a3b8' }}>// val is never (exhaustive!)</span></div>
              <div>&#125;&#125;</div>
            </div>
          </div>
        )}
        {sceneIndex === 4 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#e9d5ff', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 5 • Case Closed</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #e9d5ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>From Unknown to Certain — The Power of Type Guards</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>"unknown" forces you to be safe. Type guards let you narrow types with confidence. Every branch tells TypeScript exactly what type you're working with.</p>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px', width: '100%' }}>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>// Before: unknown — locked door 🔒</div>
              <div style={{ color: '#64748b' }}>const data: unknown = ... <span style={{ color: '#64748b' }}>can't do anything</span></div>
              <div style={{ marginTop: '12px', color: '#94a3b8' }}>// After: type guard — door opened 🗝️</div>
              <div style={{ color: '#e2e8f0' }}>if (typeof data === 'string') &#123; data.toUpperCase() &#125; <span style={{ color: '#10b981' }}>✅</span></div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Type Detection Active</span><span>•</span><span>Remotion Audio Engine 🔊</span><span>•</span><span>FPS: {fps}</span>
      </div>
    </div>
  );
};
