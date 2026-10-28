import { GameConfig } from '@ts-learn/types';
import { level1Easy } from './levels/level-1-easy';
import { level2Medium } from './levels/level-2-medium';
import { bossLevelPrimitives } from './levels/level-3-boss';

export const primitiveTypesGameConfig: GameConfig = {
  gameId: 'primitives-match-game',
  title: 'Type Catcher: Primitive Protocol',
  subtitle: 'Master the 7 primitives, defeat runtime type bugs, and defeat Lord TypeError!',
  modes: ['practice', 'time-attack', 'boss-battle'],
  levels: [level1Easy, level2Medium],
  bossPhase: bossLevelPrimitives
};
