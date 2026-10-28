import { GameConfig } from '@ts-learn/types';
import { level1Easy } from './levels/level-1-easy';
import { level2Medium } from './levels/level-2-medium';
import { bossLevelUtility } from './levels/level-3-boss';

export const utilityTypesGameConfig: GameConfig = {
  id: 'section-01-utility-types',
  title: 'Utility Types Arcade',
  description: 'Master TypeScript utility types to transform and compose types with zero boilerplate.',
  levels: [level1Easy, level2Medium, bossLevelUtility],
  totalLevels: 3,
  settings: {
    enableTimer: true,
    enableHints: true,
    showExplanation: true
  }
};
