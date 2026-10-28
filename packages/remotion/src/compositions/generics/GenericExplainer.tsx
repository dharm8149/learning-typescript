import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime } from '../../helpers/soundEffects';

export const GenericExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase = Math.floor(frame / (fps * 4.5));

  const scale = spring({ frame: frame % (fps * 4.5), fps, config: { damping: 14 } });

  const opacity = interpolate(frame % (fps * 4.5), [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  let slideTitle = "1. Generic Function — The Placeholder Type";
  let slideSubtitle = "Type parameters like <T> are placeholders that get filled in when the function is called.";
  let codeSnippet = `// GENERIC FUNCTION: <T> is a placeholder
function identity<T>(arg: T): T &#123;
  return arg;
&#125;;

// TypeScript INFERs T from your input:
const s = identity('hello');  // T = string, s is string
const n = identity(42);        // T = number, n is number
const b = identity(true);      // T = boolean, b is boolean

// Each call preserves its type!`;
  let highlightLine = 2;

  if (phase === 1) {
    slideTitle = "2. Generic Interface — Type-Safe Containers";
    slideSubtitle = "Interfaces with type parameters create reusable, type-safe container patterns.";
    codeSnippet = `// GENERIC INTERFACE: Reusable container pattern
interface Result<T, E = Error> &#123;
  ok: boolean;
  data?: T;
  error?: E;
&#125;

// Concrete types at usage:
interface SuccessResult<T> &#123;
  ok: true;
  data: T;
&#125;

interface FailureResult<E> &#123;
  ok: false;
  error: E;
&#125;

type Result<T, E> = SuccessResult<T> | FailureResult<E>;`;
    highlightLine = 1;
  } else {
    slideTitle = "3. Generic Constraints — 'T must have THIS'";
    slideSubtitle = "Use 'extends' to restrict what types T can be. This lets you access specific properties safely.";
    codeSnippet = `// GENERIC CONSTRAINT: T must be an object with id
function getID<T extends &#123; id: string &#125;>(obj: T): string &#123;
  return obj.id; // ✅ TypeScript knows 'id' exists
&#125;;

// Usage:
interface User &#123; id: string; name: string &#125;;
interface Post &#123; id: string; title: string &#125;;

getID({ id: 'u1', name: 'Alice' });  // ✅ works
getID({ id: 'p1', title: 'Hello' }); // ✅ works
getID('just a string');              // ❌ Error!

// keyof constraint: T must have property K
function getProperty<T, K extends keyof T>(
  obj: T, key: K
): T[K] &#123;
  return obj[key];
&#125;;`;
    highlightLine = 2;
  }

  return (
    <div style={{ flex: 1, height: '100%', backgroundColor: '#030712', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 60px', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative' }}>
      <Sequence from={0} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={135} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={270} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={405} durationInFrames={15}><Audio src={successChime} volume={0.7} /></Sequence>

      <div style={{ textAlign: 'center', marginBottom: '32px', opacity, transform: `scale(${scale})` }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', backgroundColor: '#fbbf24', borderRadius: '9999px', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px' }}>TypeScript 5.8 Masterclass</div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 8px 0', background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slideTitle}</h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', margin: 0, maxWidth: '800px' }}>{slideSubtitle}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${scale})`, opacity }}>
        <CodeWindow title="generics.ts" code={codeSnippet} highlightLine={highlightLine} hasError={false} errorMessage="" />
      </div>

      <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Generic Protocol Active</span><span>•</span><span>Remotion Audio Engine 🔊</span><span>•</span><span>FPS: {fps}</span>
      </div>
    </div>
  );
};
