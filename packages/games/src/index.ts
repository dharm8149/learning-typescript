import { GameConfig } from '@ts-learn/types';
import { primitiveTypesGameConfig } from './section-games/m01-s01-primitives/config';

// Dynamic map of games by section ID
export const gameRegistry: Record<string, GameConfig> = {
  'section-01-primitive-types': primitiveTypesGameConfig
};

export function getGameForSection(sectionId: string): GameConfig | undefined {
  return gameRegistry[sectionId];
}

export * from './section-games/m01-s01-primitives/config';
