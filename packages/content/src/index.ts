import { ModuleMetadata, SectionContent } from '@ts-learn/types';
import module1Meta from './modules/module-01-basics/module.json';
import section1Meta from './modules/module-01-basics/section-01-primitive-types/section.json';
import { primitiveTypesExplanation } from './modules/module-01-basics/section-01-primitive-types/explanation';
import {
  primitiveTypesIntroVideo,
  primitiveTypesOutroVideo,
  primitiveTypesVideoConfig
} from './modules/module-01-basics/section-01-primitive-types/video-config';
import section2Meta from './modules/module-01-basics/section-02-type-annotations/section.json';
import { typeAnnotationsExplanation } from './modules/module-01-basics/section-02-type-annotations/explanation';
import {
  typeAnnotationsIntroVideo,
  typeAnnotationsOutroVideo,
  typeAnnotationsVideoConfig
} from './modules/module-01-basics/section-02-type-annotations/video-config';

// Modules registry
export const modulesList: ModuleMetadata[] = [
  module1Meta as ModuleMetadata
];

// Content registry keyed by "sectionId"
export const sectionContentRegistry: Record<string, SectionContent> = {
  'section-01-primitive-types': {
    meta: {
      ...section1Meta,
      features: {
        ...section1Meta.features,
        hasIntroVideo: true,
        hasOutroVideo: true
      }
    } as any,
    introVideo: primitiveTypesIntroVideo,
    outroVideo: primitiveTypesOutroVideo,
    explanation: primitiveTypesExplanation,
    videoConfig: primitiveTypesVideoConfig
  },
  'section-02-type-annotations': {
    meta: {
      ...section2Meta,
      features: {
        ...section2Meta.features,
        hasIntroVideo: true,
        hasOutroVideo: true
      }
    } as any,
    introVideo: typeAnnotationsIntroVideo,
    outroVideo: typeAnnotationsOutroVideo,
    explanation: typeAnnotationsExplanation,
    videoConfig: typeAnnotationsVideoConfig
  }
};

export function getAllModules(): ModuleMetadata[] {
  return modulesList;
}

export function getSectionContent(sectionId: string): SectionContent | undefined {
  return sectionContentRegistry[sectionId];
}

export * from './modules/module-01-basics/section-01-primitive-types/explanation';
export * from './modules/module-01-basics/section-01-primitive-types/video-config';
export * from './modules/module-01-basics/section-02-type-annotations/explanation';
export * from './modules/module-01-basics/section-02-type-annotations/video-config';
