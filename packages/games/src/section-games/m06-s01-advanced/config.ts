import { GameConfig } from '@ts-learn/types';
import { level1Easy } from './levels/level-1-easy';
import { level2Medium } from './levels/level-2-medium';
import { bossLevelAdvanced } from './levels/level-3-boss';

export const advancedTypesGameConfig: GameConfig = {
  gameId: 'section-01-advanced-types',
  title: 'Advanced Types Arcade',
  subtitle: 'Master TypeScript advanced type system: type guards, conditional types, template literals, and discriminated unions',
  modes: ['practice', 'time-attack', 'boss-battle'],
  levels: [level1Easy, level2Medium],
  bossPhase: bossLevelAdvanced
};
