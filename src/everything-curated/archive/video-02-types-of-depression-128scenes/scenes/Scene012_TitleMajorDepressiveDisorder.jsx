import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 12: Title - Major Depressive Disorder
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Clean, solid off-white background (#F8FAFC)
 * - Transition: Sharp zoom-in through one node turning screen white
 * - Beginning: Screen is blank (frames 0-10).
 * - Action/Climax: Text "1. MAJOR DEPRESSIVE DISORDER" types word by word.
 * - Ending/Hold: Thick black horizontal EKG heartbeat line draws underneath to frame 150.
 */
export const Scene012_TitleMajorDepressiveDisorder = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Sharp zoom-in transition turning white (frames 0 to 12)
  const flashOpacity = interpolate(frame, [0, 8, 16], [1, 0.4, 0], { extrapolateRight: "clamp" });

  // 2. Word-by-word reveal:
  // Words: ["1.", "MAJOR", "DEPRESSIVE", "DISORDER"]
  const words = ["1.", "MAJOR", "DEPRESSIVE", "DISORDER"];
  const wordDelays = [14, 26, 42, 58];

  // 3. Horizontal EKG heartbeat line draws underneath (frames 70 to 120)
  const ekgProgress = interpolate(frame, [70, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#F8FAFC] overflow-hidden select-none font-sans">
      {/* Sharp Flash on Transition */}
      {flashOpacity > 0 && (
        <div
          className="absolute inset-0 bg-white pointer-events-none z-30"
          style={{ opacity: flashOpacity }}
        />
      )}

      {/* Subtle Architectural Grid Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
        <defs>
          <pattern id="grid-s12" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0F172A" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s12)" />
      </svg>

      {/* Category Pill Tag at Top */}
      <div
        className="absolute top-20 left-0 right-0 flex justify-center items-center pointer-events-none"
        style={{
          opacity: interpolate(frame, [10, 20], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div className="px-8 py-2.5 rounded-full bg-[#E2E8F0] border border-[#CBD5E1] shadow-sm">
          <span className="text-[#475569] font-mono text-xs md:text-sm font-black tracking-widest uppercase">
            PATHOLOGY CLASSIFICATION // 01
          </span>
        </div>
      </div>

      {/* Main Title Center Stage (Word by Word) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 max-w-5xl text-center">
          {words.map((w, idx) => {
            const wordSpring = spring({
              frame: frame - wordDelays[idx],
              fps,
              config: { damping: 13, stiffness: 160 },
            });
            const wordAlpha = interpolate(frame, [wordDelays[idx], wordDelays[idx] + 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <span
                key={idx}
                className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1E293B] uppercase leading-none inline-block"
                style={{
                  opacity: wordAlpha,
                  transform: `scale(${interpolate(wordSpring, [0, 1], [0.85, 1])})`,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>

        {/* EKG Heartbeat Line SVG Stage */}
        <div className="w-[1000px] h-[120px] mt-10 relative">
          <svg
            viewBox="0 0 1000 120"
            className="w-full h-full overflow-visible"
          >
            <defs>
              <clipPath id="ekg-clip-s12">
                <rect x="0" y="0" width={1000 * ekgProgress} height="120" />
              </clipPath>
            </defs>

            {/* Inactive guide track */}
            <line x1="0" y1="60" x2="1000" y2="60" stroke="#E2E8F0" strokeWidth="4" />

            {/* Thick Black EKG Heartbeat Line (#1E293B) */}
            <g clipPath="url(#ekg-clip-s12)">
              <path
                d="M 0 60
                   L 260 60
                   L 300 60
                   L 320 20
                   L 350 105
                   L 380 5
                   L 410 75
                   L 430 60
                   L 550 60
                   L 570 20
                   L 600 105
                   L 630 5
                   L 660 75
                   L 680 60
                   L 1000 60"
                fill="none"
                stroke="#1E293B"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
