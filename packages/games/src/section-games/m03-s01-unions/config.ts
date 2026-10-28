import { GameConfig } from '@ts-learn/types';
import { level1Easy } from './levels/level-1-easy';
import { level2Medium } from './levels/level-2-medium';
import { bossLevelUnions } from './levels/level-3-boss';

export const unionsGameConfig: GameConfig = {
  gameId: 'section-01-unions-intersections',
  title: 'Unions & Intersections Arcade',
  subtitle: 'Master the art of combining and narrowing types in TypeScript',
  modes: ['practice', 'time-attack', 'boss-battle'],
  levels: [level1Easy, level2Medium],
  bossPhase: bossLevelUnions
};
