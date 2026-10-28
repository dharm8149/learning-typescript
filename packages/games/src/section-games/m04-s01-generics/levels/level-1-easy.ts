import { GameLevel } from '@ts-learn/types';

export const level1Easy: GameLevel = {
  levelNumber: 1,
  title: "Level 1: Generic Functions",
  description: "Learn to write functions that work with any type using type parameters.",
  timeLimitSeconds: 35,
  targetScore: 600,
  items: [
    {
      id: "m1",
      valueRepresentation: "function identity<T>(arg: T): T {\n  return arg;\n}\nconst result = identity('hello');\n// What is result's type?",
      valueExplanation: "TypeScript infers T from the argument. Passing 'hello' (string) means T = string, so result is string.",
      correctType: "string",
      distractorTypes: ["any", "T (generic)", "string | any"]
    },
    {
      id: "m2",
      valueRepresentation: "function first<T>(arr: T[]): T {\n  return arr[0];\n}\nconst num = first([1, 2, 3]);\n// What is num's type?",
      valueExplanation: "first<[number]>() — T is inferred as number from the array type.",
      correctType: "number",
      distractorTypes: ["any", "number[]", "unknown"]
    },
    {
      id: "m3",
      valueRepresentation: "function combine<T, U>(a: T, b: U): [T, U] {\n  return [a, b];\n}\nconst pair = combine('hi', 42);\n// What is pair's type?",
      valueExplanation: "T = string, U = number. The return type is [string, number].",
      correctType: "[string, number]",
      distractorTypes: ["[any, any]", "string | number", "[T, U]"]
    },
    {
      id: "m4",
      valueRepresentation: "function echo<T>(arg: T): T {\n  return arg.toUpperCase(); // Valid?\n}",
      valueExplanation: "T could be number, boolean, etc. Not all types have toUpperCase(). This is a compile error.",
      correctType: "error: Property 'toUpperCase' does not exist on 'T'",
      distractorTypes: ["✅ valid — T is a string", "error: generic not allowed here", "warning only"]
    },
    {
      id: "m5",
      valueRepresentation: "function identity<T>(arg: T): T {\n  return arg;\n}\n// How do you explicitly set T?\nconst result = identity<string>('hello');\n// What is result's type?",
      valueExplanation: "When you explicitly specify T<string>, the result type is string regardless of what you pass.",
      correctType: "string",
      distractorTypes: ["any", "T", "unknown"]
    }
  ]
};
