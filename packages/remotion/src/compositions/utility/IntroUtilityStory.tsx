import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, alarmKlaxon } from '../../helpers/soundEffects';

export const IntroUtilityStory: React.FC = () => {
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
      <div style={{ position: 'absolute', top: '-120px', left: sceneIndex >= 3 ? '50%' : '30%', width: '550px', height: '550px', backgroundColor: sceneIndex === 4 ? 'rgba(16, 185, 129, 0.22)' : sceneIndex === 3 ? 'rgba(99, 102, 241, 0.18)' : sceneIndex === 2 ? 'rgba(245, 158, 11, 0.15)' : sceneIndex === 1 ? 'rgba(239, 68, 68, 0.22)' : 'rgba(100, 116, 139, 0.12)', borderRadius: '50%', filter: 'blur(130px)', pointerEvents: 'none' }} />

      <Sequence from={125} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={250} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={270} durationInFrames={25}><Audio src={alarmKlaxon} volume={0.6} /></Sequence>
      <Sequence from={550} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={800} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={820} durationInFrames={20}><Audio src={successChime} volume={0.7} /></Sequence>

      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: '#0f172a', border: `1px solid ${sceneIndex >= 3 ? '#10b981' : sceneIndex === 1 ? '#ef4444' : '#64748b'}`, borderRadius: '9999px', fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', color: sceneIndex >= 3 ? '#a7f3d0' : sceneIndex === 1 ? '#f87171' : '#94a3b8' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sceneIndex >= 3 ? '#10b981' : sceneIndex === 1 ? '#ef4444' : '#64748b', boxShadow: `0 0 10px ${sceneIndex >= 3 ? '#10b981' : sceneIndex === 1 ? '#ef4444' : '#64748b'}` }} />
          <span>{sceneIndex === 0 ? '09:00 AM • Type Workshop' : sceneIndex === 1 ? '02:14 AM • Duplication Crisis' : sceneIndex === 2 ? '10:00 AM • Factory Floor' : sceneIndex === 3 ? '10:30 AM • First Transformation' : '11:00 AM • Type Assembly Line'}</span>
        </div>
        {sceneIndex === 1 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '12px', color: '#fca5a5', fontSize: '12px', fontWeight: 700, transform: `scale(${pulse})` }}>
            <span>🚨 20 Duplicate Types — No Reuse!</span>
          </div>
        ) : sceneIndex >= 3 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '12px', color: '#d1fae5', fontSize: '12px', fontWeight: 700 }}>
            <span>🏭 Utility Type Factory Active</span>
          </div>
        ) : (
          <div style={{ padding: '6px 14px', backgroundColor: '#1e293b', borderRadius: '9999px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{sceneIndex === 0 ? '🏭 Counting type factories...' : sceneIndex === 2 ? '💡 Factory blueprint' : ''}</div>
        )}
      </div>

      <div style={{ width: '100%', maxWidth: '1000px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
        {sceneIndex === 0 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 1 • The Type Duplication Problem</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>Creating 20 Different Types from 1 Base Type</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>UserCreate, UserUpdate, UserPublic, UserAdmin... Each is a copy-paste of the original with minor tweaks. The duplication is unsustainable.</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '20px', padding: '24px 28px', fontFamily: '"Fira Code", monospace', fontSize: '15px', color: '#e2e8f0', lineHeight: 1.8, boxShadow: '0 20px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px' }}>// Before Utility Types — Copy-Paste Types</div>
              <div><span style={{ color: '#34d399' }}>interface</span> <span style={{ color: '#38bdf8' }}>UserCreate</span> &#123; name: string; email: string; password: string &#125;</div>
              <div><span style={{ color: '#34d399' }}>interface</span> <span style={{ color: '#38bdf8' }}>UserUpdate</span> &#123; name?: string; email?: string &#125;</div>
              <div><span style={{ color: '#34d399' }}>interface</span> <span style={{ color: '#38bdf8' }}>UserPublic</span> &#123; id: string; name: string; email: string &#125;</div>
              <div style={{ color: '#ef4444', marginTop: '8px' }}>// ... and 17 more! Same base, different variations.</div>
            </div>
          </div>
        )}
        {sceneIndex === 1 && (
          <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 2 • The Maintenance Nightmare</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #f87171, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fixing a Field Means Editing 20 Files</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>Change 'email' to 'emailAddress' in User and you must manually update every variation. Someone always misses one. Bugs slip through.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', alignItems: 'center', backgroundColor: '#0f172a', border: '2px solid rgba(239, 68, 68, 0.4)', borderRadius: '24px', padding: '28px', boxShadow: '0 25px 40px rgba(239, 68, 68, 0.2)' }}>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px dashed #ef4444', borderRadius: '16px' }}>
                <div style={{ fontSize: '28px' }}>🔄</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f87171', marginTop: '8px' }}>Rename 'email'</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#ffffff', margin: '6px 0' }}>20 files updated</div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 900, color: '#f43f5e' }}>→</div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#7f1d1d', borderRadius: '16px', border: '1px solid #ef4444' }}>
                <div style={{ fontSize: '28px' }}>💥</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '8px' }}>3 Files Missed</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#fecaca', margin: '6px 0' }}>Types are inconsistent!</div>
              </div>
            </div>
          </div>
        )}
        {sceneIndex === 2 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 3 • The Type Factory</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>What If You Could Transform Types On-Demand?</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>TypeScript's utility types are a type factory — transform any type into any variation with a single function call.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Without Utility Types</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  20 manual type definitions<br/>
                  <span style={{ color: '#ef4444' }}>20 files to maintain</span>
                </div>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #10b981', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#6ee7b7', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>With Utility Types</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  1 base type + factory calls<br/>
                  <span style={{ color: '#10b981' }}>1 file to maintain</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {sceneIndex === 3 && (
          <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 4 • The Type Factory in Action</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>One Base Type — <span style={{ color: '#10b981' }}>Transform</span> — Any Variation</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>Partial<T> makes all optional. Pick<T, K> selects properties. Omit<T, K> removes them. Record<K, V> creates object types.</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '2px solid #10b981', borderRadius: '24px', padding: '24px 28px', fontFamily: '"Fira Code", monospace', fontSize: '17px', color: '#e2e8f0', lineHeight: 1.8, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '14px', fontSize: '13px' }}>
                <span style={{ color: '#6ee7b7', fontWeight: 700 }}>types.ts — Type Factory</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>🏭 Transform Any Type</span>
              </div>
              <div><span style={{ color: '#94a3b8' }}>interface</span> <span style={{ color: '#fbbf24', fontWeight: 700 }}>User</span> &#123; id: string; name: string; email: string; password: string &#125;</div>
              <div style={{ marginTop: '8px' }}><span style={{ color: '#94a3b8' }}>type</span> <span style={{ color: '#38bdf8' }}>UserPartial</span> = <span style={{ color: '#10b981' }}>Partial</span>&lt;User&gt;;</div>
              <div><span style={{ color: '#94a3b8' }}>type</span> <span style={{ color: '#38bdf8' }}>UserPublic</span> = <span style={{ color: '#10b981' }}>Pick</span>&lt;User, 'id' | 'name' | 'email'&gt;;</div>
              <div><span style={{ color: '#94a3b8' }}>type</span> <span style={{ color: '#38bdf8' }}>UserSafe</span> = <span style={{ color: '#10b981' }}>Omit</span>&lt;User, 'password'&gt;;</div>
            </div>
          </div>
        )}
        {sceneIndex === 4 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#6ee7b7', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 5 • Transformed</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #6ee7b7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One Factory Function Replaces 20 Manual Types</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>Transform types on-demand. TypeScript tracks every transformation. Zero boilerplate, full type safety.</p>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px', width: '100%' }}>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>// Before: 20 manual type definitions</div>
              <div style={{ color: '#64748b' }}>UserCreate, UserUpdate, UserPublic... <span style={{ color: '#64748b' }}>20 files</span></div>
              <div style={{ marginTop: '12px', color: '#94a3b8' }}>// After: Type factory with utility types</div>
              <div style={{ color: '#e2e8f0' }}>Partial<User>, Pick<User, K>, Omit<User, 'password'> <span style={{ color: '#10b981' }}>✅</span></div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Utility Type Factory Active</span><span>•</span><span>Remotion Audio Engine 🔊</span><span>•</span><span>FPS: {fps}</span>
      </div>
    </div>
  );
};
