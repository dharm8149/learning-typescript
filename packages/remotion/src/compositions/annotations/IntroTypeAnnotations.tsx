import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, errorBuzzer, successChime, alarmKlaxon } from '../../helpers/soundEffects';

export const IntroTypeAnnotations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 5 Scenes (40s total = 1200 frames @ 30fps)
  // Scene 1: (0 - 240 frames, 0 - 8s) The Code Review Passes
  // Scene 2: (240 - 540 frames, 8 - 18s) The Hidden Bug Revealed
  // Scene 3: (540 - 780 frames, 18 - 26s) Production Fires
  // Scene 4: (780 - 1020 frames, 26 - 34s) The Fix: Add Annotations
  // Scene 5: (1020 - 1200 frames, 34 - 40s) The Lesson Learned

  const currentSeconds = frame / fps;
  let sceneIndex = 0;
  let sceneFrame = 0;

  if (frame < 240) {
    sceneIndex = 0;
    sceneFrame = frame;
  } else if (frame < 540) {
    sceneIndex = 1;
    sceneFrame = frame - 240;
  } else if (frame < 780) {
    sceneIndex = 2;
    sceneFrame = frame - 540;
  } else if (frame < 1020) {
    sceneIndex = 3;
    sceneFrame = frame - 780;
  } else {
    sceneIndex = 4;
    sceneFrame = frame - 1020;
  }

  const cardScale = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 13, mass: 0.8 }
  });

  const pulse = Math.sin(frame * 0.15) > 0 ? 1 : 0.85;

  return (
    <div style={{
      flex: 1,
      height: '100%',
      backgroundColor: '#030712',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '36px 48px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background Ambiance */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        left: sceneIndex === 4 ? '50%' : sceneIndex === 3 ? '60%' : sceneIndex === 2 ? '70%' : sceneIndex === 1 ? '50%' : '30%',
        width: '550px',
        height: '550px',
        backgroundColor: sceneIndex === 4
          ? 'rgba(59, 130, 246, 0.22)'
          : sceneIndex === 3
          ? 'rgba(16, 185, 129, 0.18)'
          : sceneIndex === 2
          ? 'rgba(239, 68, 68, 0.22)'
          : sceneIndex === 1
          ? 'rgba(245, 158, 11, 0.15)'
          : 'rgba(139, 92, 246, 0.12)',
        borderRadius: '50%',
        filter: 'blur(130px)',
        pointerEvents: 'none',
        transition: 'all 0.8s ease'
      }} />

      {/* Synchronized Sound Effects */}
      <Sequence from={120} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={240} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={260} durationInFrames={25}>
        <Audio src={errorBuzzer} volume={0.7} />
      </Sequence>
      <Sequence from={540} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={560} durationInFrames={30}>
        <Audio src={alarmKlaxon} volume={0.75} />
      </Sequence>
      <Sequence from={780} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={800} durationInFrames={25}>
        <Audio src={successChime} volume={0.7} />
      </Sequence>
      <Sequence from={1020} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>

      {/* TOP BAR */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            backgroundColor: '#0f172a',
            border: `1px solid ${sceneIndex >= 3 ? '#334155' : sceneIndex === 2 ? '#ef4444' : '#f59e0b'}`,
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 800,
            fontFamily: 'monospace',
            color: sceneIndex >= 3 ? '#60a5fa' : sceneIndex === 2 ? '#f87171' : '#fbbf24'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: sceneIndex >= 3 ? '#3b82f6' : sceneIndex === 2 ? '#ef4444' : '#f59e0b',
              boxShadow: `0 0 10px ${sceneIndex >= 3 ? '#3b82f6' : sceneIndex === 2 ? '#ef4444' : '#f59e0b'}`
            }} />
            <span>{sceneIndex === 0 ? '09:00 AM • Code Review' : sceneIndex === 1 ? '09:01 AM • Review Passes' : sceneIndex === 2 ? '2:14 AM • PagerDuty Alert' : sceneIndex === 3 ? '10:00 AM • Code Fix' : '10:05 AM • Lesson Learned'}</span>
          </div>
        </div>

        {sceneIndex === 2 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            borderRadius: '12px',
            color: '#fca5a5',
            fontSize: '12px',
            fontWeight: 700,
            transform: `scale(${pulse})`,
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.25)'
          }}>
            <span>🚨 Garbled Order Data — Type 'any' Silently Accepted Strings!</span>
          </div>
        ) : sceneIndex === 3 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid #10b981',
            borderRadius: '12px',
            color: '#6ee7b7',
            fontSize: '12px',
            fontWeight: 700
          }}>
            <span>🛡️ Annotations Added — TypeScript Now Enforces the Contract</span>
          </div>
        ) : (
          <div style={{
            padding: '6px 14px',
            backgroundColor: '#1e293b',
            borderRadius: '9999px',
            fontSize: '12px',
            color: '#94a3b8',
            fontWeight: 600
          }}>
            {sceneIndex === 0 ? '⏱ Review in progress' : sceneIndex === 1 ? '✅ Looks clean' : sceneIndex === 4 ? '📝 Key insight' : ''}
          </div>
        )}
      </div>

      {/* CENTER VISUAL STAGE */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0'
      }}>
        {/* SCENE 1: CODE REVIEW — looks clean */}
        {sceneIndex === 0 && (
          <div style={{
            width: '100%',
            maxWidth: '850px',
            transform: `scale(${cardScale})`,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#a78bfa', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 1 • Code Review</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>The Code Review Looks Clean — No Errors</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>A junior dev wrote clean code. No explicit type annotations anywhere — everything is inferred.</p>
            </div>
            <div style={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '20px',
              padding: '24px 28px',
              fontFamily: '"Fira Code", monospace',
              fontSize: '18px',
              color: '#e2e8f0',
              lineHeight: 1.8,
              boxShadow: '0 20px 30px rgba(0,0,0,0.5)'
            }}>
              <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>// checkout.ts (No Annotations)</div>
              <div><span style={{ color: '#f43f5e' }}>function</span> <span style={{ color: '#38bdf8' }}>calculateTotal</span>(price, quantity) &#123;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#f43f5e' }}>return</span> price * quantity;</div>
              <div>&#125;</div>
              <div><span style={{ color: '#10b981' }}>const</span> <span style={{ color: '#38bdf8' }}>result</span> = calculateTotal(49.99, 2);</div>
            </div>
          </div>
        )}

        {/* SCENE 2: HIDDEN BUG */}
        {sceneIndex === 1 && (
          <div style={{
            width: '100%',
            maxWidth: '900px',
            transform: `scale(${cardScale})`,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 2 • The Hidden Bug</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>Without Annotations, Parameters Default to 'any'</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>The function silently accepts strings, numbers, and undefined — no compiler warning.</p>
            </div>
            <div style={{
              backgroundColor: '#0f172a',
              border: '2px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '24px',
              padding: '28px',
              fontFamily: '"Fira Code", monospace',
              fontSize: '17px',
              color: '#e2e8f0',
              lineHeight: 1.8,
              boxShadow: '0 25px 40px rgba(245, 158, 11, 0.15)'
            }}>
              <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>// What TypeScript Infers</div>
              <div><span style={{ color: '#f43f5e' }}>function</span> <span style={{ color: '#38bdf8' }}>calculateTotal</span>(price: <span style={{ color: '#f59e0b', fontWeight: 700 }}>any</span>, quantity: <span style={{ color: '#f59e0b', fontWeight: 700 }}>any</span>) &#123;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#f43f5e' }}>return</span> price * quantity;</div>
              <div>&#125;</div>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #334155' }}><span style={{ color: '#94a3b8' }}>calculateTotal("$49.99", "two"); // 😱 Returns NaN — no error!</span></div>
            </div>
          </div>
        )}

        {/* SCENE 3: PRODUCTION FIRES */}
        {sceneIndex === 2 && (
          <div style={{
            width: '100%',
            maxWidth: '850px',
            transform: `scale(${cardScale})`,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 3 • Production Failure</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #f87171, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Real Users Receive Garbled Order Data</h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>A string meant for a name field gets fed into a numeric ID field. The math silently returns NaN.</p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 40px 1fr',
              alignItems: 'center',
              backgroundColor: '#0f172a',
              border: '2px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 25px 40px rgba(239, 68, 68, 0.2)'
            }}>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px dashed #ef4444', borderRadius: '16px' }}>
                <div style={{ fontSize: '28px' }}>📦</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f87171', marginTop: '8px' }}>Order ID Input</div>
                <div style={{ fontSize: '22px', fontWeight: 900, fontFamily: 'monospace', color: '#ffffff', margin: '6px 0' }}>cust_9882</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>String sent to math function</div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 900, color: '#f43f5e' }}>→</div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#7f1d1d', borderRadius: '16px', border: '1px solid #ef4444' }}>
                <div style={{ fontSize: '28px' }}>💥</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginTop: '8px' }}>Result: NaN</div>
                <div style={{ fontSize: '22px', fontWeight: 900, fontFamily: 'monospace', color: '#fecaca', margin: '6px 0' }}>Order $NaN.82</div>
                <div style={{ fontSize: '11px', color: '#fecaca', fontWeight: 600 }}>142 orders corrupted</div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 4: THE FIX */}
        {sceneIndex === 3 && (
          <div style={{
            width: '100%',
            maxWidth: '900px',
            transform: `scale(${cardScale})`,
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 4 • The Fix</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', color: '#ffffff' }}>Add Explicit Type Annotations to Parameters</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>TypeScript immediately flags the type mismatch. The bug is caught before reaching production.</p>
            </div>
            <div style={{
              backgroundColor: '#0f172a',
              border: '2px solid #10b981',
              borderRadius: '24px',
              padding: '24px 28px',
              fontFamily: '"Fira Code", monospace',
              fontSize: '17px',
              color: '#e2e8f0',
              lineHeight: 1.8,
              boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '14px', fontSize: '13px' }}>
                <span style={{ color: '#10b981', fontWeight: 700 }}>checkout.ts (Fixed)</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>✅ No Errors</span>
              </div>
              <div><span style={{ color: '#f43f5e' }}>function</span> <span style={{ color: '#38bdf8' }}>calculateTotal</span>(price: <span style={{ color: '#34d399', fontWeight: 700 }}>number</span>, quantity: <span style={{ color: '#34d399', fontWeight: 700 }}>number</span>): <span style={{ color: '#34d399', fontWeight: 700 }}>number</span> &#123;</div>
              <div style={{ paddingLeft: '24px' }}><span style={{ color: '#f43f5e' }}>return</span> price * quantity;</div>
              <div>&#125;</div>
              <div style={{ marginTop: '12px' }}><span style={{ color: '#10b981' }}>calculateTotal("$49.99", 2);</span> <span style={{ color: '#ef4444' }}>// ❌ Error: Type 'string' is not assignable to type 'number'.</span></div>
            </div>
          </div>
        )}

        {/* SCENE 5: THE LESSON */}
        {sceneIndex === 4 && (
          <div style={{
            width: '100%',
            maxWidth: '850px',
            transform: `scale(${cardScale})`,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#60a5fa', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Act 5 • The Lesson</span>
              <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '6px 0', background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Inference for Variables, Annotations for Contracts</h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>Function parameters are developer contracts — they MUST be explicitly typed. Local variables? Let inference handle it.</p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              width: '100%'
            }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#10b981', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>✅ Do This</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  <span style={{ color: '#38bdf8' }}>function</span> greet(name: <span style={{ color: '#34d399' }}>string</span>): <span style={{ color: '#34d399' }}>string</span> &#123;<br/>
                  &nbsp;&nbsp;<span style={{ color: '#f43f5e' }}>return</span> `Hi, ${name}`;<br/>
                  &#125;
                </div>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>✅ Also Fine</div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  <span style={{ color: '#10b981' }}>const</span> <span style={{ color: '#38bdf8' }}>greeting</span> = greet("Alex");<br/>
                  <span style={{ color: '#64748b' }}>// Inferred: string</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Annotation Protocol Active</span>
        <span>•</span>
        <span>Remotion Audio Engine 🔊</span>
        <span>•</span>
        <span>FPS: {fps}</span>
      </div>
    </div>
  );
};
