import React from 'react';
import { Composition } from 'remotion';
import { PrimitivesExplainer } from './compositions/primitives/PrimitivesExplainer';
import { IntroProblemExplainer } from './compositions/primitives/IntroProblemExplainer';
import { OutroMasteryExplainer } from './compositions/primitives/OutroMasteryExplainer';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Problem Story Video (Alex's 2 AM Incident & Why We Need TypeScript) */}
      <Composition
        id="IntroProblemExplainer"
        component={IntroProblemExplainer}
        durationInFrames={1080} // 36 seconds at 30 fps
        fps={30}
        width={1280}
        height={720}
      />

      {/* 2. Deep Explainer Video (During Module) */}
      <Composition
        id="PrimitivesExplainer"
        component={PrimitivesExplainer}
        durationInFrames={450} // 15 seconds at 30 fps
        fps={30}
        width={1280}
        height={720}
      />

      {/* 3. Mastery Story Video (Next Morning: Black Friday Saved, Zero Alerts) */}
      <Composition
        id="OutroMasteryExplainer"
        component={OutroMasteryExplainer}
        durationInFrames={450} // 15 seconds at 30 fps
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
