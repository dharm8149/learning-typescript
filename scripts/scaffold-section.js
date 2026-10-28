#!/usr/bin/env node

/**
 * Fast Section Scaffolding Script
 * Usage: node ./scripts/scaffold-section.js <module-dir-name> <section-dir-name> <Section Title>
 * Example: node ./scripts/scaffold-section.js module-01-basics section-02-type-inference "Type Inference & Annotation"
 */

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const moduleDir = args[0] || 'module-01-basics';
const sectionDir = args[1] || 'section-02-type-inference';
const sectionTitle = args[2] || 'Type Inference & Annotations';

const targetContentDir = path.resolve(process.cwd(), 'packages/content/src/modules', moduleDir, sectionDir);
const targetGameDir = path.resolve(process.cwd(), 'packages/games/src/section-games', sectionDir);

console.log(`🚀 Scaffolding new section in: ${targetContentDir}`);

// Ensure directories exist
fs.mkdirSync(targetContentDir, { recursive: true });
fs.mkdirSync(path.join(targetGameDir, 'levels'), { recursive: true });

// 1. Create section.json
const sectionJson = {
  id: sectionDir,
  moduleId: moduleDir,
  order: 2,
  title: sectionTitle,
  slug: sectionDir.replace(/^section-\d+-/, ''),
  description: `Deep dive explanation, animated Remotion video, and interactive game for ${sectionTitle}.`,
  difficulty: "Beginner",
  xp: 150,
  durationMinutes: 15,
  status: "draft",
  features: {
    hasExplanation: true,
    hasVideo: false,
    hasGame: false
  }
};
fs.writeFileSync(path.join(targetContentDir, 'section.json'), JSON.stringify(sectionJson, null, 2));

// 2. Create explanation.ts stub
const explanationCode = `export const ${sectionDir.replace(/-/g, '_')}_explanation = {
  title: "${sectionTitle}",
  summary: "Comprehensive guide to understanding ${sectionTitle} in TypeScript.",
  sections: [
    {
      heading: "1. Core Concept",
      content: "Explain the main mechanics and runtime vs compile-time behavior here.",
      codeSnippet: "// Your example code here\\nlet example = 42;",
      tip: "Key tip for learners."
    }
  ]
};
`;
fs.writeFileSync(path.join(targetContentDir, 'explanation.ts'), explanationCode);

// 3. Create game level stub
const gameLevelStub = `import { GameLevel } from '@ts-learn/types';

export const level1Easy: GameLevel = {
  levelNumber: 1,
  title: "Level 1: Fundamentals of ${sectionTitle}",
  description: "Identify the correct type characteristics.",
  timeLimitSeconds: 45,
  targetScore: 500,
  items: [
    {
      id: "item1",
      valueRepresentation: "42",
      valueExplanation: "Number primitive.",
      correctType: "number",
      distractorTypes: ["string", "boolean"]
    }
  ]
};
`;
fs.writeFileSync(path.join(targetGameDir, 'levels/level-1-easy.ts'), gameLevelStub);

console.log(`✅ Section created!`);
console.log(`  - Content: packages/content/src/modules/${moduleDir}/${sectionDir}/`);
console.log(`  - Game: packages/games/src/section-games/${sectionDir}/`);
console.log(`⚡ Vite will auto-discover this section with ZERO restart needed!`);
