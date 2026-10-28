import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, alarmKlaxon } from '../../helpers/soundEffects';

export const IntroUnionStory: React.FC = () => {
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
      <div style={{ position: 'absolute', top: '-120px', left: sceneIndex >= 3 ? '50%' : '30%', width: '550px', height: '550px', backgroundColor: sceneIndex === 4 ? 'rgba(16, 185, 129, 0.22)' : sceneIndex === 3 ? 'rgba(59, 130, 246, 0.18)' : sceneIndex === 2 ? 'rgba(245, 158, 11, 0.15)' : sceneIndex === 1 ? 'rgba(239, 68, 68, 0.22)' : 'rgba(100, 116, 139, 0.12)', borderRadius: '50%', filter: 'blur(130px)', pointerEvents: 'none' }} />

      <Sequence from={125} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={250} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={270} durationInFrames={25}><Audio src={alarmKlaxon} volume={0.6} /></Sequence>
      <Sequence from={550} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={800} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={820} durationInFrames={20}><Audio src={successChime} volume={0.7} /></Sequence>

      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: '#0f172a', border: `1px solid ${sceneIndex >= 3 ? '#10b981' : sceneIndex === 1 ? '#ef4444' : '#64748b'}`, borderRadius: '9999px', fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', color: sceneIndex >= 3 ? '#6ee7b7' : sceneIndex === 1 ? '#f87171' : '#94a3b8' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sceneIndex >= 3 ? '#10b981' : sceneIndex === 1 ? '#ef4444' : '#64748b', boxShadow: `0 0 10px ${sceneIndex >= 3 ? '#10b981' : sceneIndex === 1 ? '#ef4444' : '#64748b'}` }} />
          <span>{sceneIndex === 0 ? '09:00 AM • API Call' : sceneIndex === 1 ? '02:14 AM • Production' : sceneIndex === 2 ? '10:00 AM • Breakthrough' : sceneIndex === 3 ? '10:30 AM • First Union' : '11:00 AM • Transformed'}</span>
        </div>
        {sceneIndex === 1 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '12px', color: '#fca5a5', fontSize: '12px', fontWeight: 700, transform: `scale(${pulse})` }}>
            <span>🚨 Expected User, Got Error — No Type Safety!</span>
          </div>
        ) : sceneIndex >= 3 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '12px', color: '#6ee7b7', fontSize: '12px', fontWeight: 700 }}>
            <span>🔀 Union Types Active</span>
          </div>
        ) : (
          <div style={{ padding: '6px 14px', backgroundColor: '#1e293b', borderRadius: '9999px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{sceneIndex === 0 ? '⏱ Fetching...' : sceneIndex === 2 ? '💡 Aha moment' : ''}</div>
        )}
      </div>

      <div style={{ width: '100%', maxWidth: '1000px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
        {sceneIndex === 0 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 1 • The API Problem</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>APIs Return Different Shapes — How Do You Type Them?</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>Sometimes the API returns user data. Sometimes it returns an error. Your function needs to handle both.</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '20px', padding: '24px 28px', fontFamily: '"Fira Code", monospace', fontSize: '17px', color: '#e2e8f0', lineHeight: 1.8, boxShadow: '0 20px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>// fetchUser.ts — Before Union Types</div>
              <div><span style={{ color: '#f43f5e' }}>function</span> <span style={{ color: '#38bdf8' }}>fetchUser</span>(id: number): <span style={{ color: '#fbbf24' }}>any</span> &#123;</div>
              <div style={{ paddingLeft: '24px' }}>  <span style={{ color: '#94a3b8' }}>// Is it user data? Error? Loading?</span></div>
              <div style={{ paddingLeft: '24px' }}>  <span style={{ color: '#94a3b8' }}>// No one knows. It's just "any"...</span></div>
              <div style={{ paddingLeft: '24px' }}>  <span style={{ color: '#f43f5e' }}>return</span> data;</div>
              <div>&#125;</div>
            </div>
          </div>
        )}
        {sceneIndex === 1 && (
          <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 2 • The Crash</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #f87171, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Calling .name on an Error Object</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>The function returned an error object, but the code expected user data. No one caught it — until production crashed.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', alignItems: 'center', backgroundColor: '#0f172a', border: '2px solid rgba(239, 68, 68, 0.4)', borderRadius: '24px', padding: '28px', boxShadow: '0 25px 40px rgba(239, 68, 68, 0.2)' }}>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px dashed #ef4444', borderRadius: '16px' }}>
                <div style={{ fontSize: '28px' }}>📦</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f87171', marginTop: '8px' }}>Function Returned</div>
                <div style={{ fontFamily: 'monospace', fontSize: '15px', color: '#ffffff', margin: '6px 0' }}><span style={{ color: '#fbbf24' }}>error</span>: <span style={{ color: '#fbbf24' }}>message</span>, <span style={{ color: '#fbbf24' }}>code</span>: 404</div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 900, color: '#f43f5e' }}>→</div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#7f1d1d', borderRadius: '16px', border: '1px solid #ef4444' }}>
                <div style={{ fontSize: '28px' }}>💥</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '8px' }}>Code Expected</div>
                <div style={{ fontFamily: 'monospace', fontSize: '15px', color: '#fecaca', margin: '6px 0' }}><span style={{ color: '#fbbf24' }}>id</span>: <span style={{ color: '#fbbf24' }}>name</span>, <span style={{ color: '#fbbf24' }}>email</span></div>
                <div style={{ fontSize: '11px', color: '#fecaca', fontWeight: 600 }}>undefined, undefined, undefined!</div>
              </div>
            </div>
          </div>
        )}
        {sceneIndex === 2 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 3 • The Breakthrough</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>What If We Could Say "It Could Be THIS or THAT"?</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>TypeScript's union type (|) lets you express "this value could be one of several types". It's the pipe that saves the day.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>The Problem</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  <span style={{ color: '#f43f5e' }}>any</span> → <span style={{ color: '#f43f5e' }}>no</span> type safety
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>You lose all compiler help.</div>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #10b981', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#6ee7b7', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>The Solution</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  <span style={{ color: '#34d399' }}>Success | Error</span> → <span style={{ color: '#34d399' }}>full</span> safety
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>The compiler knows both possibilities.</div>
              </div>
            </div>
          </div>
        )}
        {sceneIndex === 3 && (
          <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 4 • First Union Type</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>The Pipe Operator (|) — "Either This OR That"</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>A union type says: "this value could be any one of these types. The compiler will help you handle each case.".</p>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '2px solid #10b981', borderRadius: '24px', padding: '24px 28px', fontFamily: '"Fira Code", monospace', fontSize: '17px', color: '#e2e8f0', lineHeight: 1.8, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '14px', fontSize: '13px' }}>
                <span style={{ color: '#6ee7b7', fontWeight: 700 }}>UserAPI.ts — First Union</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>🔀 Union Active</span>
              </div>
              <div><span style={{ color: '#34d399' }}>interface</span> <span style={{ color: '#6ee7b7', fontWeight: 700 }}>User</span> &#123;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#fbbf24' }}>id</span>: <span style={{ color: '#34d399' }}>number</span>;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#fbbf24' }}>name</span>: <span style={{ color: '#34d399' }}>string</span>;</div>
              <div>&#125;</div>
              <div style={{ marginTop: '12px' }}><span style={{ color: '#34d399' }}>interface</span> <span style={{ color: '#6ee7b7', fontWeight: 700 }}>Error</span> &#123;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#fbbf24' }}>message</span>: <span style={{ color: '#34d399' }}>string</span>;</div>
              <div>&#125;</div>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #334155' }}><span style={{ color: '#94a3b8' }}>type Result = User | Error; // The pipe!</span></div>
            </div>
          </div>
        )}
        {sceneIndex === 4 && (
          <div style={{ width: '100%', maxWidth: '850px', transform: `scale(${cardScale})`, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#6ee7b7', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 5 • Transformed</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Union Types Make APIs Type-Safe</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>The compiler now tracks every possible shape. You can't forget to handle errors again.</p>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px', width: '100%' }}>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>// Before: "What does this return?"</div>
              <div style={{ color: '#64748b' }}>function fetch(id) &#123; ... &#125; <span style={{ color: '#64748b' }}>// ???</span></div>
              <div style={{ marginTop: '12px', color: '#94a3b8' }}>// After: The union IS the contract</div>
              <div style={{ color: '#e2e8f0' }}>function fetch(id): <span style={{ color: '#6ee7b7' }}>Result</span> &#123; ... &#125; <span style={{ color: '#10b981' }}>✅</span></div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Union Protocol Active</span><span>•</span><span>Remotion Audio Engine 🔊</span><span>•</span><span>FPS: {fps}</span>
      </div>
    </div>
  );
};
