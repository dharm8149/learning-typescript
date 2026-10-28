import { VideoConfig } from '@ts-learn/types';

// 1. Prologue: The Real Developer Story (Why We Need This Section)
export const typeAnnotationsIntroVideo: VideoConfig = {
  compositionId: 'IntroTypeAnnotations',
  type: 'intro-problem',
  title: "The Silent Bug That Slipped Through Code Review",
  subtitle: "A developer relied on inference everywhere — until a missing annotation turned a string into any and broke production.",
  durationInSeconds: 40,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. The Setup",
      subtitle: "A senior dev reviews a junior's code. Everything looks clean — variables are inferred, functions return values.",
      narrationScript: "In a fast-moving startup, a junior developer writes what appears to be clean, modern TypeScript. No explicit annotations anywhere — everything is inferred. The code review passes instantly.",
      highlightLine: 2,
      visualTag: 'disaster'
    },
    {
      timeInSeconds: 10,
      title: "2. The Hidden Bug",
      subtitle: "A function parameter declared without a type annotation silently accepts strings, numbers, and undefined.",
      narrationScript: "But here's the catch — a core function had parameters with no type annotations. Without explicit types, TypeScript defaulted to any, silently accepting anything: strings, numbers, undefined. No warnings, no errors.",
      highlightLine: 3,
      visualTag: 'disaster'
    },
    {
      timeInSeconds: 20,
      title: "3. Production Fires",
      subtitle: "Real users receive garbled data. A string meant for a name field ends up in a numeric ID field.",
      narrationScript: "In production, a user's name string gets fed into a numeric ID field. The math operation silently returns NaN. Hundreds of orders get the wrong tracking number. No one knew why.",
      highlightLine: 1,
      visualTag: 'disaster'
    },
    {
      timeInSeconds: 28,
      title: "4. The Fix",
      subtitle: "Explicit type annotations on all function parameters catch the bug immediately at compile time.",
      narrationScript: "The fix? Add explicit type annotations to every function parameter. TypeScript immediately flags the string-to-number mismatch. The bug is caught before it ever reaches production. Inference is powerful, but annotations are your safety net.",
      highlightLine: 5,
      visualTag: 'fix'
    },
    {
      timeInSeconds: 36,
      title: "5. The Lesson",
      subtitle: "Inference is great for variables, but parameters demand explicit annotations.",
      narrationScript: "The lesson: trust inference for local variables, but never trust it for function parameters. Annotations are not boilerplate — they're contracts.",
      highlightLine: 1,
      visualTag: 'fix'
    }
  ]
};

// 2. Epilogue: The Triumph Story (Real-World Impact)
export const typeAnnotationsOutroVideo: VideoConfig = {
  compositionId: 'OutroTypeAnnotations',
  type: 'outro-mastery',
  title: "Zero Warnings, Zero Bugs: The Annotation Philosophy",
  subtitle: "See how companies like Microsoft and Stripe balance inference and annotations for maximum safety and minimum verbosity.",
  durationInSeconds: 18,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. The Goldilocks Principle",
      subtitle: "Too many annotations = verbose. Too few = unsafe. The sweet spot: annotate the contract, infer the implementation.",
      narrationScript: "The industry gold standard is simple: annotate your public API — function parameters and return types. Inside the function body? Let inference handle it.",
      highlightLine: 2,
      visualTag: 'production'
    },
    {
      timeInSeconds: 7,
      title: "2. Microsoft's Own TypeScript",
      subtitle: "Even the TypeScript team uses this rule — the compiler's own source code annotates every public function parameter.",
      narrationScript: "Even the TypeScript compiler team follows this exact rule. Their own source code annotates every public function parameter with explicit types, while internal variables rely on inference.",
      highlightLine: 1,
      visualTag: 'production'
    },
    {
      timeInSeconds: 14,
      title: "3. Your New Rule",
      subtitle: "Parameters annotated, return types annotated, internals inferred. That's the pattern.",
      narrationScript: "Here's your new rule for life: function parameters and return types get annotations. Everything else gets inferred. You just cut your bug surface in half.",
      highlightLine: 1,
      visualTag: 'production'
    }
  ]
};

// 3. Deep Explainer Video
export const typeAnnotationsVideoConfig: VideoConfig = {
  compositionId: 'TypeAnnotationsExplainer',
  type: 'explainer',
  title: "Inference vs Annotations — The Decision Framework",
  subtitle: "A visual guide to when TypeScript infers and when you must annotate.",
  durationInSeconds: 18,
  fps: 30,
  width: 1280,
  height: 720,
  cues: [
    {
      timeInSeconds: 0,
      title: "1. Const Variables → Inference",
      subtitle: "const declarations with initial values are inferred automatically.",
      narrationScript: "When you declare a const with a value, TypeScript infers the type instantly. No annotation needed.",
      highlightLine: 2
    },
    {
      timeInSeconds: 5,
      title: "2. Function Parameters → Must Annotate",
      subtitle: "Parameters have no initial value — TypeScript cannot guess what you expect.",
      narrationScript: "Function parameters have no initial value attached. Without an annotation, TypeScript gives up and defaults to any — the worst possible type.",
      highlightLine: 1
    },
    {
      timeInSeconds: 10,
      title: "3. Return Types → Auto-Inferred",
      subtitle: "The return expression is analyzed and its type flows back to the function signature.",
      narrationScript: "Return types flow automatically from the expression. TypeScript traces the return value and assigns the inferred type to the function signature.",
      highlightLine: 2
    },
    {
      timeInSeconds: 15,
      title: "4. The Safety Net",
      subtitle: "Type annotations are compile-time contracts — they never affect runtime performance.",
      narrationScript: "Annotations are compile-time only. They vanish at runtime through type erasure. They add zero runtime cost while providing maximum safety during development.",
      highlightLine: 1
    }
  ]
};
