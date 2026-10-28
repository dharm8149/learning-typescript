import { BossPhase } from '@ts-learn/types';

export const bossLevelAdvanced: BossPhase = {
  bossName: "The Type System Architect",
  bossHealth: 100,
  timeLimitSeconds: 60,
  attackIntervalMs: 4000,
  challenges: [
    {
      prompt: "Build an exhaustive type guard that catches missing cases at compile time.",
      brokenCode: `// Discriminated union for API actions
type ApiAction =
  | { type: 'fetch'; url: string }
  | { type: 'submit'; data: FormData }
  | { type: 'cancel'; requestId: string };

function handleAction(action: ApiAction): string {
  switch (action.type) {
    case 'fetch':
      return \`Fetching: \${action.url}\`;
    case 'submit':
      return \`Submitting data...\`;
    // MISSING: case 'cancel'
    default:
      // Exhaustive check — action should be 'never'
      const _exhaustive: never = action;
      return \`Unhandled action: \${_exhaustive}\`;
  }
}

// If we add a new action type, TypeScript will ERROR
// on the exhaustive check unless we handle it!`,
      fixedCodeOptions: [
        "const _exhaustive: never = action — errors if any action type is unhandled",
        "No exhaustive check needed",
        "const _exhaustive: string = action",
        "const _exhaustive: never = action — always compiles"
      ],
      correctIndex: 0,
      explanation: "The 'never' type assertion errors when action could be a real type. If a new ApiAction is added but not handled, TypeScript catches it."
    },
    {
      prompt: "Build a recursive Readonly that makes nested objects readonly too.",
      brokenCode: `// Recursive DeepReadonly
type DeepReadonly<T> = {
  readonly [K in keyof T]:
    T[K] extends object
      ? DeepReadonly<T[K]>
      : T[K];
};

interface Config {
  server: {
    host: string;
    port: number;
    tls: {
      enabled: boolean;
      cert: string;
    };
  };
};

const config: DeepReadonly<Config> = {
  server: {
    host: 'localhost',
    port: 3000,
    tls: { enabled: true, cert: 'cert.pem' }
  }
};

// All properties are readonly, even nested ones!
config.server.host = 'newhost'; // ❌ Error!
config.server.tls.enabled = false; // ❌ Error!`,
      fixedCodeOptions: [
        "DeepReadonly recursively applies readonly to all nested objects",
        "Only top-level properties are readonly",
        "DeepReadonly doesn't work with interfaces",
        "Only primitive properties are readonly"
      ],
      correctIndex: 0,
      explanation: "The mapped type with conditional recursion applies readonly to every level. T[K] extends object → DeepReadonly<T[K]>, otherwise T[K] with readonly."
    },
    {
      prompt: "Build complex type-level transformations using all advanced features.",
      brokenCode: `// Extract all function parameter types
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never;

// Extract all array element types
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : [];

// Template literal type for route params
type Route<T extends string> = T extends \`/ \${infer Segment}/...\`
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
      fixedCodeOptions: [
        "TypeScript as a computation engine — types compute at compile time",
        "TypeScript only checks types, doesn't compute",
        "These patterns don't work in TypeScript",
        "Only FunctionParams works, others error"
      ],
      correctIndex: 0,
      explanation: "TypeScript's type system is Turing-complete. Conditional types, infer, and template literal types let you write type-level programs that compute at compile time."
    }
  ]
};
