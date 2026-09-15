import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 13: Baseline Flatline
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Solid yellow warning background (#FEF08A)
 * - Transition: Background shifts from off-white to yellow
 * - Beginning: Text "1. MAJOR DEPRESSIVE DISORDER" remains centered
 * - Action/Climax: The EKG heartbeat line violently snaps flat into a thick,
 *   dead-black horizontal line across the screen with impact shudder (frame 35-50).
 * - Ending/Hold: Text pulses with a soft warning-red glow to frame 180.
 */
export const Scene013_BaselineFlatline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Color shift transition from off-white to Warning Yellow
  const bgYellowOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  // 2. Violent EKG Snap to Dead Flatline (triggers at frame 38)
  const isSnapped = frame >= 38;
  const snapProgress = interpolate(frame, [38, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Impact Shudder on snap
  const shudder = isSnapped && frame <= 60
    ? Math.sin(frame * 4.5) * interpolate(frame, [38, 60], [12, 0], { extrapolateRight: "clamp" })
    : 0;

  // 3. Warning Red Glow Pulse on text (frame 65 onwards)
  const redPulse = frame > 65 ? Math.sin(frame * 0.15) * 0.5 + 0.5 : 0;

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans" style={{ backgroundColor: "#FEF08A" }}>
      {/* Background Yellow Transition layer */}
      <div
        className="absolute inset-0 bg-[#FEF08A]"
        style={{ opacity: bgYellowOpacity }}
      />

      {/* Warning Hazard Diagonal Stripes along Top & Bottom Borders */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-black/85" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/85" />

      {/* Main Viewport Container with Shudder */}
      <div
        className="w-full h-full relative flex flex-col justify-between items-center py-20 pointer-events-none"
        style={{ transform: `translate(0px, ${shudder}px)` }}
      >
        {/* Category Header */}
        <div className="px-8 py-2.5 rounded-full bg-black/90 border border-black shadow-md">
          <span className="text-[#FEF08A] font-mono text-xs md:text-sm font-black tracking-widest uppercase">
            PATHOLOGY CLASSIFICATION // 01 // ALERT
          </span>
        </div>

        {/* Title: "1. MAJOR DEPRESSIVE DISORDER" with Soft Warning-Red Glow Pulse */}
        <div className="text-center px-8 z-10">
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-tight m-0 text-black"
            style={{
              textShadow: redPulse > 0
                ? `0 0 ${20 * redPulse}px rgba(220, 38, 38, ${redPulse * 0.85})`
                : "none",
            }}
          >
            1. MAJOR DEPRESSIVE DISORDER
          </h1>
          <p className="text-xl md:text-2xl font-mono font-black tracking-widest text-black/80 mt-3 uppercase">
            ACUTE AFFECTIVE COLLAPSE // COMPLETE LOSS OF VITALITY
          </p>
        </div>

        {/* Bottom Dead-Black Flatline Stage */}
        <div className="w-full h-[180px] relative flex items-center justify-center">
          <svg
            viewBox="0 0 1920 180"
            className="w-full h-full overflow-visible"
          >
            {!isSnapped ? (
              /* Residual EKG pulses before snapping */
              <path
                d="M 0 90
                   L 600 90
                   L 620 30
                   L 650 150
                   L 680 15
                   L 710 110
                   L 730 90
                   L 1150 90
                   L 1170 30
                   L 1200 150
                   L 1230 15
                   L 1260 110
                   L 1280 90
                   L 1920 90"
                fill="none"
                stroke="#000000"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              /* Snapped Dead Flatline (#000000) */
              <g>
                <line
                  x1="0"
                  y1="90"
                  x2="1920"
                  y2="90"
                  stroke="#000000"
                  strokeWidth="24"
                  strokeLinecap="square"
                />
                {/* Secondary Deadline Shadow */}
                <line
                  x1="0"
                  y1="96"
                  x2="1920"
                  y2="96"
                  stroke="#DC2626"
                  strokeWidth="4"
                  opacity={redPulse}
                />
              </g>
            )}
          </svg>

          {/* Warning Stamp at Flatline center */}
          {isSnapped && (
            <div className="absolute top-1/2 -translate-y-1/2 px-8 py-2.5 rounded-xl bg-black border-2 border-red-600 shadow-2xl">
              <span className="text-red-500 font-mono text-sm md:text-base font-black tracking-widest uppercase">
                [FLATLINE: ZERO MOTIVATIONAL OUTPUT]
              </span>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
