import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CuratedCharacter } from "./CuratedCharacter";

export const LineUpScene = ({
  sceneStartX = 9600,
  frame: propFrame,
}) => {
  const currentFrame = useCurrentFrame();
  // Supports both isolated scene preview (frames 0 to 180) and master timeline (frames 1030 to 1210)
  const localFrame = propFrame !== undefined ? propFrame - 1030 : currentFrame;

  const groundY = 815;

  // Horizontal positions of the 3 stickmen within this scene's stage:
  const childX = sceneStartX + 520;  // 10120 (Screen x = 520)
  const teenX = sceneStartX + 960;   // 10560 (Screen x = 960 - center)
  const adultX = sceneStartX + 1400; // 11000 (Screen x = 1400)

  // =========================================================================
  // 1. SCANNER BEAM SWEEP KINEMATICS (Frames 25 to 135)
  // =========================================================================
  const scannerStartX = sceneStartX + 150;
  const scannerEndX = sceneStartX + 1770;
  const scanT = interpolate(localFrame, [25, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentScanX = scannerStartX + (scannerEndX - scannerStartX) * scanT;
  const isScanningActive = localFrame >= 25 && localFrame <= 140;

  // =========================================================================
  // 2. TARGET LOCK-ON STATES
  // =========================================================================
  // --- CHILD TARGET (Locks on at frame 45) ---
  const childLockT = interpolate(localFrame, [45, 53], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isChildLocked = localFrame >= 45;

  // --- TEEN TARGET (Locks on at frame 85) ---
  const teenLockT = interpolate(localFrame, [85, 93], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isTeenLocked = localFrame >= 85;

  // --- ADULT EVALUATION / BYPASS (Frame 120 to 142, fades out completely) ---
  const adultEvalT = interpolate(localFrame, [122, 128, 138, 145], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isAdultEvaluated = localFrame >= 122 && localFrame <= 145;

  // Gentle rhythmic pulse for active targets
  const pulse = Math.sin(localFrame * 0.18) * 0.05;

  return (
    <g id="scene-06-lineup-root">
      {/* ============================================================== */}
      {/* 1. YELLOW WALL BACKDROP (x in [9600, 11520])                   */}
      {/* ============================================================== */}
      <rect
        x={sceneStartX}
        y="0"
        width="1920"
        height="760"
        fill="#FDE047" // Vibrant 2D comic yellow wall
      />

      {/* Wall Baseboard Molding */}
      <rect
        x={sceneStartX}
        y="750"
        width="1920"
        height="18"
        fill="#EAB308"
        stroke="#000000"
        strokeWidth="4"
      />

      {/* ============================================================== */}
      {/* 2. POLICE / MEDICAL LINE-UP HEIGHT MEASUREMENT CHART           */}
      {/* ============================================================== */}
      <g id="lineup-height-chart" opacity="0.85">
        {/* Height strip backing */}
        <rect
          x={sceneStartX + 260}
          y="280"
          width="1400"
          height="470"
          fill="#FEF08A"
          fillOpacity="0.45"
          stroke="#CA8A04"
          strokeWidth="3"
          strokeDasharray="16 8"
        />

        {/* Height Major Marker Lines and Numbers */}
        {[
          { label: `6' - 0"`, y: 350 },
          { label: `5' - 6"`, y: 395 },
          { label: `5' - 0"`, y: 440 },
          { label: `4' - 6"`, y: 495 },
          { label: `4' - 0"`, y: 550 },
          { label: `3' - 6"`, y: 610 },
          { label: `3' - 0"`, y: 670 },
          { label: `2' - 6"`, y: 720 },
        ].map((line, idx) => (
          <g key={`height-line-${idx}`}>
            {/* Left measurement label */}
            <text
              x={sceneStartX + 275}
              y={line.y + 5}
              fill="#713F12"
              fontSize="16"
              fontWeight="900"
              fontFamily="Impact, Arial Black, sans-serif"
              letterSpacing="1"
            >
              {line.label}
            </text>

            {/* Horizontal guideline */}
            <line
              x1={sceneStartX + 360}
              y1={line.y}
              x2={sceneStartX + 1560}
              y2={line.y}
              stroke="#A16207"
              strokeWidth="2.5"
              strokeDasharray={idx % 2 === 0 ? "none" : "8 6"}
            />

            {/* Right measurement label */}
            <text
              x={sceneStartX + 1575}
              y={line.y + 5}
              fill="#713F12"
              fontSize="16"
              fontWeight="900"
              fontFamily="Impact, Arial Black, sans-serif"
              letterSpacing="1"
            >
              {line.label}
            </text>
          </g>
        ))}

        {/* Centered Chart Header */}
        <text
          x={sceneStartX + 960}
          y="315"
          fill="#854D0E"
          fontSize="22"
          fontWeight="900"
          fontFamily="Arial Black, sans-serif"
          letterSpacing="4"
          textAnchor="middle"
        >
          DEVELOPMENTAL COHORT // LINE-UP
        </text>
      </g>

      {/* ============================================================== */}
      {/* 3. THE THREE STICKMEN (CHILD, TEEN, ADULT)                     */}
      {/* ============================================================== */}

      {/* -------------------------------------------------------------- */}
      {/* A. CHILD STICKMAN (Canonical child proportions)                */}
      {/* -------------------------------------------------------------- */}
      <CuratedCharacter
        x={childX}
        y={groundY}
        variant="child"
        scale={0.78}
        pose="idle"
        mouth="smile"
      />

      {/* -------------------------------------------------------------- */}
      {/* B. TEEN STICKMAN (Canonical lanky teen proportions)            */}
      {/* -------------------------------------------------------------- */}
      <CuratedCharacter
        x={teenX}
        y={groundY}
        variant="teen"
        scale={0.92}
        pose="idle"
        mouth="flat"
      />

      {/* -------------------------------------------------------------- */}
      {/* C. ADULT STICKMAN (Canonical adult reference proportions)      */}
      {/* -------------------------------------------------------------- */}
      <CuratedCharacter
        x={adultX}
        y={groundY}
        variant="adult"
        scale={1.05}
        pose="idle"
        mouth="flat"
      />

      {/* ============================================================== */}
      {/* 4. TARGETING SCANNER & HIGHLIGHT BOXES                         */}
      {/* ============================================================== */}

      {/* --- TARGET 1: CHILD HIGHLIGHT (Locks at frame 45) --- */}
      {isChildLocked && (
        <g id="child-targeting-hud" opacity={Math.min(1, childLockT * 1.4)}>
          {/* Pulsing Red Translucent Highlight Fill */}
          <rect
            x={childX - 95}
            y={groundY - 245}
            width="190"
            height="255"
            rx="12"
            fill="#EF4444"
            fillOpacity={0.20 + pulse}
            stroke="#DC2626"
            strokeWidth="3.5"
            strokeDasharray="14 8"
          />

          {/* High-Tech Corner Brackets [ ] */}
          {/* Top-Left */}
          <path
            d={`M ${childX - 105} ${groundY - 225} L ${childX - 105} ${groundY - 255} L ${childX - 75} ${groundY - 255}`}
            fill="none"
            stroke="#DC2626"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Top-Right */}
          <path
            d={`M ${childX + 75} ${groundY - 255} L ${childX + 105} ${groundY - 255} L ${childX + 105} ${groundY - 225}`}
            fill="none"
            stroke="#DC2626"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Bottom-Left */}
          <path
            d={`M ${childX - 105} ${groundY - 20} L ${childX - 105} ${groundY + 15} L ${childX - 75} ${groundY + 15}`}
            fill="none"
            stroke="#DC2626"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Bottom-Right */}
          <path
            d={`M ${childX + 75} ${groundY + 15} L ${childX + 105} ${groundY + 15} L ${childX + 105} ${groundY - 20}`}
            fill="none"
            stroke="#DC2626"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Center Target Crosshair */}
          <g transform={`translate(${childX}, ${groundY - 145})`}>
            <circle cx="0" cy="0" r="22" fill="none" stroke="#DC2626" strokeWidth="2.5" opacity="0.7" />
            <line x1="-30" y1="0" x2="-14" y2="0" stroke="#DC2626" strokeWidth="3" />
            <line x1="14" y1="0" x2="30" y2="0" stroke="#DC2626" strokeWidth="3" />
            <line x1="0" y1="-30" x2="0" y2="-14" stroke="#DC2626" strokeWidth="3" />
            <line x1="0" y1="14" x2="0" y2="30" stroke="#DC2626" strokeWidth="3" />
          </g>

          {/* Top Status Tag Badge */}
          <g transform={`translate(${childX}, ${groundY - 275})`}>
            <rect
              x="-90"
              y="-12"
              width="180"
              height="24"
              rx="4"
              fill="#DC2626"
              stroke="#000000"
              strokeWidth="2.5"
            />
            <text
              x="0"
              y="5"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              fontFamily="monospace"
              letterSpacing="1"
              textAnchor="middle"
            >
              TARGET 01 // CHILD
            </text>
          </g>

          {/* Bottom Diagnosis Tag */}
          <g transform={`translate(${childX}, ${groundY + 34})`}>
            <rect
              x="-80"
              y="-10"
              width="160"
              height="20"
              rx="3"
              fill="#1F2937"
              stroke="#DC2626"
              strokeWidth="2"
            />
            <text
              x="0"
              y="4"
              fill="#F87171"
              fontSize="11"
              fontWeight="800"
              fontFamily="monospace"
              textAnchor="middle"
            >
              POSITIVE // ADHD-H
            </text>
          </g>
        </g>
      )}

      {/* --- TARGET 2: TEEN HIGHLIGHT (Locks at frame 85) --- */}
      {isTeenLocked && (
        <g id="teen-targeting-hud" opacity={Math.min(1, teenLockT * 1.4)}>
          {/* Pulsing Red Translucent Highlight Fill */}
          <rect
            x={teenX - 110}
            y={groundY - 375}
            width="220"
            height="390"
            rx="14"
            fill="#EF4444"
            fillOpacity={0.20 + pulse}
            stroke="#DC2626"
            strokeWidth="3.5"
            strokeDasharray="14 8"
          />

          {/* High-Tech Corner Brackets [ ] */}
          {/* Top-Left */}
          <path
            d={`M ${teenX - 120} ${groundY - 350} L ${teenX - 120} ${groundY - 385} L ${teenX - 85} ${groundY - 385}`}
            fill="none"
            stroke="#DC2626"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Top-Right */}
          <path
            d={`M ${teenX + 85} ${groundY - 385} L ${teenX + 120} ${groundY - 385} L ${teenX + 120} ${groundY - 350}`}
            fill="none"
            stroke="#DC2626"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Bottom-Left */}
          <path
            d={`M ${teenX - 120} ${groundY - 25} L ${teenX - 120} ${groundY + 18} L ${teenX - 85} ${groundY + 18}`}
            fill="none"
            stroke="#DC2626"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Bottom-Right */}
          <path
            d={`M ${teenX + 85} ${groundY + 18} L ${teenX + 120} ${groundY + 18} L ${teenX + 120} ${groundY - 25}`}
            fill="none"
            stroke="#DC2626"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Center Target Crosshair */}
          <g transform={`translate(${teenX}, ${groundY - 210})`}>
            <circle cx="0" cy="0" r="26" fill="none" stroke="#DC2626" strokeWidth="2.5" opacity="0.7" />
            <line x1="-34" y1="0" x2="-16" y2="0" stroke="#DC2626" strokeWidth="3" />
            <line x1="16" y1="0" x2="34" y2="0" stroke="#DC2626" strokeWidth="3" />
            <line x1="0" y1="-34" x2="0" y2="-16" stroke="#DC2626" strokeWidth="3" />
            <line x1="0" y1="16" x2="0" y2="34" stroke="#DC2626" strokeWidth="3" />
          </g>

          {/* Top Status Tag Badge */}
          <g transform={`translate(${teenX}, ${groundY - 405})`}>
            <rect
              x="-90"
              y="-12"
              width="180"
              height="24"
              rx="4"
              fill="#DC2626"
              stroke="#000000"
              strokeWidth="2.5"
            />
            <text
              x="0"
              y="5"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              fontFamily="monospace"
              letterSpacing="1"
              textAnchor="middle"
            >
              TARGET 02 // TEEN
            </text>
          </g>

          {/* Bottom Diagnosis Tag */}
          <g transform={`translate(${teenX}, ${groundY + 38})`}>
            <rect
              x="-85"
              y="-10"
              width="170"
              height="20"
              rx="3"
              fill="#1F2937"
              stroke="#DC2626"
              strokeWidth="2"
            />
            <text
              x="0"
              y="4"
              fill="#F87171"
              fontSize="11"
              fontWeight="800"
              fontFamily="monospace"
              textAnchor="middle"
            >
              POSITIVE // PERSISTENT
            </text>
          </g>
        </g>
      )}

      {/* --- ADULT EVALUATION SCAN (Brief pass at frames 122-145, then disappears) --- */}
      {isAdultEvaluated && (
        <g id="adult-scan-eval" opacity={adultEvalT}>
          {/* Neutral soft border momentarily checking */}
          <rect
            x={adultX - 120}
            y={groundY - 515}
            width="240"
            height="530"
            rx="16"
            fill="none"
            stroke="#10B981" // Soft green bypass
            strokeWidth="3"
            strokeDasharray="10 8"
          />
          {/* Bypass Badge */}
          <g transform={`translate(${adultX}, ${groundY - 540})`}>
            <rect
              x="-95"
              y="-12"
              width="190"
              height="24"
              rx="4"
              fill="#10B981"
              stroke="#000000"
              strokeWidth="2.5"
            />
            <text
              x="0"
              y="5"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              fontFamily="monospace"
              letterSpacing="1"
              textAnchor="middle"
            >
              BYPASS // NO MATCH
            </text>
          </g>
        </g>
      )}

      {/* ============================================================== */}
      {/* 5. VERTICAL SWEEPING SCANNER LASER BEAM                        */}
      {/* ============================================================== */}
      {isScanningActive && (
        <g id="targeting-scanner-beam" transform={`translate(${currentScanX}, 0)`}>
          {/* Glowing laser light wash corridor behind the beam */}
          <rect
            x="-40"
            y="80"
            width="80"
            height="735"
            fill="#EF4444"
            opacity="0.12"
          />

          {/* Secondary bright line */}
          <line
            x1="0"
            y1="80"
            x2="0"
            y2="815"
            stroke="#FCA5A5"
            strokeWidth="8"
            opacity="0.55"
          />

          {/* Intense core laser beam */}
          <line
            x1="0"
            y1="80"
            x2="0"
            y2="815"
            stroke="#DC2626"
            strokeWidth="3.5"
          />

          {/* Top Emitter Beacon */}
          <g transform="translate(0, 80)">
            <polygon points="-12,-8 12,-8 6,10 -6,10" fill="#1F2937" stroke="#000000" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4.5" fill="#EF4444" />
          </g>

          {/* Bottom Emitter Beacon */}
          <g transform="translate(0, 815)">
            <polygon points="-12,8 12,8 6,-10 -6,-10" fill="#1F2937" stroke="#000000" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4.5" fill="#EF4444" />
          </g>
        </g>
      )}
    </g>
  );
};
