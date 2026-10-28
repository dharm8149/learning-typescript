import { BossPhase } from '@ts-learn/types';

export const bossLevelGenerics: BossPhase = {
  bossName: "The Generic Overlord",
  bossHealth: 100,
  timeLimitSeconds: 60,
  attackIntervalMs: 4000,
  challenges: [
    {
      prompt: "Build a type-safe API fetch function using generics.",
      brokenCode: `// Build a type-safe fetch function
async function apiFetch<T>(url: string, options?: RequestInit): Promise<___> {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

// Usage:
const user = await apiFetch<User>('/api/user');
// user is User type ✅

const posts = await apiFetch<Post[]>('/api/posts');
// posts is Post[] type ✅`,
      fixedCodeOptions: [
        "Promise<T>",
        "Promise<any>",
        "Promise<unknown>",
        "T (not wrapped in Promise)"
      ],
      correctIndex: 0,
      explanation: "The function returns Promise<T> so the caller gets the specific type they requested."
    },
    {
      prompt: "Build a type-safe container that stores any value.",
      brokenCode: `class Container<T> {
  private value: T;
  
  constructor(value: T) {
    this.value = value;
  }
  
  map<U>(fn: (val: T) => U): Container<___> {
    return new Container(fn(this.value));
  }
}

const c = new Container(42);
const str = c.map(x => x.toString());
// str is Container<string> ✅`,
      fixedCodeOptions: [
        "U",
        "T",
        "T & U",
        "any"
      ],
      correctIndex: 0,
      explanation: "map transforms T into U, so the returned Container should be Container<U>."
    },
    {
      prompt: "Build a function that works only with objects that have specific properties.",
      brokenCode: `// Build a function that extracts a property safely
function extractField<T extends { id: string }, K extends keyof T>(
  obj: T, 
  key: K
): T[K] {
  return obj[key];
}

interface User {
  id: string;
  name: string;
  age: number;
}

const u: User = { id: 'u1', name: 'Alice', age: 30 };

// These should all work:
extractField(u, 'id');   // string
extractField(u, 'name'); // string
extractField(u, 'age');  // number

// This should ERROR:
extractField(u, 'email'); // ❌`,
      fixedCodeOptions: [
        "T[K]",
        "string",
        "unknown",
        "T"
      ],
      correctIndex: 0,
      explanation: "T[K] means 'the type of property K on object T'. It's the most precise return type."
    }
  ]
};
