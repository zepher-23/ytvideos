import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 124: Depression is Not a Choice
 * Duration: 180 frames (6.0s)
 * Environment: Solid blue background (#2563EB).
 * Characters & Props: Stickman, a multiple-choice test paper, a ghostly hand.
 * Action:
 * - Beginning: Stickman stands at a desk holding a pencil, hovering over a test paper. Box A reads "HAPPY", Box B reads "DEPRESSED". Text "CHOOSE..." types above.
 * - Action / Climax: He tries to move his pencil to Box A. A giant, semi-transparent ghostly hand appears, wraps forcefully around his wrist, and violently forces the pencil to fill in Box B (DEPRESSED) against his will.
 * - Ending / Hold: The stickman's arm remains locked in place by the ghostly hand. A red "X" stamps over Box A.
 * Text & Specific Colors: Ghostly hand semi-transparent white/blue. "DEPRESSED" box turns red (#EF4444). Background blue (#2563EB).
 */
export const Scene124_DepressionisNotaChoice = () => {
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

  // Typing prompt: frames 5 to 35
  const promptText = "CHOOSE...";
  const typedCount = Math.floor(
    interpolate(frame, [5, 35], [0, promptText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentPrompt = promptText.slice(0, typedCount);

  // Arm reach kinematics:
  // Frames 0-45: reaching towards Box A (x: 1040, y: 520)
  // Frames 45-80: ghostly hand grabs wrist and pulls forcibly down to Box B (x: 1040, y: 640)
  const reachProgress = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const forcedPullProgress = interpolate(frame, [48, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pencil tip coordinate
  const pencilX = 1040;
  const pencilY = interpolate(forcedPullProgress, [0, 1], [520, 640]);

  // Ghostly hand appearance: frame 45
  const ghostSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const ghostOpacity = interpolate(frame, [45, 52], [0, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scribble fill in Box B: frame 75 to 105
  const scribbleProgress = interpolate(frame, [75, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Box A Red "X" stamp: frame 95
  const stampSpring = spring({
    frame: frame - 95,
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [2.6, 1]);
  const stampOpacity = interpolate(frame, [95, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#2563EB",
      }}
    >
      {/* Background Subtle Gradient Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 60% 50%, rgba(37, 99, 235, 1) 0%, rgba(29, 78, 216, 1) 100%)",
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
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-3xl flex flex-col items-center"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            border: "1.5px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-white text-blue-900">
              Fundamental Truth
            </span>
            <span className="text-xs font-bold tracking-wider text-blue-200">
              Agency vs. Neurobiology
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-white">
            Depression is Not a Choice
          </h1>
          <p className="text-sm font-semibold text-blue-100 m-0">
            Pathology overrides conscious volition through neurochemical compulsion
          </p>
        </div>
      </div>

      {/* Main SVG Scene Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <filter id="ghostGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="paperShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="18" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* --- DESK SURFACE (x: 400 to 1600, y: 720 to 760) --- */}
        <rect x={380} y={730} width={1160} height={25} rx={6} fill="#1E293B" stroke="#0F172A" strokeWidth={3} />

        {/* --- MULTIPLE CHOICE TEST PAPER (Center: x: 920 to 1460, y: 380 to 730) --- */}
        <g id="testPaper" transform="translate(900, 360)" filter="url(#paperShadow)">
          {/* Paper Sheet */}
          <rect
            x={0}
            y={0}
            width={520}
            height={360}
            rx={12}
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth={3}
          />

          {/* Test Header */}
          <div className="p-6">
            <text x={30} y={45} fill="#0F172A" fontSize={20} fontWeight="900" letterSpacing={2}>
              AFFECTIVE SELECTION FORM
            </text>
            <text x={30} y={75} fill="#64748B" fontSize={15} fontWeight="bold">
              QUESTION 1: SELECT DESIRED MENTAL STATE
            </text>
            <line x1={30} y1={90} x2={490} y2={90} stroke="#E2E8F0" strokeWidth={2} />

            {/* Prompt Typed Text */}
            <text x={30} y={125} fill="#2563EB" fontSize={18} fontWeight="900" letterSpacing={3}>
              {currentPrompt}
            </text>

            {/* --- OPTION [A]: HAPPY (y: 160) --- */}
            <g transform="translate(30, 140)">
              {/* Checkbox */}
              <rect
                x={0}
                y={0}
                width={36}
                height={36}
                rx={6}
                fill="#F8FAFC"
                stroke="#64748B"
                strokeWidth={2.5}
              />
              <text x={50} y={26} fill="#0F172A" fontSize={24} fontWeight="900">
                [A] HAPPY
              </text>

              {/* Red "X" Stamp over Box A */}
              {stampOpacity > 0.01 && (
                <g
                  transform={`translate(18, 18) scale(${stampScale})`}
                  style={{ opacity: stampOpacity }}
                >
                  <circle cx={0} cy={0} r={28} fill="#DC2626" />
                  <line x1={-14} y1={-14} x2={14} y2={14} stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" />
                  <line x1={14} y1={-14} x2={-14} y2={14} stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" />
                </g>
              )}
            </g>

            {/* --- OPTION [B]: DEPRESSED (y: 240) --- */}
            <g transform="translate(30, 240)">
              {/* Checkbox: Turns red upon forced fill */}
              <rect
                x={0}
                y={0}
                width={36}
                height={36}
                rx={6}
                fill={scribbleProgress > 0.5 ? "rgba(239, 68, 68, 0.15)" : "#F8FAFC"}
                stroke={scribbleProgress > 0.5 ? "#EF4444" : "#64748B"}
                strokeWidth={scribbleProgress > 0.5 ? 3.5 : 2.5}
              />
              <text
                x={50}
                y={26}
                fill={scribbleProgress > 0.5 ? "#DC2626" : "#0F172A"}
                fontSize={24}
                fontWeight="900"
              >
                [B] DEPRESSED
              </text>

              {/* Violent Scribble Fill Inside Box B */}
              {scribbleProgress > 0 && (
                <path
                  d="M 6 6 L 30 30 M 30 6 L 6 30 M 8 18 L 28 18 M 18 8 L 18 28"
                  stroke="#DC2626"
                  strokeWidth={4.5}
                  strokeLinecap="round"
                  strokeDasharray="120"
                  strokeDashoffset={interpolate(scribbleProgress, [0, 1], [120, 0])}
                />
              )}
            </g>
          </div>
        </g>

        {/* --- STICKMAN HOLDING PENCIL --- */}
        <ellipse cx={560} cy={785} rx={85} ry={16} fill="#000000" opacity={0.3} />
        <CuratedStickman
          x={560}
          y={730}
          scale={0.84}
          variant="default"
          pose={frame < 45 ? "reaching" : "tense"}
          reachProgress={reachProgress}
          mouth={frame < 45 ? "neutral" : "frown"}
          eyes={frame < 45 ? "normal" : "defeat"}
          frame={frame}
        />

        {/* Pencil Held in Hand */}
        <g transform={`translate(${pencilX - 10}, ${pencilY}) rotate(-35)`}>
          {/* Yellow Pencil Shaft */}
          <rect x={-40} y={-4} width={40} height={8} fill="#F59E0B" stroke="#B45309" strokeWidth={1} />
          {/* Pink Eraser & Ferrule */}
          <rect x={-48} y={-4} width={8} height={8} fill="#F472B6" />
          <rect x={-43} y={-4} width={3} height={8} fill="#CBD5E1" />
          {/* Sharpened Wood & Graphite Tip */}
          <polygon points="0,-4 10,0 0,4" fill="#FDE68A" />
          <polygon points="6,-2 10,0 6,2" fill="#0F172A" />
        </g>

        {/* --- GIANT GHOSTLY HAND (Wraps around stickman's wrist) --- */}
        {ghostOpacity > 0.01 && (
          <g
            id="ghostlyHand"
            transform={`translate(${pencilX - 110}, ${pencilY - 60}) scale(${ghostSpring})`}
            filter="url(#ghostGlow)"
            style={{ opacity: ghostOpacity }}
          >
            {/* Spectral Ethereal Wrist and Palm */}
            <path
              d="M -120 -60 Q -40 -30 20 -20 Q 70 -10 100 10 L 90 40 Q 50 20 -20 10 L -120 0 Z"
              fill="rgba(255, 255, 255, 0.75)"
              stroke="#67E8F9"
              strokeWidth={3}
            />
            {/* Clamping Ghostly Fingers */}
            <path
              d="M 60 -10 Q 110 -20 130 15 Q 120 35 90 35"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={8}
              strokeLinecap="round"
            />
            <path
              d="M 50 5 Q 105 5 125 35 Q 110 50 85 45"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={8}
              strokeLinecap="round"
            />
            {/* Spectral Energy Tendrils */}
            <path
              d="M -100 -50 Q -50 -70 0 -50"
              fill="none"
              stroke="#A5F3FC"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
            <path
              d="M -90 -10 Q -40 -20 20 -5"
              fill="none"
              stroke="#A5F3FC"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
