import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime } from '../../helpers/soundEffects';

export const AdvancedExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase = Math.floor(frame / (fps * 4.5));

  const scale = spring({ frame: frame % (fps * 4.5), fps, config: { damping: 14 } });

  const opacity = interpolate(frame % (fps * 4.5), [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  let slideTitle = "1. Discriminated Unions — Type-Safe Switch Statements";
  let slideSubtitle = "Discriminated unions use a common property to narrow between different type shapes.";
  let codeSnippet = `// DISCRIMINATED UNION: Common 'type' property
type Shape =
  | &#123; kind: 'circle'; radius: number &#125;
  | &#123; kind: 'square'; size: number &#125;
  | &#123; kind: 'rectangle'; width: number; height: number &#125;;

function area(shape: Shape): number &#123;
  switch (shape.kind) &#123;
    case 'circle':
      return Math.PI * shape.radius ** 2; // shape is { kind: 'circle'; radius: number }
    case 'square':
      return shape.size ** 2;              // shape is { kind: 'square'; size: number }
    case 'rectangle':
      return shape.width * shape.height;   // shape is { kind: 'rectangle'; ... }
    default:
      // Exhaustive check
      const _exhaustive: never = shape;
      throw new Error(\`Unhandled shape: \${_exhaustive}\`);
  &#125;
&#125;`;
  let highlightLine = 2;

  if (phase === 1) {
    slideTitle = "2. Conditional Types — Types That Compute";
    slideSubtitle = "Conditional types (T extends U ? X : Y) create types that depend on other types. Combined with infer, they extract types automatically.";
    codeSnippet = `// CONDITIONAL TYPE: Extract Promise inner type
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type A = Unwrap<Promise<string>>;  // A = string
type B = Unwrap<number>;           // B = number

// CONDITIONAL TYPE: Check if type is array
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<number[]>;  // A = true
type B = IsArray<string>;    // B = false

// COMPLEX: Extract first element
type First<T extends any[]> = T extends [infer First, ...any[]]
  ? First
  : never;

type A = First<[1, 'hello', true]>;  // A = 1`;
    highlightLine = 1;
  } else {
    slideTitle = "3. Template Literal Types — Types as Strings";
    slideSubtitle = "Template literal types let you create types from string patterns. TypeScript infers and manipulates string types at compile time.";
    codeSnippet = `// TEMPLATE LITERAL TYPE: Capitalize
type Capitalize<S extends string> =
  S extends \`\${infer First}\${infer Rest}\`
    ? \`\${Capitalize<First>}\${Rest}\`
    : S;

type A = Capitalize<'hello'>;  // A = 'Hello'

// TEMPLATE LITERAL TYPE: Route parameters
type RouteParam<T extends string> =
  T extends \`/\${infer Segment}/...\`
    ? Segment extends \`:\${infer Param}\`
      ? Param
      : never
    : never;

type A = RouteParam<'/users/:id'>;  // A = 'id'

// USED IN: Event systems, API routers, React props, Zod schemas`;
    highlightLine = 1;
  }

  return (
    <div style={{ flex: 1, height: '100%', backgroundColor: '#030712', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 60px', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative' }}>
      <Sequence from={0} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={135} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={270} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={405} durationInFrames={15}><Audio src={successChime} volume={0.7} /></Sequence>

      <div style={{ textAlign: 'center', marginBottom: '32px', opacity, transform: `scale(${scale})` }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', backgroundColor: '#a855f7', borderRadius: '9999px', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px' }}>TypeScript 5.8 Masterclass</div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 8px 0', background: 'linear-gradient(to right, #a855f7, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slideTitle}</h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', margin: 0, maxWidth: '800px' }}>{slideSubtitle}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${scale})`, opacity }}>
        <CodeWindow title="advanced-types.ts" code={codeSnippet} highlightLine={highlightLine} hasError={false} errorMessage="" />
      </div>

      <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Advanced Type System Active</span><span>•</span><span>Remotion Audio Engine 🔊</span><span>•</span><span>FPS: {fps}</span>
      </div>
    </div>
  );
};
