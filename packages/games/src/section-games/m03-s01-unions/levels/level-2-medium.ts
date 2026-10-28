import { GameLevel } from '@ts-learn/types';

export const level2Medium: GameLevel = {
  levelNumber: 2,
  title: "Level 2: Intersection Types",
  description: "Master intersection types and understand how they combine multiple types into one.",
  timeLimitSeconds: 40,
  targetScore: 750,
  items: [
    {
      id: "m1",
      valueRepresentation: "interface A { x: number; }\ninterface B { y: string; }\ntype AB = A & B;\nconst ab: AB = { x: 1, y: 'hi' }; // Valid?",
      valueExplanation: "Intersection A & B requires ALL properties from both A AND B. The object has both x and y.",
      correctType: "✅ valid — has all required properties",
      distractorTypes: ["error: can't intersect interfaces", "error: 'x' conflicts with 'y'", "error: intersection creates 'never'"]
    },
    {
      id: "m2",
      valueRepresentation: "interface A { kind: 'a'; x: number; }\ninterface B { kind: 'b'; y: string; }\ntype AB = A & B;\nconst ab: AB = ???;\n// What does AB look like?",
      valueExplanation: "kind must be both 'a' AND 'b' simultaneously — impossible. So kind becomes 'never'.",
      correctType: "{ kind: never; x: number; y: string }",
      distractorTypes: [
        "{ kind: 'a' | 'b'; x: number; y: string }",
        "error: can't intersect different kinds",
        "{ x: number; y: string } (kind drops out)"
      ]
    },
    {
      id: "m3",
      valueRepresentation: "function merge<A, B>(a: A, b: B): A & B {\n  return { ...a, ...b };\n}\nconst m = merge({ x: 1 }, { y: 'hi' });\n// What is m's type?",
      valueExplanation: "The return type is the intersection of the two input types, combining all properties.",
      correctType: "{ x: number; y: string }",
      distractorTypes: [
        "{ x: number }",
        "{ y: string }",
        "error: can't merge different types"
      ]
    },
    {
      id: "m4",
      valueRepresentation: "type Boolean = boolean;\ntype StringOrNumber = string | number;\ntype Both = Boolean & StringOrNumber;\n// What does Both become?",
      valueExplanation: "boolean is true | false. Intersection with string | number creates a type with NO possible values.",
      correctType: "never — no value can be both boolean and string/number",
      distractorTypes: [
        "boolean | string | number",
        "boolean",
        "true | false | string | number"
      ]
    },
    {
      id: "m5",
      valueRepresentation: "interface HasId { id: string; }\ninterface Timestamped { createdAt: Date; }\ninterface Named { name: string; }\ntype FullEntity = HasId & Timestamped & Named;\nconst e: FullEntity = ???;\n// What properties does FullEntity need?",
      valueExplanation: "FullEntity is the intersection of all three interfaces — it needs ALL properties from each.",
      correctType: "{ id: string; createdAt: Date; name: string }",
      distractorTypes: [
        "{ id: string } (first wins)",
        "{ name: string } (last wins)",
        "{ id: string; name: string } (drops Date)"
      ]
    }
  ]
};
