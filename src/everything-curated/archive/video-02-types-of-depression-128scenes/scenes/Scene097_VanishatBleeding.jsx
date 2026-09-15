import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 97: Vanish at Bleeding
 * Duration: 150 frames (5.0s)
 * Environment: Clinical timeline continuous from Scene 96, clearing to bright clean space.
 * Transition: Continuous camera pan right.
 * Characters & Props: Timeline progressing to Day 1, vector deep red blood drop appears, rain cloud instantly evaporates, leaving clean clear space.
 */
export const Scene097_VanishatBleeding = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera pan right from Scene 96
  const panSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const panX = interpolate(panSpring, [0, 1], [250, 0]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Blood drop landing at Day 1: frames 25 to 50
  const dropSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 11, stiffness: 180 },
  });
  const dropY = interpolate(dropSpring, [0, 1], [-250, 0]);

  // Evaporation & clear trigger at frame 50
  const isEvaporated = frame >= 50;
  const clearProgress = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background transition from dark navy to bright clean clinical white
  const bgLightness = interpolate(clearProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: interpolate(bgLightness, [0, 1], ["#0B0F19", "#F8FAFC"]),
      }}
    >
      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: isEvaporated ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${isEvaporated ? "#B91C1C" : "#475569"}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight"
            style={{ color: isEvaporated ? "#B91C1C" : "#FFFFFF" }}
          >
            RAPID REMISSION AT BLEEDING
          </h1>
          <p
            className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0"
            style={{ color: isEvaporated ? "#64748B" : "#94A3B8" }}
          >
            Onset of Menses Triggers Near-Instantaneous Symptom Dissolution
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="bloodDropShadow97" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#7F1D1D" floodOpacity="0.5" />
          </filter>

          <linearGradient id="bloodGrad97" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>

        {/* TIMELINE SECTION: LATE LUTEAL (LEFT) TO DAY 1 (RIGHT) */}
        <g transform={`translate(${960 + panX}, 560)`}>
          {/* Base Horizontal Timeline Rail */}
          <line
            x1="-650"
            y1="0"
            x2="550"
            y2="0"
            stroke={isEvaporated ? "#CBD5E1" : "#334155"}
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* PREVIOUS LUTEAL ZONE (Evaporates / Fades out after frame 50) */}
          <g opacity={1 - clearProgress}>
            <rect
              x="-600"
              y="-120"
              width="550"
              height="240"
              rx="14"
              fill="rgba(239, 68, 68, 0.15)"
              stroke="#EF4444"
              strokeWidth="2.5"
            />
            <text x="-325" y="-140" fill="#EF4444" fontSize="18" fontWeight="900" textAnchor="middle">
              LUTEAL PHASE (DAYS 22–28)
            </text>

            {/* HEAVY DARK RAIN CLOUD (Evaporates after frame 50) */}
            <g transform="translate(-325, -240)">
              <path
                d="
                  M -70 20
                  A 30 30 0 0 1 -50 -20
                  A 45 45 0 0 1 20 -25
                  A 35 35 0 0 1 70 10
                  A 28 28 0 0 1 60 30
                  L -65 30 Z
                "
                fill="#334155"
                stroke="#64748B"
                strokeWidth="3"
              />
              {/* Falling Rain */}
              {[-35, -10, 15, 40].map((rx, i) => (
                <line
                  key={i}
                  x1={rx}
                  y1={40 + ((frame * 4 + i * 15) % 40)}
                  x2={rx - 4}
                  y2={55 + ((frame * 4 + i * 15) % 40)}
                  stroke="#94A3B8"
                  strokeWidth="2.5"
                />
              ))}
            </g>
          </g>

          {/* DAY 1 MARKER: ONSET OF MENSES (x = 0) */}
          <g transform="translate(0, 0)">
            <line x1="0" y1="-160" x2="0" y2="160" stroke="#B91C1C" strokeWidth="4" strokeDasharray="8 6" />
            
            <circle cx="0" cy="0" r="16" fill="#B91C1C" stroke="#FFFFFF" strokeWidth="4" />
            
            <rect x="-80" y="40" width="160" height="34" rx="8" fill="#1E293B" stroke="#B91C1C" strokeWidth="2" />
            <text x="0" y="63" fill="#FFFFFF" fontSize="14" fontWeight="900" textAnchor="middle" letterSpacing="1.5">
              DAY 1 (BLEEDING)
            </text>
          </g>

          {/* VECTOR RED BLOOD DROP (Lands at Day 1) */}
          <g
            transform={`translate(0, ${dropY})`}
            filter="url(#bloodDropShadow97)"
          >
            {/* Blood Drop Shape */}
            <path
              d="
                M 0 -70
                C 10 -40, 35 -15, 35 15
                A 35 35 0 1 1 -35 15
                C -35 -15, -10 -40, 0 -70 Z
              "
              fill="url(#bloodGrad97)"
              stroke="#B91C1C"
              strokeWidth="2"
            />
            {/* Specular Highlight */}
            <ellipse cx="-10" cy="10" rx="10" ry="16" transform="rotate(-20, -10, 10)" fill="#FFFFFF" opacity="0.4" />
          </g>

          {/* Ripple rings upon landing */}
          {isEvaporated && (
            <g transform="translate(0, 0)">
              <circle
                cx="0"
                cy="0"
                r={interpolate(clearProgress, [0, 1], [15, 120])}
                fill="none"
                stroke="#B91C1C"
                strokeWidth="3"
                opacity={1 - clearProgress}
              />
            </g>
          )}

          {/* CLEAN ASYMPTOMATIC HORIZON (Right of Day 1) */}
          {isEvaporated && (
            <g
              transform="translate(240, -50)"
              opacity={clearProgress}
            >
              <rect x="-140" y="-20" width="280" height="40" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
              <text x="0" y="6" fill="#047857" fontSize="15" fontWeight="900" textAnchor="middle" letterSpacing="1.5">
                ✓ 100% REMISSION RESTORED
              </text>
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
