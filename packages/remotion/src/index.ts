import React from 'react';
import { PrimitivesExplainer } from './compositions/primitives/PrimitivesExplainer';
import { IntroProblemExplainer } from './compositions/primitives/IntroProblemExplainer';
import { OutroMasteryExplainer } from './compositions/primitives/OutroMasteryExplainer';
import { IntroTypeAnnotations } from './compositions/annotations/IntroTypeAnnotations';
import { TypeAnnotationsExplainer } from './compositions/annotations/TypeAnnotationsExplainer';
import { OutroTypeAnnotations } from './compositions/annotations/OutroTypeAnnotations';

export * from './Root';
export * from './compositions/primitives/PrimitivesExplainer';
export * from './compositions/primitives/IntroProblemExplainer';
export * from './compositions/primitives/OutroMasteryExplainer';
export * from './compositions/annotations/IntroTypeAnnotations';
export * from './compositions/annotations/TypeAnnotationsExplainer';
export * from './compositions/annotations/OutroTypeAnnotations';
export * from './components/CodeWindow';
export * from './helpers/soundEffects';

// Dynamic composition registry
export const compositionRegistry: Record<string, React.FC> = {
  PrimitivesExplainer,
  IntroProblemExplainer,
  OutroMasteryExplainer,
  IntroTypeAnnotations,
  TypeAnnotationsExplainer,
  OutroTypeAnnotations
};

export function getComposition(id: string): React.FC | undefined {
  return compositionRegistry[id];
}
