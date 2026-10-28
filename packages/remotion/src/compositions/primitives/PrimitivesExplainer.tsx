import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, errorBuzzer, successChime } from '../../helpers/soundEffects';

export const PrimitivesExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide transitions based on frame count
  // 0-112: Intro & JavaScript Runtime Bug (3.75s)
  // 112-225: TypeScript Static Typing Prevention (3.75s)
  // 225-337: Memory Representation (3.75s)
  // 337-450: Zero-Cost Transpilation (3.75s)

  const phase = Math.floor(frame / (fps * 3.75));

  const scale = spring({
    frame: frame % (fps * 3.75),
    fps,
    config: { damping: 14 }
  });

  const opacity = interpolate(
    frame % (fps * 3.75),
    [0, 15],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  let slideTitle = "1. JavaScript Runtime Typing Risk";
  let slideSubtitle = "In pure JavaScript, types mutate dynamically at runtime without warning.";
  let codeSnippet = `let balance = 100;\nbalance = "one hundred";\n\n// What happens next?\nconsole.log(balance * 2); // ❌ NaN!`;
  let highlightLine = 2;
  let hasError = false;
  let errorMessage = "";

  if (phase === 1) {
    slideTitle = "2. TypeScript Static Guardrails";
    slideSubtitle = "TypeScript prevents type confusion at compile-time before your code ever runs.";
    codeSnippet = `let balance: number = 100;\nbalance = "one hundred";\n\nconsole.log(balance * 2);`;
    highlightLine = 2;
    hasError = true;
    errorMessage = "TS2322: Type 'string' is not assignable to type 'number'.";
  } else if (phase === 2) {
    slideTitle = "3. Core Primitives in Memory";
    slideSubtitle = "Primitives (string, number, boolean, symbol, bigint, null, undefined) are immutable & passed by value.";
    codeSnippet = `const id: symbol = Symbol("id");\nconst token: bigint = 9007199254740995n;\nconst active: boolean = true;\nconst empty: null = null;`;
    highlightLine = 1;
    hasError = false;
  } else if (phase >= 3) {
    slideTitle = "4. Zero Runtime Overhead";
    slideSubtitle = "During build, types vanish (type erasure). You get clean, unbloated JavaScript.";
    codeSnippet = `// Original Source:\nlet balance: number = 100;\n\n// Transpiled Output:\nlet balance = 100;`;
    highlightLine = 5;
    hasError = false;
  }

  return (
    <div style={{
      flex: 1,
      height: '100%',
      backgroundColor: '#030712',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 60px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative'
    }}>
      {/* Remotion Synchronized Audio Sound Effects */}
      <Sequence from={0} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={112} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={125} durationInFrames={20}>
        <Audio src={errorBuzzer} volume={0.8} />
      </Sequence>
      <Sequence from={225} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={240} durationInFrames={20}>
        <Audio src={successChime} volume={0.7} />
      </Sequence>
      <Sequence from={337} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>

      {/* Header Banner */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px',
        opacity,
        transform: `scale(${scale})`
      }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 14px',
          backgroundColor: '#1d4ed8',
          borderRadius: '9999px',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          TypeScript 5.8 Masterclass
        </div>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 800,
          margin: '0 0 8px 0',
          background: 'linear-gradient(to right, #60a5fa, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {slideTitle}
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#94a3b8',
          margin: 0,
          maxWidth: '800px'
        }}>
          {slideSubtitle}
        </p>
      </div>

      {/* Animated Code Window */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        transform: `scale(${scale})`,
        opacity
      }}>
        <CodeWindow
          title="section-01-primitives.ts"
          code={codeSnippet}
          highlightLine={highlightLine}
          hasError={hasError}
          errorMessage={errorMessage}
        />
      </div>

      {/* Footer Pill */}
      <div style={{
        marginTop: '28px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        color: '#64748b'
      }}>
        <span>Interactive Mode Enabled</span>
        <span>•</span>
        <span>Remotion Audio Engine Active 🔊</span>
        <span>•</span>
        <span>FPS: {fps}</span>
      </div>
    </div>
  );
};
