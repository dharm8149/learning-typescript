import { GameLevel } from '@ts-learn/types';

export const level1Easy: GameLevel = {
  levelNumber: 1,
  title: "Level 1: Partial and Required",
  description: "Learn to make all properties optional or required with Partial and Required.",
  timeLimitSeconds: 35,
  targetScore: 600,
  items: [
    {
      id: "m1",
      valueRepresentation: `interface User {
  id: string;
  name: string;
  email: string;
}

type UpdateUser = Partial<User>;
// What properties does UpdateUser have?`,
      valueExplanation: "Partial<User> makes ALL properties optional. So UpdateUser has id?, name?, email? — all optional.",
      correctType: "{ id?: string; name?: string; email?: string }",
      distractorTypes: ["{ id: string; name: string; email: string }", "{ id?: string; name?: string }", "Partial is not valid"]
    },
    {
      id: "m2",
      valueRepresentation: `interface Config {
  host: string;
  port: number;
  debug?: boolean;
}

type StrictConfig = Required<Config>;
// What changes?`,
      valueExplanation: "Required<Config> makes ALL properties required. The optional debug becomes required.",
      correctType: "{ host: string; port: number; debug: boolean }",
      distractorTypes: [
        "{ host: string; port: number; debug?: boolean }",
        "{ host?: string; port?: number; debug?: boolean }",
        "{ host: string; port: number }"
      ]
    },
    {
      id: "m3",
      valueRepresentation: `interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

type ProductCreate = Partial<Product>;
type ProductUpdate = Partial<Product>;

// Can you create a partial product with just id and name?
const partial: ProductCreate = {
  id: 'p1',
  name: 'Widget'
};
// Is this valid?`,
      valueExplanation: "Yes! Partial<Product> makes ALL properties optional, so you can provide any subset including just 2 properties.",
      correctType: "✅ valid — only id and name provided, others are optional",
      distractorTypes: [
        "❌ error — all properties required",
        "❌ error — must provide at least 3 properties",
        "⚠️ warning only"
      ]
    },
    {
      id: "m4",
      valueRepresentation: `interface Config {
  host: string;
  port: number;
  timeout?: number;
}

// Default config
const defaults: Required<Config> = {
  host: 'localhost',
  port: 3000
  // timeout missing — valid?
};`,
      valueExplanation: "No! Required<Config> makes ALL properties required, including timeout. Without it, you get a compile error.",
      correctType: "error: Property 'timeout' is missing in type 'Required<Config>'",
      distractorTypes: [
        "✅ valid — timeout has a default of undefined",
        "⚠️ warning only",
        "error: host and port are required"
      ]
    },
    {
      id: "m5",
      valueRepresentation: `interface User {
  id: string;
  name: string;
  age: number;
}

// Make all properties optional for a form
type FormUser = Partial<User>;
// Make all properties required for storage
type StoredUser = Required<User>;

// Which has age as optional?
const form: FormUser = { name: 'Alice' };`,
      valueExplanation: "FormUser = Partial<User> makes age optional. StoredUser = Required<User> makes age required. The form only provides name.",
      correctType: "FormUser — age is optional",
      distractorTypes: [
        "StoredUser — age is optional",
        "Both have age optional",
        "Neither — age is required in both"
      ]
    }
  ]
};
