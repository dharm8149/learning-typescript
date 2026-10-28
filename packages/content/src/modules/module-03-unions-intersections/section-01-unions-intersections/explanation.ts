export const unionsExplanation = {
  title: "Unions and Intersections — The Type Composition Toolkit",
  summary: "Union (|) and intersection (&) types let you compose complex type relationships. Unions mean 'one of these', intersections mean 'all of these'. Together they form the backbone of TypeScript's type system.",
  sections: [
    {
      heading: "What Are Union Types?",
      content: `A union type represents a value that can be one of several types. Think of it as an OR relationship — the value is A or B or C, but never more than one at a time.

// A status can be one of three string literals
type Status = 'pending' | 'active' | 'suspended';

// A value can be a string OR a number
type ID = string | number;

// Function that returns either a success or failure result
function findUser(id: string): User | null {
  return users.find(u => u.id === id) ?? null;
}`,
      tip: "Union types narrow automatically as you add conditions. If you check `if (value !== null)`, TypeScript knows value is not null in that branch."
    },
    {
      heading: "What Are Intersection Types?",
      content: `An intersection type combines multiple types into one. It's an AND relationship — the value must satisfy ALL the types simultaneously.

interface HasId {
  id: string;
}

interface HasTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

// Entity has BOTH id AND createdAt AND updatedAt
type Entity = HasId & HasTimestamps;

// This is equivalent to:
type EntityManual = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};`,
      codeSnippet: `interface CanFly {
  fly(): void;
}

interface CanSwim {
  swim(): void;
}

// Duck can do both
type Duck = CanFly & CanSwim;

const duck: Duck = {
  fly() { console.log("Flapping!"); },
  swim() { console.log("Paddling!"); }
};`,
      tip: "Intersection types combine properties. If two types have the same property with different types, the intersection requires both — which may result in never if they are incompatible."
    },
    {
      heading: "Discriminated Unions",
      content: `When union members share a common property with literal values, TypeScript can narrow the type automatically. This is the foundation of the algebraic data type pattern.

type Result =
  | { success: true; data: User }
  | { success: false; error: string };

function handleResult(result: Result): string {
  if (result.success) {
    // TypeScript knows result is { success: true; data: User } here
    return result.data.name;
  } else {
    // TypeScript knows result is { success: false; error: string } here
    return result.error;
  }
}

// Exhaustive checking with switch
function handleResultExhaustive(result: Result): string {
  switch (result.success) {
    case true: return result.data.name;
    case false: return result.error;
    // If you add a new variant to Result, TypeScript will error here
    default: {
      const _exhaustive: never = result;
      return _exhaustive;
    }
  }
}`,
      warning: "Always add an exhaustive check (using never) to your switch statements when working with discriminated unions. This catches missing cases at compile time — a production-ready pattern for event handlers and reducers.",
      tip: "Discriminated unions are the TypeScript equivalent of algebraic data types in functional programming. They are the recommended pattern for modeling state machines, API responses, and event systems."
    }
  ]
};
