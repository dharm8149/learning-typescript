export const advancedTypesExplanation = {
  title: "Advanced Types — TypeScript's Most Powerful Features",
  summary: "TypeScript's advanced type system includes type guards, conditional types, template literal types, and discriminated unions. These features let you express any type relationship your application needs, from API response validation to exhaustive switch statements.",
  content: [
    {
      heading: "Type Narrowing & Guards",
      body: "TypeScript narrows types through control flow. Type guards are functions or expressions that use 'is' predicates to tell TypeScript more about a type at runtime. They're the bridge between runtime checks and compile-time type safety."
    },
    {
      heading: "Conditional Types & Infer",
      body: "Conditional types (T extends U ? X : Y) let you create types that depend on other types. Combined with 'infer', you can extract types from complex structures — like extracting the return type of a function or the inner type of a Promise."
    },
    {
      heading: "Discriminated Unions",
      body: "Discriminated unions use a common property (the discriminant) to distinguish between different shapes. Combined with exhaustive checking (using 'never'), they catch missing cases at compile time — a production-ready pattern for event handlers and reducers."
    }
  ]
};
