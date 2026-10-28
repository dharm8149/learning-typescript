import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, victoryFanfare } from '../../helpers/soundEffects';

export const OutroUtilityMastery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIndex = Math.floor(frame / 180);
  const sceneFrame = frame % 180;

  const scale = spring({ frame: sceneFrame, fps, config: { damping: 14 } });

  let storyBadge = "🏭 The Utility Type Rule of Thumb";
  let storyHeading = "When You Need a Variation of an Existing Type → Use a Utility Type";
  let storyNarration = "Utility types are TypeScript's built-in type transformation functions. They eliminate boilerplate, prevent inconsistencies, and make your codebase maintainable. Every time you copy-paste a type and tweak a few properties, that's a utility type waiting to be written.";
  let codeSnippet = `// THE COMPLETE UTILITY TOOLBOX:
// 📦 Partial<T>     — all properties optional
// 📦 Required<T>    — all properties required
// 📦 Pick<T, K>     — select specific properties
// 📦 Omit<T, K>     — exclude specific properties
// 📦 Record<K, V>   — object type with known keys
// 📦 Readonly<T>    — all properties read-only

// COMPOSE THEM:
type UserUpdate = Partial<Omit<User, 'id'>>;
type UserPublic = Required<Pick<User, 'id' | 'name'>>;
type ConfigMap = Record<'dev' | 'prod', Config>;

// USED EVERYWHERE:
// Partial<Request>, Pick<ComponentProps, K>,
// Omit<Props, 'className'>, Record<string, T>`;
  let highlightLine = 1;

  if (sceneIndex === 1) {
    storyBadge = "🏗️ Real-World Patterns";
    storyHeading = "How Production Codebases Use Utility Types";
    storyNarration = "React components use Omit<Props, 'ref'> to spread props safely. APIs use Partial for update endpoints. Config systems use Record<K, V> for type-safe maps. Utility types are not academic — they're production patterns used daily in every TypeScript project.";
    codeSnippet = `// React — Omit to exclude ref
function MyComponent(props: Omit<ComponentProps<'div'>, 'ref'>) &#123;
  // props has all div props except ref
&#125;

// API — Partial for updates
app.patch('/users/:id', (req: Request&lt;unknown, unknown, Partial&lt;User&gt;&gt;) &#123;
  // req.body can have any subset of User fields
&#125;);

// Config — Record for maps
type EnvVars = Record&lt;string, string&gt;;
const config: EnvVars &#x3D; process.env as EnvVars;

// Zod — Omit for safety
type FormErrors&lt;T&gt; &#x3D; Partial&lt;Record&lt;keyof T, string&gt;&gt;;`;
    highlightLine = 1;
  } else {
    storyBadge = "🎯 Your New Mental Model";
    storyHeading = "Utility Types = One Type Becomes Many";
    storyNarration = "You now have a complete mental model: utility types are type factories that transform existing types into variations. This eliminates copy-paste, prevents inconsistencies, and makes your codebase maintainable. Master these and your TypeScript skills jump to production level.";
    codeSnippet = `// THE PATTERN:
// 1. Identify repetition
type UserCreate = &#123; name: string; email: string; password: string &#125;;
type UserUpdate = &#123; name?: string; email?: string &#125;;

// 2. Add utility type
type UserCreate = Partial&lt;User&gt;;
type UserUpdate = Partial&lt;Omit&lt;User, 'id'&gt;&gt;;

// 3. Type flows everywhere! ✅
const update: UserUpdate &#x3D; &#123; name: 'Alice' &#125;;
// Only name provided — others optional!

// 4. Compose for complexity:
type AdminPublic = Pick<Required<Omit<Admin, 'password'>>, 'id' | 'name'>;`;
    highlightLine = 5;
  }

  return (
    <div style={{ flex: 1, height: '100%', backgroundColor: '#020617', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px 50px', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-80px', right: '20%', width: '500px', height: '500px', backgroundColor: sceneIndex === 1 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(16, 185, 129, 0.15)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />

      <Sequence from={0} durationInFrames={20}><Audio src={victoryFanfare} volume={0.7} /></Sequence>
      <Sequence from={180} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={190} durationInFrames={20}><Audio src={successChime} volume={0.7} /></Sequence>
      <Sequence from={360} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={370} durationInFrames={25}><Audio src={victoryFanfare} volume={0.65} /></Sequence>

      <div style={{ width: '100%', maxWidth: '920px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ padding: '6px 14px', backgroundColor: sceneIndex === 1 ? '#312e81' : '#064e3b', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, color: sceneIndex === 1 ? '#c7d2fe' : '#d1fae5', border: `1px solid ${sceneIndex === 1 ? '#6366f1' : '#10b981'}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sceneIndex === 1 ? '#6366f1' : '#10b981', display: 'inline-block' }} />
          <span>{storyBadge}</span>
        </div>
        <div style={{ padding: '6px 16px', backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '12px', fontSize: '12px', fontWeight: 700, color: '#d1fae5', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
          <span>✅ Zero Boilerplate • ✅ Types Preserved • ✅ Bugs Blocked</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px', maxWidth: '850px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 6px 0', background: 'linear-gradient(to right, #6ee7b7, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>{storyHeading}</h2>
        <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>{storyNarration}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '920px', transform: `scale(${scale})` }}>
        <CodeWindow title="utility-patterns.ts" code={codeSnippet} highlightLine={highlightLine} hasError={false} errorMessage="" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
        {[0, 1, 2].map((step) => (
          <div key={step} style={{ width: step === sceneIndex ? '28px' : '8px', height: '8px', borderRadius: '9999px', backgroundColor: step === sceneIndex ? '#10b981' : '#334155', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  );
};
