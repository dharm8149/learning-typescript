import { GameConfig } from '@ts-learn/types';
import { level1Easy } from './levels/level-1-easy';
import { level2Medium } from './levels/level-2-medium';
import { bossLevelGenerics } from './levels/level-3-boss';

export const genericsGameConfig: GameConfig = {
  id: 'section-01-generics',
  title: 'Generics Arcade',
  description: 'Master TypeScript generics to write flexible, type-safe code that works with any type.',
  levels: [level1Easy, level2Medium, bossLevelGenerics],
  totalLevels: 3,
  settings: {
    enableTimer: true,
    enableHints: true,
    showExplanation: true
  }
};
