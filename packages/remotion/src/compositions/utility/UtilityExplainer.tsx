import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime } from '../../helpers/soundEffects';

export const UtilityExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phase = Math.floor(frame / (fps * 4.5));

  const scale = spring({ frame: frame % (fps * 4.5), fps, config: { damping: 14 } });

  const opacity = interpolate(frame % (fps * 4.5), [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  let slideTitle = "1. Partial<T> — Make Everything Optional";
  let slideSubtitle = "Partial<T> creates a type where all properties of T are optional.";
  let codeSnippet = `// PARTIAL<T>: All properties optional
interface User &#123;
  id: string;
  name: string;
  email: string;
&#125;;

type UpdateUser = Partial&lt;User&gt;;
// Equivalent to:
// &#123; id?: string; name?: string; email?: string &#125;

// Usage — any subset is valid:
const update1: UpdateUser = &#123; id: 'u1' &#125;;
const update2: UpdateUser = &#123; name: 'Alice' &#125;;
const update3: UpdateUser = &#123; id: 'u1', name: 'Alice', email: 'a@b.com' &#125;;`;
  let highlightLine = 2;

  if (phase === 1) {
    slideTitle = "2. Pick<T, K> & Omit<T, K> — Select & Exclude";
    slideSubtitle = "Pick selects specific properties. Omit excludes specific properties.";
    codeSnippet = `// PICK<T, K>: Select specific properties
interface User &#123;
  id: string; name: string;
  email: string; password: string;
&#125;;

type PublicUser = Pick&lt;User, 'id' | 'name' | 'email'&gt;;
// Result: &#123; id: string; name: string; email: string &#125;

// OMIT<T, K>: Exclude specific properties
type SafeUser = Omit&lt;User, 'password'&gt;;
// Result: &#123; id: string; name: string; email: string &#125;

// They can produce the same result!
type PublicUser2 = Omit&lt;User, 'password'&gt;;`;
    highlightLine = 1;
  } else {
    slideTitle = "3. Record<K, V> — Object Type Factory";
    slideSubtitle = "Record<K, V> creates an object type with known keys of type K and values of type V.";
    codeSnippet = `// RECORD<K, V>: Object type factory
type Role = 'admin' | 'user' | 'guest';
type Permission = 'read' | 'write' | 'delete';

// Map each role to its permissions
type RolePermissions = Record<Role, Permission[]>;

// Usage — TypeScript enforces all keys:
const perms: RolePermissions = &#123;
  admin: ['read', 'write', 'delete'],
  user: ['read'],
  guest: [] // ⚠️ Missing key — compile error!
&#125;;

// Common pattern for config maps:
type EnvConfig = Record&lt;'dev' | 'prod', string&gt;;
// Equivalent to:
// &#123; dev: string; prod: string &#125;;`;
    highlightLine = 4;
  }

  return (
    <div style={{ flex: 1, height: '100%', backgroundColor: '#030712', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 60px', color: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', position: 'relative' }}>
      <Sequence from={0} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={135} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={270} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={405} durationInFrames={15}><Audio src={successChime} volume={0.7} /></Sequence>

      <div style={{ textAlign: 'center', marginBottom: '32px', opacity, transform: `scale(${scale})` }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', backgroundColor: '#10b981', borderRadius: '9999px', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px' }}>TypeScript 5.8 Masterclass</div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 8px 0', background: 'linear-gradient(to right, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slideTitle}</h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', margin: 0, maxWidth: '800px' }}>{slideSubtitle}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${scale})`, opacity }}>
        <CodeWindow title="utility-types.ts" code={codeSnippet} highlightLine={highlightLine} hasError={false} errorMessage="" />
      </div>

      <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Utility Type Factory Active</span><span>•</span><span>Remotion Audio Engine 🔊</span><span>•</span><span>FPS: {fps}</span>
      </div>
    </div>
  );
};
