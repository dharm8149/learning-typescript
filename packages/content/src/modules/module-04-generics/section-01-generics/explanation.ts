export const genericsExplanation = {
  title: "Generics — Write Code Once, Use With Any Type",
  summary: "Generics let you write flexible functions, interfaces, and classes that work with any type while preserving type information. They're the secret behind TypeScript's utility types, React's hooks, and every production library.",
  sections: [
    {
      heading: "The Problem: Duplicate Code",
      content: `Without generics, you either use 'any' (losing type safety) or write duplicate functions for each type. Generics solve this by creating a placeholder type that gets filled in at usage time.

// Without generics — five functions for five types
function wrapString(value: string): { value: string } {
  return { value };
}

function wrapNumber(value: number): { value: number } {
  return { value };
}

function wrapUser(value: User): { value: User } {
  return { value };
}

// ... and so on for Order, Product, etc.

// With generics — one function for all types
function wrap<T>(value: T): { value: T } {
  return { value };
}`,
      codeSnippet: `// The generic function preserves type information
const stringBox = wrap("hello");   // inferred: { value: string }
const numberBox = wrap(42);        // inferred: { value: number }
const userBox = wrap({ id: 1 });   // inferred: { value: { id: number } }

// Type is preserved through the chain
const str: string = stringBox.value;  // ✅ No type assertion needed!`,
      tip: "Think of generics as a type placeholder. When you call wrap('hello'), TypeScript fills in T with string. When you call wrap(42), TypeScript fills in T with number. The type information flows through your code."
    },
    {
      heading: "The Solution: Type Parameters",
      content: `A type parameter (like <T>) is a placeholder. When you call the function with a specific type, TypeScript fills in the placeholder and ensures type safety throughout.

// Single type parameter
function identity<T>(arg: T): T {
  return arg;
}

// Multiple type parameters
function pair<K, V>(key: K, value: V): { key: K; value: V } {
  return { key, value };
}

// Type parameters can be used in constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
      codeSnippet: `// Usage with explicit type arguments (when inference fails)
const result = identity<string>("hello");

// Usage with inferred types (most common)
const num = identity(42);          // T inferred as number
const obj = identity({ x: 1 });    // T inferred as { x: number }

// Multiple type parameters
const p = pair("name", "Alice");   // K=string, V=string
const e = pair(1, "Alice");        // K=number, V=string`,
      warning: "Always prefer type inference over explicit type arguments. Only specify <T> explicitly when TypeScript cannot infer the type from the arguments passed in."
    },
    {
      heading: "Where Generics Shine",
      content: `Generics power the entire TypeScript ecosystem. If code needs to handle multiple types uniformly while preserving type information — it uses generics.

// API wrappers
async function fetch<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as T;
}

// Usage
const users = await fetch<User[]>('/api/users');  // users: User[]
const user = await fetch<User>('/api/users/1');    // user: User

// React hooks
const [state, setState] = useState<string>("hello");  // State is string
const [count, setCount] = useState<number>(0);        // State is number

// Utility types
type UserPartial = Partial<User>;          // All properties optional
type UserId = Pick<User, 'id' | 'name'>;   // Only id and name
type SafeUser = Omit<User, 'password'>;    // Everything except password`,
      tip: "Generics are the key to reusable, type-safe code. Start by identifying patterns where you write the same function for different types — then replace the concrete types with type parameters.",
      warning: "Avoid over-using generics. If a function only works with one specific type, adding a generic parameter adds complexity without benefit. Generics should solve a real duplication problem."
    }
  ]
};
