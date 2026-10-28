import { BossPhase } from '@ts-learn/types';

export const bossLevelUnions: BossPhase = {
  bossName: "The Discriminated Union Boss",
  bossHealth: 100,
  timeLimitSeconds: 60,
  attackIntervalMs: 4000,
  attackPatterns: [
    {
      id: "b1",
      title: "Discriminated Union Attack",
      description: "Given these union variants, narrow the type correctly.",
      code: `type Shape = \n  | { kind: 'circle'; radius: number }\n  | { kind: 'square'; size: number }\n  | { kind: 'triangle'; base: number; height: number };\n\nfunction area(s: Shape) {\n  switch (s.kind) {\n    case 'circle': return Math.PI * s.radius ** 2;\n    case 'square': return s.size ** 2;\n    case 'triangle': return (s.base * s.height) / 2;\n  }\n}\n\nconst circle: Shape = { kind: 'circle', radius: 5 };\n// After switch case 'circle', what is s's type?`,
      correctType: "{ kind: 'circle'; radius: number }",
      distractorTypes: [
        "Shape (full union)",
        "{ radius: number }",
        "error: switch can't narrow unions"
      ],
      explanation: "TypeScript narrows the union based on the switch case. Inside 'circle' case, s is known to be the circle variant only."
    },
    {
      id: "b2",
      title: "Union vs Intersection Challenge",
      description: "Determine whether to use union or intersection for this scenario.",
      code: `// We want a type that can be EITHER a success response\n// OR an error response, but NOT both at once.\ntype APIResponse = ???;\n\ninterface SuccessResponse {\n  status: 200;\n  data: any;\n}\n\ninterface ErrorResponse {\n  status: 400 | 404 | 500;\n  message: string;\n}`,
      correctType: "APIResponse = SuccessResponse | ErrorResponse",
      distractorTypes: [
        "APIResponse = SuccessResponse & ErrorResponse",
        "APIResponse = SuccessResponse | ErrorResponse | null",
        "error: can't combine response types"
      ],
      explanation: "An API response is EITHER success OR error, not both simultaneously. Union is the correct choice."
    },
    {
      id: "b3",
      title: "Final Boss — Event System",
      description: "Build a type-safe event system using discriminated unions.",
      code: `type Event = \n  | { type: 'click'; x: number; y: number }\n  | { type: 'keydown'; key: string }\n  | { type: 'scroll'; scrollTop: number };\n\nfunction handleEvent(e: Event) {\n  if (e.type === 'click') {\n    console.log('Clicked at', e.x, e.y);\n    // What is e's type here?\n  }\n}`,
      correctType: "{ type: 'click'; x: number; y: number }",
      distractorTypes: [
        "Event (full union)",
        "{ x: number; y: number }",
        "unknown"
      ],
      explanation: "TypeScript's control flow analysis narrows the type based on the type guard. After e.type === 'click', e is known to be the click event variant."
    }
  ]
};
