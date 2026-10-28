import { VideoConfig } from '@ts-learn/types';

// 1. Prologue: The Type Collision (Why We Need Unions)
export const unionsIntroVideo: VideoConfig = {
  compositionId: 'IntroUnionStory',
  type: 'intro-problem',
  title: "The Many Faces of Data — Unions to the Rescue",
  subtitle: "A function must handle success, error, and loading states — and TypeScript needs a single type for all of them.",
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. 02:14 AM • The Type Conflict",
      subtitle: "A function receives a success response, an error object, or loading state — but TypeScript only accepts one type.",
      narrationScript: "It is 2 AM. A data fetching function receives a success response, an error object, or a loading state. TypeScript demands one type — but the data comes in three forms.",
      highlightLine: 1,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 12,
      title: "2. The Any Trap",
      subtitle: "The developer reaches for 'any' to silence the errors — losing all type safety in the process.",
      narrationScript: "The developer reaches for any. It silences the errors — but also silences autocomplete, prevents compile-time checks, and lets bugs through silently.",
      highlightLine: 1,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 24,
      title: "3. Enter Union Types: The Many Faces",
      subtitle: "Union types (|) let a value be one of several types — success or error or loading, all in one declaration.",
      narrationScript: "Union types solve this. The pipe symbol means OR. A value can be a success response OR an error OR loading — all in one type declaration. TypeScript tracks which types are possible at each point in the code.",
      highlightLine: 2,
      visualTag: "fix"
    },
    {
      timeInSeconds: 36,
      title: "4. Intersection Types: Combining Contracts",
      subtitle: "Intersection types (&) merge multiple shapes into one — combining what multiple types have in common.",
      narrationScript: "Intersection types merge multiple shapes into one. An entity that is both Identifiable and Timestamped has both contracts. The ampersand means AND — all contracts applied simultaneously.",
      highlightLine: 2,
      visualTag: "production"
    }
  ]
};

// 2. Epilogue: The Composition Superpower
export const unionsOutroVideo: VideoConfig = {
  compositionId: 'OutroUnionMastery',
  type: 'outro-mastery',
  title: "The Intersection of Power — Mastering Type Composition",
  subtitle: "See how union and intersection types combine to express any data relationship your application needs.",
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. Discriminated Unions Work",
      subtitle: "A shared property lets TypeScript narrow the type automatically — no manual checks needed.",
      narrationScript: "Discriminated unions let TypeScript narrow types automatically. A shared property — the discriminant — tells TypeScript which variant you are working with at each branch.",
      highlightLine: 1,
      visualTag: "production"
    },
    {
      timeInSeconds: 15,
      title: "2. Intersection: Merging Contracts",
      subtitle: "Multiple type contracts merge into one — an entity that is both Identifiable and Timestamped.",
      narrationScript: "Intersection types merge contracts. An entity that is both Identifiable and Timestamped carries both contracts. One type, multiple responsibilities.",
      highlightLine: 1,
      visualTag: "production"
    },
    {
      timeInSeconds: 30,
      title: "3. PR Approved • Zero Type Conflicts",
      subtitle: "All data shapes expressed precisely. No any. No runtime surprises. Ship with confidence.",
      narrationScript: "Every data shape is expressed precisely with union and intersection types. No any. No runtime surprises. Zero type conflicts. Superpower unlocked.",
      highlightLine: 1,
      visualTag: "production"
    }
  ]
};

// 3. Deep Explainer Video
export const unionsVideoConfig: VideoConfig = {
  compositionId: 'UnionExplainer',
  type: 'explainer',
  title: 'Union and Intersection Types — The Composition Toolkit',
  subtitle: 'Understanding how | and & compose types to express any data relationship in TypeScript.',
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. Union Types: The OR Operator",
      subtitle: "The pipe symbol | means a value can be one of several types.",
      narrationScript: "Union types use the pipe symbol. A value can be a string OR a number OR a boolean. TypeScript narrows the type as you add conditions, knowing exactly which types are possible at each point.",
      highlightLine: 1
    },
    {
      timeInSeconds: 10,
      title: "2. Intersection Types: The AND Operator",
      subtitle: "The ampersand & merges multiple type contracts into one.",
      narrationScript: "Intersection types use the ampersand. An entity that is both Identifiable and Timestamped has both sets of properties. All contracts apply simultaneously — the result is a superset of each.",
      highlightLine: 1
    },
    {
      timeInSeconds: 20,
      title: "3. Discriminated Unions: The Narrowing Superpower",
      subtitle: "A shared literal property lets TypeScript automatically narrow which variant you are working with.",
      narrationScript: "Discriminated unions use a shared property with literal values. When you check that property, TypeScript narrows the entire type. The switch statement becomes exhaustive — missing cases are compile-time errors.",
      highlightLine: 1
    },
    {
      timeInSeconds: 30,
      title: "4. Composing Unions and Intersections",
      subtitle: "Union and intersection types compose together to express complex type relationships.",
      narrationScript: "Union and intersection types compose together. A Result is either Success with data OR Failure with an error. An AdminUser intersects User with Admin permissions. The combinations are limitless.",
      highlightLine: 1
    }
  ]
};
