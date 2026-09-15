import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 8: Rapid Cycling Gauge
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Close-up dashboard gauge
 * - Transition: Hard camera whip-pan to the left
 * - Gauge: Semicircular dial spanning Blue (Left, Depression) to Red (Right, Mania)
 * - Beginning: Needle resting calmly in Blue zone.
 * - Action/Climax: Needle goes haywire, spinning rapidly between extreme Blue and Red (frames 25-90).
 * - Ending/Hold: Glass cracks at frame 90, holding with warning status to frame 150.
 */
export const Scene008_RapidCyclingGauge = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Whip-pan entrance to the left (frames 0 to 10)
  const whipX = interpolate(frame, [0, 10], [160, 0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 6], [0.3, 1], { extrapolateRight: "clamp" });

  // 2. Needle angle dynamics:
  // - 0 to 24: calm in Blue zone (-60 degrees)
  // - 25 to 90: violent erratic spasms between -75 and +75
  // - 90+: jammed at extreme red (+72 degrees) with small twitch
  const isHaywire = frame >= 25 && frame < 90;
  const isCracked = frame >= 90;

  let needleAngle = -60;
  if (isHaywire) {
    const t = frame - 25;
    // Chaotic multi-frequency oscillation
    needleAngle = Math.sin(t * 0.7) * 58 + Math.cos(t * 1.3) * 22;
  } else if (isCracked) {
    // Jammed at extreme red with subtle nervous twitch
    needleAngle = 72 + Math.sin(frame * 2.5) * 1.5;
  }

  // Shudder on glass crack impact (frames 90 to 104)
  const crackShudder = isCracked && frame <= 104
    ? Math.sin(frame * 4.5) * interpolate(frame, [90, 104], [10, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Viewport with Whip-pan & Crack Shudder */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `translate(${whipX + crackShudder}px, 0px)`,
          opacity: enterOpacity,
        }}
      >
        {/* Technical Radial Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <radialGradient id="bg-glow-s8" cx="50%" cy="55%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0A0F1D" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-glow-s8)" />
        </svg>

        {/* Top Header */}
        <div className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#1E293B]/90 border border-[#38BDF8]/40 shadow-2xl backdrop-blur-md flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${isHaywire ? "bg-[#EF4444] animate-ping" : isCracked ? "bg-red-500" : "bg-[#38BDF8]"}`} />
            <h1 className="text-white text-3xl md:text-4xl font-black tracking-widest uppercase m-0">
              RAPID CYCLING GAUGE
            </h1>
          </div>
        </div>

        {/* Center Gauge SVG Stage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 1000 800"
            className="w-[940px] h-[750px] overflow-visible pointer-events-none"
          >
            <defs>
              <filter id="gauge-shadow-s8" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="15" floodColor="#000000" floodOpacity="0.8" />
              </filter>
              <filter id="needle-glow-s8" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={needleAngle > 0 ? "#EF4444" : "#38BDF8"} floodOpacity="0.9" />
              </filter>
            </defs>

            {/* Main Dial Outer Housing */}
            <g transform="translate(500, 520)" filter="url(#gauge-shadow-s8)">
              {/* Outer Bezel */}
              <circle cx="0" cy="0" r="340" fill="#111827" stroke="#374151" strokeWidth="12" />
              {/* Inner Face */}
              <circle cx="0" cy="0" r="325" fill="#0F172A" />

              {/* BLUE ARC (Left: Depression, angle -90 to 0) */}
              <path
                d="M -300 0 A 300 300 0 0 1 0 -300"
                fill="none"
                stroke="#2563EB"
                strokeWidth="28"
                strokeLinecap="round"
              />
              {/* RED ARC (Right: Mania, angle 0 to 90) */}
              <path
                d="M 0 -300 A 300 300 0 0 1 300 0"
                fill="none"
                stroke="#DC2626"
                strokeWidth="28"
                strokeLinecap="round"
              />

              {/* Dial Labels */}
              <text x="-180" y="-120" fill="#60A5FA" fontSize="26" fontWeight="900" letterSpacing="2">
                DEPRESSION
              </text>
              <text x="70" y="-120" fill="#F87171" fontSize="26" fontWeight="900" letterSpacing="2">
                MANIA
              </text>

              {/* Graduation Calibration Ticks */}
              {[-80, -60, -40, -20, 0, 20, 40, 60, 80].map((deg) => {
                const rad = (deg - 90) * (Math.PI / 180);
                const x1 = Math.cos(rad) * 260;
                const y1 = Math.sin(rad) * 260;
                const x2 = Math.cos(rad) * 282;
                const y2 = Math.sin(rad) * 282;
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={deg < 0 ? "#60A5FA" : deg > 0 ? "#F87171" : "#FFFFFF"}
                    strokeWidth={deg === 0 ? "5" : "3"}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* THE NEEDLE */}
              <g transform={`rotate(${needleAngle})`} filter="url(#needle-glow-s8)">
                {/* Needle Pointer */}
                <polygon
                  points="-8,20 0,-275 8,20"
                  fill={needleAngle > 10 ? "#EF4444" : "#38BDF8"}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
                <circle cx="0" cy="0" r="28" fill="#1F2937" stroke="#FFFFFF" strokeWidth="4" />
                <circle cx="0" cy="0" r="12" fill={needleAngle > 10 ? "#EF4444" : "#38BDF8"} />
              </g>

              {/* GLASS CRACK EFFECT (frame 90+) */}
              {isCracked && (
                <g stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9">
                  {/* Impact Center Point (x: 180, y: -160) */}
                  <line x1="180" y1="-160" x2="220" y2="-210" />
                  <line x1="180" y1="-160" x2="130" y2="-120" />
                  <line x1="130" y1="-120" x2="60" y2="-150" />
                  <line x1="60" y1="-150" x2="-20" y2="-130" />
                  <line x1="180" y1="-160" x2="250" y2="-110" />
                  <line x1="250" y1="-110" x2="310" y2="-70" />
                  <line x1="180" y1="-160" x2="160" y2="-90" />
                  <line x1="160" y1="-90" x2="190" y2="-30" />
                  <line x1="130" y1="-120" x2="90" y2="-60" />
                  <line x1="220" y1="-210" x2="270" y2="-230" />
                  {/* Secondary splinter hair lines */}
                  <line x1="150" y1="-140" x2="140" y2="-180" strokeWidth="1.5" />
                  <line x1="210" y1="-135" x2="240" y2="-170" strokeWidth="1.5" />
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* Bottom Alert Banner */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div
            className={`px-8 py-3.5 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${
              isCracked
                ? "bg-red-950/90 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.7)]"
                : isHaywire
                ? "bg-amber-950/90 border-amber-500 animate-pulse"
                : "bg-blue-950/90 border-blue-500"
            }`}
          >
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase">
              {isCracked
                ? "CRITICAL FAILURE // GLASS COMPROMISED // RAPID CYCLING"
                : isHaywire
                ? "WARNING: UNSTABLE OSCILLATION DETECTED"
                : "MONITORING POLARITY STABILITY"}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
