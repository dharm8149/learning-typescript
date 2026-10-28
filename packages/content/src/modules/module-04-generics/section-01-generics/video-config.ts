import { VideoConfig } from '@ts-learn/types';

// 1. Prologue: The Duplication Crisis (Why We Need Generics)
export const genericsIntroVideo: VideoConfig = {
  compositionId: 'IntroGenericsStory',
  type: 'intro-problem',
  title: "The Box Pattern — A Container for Any Type",
  subtitle: "A developer writes the same function five times for five different types — until generics make one function handle all of them.",
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. 02:14 AM • The Duplication Crisis",
      subtitle: "Five functions do the same thing for five types — string, number, User, Order, Product. Copy-paste code at its finest.",
      narrationScript: "It is 2 AM. A developer writes the same function five times — once for strings, once for numbers, once for Users, Orders, and Products. Every function does the same wrapping and unwrapping. Copy paste. Repeat.",
      highlightLine: 1,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 12,
      title: "2. The Any Trap",
      subtitle: "The developer reaches for 'any' to avoid duplication — losing all type safety in the process.",
      narrationScript: "The developer reaches for any. It eliminates duplication — but also eliminates type safety. Every call site becomes a guess. Autocomplete disappears. Bugs arrive uninvited.",
      highlightLine: 1,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 24,
      title: "3. Enter Generics: The Box Pattern",
      subtitle: "Generics use a type parameter <T> to create a container that preserves type information across any type.",
      narrationScript: "Generics solve this. A type parameter T is a placeholder. When you call the function with a User, TypeScript fills in User for T. When you call it with a number, TypeScript fills in number. One function preserves type safety for every type.",
      highlightLine: 2,
      visualTag: "fix"
    },
    {
      timeInSeconds: 36,
      title: "4. The Ecosystem Relies on Generics",
      subtitle: "React hooks, fetch APIs, Array methods — generics power the entire TypeScript ecosystem.",
      narrationScript: "Generics power everything. React hooks use generics to track state types. Fetch APIs use generics to type responses. Array methods use generics for typed transformations. If TypeScript code handles multiple types — it likely uses generics.",
      highlightLine: 2,
      visualTag: "production"
    }
  ]
};

// 2. Epilogue: The Abstraction Superpower
export const genericsOutroVideo: VideoConfig = {
  compositionId: 'OutroGenericsMastery',
  type: 'outro-mastery',
  title: "The Generic Revolution — Code That Adapts",
  subtitle: "See how generics enable reusable, type-safe code that works with any type while preserving full type information.",
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. One Function, Any Type",
      subtitle: "A single generic function replaces five duplicate implementations — all with full type safety.",
      narrationScript: "One generic function replaces five duplicate implementations. The type parameter preserves type information throughout — from input to output. Zero type safety lost.",
      highlightLine: 1,
      visualTag: "production"
    },
    {
      timeInSeconds: 15,
      title: "2. The Ecosystem Pattern",
      subtitle: "React hooks, fetch APIs, utility types — generics are everywhere because they solve a universal problem.",
      narrationScript: "React hooks use generics. Fetch APIs use generics. Every utility type uses generics. Every data structure uses generics. Generics are the foundation of type-safe code reuse.",
      highlightLine: 1,
      visualTag: "production"
    },
    {
      timeInSeconds: 30,
      title: "3. PR Approved • Zero Duplication",
      subtitle: "Five functions became one. Code reviewed faster. Bugs prevented by the compiler. Ship with confidence.",
      narrationScript: "Five functions became one. Code reviewed faster. Bugs prevented by the compiler. Zero duplication. Zero type safety lost. Superpower unlocked.",
      highlightLine: 1,
      visualTag: "production"
    }
  ]
};

// 3. Deep Explainer Video
export const genericsVideoConfig: VideoConfig = {
  compositionId: 'GenericExplainer',
  type: 'explainer',
  title: 'Generics — Write Code Once, Use With Any Type',
  subtitle: 'Understanding type parameters, constraints, and how generics enable reusable type-safe code.',
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. The Type Parameter: <T>",
      subtitle: "A type parameter is a placeholder that gets filled in when the function is called.",
      narrationScript: "A type parameter T is a placeholder. When you call the function with a string, T becomes string. When you call it with a number, T becomes number. The placeholder fills in at each call site.",
      highlightLine: 1
    },
    {
      timeInSeconds: 10,
      title: "2. Generic Interfaces: Typed Containers",
      subtitle: "Interfaces with type parameters create typed containers — arrays, options, results that track their contents.",
      narrationScript: "Generic interfaces create typed containers. An Array of strings knows it holds strings. A Result type knows whether it wraps success data or error information. The container tracks its contents.",
      highlightLine: 1
    },
    {
      timeInSeconds: 20,
      title: "3. Constraints: Restricting the Placeholder",
      subtitle: "Constraints use extends to limit what types can fill a type parameter.",
      narrationScript: "Constraints limit what types fill a placeholder. A type parameter extends an interface means only objects with those properties can fill it. This combines flexibility with safety.",
      highlightLine: 1
    },
    {
      timeInSeconds: 30,
      title: "4. Multiple Type Parameters: <K, V>",
      subtitle: "Multiple type parameters let you express relationships between different types.",
      narrationScript: "Multiple type parameters express relationships between types. A Map with key type K and value type V ensures every key has the right kind of value. Two placeholders, one consistent type.",
      highlightLine: 1
    }
  ]
};
