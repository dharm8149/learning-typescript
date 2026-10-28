import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, victoryFanfare } from '../../helpers/soundEffects';

export const OutroTypeAnnotations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 Scenes (18s = 540 frames @ 30fps)
  const sceneIndex = Math.floor(frame / 180);
  const sceneFrame = frame % 180;

  const scale = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 14 }
  });

  let storyBadge = "📐 The Goldilocks Principle";
  let storyHeading = "Too Many Annotations = Verbose. Too Few = Unsafe.";
  let storyNarration = "The industry standard is elegant: annotate your public API — function parameters and return types. Inside the function body? Let inference handle the implementation.";
  let codeSnippet = `// PUBLIC API — Explicitly annotated (the contract)
function createUser(
  name: string,
  age: number,
  email: string
): User &#123;
  // PRIVATE IMPLEMENTATION — Inferred (no annotations needed)
  const normalizedName = name.trim();
  const verified = email.includes('@');
  return &#123; normalizedName, age, email, verified &#125;;
}`;
  let highlightLine = 1;
  let hasError = false;
  let errorMessage = '';

  if (sceneIndex === 1) {
    storyBadge = "🏢 TypeScript's Own Source Code";
    storyHeading = "Even Microsoft's Compiler Follows This Rule";
    storyNarration = "The TypeScript compiler team wrote their own compiler using this exact pattern. Every public function parameter in the compiler's source code has explicit annotations. Private variables? All inferred.";
    codeSnippet = `// TypeScript Compiler Source (Simplified)
// PUBLIC: Explicitly annotated
function createSourceFile(
  fileName: string,
  sourceText: string,
  languageVersion: ScriptTarget,
  setNodeFlags?: NodeFlags
): SourceFile &#123;
  // PRIVATE: All inferred internally
  const parsed = parse(sourceText);
  return &#123; fileName, parsed, exports: &#123;&#125; &#125;;
&#125;;`;
    highlightLine = 2;
    hasError = false;
  } else {
    storyBadge = "🎯 Your New Rule for Life";
    storyHeading = "Parameters + Return Types → Annotated. Everything Else → Inferred.";
    storyNarration = "Here's your rule: annotate the contract, infer the implementation. You just cut your bug surface in half and made refactoring 10x safer.";
    codeSnippet = `// ✅ ANNOTATE these (the contract):
function calculateDiscount(
  price: number,
  tier: "gold" | "silver" | "bronze"
): number &#123; ... &#125;

// ✅ INFER these (the implementation):
const goldRate = calculateDiscount(100, "gold");
//      ↑ inferred: number — no annotation needed!`;
    highlightLine = 1;
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
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '20%',
        width: '500px',
        height: '500px',
        backgroundColor: sceneIndex === 1
          ? 'rgba(99, 102, 241, 0.15)'
          : 'rgba(16, 185, 129, 0.15)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        pointerEvents: 'none'
      }} />

      {/* Audio Sequences */}
      <Sequence from={0} durationInFrames={20}>
        <Audio src={victoryFanfare} volume={0.7} />
      </Sequence>
      <Sequence from={180} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={190} durationInFrames={20}>
        <Audio src={successChime} volume={0.7} />
      </Sequence>
      <Sequence from={360} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={370} durationInFrames={25}>
        <Audio src={victoryFanfare} volume={0.65} />
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
        <div style={{
          padding: '6px 14px',
          backgroundColor: sceneIndex === 1 ? '#312e81' : '#064e3b',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 700,
          color: sceneIndex === 1 ? '#c7d2fe' : '#a7f3d0',
          border: `1px solid ${sceneIndex === 1 ? '#6366f1' : '#059669'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: sceneIndex === 1 ? '#6366f1' : '#10b981',
            display: 'inline-block'
          }} />
          <span>{storyBadge}</span>
        </div>

        <div style={{
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
          <span>✅ Zero 'any' • Zero Runtime Bugs • Zero Doubt</span>
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
          title="annotation-pattern.ts"
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
              backgroundColor: step === sceneIndex
                ? (step === 1 ? '#6366f1' : '#10b981')
                : '#334155',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};
