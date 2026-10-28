import { VideoConfig } from '@ts-learn/types';

// 1. Prologue: The Shape Crisis (Why We Need Interfaces)
export const interfacesIntroVideo: VideoConfig = {
  compositionId: 'IntroInterfaceStory',
  type: 'intro-problem',
  title: "The Interface Revolution — From Chaos to Structure",
  subtitle: "A team drowning in inconsistent object shapes discovers interfaces — the contract language that turns chaos into clarity.",
  durationInSeconds: 40,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. 02:14 AM • The Shape Crisis",
      subtitle: "A junior developer passes an object with missing fields — and nobody notices until production explodes.",
      narrationScript: "It is 2 AM. A junior developer passes an object with missing fields to a payment function. No compiler catches it. No IDE warns them. They ship broken data to production.",
      highlightLine: 1,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 10,
      title: "2. The Invisible Contract",
      subtitle: "JavaScript lets anything through — objects, strings, undefined. The contract is invisible, unwritten, and easily broken.",
      narrationScript: "JavaScript has no concept of a shape contract. You can pass an object, a string, or undefined — and the function will happily accept it until it crashes at runtime.",
      highlightLine: 1,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 20,
      title: "3. Enter Interfaces: The Shape Language",
      subtitle: "Interfaces declare the exact shape an object must have — turning invisible contracts into visible compiler guarantees.",
      narrationScript: "Interfaces solve this problem. An interface declares the exact shape an object must have. TypeScript checks every object against that shape at compile time — before it ever reaches production.",
      highlightLine: 2,
      visualTag: "fix"
    },
    {
      timeInSeconds: 30,
      title: "4. Type Aliases: The Versatile Alternative",
      subtitle: "Type aliases create names for any type — primitives, unions, intersections — not just object shapes.",
      narrationScript: "Type aliases offer another approach. They name any type — primitives, unions, intersections — not just objects. While interfaces describe contracts, type aliases create names for flexibility.",
      highlightLine: 2,
      visualTag: "production"
    }
  ]
};

// 2. Epilogue: The Structure Superpower
export const interfacesOutroVideo: VideoConfig = {
  compositionId: 'OutroInterfaceMastery',
  type: 'outro-mastery',
  title: "Interfaces Mastered — Building Type Hierarchies at Scale",
  subtitle: "See how interfaces scale from simple object shapes to complex enterprise type systems with declaration merging and extension.",
  durationInSeconds: 18,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. The Shape Language Works",
      subtitle: "With interfaces declared, the editor catches every missing field before deployment.",
      narrationScript: "With interfaces declared, the editor catches every missing field before deployment. No more 2 AM outages from shape mismatches.",
      highlightLine: 1,
      visualTag: "production"
    },
    {
      timeInSeconds: 6,
      title: "2. Enterprise Scale • Interfaces Extend",
      subtitle: "Interfaces build hierarchies — User extends BaseEntity, Admin extends User. One contract, many layers.",
      narrationScript: "Interfaces scale to enterprise. User extends BaseEntity, Admin extends User. Each layer inherits contracts from its parent — clean, composable, type-safe.",
      highlightLine: 1,
      visualTag: "production"
    },
    {
      timeInSeconds: 12,
      title: "3. PR Approved • Zero Shape Bugs",
      subtitle: "All objects validated against their contracts. Zero runtime shape errors. Ship with confidence.",
      narrationScript: "Every object is validated against its interface contract before it ships. Zero runtime shape errors. Zero 2 AM calls. Superpower unlocked.",
      highlightLine: 1,
      visualTag: "production"
    }
  ]
};

// 3. Deep Explainer Video
export const interfacesVideoConfig: VideoConfig = {
  compositionId: 'InterfaceExplainer',
  type: 'explainer',
  title: 'Interfaces vs Type Aliases — The Shape Language Deep Dive',
  subtitle: 'Understanding the difference between interfaces and type aliases, extension patterns, and declaration merging.',
  durationInSeconds: 45,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. Interface: The Object Contract",
      subtitle: "Interfaces define the exact shape an object must have — properties, types, and optionality.",
      narrationScript: "An interface defines the exact shape an object must have. Every property, every type, every optional flag — declared once, checked everywhere.",
      highlightLine: 1
    },
    {
      timeInSeconds: 8,
      title: "2. Type Alias: The Name Maker",
      subtitle: "Type aliases name any type — primitives, unions, intersections — giving meaning to complex types.",
      narrationScript: "Type aliases name any type. Primitives become UserId. Unions become Status. Intersections become Point3D. Where interfaces create contracts, type aliases create names.",
      highlightLine: 1
    },
    {
      timeInSeconds: 16,
      title: "3. Interface Extension: Building Hierarchies",
      subtitle: "Interfaces extend other interfaces, building type hierarchies — the foundation of enterprise type systems.",
      narrationScript: "Interfaces extend other interfaces. Admin extends User extends BaseEntity. Each layer inherits the full contract — clean, composable, type-safe at every level.",
      highlightLine: 1
    },
    {
      timeInSeconds: 24,
      title: "4. Declaration Merging: The Interface Superpower",
      subtitle: "TypeScript merges multiple interface declarations with the same name — a pattern impossible with type aliases.",
      narrationScript: "TypeScript merges multiple interface declarations with the same name. Add properties across files without conflicts. Type aliases cannot do this — interfaces are unique in their ability to merge.",
      highlightLine: 1
    },
    {
      timeInSeconds: 32,
      title: "5. When to Use Which: The Practical Rule",
      subtitle: "Use interfaces for object shapes. Use type aliases for unions, intersections, and mapped types.",
      narrationScript: "When in doubt, start with interfaces for object shapes. Switch to type aliases when you need unions, intersections, or mapped types. This practical rule handles 95% of real-world cases.",
      highlightLine: 1
    }
  ]
};
