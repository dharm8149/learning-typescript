# TypeScript Interactive Learning Platform — Project Architecture & File Structure

This document outlines the proposed production-grade architecture and file structure for the **TypeScript Interactive Learning Platform**, powered by **Vite**, **Express**, **Remotion** (programmatic video animations), and **Interactive Mini-Games**.

---

## 1. High-Level Architecture Overview

```
                                  ┌───────────────────────────────┐
                                  │      Client (Vite + React)    │
                                  │  - Module/Section Navigation  │
                                  │  - In-Depth MDX Explanations  │
                                  │  - Remotion Video Player      │
                                  │  - Interactive Game Runner    │
                                  │  - Monaco / Code Editor       │
                                  └───────────────┬───────────────┘
                                                  │
                                                  ▼
                        ┌──────────────────────────────────────────────────┐
                        │              Shared Packages & Content           │
                        │  ├─ @ts-learn/content (MDX docs, metadata)       │
                        │  ├─ @ts-learn/games (Game engines & levels)      │
                        │  ├─ @ts-learn/remotion (Video compositions)      │
                        │  └─ @ts-learn/types (Shared DTOs & schemas)      │
                        └─────────────────────────┬────────────────────────┘
                                                  │
                                                  ▼
                                  ┌───────────────────────────────┐
                                  │     Server (Express.js + TS)  │
                                  │  - TS Sandbox / Validation API│
                                  │  - Progress & XP Tracking     │
                                  │  - Game Scores & Leaderboard  │
                                  │  - Static Asset Delivery      │
                                  └───────────────────────────────┘
```

---

## 2. Monorepo File & Folder Structure

A monorepo structure (managed with **pnpm workspaces** or **Turborepo**) is recommended to cleanly decouple the Vite frontend, Express API, Remotion video rendering pipeline, and curriculum modules while sharing TypeScript definitions.

```text
learning-typescript/
├── .github/
│   └── workflows/
│       ├── ci.yml                     # Build, lint, and test validation
│       └── render-videos.yml          # Automated Remotion video rendering (optional CI)
│
├── apps/
│   ├── web/                           # Vite + React Frontend Application
│   │   ├── public/
│   │   │   ├── assets/                # Audio, textures, badges, sprites for games
│   │   │   └── favicon.ico
│   │   ├── src/
│   │   │   ├── app/                   # App routes & layout (React Router)
│   │   │   │   ├── routes/
│   │   │   │   │   ├── Home.tsx
│   │   │   │   │   ├── ModuleView.tsx
│   │   │   │   │   ├── SectionView.tsx
│   │   │   │   │   └── GameView.tsx
│   │   │   │   ├── Layout.tsx
│   │   │   │   └── App.tsx
│   │   │   ├── components/            # Reusable UI components
│   │   │   │   ├── ui/                # Button, Modal, Tabs, Progress bars
│   │   │   │   ├── editor/            # Monaco editor / live TS playground
│   │   │   │   ├── explanation/       # MDX renderer, Callouts, Syntax highlighters
│   │   │   │   ├── player/            # @remotion/player video wrapper & controls
│   │   │   │   └── game/              # Game canvas, HUD, Lives/Score counters
│   │   │   ├── hooks/                 # Custom React hooks (useProgress, useAudio, useEditor)
│   │   │   ├── services/              # API clients for Express backend
│   │   │   ├── stores/                # State management (Zustand: user progress, game state)
│   │   │   ├── styles/                # Tailwind CSS / global styles
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── server/                        # Express.js Backend API
│       ├── src/
│       │   ├── config/                # Environment variables & constants
│       │   ├── controllers/           # Request handlers
│       │   │   ├── auth.controller.ts
│       │   │   ├── progress.controller.ts
│       │   │   ├── compiler.controller.ts # Validates user TS code via compiler API
│       │   │   └── leaderboard.controller.ts
│       │   ├── middleware/            # Auth, rate-limiter, error handling
│       │   ├── models/                # Database entities / schemas (Prisma / Drizzle / Mongo)
│       │   ├── routes/                # Express router definitions
│       │   │   ├── auth.routes.ts
│       │   │   ├── progress.routes.ts
│       │   │   └── compiler.routes.ts
│       │   ├── services/              # Business logic & TS compiler execution sandbox
│       │   │   ├── tsCompiler.service.ts  # Runs TS compiler diagnostics on user inputs
│       │   │   └── progress.service.ts
│       │   ├── app.ts                 # Express app configuration
│       │   └── server.ts              # Entry point (port listener)
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── content/                       # The Curriculum (Modules & Sections)
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── module-01-basics/
│   │   │   │   │   ├── module.json    # Module metadata (title, icon, order)
│   │   │   │   │   ├── section-01-primitive-types/
│   │   │   │   │   │   ├── section.json      # Section details, prerequisites
│   │   │   │   │   │   ├── explanation.mdx   # In-depth markdown guide & examples
│   │   │   │   │   │   ├── code-samples.ts   # Interactive playground exercises
│   │   │   │   │   │   └── video-config.json # Props fed into Remotion composition
│   │   │   │   │   ├── section-02-type-inference/
│   │   │   │   │   └── ...
│   │   │   │   ├── module-02-interfaces-and-types/
│   │   │   │   ├── module-03-unions-and-intersections/
│   │   │   │   ├── module-04-generics/
│   │   │   │   ├── module-05-utility-types/
│   │   │   │   └── module-06-advanced-types/  # Conditional types, mapped types, template literals
│   │   │   ├── loader.ts              # Content parser, validator (Zod), and loader API
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── games/                         # Interactive Learning Games Engine & Levels
│   │   ├── src/
│   │   │   ├── core/                  # Core game logic (agnostic of UI)
│   │   │   │   ├── GameEngine.ts      # State machine, timer, score, lives
│   │   │   │   ├── SoundManager.ts
│   │   │   │   └── LevelManager.ts
│   │   │   ├── templates/             # Archetypes of games used across sections
│   │   │   │   ├── type-matcher/      # Drag & drop / match types to values
│   │   │   │   ├── bug-hunter/        # Spot the TypeScript compiler error
│   │   │   │   ├── generics-dungeon/  # Solve type constraints to open doors
│   │   │   │   ├── type-tetris/       # Quick-time falling block matching types
│   │   │   │   └── ast-builder/       # Visually compose type unions and intersections
│   │   │   ├── section-games/         # Section-specific level definitions & challenges
│   │   │   │   ├── m01-s01-primitives/
│   │   │   │   │   ├── config.ts      # Modes: 'chill', 'time-attack', 'boss-battle'
│   │   │   │   │   └── levels.ts      # Level 1 (Easy), Level 2 (Medium), Level 3 (Hard)
│   │   │   │   ├── m04-s01-generics/
│   │   │   │   │   ├── config.ts
│   │   │   │   │   └── levels.ts
│   │   │   │   └── ...
│   │   │   ├── types.ts               # GameState, LevelConfig, GameMode, Challenge
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── remotion/                      # Remotion Animations Studio & Components
│   │   ├── src/
│   │   │   ├── Root.tsx               # Remotion root register for all compositions
│   │   │   ├── compositions/          # Section-specific video animations
│   │   │   │   ├── primitives/
│   │   │   │   │   ├── PrimitivesExplainer.tsx
│   │   │   │   │   └── TypeMemoryAnimation.tsx
│   │   │   │   ├── generics/
│   │   │   │   │   └── GenericsTransformation.tsx
│   │   │   │   └── ...
│   │   │   ├── components/            # Reusable Remotion animated components
│   │   │   │   ├── CodeWindow.tsx     # Animated syntax-highlighted code editor
│   │   │   │   ├── TypeBadge.tsx      # Floating types, arrows, and tags
│   │   │   │   ├── ErrorSquiggle.tsx  # Animated red red squiggly lines & tooltips
│   │   │   │   ├── AstDiagram.tsx     # Visual AST type tree animation
│   │   │   │   └── NarrationCard.tsx  # Callout cards synced with voiceover/captions
│   │   │   ├── helpers/               # Remotion spring transitions, easing, timer hooks
│   │   │   ├── index.ts               # Exports compositions for `@remotion/player` in web app
│   │   │   └── remotion.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── types/                         # Shared TypeScript Interfaces & DTOs
│       ├── src/
│       │   ├── curriculum.ts          # Module, Section, Lesson metadata schemas
│       │   ├── game.ts                # Game modes, levels, leaderboard records
│       │   ├── progress.ts            # User completion status, badges, XP
│       │   └── api.ts                 # Request/Response contracts between Express & Vite
│       ├── package.json
│       └── tsconfig.json
│
├── scripts/
│   └── scaffold-section.ts            # Fast CLI script to generate new section stubs
├── package.json                       # Root workspace package.json
├── pnpm-workspace.yaml                # Workspace packages definition
├── turbo.json                         # Turborepo task pipeline (build, dev, lint)
├── .editorconfig
├── .gitignore
├── .prettierrc
└── README.md
```

---

## 3. Deep Dive into Core Subsystems

### A. Curriculum Structure (`packages/content`)
Each section is designed as a self-contained learning unit with four core pillars:
1. **In-depth Markdown/MDX (`explanation.mdx`)**:
   - Deep dive into concept theory, memory model, and runtime vs compile-time behavior.
   - Interactive embedded components (interactive code blocks, callouts, diagrams).
2. **Video Animation Config (`video-config.json`)**:
   - Configuration passed dynamically into the Remotion composition.
   - Allows changing code snippets, subtitle timings, or theme without re-coding Remotion templates.
3. **Interactive Code Samples (`code-samples.ts`)**:
   - Starting code, solution, and test suite run by the TypeScript compiler service.
4. **Metadata (`section.json`)**:
   - Estimated time, difficulty, tags, XP value, and prerequisite section IDs.

### B. Remotion Video Engine (`packages/remotion`)

The platform utilizes a **story-driven programmatic video architecture** powered by Remotion, designed to anchor theoretical concepts into vivid real-world engineering experiences.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        THE DUAL-VIDEO CINEMATIC ARCHITECTURE                           │
├───────────────────────────────────────────┬────────────────────────────────────────────┤
│ 🚨 PROLOGUE VIDEO (Before Module Starts)  │ 🏆 EPILOGUE VIDEO (After Module Ends)      │
│ "Why We Need This: The Production Outage" │ "The Superpower: Real-World Scale"         │
├───────────────────────────────────────────┼────────────────────────────────────────────┤
│ • Real developer crisis (e.g. 2 AM outage)│ • Next-morning victory & confident coding  │
│ • Innocent mistake ($49.99 * 2 = $NaN)    │ • Enterprise scale (Stripe, Airbnb APIs)   │
│ • Why vanilla JS fails (no compiler step) │ • Zero-bloat type erasure in production    │
│ • The birth & purpose of TypeScript       │ • PR merged, 0 alerts, Black Friday saved  │
└───────────────────────────────────────────┴────────────────────────────────────────────┘
```

#### 1. Narrative Story Arc Guidelines
Every video must reject abstract textbook bullet points in favor of a **relatable developer story**:
- **The Developer Protagonist (Alex)**: A developer working under realistic constraints (e.g., tight deadline, launch day, tired at 2 AM).
- **The Plausible Bug**: An innocent error that JavaScript silently allows (such as a `<input />` passing currency as `"$49.99"` into arithmetic, producing `NaN`).
- **The Dissection of Failure**: Visually demonstrating the missing layer — vanilla JavaScript has no compiler and only crashes when real customers execute the code.
- **The Origin & Solution**: Explaining *why* TypeScript was created (to act as an invisible pair programmer) and showing the exact line of code transforming from an error squiggle to a clean build.

#### 2. Visual Graphic Animation Standards
Animations must visually depict what is being spoken, not just show static text in a code window:
- **Environment & Atmospheric Cues**: Digital LED clocks (`02:14:38 AM`), countdown timers (`⏳ Black Friday Launch: 03h 45m left`), coffee cups, and late-night ambient glows.
- **Interactive Data Flow Diagrams**: Real shopping cart visualizers displaying form inputs, types, multiplication operators, and red flashing error cards.
- **Architectural Flowcharts**: Visual comparisons showing `Developer ➔ [No Compiler Layer ⚠️] ➔ Production Crash` vs `Developer ➔ [TypeScript Compiler Shield 🛡️] ➔ 0 Errors`.
- **Live Code Mutations**: Animated typing where invalid strings receive wavy red error squiggles with diagnostic tooltips (`TS2345`), and then transition into valid numbers with glowing green checkmarks.

#### 3. Temporal Pacing & Voice Narration Synchronization
To ensure narration and visual graphics make sense together without rushing:
- **Pacing Rule**: Allocate **8 to 10 seconds per scene** (accommodating 25 to 35 spoken words at `0.98x` natural conversational rate).
- **No Abrupt Cutoffs**: Avoid compressing scenes into 3–4 seconds. Generous durations give learners time to absorb the visual graphics while the narration concludes cleanly.
- **Synchronized Teleprompter**: An on-screen live prompter card under the video player displays `NOW SPEAKING • SCENE 0X` with the exact sentence currently being spoken in real time.
- **Browser Speech Synthesis Engine**: Configured to auto-select natural English voices (`Google US English`, `Natural`, `Samantha`) with rate calibration.

#### 4. Procedural Zero-Dependency Sound Engine (`soundEffects.ts`)
To ensure high-fidelity sound without external audio downloads, the video engine generates mathematical 16-bit PCM WAV data URIs on the fly:
| Sound Effect | Frequency / Waveform | Narrative Purpose |
| :--- | :--- | :--- |
| `pagerDutyPing` | Dual-tone 880Hz ➔ 1320Hz chime | PagerDuty / Slack incident alerts popping up |
| `alarmKlaxon` | 440Hz FM-modulated siren | Urgent runtime production crashes |
| `errorBuzzer` | Dissonant 185Hz / 196Hz minor second | Compiler diagnostics & `$NaN` explosion |
| `shieldActivation`| 300Hz ➔ 1200Hz rising harmonic sweep | TypeScript static compiler shield turning on |
| `transitionWhoosh`| 200Hz ➔ 800Hz dynamic bandpass sweep | Scene transitions & visual slides |
| `successChime` | Harmonic 523Hz (C5) + 659Hz (E5) ding | Bug squashed & type contract fixed |
| `victoryFanfare` | Tri-tone C5 + E5 + G5 resolution chord | Module completion & Black Friday saved |

### C. Game Architecture (`packages/games`)
The games are designed to reinforce intuition about TypeScript's static type checker.

#### 1. Game Modes
| Mode | Description | Progression |
| :--- | :--- | :--- |
| **Guided / Practice** | No time limit, hints available, error explanations | Beginner friendly |
| **Time Attack** | Solve as many type puzzles before the clock expires | Score multiplier based on streak |
| **Boss Battle** | Complex multi-stage TypeScript refactoring or bug hunt | Complete to unlock module badge |
| **Survival** | 3 lives; game ends on 3 compiler errors | High score leaderboard |

#### 2. Archetypes per Section
- **Type Matcher (Basics)**: Drag TypeScript types to matching JavaScript values and memory representation.
- **Type Tetris (Unions & Narrowing)**: Narrow down incoming falling types using `typeof`, `instanceof`, or custom type guards.
- **Generics Quest (Generics)**: Assemble generic type arguments `<T, K extends keyof T>` to pass compile-time lock gates.
- **Compiler Inspector (Advanced)**: Given broken TypeScript code, locate which token triggers the error and fix it with minimum keystrokes.

### D. Express Server & TS Sandbox (`apps/server`)
- **Compiler Service**: Uses `typescript` (the official compiler API) inside an isolated sandbox to run `ts.createProgram` or `ts.transpileModule`.
- **Diagnostic Evaluation**: Compares compiler diagnostics from the user's submitted solution against expected diagnostics to grade challenges safely and deterministically without dangerous `eval()` execution.
- **Progress Tracking**: Persists user streak, unlocked levels, and high scores.

---

## 4. Section Folder Anatomy (Example)

Here is how a specific section looks inside the content and games packages:

```text
packages/content/src/modules/module-04-generics/section-02-generic-constraints/
├── section.json                  # { "id": "m04-s02", "title": "Generic Constraints with extends", ... }
├── explanation.mdx               # The complete written lesson with interactive cards
├── exercises.ts                  # Hands-on coding exercises with automated verification
└── remotion-props.json           # Props for Remotion: code transitions, keyframes, narration cues

packages/games/src/section-games/m04-s02-constraints/
├── config.ts                     # Game type: 'generics-dungeon'
├── levels/
│   ├── level-1-easy.ts           # Simple <T extends string>
│   ├── level-2-medium.ts         # Multi-param <T, K extends keyof T>
│   └── level-3-boss.ts           # Record constraint + recursive generic
└── soundFx.ts
```

---

## 5. Recommended Tech Stack Summary

| Layer | Tool / Library | Reason |
| :--- | :--- | :--- |
| **Monorepo Manager** | Turborepo + pnpm | Fast incremental builds, caching, lightweight workspace linking |
| **Frontend** | Vite + React + TypeScript + TailwindCSS | Sub-second HMR, modern component ecosystem |
| **Code Editor** | `@monaco-editor/react` | Visual Studio Code's editor in the browser with full TS LSP support |
| **Video Engine** | Remotion (`remotion`, `@remotion/player`) | Programmatic, React-driven animated videos with code synchronization |
| **Backend** | Express.js + TypeScript | Lightweight, robust REST API server |
| **Code Verification** | TypeScript Compiler API (`typescript`) | Evaluates types and errors directly via AST & type checker |
| **Documentation** | MDX (`@mdx-js/react`) | Markdown with embedded live React widgets and interactive quizzes |
| **State Management**| Zustand | Simple, modular state for game loops and user progress |

---

## 6. Zero-Restart Auto-Discovery Architecture (Plug & Play)

To enable adding new modules, sections, videos, and game levels while the app is running—**without ever restarting Vite or Express**—the architecture relies on **dynamic file-system globbing and runtime registries**.

```
  Developer creates new file:
  packages/content/.../section-03-generics/
  ├── section.json
  ├── explanation.mdx
  └── ...
           │
           ▼ (Vite File Watcher detects change instantly)
  ┌────────────────────────────────────────────────────────┐
  │ Vite `import.meta.glob` Re-evaluates                   │
  │  - Navigation sidebar automatically adds Section 3     │
  │  - Hot Module Replacement (HMR) updates in < 50ms      │
  │  - Zero browser full-reload, zero server restart       │
  └────────────────────────────────────────────────────────┘
```

### A. Client-Side Auto-Discovery via Vite `import.meta.glob`

Instead of manually maintaining an `index.ts` file with hardcoded imports for every section, the client automatically scans the directory tree at runtime.

#### 1. Dynamic Curriculum Loader (`packages/content/src/loader.ts`)
```typescript
// Automatically tracks any section.json added in real-time
export const sectionModules = import.meta.glob<{ default: SectionMetadata }>(
  './modules/**/section.json',
  { eager: true }
);

// Lazy-loads the MDX explanation on-demand when user clicks the section
export const explanationLoaders = import.meta.glob(
  './modules/**/explanation.mdx'
);

// Helper that builds the full curriculum tree automatically
export function getCurriculumTree(): Module[] {
  // Parses folder paths dynamically: './modules/module-01/section-02/section.json'
  // When you add a new folder or file, HMR updates this list instantly!
}
```

#### 2. Dynamic Remotion Composition Registry (`packages/remotion/src/registry.ts`)
```typescript
// Auto-registers all video compositions created in the compositions directory
export const videoCompositions = import.meta.glob(
  './compositions/**/index.tsx',
  { eager: true }
);
```

#### 3. Dynamic Game Level & Engine Discovery (`packages/games/src/registry.ts`)
```typescript
// Auto-discovers any section game configuration as soon as config.ts is created
export const gameConfigs = import.meta.glob(
  './section-games/**/config.ts',
  { eager: true }
);

// Auto-discovers new levels incrementally as you code them
export const gameLevels = import.meta.glob(
  './section-games/**/levels/*.ts',
  { eager: true }
);
```

---

## 7. "One Thing at a Time" Incremental Development Workflow

You can build out the course piece by piece. The platform is designed with **graceful fallbacks and progressive statuses**, ensuring that partial or unfinished sections never crash the running application.

### A. Progressive Content Statuses

Each `section.json` contains a status flag:
```json
{
  "id": "m01-s02",
  "title": "Type Inference & Type Annotations",
  "status": "draft", 
  "features": {
    "hasExplanation": true,
    "hasVideo": false,
    "hasGame": false
  }
}
```

### B. Graceful UI Fallbacks (Nothing Breaks)
- **Missing Video**: If `video-config.json` or composition is not created yet, the Video Tab displays an animated *"🎬 Video Under Production"* preview card with an audio outline or key bullet points.
- **Missing Game / Levels**: If `levels.ts` is not created yet, the Game Tab shows a *"🎮 Interactive Sandbox Coming Soon"* interactive code playground fallback.
- **Draft Mode**: In development mode (`npm run dev`), all draft sections are visible with a `[DRAFT]` badge so you can preview and test them immediately. In production builds, drafts are automatically filtered out.

---

## 8. Step-by-Step Developer Loop (Adding a New Section)

Follow this 4-step workflow to build one feature at a time without touching any master index or configuration file:

### Step 1: Scaffold the Section (Takes 5 seconds)
Run the generator script (or simply duplicate an existing section folder):
```bash
# Automatically creates the folder structure with starter stubs
pnpm scaffold:section --module=01-basics --section=02-type-inference
```
> **Result**: The running Vite app immediately adds the new section to the sidebar via HMR.

### Step 2: Write the Explanation (`explanation.mdx`)
- Open `packages/content/src/modules/module-01-basics/section-02-type-inference/explanation.mdx`.
- Write your guide, code blocks, and diagrams.
- Save the file: Vite updates the text in the browser in real time without refreshing your page state.

### Step 3: Create the Remotion Video Animation (`compositions/...`)
- Create a new composition folder: `packages/remotion/src/compositions/type-inference/`.
- Build your visual animation (e.g., highlighting how TypeScript assigns types automatically).
- Preview live either in the app's embedded `@remotion/player` or in Remotion Studio (`pnpm remotion preview`).

### Step 4: Add Interactive Game Levels (`section-games/...`)
Build the game incrementally, level by level:
1. Create `config.ts` defining the game mode (*e.g., Type Matcher*).
2. Create `levels/level-1-easy.ts`:
   - Test Level 1 live in the browser.
3. Create `levels/level-2-medium.ts`:
   - Hot reloads; immediately selectable in the level selector HUD.
4. Create `levels/level-3-boss.ts`:
   - Adds the final boss battle challenge.

### Step 5: Set Status to "Ready"
In `section.json`, update `"status": "published"`. The section is now live for learners!

---

## 9. The 4-Phase Learning Quest Workflow (UX Experience)

Rather than treating documentation, video, and gaming as disconnected tabs, the platform presents each section as a guided **4-Phase Narrative Journey**:

```
┌─────────────────────────┬─────────────────────────┬─────────────────────────┬─────────────────────────┐
│ 🚨 STEP 1: THE PROBLEM  │ 📖 STEP 2: HANDS-ON     │ 🎮 STEP 3: THE ARCADE   │ 🏆 STEP 4: OUTRO VIDEO  │
│ Intro Video with Audio  │ Interactive Studio      │ Games & Boss Battle     │ Real-World Impact       │
│ (Alex's 2 AM Catastrophe│ (V8 Memory Simulator    │ Against Lord TypeError  │ (Stripe/Airbnb scale,   │
│ & Why We Need Static TS)│ & Compiler Sandbox)     │ with Streak Combos      │ unlocked upon victory!) │
└─────────────────────────┴─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

1. **Phase 1 • 🚨 The Problem (Intro Video)**:
   - Sets the stakes before the user touches theory.
   - Shows a real developer (Alex) working against a Black Friday deadline, an innocent form input `$49.99` causing `$NaN` invoices, and explains *why* vanilla JavaScript dynamic typing fails silently without a compiler layer.
   - Includes synchronized sirens, incident pings, and clear voice narration.
2. **Phase 2 • 📖 Hands-On Interactive Studio**:
   - Deep conceptual breakdown.
   - Interactive V8 Call Stack simulator (allocating primitives directly to memory addresses with immutability locks).
   - Type Space vs Value Space compile-time erasure inspector.
   - Live TypeScript Compiler API sandbox evaluating diagnostics in real time.
3. **Phase 3 • 🎮 The Arcade & Boss Battle**:
   - Progressive tactile challenges: Practice Mode, 45s Time Attack with multiplier streaks, and multi-stage Boss Battle (*Lord TypeError*).
   - Defeating the boss awards XP and triggers a celebration sequence that unlocks Phase 4.
4. **Phase 4 • 🏆 Superpower Unlocked (Outro Video)**:
   - Shows the tangible production payoff: how billion-dollar systems at Stripe and Airbnb build indestructible payment APIs using these exact 7 primitive contracts.
   - Concludes with PR approved, zero 2 AM alerts, and celebratory fanfare.



