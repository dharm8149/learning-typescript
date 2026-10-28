import React from 'react';
import { PrimitivesExplainer } from './compositions/primitives/PrimitivesExplainer';
import { IntroProblemExplainer } from './compositions/primitives/IntroProblemExplainer';
import { OutroMasteryExplainer } from './compositions/primitives/OutroMasteryExplainer';
import { IntroTypeAnnotations } from './compositions/annotations/IntroTypeAnnotations';
import { TypeAnnotationsExplainer } from './compositions/annotations/TypeAnnotationsExplainer';
import { OutroTypeAnnotations } from './compositions/annotations/OutroTypeAnnotations';
import { IntroInterfaceStory } from './compositions/interfaces/IntroInterfaceStory';
import { InterfaceExplainer } from './compositions/interfaces/InterfaceExplainer';
import { OutroInterfaceMastery } from './compositions/interfaces/OutroInterfaceMastery';
import { IntroUnionStory } from './compositions/unions/IntroUnionStory';
import { UnionExplainer } from './compositions/unions/UnionExplainer';
import { OutroUnionMastery } from './compositions/unions/OutroUnionMastery';
import { IntroGenericsStory } from './compositions/generics/IntroGenericsStory';
import { GenericExplainer } from './compositions/generics/GenericExplainer';
import { OutroGenericsMastery } from './compositions/generics/OutroGenericsMastery';
import { IntroUtilityStory } from './compositions/utility/IntroUtilityStory';
import { UtilityExplainer } from './compositions/utility/UtilityExplainer';
import { OutroUtilityMastery } from './compositions/utility/OutroUtilityMastery';
import { IntroAdvancedStory } from './compositions/advanced/IntroAdvancedStory';
import { AdvancedExplainer } from './compositions/advanced/AdvancedExplainer';
import { OutroAdvancedMastery } from './compositions/advanced/OutroAdvancedMastery';

export * from './Root';
export * from './compositions/primitives/PrimitivesExplainer';
export * from './compositions/primitives/IntroProblemExplainer';
export * from './compositions/primitives/OutroMasteryExplainer';
export * from './compositions/annotations/IntroTypeAnnotations';
export * from './compositions/annotations/TypeAnnotationsExplainer';
export * from './compositions/annotations/OutroTypeAnnotations';
export * from './compositions/interfaces/IntroInterfaceStory';
export * from './compositions/interfaces/InterfaceExplainer';
export * from './compositions/interfaces/OutroInterfaceMastery';
export * from './compositions/unions/IntroUnionStory';
export * from './compositions/unions/UnionExplainer';
export * from './compositions/unions/OutroUnionMastery';
export * from './compositions/generics/IntroGenericsStory';
export * from './compositions/generics/GenericExplainer';
export * from './compositions/generics/OutroGenericsMastery';
export * from './compositions/utility/IntroUtilityStory';
export * from './compositions/utility/UtilityExplainer';
export * from './compositions/utility/OutroUtilityMastery';
export * from './compositions/advanced/IntroAdvancedStory';
export * from './compositions/advanced/AdvancedExplainer';
export * from './compositions/advanced/OutroAdvancedMastery';
export * from './components/CodeWindow';
export * from './helpers/soundEffects';

// Dynamic composition registry
export const compositionRegistry: Record<string, React.FC> = {
  PrimitivesExplainer,
  IntroProblemExplainer,
  OutroMasteryExplainer,
  IntroTypeAnnotations,
  TypeAnnotationsExplainer,
  OutroTypeAnnotations,
  IntroInterfaceStory,
  InterfaceExplainer,
  OutroInterfaceMastery,
  IntroUnionStory,
  UnionExplainer,
  OutroUnionMastery,
  IntroGenericsStory,
  GenericExplainer,
  OutroGenericsMastery,
  IntroUtilityStory,
  UtilityExplainer,
  OutroUtilityMastery
};

export function getComposition(id: string): React.FC | undefined {
  return compositionRegistry[id];
}
