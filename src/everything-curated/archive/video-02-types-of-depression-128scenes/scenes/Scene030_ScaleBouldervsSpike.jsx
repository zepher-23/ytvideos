import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 30: Scale - Boulder vs. Spike
 * Duration: 8 seconds (240 frames)
 * 
 * - Environment: Clean solid pale background (#F8FAFC)
 * - Characters & Props: Balanced scale, slate grey boulder (#64748B), sharp red spike (#DC2626)
 * - Beginning: Scale sits balanced. "SEVERITY" on right, "CHRONICITY" on left (frames 0-35).
 * - Action/Climax: Massive boulder drops onto left pan (frame 38). Small sharp red spike drops on right pan (frame 52).
 *   Scale violently tips DOWN on boulder side with heavy shudder.
 * - Ending/Hold: Overwhelmed scale holds tilted to frame 240.
 */
export const Scene030_ScaleBouldervsSpike = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance squash transition
  const enterScale = interpolate(frame, [0, 15], [1.3, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 2. Boulder Drop (left, drops frame 36 to 44)
  const isBoulderDropping = frame >= 36;
  const boulderSpring = spring({
    frame: frame - 36,
    fps,
    config: { damping: 9, stiffness: 220, mass: 1.6 },
  });
  const boulderY = interpolate(boulderSpring, [0, 1], [-260, 0]);

  // 3. Red Spike Drop (right, drops frame 50 to 58)
  const isSpikeDropping = frame >= 50;
  const spikeSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const spikeY = interpolate(spikeSpring, [0, 1], [-200, 0]);

  // 4. Scale Balance Beam Rotation Dynamics:
  // - 0 to 42: balanced (0 deg)
  // - 42+: boulder hits left pan, tilting down (left down = -22 deg)
  const isBeamTilting = frame >= 42;
  const tiltSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 10, stiffness: 140, mass: 2.0 },
  });
  const beamAngle = interpolate(tiltSpring, [0, 1], [0, -22]);

  // Metallic shudder on heavy impact
  const shudder = isBeamTilting && frame <= 78
    ? Math.sin(frame * 4.2) * interpolate(frame, [42, 78], [8, 0], { extrapolateRight: "clamp" })
    : 0;

  // Pan coordinates calculated from beam rotation
  // Beam length: 320px each side from center fulcrum (960, 440)
  const beamLen = 300;
  const rad = ((beamAngle + shudder) * Math.PI) / 180;
  const leftPanX = 960 - Math.cos(rad) * beamLen;
  const leftPanY = 440 - Math.sin(rad) * beamLen;
  const rightPanX = 960 + Math.cos(rad) * beamLen;
  const rightPanY = 440 + Math.sin(rad) * beamLen;

  return (
    <AbsoluteFill className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-[#1E293B]">
      {/* Background Subtle Architect Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
        <defs>
          <pattern id="grid-s30" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0F172A" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s30)" />
      </svg>

      {/* Viewport Container */}
      <div
        className="w-full h-full relative pointer-events-none"
        style={{
          transform: `scale(${enterScale})`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-white border-2 border-slate-300 shadow-xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-slate-500 uppercase block mb-1">
              BURDEN COMPARISON ANALYSIS
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none text-[#1E293B]">
              CHRONICITY VS. ACUTE INTENSITY
            </h1>
          </div>
        </div>

        {/* Main Scale SVG Stage */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <filter id="scale-shadow-s30" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* FULCRUM PILLAR BASE (Center 960, 440 down to 880) */}
          <g filter="url(#scale-shadow-s30)">
            {/* Triangular Fulcrum Head */}
            <polygon points="960,420 930,470 990,470" fill="#334155" stroke="#1E293B" strokeWidth="4" />
            <circle cx="960" cy="440" r="16" fill="#64748B" stroke="#0F172A" strokeWidth="4" />
            {/* Center Mast Column */}
            <rect x="948" y="465" width="24" height="380" fill="#475569" stroke="#1E293B" strokeWidth="4" />
            {/* Heavy Base Plate */}
            <rect x="840" y="845" width="240" height="35" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="4" />
          </g>

          {/* ROTATING BALANCE CROSSBEAM */}
          <g
            transform={`translate(960, 440) rotate(${beamAngle + shudder})`}
            filter="url(#scale-shadow-s30)"
          >
            {/* Steel Crossbeam Bar */}
            <rect x="-310" y="-12" width="620" height="24" rx="8" fill="#475569" stroke="#0F172A" strokeWidth="5" />
            {/* Center Pivot Pivot Ring */}
            <circle cx="0" cy="0" r="22" fill="#334155" stroke="#0F172A" strokeWidth="4" />
            {/* Left & Right End Hooks */}
            <circle cx="-300" cy="0" r="10" fill="#1E293B" />
            <circle cx="300" cy="0" r="10" fill="#1E293B" />
          </g>

          {/* LEFT HANGING PAN (CHRONICITY - Heavy Boulder) */}
          <g transform={`translate(${leftPanX}, ${leftPanY})`} filter="url(#scale-shadow-s30)">
            {/* Suspension Strings */}
            <line x1="0" y1="0" x2="-90" y2="170" stroke="#64748B" strokeWidth="3" />
            <line x1="0" y1="0" x2="90" y2="170" stroke="#64748B" strokeWidth="3" />
            {/* Brass Pan Dish */}
            <path d="M -110 170 C -100 220 100 220 110 170 Z" fill="#D97706" stroke="#92400E" strokeWidth="4" />

            {/* MASSIVE SMOOTH GREY BOULDER (#64748B) */}
            {isBoulderDropping && (
              <g transform={`translate(0, ${150 + boulderY})`}>
                <polygon
                  points="-80,-60 -30,-95 40,-90 85,-40 70,25 -20,30 -75,0"
                  fill="#64748B"
                  stroke="#334155"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
                <text x="0" y="-20" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" letterSpacing="2">
                  CHRONICITY
                </text>
              </g>
            )}

            {/* Label Below Left Pan */}
            <g transform="translate(0, 245)">
              <rect x="-85" y="-16" width="170" height="32" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#E2E8F0" fontSize="13" fontWeight="900" letterSpacing="1">
                YEARS OF BURDEN
              </text>
            </g>
          </g>

          {/* RIGHT HANGING PAN (SEVERITY - Small Sharp Spike) */}
          <g transform={`translate(${rightPanX}, ${rightPanY})`} filter="url(#scale-shadow-s30)">
            {/* Suspension Strings */}
            <line x1="0" y1="0" x2="-90" y2="170" stroke="#64748B" strokeWidth="3" />
            <line x1="0" y1="0" x2="90" y2="170" stroke="#64748B" strokeWidth="3" />
            {/* Brass Pan Dish */}
            <path d="M -110 170 C -100 220 100 220 110 170 Z" fill="#D97706" stroke="#92400E" strokeWidth="4" />

            {/* SMALL SHARP RED SPIKE (#DC2626) */}
            {isSpikeDropping && (
              <g transform={`translate(0, ${165 + spikeY})`}>
                <polygon
                  points="0,-45 -18,12 18,12"
                  fill="#DC2626"
                  stroke="#7F1D1D"
                  strokeWidth="3"
                />
                <text x="0" y="32" textAnchor="middle" fill="#DC2626" fontSize="14" fontWeight="900" letterSpacing="1">
                  ACUTE PEAK
                </text>
              </g>
            )}

            {/* Label Below Right Pan */}
            <g transform="translate(0, 245)">
              <rect x="-75" y="-16" width="150" height="32" rx="8" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="900" letterSpacing="1">
                ACUTE SEVERITY
              </text>
            </g>
          </g>
        </svg>

        {/* Bottom Subtitle Card */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-10 py-3 rounded-2xl bg-white border-2 border-slate-400 shadow-xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-800">
              {isBeamTilting
                ? "TOTAL DISABILITY: CHRONIC CONTINUITY SIGNIFICANTLY OUTWEIGHS EPISODIC PEAKS"
                : "EVALUATING CLINICAL BURDEN: SEVERITY VS. DURATION"}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
