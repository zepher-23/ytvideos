import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 114: masking profound despair
 * Duration: 210 frames (7.0s)
 * Environment: X-ray style visual space.
 * Characters & Props: X-ray overlay. Child stickman. Crying face.
 * Action:
 * - Beginning: The Child stickman from Scene 113 (angry, red) is centered.
 * - Action / Climax: A blue X-ray scanning beam passes vertically over the child. Inside the angry red exterior, the X-ray reveals a deeply sad, crying, dark blue face hiding in the chest cavity, radiating tears.
 * - Ending / Hold: The X-ray remains active, showing the profound sadness trapped inside the rage shell. Text "MASKING DESPAIR" types below.
 * Text & Specific Colors: Outer shell Red (#EF4444). Inner face Blue (#1D4ED8). Blue scanner beam (#06B6D4). Background off-white (#F8FAFC).
 */
export const Scene114_maskingprofounddespair = () => {
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

  // X-Ray beam sweep (frames 30 to 90)
  const beamY = interpolate(frame, [30, 95], [320, 820], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isBeamActive = frame >= 30;

  // Reveal of the inner crying blue face in chest (revealed from frame 60 onwards)
  const innerFaceOpacity = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typing effect for "MASKING DESPAIR" (frames 105 to 160)
  const titleText = "MASKING DESPAIR";
  const typedCount = Math.floor(
    interpolate(frame, [105, 155], [0, titleText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentTitle = titleText.slice(0, typedCount);

  // Tear droplets streaming from inner face
  const tears = [
    { delay: 0, speed: 2.2, xOff: -18 },
    { delay: 15, speed: 2.5, xOff: 18 },
    { delay: 30, speed: 2.0, xOff: -12 },
    { delay: 45, speed: 2.6, xOff: 14 },
  ];

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#F8FAFC",
      }}
    >
      {/* Subtle X-Ray Grid Blueprint Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #06B6D4 1px, transparent 1px), linear-gradient(to bottom, #06B6D4 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

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
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-cyan-600 text-white">
              Internal Neuropsychology
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-500">
              DMDD Underlying Pathology
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-slate-900">
            {currentTitle || "Diagnostic Internal Cross-Section"}
            {typedCount < titleText.length && frame >= 105 && (
              <span className="animate-pulse ml-1 text-cyan-600">|</span>
            )}
          </h1>
        </div>
      </div>

      {/* Main SVG Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <radialGradient id="chestXrayGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#1D4ED8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
          </radialGradient>

          <filter id="cyanScanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx={960} cy={785} rx={85} ry={16} fill="#000000" opacity={0.25} />

        {/* Canonical Stickman (Angry Red Outer Shell) */}
        <CuratedStickman
          x={960}
          y={730}
          scale={0.84}
          variant="child"
          pose="tense"
          mouth="frown"
          eyes="angry"
          tunicColor="#FEE2E2"
          strokeColor="#EF4444"
          frame={frame}
        />

        {/* --- INNER CRYING BLUE FACE IN CHEST CAVITY --- */}
        {innerFaceOpacity > 0.01 && (
          <g
            id="innerDespairChest"
            transform="translate(960, 640)"
            style={{ opacity: innerFaceOpacity }}
          >
            {/* Translucent Chest Portal Aperture */}
            <circle
              cx={0}
              cy={0}
              r={52}
              fill="url(#chestXrayGrad)"
              stroke="#06B6D4"
              strokeWidth={3.5}
              strokeDasharray="6 4"
              filter="url(#cyanScanGlow)"
            />

            {/* Inner Sad Face Features */}
            {/* Sad Slanted Eyes */}
            <path
              d="M -22 -10 Q -15 -18 -8 -12"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={3.5}
              strokeLinecap="round"
            />
            <path
              d="M 8 -12 Q 15 -18 22 -10"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={3.5}
              strokeLinecap="round"
            />
            {/* Quivering Downward Frown */}
            <path
              d="M -16 18 Q 0 8 16 18"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={3.5}
              strokeLinecap="round"
            />

            {/* Radiating Tears Streaming Downward */}
            {tears.map((tear, tIdx) => {
              const tearProgress = ((frame * tear.speed + tear.delay) % 70) / 70;
              const ty = tearProgress * 65 + 10;
              const tx = tear.xOff + Math.sin(ty * 0.1) * 4;
              const tearAlpha = Math.sin(tearProgress * Math.PI);

              return (
                <ellipse
                  key={tIdx}
                  cx={tx}
                  cy={ty}
                  rx={3.5}
                  ry={5.5}
                  fill="#67E8F9"
                  opacity={tearAlpha}
                />
              );
            })}

            {/* Label callout */}
            <rect
              x={-50}
              y={65}
              width={100}
              height={24}
              rx={12}
              fill="#1D4ED8"
              stroke="#06B6D4"
              strokeWidth={1.5}
            />
            <text
              x={0}
              y={81}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={11}
              fontWeight="900"
              letterSpacing={1.5}
            >
              CORE DESPAIR
            </text>
          </g>
        )}

        {/* --- BLUE X-RAY SCANNING BEAM --- */}
        {isBeamActive && (
          <g transform={`translate(0, ${beamY})`} filter="url(#cyanScanGlow)">
            {/* Horizontal Glowing Scanner Line */}
            <line
              x1={660}
              y1={0}
              x2={1260}
              y2={0}
              stroke="#06B6D4"
              strokeWidth={4}
              strokeLinecap="round"
            />
            {/* Diffuse Beam Cone Area */}
            <polygon
              points="660,0 1260,0 1230,-45 690,-45"
              fill="#06B6D4"
              opacity={0.18}
            />
            {/* HUD Target Ticks */}
            <rect x={650} y={-8} width={16} height={16} fill="none" stroke="#06B6D4" strokeWidth={2} />
            <rect x={1254} y={-8} width={16} height={16} fill="none" stroke="#06B6D4" strokeWidth={2} />
          </g>
        )}
      </svg>

      {/* Subtitle Card (Bottom Containment) */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-8">
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-xl text-center max-w-2xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            border: "1.5px solid #06B6D4",
          }}
        >
          <p className="text-base md:text-lg font-bold text-slate-800 m-0">
            Intense rage serves as an externalized protective shell over intolerable depressive grief.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
