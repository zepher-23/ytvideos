import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 125: Mechanical Failure UI Glitch
 * Duration: 180 frames (6.0s)
 * Environment: Cybernetic/tech UI space on a dark background.
 * Characters & Props: Futuristic computer terminal displaying a human wireframe outline.
 * Action:
 * - Beginning: A green, healthy cybernetic wireframe of a human is displayed on a monitor. Text "SYSTEM STATUS: NOMINAL" types in green.
 * - Action / Climax: The screen glitches violently. The wireframe turns stark red as lines of chaotic, corrupted binary code pour down the screen.
 * - Ending / Hold: A massive, solid red banner slams across the center of the screen reading: "SYSTEM FAILURE".
 * Text & Specific Colors: Glitch code and wireframe neon red (#EF4444). Glitch text red (#DC2626). Binary green (#22C55E).
 */
export const Scene125_MechanicalFailureUIGlitch = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const entranceScale = interpolate(enterSpring, [0, 1], [0.92, 1]);

  // Nominal typing text: frames 5 to 40
  const nominalText = "SYSTEM STATUS: NOMINAL";
  const typedCount = Math.floor(
    interpolate(frame, [5, 38], [0, nominalText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentNominal = nominalText.slice(0, typedCount);

  // Glitch rupture trigger: frame 45
  const isGlitching = frame >= 45;
  const glitchIntensity = interpolate(frame, [45, 55, 105, 180], [0, 1, 0.7, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glitch jitter displacement
  const glitchX = isGlitching ? (Math.sin(frame * 4.2) * 16 + (frame % 3 === 0 ? 25 : -15)) * glitchIntensity : 0;
  const glitchY = isGlitching ? (Math.cos(frame * 3.8) * 8) * glitchIntensity : 0;

  // Wireframe color interpolation: Green -> Yellow -> Red
  const wireColor = frame < 45 ? "#22C55E" : frame < 65 ? "#F59E0B" : "#EF4444";
  const wireGlowColor = frame < 45 ? "#4ADE80" : "#F87171";

  // Corrupted binary code streams (frames 50+)
  const binaryStreams = [
    { x: 240, speed: 14, seed: "01001100 01101111 01110011 01110100" },
    { x: 420, speed: 18, seed: "ERR_0x80004005 NULL_POINTER_EXCEPTION" },
    { x: 1440, speed: 16, seed: "11010010 01011010 CRITICAL_FAULT" },
    { x: 1620, speed: 20, seed: "00101011 11100010 BUFFER_OVERFLOW" },
  ];

  // Center "SYSTEM FAILURE" banner slam: frame 105
  const slamSpring = spring({
    frame: frame - 105,
    fps,
    config: { damping: 11, stiffness: 220 },
  });
  const slamScale = interpolate(slamSpring, [0, 1], [3.2, 1]);
  const slamOpacity = interpolate(frame, [105, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-mono"
      style={{
        backgroundColor: "#0B0F19",
        transform: `translate(${glitchX}px, ${glitchY}px)`,
      }}
    >
      {/* CRT Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 z-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0px, rgba(0, 0, 0, 0.6) 2px, transparent 2px, transparent 4px)",
        }}
      />

      {/* Cybernetic HUD Frame Borders */}
      <div className="absolute inset-6 rounded-3xl border border-cyan-500/30 pointer-events-none z-30 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center text-xs tracking-widest text-cyan-400">
          <span>TERMINAL // NEURAL_OS_v4.2</span>
          <span>DIAGNOSTIC_FEED : LIVE</span>
        </div>
        <div className="flex justify-between items-center text-xs tracking-widest text-cyan-500/60">
          <span>PORT : 0x7FFF800</span>
          <span>BIOMECHANICAL INTEGRITY MATRIX</span>
        </div>
      </div>

      {/* Header Container with Deterministic Containment */}
      <div
        className="absolute top-12 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: entranceOpacity,
          transform: `scale(${entranceScale})`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-3xl flex flex-col items-center"
          style={{
            backgroundColor: frame >= 55 ? "rgba(220, 38, 38, 0.2)" : "rgba(15, 23, 42, 0.8)",
            border: frame >= 55 ? "1.5px solid #EF4444" : "1.5px solid #22C55E",
            boxShadow: frame >= 55 ? "0 0 35px rgba(239, 68, 68, 0.4)" : "0 0 25px rgba(34, 197, 94, 0.3)",
          }}
        >
          <h1
            className="text-3xl md:text-4xl font-black tracking-widest uppercase m-0 leading-tight"
            style={{ color: wireColor }}
          >
            {frame < 45 ? currentNominal : "CRITICAL ANOMALY DETECTED"}
            {frame < 45 && typedCount < nominalText.length && (
              <span className="animate-pulse ml-1 text-green-400">_</span>
            )}
          </h1>
        </div>
      </div>

      {/* Corrupted Binary Waterfall Streams (Side Columns) */}
      {isGlitching && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-60">
          {binaryStreams.map((stream, sIdx) => {
            const yOffset = ((frame * stream.speed + sIdx * 90) % 1200) - 200;
            return (
              <div
                key={sIdx}
                className="absolute text-xs font-mono font-bold whitespace-pre-wrap w-48 break-all leading-tight"
                style={{
                  left: `${stream.x}px`,
                  top: `${yOffset}px`,
                  color: sIdx % 2 === 0 ? "#EF4444" : "#22C55E",
                }}
              >
                {stream.seed}
                <br />
                {stream.seed}
              </div>
            );
          })}
        </div>
      )}

      {/* Main SVG Center Stage: Cybernetic Wireframe Human */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <filter id="cyberGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- HUMAN CYBERNETIC WIREFRAME (Center: 960, 560) --- */}
        <g id="humanWireframe" transform="translate(960, 560)" filter="url(#cyberGlow)">
          {/* Head & Cranium Mesh */}
          <circle cx={0} cy={-220} r={48} fill="none" stroke={wireColor} strokeWidth={3.5} />
          <line x1={0} y1={-268} x2={0} y2={-172} stroke={wireColor} strokeWidth={2} strokeDasharray="4 4" />
          <ellipse cx={0} cy={-220} rx={28} ry={48} fill="none" stroke={wireColor} strokeWidth={2} />

          {/* Neck */}
          <line x1={0} y1={-172} x2={0} y2={-140} stroke={wireColor} strokeWidth={4} />

          {/* Shoulder Girdle & Clavicles */}
          <line x1={-90} y1={-140} x2={90} y2={-140} stroke={wireColor} strokeWidth={4} />
          <circle cx={-90} cy={-140} r={7} fill={wireColor} />
          <circle cx={90} cy={-140} r={7} fill={wireColor} />

          {/* Spine & Ribcage Mesh */}
          <line x1={0} y1={-140} x2={0} y2={60} stroke={wireColor} strokeWidth={4.5} />
          {[-105, -70, -35, 0, 35].map((ry) => (
            <path
              key={ry}
              d={`M -70 ${ry} Q 0 ${ry + 15} 70 ${ry}`}
              fill="none"
              stroke={wireColor}
              strokeWidth={2.5}
            />
          ))}

          {/* Pelvis Ring */}
          <ellipse cx={0} cy={60} rx={65} ry={25} fill="none" stroke={wireColor} strokeWidth={3} />
          <circle cx={-50} cy={60} r={7} fill={wireColor} />
          <circle cx={50} cy={60} r={7} fill={wireColor} />

          {/* Arms */}
          <line x1={-90} y1={-140} x2={-120} y2={-30} stroke={wireColor} strokeWidth={3.5} />
          <circle cx={-120} cy={-30} r={6} fill={wireColor} />
          <line x1={-120} y1={-30} x2={-140} y2={70} stroke={wireColor} strokeWidth={3.5} />

          <line x1={90} y1={-140} x2={120} y2={-30} stroke={wireColor} strokeWidth={3.5} />
          <circle cx={120} cy={-30} r={6} fill={wireColor} />
          <line x1={120} y1={-30} x2={140} y2={70} stroke={wireColor} strokeWidth={3.5} />

          {/* Legs */}
          <line x1={-50} y1={60} x2={-60} y2={180} stroke={wireColor} strokeWidth={4} />
          <circle cx={-60} cy={180} r={6} fill={wireColor} />
          <line x1={-60} y1={180} x2={-70} y2={300} stroke={wireColor} strokeWidth={4} />

          <line x1={50} y1={60} x2={60} y2={180} stroke={wireColor} strokeWidth={4} />
          <circle cx={60} cy={180} r={6} fill={wireColor} />
          <line x1={60} y1={180} x2={70} y2={300} stroke={wireColor} strokeWidth={4} />

          {/* Target Reticle Crosshairs */}
          <circle cx={0} cy={-220} r={70} fill="none" stroke={wireColor} strokeWidth={1.5} strokeDasharray="6 6" />
          <circle cx={0} cy={-35} r={85} fill="none" stroke={wireColor} strokeWidth={1.5} strokeDasharray="6 6" />
        </g>
      </svg>

      {/* --- CLIMAX MASSIVE SOLID RED "SYSTEM FAILURE" BANNER SLAM --- */}
      {slamOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 px-8"
          style={{
            opacity: slamOpacity,
            transform: `scale(${slamScale})`,
          }}
        >
          <div
            className="w-[1100px] py-10 px-12 rounded-3xl border-4 flex flex-col items-center text-center shadow-2xl backdrop-blur-2xl"
            style={{
              backgroundColor: "#DC2626",
              borderColor: "#FFFFFF",
              boxShadow: "0 0 100px rgba(220, 38, 38, 0.9), 0 30px 70px rgba(0, 0, 0, 0.9)",
            }}
          >
            <div className="flex items-center gap-3 bg-black/80 px-6 py-1.5 rounded-full mb-3">
              <span className="text-yellow-400 font-black text-lg">[ ! ]</span>
              <span className="text-xs md:text-sm font-black tracking-widest uppercase text-white">
                CRITICAL BIOSYSTEM HALT &bull; CODE: 0xDEPR_FATAL
              </span>
            </div>
            <h1
              className="text-7xl md:text-9xl font-black tracking-tight uppercase m-0 leading-none text-white"
              style={{
                textShadow: "0 6px 0 #7F1D1D, 0 15px 30px rgba(0, 0, 0, 0.8)",
              }}
            >
              SYSTEM FAILURE
            </h1>
            <p className="text-base md:text-xl font-bold uppercase tracking-wider text-red-100 mt-4 m-0">
              Complete Exhaustion of Adaptive Compensation Mechanisms
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
