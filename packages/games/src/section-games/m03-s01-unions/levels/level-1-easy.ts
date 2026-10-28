import { GameLevel } from '@ts-learn/types';

export const level1Easy: GameLevel = {
  levelNumber: 1,
  title: "Level 1: Union Basics",
  description: "Identify correct union type declarations and understand when a value can be multiple types.",
  timeLimitSeconds: 35,
  targetScore: 600,
  items: [
    {
      id: "m1",
      valueRepresentation: "type ID = string | number;\nconst id1: ID = 'abc';  // Valid?\nconst id2: ID = 123;    // Valid?",
      valueExplanation: "ID is a union of string OR number. Both string 'abc' and number 123 are valid.",
      correctType: "✅ Both valid — 'abc' is string, 123 is number",
      distractorTypes: ["❌ Only string is valid", "error: ID requires number", "error: union types not allowed"]
    },
    {
      id: "m2",
      valueRepresentation: "type Status = 'pending' | 'processing' | 'done';\nconst s: Status = 'error'; // Valid?",
      valueExplanation: "Status only allows 'pending', 'processing', or 'done'. 'error' is not a member of this union.",
      correctType: "error: Type '\"error\"' is not assignable to type 'Status'",
      distractorTypes: ["✅ valid — any string works", "warning only", "error: 'error' should be 'done'"]
    },
    {
      id: "m3",
      valueRepresentation: "type Value = string | number | null;\nfunction process(v: Value) {\n  console.log(v.toUpperCase()); // Valid?\n}",
      valueExplanation: "Value can be string, number, or null. Only string has toUpperCase(). TypeScript requires narrowing first.",
      correctType: "error: 'Value' is not assignable to 'string'. Need type guard.",
      distractorTypes: ["✅ valid — 'v' might be string", "error: null can't be logged", "error: number has no toUpperCase"]
    },
    {
      id: "m4",
      valueRepresentation: "type Response = string | { data: number };\nfunction handle(r: Response) {\n  if (typeof r === 'string') {\n    return r; // What is r's type here?\n  }\n}",
      valueExplanation: "After the typeof check narrows to string, TypeScript knows the else branch must be the object type.",
      correctType: "{ data: number }",
      distractorTypes: ["string | { data: number }", "unknown", "never"]
    },
    {
      id: "m5",
      valueRepresentation: "type Empty = never;\ntype Any = unknown;\nconst n: Empty = ???;\n// Can you create a value of type 'never'?",
      valueExplanation: "'never' represents a value that never occurs. You cannot create a value of type never.",
      correctType: "No — 'never' has no values",
      distractorTypes: ["Yes — undefined", "Yes — null", "Yes — the empty object {}"]
    }
  ]
};
