import { VideoConfig } from '@ts-learn/types';

// 1. Prologue: The Type Detective (Why We Need Advanced Types)
export const advancedTypesIntroVideo: VideoConfig = {
  compositionId: 'IntroAdvancedStory',
  type: 'intro-problem',
  title: "The Type Detective — Narrowing Down to the Truth",
  subtitle: "A function receives unknown data and must determine its shape at runtime — but TypeScript already knows.",
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. 02:14 AM • The Unknown Data",
      subtitle: "An API returns unpredictable data — sometimes a User, sometimes an error, sometimes null. Nobody knows the shape.",
      narrationScript: "It is 2 AM. An API returns unpredictable data. Sometimes a User object, sometimes an error, sometimes null. The developer writes runtime checks everywhere — typeof, instanceof, === null. The code is fragile and error-prone.",
      highlightLine: 1,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 12,
      title: "2. The Exhaustive Check Problem",
      subtitle: "Adding a new case to a switch statement — and missing it in one handler causes silent bugs.",
      narrationScript: "A switch statement handles different data shapes. A new variant is added to the API, but one handler is not updated. The bug is silent — no error thrown, just wrong behavior. Exhaustive checking is the solution TypeScript provides.",
      highlightLine: 1,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 24,
      title: "3. Enter Type Guards: The Narrowing Superpower",
      subtitle: "Type guards use 'is' predicates to tell TypeScript exactly what type a value is at each point in the code.",
      narrationScript: "Type guards tell TypeScript what type a value is. An 'is' predicate function — 'is User' — narrows the type automatically. No more typeof checks everywhere. The compiler tracks the type through every branch.",
      highlightLine: 2,
      visualTag: "fix"
    },
    {
      timeInSeconds: 36,
      title: "4. Conditional Types: Types That Think",
      subtitle: "Conditional types let you create types that depend on other types — like extracting the return type of a function.",
      narrationScript: "Conditional types let you create types that depend on other types. Extract the return type of a function. Get the inner type of a Promise. Types that think about types. The power is unlimited.",
      highlightLine: 2,
      visualTag: "production"
    }
  ]
};

// 2. Epilogue: The Type Master Superpower
export const advancedTypesOutroVideo: VideoConfig = {
  compositionId: 'OutroAdvancedMastery',
  type: 'outro-mastery',
  title: "The Type Master — Conditional Types & Beyond",
  subtitle: "See how conditional types, template literals, and discriminated unions express any type relationship your application needs.",
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. Discriminated Unions Work",
      subtitle: "A shared property lets TypeScript narrow types automatically across every branch of your code.",
      narrationScript: "Discriminated unions with a shared property let TypeScript narrow types automatically across every branch. Missing a case is a compile-time error. Exhaustive checking catches everything.",
      highlightLine: 1,
      visualTag: "production"
    },
    {
      timeInSeconds: 15,
      title: "2. Conditional Types: Types That Think",
      subtitle: "T extends U ? X : Y creates types that depend on other types — extracting and transforming as needed.",
      narrationScript: "Conditional types create types that depend on other types. Extract the return type of any function. Get the inner type of a Promise. Types that think about types — transforming and extracting as needed.",
      highlightLine: 1,
      visualTag: "production"
    },
    {
      timeInSeconds: 30,
      title: "3. PR Approved • Exhaustive Checking",
      subtitle: "Every data shape handled. Every case covered. Zero runtime type surprises. Ship with confidence.",
      narrationScript: "Every data shape is handled. Every case is covered by exhaustive checking. Zero runtime type surprises. Zero 2 AM calls. Superpower unlocked.",
      highlightLine: 1,
      visualTag: "production"
    }
  ]
};

// 3. Deep Explainer Video
export const advancedTypesVideoConfig: VideoConfig = {
  compositionId: 'AdvancedExplainer',
  type: 'explainer',
  title: 'Advanced Types — TypeScript Most Powerful Features',
  subtitle: 'Understanding type guards, conditional types, template literal types, and discriminated unions.',
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. Type Guards: Narrowing with 'is'",
      subtitle: "The 'is' predicate tells TypeScript exactly what type a value is — enabling full autocomplete and type safety in the narrowed branch.",
      narrationScript: "The is predicate tells TypeScript exactly what type a value is. In the narrowed branch, you get full autocomplete and type safety. No more type assertions. No more runtime checks.",
      highlightLine: 1
    },
    {
      timeInSeconds: 10,
      title: "2. Discriminated Unions: The Exhaustive Pattern",
      subtitle: "A shared literal property enables automatic narrowing and exhaustive switch checking.",
      narrationScript: "A shared literal property enables automatic narrowing. Check the discriminant and TypeScript narrows the entire type. Add 'never' to the default case — TypeScript catches every missing variant at compile time.",
      highlightLine: 1
    },
    {
      timeInSeconds: 20,
      title: "3. Conditional Types: T extends U",
      subtitle: "Conditional types express types that depend on other types — the foundation of utility types.",
      narrationScript: "Conditional types express types that depend on other types. T extends U ? X : Y means if T extends U, the result is X, otherwise Y. This is how Partial, Pick, and Record are implemented.",
      highlightLine: 1
    },
    {
      timeInSeconds: 30,
      title: "4. The Infer Keyword: Extracting Types",
      subtitle: "Infer lets you extract types from complex structures — like the return type of a function or the value of a Promise.",
      narrationScript: "Infer extracts types from complex structures. Extract the return type of any function. Get the value inside a Promise. Combine infer with conditional types and you have type-level programming.",
      highlightLine: 1
    }
  ]
};
