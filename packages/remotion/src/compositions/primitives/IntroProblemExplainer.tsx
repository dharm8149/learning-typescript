import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import {
  transitionWhoosh,
  errorBuzzer,
  alarmKlaxon,
  pagerDutyPing,
  shieldActivation,
  successChime
} from '../../helpers/soundEffects';

export const IntroProblemExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 4 Narrative Scenes (36s total = 1080 frames @ 30fps)
  // Scene 1: (0 - 240 frames, 0 - 8s) 02:14 AM Startup Office: Alex Coding Under Pressure
  // Scene 2: (240 - 540 frames, 8 - 18s) The Innocent Mistake ($49.99 * 2 = $NaN Explodes in Production)
  // Scene 3: (540 - 780 frames, 18 - 26s) Why Vanilla JS Failed Alex (Zero Compile-Time Guardrails)
  // Scene 4: (780 - 1080 frames, 26 - 36s) Enter TypeScript: The Compiler Shield & Instant Squiggle Fix

  const currentSeconds = frame / fps;
  let sceneIndex = 0;
  let sceneProgress = 0;

  if (frame < 240) {
    sceneIndex = 0;
    sceneProgress = frame / 240;
  } else if (frame < 540) {
    sceneIndex = 1;
    sceneProgress = (frame - 240) / 300;
  } else if (frame < 780) {
    sceneIndex = 2;
    sceneProgress = (frame - 540) / 240;
  } else {
    sceneIndex = 3;
    sceneProgress = (frame - 780) / 300;
  }

  const sceneFrame = frame < 240 ? frame : frame < 540 ? frame - 240 : frame < 780 ? frame - 540 : frame - 780;

  const cardScale = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 13, mass: 0.8 }
  });

  const alertPulse = Math.sin(frame * 0.15) > 0 ? 1 : 0.85;

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
        left: sceneIndex === 3 ? '50%' : sceneIndex === 1 ? '70%' : '20%',
        width: '550px',
        height: '550px',
        backgroundColor: sceneIndex === 3
          ? 'rgba(49, 120, 198, 0.22)'
          : sceneIndex === 1
          ? 'rgba(239, 68, 68, 0.22)'
          : 'rgba(245, 158, 11, 0.15)',
        borderRadius: '50%',
        filter: 'blur(130px)',
        pointerEvents: 'none',
        transition: 'all 0.8s ease'
      }} />

      {/* Synchronized Sound Effects */}
      {/* Scene 1: Initial alert at 1.5s */}
      <Sequence from={45} durationInFrames={20}>
        <Audio src={pagerDutyPing} volume={0.6} />
      </Sequence>
      {/* Scene 2: Alarm Klaxon when NaN explodes at 8.5s */}
      <Sequence from={240} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={255} durationInFrames={30}>
        <Audio src={alarmKlaxon} volume={0.8} />
      </Sequence>
      <Sequence from={340} durationInFrames={25}>
        <Audio src={errorBuzzer} volume={0.75} />
      </Sequence>
      {/* Scene 3: Whoosh transition at 18s */}
      <Sequence from={540} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      {/* Scene 4: TypeScript Shield Activation at 26s & Success Chime at 32s */}
      <Sequence from={780} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={795} durationInFrames={30}>
        <Audio src={shieldActivation} volume={0.85} />
      </Sequence>
      <Sequence from={960} durationInFrames={25}>
        <Audio src={successChime} volume={0.8} />
      </Sequence>

      {/* TOP BAR: Environment Status & PagerDuty Alert */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Digital Clock & Context */}
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
            border: '1px solid #334155',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 800,
            fontFamily: 'monospace',
            color: sceneIndex === 3 ? '#60a5fa' : sceneIndex === 1 ? '#f87171' : '#fbbf24'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: sceneIndex === 3 ? '#3b82f6' : sceneIndex === 1 ? '#ef4444' : '#f59e0b',
              boxShadow: `0 0 10px ${sceneIndex === 3 ? '#3b82f6' : sceneIndex === 1 ? '#ef4444' : '#f59e0b'}`
            }} />
            <span>02:14:38 AM • Startup Office</span>
          </div>

          <div style={{
            padding: '6px 14px',
            backgroundColor: '#1e293b',
            borderRadius: '9999px',
            fontSize: '12px',
            color: '#94a3b8',
            fontWeight: 600
          }}>
            ⏳ Black Friday Launch: 03h 45m left
          </div>
        </div>

        {/* Dynamic Toast Badge */}
        {sceneIndex < 3 ? (
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
            transform: `scale(${sceneIndex === 1 ? alertPulse : 1})`,
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.25)'
          }}>
            <span>🚨 PagerDuty: 3,420 Checkout Failures</span>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            border: '1px solid #3b82f6',
            borderRadius: '12px',
            color: '#93c5fd',
            fontSize: '12px',
            fontWeight: 700,
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.25)'
          }}>
            <span>🛡️ TypeScript Shield: Compile-Time Verification Active</span>
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
        {/* SCENE 1: ALEX CODING IN THE LATE NIGHT (0 - 8s) */}
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
              <span style={{
                color: '#f59e0b',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Act 1 • Late-Night Crunch
              </span>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 900,
                margin: '6px 0',
                color: '#ffffff'
              }}>
                Alex is Building the Checkout in Vanilla JavaScript
              </h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>
                Rushing to ship the payment function before the midnight deadline.
              </p>
            </div>

            {/* Code Card */}
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
              <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>// checkout.js (Pure JavaScript)</div>
              <div><span style={{ color: '#f43f5e' }}>function</span> <span style={{ color: '#38bdf8' }}>calculateTotal</span>(price, quantity) &#123;</div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: '#f43f5e' }}>return</span> price * quantity; <span style={{ color: '#64748b' }}>// Assumes numbers!</span>
              </div>
              <div>&#125;</div>
            </div>
          </div>
        )}

        {/* SCENE 2: THE INNOCENT MISTAKE ($49.99 * 2 = $NaN EXPLOSION) (8 - 18s) */}
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
              <span style={{
                color: '#ef4444',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Act 2 • The Runtime Catastrophe
              </span>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 900,
                margin: '6px 0',
                background: 'linear-gradient(to right, #f87171, #fb923c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                "$49.99" * 2 = $NaN in Production
              </h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>
                A web form input passes a formatted string with a dollar sign. JavaScript multiplies it silently!
              </p>
            </div>

            {/* Visual Arithmetic Dissection Card */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 60px 1fr 60px 1.4fr',
              alignItems: 'center',
              backgroundColor: '#0f172a',
              border: '2px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 25px 40px rgba(239, 68, 68, 0.2)'
            }}>
              {/* Box 1: Form String Input */}
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: '#f87171', fontWeight: 800, textTransform: 'uppercase' }}>
                  Form Input (String)
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'monospace', color: '#ffffff', margin: '6px 0' }}>
                  "$49.99"
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>typeof: "string" ⚠️</div>
              </div>

              {/* Operator */}
              <div style={{ textAlign: 'center', fontSize: '28px', fontWeight: 900, color: '#f43f5e' }}>
                ×
              </div>

              {/* Box 2: Quantity */}
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 800, textTransform: 'uppercase' }}>
                  Cart Quantity
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'monospace', color: '#ffffff', margin: '6px 0' }}>
                  2
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>typeof: "number"</div>
              </div>

              {/* Equals */}
              <div style={{ textAlign: 'center', fontSize: '28px', fontWeight: 900, color: '#f43f5e' }}>
                =
              </div>

              {/* Box 3: The Fatal NaN Result */}
              <div style={{
                backgroundColor: '#7f1d1d',
                border: '2px solid #ef4444',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center',
                boxShadow: '0 0 25px rgba(239, 68, 68, 0.5)'
              }}>
                <div style={{ fontSize: '11px', color: '#fca5a5', fontWeight: 800, textTransform: 'uppercase' }}>
                  Customer Invoices
                </div>
                <div style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'monospace', color: '#ffffff', margin: '6px 0' }}>
                  Total: $NaN
                </div>
                <div style={{ fontSize: '11px', color: '#fecaca', fontWeight: 600 }}>💥 3,400 Credit Cards Failed!</div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 3: WHY JAVASCRIPT FAILED (18 - 26s) */}
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
              <span style={{
                color: '#f59e0b',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Act 3 • The Root Cause
              </span>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 900,
                margin: '6px 0',
                color: '#ffffff'
              }}>
                Why Didn't JavaScript Warn Alex?
              </h1>
              <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>
                Vanilla JavaScript has no compiler step. It only evaluates types when running in the customer's browser.
              </p>
            </div>

            {/* Comparison Flow */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 60px 1fr 60px 1fr',
              alignItems: 'center',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '24px',
              padding: '30px'
            }}>
              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#1e293b', borderRadius: '16px' }}>
                <div style={{ fontSize: '28px' }}>💻</div>
                <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '8px' }}>Developer Editor</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Types code with zero warnings</div>
              </div>

              <div style={{ textAlign: 'center', color: '#64748b', fontSize: '20px' }}>➔</div>

              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px dashed #ef4444', borderRadius: '16px' }}>
                <div style={{ fontSize: '28px' }}>⚠️</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f87171', marginTop: '8px' }}>NO Compiler Layer</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Zero type verification</div>
              </div>

              <div style={{ textAlign: 'center', color: '#64748b', fontSize: '20px' }}>➔</div>

              <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#7f1d1d', borderRadius: '16px', border: '1px solid #ef4444' }}>
                <div style={{ fontSize: '28px' }}>💥</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '8px' }}>Customer Browser</div>
                <div style={{ fontSize: '11px', color: '#fca5a5' }}>Crash occurs in production!</div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 4: ENTER TYPESCRIPT & INSTANT SQUIGGLE FIX (26 - 36s) */}
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
              <span style={{
                color: '#38bdf8',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Act 4 • The Solution
              </span>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 900,
                margin: '6px 0',
                background: 'linear-gradient(to right, #60a5fa, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                TypeScript Blocks the Bug Right at the Cursor
              </h1>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>
                Static type contracts place an instant red squiggle before saving. Black Friday is saved!
              </p>
            </div>

            {/* TypeScript Editor Window */}
            <div style={{
              backgroundColor: '#0f172a',
              border: '2px solid #3b82f6',
              borderRadius: '24px',
              padding: '24px 28px',
              fontFamily: '"Fira Code", monospace',
              fontSize: '17px',
              color: '#e2e8f0',
              lineHeight: 1.8,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '14px', fontSize: '13px' }}>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>checkout.ts (TypeScript Enabled)</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>✅ Type Checker: Live</span>
              </div>

              <div>
                <span style={{ color: '#f43f5e' }}>function</span> <span style={{ color: '#38bdf8' }}>calculateTotal</span>(price: <span style={{ color: '#38bdf8', fontWeight: 700 }}>number</span>, quantity: <span style={{ color: '#38bdf8', fontWeight: 700 }}>number</span>): <span style={{ color: '#38bdf8', fontWeight: 700 }}>number</span> &#123;
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: '#f43f5e' }}>return</span> price * quantity;
              </div>
              <div>&#125;</div>

              <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #1e293b' }}>
                <span style={{ color: '#64748b' }}>// When Alex passes a string:</span>
                <div>
                  calculateTotal(<span style={{
                    color: '#f87171',
                    textDecoration: 'underline wavy #ef4444',
                    textUnderlineOffset: '5px',
                    fontWeight: 700
                  }}>"{frame > 950 ? '49.99' : '$49.99'}"</span>, 2);
                </div>
              </div>

              {/* Red Squiggle Tooltip */}
              <div style={{
                marginTop: '14px',
                padding: '10px 16px',
                backgroundColor: frame > 950 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                border: frame > 950 ? '1px solid #10b981' : '1px solid #ef4444',
                borderRadius: '10px',
                color: frame > 950 ? '#6ee7b7' : '#fca5a5',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>{frame > 950 ? '✅ Fixed to number: Zero errors! Code ready for production!' : '❌ TS2345: Argument of type \'string\' is not assignable to parameter of type \'number\'.'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM PROGRESS TIMELINE */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '14px',
        borderTop: '1px solid #1e293b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[
            "1. 02:14 AM Crunch",
            "2. The $NaN Bug",
            "3. Why JS Failed",
            "4. TypeScript Shield"
          ].map((title, idx) => (
            <div
              key={idx}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: 'monospace',
                backgroundColor: idx === sceneIndex
                  ? (idx === 3 ? '#1d4ed8' : '#7f1d1d')
                  : '#0f172a',
                color: idx === sceneIndex ? '#ffffff' : '#64748b',
                border: idx === sceneIndex ? (idx === 3 ? '1px solid #3b82f6' : '1px solid #ef4444') : '1px solid #1e293b'
              }}
            >
              {title}
            </div>
          ))}
        </div>

        <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
          {currentSeconds.toFixed(1)}s / 36.0s
        </div>
      </div>
    </div>
  );
};
