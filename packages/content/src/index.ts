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
import module2Meta from './modules/module-02-interfaces/module.json';
import section3Meta from './modules/module-02-interfaces/section-01-interfaces-aliases/section.json';
import { interfacesExplanation } from './modules/module-02-interfaces/section-01-interfaces-aliases/explanation';
import {
  interfacesIntroVideo,
  interfacesOutroVideo,
  interfacesVideoConfig
} from './modules/module-02-interfaces/section-01-interfaces-aliases/video-config';
import module3Meta from './modules/module-03-unions-intersections/module.json';
import section4Meta from './modules/module-03-unions-intersections/section-01-unions-intersections/section.json';
import { unionsExplanation } from './modules/module-03-unions-intersections/section-01-unions-intersections/explanation';
import {
  unionsIntroVideo,
  unionsOutroVideo,
  unionsVideoConfig
} from './modules/module-03-unions-intersections/section-01-unions-intersections/video-config';

// Modules registry
export const modulesList: ModuleMetadata[] = [
  module1Meta as ModuleMetadata,
  module2Meta as ModuleMetadata,
  module3Meta as ModuleMetadata
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
  },
  'section-01-interfaces-aliases': {
    meta: {
      ...section3Meta,
      features: {
        ...section3Meta.features,
        hasIntroVideo: true,
        hasOutroVideo: true
      }
    } as any,
    introVideo: interfacesIntroVideo,
    outroVideo: interfacesOutroVideo,
    explanation: interfacesExplanation,
    videoConfig: interfacesVideoConfig
  },
  'section-01-unions-intersections': {
    meta: {
      ...section4Meta,
      features: {
        ...section4Meta.features,
        hasIntroVideo: true,
        hasOutroVideo: true
      }
    } as any,
    introVideo: unionsIntroVideo,
    outroVideo: unionsOutroVideo,
    explanation: unionsExplanation,
    videoConfig: unionsVideoConfig
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
export * from './modules/module-02-interfaces/section-01-interfaces-aliases/explanation';
export * from './modules/module-02-interfaces/section-01-interfaces-aliases/video-config';
export * from './modules/module-03-unions-intersections/section-01-unions-intersections/explanation';
export * from './modules/module-03-unions-intersections/section-01-unions-intersections/video-config';
