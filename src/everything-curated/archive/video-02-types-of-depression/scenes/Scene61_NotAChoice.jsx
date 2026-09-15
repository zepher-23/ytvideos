import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 61: Not a Choice - 180 frames
// =============================================================================
export const Scene61_NotAChoice = () => {
  const frame = useCurrentFrame();

  // Pencil pulled toward [A] HAPPY initially, then forcibly hijacked to [B] DEPRESSED after frame 35
  const pencilX =
    frame < 35
      ? interpolate(frame, [0, 35], [920, 760], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : interpolate(frame, [35, 55], [760, 1240], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const isBoxBChecked = frame >= 55;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Test Sheet on Desk - Enlarged to 1180x620 for prominent screen presence */}
        <g transform="translate(960, 540)">
          <rect
            x="-590"
            y="-310"
            width="1180"
            height="620"
            rx="24"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="12"
            filter="drop-shadow(0 25px 45px rgba(0,0,0,0.5))"
          />

          {/* Questionnaire Title Header */}
          <text
            x="0"
            y="-220"
            fill="#475569"
            fontSize="34"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
            letterSpacing="0.12em"
          >
            CLINICAL CHOICE ASSESSMENT
          </text>
          <line
            x1="-480"
            y1="-180"
            x2="480"
            y2="-180"
            stroke="#E2E8F0"
            strokeWidth="4"
          />

          {/* Option A: HAPPY */}
          <g transform="translate(-280, 20)">
            <rect
              x="-210"
              y="-70"
              width="420"
              height="140"
              rx="18"
              fill="#F8FAFC"
              stroke="#64748B"
              strokeWidth="6"
            />
            <text
              x="0"
              y="16"
              fill="#1E293B"
              fontSize="40"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
            >
              [ A ] HAPPY
            </text>
          </g>

          {/* Option B: DEPRESSED */}
          <g transform="translate(280, 20)">
            <rect
              x="-210"
              y="-70"
              width="420"
              height="140"
              rx="18"
              fill={isBoxBChecked ? "#FEE2E2" : "#F8FAFC"}
              stroke={isBoxBChecked ? "#DC2626" : "#64748B"}
              strokeWidth="6"
            />
            <text
              x="0"
              y="16"
              fill={isBoxBChecked ? "#DC2626" : "#1E293B"}
              fontSize="40"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
            >
              {isBoxBChecked ? "✔ DEPRESSED" : "[ B ] DEPRESSED"}
            </text>
          </g>

          {/* Subtext warning */}
          <text
            x="0"
            y="230"
            fill="#94A3B8"
            fontSize="26"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
            fontStyle="italic"
          >
            "Subject demonstrates involuntary biological override"
          </text>
        </g>

        {/* Stickman Hand & Ghostly Biological Force Hijacking the Pencil */}
        <g transform={`translate(${pencilX}, 560)`}>
          {/* Heavy Editorial Pencil */}
          <line
            x1="0"
            y1="-150"
            x2="0"
            y2="0"
            stroke="#EAB308"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <polygon points="-9,0 9,0 0,24" fill="#1E293B" />
          <line
            x1="-6"
            y1="-140"
            x2="6"
            y2="-140"
            stroke="#CA8A04"
            strokeWidth="4"
          />

          {/* Ghostly Translucent Hand wrapping around pencil */}
          {frame >= 35 && (
            <g>
              <ellipse
                cx="16"
                cy="-60"
                rx="52"
                ry="76"
                fill="rgba(56, 189, 248, 0.45)"
                stroke="#38BDF8"
                strokeWidth="6"
                filter="drop-shadow(0 0 20px #38BDF8)"
              />
              <path
                d="M -30 -100 C 0 -130, 60 -110, 45 -40"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="5"
                strokeDasharray="8 6"
              />
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
