import { GameLevel } from '@ts-learn/types';

export const level2Medium: GameLevel = {
  levelNumber: 2,
  title: "Level 2: The Inference Trap",
  description: "Spot where inference fails and annotations become critical to prevent bugs!",
  timeLimitSeconds: 40,
  targetScore: 750,
  items: [
    {
      id: "m1",
      valueRepresentation: "function parse(input) { return input.toString().trim(); }",
      valueExplanation: "'input' has no annotation — any type slips through, including null or undefined.",
      correctType: "annotated: must add 'string' or 'unknown'",
      distractorTypes: ["inferred: string", "any is fine here", "auto-inferred"]
    },
    {
      id: "m2",
      valueRepresentation: "function add(a: number, b) { return a + b; }",
      valueExplanation: "Parameter 'b' lacks annotation — it defaults to 'any', allowing any type.",
      correctType: "annotated: 'b' needs 'number'",
      distractorTypes: ["inferred: number", "b is 'any' (safe)", "no issue"]
    },
    {
      id: "m3",
      valueRepresentation: "const user = null; // type?",
      valueExplanation: "A const assigned to 'null' has the type 'null', not 'any'. The compiler knows exactly what it is.",
      correctType: "inferred: null",
      distractorTypes: ["annotated: any", "inferred: any", "unknown"]
    },
    {
      id: "m4",
      valueRepresentation: "function process(data) { data.items.map(i => i.name); }",
      valueExplanation: "Without a type on 'data', TypeScript can't verify 'items' or 'name' exist — 'data' is 'any'.",
      correctType: "annotated: must add interface { items: { name: string }[] }",
      distractorTypes: ["inferred: object", "any works fine", "auto-typed"]
    },
    {
      id: "m5",
      valueRepresentation: "const result: number = \"hello\";",
      valueExplanation: "An explicit annotation of 'number' with a string literal — this is a type mismatch the compiler catches.",
      correctType: "annotated: compiler error (type mismatch)",
      distractorTypes: ["inferred: string", "no error", "annotated: string"]
    }
  ]
};
