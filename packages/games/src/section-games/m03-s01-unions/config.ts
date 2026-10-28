import { GameConfig } from '@ts-learn/types';
import { level1Easy } from './levels/level-1-easy';
import { level2Medium } from './levels/level-2-medium';
import { bossLevelUnions } from './levels/level-3-boss';

export const unionsGameConfig: GameConfig = {
  id: 'section-01-unions-intersections',
  title: 'Unions & Intersections Arcade',
  description: 'Master the art of combining and narrowing types in TypeScript.',
  levels: [level1Easy, level2Medium, bossLevelUnions],
  totalLevels: 3,
  settings: {
    enableTimer: true,
    enableHints: true,
    showExplanation: true
  }
};
