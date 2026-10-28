export const interfacesExplanation = {
  title: "Interfaces and Type Aliases — The Shape Language of TypeScript",
  summary: "Interfaces and type aliases let you name and reuse object shapes. Learn their differences, extension patterns, and declaration merging superpowers.",
  sections: [
    {
      heading: "1. Interfaces: The Object Blueprint",
      content: `Interfaces define the contract that objects must satisfy. They describe the shape of an object — which properties it has, what types they are, and whether they're optional.\n\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  role?: 'admin' | 'user';  // optional property\n}\n\n// TypeScript checks that objects match this shape:\nconst alice: User = {\n  id: 1,\n  name: "Alice",\n  email: "alice@example.com",\n  role: "admin"  // optional — can be omitted\n};\n\nconst bob = { id: 2, name: "Bob" };  // ❌ Error: missing 'email'\n\nThe key insight: interfaces are STRUCTURAL, not nominal. Two objects with the same shape are compatible, even if they come from different sources.`,
      codeSnippet: `interface User {\n  id: number;\n  name: string;\n  email: string;\n  role?: 'admin' | 'user';\n}\n\ninterface Admin extends User {\n  permissions: string[];\n}\n\nconst superAdmin: Admin = {\n  id: 1,\n  name: "Super",\n  email: "super@example.com",\n  role: "admin",\n  permissions: ["create", "delete", "manage"]\n};  // ✅ Extends User, adds permissions`,
      keyTakeaway: "Interfaces describe object shapes and can be extended with 'extends'. They are structural — any object matching the shape satisfies the interface."
    },
    {
      heading: "2. Type Aliases: The Versatile Alternative",
      content: `Type aliases create a NEW NAME for any type — not just objects. They work with primitives, unions, intersections, tuples, and of course, objects.\n\ntype UserId = number;                        // Primitive alias\ntype Status = 'pending' | 'active' | 'suspended';  // Union alias\ntype Point = [number, number];               // Tuple alias\ntype User = {                                // Object alias\n  id: number;\n  name: string;\n};\n\nThe critical difference: type aliases create a NAME, interfaces create a CONTRACT. Type aliases can be UNION types; interfaces cannot. Type aliases can use INTERSECTION types; interfaces use EXTENDS instead.`,
      codeSnippet: `// Type aliases for unions and intersections\ntype Result = { success: true; data: User } | { success: false; error: string };\ntype ReadOnlyUser = Readonly<User>;\n\n// With interfaces, you'd use 'extends' for similar patterns:\ninterface SuccessResult {\n  success: true;\n  data: User;\n}\ninterface FailureResult {\n  success: false;\n  error: string;\n}\n// Union of interfaces: SuccessResult | FailureResult`,
      keyTakeaway: "Type aliases are more versatile — they work with unions, intersections, mapped types, and conditional types. Interfaces are limited to object shapes."
    },
    {
      heading: "3. Interfaces vs Type Aliases: When to Use Which",
      content: `This is one of the most asked questions in the TypeScript community. Here's the practical rule:\n\nUSE INTERFACES when:\n- You're defining an object shape that others might extend\n- You want declaration merging (same name in different scopes)\n- You're defining a class contract (implements)\n- You're in a library that others will extend\n\nUSE TYPE ALIASES when:\n- You need union types: type Status = 'open' | 'closed'\n- You need intersection types: type Point = X & Y\n- You need mapped types: type Readonly<T> = { readonly [K in keyof T]: T[K] }\n- You need conditional types: type Flat<T> = T extends any[] ? T[number] : T\n- You need tuple types: type RGB = [number, number, number]\n\n// Interface with declaration merging (can't do with type aliases):\ninterface Config {\n  version: string;\n}\ninterface Config {\n  debug: boolean;\n}\n// Config now has BOTH version AND debug!\n\n// Type aliases cannot be merged — the second definition shadows the first.`,
      codeSnippet: `// ✅ Interface — declaration merging\ninterface AppConfig {\n  host: string;\n  port: number;\n}\ninterface AppConfig {\n  ssl: boolean;  // Merged! Not an error.\n}\n\n// ❌ Type alias — shadows\ntype AppConfig = { host: string; port: number };\ntype AppConfig = { ssl: boolean };  // Error: Duplicate identifier\n\n// ✅ Type alias — union type\ntype HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';\n\n// ❌ Interface — can't express unions\n// interface HttpMethod = ...  // Not possible!`,
      keyTakeaway: "When in doubt, start with an interface for object shapes. Switch to a type alias when you need unions, intersections, or mapped types."
    },
    {
      heading: "4. Interface Extension: Building Hierarchies",
      content: `Interfaces can EXTEND other interfaces, building type hierarchies — similar to class inheritance but for shapes.\n\ninterface BaseEntity {\n  id: string;\n  createdAt: Date;\n}\n\ninterface User extends BaseEntity {\n  name: string;\n  email: string;\n}\n\ninterface Admin extends User {\n  department: string;\n  clearanceLevel: number;\n}\n\nMultiple interfaces can extend a single base, creating a tree of shapes. This pattern is common in API responses where different endpoints return different subsets of data.\n\nYou can also extend MULTIPLE interfaces using intersection syntax (ampersand) for type aliases, or comma-separated extends for interfaces.`,
      codeSnippet: `interface HasId {\n  id: string;\n}\n\ninterface HasTimestamps {\n  createdAt: Date;\n  updatedAt: Date;\n}\n\n// Multiple extension (interface)\ninterface Entity extends HasId, HasTimestamps {\n  name: string;\n}\n\n// Multiple extension (type alias with intersection)\ntype EntityWithFlags = HasId & HasTimestamps & { flags: string[] };\n\n// Both Entity and EntityWithFlags have id, createdAt, updatedAt, name`,
      keyTakeaway: "Interfaces use 'extends' (single) or 'extends A, B' (multiple) for hierarchy. Type aliases use '&' (intersection) for the same effect. Choose based on whether you're in interface or type alias territory."
    }
  ],
  videoConfigId: "section-01-interfaces-aliases"
};
