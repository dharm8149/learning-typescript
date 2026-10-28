export const utilityTypesExplanation = {
  title: "Utility Types — TypeScript's Built-in Type Transformers",
  summary: "TypeScript ships with a powerful set of utility types that transform other types. They're the secret weapon for avoiding repetitive type definitions and writing cleaner, more maintainable code.",
  content: [
    {
      heading: "Why Utility Types Exist",
      body: "Without utility types, creating variations of existing types requires manual redefinition. Utility types like Partial, Pick, and Record automate these transformations, reducing boilerplate and preventing inconsistencies."
    },
    {
      heading: "The Big Six",
      body: "Partial<T> — make all properties optional. Required<T> — make all properties required. Pick<T, K> — select specific properties. Omit<T, K> — exclude specific properties. Record<K, V> — create object types with known keys. Readonly<T> — make all properties read-only."
    },
    {
      heading: "Composing Utilities",
      body: "Utility types compose beautifully: Partial<Required<Pick<User, 'id' | 'name'>>> creates a type where only id and name exist, both required, but optional. This composability makes them incredibly powerful for API shape definitions."
    }
  ]
};
