import { BossPhase } from '@ts-learn/types';

export const bossLevelUnions: BossPhase = {
  bossName: "The Discriminated Union Boss",
  bossHealth: 100,
  timeLimitSeconds: 60,
  attackIntervalMs: 4000,
  challenges: [
    {
      prompt: "Given these union variants, narrow the type correctly.",
      brokenCode: `type Shape = 
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'triangle'; base: number; height: number };

function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;
    case 'square': return s.size ** 2;
    case 'triangle': return (s.base * s.height) / 2;
  }
}

const circle: Shape = { kind: 'circle', radius: 5 };
// After switch case 'circle', what is s's type?`,
      fixedCodeOptions: [
        "{ kind: 'circle'; radius: number }",
        "Shape (full union)",
        "{ radius: number }",
        "error: switch can't narrow unions"
      ],
      correctIndex: 0,
      explanation: "TypeScript narrows the union based on the switch case. Inside 'circle' case, s is known to be the circle variant only."
    },
    {
      prompt: "Determine whether to use union or intersection for this scenario.",
      brokenCode: `// We want a type that can be EITHER a success response
// OR an error response, but NOT both at once.
type APIResponse = ???;

interface SuccessResponse {
  status: 200;
  data: any;
}

interface ErrorResponse {
  status: 400 | 404 | 500;
  message: string;
}`,
      fixedCodeOptions: [
        "APIResponse = SuccessResponse | ErrorResponse",
        "APIResponse = SuccessResponse & ErrorResponse",
        "APIResponse = SuccessResponse | ErrorResponse | null",
        "error: can't combine response types"
      ],
      correctIndex: 0,
      explanation: "An API response is EITHER success OR error, not both simultaneously. Union is the correct choice."
    },
    {
      prompt: "Build a type-safe event system using discriminated unions.",
      brokenCode: `type Event = 
  | { type: 'click'; x: number; y: number }
  | { type: 'keydown'; key: string }
  | { type: 'scroll'; scrollTop: number };

function handleEvent(e: Event) {
  if (e.type === 'click') {
    console.log('Clicked at', e.x, e.y);
    // What is e's type here?
  }
}`,
      fixedCodeOptions: [
        "{ type: 'click'; x: number; y: number }",
        "Event (full union)",
        "{ x: number; y: number }",
        "unknown"
      ],
      correctIndex: 0,
      explanation: "TypeScript's control flow analysis narrows the type based on the type guard. After e.type === 'click', e is known to be the click event variant."
    }
  ]
};
