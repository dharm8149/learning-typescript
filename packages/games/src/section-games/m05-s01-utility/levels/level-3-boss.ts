import { BossPhase } from '@ts-learn/types';

export const bossLevelUtility: BossPhase = {
  bossName: "The Type Transformer",
  bossHealth: 100,
  timeLimitSeconds: 60,
  attackIntervalMs: 4000,
  challenges: [
    {
      prompt: "Build a type-safe API response type using utility types.",
      brokenCode: `// Original API response
interface ApiResponse {
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
  };
  status: number;
  message: string;
}

// Create a safe type for the frontend
// 1. Exclude password from data
// 2. Make status optional (for error responses)
type SafeApi = Omit<ApiResponse, 'data'> & {
  data?: Omit<ApiResponse['data'], 'password'>;
  status?: number;
};`,
      fixedCodeOptions: [
        "Omit<ApiResponse, 'data'> & { data?: Omit<ApiResponse['data'], 'password'>; status?: number }",
        "Partial<ApiResponse>",
        "Pick<ApiResponse, 'status' | 'message'>",
        "Required<ApiResponse>"
      ],
      correctIndex: 0,
      explanation: "Omit removes data, then we add back a safe version without password. Status becomes optional for error cases."
    },
    {
      prompt: "Build a Record-based object factory for a configuration system.",
      brokenCode: `// Environment types
type Environment = 'dev' | 'staging' | 'prod';

// Config types
interface DevConfig {
  debug: boolean;
  mockApi: boolean;
}

interface ProdConfig {
  debug: false;
  mockApi: false;
  cdn: string;
}

// Create a type-safe config map
type ConfigMap = Record<Environment, DevConfig | ProdConfig>;

// Usage
const configs: ConfigMap = {
  dev: { debug: true, mockApi: true },
  staging: { debug: false, mockApi: false },
  prod: { debug: false, mockApi: false, cdn: 'https://cdn.example.com' }
};

// What does ConfigMap expand to?`,
      fixedCodeOptions: [
        "{ dev: DevConfig; staging: DevConfig; prod: ProdConfig }",
        "{ [key: string]: any }",
        "{ dev?: DevConfig; staging?: DevConfig; prod?: ProdConfig }",
        "Record<string, DevConfig | ProdConfig>"
      ],
      correctIndex: 0,
      explanation: "Record<Environment, ...> creates exactly { dev: ...; staging: ...; prod: ... } with the specified value type."
    },
    {
      prompt: "Build a complex type by composing multiple utility types.",
      brokenCode: `interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

// Build a type that:
// 1. Excludes password (security)
// 2. Makes all properties optional (for flexible updates)
// 3. Pick only from remaining fields
type UserUpdate = Partial<Omit<User, 'password'>>;

// Build a type that:
// 1. Picks id, name, email
// 2. Makes them all required
type UserPublic = Required<Pick<User, 'id' | 'name' | 'email'>>;

// What are the final types?`,
      fixedCodeOptions: [
        "UserUpdate = { id?: string; name?: string; email?: string; age?: number; role?: 'admin' | 'user'; createdAt?: string; updatedAt?: string } | UserPublic = { id: string; name: string; email: string }",
        "UserUpdate = { password?: string }; UserPublic = { id: string }",
        "UserUpdate = Required<User>; UserPublic = Pick<User, 'id' | 'name' | 'email'>",
        "UserUpdate = Omit<User, 'password'>; UserPublic = User"
      ],
      correctIndex: 0,
      explanation: "Omit removes password first, then Partial makes all remaining fields optional. Pick selects 3 fields, then Required makes them all mandatory."
    }
  ]
};
