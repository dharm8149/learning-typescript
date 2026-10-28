export const advancedTypesExplanation = {
  title: "Advanced Types — TypeScript's Most Powerful Features",
  summary: "TypeScript's advanced type system includes type guards, conditional types, template literal types, and discriminated unions. These features let you express any type relationship your application needs, from API response validation to exhaustive switch statements.",
  sections: [
    {
      heading: "Type Narrowing & Guards",
      content: `TypeScript narrows types through control flow. Type guards are functions or expressions that use 'is' predicates to tell TypeScript more about a type at runtime. They're the bridge between runtime checks and compile-time type safety.

// The 'is' predicate type guard
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value && 'name' in value;
}

function process(value: unknown) {
  if (isUser(value)) {
    // TypeScript knows value is User here
    console.log(value.name);  // ✅ Full autocomplete
  } else {
    // TypeScript knows value is not User here
    console.log('Not a user');
  }
}`,
      codeSnippet: `// Built-in type guards
function processValue(value: string | number | boolean) {
  if (typeof value === 'string') {
    value.toUpperCase();  // ✅ TypeScript knows it's string
  } else if (typeof value === 'number') {
    value.toFixed(2);     // ✅ TypeScript knows it's number
  } else if (typeof value === 'boolean') {
    value ? 'yes' : 'no'; // ✅ TypeScript knows it's boolean
  }
}

// The 'in' type guard
interface Cat { meow(): void; }
interface Dog { bark(): void; }

function makeSound(animal: Cat | Dog) {
  if ('meow' in animal) {
    animal.meow();  // ✅ TypeScript knows it's Cat
  } else {
    animal.bark();  // ✅ TypeScript knows it's Dog
  }
}

// instanceof type guard
function formatDate(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString();
  } else {
    return new Date(value).toISOString();
  }
}`,
      tip: "The 'is' predicate is the most powerful type guard pattern. It tells TypeScript exactly what type a value is, enabling full autocomplete and type safety in the narrowed branch."
    },
    {
      heading: "Conditional Types & Infer",
      content: `Conditional types (T extends U ? X : Y) let you create types that depend on other types. Combined with 'infer', you can extract types from complex structures — like extracting the return type of a function or the inner type of a Promise.

// Basic conditional type
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;   // true
type B = IsString<number>;   // false

// Extracting function return types
type Unpacked<T> = T extends (...args: any[]) => infer R ? R : T;
type Result = Unpacked<() => string>;  // string

// Extracting Promise inner types
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type UserPromise = Promise<User>;
type UnpackedUser = UnpackPromise<UserPromise>;  // User`,
      codeSnippet: `// Real-world: built-in utility types using conditional types

// Required<T> implementation
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Pick<T, K> implementation
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Extract<T, U> implementation
type Extract<T, U> = T extends U ? T : never;

// Usage
type StringOrNumber = Extract<'a' | 'b' | 1, string | number>;
// 'a' | 'b' | 1

type OnlyStrings = Extract<'a' | 'b' | 1, string>;
// 'a' | 'b'`,
      warning: "Conditional types distribute over unions by default. T extends U ? X : Y applied to A | B | C becomes (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y). Wrap T in [T] extends [U] to prevent distribution.",
      tip: "The infer keyword is what makes conditional types powerful. It lets you extract types from complex structures without manually specifying them — enabling type-level programming."
    },
    {
      heading: "Discriminated Unions",
      content: `Discriminated unions use a common property (the discriminant) to distinguish between different shapes. Combined with exhaustive checking (using 'never'), they catch missing cases at compile time — a production-ready pattern for event handlers and reducers.

// The discriminated union pattern
type Action =
  | { type: 'ADD'; payload: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE'; id: string; data: Partial<User> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE':
      return { ...state, items: state.items.map(i =>
        i.id === action.id ? { ...i, ...action.data } : i
      ) };
    // Exhaustive check:
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
}`,
      codeSnippet: `// Reducer pattern — exhaustive checking catches missing cases
function handleEvent(event: MouseEvent | KeyboardEvent | TouchEvent) {
  switch (event.type) {
    case 'click':
      console.log('Click at', event.clientX, event.clientY);
      break;
    case 'keydown':
      console.log('Key pressed:', (event as KeyboardEvent).key);
      break;
    case 'touchstart':
      console.log('Touch at', event.touches[0].clientX);
      break;
    default: {
      // If you add a new event type, TypeScript will error here
      const _exhaustive: never = event;
      throw new Error(\`Unhandled event type: \${(_exhaustive as any).type}\`);
    }
  }
}`,
      tip: "Discriminated unions are the TypeScript equivalent of algebraic data types (ADTs) in functional programming. They are the recommended pattern for modeling state machines, API responses, and event systems.",
      warning: "Always include an exhaustive check (using never) in your switch statements. Without it, adding a new variant to the union won't cause compile errors — the bug will only appear at runtime."
    }
  ]
};
