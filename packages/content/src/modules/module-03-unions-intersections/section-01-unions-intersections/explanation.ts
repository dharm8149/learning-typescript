export const unionsExplanation = {
  title: "Unions and Intersections — The Type Composition Toolkit",
  summary: "Union (|) and intersection (&) types let you compose complex type relationships. Unions mean 'one of these', intersections mean 'all of these'. Together they form the backbone of TypeScript's type system.",
  content: [
    {
      heading: "What Are Union Types?",
      body: "A union type represents a value that can be one of several types. Think of it as an OR relationship — the value is A or B or C, but never more than one at a time."
    },
    {
      heading: "What Are Intersection Types?",
      body: "An intersection type combines multiple types into one. It's an AND relationship — the value must satisfy ALL the types simultaneously."
    },
    {
      heading: "Discriminated Unions",
      body: "When union members share a common property with literal values, TypeScript can narrow the type automatically. This is the foundation of the algebraic data type pattern."
    }
  ]
};
