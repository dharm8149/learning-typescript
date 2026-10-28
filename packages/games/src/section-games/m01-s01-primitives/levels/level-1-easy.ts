import { GameLevel } from '@ts-learn/types';

export const level1Easy: GameLevel = {
  levelNumber: 1,
  title: "Level 1: Core Primitives Training",
  description: "Match each JavaScript runtime value to its correct TypeScript static primitive type before time runs out!",
  timeLimitSeconds: 45,
  targetScore: 500,
  items: [
    {
      id: "p1",
      valueRepresentation: '"TypeScript 5.8"',
      valueExplanation: "Any sequence of UTF-16 characters surrounded by quotes is a string.",
      correctType: "string",
      distractorTypes: ["number", "boolean", "object"]
    },
    {
      id: "p2",
      valueRepresentation: "2026",
      valueExplanation: "Standard integers and floating-point values belong to the number type.",
      correctType: "number",
      distractorTypes: ["string", "bigint", "boolean"]
    },
    {
      id: "p3",
      valueRepresentation: "true",
      valueExplanation: "A binary logical truth condition is a boolean.",
      correctType: "boolean",
      distractorTypes: ["string", "number", "null"]
    },
    {
      id: "p4",
      valueRepresentation: "undefined",
      valueExplanation: "A variable that has been declared but not assigned has the primitive value undefined.",
      correctType: "undefined",
      distractorTypes: ["null", "void", "never"]
    },
    {
      id: "p5",
      valueRepresentation: "null",
      valueExplanation: "An intentional assignment denoting 'no object value'.",
      correctType: "null",
      distractorTypes: ["undefined", "object", "any"]
    }
  ]
};
