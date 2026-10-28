import { VideoConfig } from '@ts-learn/types';

// 1. Prologue: The Duplication Crisis (Why We Need Utility Types)
export const utilityTypesIntroVideo: VideoConfig = {
  compositionId: 'IntroUtilityStory',
  type: 'intro-problem',
  title: "The Type Factory — Transform Any Type Instantly",
  subtitle: "A developer maintains 20 manual type variations of a single interface — until utility types turn them into one factory call.",
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. 09:00 AM • Type Workshop",
      subtitle: "Twenty manual type definitions copy-pasted from a single User interface — each variation with minor tweaks.",
      narrationScript: "It is 9 AM. Twenty type definitions exist — UserCreate, UserUpdate, UserPublic, UserAdmin. Each is a copy-paste of the original User interface with minor tweaks. Twenty definitions, one source of truth.",
      highlightLine: 1,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 10,
      title: "2. The Maintenance Nightmare",
      subtitle: "Adding a field means updating 20 files. Someone always misses one. Bugs slip through silently.",
      narrationScript: "Adding a field means updating 20 files. Someone always misses one. Bugs slip through silently. The team spends hours on code reviews just checking that every variation was updated consistently.",
      highlightLine: 1,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 20,
      title: "3. Enter Utility Types: The Type Factory",
      subtitle: "Partial, Pick, Omit — utility types transform any type into any variation with a single function call.",
      narrationScript: "Utility types are the type factory. Partial makes all properties optional. Pick selects specific properties. Omit removes unwanted ones. One base type, one function call, one variation. Twenty types become one call.",
      highlightLine: 2,
      visualTag: "fix"
    },
    {
      timeInSeconds: 32,
      title: "4. Composing Utilities: Infinite Variations",
      subtitle: "Utility types compose together — creating complex type transformations from simple building blocks.",
      narrationScript: "Utility types compose beautifully. Partial of Pick of Record creates any variation you need. Simple building blocks combine into complex transformations. The possibilities are limited only by your imagination.",
      highlightLine: 2,
      visualTag: "production"
    }
  ]
};

// 2. Epilogue: The Transformation Superpower
export const utilityTypesOutroVideo: VideoConfig = {
  compositionId: 'OutroUtilityMastery',
  type: 'outro-mastery',
  title: "The Power of Composition — One Type Becomes Many",
  subtitle: "See how utility types compose to create complex type variations from a single base — zero boilerplate, full type safety.",
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. The Type Factory Works",
      subtitle: "Twenty manual definitions become five factory calls — all derived from one base type.",
      narrationScript: "Twenty manual type definitions become five factory calls. All derived from one base type. Add a field once, and every variation updates automatically. No more missed files.",
      highlightLine: 1,
      visualTag: "production"
    },
    {
      timeInSeconds: 15,
      title: "2. Composing Utilities: Complex from Simple",
      subtitle: "Partial of Required of Pick creates any variation — simple building blocks, infinite combinations.",
      narrationScript: "Partial of Required of Pick creates any variation you need. Simple building blocks combine into complex transformations. Every API shape, every DTO, every form model — defined once, transformed infinitely.",
      highlightLine: 1,
      visualTag: "production"
    },
    {
      timeInSeconds: 30,
      title: "3. PR Approved • Zero Boilerplate",
      subtitle: "One base type replaces 20 manual definitions. Code review time cut by 80%. Ship with confidence.",
      narrationScript: "One base type replaces 20 manual definitions. Code review time cut by 80 percent. Zero boilerplate. Full type safety. Superpower unlocked.",
      highlightLine: 1,
      visualTag: "production"
    }
  ]
};

// 3. Deep Explainer Video
export const utilityTypesVideoConfig: VideoConfig = {
  compositionId: 'UtilityExplainer',
  type: 'explainer',
  title: 'Utility Types — TypeScript Built-in Type Transformers',
  subtitle: 'Understanding Partial, Required, Pick, Omit, Record, and Readonly — the built-in type factory.',
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. Partial: Make Everything Optional",
      subtitle: "Partial<T> makes all properties of a type optional — perfect for update forms and PATCH requests.",
      narrationScript: "Partial makes all properties optional. A UserUpdate type where every field can be omitted. Perfect for update forms and PATCH API requests where not every field changes.",
      highlightLine: 1
    },
    {
      timeInSeconds: 8,
      title: "2. Pick: Select Specific Properties",
      subtitle: "Pick<T, K> creates a type with only the properties you specify — ideal for public-facing data.",
      narrationScript: "Pick selects specific properties. A UserPublic type with only id, name, and email. Exclude sensitive fields like password automatically. The compiler ensures no sensitive data leaks.",
      highlightLine: 1
    },
    {
      timeInSeconds: 16,
      title: "3. Omit: Exclude Unwanted Properties",
      subtitle: "Omit<T, K> removes specific properties — the inverse of Pick, perfect for excluding sensitive fields.",
      narrationScript: "Omit removes specific properties. The inverse of Pick. Exclude password from User, exclude metadata from API responses. When you know what to exclude but not what to keep, Omit is the tool.",
      highlightLine: 1
    },
    {
      timeInSeconds: 24,
      title: "4. Record: Create Object Type Mappings",
      subtitle: "Record<K, V> creates object types with known key types — perfect for lookup tables and dictionaries.",
      narrationScript: "Record creates object type mappings. Map string keys to User objects. Build lookup tables, dictionaries, and configuration objects where every key must be valid and every value has the right shape.",
      highlightLine: 1
    },
    {
      timeInSeconds: 32,
      title: "5. Readonly: Immutable Properties",
      subtitle: "Readonly<T> makes all properties read-only — perfect for configuration objects and API response models.",
      narrationScript: "Readonly makes all properties read-only. Configuration objects that should never change. API response models that are set once and never mutated. Immutability by type, enforced at compile time.",
      highlightLine: 1
    }
  ]
};
