import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 14: System Switch Off
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Inside a dark outline of a brain
 * - Characters & Props: Large industrial electrical switch box with lever
 * - Beginning: Switch is UP, emitting a warm yellow glow (#FBBF24) (frames 0-50).
 * - Action/Climax: Heavy lever violently yanked DOWN (frame 55). Yellow glow
 *   instantly extinguishes, plunging scene into cold dark grey (#475569).
 * - Ending/Hold: Red LED text reads "OFF" on switch box to frame 210.
 */
export const Scene014_SystemSwitchOff = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance zoom-out
  const enterScale = interpolate(frame, [0, 15], [1.3, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Heavy Lever Yank Down (triggers at frame 54)
  const isYanked = frame >= 54;
  const leverSpring = spring({
    frame: frame - 54,
    fps,
    config: { damping: 10, stiffness: 220, mass: 1.4 },
  });

  // Lever rotation: -35 deg (UP) to +40 deg (DOWN)
  const leverAngle = interpolate(leverSpring, [0, 1], [-35, 40]);

  // Lever impact shudder (frames 58 to 72)
  const shudder = isYanked && frame <= 72
    ? Math.sin(frame * 4.2) * interpolate(frame, [58, 72], [9, 0], { extrapolateRight: "clamp" })
    : 0;

  // 3. Lighting state:
  // - Warm yellow (#FBBF24) glow before frame 56
  // - Cold dark grey (#475569) after frame 56
  const glowActive = frame < 56;
  const coldOpacity = interpolate(frame, [56, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. Red LED "OFF" readout (appears after switch is down, frame 60+)
  const ledBlink = frame >= 60 ? (Math.floor(frame / 8) % 2 === 0 ? 1 : 0.8) : 0;

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Background Brain Wireframe Silhouette */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <path
          d="M 960 120
             C 650 120 400 300 380 540
             C 360 760 520 920 740 960
             L 760 1020 L 1160 1020 L 1180 960
             C 1400 920 1560 760 1540 540
             C 1520 300 1270 120 960 120 Z"
          fill="none"
          stroke={glowActive ? "#FBBF24" : "#475569"}
          strokeWidth="3"
          strokeDasharray="6 4"
        />
      </svg>

      {/* Warm Ambient Glow Radial before switch off */}
      {glowActive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.25) 0%, transparent 65%)",
          }}
        />
      )}

      {/* Cold Grey Overlay after switch off */}
      <div
        className="absolute inset-0 bg-[#0F172A]/85 pointer-events-none"
        style={{ opacity: coldOpacity }}
      />

      {/* Main Viewport Container */}
      <div
        className="w-full h-full relative flex items-center justify-center pointer-events-none"
        style={{
          transform: `scale(${enterScale}) translate(0px, ${shudder}px)`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div
            className={`px-10 py-3.5 rounded-2xl shadow-2xl border-2 backdrop-blur-md text-center transition-colors duration-200 ${
              glowActive
                ? "bg-[#1E293B]/90 border-[#FBBF24] shadow-[0_0_40px_rgba(251,191,36,0.5)]"
                : "bg-[#18181B]/95 border-[#475569]"
            }`}
          >
            <h1 className="text-3xl md:text-5xl font-black tracking-widest uppercase m-0 leading-none">
              {glowActive ? "NEUROCHEMICAL SYSTEM: ACTIVE" : "SYSTEM SWITCHED OFF"}
            </h1>
          </div>
        </div>

        {/* Heavy Industrial Electrical Switch Box SVG */}
        <svg
          viewBox="0 0 800 800"
          className="w-[740px] h-[740px] overflow-visible"
        >
          <defs>
            <filter id="box-shadow-s14" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.85" />
            </filter>
            <filter id="yellow-bulb-glow-s14" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="25" floodColor="#FBBF24" floodOpacity="1" />
            </filter>
          </defs>

          {/* Heavy Steel Electrical Enclosure (Center 400, 420) */}
          <g filter="url(#box-shadow-s14)">
            {/* Outer Box Enclosure */}
            <rect x="220" y="160" width="360" height="500" rx="24" fill="#1E293B" stroke="#475569" strokeWidth="8" />
            {/* Inner Face Inset */}
            <rect x="250" y="190" width="300" height="440" rx="16" fill="#0F172A" stroke="#334155" strokeWidth="4" />

            {/* Corner Bolts */}
            <circle cx="245" cy="185" r="8" fill="#64748B" />
            <circle cx="555" cy="185" r="8" fill="#64748B" />
            <circle cx="245" cy="635" r="8" fill="#64748B" />
            <circle cx="555" cy="635" r="8" fill="#64748B" />

            {/* Indicator Light at Top */}
            <g transform="translate(400, 250)">
              {glowActive ? (
                /* Warm Yellow ON Light */
                <g filter="url(#yellow-bulb-glow-s14)">
                  <circle cx="0" cy="0" r="28" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="4" />
                  <circle cx="0" cy="0" r="14" fill="#FEF08A" />
                </g>
              ) : (
                /* Dead Cold Light */
                <circle cx="0" cy="0" r="28" fill="#334155" stroke="#475569" strokeWidth="4" />
              )}
            </g>

            {/* Lever Pivot Hub (Center 400, 420) */}
            <g transform="translate(400, 420)">
              {/* Backplate Slot Arc */}
              <path d="M -80 -70 A 110 110 0 0 1 80 80" fill="none" stroke="#1E293B" strokeWidth="24" strokeLinecap="round" />

              {/* HEAVY INDUSTRIAL LEVER ARM */}
              <g transform={`rotate(${leverAngle})`}>
                {/* Pivot Round Base */}
                <circle cx="0" cy="0" r="42" fill="#334155" stroke="#64748B" strokeWidth="5" />
                {/* Iron Lever Bar */}
                <rect x="-16" y="-190" width="32" height="190" rx="10" fill="#475569" stroke="#94A3B8" strokeWidth="4" />
                {/* Heavy Grip Handle */}
                <rect
                  x="-26"
                  y="-225"
                  width="52"
                  height="55"
                  rx="12"
                  fill={glowActive ? "#D97706" : "#18181B"}
                  stroke="#CBD5E1"
                  strokeWidth="4"
                />
              </g>
            </g>

            {/* RED LED READOUT BOX at Bottom */}
            <g transform="translate(400, 565)">
              <rect x="-90" y="-22" width="180" height="44" rx="10" fill="#000000" stroke="#334155" strokeWidth="3" />
              {frame >= 56 ? (
                <text
                  x="0"
                  y="9"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="28"
                  fontFamily="monospace"
                  fontWeight="900"
                  letterSpacing="6"
                  style={{
                    opacity: ledBlink,
                    filter: "drop-shadow(0 0 8px #EF4444)",
                  }}
                >
                  OFF
                </text>
              ) : (
                <text
                  x="0"
                  y="9"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="28"
                  fontFamily="monospace"
                  fontWeight="900"
                  letterSpacing="6"
                  style={{
                    filter: "drop-shadow(0 0 8px #FBBF24)",
                  }}
                >
                  ON
                </text>
              )}
            </g>
          </g>
        </svg>

        {/* Bottom Subtitle Card */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-8 py-3 rounded-2xl bg-black/90 border border-slate-700 shadow-2xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-300">
              {frame >= 56
                ? "CATABOLIC DOWN-REGULATION // COMPLETE SHUTDOWN"
                : "BASELINE ENERGY FLOW ACTIVE"}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
