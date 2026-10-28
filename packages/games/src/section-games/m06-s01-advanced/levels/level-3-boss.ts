import { BossPhase } from '@ts-learn/types';

export const bossLevelAdvanced: BossPhase = {
  bossName: "The Type System Architect",
  bossHealth: 100,
  timeLimitSeconds: 60,
  attackIntervalMs: 4000,
  attackPatterns: [
    {
      id: "a1",
      title: "Exhaustive Type Guard",
      description: "Build an exhaustive type guard that catches missing cases at compile time.",
      code: `// Discriminated union for API actions
type ApiAction =
  | &#123; type: 'fetch'; url: string &#125;
  | &#123; type: 'submit'; data: FormData &#125;
  | &#123; type: 'cancel'; requestId: string &#125;;

function handleAction(action: ApiAction): string &#123;
  switch (action.type) &#123;
    case 'fetch':
      return \`Fetching: \${action.url}\`;
    case 'submit':
      return \`Submitting data...\`;
    // MISSING: case 'cancel'
    default:
      // Exhaustive check — action should be 'never'
      const _exhaustive: never = action;
      return \`Unhandled action: \${_exhaustive}\`;
  &#125;
&#125;

// If we add a new action type, TypeScript will ERROR
// on the exhaustive check unless we handle it!`,
      correctType: "const _exhaustive: never = action — errors if any action type is unhandled",
      distractorTypes: [
        "No exhaustive check needed",
        "const _exhaustive: string = action",
        "const _exhaustive: never = action — always compiles"
      ],
      explanation: "The 'never' type assertion errors when action could be a real type. If a new ApiAction is added but not handled, TypeScript catches it."
    },
    {
      id: "a2",
      title: "Deep Readonly",
      description: "Build a recursive Readonly that makes nested objects readonly too.",
      code: `// Recursive DeepReadonly
type DeepReadonly<T> = &#123;
  readonly [K in keyof T]:
    T[K] extends object
      ? DeepReadonly<T[K]>
      : T[K];
&#125;;

interface Config &#123;
  server: &#123;
    host: string;
    port: number;
    tls: &#123;
      enabled: boolean;
      cert: string;
    &#125;;
  &#125;;
&#125;;

const config: DeepReadonly<Config> = &#123;
  server: &#123;
    host: 'localhost',
    port: 3000,
    tls: &#123; enabled: true, cert: 'cert.pem' &#125;
  &#125;
&#125;;

// All properties are readonly, even nested ones!
config.server.host = 'newhost'; // ❌ Error!
config.server.tls.enabled = false; // ❌ Error!`,
      correctType: "DeepReadonly recursively applies readonly to all nested objects",
      distractorTypes: [
        "Only top-level properties are readonly",
        "DeepReadonly doesn't work with interfaces",
        "Only primitive properties are readonly"
      ],
      explanation: "The mapped type with conditional recursion applies readonly to every level. T[K] extends object → DeepReadonly<T[K]>, otherwise T[K] with readonly."
    },
    {
      id: "a3",
      title: "Final Boss — Type-Level Programming",
      description: "Build complex type-level transformations using all advanced features.",
      code: `// Extract all function parameter types
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never;

// Extract all array element types
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : [];

// Template literal type for route params
type Route<T extends string> = T extends \`/\${infer Segment}/...\`
  ? Segment extends \`:\${infer Param}\`
    ? Param
    : never
  : never;

// Usage:
type Params = FunctionParams<(a: string, b: number) => void>;
// Params = [string, number]

type Flattened = Flatten<number[][][]>;
// Flattened = number[]

type RouteParam = Route<'/users/:id/posts/:postId'>;
// RouteParam = 'id' | 'postId' (extracted via template types)

// This is type-level programming — TypeScript as a computation engine!`,
      correctType: "TypeScript as a computation engine — types compute at compile time",
      distractorTypes: [
        "TypeScript only checks types, doesn't compute",
        "These patterns don't work in TypeScript",
        "Only FunctionParams works, others error"
      ],
      explanation: "TypeScript's type system is Turing-complete. Conditional types, infer, and template literal types let you write type-level programs that compute at compile time."
    }
  ]
};
