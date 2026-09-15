import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const MedicalChartScene = ({
  sceneStartX = 7680,
  frame: propFrame,
}) => {
  const currentFrame = useCurrentFrame();
  // Support both isolated scene preview (currentFrame 0 to 180) and master timeline (propFrame 850 to 1030)
  const localFrame = propFrame !== undefined ? propFrame - 850 : currentFrame;

  const centerX = sceneStartX + 960; // 8640
  const centerY = 540;

  // =========================================================================
  // 1. TIMING PHASES (Total 180 frames = 6.0 seconds @ 30fps)
  // =========================================================================
  // - Frames 0 to 30:   "Naughty List" paper rests prominently in center
  // - Frames 30 to 45:  Medical Clipboard drops / slams down from above
  // - Frames 38 to 56:  Impact! "Naughty List" rips cleanly in half, parting left and right
  // - Frames 52 to 145: Jagged, abnormal EEG brainwave draws across chart grid
  // - Frames 110 to 180: Red diagnostic stamp "ABNORMAL" slams on medical chart
  // =========================================================================

  // --- PAPER RIP MOTION ---
  // When medical chart strikes (frame 38 to 56):
  const ripProgress = interpolate(localFrame, [38, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Smooth cubic ease-out
  const ripEase = ripProgress * ripProgress * (3 - 2 * ripProgress);
  const leftPaperShiftX = -155 * ripEase;
  const leftPaperRot = -8.5 * ripEase;
  const rightPaperShiftX = 155 * ripEase;
  const rightPaperRot = 8.5 * ripEase;
  const paperSeparationY = 22 * ripEase;

  // --- MEDICAL CHART SLAM DOWN ---
  // Drops from y = -650 to y = centerY (540)
  let chartY = -700;
  if (localFrame < 28) {
    chartY = -700;
  } else if (localFrame <= 42) {
    // Fast downward slam
    const t = (localFrame - 28) / 14;
    const easeDown = t * t * (2.7 * t - 1.7); // anticipation + slam
    chartY = -700 + (centerY - -700) * (t * t);
  } else if (localFrame <= 49) {
    // Rebound / bounce
    const t = (localFrame - 42) / 7;
    const bounce = Math.sin(t * Math.PI) * 14;
    chartY = centerY - bounce;
  } else {
    chartY = centerY;
  }

  // --- IMPACT SHOCKWAVE (Frames 41 to 52) ---
  const impactProgress = interpolate(localFrame, [41, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const impactScale = 0.6 + 0.9 * impactProgress;
  const impactOpacity = (1 - impactProgress) * 0.75;

  // --- BRAINWAVE LINE PROGRESSION ---
  // Draws from x = 0 to x = 520 between local frame 52 and 142
  const waveDrawProgress = interpolate(localFrame, [52, 142], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sharp, irregular, jagged abnormal brainwave coordinate sequence
  // Distinct from smooth sine waves: sudden high-voltage spikes, acute dips, rapid erratic bursts
  const wavePoints = [
    { x: 0, y: 160 },
    { x: 22, y: 160 },
    { x: 34, y: 154 },
    { x: 44, y: 166 },
    { x: 55, y: 158 },
    { x: 65, y: 160 },
    // First abnormal sharp surge:
    { x: 74, y: 110 },  // sudden spike up
    { x: 82, y: 225 },  // sharp plunge down
    { x: 92, y: 145 },  // rebound
    { x: 104, y: 160 }, // baseline
    { x: 118, y: 158 },
    // Jagged hyper-frequency cluster:
    { x: 128, y: 95 },  // very high spike
    { x: 136, y: 235 }, // deep valley
    { x: 144, y: 80 },  // severe abnormal spike
    { x: 152, y: 215 },
    { x: 162, y: 125 },
    { x: 172, y: 175 },
    { x: 184, y: 160 },
    // Irregular slow wave followed by acute spike:
    { x: 198, y: 152 },
    { x: 212, y: 172 },
    { x: 225, y: 130 },
    { x: 232, y: 55 },  // massive acute peak
    { x: 240, y: 250 }, // acute dip
    { x: 248, y: 140 },
    { x: 258, y: 170 },
    { x: 270, y: 158 },
    // High-amplitude dysregulation burst:
    { x: 282, y: 68 },
    { x: 290, y: 242 },
    { x: 298, y: 88 },
    { x: 306, y: 228 },
    { x: 316, y: 120 },
    { x: 326, y: 185 },
    { x: 338, y: 156 },
    { x: 350, y: 162 },
    // Chaotic multi-phasic spikes:
    { x: 362, y: 75 },
    { x: 370, y: 238 },
    { x: 378, y: 105 },
    { x: 386, y: 210 },
    { x: 396, y: 135 },
    { x: 408, y: 178 },
    { x: 420, y: 155 },
    { x: 432, y: 160 },
    // Sharp terminal spike & stabilization:
    { x: 442, y: 85 },
    { x: 452, y: 230 },
    { x: 464, y: 140 },
    { x: 476, y: 165 },
    { x: 490, y: 160 },
    { x: 520, y: 160 },
  ];

  // Convert points to SVG polyline string up to waveDrawProgress
  const totalPoints = wavePoints.length;
  const currentPointIndex = Math.floor(waveDrawProgress * (totalPoints - 1));
  const activePoints = wavePoints.slice(0, currentPointIndex + 1);
  if (currentPointIndex < totalPoints - 1 && waveDrawProgress > 0) {
    const nextP = wavePoints[currentPointIndex + 1];
    const prevP = wavePoints[currentPointIndex];
    const subT = (waveDrawProgress * (totalPoints - 1)) - currentPointIndex;
    activePoints.push({
      x: prevP.x + (nextP.x - prevP.x) * subT,
      y: prevP.y + (nextP.y - prevP.y) * subT,
    });
  }
  const wavePointsStr = activePoints.map((p) => `${p.x},${p.y}`).join(" ");
  const activeHead = activePoints[activePoints.length - 1] || wavePoints[0];

  // --- DIAGNOSTIC STAMP REVEAL (Frames 112 to 180) ---
  const stampProgress = interpolate(localFrame, [112, 122], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stampScale = 2.4 - 1.4 * stampProgress; // slams down from 2.4x to 1.0x
  const stampOpacity = Math.min(1, stampProgress * 1.5);

  return (
    <g id="scene-05-medical-chart-root">
      {/* ============================================================== */}
      {/* SCENE BACKGROUND & SETTING (X in [7680, 9600])                 */}
      {/* ============================================================== */}
      {/* Wall backdrop (soft mint-grey clinical warmth) */}
      <rect
        x={sceneStartX}
        y="0"
        width="1920"
        height="760"
        fill="#F1F5F9" // Clean neutral medical slate-50
      />
      {/* Wall trim baseboard */}
      <rect
        x={sceneStartX}
        y="750"
        width="1920"
        height="18"
        fill="#CBD5E1"
        stroke="#000000"
        strokeWidth="4"
      />
      {/* Clinical inspection desk surface */}
      <rect
        x={sceneStartX}
        y="768"
        width="1920"
        height="312"
        fill="#E2E8F0"
        stroke="#000000"
        strokeWidth="6"
      />

      {/* ============================================================== */}
      {/* 1. "NAUGHTY LIST" PAPER (Rips cleanly in half upon impact)    */}
      {/* ============================================================== */}
      <g id="naughty-list-container">
        {/* --- LEFT HALF OF TORN PAPER --- */}
        <g
          id="naughty-list-left"
          transform={`translate(${centerX - 130 + leftPaperShiftX}, ${centerY + paperSeparationY}) rotate(${leftPaperRot}, 0, 0)`}
        >
          {/* Paper Drop Shadow */}
          <path
            d="M -150 -250 L 0 -250 L 0 260 L -150 260 Z"
            fill="#000000"
            opacity="0.22"
            transform="translate(10, 12)"
          />

          {/* Left Paper Body with Clean Torn Jagged Edge on Right Seam */}
          <path
            d="
              M -145 -250
              L 0 -250
              L 3 -210
              L -2 -170
              L 4 -130
              L -3 -90
              L 3 -50
              L -2 -10
              L 4 30
              L -3 70
              L 3 110
              L -2 150
              L 4 190
              L -3 230
              L 0 255
              L -145 255
              Z
            "
            fill="#FEF3C7" // Warm aged parchment amber-50
            stroke="#000000"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />

          {/* Left Half Title: "NAUGH" */}
          <text
            x="-125"
            y="-185"
            fill="#DC2626" // Bold red title
            fontSize="38"
            fontWeight="900"
            fontFamily="Arial Black, Impact, sans-serif"
            letterSpacing="2"
          >
            NAUGH
          </text>
          {/* Red underline left */}
          <line
            x1="-130"
            y1="-172"
            x2="-4"
            y2="-172"
            stroke="#DC2626"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Horizontal Lined Paper Rules (faint blue) */}
          {[-120, -70, -20, 30, 80, 130, 180].map((lineY) => (
            <line
              key={`left-line-${lineY}`}
              x1="-132"
              y1={lineY}
              x2="-4"
              y2={lineY}
              stroke="#CBD5E1"
              strokeWidth="2.5"
            />
          ))}

          {/* Left Checklist Items */}
          <g transform="translate(-130, -110)">
            {/* Item 1 */}
            <rect x="0" y="-14" width="18" height="18" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
            <path d="M 3 -4 L 8 2 L 17 -10" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <text x="26" y="0" fill="#1F2937" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              Won't sit still
            </text>

            {/* Item 2 */}
            <rect x="0" y="36" width="18" height="18" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
            <path d="M 3 46 L 8 52 L 17 40" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <text x="26" y="50" fill="#1F2937" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              Disruptive in cl-
            </text>

            {/* Item 3 */}
            <rect x="0" y="86" width="18" height="18" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
            <path d="M 3 96 L 8 102 L 17 90" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <text x="26" y="100" fill="#1F2937" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              Doesn't listen
            </text>

            {/* Item 4 */}
            <rect x="0" y="136" width="18" height="18" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
            <path d="M 3 146 L 8 152 L 17 140" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <text x="26" y="150" fill="#1F2937" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              Impulsive act-
            </text>

            {/* Item 5 */}
            <rect x="0" y="186" width="18" height="18" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
            <path d="M 3 196 L 8 202 L 17 190" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <text x="26" y="200" fill="#1F2937" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              Excessive en-
            </text>
          </g>

          {/* Left torn paper fibers highlight */}
          <path
            d="M 1 -250 L 3 -210 L -2 -170 L 4 -130 L -3 -90 L 3 -50 L -2 -10 L 4 30 L -3 70 L 3 110 L -2 150 L 4 190 L -3 230 L 1 255"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            opacity="0.8"
          />
        </g>

        {/* --- RIGHT HALF OF TORN PAPER --- */}
        <g
          id="naughty-list-right"
          transform={`translate(${centerX + 130 + rightPaperShiftX}, ${centerY + paperSeparationY}) rotate(${rightPaperRot}, 0, 0)`}
        >
          {/* Paper Drop Shadow */}
          <path
            d="M 0 -250 L 150 -250 L 150 260 L 0 260 Z"
            fill="#000000"
            opacity="0.22"
            transform="translate(10, 12)"
          />

          {/* Right Paper Body with Matching Clean Torn Jagged Edge on Left Seam */}
          <path
            d="
              M 0 -250
              L 3 -210
              L -2 -170
              L 4 -130
              L -3 -90
              L 3 -50
              L -2 -10
              L 4 30
              L -3 70
              L 3 110
              L -2 150
              L 4 190
              L -3 230
              L 0 255
              L 150 255
              Z
            "
            fill="#FEF3C7" // Warm aged parchment amber-50
            stroke="#000000"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />

          {/* Right Half Title: "TY LIST" */}
          <text
            x="12"
            y="-185"
            fill="#DC2626"
            fontSize="38"
            fontWeight="900"
            fontFamily="Arial Black, Impact, sans-serif"
            letterSpacing="2"
          >
            TY LIST
          </text>
          {/* Red underline right */}
          <line
            x1="8"
            y1="-172"
            x2="135"
            y2="-172"
            stroke="#DC2626"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Horizontal Lined Paper Rules (faint blue) */}
          {[-120, -70, -20, 30, 80, 130, 180].map((lineY) => (
            <line
              key={`right-line-${lineY}`}
              x1="6"
              y1={lineY}
              x2="135"
              y2={lineY}
              stroke="#CBD5E1"
              strokeWidth="2.5"
            />
          ))}

          {/* Right Checklist Text Continuations */}
          <g transform="translate(10, -110)">
            <text x="0" y="0" fill="#1F2937" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              (Never calm)
            </text>
            <text x="0" y="50" fill="#1F2937" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              ass / loud
            </text>
            <text x="0" y="100" fill="#1F2937" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              to rules
            </text>
            <text x="0" y="150" fill="#1F2937" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              ions daily
            </text>
            <text x="0" y="200" fill="#1F2937" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              ergy spikes
            </text>
          </g>

          {/* Right torn paper fibers highlight */}
          <path
            d="M 1 -250 L 3 -210 L -2 -170 L 4 -130 L -3 -90 L 3 -50 L -2 -10 L 4 30 L -3 70 L 3 110 L -2 150 L 4 190 L -3 230 L 1 255"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            opacity="0.8"
          />
        </g>

        {/* Paper Rip Particles Burst (during the rip moment) */}
        {localFrame >= 38 && localFrame <= 65 && (
          <g id="paper-rip-shreds">
            {[
              { dx: -25, dy: -60, s: 1.2, r: -25 },
              { dx: 30, dy: -40, s: 0.9, r: 40 },
              { dx: -45, dy: 30, s: 1.1, r: -45 },
              { dx: 35, dy: 75, s: 0.8, r: 60 },
              { dx: -20, dy: 120, s: 1.0, r: -15 },
              { dx: 40, dy: 160, s: 1.3, r: 35 },
            ].map((p, idx) => {
              const particleT = (localFrame - 38) / 27;
              const posX = centerX + p.dx * particleT * 3;
              const posY = centerY + p.dy * particleT * 2 + particleT * particleT * 40;
              const opacity = Math.max(0, 1 - particleT);
              return (
                <polygon
                  key={`shred-${idx}`}
                  points="0,0 8,2 6,9 -2,7"
                  fill="#FEF3C7"
                  stroke="#000000"
                  strokeWidth="1.5"
                  transform={`translate(${posX}, ${posY}) rotate(${p.r * particleT * 4}) scale(${p.s})`}
                  opacity={opacity}
                />
              );
            })}
          </g>
        )}
      </g>

      {/* ============================================================== */}
      {/* 2. MEDICAL CHART OVERLAY (Slams down on top & parts the paper)  */}
      {/* ============================================================== */}
      {localFrame >= 28 && (
        <g id="medical-chart-overlay" transform={`translate(${centerX}, ${chartY})`}>
          {/* Clipboard Drop Shadow */}
          <rect
            x="-330"
            y="-380"
            width="660"
            height="760"
            rx="24"
            fill="#000000"
            opacity="0.35"
            transform="translate(14, 18)"
          />

          {/* Sturdy Heavy Clipboard Backboard */}
          <rect
            x="-330"
            y="-380"
            width="660"
            height="760"
            rx="24"
            fill="#1E293B" // Deep sleek dark slate
            stroke="#000000"
            strokeWidth="7"
          />

          {/* Medical Clinical White Paper Sheet */}
          <rect
            x="-300"
            y="-340"
            width="600"
            height="700"
            rx="12"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="5"
          />

          {/* Metallic Silver Spring Clip at Top */}
          <g id="clipboard-metallic-clip" transform="translate(0, -370)">
            <rect
              x="-95"
              y="-10"
              width="190"
              height="45"
              rx="9"
              fill="#94A3B8"
              stroke="#000000"
              strokeWidth="5"
            />
            {/* Chrome highlight bar */}
            <rect x="-85" y="-3" width="170" height="12" rx="4" fill="#E2E8F0" />
            {/* Twin heavy rivets */}
            <circle cx="-65" cy="12" r="5.5" fill="#475569" stroke="#000000" strokeWidth="2.5" />
            <circle cx="65" cy="12" r="5.5" fill="#475569" stroke="#000000" strokeWidth="2.5" />
            {/* Hanging loop hole */}
            <circle cx="0" cy="5" r="7" fill="#1E293B" stroke="#000000" strokeWidth="3" />
          </g>

          {/* --- CLINICAL CHART HEADER --- */}
          <g id="chart-header" transform="translate(-270, -290)">
            {/* Medical Red Cross Emblem */}
            <g transform="translate(15, 15)">
              <rect x="-18" y="-18" width="36" height="36" rx="8" fill="#DC2626" stroke="#000000" strokeWidth="3" />
              <rect x="-4" y="-12" width="8" height="24" fill="#FFFFFF" />
              <rect x="-12" y="-4" width="24" height="8" fill="#FFFFFF" />
            </g>

            {/* Department Title */}
            <text x="50" y="10" fill="#0F172A" fontSize="24" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
              CLINICAL NEUROLOGY REPORT
            </text>
            <text x="50" y="28" fill="#64748B" fontSize="13" fontWeight="700" fontFamily="sans-serif">
              DIAGNOSTIC ELECTROENCEPHALOGRAM (EEG)
            </text>

            {/* Patient Metadata Grid Box */}
            <g transform="translate(0, 42)">
              <rect x="0" y="0" width="540" height="34" rx="6" fill="#F8FAFC" stroke="#000000" strokeWidth="2.5" />
              <text x="14" y="22" fill="#334155" fontSize="13" fontWeight="800" fontFamily="monospace">
                PATIENT: #0842-EC
              </text>
              <text x="210" y="22" fill="#334155" fontSize="13" fontWeight="800" fontFamily="monospace">
                LEAD: FRONTAL CH-1
              </text>
              <text x="400" y="22" fill="#DC2626" fontSize="13" fontWeight="900" fontFamily="monospace">
                SAMPLING: 500 Hz
              </text>
            </g>
          </g>

          {/* --- EEG MEDICAL GRAPH GRID --- */}
          <g id="eeg-graph-area" transform="translate(-270, -180)">
            {/* Graph Paper Backdrop */}
            <rect
              x="0"
              y="0"
              width="540"
              height="320"
              rx="8"
              fill="#F0F9FF" // Pale clinical cyan grid
              stroke="#000000"
              strokeWidth="4"
            />

            {/* Grid Coordinate Mesh (20px vertical and horizontal grid lines) */}
            <g opacity="0.45">
              {/* Vertical grid lines */}
              {[...Array(27)].map((_, i) => (
                <line
                  key={`vgrid-${i}`}
                  x1={i * 20}
                  y1="0"
                  x2={i * 20}
                  y2="320"
                  stroke="#38BDF8"
                  strokeWidth={i % 5 === 0 ? "1.8" : "0.9"}
                />
              ))}
              {/* Horizontal grid lines */}
              {[...Array(16)].map((_, i) => (
                <line
                  key={`hgrid-${i}`}
                  x1="0"
                  y1={i * 20}
                  x2="540"
                  y2={i * 20}
                  stroke="#38BDF8"
                  strokeWidth={i % 4 === 0 ? "1.8" : "0.9"}
                />
              ))}
            </g>

            {/* Baseline Center Guide (Dotted) */}
            <line
              x1="0"
              y1="160"
              x2="540"
              y2="160"
              stroke="#0284C7"
              strokeWidth="2"
              strokeDasharray="8 6"
              opacity="0.6"
            />

            {/* Voltage Scale Indicators on Left */}
            <text x="6" y="28" fill="#0284C7" fontSize="11" fontWeight="800" fontFamily="monospace">
              +150µV
            </text>
            <text x="6" y="156" fill="#0284C7" fontSize="11" fontWeight="800" fontFamily="monospace">
              0µV
            </text>
            <text x="6" y="306" fill="#0284C7" fontSize="11" fontWeight="800" fontFamily="monospace">
              -150µV
            </text>

            {/* ========================================================== */}
            {/* JAGGED, ABNORMAL BRAINWAVE LINE                            */}
            {/* ========================================================== */}
            {localFrame >= 52 && (
              <g id="jagged-brainwave-trace">
                {/* Glow bloom underlay */}
                <polyline
                  points={wavePointsStr}
                  fill="none"
                  stroke="#06B6D4" // Vibrant electric cyan
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  strokeMiterlimit="5"
                  opacity="0.3"
                />

                {/* Main Sharp Jagged Brainwave Line */}
                <polyline
                  points={wavePointsStr}
                  fill="none"
                  stroke="#0284C7" // Deep clinical diagnostic cyan
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  strokeMiterlimit="5"
                />

                {/* Leading Stylus Tracer Dot & Pulse */}
                {waveDrawProgress < 0.99 && (
                  <g transform={`translate(${activeHead.x}, ${activeHead.y})`}>
                    {/* Glowing pulse ring */}
                    <circle
                      r="9"
                      fill="#38BDF8"
                      opacity={0.4 + Math.sin(localFrame * 0.4) * 0.3}
                    />
                    {/* Core bright needle head */}
                    <circle
                      r="4.5"
                      fill="#FFFFFF"
                      stroke="#0284C7"
                      strokeWidth="2.5"
                    />
                  </g>
                )}
              </g>
            )}

            {/* Calibration / Label Tag */}
            <rect
              x="385"
              y="10"
              width="145"
              height="24"
              rx="4"
              fill="#FFFFFF"
              stroke="#0284C7"
              strokeWidth="2"
              opacity="0.9"
            />
            <text
              x="395"
              y="26"
              fill="#0369A1"
              fontSize="11"
              fontWeight="900"
              fontFamily="monospace"
            >
              CH-1: HYPER-ERRATIC
            </text>
          </g>

          {/* --- LOWER SUMMARY SECTION --- */}
          <g id="chart-footer" transform="translate(-270, 160)">
            {/* Clinical Evaluation Checklist / Notes */}
            <text x="10" y="24" fill="#1E293B" fontSize="15" fontWeight="800" fontFamily="sans-serif">
              PRIMARY NEUROLOGICAL FINDINGS:
            </text>
            <text x="10" y="46" fill="#475569" fontSize="13" fontWeight="600" fontFamily="sans-serif">
              • Paroxysmal fronto-cortical spike-and-wave discharge patterns detected.
            </text>
            <text x="10" y="66" fill="#475569" fontSize="13" fontWeight="600" fontFamily="sans-serif">
              • High-voltage hyperactive amplitude; inability to maintain resting theta.
            </text>
            <text x="10" y="86" fill="#0F172A" fontSize="14" fontWeight="800" fontFamily="sans-serif">
              CONCLUSION: <tspan fill="#DC2626">NOT BEHAVIORAL FAILURE — NEUROLOGICAL DISREGULATION</tspan>
            </text>
          </g>

          {/* --- DIAGNOSTIC STAMP: "ABNORMAL" (Slams down at frame 112) --- */}
          {localFrame >= 112 && (
            <g
              id="abnormal-diagnostic-stamp"
              transform={`translate(145, 175) rotate(-14) scale(${stampScale})`}
              opacity={stampOpacity}
            >
              {/* Stamp Outer Border Box */}
              <rect
                x="-125"
                y="-32"
                width="250"
                height="64"
                rx="6"
                fill="none"
                stroke="#DC2626"
                strokeWidth="5.5"
                strokeDasharray="28 8"
              />
              {/* Stamp Inner Border */}
              <rect
                x="-120"
                y="-27"
                width="240"
                height="54"
                rx="4"
                fill="#FEF2F2"
                fillOpacity="0.88"
                stroke="#DC2626"
                strokeWidth="2.5"
              />
              {/* Stamp Big Text */}
              <text
                x="0"
                y="11"
                fill="#DC2626"
                fontSize="27"
                fontWeight="900"
                fontFamily="Impact, Arial Black, sans-serif"
                letterSpacing="3"
                textAnchor="middle"
              >
                ABNORMAL
              </text>
            </g>
          )}

          {/* Slam Impact Shockwave Ring (Frames 41 to 52) */}
          {localFrame >= 41 && localFrame <= 52 && (
            <ellipse
              cx="0"
              cy="20"
              rx={360 * impactScale}
              ry={390 * impactScale}
              fill="none"
              stroke="#000000"
              strokeWidth="7"
              opacity={impactOpacity}
            />
          )}
        </g>
      )}
    </g>
  );
};
