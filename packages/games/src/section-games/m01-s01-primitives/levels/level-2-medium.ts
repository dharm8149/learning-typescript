import { GameLevel } from '@ts-learn/types';

export const level2Medium: GameLevel = {
  levelNumber: 2,
  title: "Level 2: Esoteric & Edge-Case Primitives",
  description: "Test your skills against BigInt, Symbol, NaN, and JavaScript type quirks!",
  timeLimitSeconds: 35,
  targetScore: 750,
  items: [
    {
      id: "m1",
      valueRepresentation: "9007199254740995n",
      valueExplanation: "Numbers suffixed with 'n' represent arbitrary-precision BigInts.",
      correctType: "bigint",
      distractorTypes: ["number", "string", "symbol"]
    },
    {
      id: "m2",
      valueRepresentation: "Symbol('user_token')",
      valueExplanation: "Symbol() creates a guaranteed globally unique primitive token.",
      correctType: "symbol",
      distractorTypes: ["string", "object", "any"]
    },
    {
      id: "m3",
      valueRepresentation: "NaN",
      valueExplanation: "Despite meaning 'Not-a-Number', NaN is technically classified as a primitive number in JavaScript/TypeScript IEEE 754!",
      correctType: "number",
      distractorTypes: ["never", "undefined", "null"]
    },
    {
      id: "m4",
      valueRepresentation: "Infinity",
      valueExplanation: "Positive and negative Infinity are special values of the number primitive type.",
      correctType: "number",
      distractorTypes: ["bigint", "string", "unknown"]
    },
    {
      id: "m5",
      valueRepresentation: "``",
      valueExplanation: "An empty template literal evaluates to the primitive string type.",
      correctType: "string",
      distractorTypes: ["undefined", "null", "void"]
    }
  ]
};
