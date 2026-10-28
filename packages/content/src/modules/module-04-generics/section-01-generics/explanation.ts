export const genericsExplanation = {
  title: "Generics — Write Code Once, Use With Any Type",
  summary: "Generics let you write flexible functions, interfaces, and classes that work with any type while preserving type information. They're the secret behind TypeScript's utility types, React's hooks, and every production library.",
  content: [
    {
      heading: "The Problem: Duplicate Code",
      body: "Without generics, you either use 'any' (losing type safety) or write duplicate functions for each type. Generics solve this by creating a placeholder type that gets filled in at usage time."
    },
    {
      heading: "The Solution: Type Parameters",
      body: "A type parameter (like <T>) is a placeholder. When you call the function with a specific type, TypeScript fills in the placeholder and ensures type safety throughout."
    },
    {
      heading: "Where Generics Shine",
      body: "API wrappers (fetch<T>), React components (useState<T>), utility types (Record<K, V>), data structures (Array<T>), and containers (Maybe<T>). If code needs to handle multiple types uniformly — it needs generics."
    }
  ]
};
