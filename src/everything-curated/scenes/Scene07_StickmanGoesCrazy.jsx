import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from "remotion";
import { CuratedStickman } from "../../shared/characters/CuratedStickman";
import { GridBackground } from "../../shared/environments/GridBackground";

/**
 * Scene 07: Stickman Goes Crazy (Variation: Mental Spiral & Collapse)
 * Duration: 3 seconds (90 frames @ 30fps)
 * 
 * Variation Choreography:
 *   - Frames 0 - 22: Sudden panic seizure. Hands snap up to clutch head (pose="shock"),
 *                    eyes wide with shock, high-frequency micro tremors build up.
 *   - Frames 22 - 58: Violent mental spiral. Heavy shuddering and recoil while clutching head,
 *                     body tilts back and forth in frantic panic, sweat flies, shock exclamation,
 *                     and radiating comic stress spark lines pulse around the head.
 *   - Frames 58 - 90: The Collapse. Overwhelmed system snaps; stickman drops heavily into
 *                     slump/defeat pose, knees buckling, head bowed, exhausted trembling,
 *                     and an exhausted sigh puff.
 */
export const Scene07_StickmanGoesCrazy = ({ frame: propFrame }) => {
  const frame = propFrame ?? useCurrentFrame();
  const { fps } = useVideoConfig();

  // === Timing Landmarks ===
  const spiralStart = 20;
  const collapseStart = 56;

  // === Phase 1 & 2: Violent Shudder & Tremor ===
  const tremorIntensity = interpolate(
    frame,
    [0, 15, spiralStart, 40, collapseStart, 75, 90],
    [4, 10, 18, 24, 8, 3, 1],
    { extrapolateRight: "clamp" }
  );

  const tremorX = Math.sin(frame * 2.6) * tremorIntensity + Math.cos(frame * 4.1) * (tremorIntensity * 0.4);
  const tremorY = Math.cos(frame * 3.1) * (tremorIntensity * 0.5);

  // === Frantic Tilt Sway during Mental Spiral (Frames 20 - 56) ===
  const spiralTilt = frame >= spiralStart && frame < collapseStart
    ? Math.sin((frame - spiralStart) * 0.55) * 7 + Math.sin(frame * 1.9) * 3
    : frame >= collapseStart
    ? Math.sin((frame - collapseStart) * 0.25) * 1.5
    : 0;

  // === Whole-scene Camera Jolt during Spiral Peak ===
  const camShake = frame >= spiralStart && frame < collapseStart
    ? Math.sin(frame * 3.4) * 5
    : 0;

  // === Collapse Dynamics (Frames 56 - 90) ===
  const collapseSpring = spring({
    frame: frame - collapseStart,
    fps,
    config: { damping: 13, mass: 0.9, stiffness: 100 },
  });

  // Pose selection: shock onset -> crazy flailing & clutching -> defeat slump
  const pose = frame < collapseStart ? (frame >= spiralStart ? "crazy" : "shock") : "defeat";
  const slumpProgress = frame < collapseStart ? 0 : collapseSpring;

  // Facial state
  const eyes = frame < collapseStart ? "shock" : collapseSpring > 0.6 ? "defeat-closed" : "defeat";
  const mouth = frame < collapseStart ? "shock" : "frown";

  // Comic stress elements
  const showSweat = frame >= 12 && frame < 65;
  const showExclamation = frame >= spiralStart && frame < collapseStart;
  const showSigh = frame >= 68;
  const sighFrame = Math.max(0, frame - 68);

  // Base stickman Y drops slightly during collapse
  const stickmanY = 815 + (frame >= collapseStart ? collapseSpring * 22 : 0);

  // Head center in standard stickman is roughly y = 403 (815 - 412)
  const headCenterX = 960 + tremorX;
  const headCenterY = stickmanY - 412 + tremorY;

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Canonical White Grid Background */}
      <GridBackground theme="white" id="grid-s7" />

      {/* Main SVG Visual Stage with camera micro-shake */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `translate(${camShake}px, ${camShake * 0.4}px)`,
        }}
      >
        {/* ============================================================== */}
        {/* 1. RADIATING PANIC / STRESS SPARK LINES (Mental Spiral Phase)  */}
        {/* ============================================================== */}
        {frame >= spiralStart && frame < collapseStart && (
          <g id="stress-sparks" opacity={Math.min(1, (frame - spiralStart) / 6)}>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const flash = (frame + i * 3) % 4 < 2;
              if (!flash) return null;
              const innerR = 95 + ((frame * 2 + i * 11) % 15);
              const outerR = innerR + 24 + ((frame + i * 5) % 18);
              const x1 = headCenterX + Math.cos(rad) * innerR;
              const y1 = headCenterY + Math.sin(rad) * innerR * 0.85;
              const x2 = headCenterX + Math.cos(rad) * outerR;
              const y2 = headCenterY + Math.sin(rad) * outerR * 0.85;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#EF4444"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        )}

        {/* ============================================================== */}
        {/* 2. CANONICAL STICKMAN WITH SPIRAL TILT & TREMOR                */}
        {/* ============================================================== */}
        <g
          transform={`rotate(${spiralTilt} ${960} ${stickmanY})`}
        >
          <CuratedStickman
            x={960}
            y={stickmanY}
            scale={1.05}
            pose={pose}
            frame={frame}
            recoilX={tremorX}
            recoilY={tremorY}
            slumpProgress={slumpProgress}
            eyes={eyes}
            mouth={mouth}
            showSweat={showSweat}
            showExclamation={showExclamation}
            showSigh={showSigh}
            sighFrame={sighFrame}
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
