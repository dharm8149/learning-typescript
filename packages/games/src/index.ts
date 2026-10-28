import { GameConfig } from '@ts-learn/types';
import { primitiveTypesGameConfig } from './section-games/m01-s01-primitives/config';
import { typeAnnotationsGameConfig } from './section-games/m01-s02-annotations/config';
import { interfacesGameConfig } from './section-games/m02-s01-interfaces/config';
import { unionsGameConfig } from './section-games/m03-s01-unions/config';

// Dynamic map of games by section ID
export const gameRegistry: Record<string, GameConfig> = {
  'section-01-primitive-types': primitiveTypesGameConfig,
  'section-02-type-annotations': typeAnnotationsGameConfig,
  'section-01-interfaces-aliases': interfacesGameConfig,
  'section-01-unions-intersections': unionsGameConfig
};

export function getGameForSection(sectionId: string): GameConfig | undefined {
  return gameRegistry[sectionId];
}

export * from './section-games/m01-s01-primitives/config';
export * from './section-games/m01-s02-annotations/config';
export * from './section-games/m02-s01-interfaces/config';
export * from './section-games/m03-s01-unions/config';
