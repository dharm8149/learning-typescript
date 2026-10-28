export const utilityTypesExplanation = {
  title: "Utility Types — TypeScript's Built-in Type Transformers",
  summary: "TypeScript ships with a powerful set of utility types that transform other types. They're the secret weapon for avoiding repetitive type definitions and writing cleaner, more maintainable code.",
  sections: [
    {
      heading: "Why Utility Types Exist",
      content: `Without utility types, creating variations of existing types requires manual redefinition. Utility types like Partial, Pick, and Record automate these transformations, reducing boilerplate and preventing inconsistencies.

// Before utility types — manual redefinition
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// UserUpdate requires manually copying and marking optional
interface UserUpdate {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
}

// UserPublic requires manually selecting fields
interface UserPublic {
  id: string;
  name: string;
  email: string;
}

// With utility types — one line each
type UserUpdate = Partial<User>;
type UserPublic = Pick<User, 'id' | 'name' | 'email'>;`,
      codeSnippet: `// The six core utility types:

// 1. Partial<T> — make all properties optional
type UserPartial = Partial<User>;
// { id?: string; name?: string; email?: string; ... }

// 2. Required<T> — make all properties required
type UserRequired = Required<User>;

// 3. Pick<T, K> — select specific properties
type UserPublic = Pick<User, 'id' | 'name' | 'email'>;

// 4. Omit<T, K> — exclude specific properties
type UserSafe = Omit<User, 'password'>;

// 5. Record<K, V> — create object types with known keys
type UserMap = Record<string, User>;

// 6. Readonly<T> — make all properties read-only
type ReadonlyUser = Readonly<User>;`,
      tip: "Utility types compose beautifully. You can chain them: Partial<Required<Pick<User, 'id' | 'name'>>> creates a type where only id and name exist, both required, but optional."
    },
    {
      heading: "The Big Six in Detail",
      content: `Each utility type serves a specific transformation pattern. Understanding when to use each one is key to writing clean TypeScript.

**Partial<T>**: Makes all properties optional. Perfect for update forms, PATCH requests, and configuration objects where not every field is required.

**Required<T>**: Makes all properties required. The inverse of Partial — useful when you have an optional type and need to ensure all fields are present.

**Pick<T, K>**: Selects specific properties from a type. Use this for public-facing data, API responses, and DTOs where you want to expose only certain fields.

**Omit<T, K>**: Excludes specific properties from a type. The inverse of Pick — useful when you know what to remove but not what to keep.

**Record<K, V>**: Creates an object type with keys of type K and values of type V. Perfect for lookup tables, dictionaries, and mapping configurations.

**Readonly<T>**: Makes all properties read-only. Use this for configuration objects, API response models, and any type that should never be mutated after creation.`,
      codeSnippet: `interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

// Partial — update form
interface UserUpdateForm extends Partial<User> {
  // Only the fields the user filled in
}

// Pick — public API response
type UserApiResponse = Pick<User, 'id' | 'name' | 'email' | 'role'>;

// Omit — safe user (no password)
type SafeUser = Omit<User, 'password'>;

// Record — user lookup by ID
const usersById: Record<string, User> = {
  'abc123': { id: 'abc123', name: 'Alice', email: 'a@b.com', password: '...', role: 'admin' }
};

// Readonly — immutable configuration
const config: Readonly<{ debug: boolean; apiUrl: string }> = {
  debug: false,
  apiUrl: 'https://api.example.com'
};
// config.debug = true;  // ❌ Error: Cannot assign to 'debug'`,
      warning: "Utility types create new types — they don't modify the original. Partial<User> doesn't change the User interface; it creates a new type with all optional properties."
    },
    {
      heading: "Composing Utilities",
      content: `Utility types compose beautifully — you can chain them to create any transformation you need. This composability makes them incredibly powerful for API shape definitions.

// Complex transformation: only id and name, required, but optional
type OptionalUserName = Partial<Pick<User, 'id' | 'name'>>;
// { id?: string; name?: string }

// Create a readonly map of user IDs to partial users
type UserCache = Readonly<Record<string, Partial<User>>>;

// Extract all property names from a type
type UserKeys = keyof User;  // "id" | "name" | "email" | "password" | "role"

// Create a type that maps each property to its nullable version
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;
// { id: string | null; name: string | null; email: string | null; ... }`,
      codeSnippet: `// Real-world example: API response transformers
type ApiSuccess<T> = {
  success: true;
  data: T;
  timestamp: Date;
};

type ApiError = {
  success: false;
  error: string;
  code: number;
  timestamp: Date;
};

type ApiResult<T> = ApiSuccess<T> | ApiError;

// Usage
const result: ApiResult<User[]> = await fetch('/api/users');

if (result.success) {
  // TypeScript knows result.data is User[]
  result.data.forEach(user => console.log(user.name));
} else {
  // TypeScript knows result.error is string
  console.error(result.error);
}`,
      tip: "The key insight: utility types are composable building blocks. Start with your base type and apply transformations layer by layer. Each layer adds or removes a constraint — the final type is the composition of all layers.",
      warning: "Avoid over-composing utility types. If a type transformation requires more than 3 levels of nesting, consider defining a new named interface instead. Readability matters."
    }
  ]
};
