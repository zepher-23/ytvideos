import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 16: Sensory Depletion
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Close-up zoom on stickman in slate grey space
 * - Beginning: Grey icons of pizza and music note float near stickman (frames 0-35).
 * - Action/Climax: Pizza morphs into cracked rock; music note into broken silent speaker.
 *   Stickman reaches forward (frame 40), but they disintegrate into grey dust particles (frames 65-105).
 * - Ending/Hold: Only the isolated stickman remains to frame 180.
 */
export const Scene016_SensoryDepletion = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance zoom-in
  const enterScale = interpolate(frame, [0, 15], [0.92, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Reaching motion of stickman (frames 38 to 70)
  const reachProgress = interpolate(frame, [38, 70], [0, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. Morph & Disintegration:
  // - Morph into rock and broken speaker: frames 35 to 55
  // - Disintegration burst: frame 65 onwards
  const isDisintegrated = frame >= 65;
  const dustProgress = interpolate(frame, [65, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dustOpacity = interpolate(frame, [65, 75, 115], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Solid icons fade out as dust expands
  const iconSolidAlpha = isDisintegrated
    ? interpolate(frame, [65, 75], [1, 0], { extrapolateRight: "clamp" })
    : 1;

  return (
    <AbsoluteFill className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-[#0F172A]">
      {/* Subtle Dark Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(100, 116, 139, 0.15) 100%)",
        }}
      />

      {/* Main Viewport Container */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `scale(${enterScale})`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-white/95 border-2 border-slate-300 shadow-xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-slate-500 uppercase block mb-1">
              NEUROCHEMICAL REALITY // SENSORY BLUNTING
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none text-[#1E293B]">
              SENSORY DEPLETION
            </h1>
          </div>
        </div>

        {/* Main SVG Stage */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          {/* STICKMAN BUST (Center 960, 540) */}
          <g transform="translate(0, 40)">
            <CuratedStickman
              x={960}
              y={540}
              scale={1.4}
              isBust={true}
              variant="adult"
              pose={reachProgress > 0.1 ? "reaching" : "defeat"}
              reachDirection="right"
              reachProgress={reachProgress}
              mouth="frown"
              eyes="defeat"
              lookDirection="right"
              frame={frame}
            />
          </g>

          {/* LEFT ICON: CRACKED ROCK (Former Pizza, x=620, y=480) */}
          {!isDisintegrated || dustProgress < 1 ? (
            <g transform="translate(620, 480)">
              {/* Solid Morphed Rock */}
              <g opacity={iconSolidAlpha}>
                <circle cx="0" cy="0" r="70" fill="#E2E8F0" stroke="#64748B" strokeWidth="4" />
                {/* Dry Cracked Rock Shape */}
                <polygon
                  points="-35,-20 -15,-42 25,-35 45,0 30,35 -15,40 -40,15"
                  fill="#64748B"
                  stroke="#334155"
                  strokeWidth="3.5"
                />
                {/* Surface Cracks */}
                <line x1="-15" y1="-20" x2="10" y2="15" stroke="#1E293B" strokeWidth="2.5" />
                <line x1="10" y1="15" x2="25" y2="5" stroke="#1E293B" strokeWidth="2" />
              </g>

              {/* Dust Particles Burst on Disintegration */}
              {isDisintegrated && (
                <g opacity={dustOpacity}>
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
                    const rad = (deg * Math.PI) / 180;
                    const dist = 30 + dustProgress * (90 + (i % 3) * 30);
                    return (
                      <circle
                        key={`dust-l-${i}`}
                        cx={Math.cos(rad) * dist}
                        cy={Math.sin(rad) * dist}
                        r={4 - dustProgress * 2.5}
                        fill="#64748B"
                      />
                    );
                  })}
                </g>
              )}
            </g>
          ) : null}

          {/* RIGHT ICON: BROKEN SPEAKER (Former Music, x=1300, y=480) */}
          {!isDisintegrated || dustProgress < 1 ? (
            <g transform="translate(1300, 480)">
              {/* Solid Broken Silent Speaker */}
              <g opacity={iconSolidAlpha}>
                <circle cx="0" cy="0" r="70" fill="#E2E8F0" stroke="#64748B" strokeWidth="4" />
                {/* Speaker Silhouette */}
                <path
                  d="M -26 -16 L -10 -16 L 14 -32 L 14 32 L -10 16 L -26 16 Z"
                  fill="#64748B"
                  stroke="#334155"
                  strokeWidth="3.5"
                />
                {/* Red Broken/Muted "X" */}
                <line x1="22" y1="-14" x2="38" y2="14" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
                <line x1="38" y1="-14" x2="22" y2="14" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
              </g>

              {/* Dust Particles Burst on Disintegration */}
              {isDisintegrated && (
                <g opacity={dustOpacity}>
                  {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => {
                    const rad = (deg * Math.PI) / 180;
                    const dist = 30 + dustProgress * (90 + (i % 3) * 30);
                    return (
                      <circle
                        key={`dust-r-${i}`}
                        cx={Math.cos(rad) * dist}
                        cy={Math.sin(rad) * dist}
                        r={4 - dustProgress * 2.5}
                        fill="#64748B"
                      />
                    );
                  })}
                </g>
              )}
            </g>
          ) : null}
        </svg>

        {/* Bottom Subtitle Card */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-10 py-3 rounded-2xl bg-white/90 border border-slate-300 shadow-xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-700">
              {frame >= 75
                ? "STIMULI DECONSTRUCTED // PLEASURE SIGNAL NULLIFIED"
                : "ATTEMPTING CONTACT WITH REWARD SIGNAL"}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
