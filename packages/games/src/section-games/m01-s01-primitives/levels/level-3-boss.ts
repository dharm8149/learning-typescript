import { BossPhase } from '@ts-learn/types';

export const bossLevelPrimitives: BossPhase = {
  bossName: "Lord TypeError the Glitched",
  bossHealth: 100,
  timeLimitSeconds: 60,
  attackIntervalMs: 5000,
  challenges: [
    {
      prompt: "Lord TypeError tried to assign a string to a strict number balance. Fix the type declaration to avoid runtime catastrophe!",
      brokenCode: `let userBalance: number = "1000";`,
      fixedCodeOptions: [
        `let userBalance: number = 1000;`,
        `let userBalance: String = "1000";`,
        `let userBalance: any = "1000";`
      ],
      correctIndex: 0,
      explanation: "Remove the quotes or convert to a true numerical literal `1000`. Using `String` (uppercase) or `any` bypasses type safety."
    },
    {
      prompt: "The boss attempted to mix BigInt and Number arithmetic without explicit conversion, which throws a TypeError!",
      brokenCode: `const a: bigint = 10n;\nconst b: number = 5;\nconst result = a + b;`,
      fixedCodeOptions: [
        `const a: bigint = 10n;\nconst b: bigint = 5n;\nconst result = a + b;`,
        `const result = (a as any) + b;`,
        `const result = Number(a) + String(b);`
      ],
      correctIndex: 0,
      explanation: "BigInt and Number cannot be directly summed in JavaScript without explicit conversion. Converting both to `bigint` (e.g. `5n`) maintains mathematical precision."
    },
    {
      prompt: "The boss used `typeof` to check for null, falling for the 1995 JavaScript quirk!",
      brokenCode: `function isRealObject(val: unknown) {\n  return typeof val === "object"; // Returns true for null!\n}`,
      fixedCodeOptions: [
        `function isRealObject(val: unknown) {\n  return typeof val === "object" && val !== null;\n}`,
        `function isRealObject(val: unknown) {\n  return typeof val === "null";\n}`,
        `function isRealObject(val: unknown) {\n  return val instanceof Object;\n}`
      ],
      correctIndex: 0,
      explanation: "Because `typeof null === 'object'`, a robust guard must check `typeof val === 'object' && val !== null`."
    }
  ]
};
