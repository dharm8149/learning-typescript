import { GameLevel } from '@ts-learn/types';

export const level2Medium: GameLevel = {
  levelNumber: 2,
  title: "Level 2: Conditional Types & Template Literals",
  description: "Master conditional types, infer, and template literal types.",
  timeLimitSeconds: 40,
  targetScore: 750,
  items: [
    {
      id: "m1",
      valueRepresentation: `type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>;
type B = IsArray<string>;

// What are A and B?`,
      valueExplanation: "T extends any[] ? true : false — if T is an array, result is true. string[] extends any[], so A = true. string does not, so B = false.",
      correctType: "A = true, B = false",
      distractorTypes: [
        "A = false, B = true",
        "A = true, B = true",
        "A = 'array', B = 'string'"
      ]
    },
    {
      id: "m2",
      valueRepresentation: `type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

type A = UnpackPromise<Promise<string>>;
type B = UnpackPromise<number>;

// What are A and B?`,
      valueExplanation: "infer U extracts the inner type. Promise<string> → U = string → A = string. number doesn't extend Promise → B = number.",
      correctType: "A = string, B = number",
      distractorTypes: [
        "A = Promise<string>, B = number",
        "A = string, B = Promise<number>",
        "A = any, B = any"
      ]
    },
    {
      id: "m3",
      valueRepresentation: `type CamelCase<S extends string> = 
  S extends `${infer First}-${infer Rest}`
    ? `${First}${Capitalize<Rest>}`
    : S;

type Result = CamelCase<'hello-world'>;
// What is Result?`,
      valueExplanation: "Template literal types match 'hello-world'. First = 'hello', Rest = 'world'. Capitalize<Rest> = 'World'. Result = 'helloWorld'.",
      correctType: "'helloWorld'",
      distractorTypes: [
        "'Hello-World'",
        "'hello_world'",
        "string"
      ]
    },
    {
      id: "m4",
      valueRepresentation: `type First<T extends any[]> = T extends [infer First, ...any[]] ? First : never;

type A = First<[1, 2, 3]>;
type B = First<[]>;

// What are A and B?`,
      valueExplanation: "[infer First, ...any[]] extracts the first element. [1, 2, 3] → First = 1 → A = 1. [] doesn't match → B = never.",
      correctType: "A = 1, B = never",
      distractorTypes: [
        "A = 1, B = undefined",
        "A = number, B = never",
        "A = [1, 2, 3], B = []"
      ]
    },
    {
      id: "m5",
      valueRepresentation: `type Events = 'click' | 'hover' | 'scroll';
type EventHandlers = &#123;
  [K in Events]: () => void;
&#125;;

// What does EventHandlers look like?`,
      valueExplanation: "Mapped type iterates over each Events member. Creates { click: () => void; hover: () => void; scroll: () => void }. This is keyof iteration.",
      correctType: "{ click: () => void; hover: () => void; scroll: () => void }",
      distractorTypes: [
        "{ [key: string]: () => void }",
        "() => void",
        "{ Events: () => void }"
      ]
    }
  ]
};
