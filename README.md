# Learning TypeScript — Interactive Educational Web Platform

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/dharm8149/learning-typescript)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?logo=vite)](https://vitejs.dev/)
[![Remotion](https://img.shields.io/badge/Remotion-4.x-0b84f3?logo=remotion)](https://www.remotion.dev/)

An interactive full-stack learning platform engineered to master TypeScript through real-world developer stories, synchronized programmatic video animations, tactile mini-games, and live compiler diagnostics.

---

## 🌟 Core Pillars

### 1. 🎬 Story-Driven Dual-Video Cinematic Arc (Powered by Remotion)
- **🚨 Prologue Video ("The Problem & Why We Need Static Types")**:
  - Sets the stakes before theory begins: Follow **Alex**, an exhausted developer working at 2 AM before a Black Friday launch.
  - A form input passes currency as `"$49.99"` into a checkout function; JavaScript silently multiplies it by 2, producing `$NaN` on 3,400 customer invoices.
  - Explains why vanilla JavaScript fails (no compile-time verification layer) and how TypeScript acts like an invisible senior pair programmer to stop bugs right at the cursor.
- **🏆 Epilogue Video ("Production Superpower Unlocked")**:
  - Unlocked once the learner conquers the section challenges.
  - Demonstrates real-world enterprise architectures at **Stripe** and **Airbnb**, showing how billions in transactions rely on sound primitive contracts with zero runtime bloat.
  - Concludes with PR approved, zero 2 AM alerts, and celebratory fanfare.

### 2. 🔊 Procedural Sound Design & Voice Narration
- **Zero-Dependency Sound Engine (`soundEffects.ts`)**: Mathematical 16-bit PCM WAV audio synthesized on the fly (`pagerDutyPing`, `alarmKlaxon`, `errorBuzzer`, `shieldActivation`, `transitionWhoosh`, `successChime`, `victoryFanfare`).
- **Synchronized Voice Narration**: Clear speech synthesis calibrated at `0.98x` conversational pacing, accompanied by an on-screen **Live Teleprompter** highlighting the spoken words in real time.
- **Temporal Pacing**: Every scene is calibrated to 8–10 seconds (25–35 words) so narration concludes naturally without getting cut off.

### 3. 🧠 Interactive Studio & Memory Simulator
- **V8 Call Stack Simulator**: Push primitive types (`string`, `number`, `boolean`, `bigint`, `null`) to simulated memory addresses (`0x00A1`) with immutability locks.
- **Type Space vs Value Space Inspector**: Toggle between compile-time TypeScript AST and runtime JavaScript output to witness zero-overhead type erasure.
- **Live Compiler API Sandbox**: Type code directly in the browser; the Express backend parses syntax and returns official TypeScript compiler diagnostics (`ts.transpileModule`).

### 4. 🎮 The Arcade & Boss Battle
- **3 Modes**: Practice Mode (untimed), 45s Time Attack (with combo streak multipliers), and Boss Battle.
- **Boss Fight**: Defeat *Lord TypeError the Glitched* by selecting the correct TypeScript fixes to deplete the boss's HP before your health runs out.
- **Celebration & XP**: Confetti particle physics upon victory, unlocking the Outro video.

---

## 🧭 The 4-Phase Guided Learning Quest

```
┌─────────────────────────┬─────────────────────────┬─────────────────────────┬─────────────────────────┐
│ 🚨 STEP 1: THE PROBLEM  │ 📖 STEP 2: HANDS-ON     │ 🎮 STEP 3: THE ARCADE   │ 🏆 STEP 4: OUTRO VIDEO  │
│ Intro Video with Audio  │ Interactive Studio      │ Games & Boss Battle     │ Real-World Impact       │
│ (Alex's 2 AM Catastrophe│ (V8 Memory Simulator    │ Against Lord TypeError  │ (Stripe/Airbnb scale,   │
│ & Why We Need Static TS)│ & Compiler Sandbox)     │ with Streak Combos      │ unlocked upon victory!) │
└─────────────────────────┴─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

---

## 📚 Documentation Reference

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**: Full monorepo directory tree, Remotion video engine specifications, procedural sound design, and the zero-restart auto-discovery engine.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Servers
Runs both Express API (port 4000) and Vite frontend (port 3000) concurrently:
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 3. Scaffold a New Section ("One Thing at a Time")
```bash
node ./scripts/scaffold-section.js module-01-basics section-02-type-inference "Type Inference & Annotations"
```
The running Vite app automatically discovers the new section with **zero server or client restarts**!
