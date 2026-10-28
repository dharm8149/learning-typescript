import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, victoryFanfare } from '../../helpers/soundEffects';

export const OutroAdvancedMastery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIndex = Math.floor(frame / 180);
  const sceneFrame = frame % 180;

  const scale = spring({ frame: sceneFrame, fps, config: { damping: 14 } });

  let storyBadge = "🔍 The Advanced Type Rule of Thumb";
  let storyHeading = "When You Need Compile-Time Type Safety Beyond Basics → Use Advanced Types";
  let storyNarration = "Advanced types are TypeScript's superpower. Type guards enforce runtime safety with compile-time certainty. Conditional types let TypeScript compute types. Template literal types turn strings into types. Discriminated unions make exhaustive checking automatic.";
  let codeSnippet = `// THE ADVANCED TYPE TOOLBOX:
// 🔍 Type Guards:      typeof, instanceof, in, custom predicates
// 🔍 Discriminated:    switch on common property + never check
// 🔍 Conditional Types: T extends U ? X : Y with infer
// 🔍 Template Literals: \`type \${K}\` for string-type manipulation
// 🔍 Never Type:        exhaustive checking — unreachable code

// COMPOSE THEM:
// 1. Discriminated union + type guard + never = exhaustive switch
// 2. Conditional type + infer = type extraction
// 3. Template literal + conditional = string manipulation

// USED EVERYWHERE:
// React event handlers, API type inference, Zod schemas,
// Redux reducers, Express middleware, state machines`;
  let highlightLine = 1;

  if (sceneIndex === 1) {
    storyBadge = "🏗️ Production Patterns";
    storyHeading = "How TypeScript Powers Real-World Systems";
    storyNarration = "State machines use discriminated unions for exhaustive transitions. API clients use conditional types to infer response shapes. Form libraries use template literal types for field path validation. These aren't academic exercises — they're production patterns used daily.";
    codeSnippet = `// STATE MACHINE — discriminated union
type State =
  | &#123; type: 'idle'; data?: null &#125;
  | &#123; type: 'loading'; progress: number &#125;
  | &#123; type: 'success'; data: Result &#125;
  | &#123; type: 'error'; error: string &#125;;

function nextState(state: State, action: Action): State &#123;
  switch (state.type) &#123;
    case 'idle':
      return &#123; type: 'loading', progress: 0 &#125;;
    case 'loading':
      return action.type === 'complete'
        ? &#123; type: 'success', data: action.data &#125;
        : &#123; type: 'error', error: 'timeout' &#125;;
    case 'success':
    case 'error':
      return state; // terminal states
    default:
      const _exhaustive: never = state; // catches missing cases!
      return _exhaustive;
  &#125;
&#125;;`;
    highlightLine = 1;
  } else {
    storyBadge = "🎯 Your New Mental Model";
    storyHeading = "Advanced Types = Compile-Time Intelligence";
    storyNarration = "You now have a complete mental model: TypeScript's type system isn't just for catching bugs — it's a computation engine. Type guards, conditional types, template literals, and discriminated unions let you encode business logic in types. The compiler does the work for you.";
    codeSnippet = `// THE PATTERN:
// 1. Identify repetition in type handling
function handle(x: any): any &#123; ... &#125;

// 2. Add type guards
function isFoo(x: unknown): x is Foo &#123; ... &#125;

// 3. Add discriminated unions
type Action = &#123; type: 'a' &#125; | &#123; type: 'b' &#125;;
switch (action.type) &#123;
  case 'a': /* TypeScript knows shape */ break;
  case 'b': /* TypeScript knows shape */ break;
  default: &#123; const _: never = action; &#125;;
&#125;

// 4. Add conditional types
type ExtractType<T> = T extends Promise<infer U> ? U : T;
type Result = ExtractType<Promise<string>>; // = string ✅

// 5. Type safety flows everywhere!`;
    highlightLine = 5;
  }

  return (
    <div style={{ flex: 1, height: '100%', backgroundColor: '#020617', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px 50px', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-80px', right: '20%', width: '500px', height: '500px', backgroundColor: sceneIndex === 1 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(168, 85, 247, 0.15)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />

      <Sequence from={0} durationInFrames={20}><Audio src={victoryFanfare} volume={0.7} /></Sequence>
      <Sequence from={180} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={190} durationInFrames={20}><Audio src={successChime} volume={0.7} /></Sequence>
      <Sequence from={360} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={370} durationInFrames={25}><Audio src={victoryFanfare} volume={0.65} /></Sequence>

      <div style={{ width: '100%', maxWidth: '920px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ padding: '6px 14px', backgroundColor: sceneIndex === 1 ? '#312e81' : '#581c87', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, color: sceneIndex === 1 ? '#c7d2fe' : '#f3e8ff', border: `1px solid ${sceneIndex === 1 ? '#6366f1' : '#a855f7'}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sceneIndex === 1 ? '#6366f1' : '#a855f7', display: 'inline-block' }} />
          <span>{storyBadge}</span>
        </div>
        <div style={{ padding: '6px 16px', backgroundColor: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', borderRadius: '12px', fontSize: '12px', fontWeight: 700, color: '#f3e8ff', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)' }}>
          <span>✅ Compile-Time Safety • ✅ No Runtime Cost • ✅ Zero Bugs</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px', maxWidth: '850px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 6px 0', background: 'linear-gradient(to right, #e9d5ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>{storyHeading}</h2>
        <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>{storyNarration}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '920px', transform: `scale(${scale})` }}>
        <CodeWindow title="advanced-patterns.ts" code={codeSnippet} highlightLine={highlightLine} hasError={false} errorMessage="" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
        {[0, 1, 2].map((step) => (
          <div key={step} style={{ width: step === sceneIndex ? '28px' : '8px', height: '8px', borderRadius: '9999px', backgroundColor: step === sceneIndex ? '#a855f7' : '#334155', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  );
};
