import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, TiledFloor } from "../../shared";

/**
 * Scene 123: Drastic Alternative Interventions
 * Duration: 210 frames (7.0s)
 * Environment: A futuristic clinical setting.
 * Characters & Props: Stickman, a tray of pills, a glowing high-tech medical device.
 * Action:
 * - Beginning: Stickman sits in a specialized chair. A nurse's hand offers him a tray of standard pills. Text "Pills Fail" types.
 * - Action / Climax: Stickman aggressively pushes the tray of pills away. Instantly, a massive, futuristic, glowing medical device (resembling a Transcranial Magnetic Stimulation helmet) descends from the ceiling.
 * - Ending / Hold: The helmet locks into place over his head, glowing with intense, pulsating blue magnetic rings.
 * Text & Specific Colors: Magnetic rings neon blue (#3B82F6). Background clean greys and whites.
 */
export const Scene123_DrasticAlternativeInterventions = () => {
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

  // Typing "Pills Fail" (frames 5 to 40)
  const titleText = "Pills Fail";
  const typedCount = Math.floor(
    interpolate(frame, [5, 38], [0, titleText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentTitle = titleText.slice(0, typedCount);

  // Push action kinematics: frame 42 to 70
  const isPushing = frame >= 42;
  const pushProgress = interpolate(frame, [42, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tray and scattered pills flying away (rebound leftward)
  const trayX = interpolate(pushProgress, [0, 1], [680, 220]);
  const trayRot = interpolate(pushProgress, [0, 1], [0, -35]);
  const trayOpacity = interpolate(pushProgress, [0, 0.7, 1], [1, 0.9, 0.2]);

  // TMS Helmet descent from ceiling: begins at frame 65
  const helmetSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 12, stiffness: 130 },
  });
  const helmetY = interpolate(helmetSpring, [0, 1], [-120, 520]);
  const isHelmetLocked = frame >= 95;

  // Pulsating magnetic rings (frame 95+)
  const ringPhase = frame >= 95 ? (frame - 95) * 0.18 : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#F1F5F9",
      }}
    >
      {/* Floor Environment */}
      <TiledFloor floorY={780} perspective={550} opacity={0.35} />

      {/* Header Container with Deterministic Containment */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: entranceOpacity,
          transform: `scale(${entranceScale})`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-xl text-center max-w-3xl flex flex-col items-center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            border: isHelmetLocked ? "2px solid #3B82F6" : "1.5px solid #CBD5E1",
            boxShadow: isHelmetLocked ? "0 0 35px rgba(59, 130, 246, 0.3)" : "none",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase"
              style={{
                backgroundColor: isHelmetLocked ? "#3B82F6" : "#64748B",
                color: "#FFFFFF",
              }}
            >
              {isHelmetLocked ? "Neuromodulation Intervention" : "Pharmacotherapy Limit"}
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-500">
              {isHelmetLocked ? "TMS / ECT / Deep Modulation" : "Exhausted Options"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-slate-900">
            {isHelmetLocked ? "Drastic Alternative Interventions" : currentTitle}
            {!isHelmetLocked && typedCount < titleText.length && (
              <span className="animate-pulse ml-1 text-red-500">|</span>
            )}
          </h1>
          <p className="text-sm font-semibold text-slate-600 m-0">
            {isHelmetLocked
              ? "Direct transcranial electrical and magnetic circuits bypass chemical receptors"
              : "Standard pharmacological agents pushed aside after repeated failures"}
          </p>
        </div>
      </div>

      {/* Main SVG Clinical Scene Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <linearGradient id="chairLeather" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <filter id="magneticGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- CLINICAL PROCEDURE CHAIR (x: 960, y: 580 to 780) --- */}
        <g id="clinicalChair" transform="translate(960, 680)">
          {/* Chair Backrest */}
          <rect x={-45} y={-140} width={90} height={160} rx={16} fill="url(#chairLeather)" stroke="#0F172A" strokeWidth={3} />
          {/* Headrest Cushion */}
          <rect x={-32} y={-190} width={64} height={45} rx={12} fill="#475569" stroke="#0F172A" strokeWidth={2.5} />
          {/* Chair Seat Cushion */}
          <rect x={-75} y={20} width={150} height={35} rx={10} fill="url(#chairLeather)" stroke="#0F172A" strokeWidth={3} />
          {/* Chair Chrome Pedestal */}
          <rect x={-14} y={55} width={28} height={50} fill="#CBD5E1" stroke="#94A3B8" strokeWidth={2} />
          <ellipse cx={0} cy={105} rx={80} ry={14} fill="#94A3B8" stroke="#64748B" strokeWidth={2} />
        </g>

        {/* --- TRAY OF PILLS (Pushed away to left) --- */}
        <g
          transform={`translate(${trayX}, 640) rotate(${trayRot})`}
          style={{ opacity: trayOpacity }}
        >
          {/* Silver Tray */}
          <rect x={-70} y={-8} width={140} height={16} rx={4} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={2} />
          {/* Overturned Pill Bottles */}
          <g transform="translate(-30, -25) rotate(-35)">
            <rect x={-8} y={-15} width={16} height={30} rx={3} fill="#F97316" stroke="#EA580C" strokeWidth={1.5} />
            <rect x={-9} y={-20} width={18} height={6} rx={1} fill="#FFFFFF" />
          </g>
          {/* Tumbling Tablets */}
          {[10, 25, 40].map((tx, idx) => (
            <circle key={idx} cx={tx} cy={-12 - idx * 4} r={6} fill="#FBBF24" stroke="#D97706" strokeWidth={1} />
          ))}
        </g>

        {/* --- CANONICAL STICKMAN (Sitting in chair) --- */}
        <ellipse cx={960} cy={785} rx={85} ry={16} fill="#000000" opacity={0.25} />
        <CuratedStickman
          x={960}
          y={730}
          scale={0.84}
          variant="default"
          pose={frame < 42 ? "idle" : frame < 65 ? "reaching" : "idle"}
          reachProgress={pushProgress}
          mouth="neutral"
          eyes="normal"
          frame={frame}
        />

        {/* --- HIGH-TECH TMS HELMET (Descends from ceiling: helmetY) --- */}
        <g id="tmsDevice" transform={`translate(960, ${helmetY})`}>
          {/* Articulated Suspension Arm from ceiling */}
          <line x1={0} y1={-500} x2={0} y2={-50} stroke="#64748B" strokeWidth={12} strokeLinecap="round" />
          <line x1={0} y1={-500} x2={0} y2={-50} stroke="#CBD5E1" strokeWidth={4} strokeLinecap="round" />
          {/* Pivot Joint Ball */}
          <circle cx={0} cy={-50} r={22} fill="#334155" stroke="#0F172A" strokeWidth={3} />
          <circle cx={0} cy={-50} r={8} fill="#3B82F6" />

          {/* Futuristic Helmet Shell Dome */}
          <path
            d="M -75 -45 Q 0 -95 75 -45 L 85 10 Q 0 -15 -85 10 Z"
            fill="#1E293B"
            stroke="#3B82F6"
            strokeWidth={4}
          />
          {/* Helmet Visor / Magnetic Coils */}
          <ellipse cx={-40} cy={-25} rx={18} ry={12} fill="#0F172A" stroke="#60A5FA" strokeWidth={2.5} />
          <ellipse cx={40} cy={-25} rx={18} ry={12} fill="#0F172A" stroke="#60A5FA" strokeWidth={2.5} />

          {/* Status Indicator Bar */}
          <rect x={-25} y={-45} width={50} height={6} rx={3} fill={isHelmetLocked ? "#3B82F6" : "#64748B"} />

          {/* --- PULSATING NEON BLUE MAGNETIC RINGS (When Locked) --- */}
          {isHelmetLocked && (
            <g filter="url(#magneticGlow)">
              {[1, 2, 3].map((ringIdx) => {
                const rRadius = 60 + ((ringPhase + ringIdx * 25) % 80);
                const rAlpha = 1 - (rRadius - 60) / 80;

                return (
                  <ellipse
                    key={ringIdx}
                    cx={0}
                    cy={-15}
                    rx={rRadius * 1.3}
                    ry={rRadius * 0.75}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth={4}
                    strokeDasharray="8 6"
                    opacity={rAlpha * 0.85}
                  />
                );
              })}
              {/* Central Energy Sparkles */}
              <circle cx={-40} cy={-25} r={4 + (frame % 3)} fill="#93C5FD" />
              <circle cx={40} cy={-25} r={4 + ((frame + 1) % 3)} fill="#93C5FD" />
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
