import { BossPhase } from '@ts-learn/types';

export const bossLevelInterfaces: BossPhase = {
  bossName: "The Interface Overlord",
  bossHealth: 100,
  timeLimitSeconds: 75,
  attackIntervalMs: 5000,
  challenges: [
    {
      prompt: "The API returns inconsistent user objects. Create an interface that matches ALL valid responses — including optional and required fields.",
      brokenCode: `// API can return:\n// { id: 1, name: "Alice", email: "alice@test.com" }\n// { id: 2, name: "Bob" }\n// { id: 3, name: "Carol", email: "carol@test.com", role: "admin" }\n\ninterface User {\n  id: number;\n  name: string;\n  email: string;  // ❌ Optional in API\n  role: "admin";  // ❌ Optional in API\n}`,
      fixedCodeOptions: [
        `interface User {\n  id: number;\n  name: string;\n  email?: string;   // ✅ Optional\n  role?: "admin";   // ✅ Optional\n}`,
        `interface User {\n  id: number;\n  name: string;\n  email: string | null;\n  role: string;\n}`,
        `interface User {\n  id: number;\n  name: string;\n  email?: string;\n  role: "admin" | "user";\n}`
      ],
      correctIndex: 0,
      explanation: "Properties that may be absent in the API response should use '?' for optional. Both email and role can be missing, so both need '?'. The third option is close but 'role' is truly optional (may not appear at all), not just a different value."
    },
    {
      prompt: "The team accidentally declared the same interface name twice in different files. One has 'host', the other has 'port'. Which pattern is TypeScript using?",
      brokenCode: `// File A:\ninterface Config {\n  host: string;\n}\n\n// File B:\ninterface Config {\n  port: number;\n}\n\n// What is Config now?`,
      fixedCodeOptions: [
        `// Declaration Merging — Config has BOTH:\n// { host: string; port: number }`,
        `// Error — duplicate interface name`,
        `// Last one wins — Config has only { port: number }`
      ],
      correctIndex: 0,
      explanation: "TypeScript interfaces support DECLARATION MERGING — the same interface name in different scopes merges their properties. This is a powerful pattern for augmenting third-party types."
    },
    {
      prompt: "You need a type that represents a successful API response OR an error response. Which construct should you use?",
      brokenCode: `// Need: { success: true; data: T } OR { success: false; error: string }\n\ninterface Success<T> { success: true; data: T; }\ninterface Failure { success: false; error: string; }\n// How to combine?`,
      fixedCodeOptions: [
        `// Type alias with union (correct):\ntype ApiResponse<T> = \n  { success: true; data: T } | \n  { success: false; error: string };`,
        `// Interface with extends (wrong):\ninterface ApiResponse<T> extends Success<T>, Failure { }`,
        `// Interface merging (wrong):\ninterface ApiResponse<T> { success: true; data: T; }\ninterface ApiResponse<T> { success: false; error: string; }`
      ],
      correctIndex: 0,
      explanation: "UNION types (using '|') express 'this OR that'. Interfaces use 'extends' for 'this AND that (plus more)'. For API responses that are EITHER success OR failure, a union type alias is correct."
    },
    {
      prompt: "The boss's type system is broken! Fix the interface hierarchy so 'PremiumUser' includes ALL inherited properties correctly.",
      brokenCode: `interface User {\n  id: string;\n  name: string;\n}\n\ninterface PremiumUser extends User {\n  subscription: 'premium';\n}\n\nconst premium: PremiumUser = {\n  subscription: 'premium',  // ✅\n  name: "Alice"              // ✅\n  // Missing: id              // ❌\n};`,
      fixedCodeOptions: [
        `const premium: PremiumUser = {\n  id: "usr_123",            // ✅ Added\n  name: "Alice",            // ✅\n  subscription: "premium"   // ✅\n};`,
        `const premium: PremiumUser = {\n  name: "Alice",            // ✅\n  subscription: "premium"   // ✅\n  // id not needed for PremiumUser\n};`,
        `interface PremiumUser extends User {\n  subscription: 'premium';\n  id?: string;  // Make id optional\n}\nconst premium: PremiumUser = {\n  name: "Alice",\n  subscription: "premium"\n};`
      ],
      correctIndex: 0,
      explanation: "PremiumUser extends User, so it inherits ALL of User's properties including 'id'. The 'extends' keyword adds properties, it doesn't replace them. The third option would work but is bad practice — id is required for all users, not just premium ones."
    }
  ]
};
