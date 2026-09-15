import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 24: Title - PDD (Dysthymia)
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Clean, solid off-white background (#F8FAFC)
 * - Transition: Calendar drops off screen, screen fades to white
 * - Beginning: Blank screen (frames 0-10).
 * - Action/Climax: Text "2. PERSISTENT DEPRESSIVE DISORDER" types cleanly onto screen.
 *   Below it, "(DYSTHYMIA)" fades in with a purple badge (#A855F7).
 * - Ending/Hold: Text holds steady to frame 150.
 */
export const Scene024_TitlePDDDysthymia = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Fade-in from white
  const fadeWhite = interpolate(frame, [0, 8, 16], [1, 0.5, 0], { extrapolateRight: "clamp" });

  // 2. Main Title Typewriter: "2. PERSISTENT DEPRESSIVE DISORDER" (frames 12 to 55)
  const fullTitle = "2. PERSISTENT DEPRESSIVE DISORDER";
  const titleChars = Math.floor(interpolate(frame, [12, 55], [0, fullTitle.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));
  const displayedTitle = fullTitle.slice(0, titleChars);
  const showCursor = frame < 65 ? Math.floor(frame / 6) % 2 === 0 : false;

  // 3. Subtitle "(DYSTHYMIA)" Entrance (frames 60 to 90)
  const subSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 13, stiffness: 160 },
  });
  const subAlpha = interpolate(frame, [60, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-[#1E293B]">
      {/* White Flash Transition Layer */}
      {fadeWhite > 0 && (
        <div className="absolute inset-0 bg-white pointer-events-none z-30" style={{ opacity: fadeWhite }} />
      )}

      {/* Subtle Background Grid Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
        <defs>
          <pattern id="grid-s24" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0F172A" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s24)" />
      </svg>

      {/* Top Category Pill Badge */}
      <div
        className="absolute top-20 left-0 right-0 flex justify-center items-center pointer-events-none"
        style={{
          opacity: interpolate(frame, [8, 18], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div className="px-8 py-2.5 rounded-full bg-purple-100 border border-purple-300 shadow-sm">
          <span className="text-purple-800 font-mono text-xs md:text-sm font-black tracking-widest uppercase">
            PATHOLOGY CLASSIFICATION // 02 // CHRONIC
          </span>
        </div>
      </div>

      {/* Main Title Center Stage */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8 text-center">
        {/* Main Title Typography */}
        <div className="min-h-[140px] flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-tight m-0 text-[#1E293B]">
            {displayedTitle}
            {showCursor && <span className="text-[#A855F7]">|</span>}
          </h1>
        </div>

        {/* Subtitle: "(DYSTHYMIA)" Badge */}
        <div
          className="mt-6"
          style={{
            opacity: subAlpha,
            transform: `scale(${interpolate(subSpring, [0, 1], [0.85, 1])})`,
          }}
        >
          <div className="px-10 py-4 rounded-2xl bg-purple-600 text-white shadow-[0_10px_30px_rgba(168,85,247,0.35)] flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-black tracking-widest uppercase font-mono">
              (DYSTHYMIA)
            </span>
          </div>
        </div>

        {/* Bottom Technical Description Line */}
        {frame >= 85 && (
          <div className="mt-8 text-[#64748B] font-mono text-sm md:text-base font-bold tracking-widest uppercase">
            LOW-GRADE CHRONIC BASELINE // MULTI-YEAR PERVADING GLOOM
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
