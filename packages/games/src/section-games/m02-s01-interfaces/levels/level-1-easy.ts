import { GameLevel } from '@ts-learn/types';

export const level1Easy: GameLevel = {
  levelNumber: 1,
  title: "Level 1: Interface Basics",
  description: "Identify the correct interface shape and catch missing properties!",
  timeLimitSeconds: 45,
  targetScore: 500,
  items: [
    {
      id: "i1",
      valueRepresentation: "interface Point {\n  x: number;\n  y: number;\n}\nconst p: Point = { x: 10 }; // Error?",
      valueExplanation: "Missing 'y' property — TypeScript catches the missing field at compile time.",
      correctType: "error: Property 'y' is missing",
      distractorTypes: ["no error (x is enough)", "error: 'x' should be string", "warning only"]
    },
    {
      id: "i2",
      valueRepresentation: "interface Config {\n  host: string;\n  port?: number;\n}\nconst c: Config = { host: 'localhost' };",
      valueExplanation: "The 'port' property is optional (marked with '?'), so omitting it is valid.",
      correctType: "✅ valid — port is optional",
      distractorTypes: ["error: missing 'port'", "error: 'host' should be number", "error: empty object"]
    },
    {
      id: "i3",
      valueRepresentation: "interface User {\n  name: string;\n  email: string;\n}\ntype User = { name: string; age: number }; // Error?",
      valueExplanation: "Type aliases cannot be merged — this would be a duplicate identifier error.",
      correctType: "error: Duplicate identifier 'User'",
      distractorTypes: ["valid (type alias wins)", "valid (merged)", "no error (overwrites)"]
    },
    {
      id: "i4",
      valueRepresentation: "interface HasId {\n  id: string;\n}\ninterface HasId {\n  name: string;\n}",
      valueExplanation: "Interfaces CAN be merged (declaration merging) — the result has both 'id' and 'name'.",
      correctType: "✅ merged — has id AND name",
      distractorTypes: ["error: duplicate", "error: overwrites", "error: 'id' is lost"]
    },
    {
      id: "i5",
      valueRepresentation: "type Status = 'open' | 'closed';\ninterface Status { value: string; } // Error?",
      valueExplanation: "An interface cannot share a name with a type alias that is a union type — conflict.",
      correctType: "error: Cannot redeclare identifier 'Status'",
      distractorTypes: ["valid (merged)", "valid (interface wins)", "no error"]
    }
  ]
};
