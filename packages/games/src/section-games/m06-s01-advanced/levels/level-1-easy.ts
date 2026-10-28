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
      valueRepresentation: `function formatInput(input: string | number): string {
  if (typeof input === 'string') {
    return input.toUpperCase();
  }
  return input.toString();
}

// After the if-block, what is input's type?
function formatInput(input: string | number): string &#123;
  if (typeof input === 'string') &#123;
    // What is input's type HERE?
    return input.toUpperCase();
  &#125;
  return input.toString();
&#125;`,
      valueExplanation: "Inside the if-block, TypeScript has narrowed input to string. After the if-block (in the else branch), it's narrowed to number.",
      correctType: "string (narrowed from string | number)",
      distractorTypes: ["string | number (not narrowed)", "any", "unknown"]
    },
    {
      id: "m2",
      valueRepresentation: `function isString(val: unknown): val is string {
  return typeof val === 'string';
}

const data: unknown = 'hello';

if (isString(data)) &#123;
  // What is data's type HERE?
  console.log(data.length); // Valid?
&#125;`,
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
      valueRepresentation: `const val: unknown = 42;

// Which is the SAFEST way to check?
if (typeof val === 'number') &#123;
  // Is this valid?
  val.toFixed(2);
&#125;`,
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
      valueRepresentation: `type Result = 
  | { status: 'success'; data: string }
  | { status: 'error'; message: string };

function handleResult(result: Result) &#123;
  if (result.status === 'success') &#123;
    // What is result's type HERE?
    console.log(result.data); // Valid?
  &#125; else &#123;
    console.log(result.message); // Valid?
  &#125;
&#125;`,
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
      valueRepresentation: `type User = &#123; name: string; role: 'admin' | 'user' &#125;;
type Guest = &#123; name: string; token: string &#125;;

function greet(person: User | Guest) &#123;
  if ('role' in person) &#123;
    // What is person's type HERE?
    return `Hello, ${person.name}!`;
  &#125;
  return `Welcome, ${person.name}! Token: ${person.token}`;
&#125;`,
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
