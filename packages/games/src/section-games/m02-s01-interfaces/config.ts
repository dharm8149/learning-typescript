import { GameConfig } from '@ts-learn/types';
import { level1Easy } from './levels/level-1-easy';
import { level2Medium } from './levels/level-2-medium';
import { bossLevelInterfaces } from './levels/level-3-boss';

export const interfacesGameConfig: GameConfig = {
  gameId: 'interface-guardian',
  title: 'Interface Guardian: Shape Protocol',
  subtitle: "Build and validate type shapes. Defend against the Interface Overlord!",
  modes: ['practice', 'time-attack', 'boss-battle'],
  levels: [level1Easy, level2Medium],
  bossPhase: bossLevelInterfaces
};
