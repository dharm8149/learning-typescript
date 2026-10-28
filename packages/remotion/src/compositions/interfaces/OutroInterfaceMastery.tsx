import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Audio, Sequence } from 'remotion';
import { CodeWindow } from '../../components/CodeWindow';
import { transitionWhoosh, successChime, victoryFanfare } from '../../helpers/soundEffects';

export const OutroInterfaceMastery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIndex = Math.floor(frame / 180);
  const sceneFrame = frame % 180;

  const scale = spring({
    frame: sceneFrame,
    fps,
    config: { damping: 14 }
  });

  let storyBadge = "📐 The Interface Rule of Thumb";
  let storyHeading = "Interfaces for Contracts, Aliases for Flexibility";
  let storyNarration = "When defining object shapes that might be extended — use interfaces. When you need unions, intersections, or mapped types — use type aliases. Together, they form the backbone of every TypeScript application.";
  let codeSnippet = `// ✅ Interface — for extensible object contracts
interface User &#123; id: number; name: string; &#125;
interface Admin extends User &#123; department: string; &#125;

// ✅ Type alias — for unions and flexibility
type Role = 'user' | 'admin' | 'superadmin';

// ✅ Both work together:
function createAdmin(user: User, role: Role): Admin &#123;
  return &#123; ...user, role, department: 'engineering' &#125;;
&#125;;`;
  let highlightLine = 1;
  let hasError = false;

  if (sceneIndex === 1) {
    storyBadge = "🏢 Industry Standard";
    storyHeading = "How Netflix, VS Code, and TypeScript Itself Structure Types";
    storyNarration = "The TypeScript compiler team, Netflix's type system, and VS Code's API all use interfaces for their core data shapes — because interfaces extend, merge, and document. They use type aliases for the complex generic patterns they need.";
    codeSnippet = `// TypeScript Compiler Source
interface Node &#123;
  kind: SyntaxKind;
  pos: number;
  end: number;
&#125;

interface SourceFile extends Node, JSDocContainer &#123;
  statements: NodeArray<Statement>;
  fileName: string;
  text: string;
&#125;

// Plus type aliases for complex patterns:
type EditorMode = 'insert' | 'overwrite' | 'replace';`;
    highlightLine = 1;
    hasError = false;
  } else {
    storyBadge = "🎯 Your New Mental Model";
    storyHeading = "Interfaces = Contracts That Grow. Aliases = Names That Flex.";
    storyNarration = "You now have a complete mental model: interfaces for things that extend and merge (contracts), type aliases for things that combine and transform (flexibility). This is the pattern used in every production TypeScript codebase.";
    codeSnippet = `// The Interface + Alias Pattern:
// 1. Core contracts (interface)
interface OrderItem &#123;
  productId: string;
  quantity: number;
  price: number;
&#125;

// 2. Polymorphic types (type alias)
type ShippingStatus = 'pending' | 'shipped' | 'delivered';

// 3. Both in one function:
function processOrder(
  item: OrderItem,          // interface contract
  status: ShippingStatus    // type alias union
): OrderItem &#123;
  return &#123; ...item &#125;;
&#125;;`;
    highlightLine = 5;
    hasError = false;
  }

  return (
    <div style={{
      flex: 1, height: '100%', backgroundColor: '#020617',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', padding: '30px 50px', color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: '-80px', right: '20%',
        width: '500px', height: '500px',
        backgroundColor: sceneIndex === 1 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(139, 92, 246, 0.15)',
        borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none'
      }} />

      <Sequence from={0} durationInFrames={20}><Audio src={victoryFanfare} volume={0.7} /></Sequence>
      <Sequence from={180} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={190} durationInFrames={20}><Audio src={successChime} volume={0.7} /></Sequence>
      <Sequence from={360} durationInFrames={15}><Audio src={transitionWhoosh} volume={0.6} /></Sequence>
      <Sequence from={370} durationInFrames={25}><Audio src={victoryFanfare} volume={0.65} /></Sequence>

      <div style={{ width: '100%', maxWidth: '920px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{
          padding: '6px 14px', backgroundColor: sceneIndex === 1 ? '#312e81' : '#4c1d95',
          borderRadius: '9999px', fontSize: '12px', fontWeight: 700,
          color: sceneIndex === 1 ? '#c7d2fe' : '#ddd6fe',
          border: `1px solid ${sceneIndex === 1 ? '#6366f1' : '#8b5cf6'}`,
          display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sceneIndex === 1 ? '#6366f1' : '#8b5cf6', display: 'inline-block' }} />
          <span>{storyBadge}</span>
        </div>
        <div style={{
          padding: '6px 16px', backgroundColor: 'rgba(139, 92, 246, 0.2)', border: '1px solid #8b5cf6',
          borderRadius: '12px', fontSize: '12px', fontWeight: 700, color: '#ddd6fe',
          display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
        }}>
          <span>✅ Contracts Defined • ✅ Types Named • ✅ Bugs Blocked</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px', maxWidth: '850px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 6px 0', background: 'linear-gradient(to right, #c4b5fd, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>{storyHeading}</h2>
        <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>{storyNarration}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '920px', transform: `scale(${scale})` }}>
        <CodeWindow title="interface-pattern.ts" code={codeSnippet} highlightLine={highlightLine} hasError={hasError} errorMessage="" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
        {[0, 1, 2].map((step) => (
          <div key={step} style={{
            width: step === sceneIndex ? '28px' : '8px', height: '8px',
            borderRadius: '9999px', backgroundColor: step === sceneIndex ? '#8b5cf6' : '#334155',
            transition: 'all 0.3s ease'
          }} />
        ))}
      </div>
    </div>
  );
};
