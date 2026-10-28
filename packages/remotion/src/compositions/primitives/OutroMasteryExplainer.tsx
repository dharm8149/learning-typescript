import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import {
  transitionWhoosh,
  successChime,
  victoryFanfare,
  shieldActivation
} from '../../helpers/soundEffects';

export const OutroMasteryExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 Narrative Scenes (15s total = 450 frames @ 30fps)
  // Scene 1: (0 - 150 frames, 0 - 5s) The Next Morning: Alex Types with Confidence
  // Scene 2: (150 - 300 frames, 5 - 10s) Production Scale: How Stripe & Airbnb Scale Primitives
  // Scene 3: (300 - 450 frames, 10 - 15s) PR Merged, Zero 2 AM Alerts, Superpower Unlocked!

  const sceneIndex = Math.floor(frame / 150);
  const sceneFrame = frame % 150;

  const scale = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 14 }
  });

  const toastSlide = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 12 }
  });

  let storyBadge = "☀️ Next Morning • 09:30 AM • Confident Coding";
  let storyHeading = "The Superpower: Zero-Doubt Development";
  let storyNarration = "Alex sat down the next morning. With TypeScript's 7 primitives defined, the IDE became an invincible co-pilot.";
  let codeSnippet = `// The 7 Primitives form the bedrock of all enterprise contracts:\nconst customerId: string = "cust_9882";\nconst orderTotal: number = 99.98;\nconst isVerified: boolean = true;\nconst token: symbol = Symbol("idempotency_token");\nconst highPrecisionUnits: bigint = 1000000000000n;`;
  let highlightLine = 2;
  let hasError = false;
  let errorMessage = "";

  if (sceneIndex === 1) {
    storyBadge = "🌐 Production Scale • Stripe & Enterprise APIs";
    storyHeading = "How Billion-Dollar Systems Rely on Primitives";
    storyNarration = "Companies like Stripe use these exact primitive types to process billions in payments without a single type coercion glitch.";
    codeSnippet = `// Enterprise API Contract built on primitives:\ninterface PaymentPayload {\n  amount: number;       // Exact number (prevents "$NaN" bugs!)\n  currency: string;     // ISO standard currency\n  settled: boolean;     // Boolean confirmation\n  sessionKey: symbol;   // Guaranteed unique memory address\n}\n\n// Zero runtime bloat: Type erasure leaves pure, fast JavaScript!`;
    highlightLine = 2;
    hasError = false;
  } else if (sceneIndex >= 2) {
    storyBadge = "🎉 PR Merged • 0 Incidents • Black Friday Saved";
    storyHeading = "PR Approved: 100% Tests Green, Zero Alerts";
    storyNarration = "Alex deployed the TypeScript refactor. 0 production incidents. No 2 AM calls. Just solid, predictable code.";
    codeSnippet = `// GitHub Pull Request #482: Refactor to TypeScript\n// ✅ All 142 automated compiler checks passed.\n// ✅ 0 Type Errors detected.\n// 🚀 Deployment successful: 100% uptime on Black Friday!`;
    highlightLine = 3;
    hasError = false;
  }

  return (
    <div style={{
      flex: 1,
      height: '100%',
      backgroundColor: '#020617',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px 50px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Emerald / Blue Glow */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '20%',
        width: '500px',
        height: '500px',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        pointerEvents: 'none'
      }} />

      {/* Audio Sequences */}
      <Sequence from={0} durationInFrames={25}>
        <Audio src={victoryFanfare} volume={0.8} />
      </Sequence>
      <Sequence from={150} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={160} durationInFrames={20}>
        <Audio src={successChime} volume={0.7} />
      </Sequence>
      <Sequence from={300} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={310} durationInFrames={30}>
        <Audio src={victoryFanfare} volume={0.75} />
      </Sequence>

      {/* Top Header */}
      <div style={{
        width: '100%',
        maxWidth: '920px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        {/* Status Pill */}
        <div style={{
          padding: '6px 14px',
          backgroundColor: '#064e3b',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 700,
          color: '#a7f3d0',
          border: '1px solid #059669',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            display: 'inline-block'
          }} />
          <span>{storyBadge}</span>
        </div>

        {/* Victory Toast */}
        <div style={{
          transform: `translateY(${(1 - toastSlide) * -20}px)`,
          opacity: toastSlide,
          padding: '6px 16px',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid #10b981',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 700,
          color: '#a7f3d0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
        }}>
          <span>✨ PagerDuty: 0 Incidents • All Systems Operational</span>
        </div>
      </div>

      {/* Narrative Headline */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        maxWidth: '850px'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 900,
          margin: '0 0 6px 0',
          background: 'linear-gradient(to right, #34d399, #60a5fa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          {storyHeading}
        </h2>
        <p style={{
          fontSize: '15px',
          color: '#94a3b8',
          margin: 0,
          lineHeight: 1.5
        }}>
          {storyNarration}
        </p>
      </div>

      {/* Code Window */}
      <div style={{
        width: '100%',
        maxWidth: '920px',
        transform: `scale(${scale})`
      }}>
        <CodeWindow
          title="production-payment-verified.ts"
          code={codeSnippet}
          highlightLine={highlightLine}
          hasError={hasError}
          errorMessage={errorMessage}
        />
      </div>

      {/* Story Timeline Dots */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '20px'
      }}>
        {[0, 1, 2].map((step) => (
          <div
            key={step}
            style={{
              width: step === sceneIndex ? '28px' : '8px',
              height: '8px',
              borderRadius: '9999px',
              backgroundColor: step === sceneIndex ? '#10b981' : '#334155',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};
