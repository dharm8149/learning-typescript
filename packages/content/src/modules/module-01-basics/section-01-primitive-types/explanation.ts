export const primitiveTypesExplanation = {
  title: "TypeScript Primitive Types & Memory Model",
  summary: "In JavaScript, values are dynamically typed at runtime. TypeScript wraps JavaScript with a static type system that verifies type safety at compile time before any code runs in production.",
  sections: [
    {
      heading: "1. The Seven Core JavaScript & TypeScript Primitives",
      content: `TypeScript directly mirrors JavaScript's primitive types:
- **string**: UTF-16 code units (e.g. \`"Hello"\`, \`'World'\`, \`\`Interpolated \${name}\`\`)
- **number**: IEEE 754 64-bit double-precision floating points (e.g. \`42\`, \`3.14\`, \`0xFF\`, \`NaN\`)
- **boolean**: Binary truth values (\`true\` or \`false\`)
- **symbol**: Unique, immutable object property keys created via \`Symbol()\`
- **bigint**: Arbitrary precision integers (e.g. \`9007199254740991n\`)
- **null**: Intentional absence of any object value
- **undefined**: Variable declared but not yet assigned a value`,
      codeSnippet: `// Explicit primitive type annotations
const greeting: string = "Welcome to TypeScript!";
const score: number = 99.5;
const isCertified: boolean = true;
const idSymbol: symbol = Symbol("user_id");
const maxMemory: bigint = 9007199254740992n;
let pendingResponse: null = null;
let uninitializedData: undefined = undefined;`,
      tip: "Notice that primitive types in TypeScript use all LOWERCASE letters ('string', 'number'). Do NOT use uppercase wrappers ('String', 'Number', 'Boolean') which refer to JavaScript wrapper objects."
    },
    {
      heading: "2. Compile-Time Types vs Runtime Erasure",
      content: "All TypeScript types exist strictly during compilation and development. Once you run `tsc` or your Vite bundler, all type annotations are stripped away (erased), leaving clean standard JavaScript.",
      codeSnippet: `// TypeScript Source (Compile Time)
function calculateTax(price: number, taxRate: number): number {
  return price * taxRate;
}

// Transpiled JavaScript Output (Runtime)
function calculateTax(price, taxRate) {
  return price * taxRate;
}`,
      tip: "Because types are erased at runtime, you cannot use TypeScript types inside JavaScript conditional logic (e.g. `if (x === string)` is invalid)."
    },
    {
      heading: "3. Common Pitfalls: The 'typeof null' Legacy Bug",
      content: "A notorious legacy quirk in JavaScript is that `typeof null === 'object'`. TypeScript understands this bug, but cleanly distinguishes `null` as its own distinct type.",
      codeSnippet: `// In JavaScript runtime:
typeof "hello"   // -> "string"
typeof 42        // -> "number"
typeof true      // -> "boolean"
typeof null      // -> "object" (JavaScript legacy bug since 1995!)
typeof undefined // -> "undefined"

// In TypeScript compile-time:
let val: null = null;
// val = {}; // TS Error: Type '{}' is not assignable to type 'null'.`,
      warning: "Always use strict equality (`val === null`) to check for null rather than `typeof val === 'object'`."
    },
    {
      heading: "4. Type Inference: Let vs Const",
      content: "When you don't explicitly write a type annotation, TypeScript automatically infers the most appropriate type based on variable declaration keyword (`let` vs `const`).",
      codeSnippet: `// Type inferred as wide primitive 'string' (can be reassigned to any string)
let mutableMessage = "Hello World"; 
mutableMessage = "Goodbye!"; // OK

// Type inferred as literal type '"Hello World"' (cannot change!)
const immutableMessage = "Hello World"; 
// immutableMessage has type: "Hello World", not string!`
    }
  ]
};
