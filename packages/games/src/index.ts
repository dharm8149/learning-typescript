import { GameConfig } from '@ts-learn/types';
import { primitiveTypesGameConfig } from './section-games/m01-s01-primitives/config';
import { typeAnnotationsGameConfig } from './section-games/m01-s02-annotations/config';

// Dynamic map of games by section ID
export const gameRegistry: Record<string, GameConfig> = {
  'section-01-primitive-types': primitiveTypesGameConfig,
  'section-02-type-annotations': typeAnnotationsGameConfig
};

export function getGameForSection(sectionId: string): GameConfig | undefined {
  return gameRegistry[sectionId];
}

export * from './section-games/m01-s01-primitives/config';
export * from './section-games/m01-s02-annotations/config';
