import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, TiledFloor } from "../../shared";

/**
 * Scene 112: pediatrc outbursts physically aggressive
 * Duration: 180 frames (6.0s)
 * Environment: Minimalist grey-and-white checkered tile floor.
 * Characters & Props: Child stickman, vector prop wall, vector dummy.
 * Action:
 * - Beginning: Child stickman stands facing a generic grey prop wall.
 * - Action / Climax: He starts violently punching and kicking the wall. A red vector "CRACK" overlay appears on the wall. He then picks up a vector dummy and throws it across the room.
 * - Ending / Hold: The stickman stands vibrating with anger, surrounded by action lines.
 * Text & Specific Colors: Action lines red (#DC2626). Wall grey (#64748B).
 */
export const Scene112_pediatrcoutburstsphysicallyaggressive = () => {
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

  // Phase 1: frames 0-25 approach
  // Phase 2: frames 25-85 punching & kicking wall
  const isAttackingWall = frame >= 25 && frame < 85;
  const attackSpeed = (frame * 0.45) % (Math.PI * 2);
  const punchLunge = isAttackingWall ? Math.abs(Math.sin(attackSpeed)) * 35 : 0;
  const kickLift = isAttackingWall ? Math.max(0, Math.sin(attackSpeed + 1)) * 25 : 0;

  // Wall shake on strikes
  const wallShake = isAttackingWall ? Math.sin(frame * 1.8) * 8 : 0;

  // Wall crack growth (frames 40-85)
  const crackProgress = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: frames 85-135 grabbing and throwing dummy
  const isThrowingDummy = frame >= 85 && frame < 135;
  const throwProgress = interpolate(frame, [88, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Parabolic throw arc: starts at child's hands (x: 820, y: 640) and launches leftward to (x: 180, y: 760)
  const dummyX = interpolate(throwProgress, [0, 1], [820, 180]);
  const dummyY = interpolate(throwProgress, [0, 0.45, 1], [640, 360, 770]);
  const dummyRot = interpolate(throwProgress, [0, 1], [0, -380]);
  const dummyScale = interpolate(throwProgress, [0, 0.5, 1], [0.85, 1, 0.75]);

  // Phase 4: frames 135-180 standing panting in rage
  const isPanting = frame >= 135;
  const angerShiver = isPanting ? Math.sin(frame * 2.2) * 5 : 0;

  // Action lines (radiating outward in frames 135+)
  const actionLineAngles = [0, 25, 50, 75, 110, 135, 160, 185, 210, 235, 260, 290, 320, 345];

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#F1F5F9",
      }}
    >
      {/* Checkered Floor Environment */}
      <TiledFloor floorY={780} perspective={550} opacity={0.45} />

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
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1.5px solid #CBD5E1",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-red-600 text-white">
              Physical Aggression
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-500">
              DMDD Behavioral Domain
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-slate-900">
            Property Destruction & Physical Assault
          </h1>
        </div>
      </div>

      {/* Main SVG Vector Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <filter id="crackGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- THE GREY PROP WALL (Right side: x=1160 to 1420) --- */}
        <g transform={`translate(${1160 + wallShake}, 380)`}>
          {/* Wall Structure */}
          <rect
            x={0}
            y={0}
            width={260}
            height={400}
            rx={8}
            fill="url(#wallGrad)"
            stroke="#1E293B"
            strokeWidth={4}
          />

          {/* Brick Horizontal Mortar Lines */}
          {[60, 120, 180, 240, 300, 360].map((ly) => (
            <line
              key={ly}
              x1={0}
              y1={ly}
              x2={260}
              y2={ly}
              stroke="#1E293B"
              strokeWidth={3}
              opacity={0.7}
            />
          ))}

          {/* Impact Strike Burst (during wall attack) */}
          {isAttackingWall && (frame % 4 < 2) && (
            <g transform="translate(10, 190)">
              <polygon
                points="0,0 -35,-25 -20,-5 -45,10 -15,15 -30,35 0,10"
                fill="#DC2626"
              />
              <polygon
                points="0,0 -25,-15 -12,-3 -30,6 -10,10 -20,25 0,8"
                fill="#FBBF24"
              />
            </g>
          )}

          {/* Red Vector CRACK Overlay */}
          {crackProgress > 0 && (
            <g filter="url(#crackGlow)">
              <path
                d="M 5 190 L 45 160 L 75 185 L 120 130 L 155 145 L 190 100 L 220 115"
                fill="none"
                stroke="#DC2626"
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray="300"
                strokeDashoffset={interpolate(crackProgress, [0, 1], [300, 0])}
              />
              <path
                d="M 75 185 L 85 240 L 130 260 L 160 310"
                fill="none"
                stroke="#EF4444"
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="200"
                strokeDashoffset={interpolate(crackProgress, [0, 1], [200, 0])}
              />
              {/* Flying debris chips */}
              {crackProgress > 0.5 && (
                <>
                  <circle cx={40} cy={165} r={4} fill="#EF4444" />
                  <circle cx={115} cy={135} r={5} fill="#DC2626" />
                  <circle cx={90} cy={245} r={3} fill="#EF4444" />
                </>
              )}
            </g>
          )}
        </g>

        {/* --- VECTOR DUMMY PROP --- */}
        {/* If before throw: standing or resting near child; if thrown: along ballistic trajectory; if after throw: lying fallen */}
        <g
          transform={
            frame < 85
              ? "translate(880, 680)"
              : frame < 135
              ? `translate(${dummyX}, ${dummyY}) rotate(${dummyRot}) scale(${dummyScale})`
              : "translate(180, 770) rotate(-75)"
          }
        >
          {/* Shadow */}
          <ellipse cx={0} cy={60} rx={28} ry={8} fill="#000000" opacity={0.25} />
          {/* Dummy Head */}
          <circle cx={0} cy={-40} r={18} fill="#CBD5E1" stroke="#475569" strokeWidth={3} />
          {/* Dummy Target Bullseye on Torso */}
          <rect
            x={-18}
            y={-20}
            width={36}
            height={55}
            rx={8}
            fill="#E2E8F0"
            stroke="#475569"
            strokeWidth={3}
          />
          <circle cx={0} cy={6} r={10} fill="none" stroke="#EF4444" strokeWidth={2.5} />
          <circle cx={0} cy={6} r={4} fill="#EF4444" />
          {/* Limbs */}
          <line x1={-14} y1={35} x2={-14} y2={65} stroke="#475569" strokeWidth={3.5} />
          <line x1={14} y1={35} x2={14} y2={65} stroke="#475569" strokeWidth={3.5} />
        </g>

        {/* --- ACTION LINES IN PHASE 4 (Surrounding Stickman) --- */}
        {isPanting && (
          <g transform={`translate(${780 + angerShiver}, 660)`}>
            {actionLineAngles.map((angle, idx) => {
              const rad = (angle * Math.PI) / 180;
              const rStart = 110 + (idx % 2) * 15;
              const rEnd = 160 + Math.sin(frame * 0.8 + idx) * 25;
              const x1 = Math.cos(rad) * rStart;
              const y1 = Math.sin(rad) * rStart;
              const x2 = Math.cos(rad) * rEnd;
              const y2 = Math.sin(rad) * rEnd;

              return (
                <line
                  key={idx}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#DC2626"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  opacity={0.8}
                />
              );
            })}
          </g>
        )}

        {/* --- CHILD STICKMAN SHADOW --- */}
        <ellipse
          cx={
            frame < 85
              ? 820 + punchLunge
              : 780 + angerShiver
          }
          cy={785}
          rx={85}
          ry={16}
          fill="#000000"
          opacity={0.3}
        />

        {/* --- CANONICAL CURATED STICKMAN --- */}
        <CuratedStickman
          x={
            frame < 85
              ? 820 + punchLunge
              : 780 + angerShiver
          }
          y={730 - kickLift}
          scale={0.82}
          variant="child"
          pose={
            isAttackingWall
              ? "action"
              : isThrowingDummy
              ? "reaching"
              : isPanting
              ? "tense"
              : "idle"
          }
          mouth={isAttackingWall || isPanting ? "frown" : "neutral"}
          eyes={isAttackingWall || isPanting ? "angry" : "normal"}
          tunicColor={isPanting ? "#FEE2E2" : "#FFFFFF"}
          strokeColor={isPanting ? "#DC2626" : "#000000"}
          reachProgress={isAttackingWall ? punchLunge / 35 : isThrowingDummy ? 0.9 : 0}
          frame={frame}
        />
      </svg>
    </AbsoluteFill>
  );
};
