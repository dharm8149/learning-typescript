import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, victoryFanfare } from '../../helpers/soundEffects';

export const OutroGenericsMastery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIndex = Math.floor(frame / 180);
  const sceneFrame = frame % 180;

  const scale = spring({ frame: sceneFrame, fps, config: { damping: 14 } });

  let storyBadge = "📦 The Generic Rule of Thumb";
  let storyHeading = "When Code Repeats With Only Types Changing → Add Generics";
  let storyNarration = "Generics are the single most important TypeScript feature for writing production-quality code. They power React's hooks, utility types like Partial and Record, and every type-safe library. The pattern is simple: when you find yourself copying code and only changing types — add a type parameter.";
  let codeSnippet = `// 📦 GENERIC FUNCTIONS:
function first<T>(arr: T[]): T | undefined &#123;
  return arr[0];
&#125;

// 📦 GENERIC INTERFACES:
interface Repository<T> &#123;
  findById(id: string): T | undefined;
  save(entity: T): void;
&#125;

// 📦 GENERIC CONSTRAINTS:
function clone<T extends object>(obj: T): T &#123;
  return &#123; ...obj &#125;;
&#125;;

// 📦 USED EVERYWHERE:
// useState<T>, useContext<T>, React.FC<T>,
// Partial<T>, Required<T>, Pick<T, K>, Record<K, V>`;
  let highlightLine = 1;

  if (sceneIndex === 1) {
    storyBadge = "🏢 Industry Standard";
    storyHeading = "How the TypeScript Compiler Itself Uses Generics";
    storyNarration = "The TypeScript compiler's AST, React's entire hooks API, Zod's schema builders — they all use generics extensively. Generics are not just a language feature; they're the foundation of type-safe software architecture.";
    codeSnippet = `// TypeScript's Own Type Utilities
type Partial<T> = &#123;
  [P in keyof T]?: T[P]
&#125;;

type Required<T> = &#123;
  [P in keyof T]-?: T[P]
&#125;;

type Pick<T, K extends keyof T> = &#123;
  [P in K]: T[P]
&#125;;

// React's useState
function useState<T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] &#123;
  // ...
&#125;;`;
    highlightLine = 1;
  } else {
    storyBadge = "🎯 Your New Mental Model";
    storyHeading = "Generics = Code That Adapts to Any Type";
    storyNarration = "You now have a complete mental model: generics let you write code once that works with any type, while preserving full type safety. This is the pattern used in every production TypeScript codebase — from React hooks to database ORM libraries.";
    codeSnippet = `// The Generic Pattern:
// 1. Identify repetition
function boxString(v: string): Box &#123; ... &#125;
function boxNumber(v: number): Box &#123; ... &#125;

// 2. Add type parameter
function box<T>(v: T): Box<T> &#123; ... &#125;

// 3. Apply constraints if needed
function first<T extends any[]>(arr: T): T[number]

// 4. Type flows through everywhere! ✅
const result = box('hello');
// result is Box<string> — fully typed!`;
    highlightLine = 5;
  }

  return (
    <div style={{ flex: 1, height: '100%', backgroundColor: '#020617', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px 50px', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-80px', right: '20%', width: '500px', height: '500px', backgroundColor: sceneIndex === 1 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(251, 191, 36, 0.15)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />

      <Sequence from={0} durationInFrames={20}><Audio src={victoryFanfare} volume={0.7} /></Sequence>
      <Sequence from={180} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={190} durationInFrames={20}><Audio src={successChime} volume={0.7} /></Sequence>
      <Sequence from={360} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={370} durationInFrames={25}><Audio src={victoryFanfare} volume={0.65} /></Sequence>

      <div style={{ width: '100%', maxWidth: '920px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ padding: '6px 14px', backgroundColor: sceneIndex === 1 ? '#312e81' : '#78350f', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, color: sceneIndex === 1 ? '#c7d2fe' : '#fef3c7', border: `1px solid ${sceneIndex === 1 ? '#6366f1' : '#fbbf24'}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sceneIndex === 1 ? '#6366f1' : '#fbbf24', display: 'inline-block' }} />
          <span>{storyBadge}</span>
        </div>
        <div style={{ padding: '6px 16px', backgroundColor: 'rgba(251, 191, 36, 0.2)', border: '1px solid #fbbf24', borderRadius: '12px', fontSize: '12px', fontWeight: 700, color: '#fef3c7', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)' }}>
          <span>✅ Code Reused • ✅ Types Preserved • ✅ Bugs Blocked</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px', maxWidth: '850px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 6px 0', background: 'linear-gradient(to right, #fde68a, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>{storyHeading}</h2>
        <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>{storyNarration}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '920px', transform: `scale(${scale})` }}>
        <CodeWindow title="generics-pattern.ts" code={codeSnippet} highlightLine={highlightLine} hasError={false} errorMessage="" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
        {[0, 1, 2].map((step) => (
          <div key={step} style={{ width: step === sceneIndex ? '28px' : '8px', height: '8px', borderRadius: '9999px', backgroundColor: step === sceneIndex ? '#fbbf24' : '#334155', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  );
};
