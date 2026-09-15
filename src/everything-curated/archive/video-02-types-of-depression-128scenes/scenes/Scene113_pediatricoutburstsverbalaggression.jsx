import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, TiledFloor } from "../../shared";

/**
 * Scene 113: pediatric outbursts verbal aggression
 * Duration: 180 frames (6.0s)
 * Environment: minimalist grey-and-white checkered tile floor.
 * Characters & Props: Child stickman, text bubbles.
 * Action:
 * - Beginning: Child stickman stands vibrating.
 * - Action / Climax: He opens his mouth and a rapid stream of aggressive, jagged speech bubbles containing symbols (#%!$) violently explode from his mouth, expanding in size as they travel.
 * - Ending / Hold: A massive, blood-red jagged speech bubble slams into the direct center reading: "SCREAMING RAGE".
 * Text & Specific Colors: Bubbles red/black (#DC2626, #000000). Text white on red bubble.
 */
export const Scene113_pediatricoutburstsverbalaggression = () => {
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

  // Child stickman shivering with rage
  const angerShiver = Math.sin(frame * 2.5) * (frame > 20 ? 6 : 2);

  // Screaming bubbles configuration
  const screamingBubbles = [
    { text: "#%!$", startFrame: 22, x: 800, y: 550, scale: 0.8, bg: "#000000", textColor: "#EF4444" },
    { text: "&@?!", startFrame: 34, x: 1040, y: 440, scale: 1.05, bg: "#DC2626", textColor: "#FFFFFF" },
    { text: "*#@!", startFrame: 48, x: 1280, y: 530, scale: 1.25, bg: "#000000", textColor: "#F87171" },
    { text: "NO!", startFrame: 62, x: 920, y: 330, scale: 1.1, bg: "#EF4444", textColor: "#FFFFFF" },
    { text: "#!%&@*!", startFrame: 76, x: 1400, y: 380, scale: 1.4, bg: "#991B1B", textColor: "#FEF08A" },
  ];

  // Climax Giant Bubble Slam: begins at frame 95
  const slamSpring = spring({
    frame: frame - 95,
    fps,
    config: { damping: 11, stiffness: 220 },
  });
  const slamScale = interpolate(slamSpring, [0, 1], [3, 1]);
  const slamOpacity = interpolate(frame, [95, 102], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screen shake on giant slam
  const slamShake = frame >= 95 ? Math.sin(frame * 1.8) * Math.max(0, 12 - (frame - 95) * 0.4) : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#F8FAFC",
        transform: `translate(${slamShake}px, 0px)`,
      }}
    >
      {/* Floor Environment */}
      <TiledFloor floorY={780} perspective={550} opacity={0.4} />

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
              Verbal Aggression
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-500">
              DMDD Outburst Modality
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-slate-900">
            Explosive Verbal Rages & Tantrums
          </h1>
        </div>
      </div>

      {/* Main SVG Vector Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <filter id="bubbleDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="6" stdDeviation="6" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* --- SOUNDWAVE JET FROM MOUTH --- */}
        {frame > 20 && (
          <g transform={`translate(${590 + angerShiver}, 620)`}>
            {[1, 2, 3].map((ring) => {
              const rPhase = ((frame * 3 + ring * 25) % 120);
              return (
                <path
                  key={ring}
                  d={`M ${rPhase * 0.8} ${-rPhase * 0.5} Q ${rPhase * 1.4} 0 ${rPhase * 0.8} ${rPhase * 0.5}`}
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth={3}
                  opacity={1 - rPhase / 120}
                />
              );
            })}
          </g>
        )}

        {/* --- ERUPTING STREAM OF JAGGED SPEECH BUBBLES --- */}
        {screamingBubbles.map((bubble, i) => {
          if (frame < bubble.startFrame) return null;
          const bProgress = interpolate(frame, [bubble.startFrame, bubble.startFrame + 18], [0, 1], {
            extrapolateRight: "clamp",
          });
          const bScale = bubble.scale * bProgress;
          const bRot = Math.sin(frame * 0.2 + i) * 8;

          return (
            <g
              key={i}
              transform={`translate(${bubble.x}, ${bubble.y}) rotate(${bRot}) scale(${bScale})`}
              filter="url(#bubbleDrop)"
            >
              {/* Jagged Spiky Comic Bubble Shape */}
              <polygon
                points="
                  -90,-35 -40,-50 10,-38 60,-55 100,-25 85,0 115,25 75,45 25,40
                  -10,55 -60,42 -95,20 -75,-10
                "
                fill={bubble.bg}
                stroke="#DC2626"
                strokeWidth={3}
              />
              {/* Pointer toward stickman mouth */}
              <polygon
                points="-75,-5 -125,25 -55,10"
                fill={bubble.bg}
                stroke="#DC2626"
                strokeWidth={3}
              />
              {/* Text inside */}
              <text
                x={0}
                y={8}
                textAnchor="middle"
                fill={bubble.textColor}
                fontSize={28}
                fontWeight="900"
                letterSpacing={3}
              >
                {bubble.text}
              </text>
            </g>
          );
        })}

        {/* --- CHILD STICKMAN SHADOW --- */}
        <ellipse
          cx={520 + angerShiver}
          cy={785}
          rx={85}
          ry={16}
          fill="#000000"
          opacity={0.3}
        />

        {/* --- CANONICAL CURATED STICKMAN (Screaming, angry) --- */}
        <CuratedStickman
          x={520 + angerShiver}
          y={730}
          scale={0.82}
          variant="child"
          pose="tense"
          mouth="open"
          eyes="angry"
          tunicColor="#FEE2E2"
          strokeColor="#DC2626"
          frame={frame}
        />
      </svg>

      {/* --- CLIMAX MASSIVE BLOOD-RED JAGGED BUBBLE SLAMS CENTER --- */}
      {slamOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 px-8"
          style={{
            opacity: slamOpacity,
            transform: `scale(${slamScale})`,
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* SVG Jagged Blast Silhouette Background */}
            <svg
              width="880"
              height="380"
              viewBox="0 0 880 380"
              className="absolute -inset-10 w-full h-full overflow-visible pointer-events-none"
            >
              <polygon
                points="
                  440,20 530,50 640,15 720,70 820,50 810,130 870,170 820,230 860,290
                  780,310 770,370 680,330 600,375 510,330 440,370 370,330 280,375
                  200,330 110,370 100,310 20,290 60,230 10,170 70,130 60,50 160,70
                  240,15 350,50
                "
                fill="#DC2626"
                stroke="#000000"
                strokeWidth={8}
                style={{
                  filter: "drop-shadow(0 20px 35px rgba(220, 38, 38, 0.6))",
                }}
              />
            </svg>

            {/* Typography Content Inside Bubble */}
            <div className="relative z-10 flex flex-col items-center justify-center py-10 px-16 text-center">
              <div className="text-xs md:text-sm font-black tracking-widest uppercase bg-black text-amber-300 px-4 py-1 rounded-full mb-2">
                RECURRENT INTENSE VOCAL OUTBURSTS
              </div>
              <h1
                className="text-6xl md:text-8xl font-black tracking-tighter uppercase m-0 leading-none text-white"
                style={{
                  textShadow: "0 4px 15px rgba(0, 0, 0, 0.6)",
                }}
              >
                SCREAMING RAGE
              </h1>
              <p className="text-sm md:text-base font-black tracking-wider uppercase text-red-100 mt-2 m-0">
                Grossly Out of Proportion in Intensity or Duration
              </p>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
