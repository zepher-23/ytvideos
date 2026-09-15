import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { CuratedStickman } from '../shared';

/**
 * Scene 01 - Clean starter scene ready for new video sequence
 */
export const Scene01 = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FAFAFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 1920 1080"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Canonical CuratedStickman from shared library */}
        <CuratedStickman
          x={960}
          y={720}
          scale={1.1}
          pose="idle"
          variant="adult"
          frame={frame}
        />
      </svg>
    </AbsoluteFill>
  );
};
