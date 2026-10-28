export const typeAnnotationsExplanation = {
  title: "Type Annotations vs Type Inference — The Compiler's Decision Engine",
  summary: "TypeScript can infer types automatically, but explicit annotations serve as developer contracts. Understanding when each is appropriate prevents bugs, improves readability, and makes refactoring safer.",
  sections: [
    {
      heading: "1. Type Inference: TypeScript's Crystal Ball",
      content: `TypeScript's type inference engine analyzes your code and assigns types automatically when you use \`const\` or function return values. This is called **type inference** — the compiler watches you assign values and figures out the type on its own.`,
      codeSnippet: `// TypeScript infers the type as 'string' from the assigned literal
const username = "alice_dev";        // inferred: string
const maxRetries = 3;                 // inferred: number
const isAuthenticated = false;        // inferred: boolean

// Inference also works for function return types
function add(a: number, b: number) {
  return a + b;  // TypeScript infers return type as 'number'
}`,
      tip: "Always prefer \`const\` over \`let\` when values don't change. \`const\` gives you a narrower literal type (e.g. \`\"hello\"\` instead of \`string\`), which catches accidental reassignments."
    },
    {
      heading: "2. When Inference Falls Short: The 'any' Trap",
      content: `When a variable is declared without an initial value, TypeScript widens the type to \`any\` or \`unknown\` — losing all type safety. In these cases, you **must** add an explicit annotation.`,
      codeSnippet: `// BAD: No type annotation, no initial value → inferred as 'any'
let config;
config = { host: "localhost" };
config = 42;  // 😱 No error! 'any' disables all type checking.

// GOOD: Explicit annotation prevents type drift
let config: { host: string; port: number } = { host: "localhost", port: 3000 };
config = 42;  // ❌ Error: Type 'number' is not assignable to type '{ host: string; port: number }'.`,
      warning: "Never use \`any\` unless you have absolutely no choice. \`any\` is a type safety landmine — it silently disables all compiler checks and makes bugs invisible until runtime."
    },
    {
      heading: "3. Function Parameters: Annotations Are Non-Negotiable",
      content: `TypeScript can infer function **return** types but **cannot** infer parameter types from how the function is called. You must annotate parameters explicitly — this is the developer's contract with the compiler.`,
      codeSnippet: `// ❌ Inference cannot determine parameter types
function formatUser(name, age) {  // Both are implicitly 'any'
  return \`Name: \${name}, Age: \${age}\`;  // No type safety on 'name' or 'age'
}

// ✅ Explicit parameter annotations = compile-time safety
function formatUser(name: string, age: number): string {
  return \`Name: \${name}, Age: \${age}\`;
}

formatUser("Alice", 28);     // ✅ OK
formatUser("Bob", "thirty"); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'.`,
      tip: "A common rule of thumb: annotate function parameters and return types explicitly (the 'public API'), but rely on inference for internal variables (the 'private implementation')."
    },
    {
      heading: "4. Type Assertion: When You Know More Than TypeScript",
      content: `Sometimes TypeScript's inference is too conservative. When you know a value has a more specific type than the compiler can determine, you can use **type assertion** (\`as\` or \`<T>\`) to override the type. Use this sparingly — it shifts responsibility from the compiler to you.`,
      codeSnippet: `// DOM query returns 'HTMLElement | null' (too broad)
const raw = document.getElementById("title");

// We know it's an HTMLHeadingElement — assert it
const title = raw as HTMLHeadingElement;
title.textContent = "Hello!";  // ✅ Full autocomplete and safety

// ⚠️ DANGER: If the element doesn't exist, title is null
title.textContent = "Crash!";  // ❌ Runtime error — assertion silenced the null check`,
      warning: "Type assertions do NOT perform runtime validation. \`as string\` doesn't convert the value — it just tells the compiler to trust you. Always verify the value is actually what you claim before asserting."
    },
    {
      heading: "5. The 'Liskov Substitution' of Types: Inference with Generics",
      content: `TypeScript's inference is powerful with generics — it can infer the type argument from the value passed in. This is how utilities like \`Array.from()\` and \`Promise.resolve()\` work seamlessly across all types.`,
      codeSnippet: `// TypeScript infers T from the argument
const numbers = [1, 2, 3];        // inferred: number[]
const strings = ["a", "b", "c"];  // inferred: string[]

// Generic utility: identity function preserves input type
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42);    // inferred: number — no annotation needed!
const str = identity("hi");  // inferred: string — no annotation needed!

// When inference fails, provide the type argument explicitly
const result = identity<string>("hello");  // explicitly: string`,
      tip: "If TypeScript can infer a type from context, don't write the annotation. If it can't, or if it infers something too broad (like \`any\`), add the annotation."
    }
  ]
};
