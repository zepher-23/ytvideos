import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 50: Triggering Mania
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Industrial dashboard telemetry view (#0B1120).
 * - Characters & Props: Semicircular dial gauge (Depression to Mania), needle pegged hard in Mania zone,
 *   flames erupting from center pivot, violent needle jitter, radial glass shattering.
 * - Beginning (0-35f): Needle stuck against extreme right "MANIA" stop pin (+100).
 * - Action/Climax (35-110f): Flames pour out from the needle's pivot; needle violently rattles under torque overload.
 * - Ending/Hold (110-180f): Gauge glass shatters completely with spiderweb fracture lines.
 */
export const Scene050_TriggeringMania = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Needle jitter against stop pin
  const isFlaming = frame >= 35;
  const needleJitter = isFlaming ? Math.sin(frame * 4.5) * 5.5 : 0;
  const needleAngle = 86 + needleJitter; // Pegged in MANIA zone

  // Glass shattering at frame 110
  const isShattered = frame >= 110;
  const shatterAge = Math.max(0, frame - 110);

  // Screen shake on shatter
  const shakeX = isShattered && shatterAge < 25 ? Math.sin(shatterAge * 2.5) * Math.max(0, 16 - shatterAge * 0.7) : 0;
  const shakeY = isShattered && shatterAge < 25 ? Math.cos(shatterAge * 2.8) * Math.max(0, 14 - shatterAge * 0.6) : 0;

  // Flame oscillation math
  const f1 = Math.sin(frame * 0.6) * 18;
  const f2 = Math.cos(frame * 0.5 + 1.2) * 22;

  return (
    <AbsoluteFill
      className="bg-[#0B1120] overflow-hidden select-none font-sans text-white"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Background Dashboard Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="dash-grid-s50" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dash-grid-s50)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-red-500 font-bold uppercase block mb-0.5">
            NEUROLOGICAL OVERDRIVE
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            TRIGGERING MANIA: GAUGE OVERLOAD
          </h1>
        </div>
      </div>

      {/* MAIN GAUGE STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <radialGradient id="gauge-bg-s50" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </radialGradient>
          <filter id="gauge-glow-s50" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* GAUGE BODY (Center 960, 620) */}
        <g transform="translate(960, 620)" filter="url(#gauge-glow-s50)">
          {/* Dial Bezel */}
          <circle cx="0" cy="0" r="380" fill="url(#gauge-bg-s50)" stroke="#334155" strokeWidth="14" />
          <circle cx="0" cy="0" r="365" fill="none" stroke="#64748B" strokeWidth="2" />

          {/* Semicircular Color Band */}
          {/* Depression Blue Arc (-90 to -30) */}
          <path
            d="M -300 0 A 300 300 0 0 1 -150 -260"
            fill="none"
            stroke="#2563EB"
            strokeWidth="32"
          />
          {/* Normal Baseline Green Arc (-30 to +30) */}
          <path
            d="M -150 -260 A 300 300 0 0 1 150 -260"
            fill="none"
            stroke="#16A34A"
            strokeWidth="32"
          />
          {/* Mania Red Arc (+30 to +90) */}
          <path
            d="M 150 -260 A 300 300 0 0 1 300 0"
            fill="none"
            stroke="#DC2626"
            strokeWidth="32"
          />

          {/* Zone Labels */}
          <text x="-240" y="-80" fill="#60A5FA" fontSize="22" fontWeight="900" letterSpacing="2">
            DEPRESSION
          </text>
          <text x="0" y="-310" textAnchor="middle" fill="#86EFAC" fontSize="20" fontWeight="bold">
            BASELINE
          </text>
          <text x="140" y="-80" fill="#F87171" fontSize="24" fontWeight="900" letterSpacing="2">
            MANIA (+100)
          </text>

          {/* Right Maximum Stop Pin */}
          <circle cx="295" cy="-25" r="10" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />

          {/* FLAMES ERUPTING FROM PIVOT (Frame >= 35) */}
          {isFlaming && (
            <g transform="translate(0, 0)">
              {/* Flame Tongue 1 */}
              <path
                d={`M -25 0 Q ${60 + f1} ${-80 + f2} ${120 + f1} ${-140 + f2} Q 40 -60 25 0 Z`}
                fill="#EF4444"
                opacity="0.9"
              />
              {/* Flame Tongue 2 */}
              <path
                d={`M -15 0 Q ${40 + f2} ${-60 + f1} ${90 + f2} ${-110 + f1} Q 20 -40 15 0 Z`}
                fill="#F59E0B"
              />
              {/* Core Yellow */}
              <path
                d={`M -8 0 Q 30 -40 50 -70 Q 15 -25 8 0 Z`}
                fill="#FEF08A"
              />
            </g>
          )}

          {/* GAUGE NEEDLE (Pivot at 0, 0) */}
          <g transform={`rotate(${needleAngle})`}>
            {/* Counterbalance tail */}
            <polygon points="-8,45 8,45 12,0 -12,0" fill="#1E293B" stroke="#475569" strokeWidth="2" />
            {/* Tapered Needle Shaft */}
            <polygon points="-8,0 8,0 0,-290" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="-285" stroke="#FFFFFF" strokeWidth="2" />
          </g>

          {/* Center Hub Cap */}
          <circle cx="0" cy="0" r="32" fill="#0F172A" stroke="#CBD5E1" strokeWidth="6" />
          <circle cx="0" cy="0" r="14" fill="#DC2626" />

          {/* SPIDERWEB GLASS SHATTER OVERLAY (Frame >= 110) */}
          {isShattered && (
            <g>
              {/* Central Impact Fracture Point at needle contact */}
              <path
                d="M 280 -25 L 180 -80 L 80 -40 L -60 -120 L -180 -60 L -280 0 M 180 -80 L 120 -180 L 0 -240 L -140 -200 M 80 -40 L 0 0 L -60 80 M 280 -25 L 320 80 L 220 180 L 100 240 M 180 -80 L 260 -160 M 0 -240 L 40 -340 M -140 -200 L -240 -280"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.95"
              />
              <circle cx="280" cy="-25" r="30" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" />
            </g>
          )}
        </g>
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-red-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-red-300">
            SYSTEMIC COLLAPSE: AN INAPPROPRIATE SSRI OVERHEATS AND SHATTERS BIPOLAR NEUROCHEMICAL CIRCUITRY
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
