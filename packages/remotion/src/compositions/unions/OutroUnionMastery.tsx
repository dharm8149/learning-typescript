import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, victoryFanfare } from '../../helpers/soundEffects';

export const OutroUnionMastery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIndex = Math.floor(frame / 180);
  const sceneFrame = frame % 180;

  const scale = spring({ frame: sceneFrame, fps, config: { damping: 14 } });

  let storyBadge = "🔀 The Union Rule of Thumb";
  let storyHeading = "Use Unions for 'Either/Or', Intersections for 'Both/And'";
  let storyNarration = "Unions (|) handle values that could be one of several types — perfect for API responses, error handling, and optional data. Intersections (&) combine types — ideal for mixing in common behaviors. Together, they create expressive, safe type systems.";
  let codeSnippet = `// ✅ UNION: API responses that could be success OR error
type APIResponse<T> = 
  | &#123; ok: true; data: T &#125;
  | &#123; ok: false; error: string &#125;;

// ✅ INTERSECTION: Mix in shared behavior
interface Logging &#123; log(message: string): void &#125;
interface User &#123; id: string; name: string &#125;;
type LoggedUser = User & Logging;

// ✅ DISCRIMINATED UNION: Event system
type Event = 
  | &#123; type: 'click'; x: number; y: number &#125;
  | &#123; type: 'keydown'; key: string &#125;;`;
  let highlightLine = 1;

  if (sceneIndex === 1) {
    storyBadge = "🏢 Industry Pattern";
    storyHeading = "How Real-World APIs Use Discriminated Unions";
    storyNarration = "Popular libraries like React Query, Zod, and tRPC all use discriminated unions to model their data shapes. The common property (ok, status, type) lets TypeScript narrow types automatically.";
    codeSnippet = `// React Query's QueryObserverResult
type QueryObserverResult<TData, TError> = 
  | &#123;
      status: 'success';
      data: TData;
      isError: false;
    &#125;
  | &#123;
      status: 'error';
      error: TError;
      isError: true;
    &#125;
  | &#123;
      status: 'loading';
      isLoading: true;
    &#125;;

// TypeScript narrows automatically:
if (result.status === 'success') &#123;
  // result.data is available! ✅
&#125;;`;
    highlightLine = 1;
  } else {
    storyBadge = "🎯 Your New Mental Model";
    storyHeading = "Unions = Multiple Possibilities. Intersections = Combined Power.";
    storyNarration = "You now have a complete mental model: unions for when something could be one of several things, intersections for when you need to combine capabilities. This is the pattern used in every production TypeScript codebase.";
    codeSnippet = `// The Union + Intersection Pattern:
// 1. Union for result types
type Result = &#123; ok: true; data: T &#125; | &#123; ok: false; error: E &#125;;

// 2. Intersection for capabilities
interface Cacheable &#123; ttl: number &#125;;
interface Fetchable &#123; url: string &#125;;
type CacheableFetch = Cacheable & Fetchable;

// 3. Both in one function:
async function getData(
  fetch: CacheableFetch  // intersection: both behaviors
): Promise<Result<Data>>  // union: two outcomes
&#123;
  // Type-safe from start to finish! ✅
&#125;;`;
    highlightLine = 1;
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
        <div style={{ padding: '6px 14px', backgroundColor: sceneIndex === 1 ? '#312e81' : '#064e3b', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, color: sceneIndex === 1 ? '#c7d2fe' : '#a7f3d0', border: `1px solid ${sceneIndex === 1 ? '#6366f1' : '#10b981'}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sceneIndex === 1 ? '#6366f1' : '#10b981', display: 'inline-block' }} />
          <span>{storyBadge}</span>
        </div>
        <div style={{ padding: '6px 16px', backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '12px', fontSize: '12px', fontWeight: 700, color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
          <span>✅ Unions Defined • ✅ Intersections Combined • ✅ Types Narrowed</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px', maxWidth: '850px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 6px 0', background: 'linear-gradient(to right, #6ee7b7, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>{storyHeading}</h2>
        <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>{storyNarration}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '920px', transform: `scale(${scale})` }}>
        <CodeWindow title="union-pattern.ts" code={codeSnippet} highlightLine={highlightLine} hasError={false} errorMessage="" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
        {[0, 1, 2].map((step) => (
          <div key={step} style={{ width: step === sceneIndex ? '28px' : '8px', height: '8px', borderRadius: '9999px', backgroundColor: step === sceneIndex ? '#10b981' : '#334155', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  );
};
