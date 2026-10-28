import { GameConfig } from '@ts-learn/types';
import { level1Easy } from './levels/level-1-easy';
import { level2Medium } from './levels/level-2-medium';
import { bossLevelUtility } from './levels/level-3-boss';

export const utilityTypesGameConfig: GameConfig = {
  gameId: 'section-01-utility-types',
  title: 'Utility Types Arcade',
  subtitle: 'Master TypeScript utility types to transform and compose types with zero boilerplate',
  modes: ['practice', 'time-attack', 'boss-battle'],
  levels: [level1Easy, level2Medium],
  bossPhase: bossLevelUtility
};
