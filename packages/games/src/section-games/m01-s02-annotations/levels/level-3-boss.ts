import { BossPhase } from '@ts-learn/types';

export const bossLevelAnnotations: BossPhase = {
  bossName: "Lord Any the Ambiguous",
  bossHealth: 100,
  timeLimitSeconds: 75,
  attackIntervalMs: 5000,
  challenges: [
    {
      prompt: "Lord Any has weakened the API with untyped parameters. Fix the function signature to restore compile-time safety!",
      brokenCode: `function createUser(name, age, email) {\n  return { name, age, email };\n}`,
      fixedCodeOptions: [
        `function createUser(name: string, age: number, email: string) {\n  return { name, age, email };\n}`,
        `function createUser(name, age, email): any {\n  return { name, age, email };\n}`,
        `function createUser(name: any, age: any, email: any) {\n  return { name, age, email };\n}`
      ],
      correctIndex: 0,
      explanation: "Each parameter needs its specific type: string for name/email, number for age. Using 'any' (uppercase or lowercase) disables all type checking and defeats the purpose of TypeScript."
    },
    {
      prompt: "The boss cast a 'typeof' spell that returns 'object' for null. The isAdmin check is broken! Fix it to properly guard against null.",
      brokenCode: `function isAdmin(user: { role: string } | null) {\n  return typeof user === "object" && user.role === "admin";\n}`,
      fixedCodeOptions: [
        `function isAdmin(user: { role: string } | null) {\n  return user !== null && user.role === "admin";\n}`,
        `function isAdmin(user: { role: string } | null) {\n  return typeof user === "object" && user !== null;\n}`,
        `function isAdmin(user: { role: string } | null) {\n  return user.role === "admin";\n}`
      ],
      correctIndex: 0,
      explanation: "First check `user !== null`, then access `user.role`. The original code uses `typeof` which is unnecessary here since we already narrowed with the union type. The third option would crash on null."
    },
    {
      prompt: "The boss's generic identity function loses its type when used with 'as'. The compiler was told to trust 'any'. Fix the assertion to preserve type safety!",
      brokenCode: `function identity<T>(arg: T): T {\n  return arg;\n}\n\nconst result = identity<string[]>(42) as string[];\n// result is ['hello'] but was actually 42!`,
      fixedCodeOptions: [
        `const result = identity<string[]>(["hello"]);`,
        `const result = identity<any>(42) as string[];\nconst result2 = identity<number>(42);`,
        `const result = identity(42) as string[];`
      ],
      correctIndex: 0,
      explanation: "Pass an actual string[] to identity<string[]>, and TypeScript will infer it correctly. The second option uses 'any' which is unsafe. The third option uses 'as' to assert a number is a string array — type assertion doesn't convert values."
    },
    {
      prompt: "The boss created a config object without proper typing. It's been accepting any value silently! Add proper annotations to restore type safety.",
      brokenCode: `let dbConfig;\ndbConfig = { host: "localhost", port: 5432 };\ndbConfig = "oops";  // 😱 Should fail!\ndbConfig = true;    // 😱 Should also fail!`,
      fixedCodeOptions: [
        `let dbConfig: { host: string; port: number } = { host: "localhost", port: 5432 };\n// dbConfig = "oops";  // ❌ Error\ndbConfig = { host: "localhost", port: 5432 };  // ✅ OK`,
        `let dbConfig: any = { host: "localhost", port: 5432 };\n// No errors at all`,
        `let dbConfig;\n// TypeScript infers correctly`
      ],
      correctIndex: 0,
      explanation: "Without an explicit type annotation and initial value, 'dbConfig' is 'any' — it accepts anything. Adding the proper interface `{ host: string; port: number }` as an annotation ensures only valid configs are accepted."
    }
  ]
};
