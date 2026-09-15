import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 1: The Hook (Sadness vs. Malfunction) - 120 frames
// =============================================================================
export const Scene01_TheHook = () => {
  const frame = useCurrentFrame();

  const gridY = (frame * 1.5) % 60;

  // Left Side: Sadness graph
  const sadnessDip = Math.sin(Math.min(Math.PI, (frame / 45) * Math.PI)) * 130;
  const sadnessY = 560 + sadnessDip;

  // Right Side: Depression graph & shatter
  const dropStart = 20;
  const dropEnd = 45;
  const depressionProgress = interpolate(frame, [dropStart, dropEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const easedDrop = Math.pow(depressionProgress, 3);
  const redY = 560 + easedDrop * 400;

  const isShattered = frame >= dropEnd;
  const shatterElapsed = Math.max(0, frame - dropEnd);
  const shatterOpacity = interpolate(shatterElapsed, [0, 25], [1, 0], {
    extrapolateRight: "clamp",
  });

  const fragments = [
    { dx: -70, dy: -50, rot: -40 },
    { dx: 80, dy: -45, rot: 55 },
    { dx: -100, dy: 15, rot: -75 },
    { dx: 95, dy: 35, rot: 60 },
    { dx: -40, dy: -85, rot: -20 },
    { dx: 50, dy: -75, rot: 35 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      {/* Rising Grid */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.16,
        }}
      >
        <defs>
          <pattern
            id="rising-grid-sc1"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(0, ${-gridY})`}
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rising-grid-sc1)" />
      </svg>

      {/* Split Divider */}
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 60,
          bottom: 60,
          width: 3,
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      />

      {/* Left Side: SADNESS */}
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 110,
          color: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
          fontSize: 68,
          fontWeight: 900,
          letterSpacing: "0.06em",
        }}
      >
        SADNESS
      </div>

      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 960,
          height: 1080,
        }}
      >
        <line
          x1="80"
          y1="560"
          x2="880"
          y2="560"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="3"
          strokeDasharray="8 8"
        />
        <path
          d={`M 80 560 Q 280 ${560 + sadnessDip * 1.6} 480 ${sadnessY} T 880 560`}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="10"
          strokeLinecap="round"
          filter="drop-shadow(0 0 16px rgba(56, 189, 248, 0.6))"
        />
        <circle cx="480" cy={sadnessY} r="14" fill="#38BDF8" />
      </svg>

      {/* Right Side: DEPRESSION */}
      <div
        style={{
          position: "absolute",
          left: 1100,
          top: 110,
          color: "#EF4444",
          fontFamily: "Inter, sans-serif",
          fontSize: 68,
          fontWeight: 900,
          letterSpacing: "0.06em",
          textShadow: "0 0 35px rgba(239, 68, 68, 0.6)",
          transform: `scale(${frame < dropStart ? 0.95 : Math.min(1.08, 1 + (frame - dropStart) * 0.01)})`,
        }}
      >
        DEPRESSION
      </div>

      <svg
        style={{
          position: "absolute",
          left: 960,
          top: 0,
          width: 960,
          height: 1080,
        }}
      >
        <line
          x1="80"
          y1="560"
          x2="880"
          y2="560"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="3"
          strokeDasharray="8 8"
        />

        {!isShattered ? (
          <>
            <line
              x1="80"
              y1="560"
              x2="480"
              y2="560"
              stroke="#EF4444"
              strokeWidth="12"
              strokeLinecap="round"
              filter="drop-shadow(0 0 16px #EF4444)"
            />
            <line
              x1="480"
              y1="560"
              x2="480"
              y2={redY}
              stroke="#EF4444"
              strokeWidth="12"
              strokeLinecap="round"
              filter="drop-shadow(0 0 16px #EF4444)"
            />
            <circle
              cx="480"
              cy={redY}
              r="16"
              fill="#EF4444"
              filter="drop-shadow(0 0 20px #EF4444)"
            />
          </>
        ) : (
          <g opacity={shatterOpacity}>
            {fragments.map((frag, i) => (
              <line
                key={i}
                x1={480 + frag.dx * (shatterElapsed / 8)}
                y1={960 + frag.dy * (shatterElapsed / 8)}
                x2={480 + (frag.dx + 40) * (shatterElapsed / 8)}
                y2={960 + (frag.dy + 25) * (shatterElapsed / 8)}
                stroke="#EF4444"
                strokeWidth="8"
                strokeLinecap="round"
                filter="drop-shadow(0 0 12px #EF4444)"
                transform={`rotate(${frag.rot * (shatterElapsed / 12)}, ${480 + frag.dx}, ${960 + frag.dy})`}
              />
            ))}
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
