import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 5: Mechanical Breakdown
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Close-up zoom on brain blueprint
 * - Characters & Props: Three interlocking blue & grey mechanical gears labeled "NEUROTRANSMITTERS"
 * - Beginning: Gears spinning smoothly in sync.
 * - Action/Climax: Jagged black spike violently jams between gears (frame 45).
 *   They lock up with violent shudder, emitting red sparks and grey smoke.
 * - Ending/Hold: Smoke clears, leaving gears locked and frozen to frame 180.
 */
export const Scene005_MechanicalBreakdown = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Continuous entrance from Scene 4
  const enterScale = interpolate(frame, [0, 20], [0.92, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Gear Rotation: smooth until jam frame (frame 46)
  const isJammed = frame >= 46;
  const normalSpin = frame * 2.8;
  const jamSpin = 46 * 2.8;

  // Violent impact shudder on jam
  const shudder = isJammed && frame <= 68
    ? Math.sin(frame * 4.2) * interpolate(frame, [46, 68], [12, 0], { extrapolateRight: "clamp" })
    : 0;

  const currentRotation = isJammed ? jamSpin + shudder : normalSpin;

  // Interlocking gear ratios
  // Gear A: 12 teeth (radius 110)
  // Gear B: 8 teeth (radius 75) => rotB = -rotA * (12/8) = -rotA * 1.5
  // Gear C: 10 teeth (radius 95) => rotC = -rotA * (12/10) = -rotA * 1.2
  const rotA = currentRotation;
  const rotB = -currentRotation * 1.5;
  const rotC = -currentRotation * 1.2;

  // 3. Black Spike Slam (triggers frame 42 to 46)
  const spikeSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 9, stiffness: 260, mass: 1.2 },
  });
  const spikeY = interpolate(spikeSpring, [0, 1], [-220, 0]);
  const spikeActive = frame >= 42;

  // 4. Red Sparks Burst on impact (frames 46 to 75)
  const sparksActive = frame >= 46 && frame <= 78;
  const sparkProgress = interpolate(frame, [46, 78], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sparkOpacity = interpolate(frame, [46, 52, 78], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 5. Smoke generation (frames 48 to 130)
  const smokeProgress = interpolate(frame, [48, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const smokeOpacity = interpolate(frame, [48, 62, 100, 135], [0, 0.75, 0.75, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gear SVG generator helper
  const renderGear = ({ teeth, radius, holeRadius, fill, stroke, strokeWidth }) => {
    const angleStep = (2 * Math.PI) / teeth;
    let path = "";
    for (let i = 0; i < teeth; i++) {
      const a1 = i * angleStep;
      const a2 = a1 + angleStep * 0.25;
      const a3 = a1 + angleStep * 0.55;
      const a4 = a1 + angleStep * 0.8;

      const rOuter = radius + 22;
      const rInner = radius;

      const p1x = Math.cos(a1) * rInner;
      const p1y = Math.sin(a1) * rInner;
      const p2x = Math.cos(a2) * rOuter;
      const p2y = Math.sin(a2) * rOuter;
      const p3x = Math.cos(a3) * rOuter;
      const p3y = Math.sin(a3) * rOuter;
      const p4x = Math.cos(a4) * rInner;
      const p4y = Math.sin(a4) * rInner;

      if (i === 0) {
        path += `M ${p1x} ${p1y} `;
      } else {
        path += `L ${p1x} ${p1y} `;
      }
      path += `L ${p2x} ${p2y} L ${p3x} ${p3y} L ${p4x} ${p4y} `;
    }
    path += "Z";

    return (
      <g>
        <path d={path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
        {/* Inner Hub Ring */}
        <circle cx="0" cy="0" r={holeRadius + 18} fill="none" stroke={stroke} strokeWidth={strokeWidth * 0.7} opacity="0.6" />
        {/* Axle Hole */}
        <circle cx="0" cy="0" r={holeRadius} fill="#0A0F1D" stroke={stroke} strokeWidth={strokeWidth} />
      </g>
    );
  };

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Blueprint Grid Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s5" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#22D3EE" strokeWidth="1" strokeDasharray="1 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s5)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20"
        style={{
          opacity: enterOpacity,
          transform: `scale(${enterScale})`,
        }}
      >
        <div className="px-8 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-[#3B82F6] shadow-2xl backdrop-blur-md flex items-center gap-3">
          <div className={`w-3.5 h-3.5 rounded-full ${isJammed ? "bg-[#EF4444] animate-ping" : "bg-[#3B82F6]"}`} />
          <h1 className="text-white text-3xl md:text-4xl font-black tracking-widest uppercase m-0">
            NEUROTRANSMITTERS
          </h1>
        </div>
      </div>

      {/* Main Mechanical Stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 1200 900"
          className="w-[1100px] h-[820px] overflow-visible pointer-events-none"
        >
          <defs>
            <filter id="gear-shadow-s5" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.6" />
            </filter>
            <filter id="spark-glow-s5" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#EF4444" floodOpacity="1" />
            </filter>
          </defs>

          {/* GEAR A (Main Drive, Blue #3B82F6, center 520, 520) */}
          <g transform={`translate(520, 520) rotate(${rotA})`} filter="url(#gear-shadow-s5)">
            {renderGear({
              teeth: 12,
              radius: 120,
              holeRadius: 36,
              fill: "#1E3A8A",
              stroke: "#3B82F6",
              strokeWidth: 5,
            })}
          </g>

          {/* GEAR B (Top Right, Grey #64748B, center 720, 390) */}
          <g transform={`translate(720, 390) rotate(${rotB})`} filter="url(#gear-shadow-s5)">
            {renderGear({
              teeth: 8,
              radius: 80,
              holeRadius: 26,
              fill: "#334155",
              stroke: "#94A3B8",
              strokeWidth: 4.5,
            })}
          </g>

          {/* GEAR C (Bottom Right, Deep Blue #2563EB, center 730, 660) */}
          <g transform={`translate(730, 660) rotate(${rotC})`} filter="url(#gear-shadow-s5)">
            {renderGear({
              teeth: 10,
              radius: 100,
              holeRadius: 30,
              fill: "#1D4ED8",
              stroke: "#60A5FA",
              strokeWidth: 4.5,
            })}
          </g>

          {/* Jam Contact Junction: (x: 625, y: 450) between Gear A and Gear B */}

          {/* Climax: Heavy Jagged Black Spike (#000000) */}
          {spikeActive && (
            <g transform={`translate(620, ${445 + spikeY})`}>
              {/* Jagged Spike Wedge */}
              <polygon
                points="0,-160 -36,-130 -18,-20 -28,8 0,42 28,8 18,-20 36,-130"
                fill="#000000"
                stroke="#475569"
                strokeWidth="4"
                strokeLinejoin="round"
                filter="url(#gear-shadow-s5)"
              />
              {/* Metallic center ridge */}
              <line x1="0" y1="-150" x2="0" y2="35" stroke="#334155" strokeWidth="2.5" />
            </g>
          )}

          {/* Red Sparks on Impact */}
          {sparksActive && (
            <g transform="translate(620, 450)" opacity={sparkOpacity} filter="url(#spark-glow-s5)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, idx) => {
                const rad = (ang * Math.PI) / 180;
                const dist = 30 + sparkProgress * 110;
                const x2 = Math.cos(rad) * dist;
                const y2 = Math.sin(rad) * dist;
                return (
                  <line
                    key={idx}
                    x1="0"
                    y1="0"
                    x2={x2}
                    y2={y2}
                    stroke="#EF4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
          )}

          {/* Grey Smoke VFX expanding over locked teeth */}
          {smokeOpacity > 0 && (
            <g transform="translate(620, 440)" opacity={smokeOpacity}>
              <circle cx={-30 * smokeProgress} cy={-20 * smokeProgress} r={35 + smokeProgress * 55} fill="#475569" opacity="0.6" />
              <circle cx={25 * smokeProgress} cy={-40 * smokeProgress} r={42 + smokeProgress * 65} fill="#64748B" opacity="0.5" />
              <circle cx={0} cy={-60 * smokeProgress} r={50 + smokeProgress * 70} fill="#94A3B8" opacity="0.4" />
            </g>
          )}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
