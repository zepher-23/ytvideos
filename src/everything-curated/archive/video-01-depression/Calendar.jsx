import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const Calendar = ({
  x = 1350,
  y = 170,
  width = 420,
  height = 500,
  frame: propFrame,
}) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  // Subtle natural calendar pendulum sway on wall pin
  const swayAngle = Math.sin(frame * 0.06) * 1.2;

  // Hand-drawn red circle animation circling the date (frame 33 to 63)
  const circleProgress = interpolate(frame, [33, 63], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const circlePerimeter = 150;
  const strokeDashoffset = circlePerimeter * (1 - circleProgress);

  // Calendar dates setup (September example)
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = [
    ["", "", 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, "", "", ""],
  ];

  // The circled special date
  const specialDate = 14;

  return (
    <g
      id="calendar-container"
      transform={`translate(${x}, ${y}) rotate(${swayAngle} 210 20)`}
    >
      {/* Wall Pin / Nail */}
      <circle
        cx="210"
        cy="20"
        r="9"
        fill="#000000"
        stroke="#000000"
        strokeWidth="3"
      />
      <circle cx="208" cy="18" r="3" fill="#FFFFFF" />

      {/* Hanging Strings from Pin to Calendar Header */}
      <line
        x1="210"
        y1="20"
        x2="90"
        y2="80"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="210"
        y1="20"
        x2="330"
        y2="80"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Calendar Hard Comic Drop Shadow */}
      <rect
        x="36"
        y="88"
        width="360"
        height="430"
        rx="18"
        fill="#000000"
        opacity="0.2"
      />

      {/* Main Calendar Body (White Paper with 7.5px Black Outline) */}
      <rect
        x="30"
        y="80"
        width="360"
        height="430"
        rx="18"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="7.5"
        strokeLinejoin="round"
      />

      {/* Comic Red Top Header Bar */}
      <path
        d="M 30 155 L 30 98 Q 30 80 48 80 L 372 80 Q 390 80 390 98 L 390 155 Z"
        fill="#EF4444"
        stroke="#000000"
        strokeWidth="7.5"
        strokeLinejoin="round"
      />

      {/* Spiral Binder Rings (Black loops linking sheets) */}
      {[70, 140, 210, 280, 350].map((rx, idx) => (
        <g key={`ring-${idx}`}>
          <rect
            x={rx - 8}
            y="72"
            width="16"
            height="22"
            rx="6"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="4.5"
          />
        </g>
      ))}

      {/* Month & Year Text */}
      <text
        x="210"
        y="126"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontSize="25"
        letterSpacing="3"
        stroke="#000000"
        strokeWidth="2"
        paintOrder="stroke fill"
      >
        SEPTEMBER
      </text>
      <text
        x="210"
        y="145"
        textAnchor="middle"
        fill="#FDE047"
        fontFamily="'Arial Black', sans-serif"
        fontSize="13"
        fontWeight="bold"
      >
        2026
      </text>

      {/* Days of the Week Header Row */}
      {daysOfWeek.map((day, idx) => {
        const dx = 42 + idx * 48 + 24;
        const isWeekend = idx === 0 || idx === 6;
        return (
          <text
            key={`dow-${idx}`}
            x={dx}
            y="185"
            textAnchor="middle"
            fill={isWeekend ? "#EF4444" : "#4B5563"}
            fontFamily="'Arial Black', sans-serif"
            fontSize="15"
            fontWeight="bold"
          >
            {day}
          </text>
        );
      })}

      {/* Header Separator Line */}
      <line
        x1="45"
        y1="198"
        x2="375"
        y2="198"
        stroke="#000000"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Dates Grid */}
      {dates.map((week, wIdx) => {
        const wy = 236 + wIdx * 52;
        return (
          <g key={`week-${wIdx}`}>
            {week.map((num, dIdx) => {
              if (num === "") return null;
              const dx = 42 + dIdx * 48 + 24;
              const isWeekend = dIdx === 0 || dIdx === 6;
              const isSpecial = num === specialDate;

              return (
                <g key={`date-${wIdx}-${dIdx}`}>
                  {/* Circled marker on the special date */}
                  {isSpecial && circleProgress > 0 && (
                    <ellipse
                      cx={dx}
                      cy={wy - 6}
                      rx="21"
                      ry="18"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={circlePerimeter}
                      strokeDashoffset={strokeDashoffset}
                      transform={`rotate(-6 ${dx} ${wy - 6})`}
                    />
                  )}

                  {/* Date number */}
                  <text
                    x={dx}
                    y={wy}
                    textAnchor="middle"
                    fill={isSpecial ? "#DC2626" : isWeekend ? "#EF4444" : "#1F2937"}
                    fontFamily="'Arial Black', sans-serif"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    {num}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Folded Paper Bottom Corner (Comic touch) */}
      <path
        d="M 350 510 L 390 470 L 350 470 Z"
        fill="#E5E7EB"
        stroke="#000000"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <line
        x1="350"
        y1="510"
        x2="390"
        y2="470"
        stroke="#000000"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </g>
  );
};
