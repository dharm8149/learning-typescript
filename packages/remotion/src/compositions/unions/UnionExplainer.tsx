import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime } from '../../helpers/soundEffects';

export const UnionExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase = Math.floor(frame / (fps * 4.5));

  const scale = spring({ frame: frame % (fps * 4.5), fps, config: { damping: 14 } });

  const opacity = interpolate(frame % (fps * 4.5), [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  let slideTitle = "1. Union (|) — 'This OR That'";
  let slideSubtitle = "Unions represent values that can be one of several types. Use type guards to narrow to a specific type.";
  let codeSnippet = `// UNION: The value is ONE of these types
type ID = string | number;

// Type guard to narrow the union
function processID(id: ID) &#123;
  if (typeof id === 'string') &#123;
    // TypeScript knows: id is string here
    return id.toUpperCase();
  &#125;
  // TypeScript knows: id is number here
  return id.toFixed(2);
&#125;;

// Usage
processID('abc'); // 'ABC'
processID(123);   // "123.00"`;
  let highlightLine = 2;

  if (phase === 1) {
    slideTitle = "2. Intersection (&) — 'This AND That'";
    slideSubtitle = "Intersections combine multiple types into one. The value must satisfy ALL types simultaneously.";
    codeSnippet = `// INTERSECTION: Must be ALL types combined
interface HasId &#123; id: string; &#125;
interface HasName &#123; name: string; &#125;
interface HasAge &#123; age: number; &#125;

type FullPerson = HasId & HasName & HasAge;

// Must have ALL properties:
const person: FullPerson = &#123;
  id: 'p1',
  name: 'Alice',
  age: 30
&#125;; // ✅

// Missing 'age'? ❌ Error!`;
    highlightLine = 1;
  } else {
    slideTitle = "3. Discriminated Unions — Type Safety on Steroids";
    slideSubtitle = "When union members share a literal property, TypeScript can automatically narrow the type with switch/if statements.";
    codeSnippet = `// DISCRIMINATED UNION: Shared literal property
type Shape = 
  | &#123; kind: 'circle'; radius: number &#125;
  | &#123; kind: 'square'; size: number &#125;
  | &#123; kind: 'triangle'; base: number; height: number &#125;;

// TypeScript AUTO-NApows in switch:
function area(s: Shape) &#123;
  switch (s.kind) &#123;
    case 'circle':
      return Math.PI * s.radius ** 2;
      // ✅ s is narrowed to circle
    case 'square':
      return s.size ** 2;
      // ✅ s is narrowed to square
  &#125;
&#125;;`;
    highlightLine = 1;
  }

  return (
    <div style={{ flex: 1, height: '100%', backgroundColor: '#030712', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 60px', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative' }}>
      <Sequence from={0} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={135} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={270} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={405} durationInFrames={15}><Audio src={successChime} volume={0.7} /></Sequence>

      <div style={{ textAlign: 'center', marginBottom: '32px', opacity, transform: `scale(${scale})` }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', backgroundColor: '#10b981', borderRadius: '9999px', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px' }}>TypeScript 5.8 Masterclass</div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 8px 0', background: 'linear-gradient(to right, #34d399, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slideTitle}</h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', margin: 0, maxWidth: '800px' }}>{slideSubtitle}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${scale})`, opacity }}>
        <CodeWindow title="union-types.ts" code={codeSnippet} highlightLine={highlightLine} hasError={false} errorMessage="" />
      </div>

      <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Union Protocol Active</span><span>•</span><span>Remotion Audio Engine 🔊</span><span>•</span><span>FPS: {fps}</span>
      </div>
    </div>
  );
};
