import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime } from '../../helpers/soundEffects';

export const InterfaceExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

  let slideTitle = "1. Interface = Object Contract";
  let slideSubtitle = "Interfaces define the shape an object must conform to — properties, types, and optional markers.";
  let codeSnippet = `interface User &#123;
  id: number;           // required
  name: string;         // required
  email: string;        // required
  role?: string;        // optional (?)
}

const alice: User = &#123;
  id: 1, name: "Alice", email: "alice@test.com"
&#125;; // ✅ Valid — missing optional 'role'
const bob: User = &#123;
  id: 2, name: "Bob"
&#125;; // ❌ Error: missing 'email'`;
  let highlightLine = 8;
  let hasError = false;
  let errorMessage = '';

  if (phase === 1) {
    slideTitle = "2. Type Alias = Name for Any Type";
    slideSubtitle = "Type aliases can name unions, intersections, tuples, and objects — interfaces only do objects.";
    codeSnippet = `// Type alias for UNION (interface can't do this)
type Status = 'open' | 'closed' | 'pending';

// Type alias for INTERSECTION
type Point3D = { x: number } & { y: number } & { z: number };

// Type alias for TUPLE
type RGB = [number, number, number];

// Type alias for OBJECT (looks like interface)
type User = &#123; id: number; name: string &#125;;`;
    highlightLine = 3;
    hasError = false;
  } else if (phase === 2) {
    slideTitle = "3. Interface Extension = 'extends'";
    slideSubtitle = "Interfaces build hierarchies using 'extends' — child interfaces inherit all parent properties.";
    codeSnippet = `interface BaseEntity &#123;
  id: string;
  createdAt: Date;
&#125;

interface User extends BaseEntity &#123;
  name: string;
  email: string;
&#125;
// User now has: id, createdAt, name, email

interface Admin extends User &#123;
  department: string;
&#125;
// Admin now has: id, createdAt, name, email, department`;
    highlightLine = 7;
    hasError = false;
  } else {
    slideTitle = "4. Declaration Merging — Unique to Interfaces";
    slideSubtitle = "The same interface name in different scopes MERGES their properties. Type aliases cannot do this.";
    codeSnippet = `// Declaration Merging
interface Config &#123;
  host: string;
&#125;
interface Config &#123;
  port: number;
&#125;
interface Config &#123;
  ssl: boolean;
&#125;

// Result: Config = &#123;
//   host: string;
//   port: number;
//   ssl: boolean;
// &#125; — ALL properties combined!`;
    highlightLine = 1;
    hasError = false;
  }

  return (
    <div style={{
      flex: 1, height: '100%', backgroundColor: '#030712',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', padding: '40px 60px', color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif', position: 'relative'
    }}>
      <Sequence from={0} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={135} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={270} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={405} durationInFrames={15}><Audio src={successChime} volume={0.7} /></Sequence>

      <div style={{ textAlign: 'center', marginBottom: '32px', opacity, transform: `scale(${scale})` }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', backgroundColor: '#7c3aed', borderRadius: '9999px', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px' }}>
          TypeScript 5.8 Masterclass
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 8px 0', background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {slideTitle}
        </h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', margin: 0, maxWidth: '800px' }}>{slideSubtitle}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '900px', transform: `scale(${scale})`, opacity }}>
        <CodeWindow title="interfaces.ts" code={codeSnippet} highlightLine={highlightLine} hasError={hasError} errorMessage={errorMessage} />
      </div>

      <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#64748b' }}>
        <span>Interface Protocol Active</span><span>•</span><span>Remotion Audio Engine 🔊</span><span>•</span><span>FPS: {fps}</span>
      </div>
    </div>
  );
};
