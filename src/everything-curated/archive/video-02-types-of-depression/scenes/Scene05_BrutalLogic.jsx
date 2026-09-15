import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 5: The Brutal Logic - 120 frames
// =============================================================================
export const Scene05_BrutalLogic = () => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const strokeDash = `${drawProgress * 2600} 2600`;

  const laserY = interpolate(frame, [25, 105], [160, 920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#031A3A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        <defs>
          <clipPath id="laser-reveal-clip">
            <rect x="400" y="0" width="1120" height={laserY} />
          </clipPath>
        </defs>

        {/* Enlarged Wireframe Head (1.25x scale) */}
        <g transform="translate(960, 540) scale(1.25)">
          <path
            d="M 0 -300 C -180 -300 -280 -180 -280 0 C -280 120 -240 220 -160 300 L -140 400 L 140 400 L 160 300 C 240 220 280 120 280 0 C 280 -180 180 -300 0 -300 Z"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="5"
            strokeDasharray={strokeDash}
          />
        </g>

        {/* Revealed Circuitry inside Brain Area */}
        <g clipPath="url(#laser-reveal-clip)">
          <path
            d="
              M 800 360 H 920 V 440 H 1040 V 340 H 1140
              M 820 480 H 940 V 560 H 1060 V 500 H 1140
              M 880 280 V 380 H 960 V 460
              M 1040 280 V 380 H 980 V 540
              M 860 620 H 960 V 700 H 1080
            "
            fill="none"
            stroke="#22D3EE"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 0 14px #22D3EE)"
          />
          {[
            [800, 360],
            [920, 440],
            [1040, 340],
            [1140, 360],
            [820, 480],
            [940, 560],
            [1060, 500],
            [1140, 480],
            [880, 280],
            [960, 460],
            [1040, 280],
            [860, 620],
            [960, 700],
            [1080, 700],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="8"
              fill="#22D3EE"
              filter="drop-shadow(0 0 10px #22D3EE)"
            />
          ))}
        </g>

        {/* Prominent Cyan Laser Bar */}
        {frame >= 25 && frame <= 108 && (
          <g>
            <line
              x1="480"
              y1={laserY}
              x2="1440"
              y2={laserY}
              stroke="#22D3EE"
              strokeWidth="6"
              filter="drop-shadow(0 0 24px #22D3EE)"
            />
            <line
              x1="480"
              y1={laserY}
              x2="1440"
              y2={laserY}
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
