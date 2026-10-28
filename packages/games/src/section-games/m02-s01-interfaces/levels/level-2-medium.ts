import { GameLevel } from '@ts-learn/types';

export const level2Medium: GameLevel = {
  levelNumber: 2,
  title: "Level 2: Extension & Declaration Merging",
  description: "Master interface extension hierarchies and declaration merging patterns!",
  timeLimitSeconds: 40,
  targetScore: 750,
  items: [
    {
      id: "m1",
      valueRepresentation: "interface Base {\n  id: string;\n}\ninterface Extended extends Base {\n  name: string;\n}\nconst e: Extended = { id: '1' }; // Valid?",
      valueExplanation: "Extended extends Base, so it requires BOTH 'id' AND 'name'. Missing 'name'.",
      correctType: "error: Property 'name' is missing",
      distractorTypes: ["✅ valid — 'id' is inherited", "error: 'id' is not inherited", "warning only"]
    },
    {
      id: "m2",
      valueRepresentation: "interface A { x: number; }\ninterface B { y: string; }\ninterface C extends A, B {\n  z: boolean;\n}\nconst c: C = { x: 1, y: 'hi', z: true }; // Valid?",
      valueExplanation: "Multiple interface extension works — C requires all properties from A, B, and its own 'z'.",
      correctType: "✅ valid — all properties provided",
      distractorTypes: ["error: can't extend multiple", "error: 'y' is missing", "error: 'x' is missing"]
    },
    {
      id: "m3",
      valueRepresentation: "type ReadOnly<T> = {\n  readonly [K in keyof T]: T[K]\n};\ntype User = { name: string; age: number };\ntype SafeUser = ReadOnly<User>;",
      valueExplanation: "The mapped type 'ReadOnly<User>' makes all properties immutable.",
      correctType: "type SafeUser = { readonly name: string; readonly age: number }",
      distractorTypes: [
        "type SafeUser = { name: string; age: number }",
        "type SafeUser = { name?: string; age?: number }",
        "error: mapped type not allowed"
      ]
    },
    {
      id: "m4",
      valueRepresentation: "interface Config {\n  host: string;\n  port: number;\n}\ninterface Config {\n  debug: boolean;\n}\n// What does Config look like?",
      valueExplanation: "Interfaces merge — the final Config has host, port, AND debug.",
      correctType: "{ host: string; port: number; debug: boolean }",
      distractorTypes: [
        "error: duplicate identifier",
        "{ debug: boolean } (overwrites)",
        "{ host: string; port: number } (first wins)"
      ]
    },
    {
      id: "m5",
      valueRepresentation: "type HttpMethod = 'GET' | 'POST' | 'PUT';\n// Can you use 'extends' on this?",
      valueExplanation: "'extends' only works on interfaces or classes. Type aliases with union types use intersection '&' instead.",
      correctType: "No — use '&', not 'extends'",
      distractorTypes: [
        "Yes — 'HttpMethod extends string'",
        "Yes — 'extends HttpMethod'",
        "No — type aliases can't be combined"
      ]
    }
  ]
};
