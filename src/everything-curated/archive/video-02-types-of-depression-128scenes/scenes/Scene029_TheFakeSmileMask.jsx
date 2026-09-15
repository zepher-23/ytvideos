import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 29: The Fake Smile Mask
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Close-up in the office cubicle (#0F172A)
 * - Characters & Props: Stickman bust, cardboard smile mask on stick (Smiley #FDE047)
 * - Beginning: Stickman faces forward, looking dead and grey (frames 0-35).
 * - Action/Climax: Lifts cardboard smile mask on a stick to cover face (frames 38-75).
 * - Ending/Hold: Warm yellow light glows around mask while body remains cold grey to frame 180.
 */
export const Scene029_TheFakeSmileMask = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance zoom-in
  const enterScale = interpolate(frame, [0, 15], [1.3, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 2. Lifting the Cardboard Mask (frames 35 to 75)
  const isLifting = frame >= 35;
  const liftSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Mask position: rises from Y=850 up to cover face at Y=480
  const maskY = interpolate(liftSpring, [0, 1], [850, 480]);
  const maskRotation = interpolate(liftSpring, [0, 1], [-12, 0]);

  // 3. Warm Yellow Mask Glow (frames 70 onwards)
  const isGlowActive = frame >= 70;
  const glowIntensity = interpolate(frame, [70, 95], [0, 28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowPulse = isGlowActive ? Math.sin(frame * 0.12) * 6 : 0;

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Viewport Container */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `scale(${enterScale})`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-yellow-400 uppercase block mb-1">
              PSYCHOLOGICAL COMPARTMENTALIZATION
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
              THE FAKE SMILE MASK
            </h1>
          </div>
        </div>

        {/* Main SVG Stage */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Mask Warm Yellow Halo Filter */}
            <filter id="mask-glow-s29" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation={glowIntensity + glowPulse} floodColor="#FDE047" floodOpacity="0.85" />
            </filter>
            <filter id="card-shadow-s29" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* STICKMAN BUST (Center x=960, y=540) */}
          <g transform="translate(0, 30)">
            <CuratedStickman
              x={960}
              y={540}
              scale={1.45}
              isBust={true}
              variant="adult"
              pose="defeat"
              mouth="flat"
              eyes="defeat"
              lookDirection="center"
              frame={frame}
            />
          </g>

          {/* CARDBOARD SMILE MASK ON WOODEN STICK */}
          {isLifting && (
            <g
              transform={`translate(960, ${maskY}) rotate(${maskRotation})`}
              filter={isGlowActive ? "url(#mask-glow-s29)" : "url(#card-shadow-s29)"}
            >
              {/* Wooden Holding Stick */}
              <rect x="-8" y="70" width="16" height="240" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="3" />

              {/* Hand Holding Stick */}
              <circle cx="0" cy="220" r="18" fill="#000000" />

              {/* Cardboard Square Mask Base */}
              <rect
                x="-120"
                y="-120"
                width="240"
                height="240"
                rx="20"
                fill="#FDE047"
                stroke="#CA8A04"
                strokeWidth="6"
              />

              {/* Cutout Eyeholes (Showing black behind) */}
              <ellipse cx="-45" cy="-30" rx="18" ry="24" fill="#0A0F1D" />
              <ellipse cx="45" cy="-30" rx="18" ry="24" fill="#0A0F1D" />

              {/* Crudely Painted Exaggerated Black Smile */}
              <path
                d="M -65 25 Q 0 85 65 25"
                fill="none"
                stroke="#000000"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Cheek Smile Creases */}
              <line x1="-72" y1="18" x2="-60" y2="34" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
              <line x1="72" y1="18" x2="60" y2="34" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
            </g>
          )}
        </svg>

        {/* Bottom Subtitle Card */}
        <div className="absolute bottom-14 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-10 py-3 rounded-2xl bg-black/95 border border-slate-700 shadow-2xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-300">
              {isGlowActive
                ? "EXTERIOR CAMOUFLAGE: SOCIAL PRESENTATION PRESERVED AT MASSIVE COST"
                : "AFFECTIVE FLATTENING // PREPARING SOCIAL FACADE"}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
