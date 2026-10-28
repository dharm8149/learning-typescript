import React from 'react';
import { PrimitivesExplainer } from './compositions/primitives/PrimitivesExplainer';
import { IntroProblemExplainer } from './compositions/primitives/IntroProblemExplainer';
import { OutroMasteryExplainer } from './compositions/primitives/OutroMasteryExplainer';

export * from './Root';
export * from './compositions/primitives/PrimitivesExplainer';
export * from './compositions/primitives/IntroProblemExplainer';
export * from './compositions/primitives/OutroMasteryExplainer';
export * from './components/CodeWindow';
export * from './helpers/soundEffects';

// Dynamic composition registry
export const compositionRegistry: Record<string, React.FC> = {
  PrimitivesExplainer,
  IntroProblemExplainer,
  OutroMasteryExplainer
};

export function getComposition(id: string): React.FC | undefined {
  return compositionRegistry[id];
}
