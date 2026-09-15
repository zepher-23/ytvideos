import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 34: Title - Bipolar Depression
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Clean, solid off-white background (#F8FAFC)
 * - Transition: Fast scale-out, transition to white
 * - Beginning: Blank screen (frames 0-10).
 * - Action/Climax: Text "3. BIPOLAR DEPRESSION" types cleanly onto screen (frames 12-45).
 * - Ending/Hold: Thick black line draws underneath to frame 150.
 */
export const Scene034_TitleBipolarDepression = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. White Flash entrance
  const whiteFlash = interpolate(frame, [0, 8, 16], [1, 0.4, 0], { extrapolateRight: "clamp" });

  // 2. Typewriter for "3. BIPOLAR DEPRESSION" (frames 12 to 48)
  const fullTitle = "3. BIPOLAR DEPRESSION";
  const titleChars = Math.floor(interpolate(frame, [12, 48], [0, fullTitle.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));
  const displayedTitle = fullTitle.slice(0, titleChars);
  const showCursor = frame < 60 ? Math.floor(frame / 6) % 2 === 0 : false;

  // 3. Thick Black Horizontal Line draws underneath (frames 50 to 90)
  const lineProgress = interpolate(frame, [50, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-[#1E293B]">
      {/* Flash Transition */}
      {whiteFlash > 0 && (
        <div className="absolute inset-0 bg-white pointer-events-none z-30" style={{ opacity: whiteFlash }} />
      )}

      {/* Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
        <defs>
          <pattern id="grid-s34" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0F172A" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s34)" />
      </svg>

      {/* Top Category Badge */}
      <div
        className="absolute top-20 left-0 right-0 flex justify-center items-center pointer-events-none"
        style={{
          opacity: interpolate(frame, [8, 18], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div className="px-8 py-2.5 rounded-full bg-blue-100 border border-blue-300 shadow-sm flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span className="text-blue-900 font-mono text-xs md:text-sm font-black tracking-widest uppercase">
            PATHOLOGY CLASSIFICATION // 03 // BIPHASIC
          </span>
        </div>
      </div>

      {/* Main Title Center Stage */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8 text-center">
        <div className="min-h-[140px] flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none m-0 text-[#1E293B]">
            {displayedTitle}
            {showCursor && <span className="text-blue-600">|</span>}
          </h1>
        </div>

        {/* Thick Black Line Underneath */}
        <div className="w-[840px] h-3 bg-[#E2E8F0] rounded-full overflow-hidden mt-6">
          <div
            className="h-full bg-[#1E293B] rounded-full transition-all duration-75"
            style={{ width: `${lineProgress * 100}%` }}
          />
        </div>

        {/* Dual Polarity Indicators */}
        {frame >= 70 && (
          <div className="mt-8 flex items-center gap-6">
            <span className="px-6 py-2 rounded-xl bg-red-100 text-red-800 font-mono text-sm font-black uppercase border border-red-300">
              [+] MANIC EXCITEMENT
            </span>
            <span className="text-slate-400 font-mono text-sm font-black">
              ⇄
            </span>
            <span className="px-6 py-2 rounded-xl bg-blue-100 text-blue-800 font-mono text-sm font-black uppercase border border-blue-300">
              [-] DEPRESSIVE AGONY
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
