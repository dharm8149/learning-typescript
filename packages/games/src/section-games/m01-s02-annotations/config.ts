import { GameConfig } from '@ts-learn/types';
import { level1Easy } from './levels/level-1-easy';
import { level2Medium } from './levels/level-2-medium';
import { bossLevelAnnotations } from './levels/level-3-boss';

export const typeAnnotationsGameConfig: GameConfig = {
  gameId: 'annotation-guardian',
  title: 'Type Guardian: Annotation Protocol',
  subtitle: "Identify where inference works and where you must annotate — defend against Lord Any!",
  modes: ['practice', 'time-attack', 'boss-battle'],
  levels: [level1Easy, level2Medium],
  bossPhase: bossLevelAnnotations
};
