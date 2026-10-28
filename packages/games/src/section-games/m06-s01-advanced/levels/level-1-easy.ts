import { GameLevel } from '@ts-learn/types';

export const level1Easy: GameLevel = {
  levelNumber: 1,
  title: "Level 1: Type Guards & Narrowing",
  description: "Learn to narrow types using typeof, instanceof, and custom type guards.",
  timeLimitSeconds: 35,
  targetScore: 600,
  items: [
    {
      id: "m1",
      valueRepresentation: "function formatInput(input: string | number): string {\n  if (typeof input === 'string') {\n    return input.toUpperCase();\n  }\n  return input.toString();\n}\n\n// After the if-block, what is input's type?\nfunction formatInput(input: string | number): string { // After: what type?\n  if (typeof input === 'string') {\n    // What is input's type HERE?\n    return input.toUpperCase();\n  }\n  return input.toString();\n}",
      valueExplanation: "Inside the if-block, TypeScript has narrowed input to string. After the if-block (in the else branch), it's narrowed to number.",
      correctType: "string (narrowed from string | number)",
      distractorTypes: ["string | number (not narrowed)", "any", "unknown"]
    },
    {
      id: "m2",
      valueRepresentation: "function isString(val: unknown): val is string {\n  return typeof val === 'string';\n}\n\nconst data: unknown = 'hello';\n\nif (isString(data)) {\n  // What is data's type HERE?\n  console.log(data.length); // Valid?\n}",
      valueExplanation: "The type predicate 'val is string' tells TypeScript that after the if-block, data is definitely string. data.length is valid.",
      correctType: "string — type predicate narrows the type",
      distractorTypes: [
        "unknown — still not narrowed",
        "string | number — partially narrowed",
        "any — type guard makes it any"
      ]
    },
    {
      id: "m3",
      valueRepresentation: "const val: unknown = 42;\n\n// Which is the SAFEST way to check?\nif (typeof val === 'number') {\n  // Is this valid?\n  val.toFixed(2);\n}",
      valueExplanation: "typeof val === 'number' narrows unknown to number, so val.toFixed(2) is valid TypeScript.",
      correctType: "✅ valid — typeof narrows unknown to number",
      distractorTypes: [
        "❌ error — unknown doesn't have toFixed",
        "⚠️ warning — need type assertion",
        "❌ error — typeof only works on strings"
      ]
    },
    {
      id: "m4",
      valueRepresentation: "type Result = \n  | { status: 'success'; data: string }\n  | { status: 'error'; message: string };\n\nfunction handleResult(result: Result) {\n  if (result.status === 'success') {\n    // What is result's type HERE?\n    console.log(result.data); // Valid?\n  } else {\n    console.log(result.message); // Valid?\n  }\n}",
      valueExplanation: "Discriminated union narrowing: result.status === 'success' narrows to the success variant. result.status === 'error' narrows to the error variant.",
      correctType: "Inside 'success' branch: { status: 'success'; data: string }",
      distractorTypes: [
        "Result (both variants) in both branches",
        "any — discriminated unions don't work",
        "string | number"
      ]
    },
    {
      id: "m5",
      valueRepresentation: "type User = { name: string; role: 'admin' | 'user' };\ntype Guest = { name: string; token: string };\n\nfunction greet(person: User | Guest) {\n  if ('role' in person) {\n    // What is person's type HERE?\n    return 'Hello, ' + person.name + '!';\n  }\n  return 'Welcome, ' + person.name + '! Token: ' + person.token;\n}",
      valueExplanation: "'role' in person narrows to User (only User has the role property). In the else branch, it's narrowed to Guest.",
      correctType: "User (narrowed by 'role' in person)",
      distractorTypes: [
        "User | Guest (not narrowed)",
        "Guest",
        "any"
      ]
    }
  ]
};
