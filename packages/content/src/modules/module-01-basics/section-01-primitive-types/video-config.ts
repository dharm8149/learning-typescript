import { VideoConfig } from '@ts-learn/types';

// 1. Prologue: The Real Developer Story (Why We Need TypeScript - Before Section Starts)
export const primitiveTypesIntroVideo: VideoConfig = {
  compositionId: 'IntroProblemExplainer',
  type: 'intro-problem',
  title: "Alex's 2 AM Outage: The True Story Behind Why TypeScript Exists",
  subtitle: "Follow Alex the developer as an innocent JavaScript mistake triggers a 2 AM production outage, and discover why static typing was invented to save us.",
  durationInSeconds: 36,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. 02:14 AM • Startup Office",
      subtitle: "Alex rushes to build the checkout service in vanilla JavaScript before the Black Friday deadline.",
      narrationScript: "It is 2 AM in the startup office. Alex is rushing to finish the new payment checkout in pure JavaScript before Black Friday launch tomorrow.",
      highlightLine: 3,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 8,
      title: "2. The Innocent Mistake ($NaN)",
      subtitle: "A form input passes '$49.99' as a string. JS multiplies it and charges customers $NaN!",
      narrationScript: "A customer checks out with two items. But the website form sends the price as a formatted string with a dollar sign: forty-nine ninety-nine. JavaScript attempts to multiply a string by two, and silently evaluates to NaN! In production, thirty-four hundred customer invoices explode with NaN dollars!",
      highlightLine: 6,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 18,
      title: "3. Why JavaScript Failed Alex",
      subtitle: "No compiler. No static analysis. Errors only explode when real users run the code in production.",
      narrationScript: "Why didn't JavaScript warn Alex? Because vanilla JavaScript has no compiler. It has no way to check types while you are coding. It blindly lets bad data through until real customers suffer.",
      highlightLine: 2,
      visualTag: "disaster"
    },
    {
      timeInSeconds: 26,
      title: "4. Enter TypeScript: The Compiler Shield",
      subtitle: "TypeScript wraps JavaScript with a static compiler shield, putting an instant red squiggle right at the cursor.",
      narrationScript: "This is why TypeScript was created. TypeScript wraps JavaScript with a static compiler shield. It catches Alex's mistake with an instant red squiggle right in the editor before saving. Alex fixes the type to number, the error clears, and Black Friday is saved!",
      highlightLine: 8,
      visualTag: "fix"
    }
  ]
};

// 2. Epilogue: The Triumph Story (Real-World Impact - After Section Ends)
export const primitiveTypesOutroVideo: VideoConfig = {
  compositionId: 'OutroMasteryExplainer',
  type: 'outro-mastery',
  title: "Next Morning: Black Friday Saved & Production Superpowers",
  subtitle: "See how Alex leverages the 7 primitives to deploy rock-solid code, achieve zero PagerDuty incidents, and build enterprise-grade software.",
  durationInSeconds: 15,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. The Next Morning • Confident Coding",
      subtitle: "With TypeScript primitives declared, the editor becomes an invincible co-pilot.",
      narrationScript: "The next morning, Alex sits down with TypeScript enabled. By declaring the seven primitive types, the editor becomes an invincible co-pilot with instant autocomplete.",
      highlightLine: 2,
      visualTag: "production"
    },
    {
      timeInSeconds: 5.0,
      title: "2. Enterprise Scale • Stripe & Airbnb",
      subtitle: "Billions in financial transactions run on these exact primitive type contracts.",
      narrationScript: "Companies like Stripe and Airbnb process billions of dollars using these exact primitive type contracts, guaranteeing that payment systems never suffer type coercion glitches.",
      highlightLine: 2,
      visualTag: "production"
    },
    {
      timeInSeconds: 10.0,
      title: "3. PR Approved • Zero 2 AM Alerts",
      subtitle: "100% tests green. All 142 compiler checks passed. Alex sleeps peacefully.",
      narrationScript: "Alex deploys the refactor. All automated checks pass with zero errors. 100% uptime on Black Friday, and not a single 2 AM alert. Superpower unlocked!",
      highlightLine: 3,
      visualTag: "production"
    }
  ]
};

// 3. Deep Explainer Video
export const primitiveTypesVideoConfig: VideoConfig = {
  compositionId: 'PrimitivesExplainer',
  type: 'explainer',
  title: 'Visualizing TypeScript Primitives & Static Checking',
  subtitle: 'Memory models, stack allocation, and type erasure mechanics.',
  durationInSeconds: 15,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. The JavaScript Runtime Problem",
      subtitle: "In vanilla JavaScript, types can silently mutate at runtime, causing bugs in production.",
      narrationScript: "In pure JavaScript, types mutate dynamically at runtime without warning, leaving calculations vulnerable to runtime failures.",
      highlightLine: 2
    },
    {
      timeInSeconds: 4,
      title: "2. TypeScript Static Guardrails",
      subtitle: "TypeScript attaches compile-time type contracts to variable allocations.",
      narrationScript: "TypeScript attaches compile-time type contracts to variables, catching invalid reassignments before your application runs.",
      highlightLine: 2
    },
    {
      timeInSeconds: 8,
      title: "3. Memory & Primitive Categories",
      subtitle: "Primitive values are stored directly on the execution stack and compared by value.",
      narrationScript: "Primitives are stored directly on the execution stack and compared by immutable value.",
      highlightLine: 3
    },
    {
      timeInSeconds: 12,
      title: "4. Zero Overhead: Type Erasure",
      subtitle: "Types vanish during the build process, leaving pure, optimized JavaScript.",
      narrationScript: "During compilation, all types vanish completely through type erasure, leaving clean, unbloated JavaScript.",
      highlightLine: 1
    }
  ]
};
