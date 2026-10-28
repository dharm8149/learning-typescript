import { GameLevel } from '@ts-learn/types';

export const level1Easy: GameLevel = {
  levelNumber: 1,
  title: "Level 1: Inference vs Annotation Basics",
  description: "Identify where TypeScript infers types and where you must write explicit annotations!",
  timeLimitSeconds: 45,
  targetScore: 500,
  items: [
    {
      id: "a1",
      valueRepresentation: "const name = \"Alice\";",
      valueExplanation: "A const with a literal value — TypeScript infers the type automatically.",
      correctType: "inferred: string",
      distractorTypes: ["annotated: string", "any", "unknown"]
    },
    {
      id: "a2",
      valueRepresentation: "function greet(name) { return name; }",
      valueExplanation: "A function parameter with no initial value — TypeScript cannot infer, defaults to any.",
      correctType: "annotated: must add 'string'",
      distractorTypes: ["inferred: string", "any (OK)", "never"]
    },
    {
      id: "a3",
      valueRepresentation: "function double(x) { return x * 2; }",
      valueExplanation: "No type on 'x' means TypeScript defaults to 'any' — no compile-time safety.",
      correctType: "annotated: must add 'number'",
      distractorTypes: ["inferred: number", "any (safe)", "undefined"]
    },
    {
      id: "a4",
      valueRepresentation: "const items = [1, 2, 3];",
      valueExplanation: "Array literal with const — TypeScript infers the exact tuple type.",
      correctType: "inferred: number[]",
      distractorTypes: ["annotated: number[]", "any[]", "unknown"]
    },
    {
      id: "a5",
      valueRepresentation: "let count; count = 10;",
      valueExplanation: "Declared with let but no initial value — TypeScript cannot infer, defaults to any.",
      correctType: "annotated: must add 'number'",
      distractorTypes: ["inferred: number", "any (fine)", "void"]
    }
  ]
};
