import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Scene 127: The End State (Zero-Fluff)
 * Duration: 150 frames (5.0s)
 * Environment: Total darkness.
 * Transition: Hard cut from the flashing cursor to total darkness.
 * Characters & Props: Blank dark space.
 * Action & Motion:
 * - Beginning: The screen is completely pitch black. No visual elements present.
 * - Action / Climax: Silence is maintained for the duration of the scene. No text, no icons, no characters.
 * - Ending / Hold: True, absolute, dark silence until the very final second.
 * Text & Specific Colors: Solid, True Black (#000000).
 */
export const Scene127_TheEndStateZeroFluff = () => {
  return (
    <AbsoluteFill
      className="overflow-hidden select-none pointer-events-none"
      style={{
        backgroundColor: "#000000",
      }}
    />
  );
};
