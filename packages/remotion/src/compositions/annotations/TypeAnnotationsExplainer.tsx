import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime } from '../../helpers/soundEffects';

export const TypeAnnotationsExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 4 Phases (18s = 540 frames @ 30fps)
  const phase = Math.floor(frame / (fps * 4.5));

  const scale = spring({
    frame: frame % (fps * 4.5),
    fps,
    config: { damping: 14 }
  });

  const opacity = interpolate(
    frame % (fps * 4.5),
    [0, 15],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  let slideTitle = "1. const Variables → Auto-Inferred";
  let slideSubtitle = "When you declare a const with a value, TypeScript infers the type instantly — no annotation needed.";
  let codeSnippet = `const username = "alice_dev";      // inferred: string
const maxRetries = 3;              // inferred: number
const isAuthenticated = false;     // inferred: boolean
const items = [1, 2, 3];           // inferred: number[]`;
  let highlightLine = 1;
  let hasError = false;
  let errorMessage = '';

  if (phase === 1) {
    slideTitle = "2. Function Parameters → Must Annotate";
    slideSubtitle = "Parameters have no initial value — TypeScript cannot guess what you expect. Without annotations, they become 'any'.";
    codeSnippet = `// ❌ BAD: No annotations → both are 'any'
function greet(name, age) &#123;
  return &#96;Hi &#123;&#123;name&#125;&#125;, age &#123;&#123;age&#125;&#125;&#96;;
&#125;

// ✅ GOOD: Explicit parameter types
function greet(name: string, age: number): string &#123;
  return &#96;Hi &#123;&#123;name&#125;&#125;, age &#123;&#123;age&#125;&#125;&#96;;
&#125;`;
    highlightLine = 6;
    hasError = false;
  } else if (phase === 2) {
    slideTitle = "3. Return Types → Auto-Inferred";
    slideSubtitle = "The return expression flows back to the function signature automatically — TypeScript traces the type.";
    codeSnippet = `// No return annotation needed — inferred from expression
function add(a: number, b: number) &#123;
  return a + b;  // inferred return: number
}

function formatUser(name: string, id: number) &#123;
  return \`User #\${id}: \${name}\`;  // inferred return: string
}`;
    highlightLine = 2;
    hasError = false;
  } else {
    slideTitle = "4. The Golden Rule";
    slideSubtitle = "Annotate parameters and return types (the public API). Let inference handle internal variables (the private implementation).";
    codeSnippet = `// ✅ Annotated: the contract (public API)
function processOrder(
  items: OrderItem[],
  discount: number
): OrderSummary &#123;
  // ✅ Inferred: the implementation (private)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price, 0
  );
  return &#123; subtotal, finalPrice: subtotal * (1 - discount) &#125;;
}`;
    highlightLine = 3;
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
      {/* Audio Sequences */}
      <Sequence from={0} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={135} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={270} durationInFrames={15}>
        <Audio src={transitionWhoosh} volume={0.6} />
      </Sequence>
      <Sequence from={405} durationInFrames={15}>
        <Audio src={successChime} volume={0.7} />
      </Sequence>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px',
        opacity,
        transform: `scale(${scale})`
      }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 14px',
          backgroundColor: '#7c3aed',
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

      {/* Code Window */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        transform: `scale(${scale})`,
        opacity
      }}>
        <CodeWindow
          title="inference-vs-annotations.ts"
          code={codeSnippet}
          highlightLine={highlightLine}
          hasError={hasError}
          errorMessage={errorMessage}
        />
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '28px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        color: '#64748b'
      }}>
        <span>Annotation Protocol Active</span>
        <span>•</span>
        <span>Remotion Audio Engine 🔊</span>
        <span>•</span>
        <span>FPS: {fps}</span>
      </div>
    </div>
  );
};
