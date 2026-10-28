import { GameLevel } from '@ts-learn/types';

export const level2Medium: GameLevel = {
  levelNumber: 2,
  title: "Level 2: Generic Interfaces & Constraints",
  description: "Master generic interfaces and constraint patterns.",
  timeLimitSeconds: 40,
  targetScore: 750,
  items: [
    {
      id: "m1",
      valueRepresentation: "interface Box<T> {\n  value: T;\n}\nconst stringBox: Box<string> = { value: 'hi' };\n// What does Box<string> expand to?",
      valueExplanation: "T is replaced with string everywhere in the interface definition.",
      correctType: "{ value: string }",
      distractorTypes: ["{ value: any }", "{ value: T }", "{ value: unknown }"]
    },
    {
      id: "m2",
      valueRepresentation: "interface Logger {\n  log(message: string): void;\n}\n\nfunction createLogger<T extends Logger>(obj: T): T {\n  return obj;\n}\n// What does 'extends Logger' mean here?",
      valueExplanation: "The constraint means T must be a type that has at least all properties of Logger.",
      correctType: "T must have a 'log(message: string): void' method",
      distractorTypes: ["T extends the Logger class", "T must be a string", "T inherits from Logger"]
    },
    {
      id: "m3",
      valueRepresentation: "interface Cache<K, V> {\n  get(key: K): V | undefined;\n  set(key: K, value: V): void;\n}\n\nclass MapCache implements Cache<string, number> {\n  // What methods must this class implement?\n}",
      valueExplanation: "MapCache must implement get(key: string): number | undefined and set(key: string, value: number): void.",
      correctType: "get(key: string): number | undefined; set(key: string, value: number): void",
      distractorTypes: [
        "get(key: any): any; set(key: any, value: any)",
        "get(): number; set(value: number)",
        "No methods needed — generic is ignored"
      ]
    },
    {
      id: "m4",
      valueRepresentation: "function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n// What does 'K extends keyof T' mean?",
      valueExplanation: "K must be a key that actually exists on T. This prevents passing non-existent keys.",
      correctType: "K must be a property name that exists on object T",
      distractorTypes: ["K must extend object T", "K must be a string", "K is optional"]
    },
    {
      id: "m5",
      valueRepresentation: "type Result<T> = \n  | { ok: true; value: T }\n  | { ok: false; error: string };\n\nconst success: Result<number> = { ok: true, value: 42 };\nconst failure: Result<string> = { ok: false, error: 'fail' };\n// What's the benefit of Result<T> over Result?",
      valueExplanation: "Result<T> preserves type information about the success value. In Result<number>, value is specifically number.",
      correctType: "Type safety — value's type is preserved",
      distractorTypes: [
        "No benefit — same as non-generic",
        "Faster runtime performance",
        "Less code to write"
      ]
    }
  ]
};
