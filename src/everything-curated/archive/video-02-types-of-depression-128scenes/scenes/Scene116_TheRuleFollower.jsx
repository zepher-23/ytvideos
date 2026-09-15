import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, TiledFloor } from "../../shared";

/**
 * Scene 116: The Rule Follower
 * Duration: 210 frames (7.0s)
 * Environment: Clean clinical environment with a calendar grid.
 * Characters & Props: Stickman, clinical desk, ticking clock, calendar.
 * Action:
 * - Beginning: A stickman sits at a clinical desk looking attentive. A vector clock and calendar are visible in the background. Text "Follow the Rules" types above.
 * - Action / Climax: He picks up a vector pill bottle and mimes swallowing a pill. A green checkmark appears above him. The clock hands spin, and the calendar pages flip rapidly (simulating weeks passing).
 * - Ending / Hold: He looks up at the calendar, expectant.
 * Text & Specific Colors: Checkmark green (#16A34A). Text and background clean sterile colors (white, light grey).
 */
export const Scene116_TheRuleFollower = () => {
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

  // Typing header: frames 0 to 40
  const titleText = "Follow the Rules";
  const typedCount = Math.floor(
    interpolate(frame, [5, 45], [0, titleText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentTitle = titleText.slice(0, typedCount);

  // Pill swallow kinematics: frames 30 to 75
  const swallowProgress = interpolate(frame, [30, 52, 70], [0, 1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Green checkmark entrance spring: frame 72
  const checkSpring = spring({
    frame: frame - 72,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const checkScale = interpolate(checkSpring, [0, 1], [0, 1]);
  const checkOpacity = interpolate(frame, [72, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Clock hands spinning (time lapse): frames 80 to 170
  const isTimeLapse = frame >= 80 && frame < 170;
  const timeLapseProgress = interpolate(frame, [80, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const minuteAngle = interpolate(frame, [0, 80, 170, 210], [45, 120, 120 + 360 * 6, 120 + 360 * 6 + 20]);
  const hourAngle = interpolate(frame, [0, 80, 170, 210], [90, 100, 100 + 180, 100 + 185]);

  // Calendar weeks progression: Week 1 (80), Week 2 (100), Week 4 (125), Week 6 (145), Week 8 (165+)
  const weekNumber =
    frame < 80
      ? "WEEK 1"
      : frame < 105
      ? "WEEK 2"
      : frame < 130
      ? "WEEK 4"
      : frame < 155
      ? "WEEK 6"
      : "WEEK 8";

  // Stickman head angle: looking up at calendar in ending
  const lookUpProgress = interpolate(frame, [160, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#F8FAFC",
      }}
    >
      {/* Floor Environment */}
      <TiledFloor floorY={780} perspective={600} opacity={0.35} />

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
            border: "1.5px solid #CBD5E1",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-emerald-600 text-white">
              Full Protocol Adherence
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-500">
              TRD Clinical Baseline
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-slate-900">
            {currentTitle}
            {typedCount < titleText.length && (
              <span className="animate-pulse ml-1 text-emerald-600">|</span>
            )}
          </h1>
          <p className="text-sm font-semibold text-slate-600 m-0">
            Taking every dose on time, following every doctor's instruction
          </p>
        </div>
      </div>

      {/* Main SVG Scene Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <filter id="checkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#16A34A" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* --- WALL ANALOG CLOCK (Background: x=1180, y=280) --- */}
        <g transform="translate(1180, 280)">
          {/* Clock Frame Shadow */}
          <ellipse cx={0} cy={10} rx={75} ry={75} fill="#000000" opacity={0.08} />
          {/* Outer Rim */}
          <circle cx={0} cy={0} r={70} fill="#FFFFFF" stroke="#0F172A" strokeWidth={5} />
          <circle cx={0} cy={0} r={64} fill="#F8FAFC" />
          {/* Hour Marks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const r1 = deg % 90 === 0 ? 50 : 54;
            const r2 = 60;
            return (
              <line
                key={deg}
                x1={Math.cos(rad) * r1}
                y1={Math.sin(rad) * r1}
                x2={Math.cos(rad) * r2}
                y2={Math.sin(rad) * r2}
                stroke="#334155"
                strokeWidth={deg % 90 === 0 ? 3.5 : 2}
              />
            );
          })}
          {/* Hour Hand */}
          <line
            x1={0}
            y1={0}
            x2={Math.cos((hourAngle * Math.PI) / 180) * 35}
            y2={Math.sin((hourAngle * Math.PI) / 180) * 35}
            stroke="#0F172A"
            strokeWidth={5}
            strokeLinecap="round"
          />
          {/* Minute Hand */}
          <line
            x1={0}
            y1={0}
            x2={Math.cos((minuteAngle * Math.PI) / 180) * 50}
            y2={Math.sin((minuteAngle * Math.PI) / 180) * 50}
            stroke="#16A34A"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          {/* Center Pin */}
          <circle cx={0} cy={0} r={5} fill="#0F172A" />
        </g>

        {/* --- WALL CALENDAR (Background: x=1420, y=280) --- */}
        <g transform="translate(1420, 280)">
          {/* Calendar Hanging Pin */}
          <line x1={-30} y1={-90} x2={0} y2={-110} stroke="#94A3B8" strokeWidth={2} />
          <line x1={30} y1={-90} x2={0} y2={-110} stroke="#94A3B8" strokeWidth={2} />
          <circle cx={0} cy={-110} r={4} fill="#64748B" />

          {/* Calendar Board */}
          <rect
            x={-90}
            y={-85}
            width={180}
            height={190}
            rx={10}
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth={3}
            style={{
              filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08))",
            }}
          />
          {/* Red Header Bar */}
          <path
            d="M -90 -75 A 10 10 0 0 1 -80 -85 L 80 -85 A 10 10 0 0 1 90 -75 L 90 -45 L -90 -45 Z"
            fill="#DC2626"
          />
          <text
            x={0}
            y={-58}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize={14}
            fontWeight="900"
            letterSpacing={2}
          >
            ADHERENCE
          </text>

          {/* Large Week Indicator */}
          <text
            x={0}
            y={15}
            textAnchor="middle"
            fill="#0F172A"
            fontSize={26}
            fontWeight="900"
            letterSpacing={1.5}
          >
            {weekNumber}
          </text>

          {/* Mini Checkmark Grid on Calendar */}
          <g transform="translate(-65, 45)">
            {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => (
              <circle
                key={dayIdx}
                cx={dayIdx * 21}
                cy={0}
                r={6}
                fill="#16A34A"
              />
            ))}
          </g>
          <text
            x={0}
            y={78}
            textAnchor="middle"
            fill="#16A34A"
            fontSize={12}
            fontWeight="bold"
            letterSpacing={1}
          >
            100% COMPLIANT
          </text>
        </g>

        {/* --- CLINICAL DESK & PROPS --- */}
        <g id="clinicalDesk" transform="translate(680, 680)">
          {/* Desk Surface */}
          <rect
            x={-180}
            y={0}
            width={420}
            height={18}
            rx={4}
            fill="#E2E8F0"
            stroke="#94A3B8"
            strokeWidth={3}
          />
          {/* Desk Legs */}
          <rect x={-150} y={18} width={14} height={95} fill="#94A3B8" />
          <rect x={200} y={18} width={14} height={95} fill="#94A3B8" />

          {/* Prescription Pill Bottle on Desk */}
          <g transform="translate(60, -42)">
            <rect x={-12} y={0} width={24} height={42} rx={4} fill="#F97316" stroke="#EA580C" strokeWidth={2} />
            <rect x={-14} y={-8} width={28} height={9} rx={2} fill="#FFFFFF" stroke="#CBD5E1" strokeWidth={1.5} />
            <rect x={-10} y={10} width={20} height={20} fill="#FFFFFF" />
            <text x={0} y={23} textAnchor="middle" fill="#000000" fontSize={8} fontWeight="bold">Rx</text>
          </g>

          {/* Glass of Water on Desk */}
          <g transform="translate(110, -45)">
            <path d="M -10 0 L -8 44 L 8 44 L 10 0 Z" fill="rgba(6, 182, 212, 0.2)" stroke="#94A3B8" strokeWidth={1.5} />
            <path d="M -9 12 L -7.5 42 L 7.5 42 L 9 12 Z" fill="rgba(6, 182, 212, 0.45)" />
          </g>
        </g>

        {/* --- GREEN CHECKMARK POP-IN (Over stickman's head) --- */}
        {checkOpacity > 0.01 && (
          <g
            transform={`translate(600, 480) scale(${checkScale})`}
            filter="url(#checkGlow)"
            style={{ opacity: checkOpacity }}
          >
            <circle cx={0} cy={0} r={32} fill="#16A34A" stroke="#FFFFFF" strokeWidth={3} />
            <path
              d="M -14 0 L -4 10 L 14 -8"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={5.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* --- STICKMAN SHADOW --- */}
        <ellipse cx={600} cy={785} rx={85} ry={16} fill="#000000" opacity={0.25} />

        {/* --- CANONICAL CURATED STICKMAN --- */}
        <CuratedStickman
          x={600}
          y={730}
          scale={0.84}
          variant="default"
          pose={frame < 30 ? "idle" : frame < 75 ? "reaching" : "idle"}
          reachProgress={swallowProgress}
          mouth="neutral"
          eyes="normal"
          frame={frame}
        />
      </svg>
    </AbsoluteFill>
  );
};
