import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 33: Two Month Remission failure
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Abstract time space (#0A0F1D)
 * - Characters & Props: 12-month calendar grid, glowing sun icon (#FBBF24), 3 heavy black rain clouds (#1E293B)
 * - Beginning: 12-month grid displayed. May & June illuminate with glowing sun (frames 0-60).
 * - Action/Climax: 3 massive black clouds slam down simultaneously, crushing sun icons (frame 68).
 * - Ending/Hold: Flashing red "X" slams over sun icons, plunging all 12 months to darkness to frame 210.
 */
export const Scene033_TwoMonthRemissionfailure = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance wipe
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. May & June Remission Sun Glow (frames 20 to 68)
  const isSunActive = frame >= 20 && frame < 72;
  const sunPulse = isSunActive ? 1 + Math.sin(frame * 0.15) * 0.08 : 0;

  // 3. Three Black Clouds Drop (triggers frame 66)
  const isCloudsDropping = frame >= 66;
  const cloudSpring = spring({
    frame: frame - 66,
    fps,
    config: { damping: 10, stiffness: 220, mass: 1.4 },
  });
  const cloudY = interpolate(cloudSpring, [0, 1], [-260, 0]);

  // Screen impact shake on cloud crash (frames 70 to 88)
  const isCrashing = frame >= 70 && frame <= 88;
  const shakeY = isCrashing
    ? Math.sin(frame * 4.4) * interpolate(frame, [70, 88], [12, 0], { extrapolateRight: "clamp" })
    : 0;

  // 4. Flashing Red "X" entrance (frame 88 onwards)
  const isRedX = frame >= 88;
  const xSpring = spring({
    frame: frame - 88,
    fps,
    config: { damping: 11, stiffness: 180 },
  });
  const redXBlink = isRedX ? (Math.floor(frame / 6) % 2 === 0 ? 1 : 0.7) : 0;

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Viewport with Crash Shudder */}
      <div
        className="w-full h-full relative pointer-events-none"
        style={{
          transform: `translate(0px, ${shakeY}px)`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-amber-500/50 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase block mb-1">
              THE DIAGNOSTIC TRAP
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
              REMISSION WINDOW FAILURE
            </h1>
          </div>
        </div>

        {/* Main 12-Month Calendar Grid (3 rows x 4 cols) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="grid grid-cols-4 gap-6 w-[1100px] mt-10">
            {months.map((m, idx) => {
              const isRemissionMonth = m === "MAY" || m === "JUN";
              const isCrushedByCloud = isCloudsDropping && isRemissionMonth;

              return (
                <div
                  key={m}
                  className={`h-28 rounded-2xl border-2 flex flex-col justify-between p-4 relative transition-all duration-200 ${
                    isRemissionMonth && isSunActive
                      ? "bg-amber-500/20 border-yellow-400 shadow-[0_0_25px_rgba(251,191,36,0.4)]"
                      : "bg-[#1E293B]/80 border-slate-700"
                  }`}
                >
                  {/* Month Name */}
                  <span
                    className={`font-mono text-xl font-black ${
                      isRemissionMonth && isSunActive ? "text-yellow-300" : "text-slate-400"
                    }`}
                  >
                    {m}
                  </span>

                  {/* Golden Sun Icon for May & June */}
                  {isRemissionMonth && isSunActive && !isCrushedByCloud && (
                    <div
                      className="absolute right-4 top-4 flex items-center justify-center"
                      style={{ transform: `scale(${sunPulse})` }}
                    >
                      <svg viewBox="0 0 50 50" className="w-12 h-12 overflow-visible">
                        <circle cx="25" cy="25" r="14" fill="#FBBF24" filter="drop-shadow(0 0 8px #FBBF24)" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => {
                          const rad = (ang * Math.PI) / 180;
                          return (
                            <line
                              key={ang}
                              x1={25 + Math.cos(rad) * 17}
                              y1={25 + Math.sin(rad) * 17}
                              x2={25 + Math.cos(rad) * 24}
                              y2={25 + Math.sin(rad) * 24}
                              stroke="#FBBF24"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          );
                        })}
                      </svg>
                    </div>
                  )}

                  {/* Month Status Note */}
                  <span className="font-mono text-xs font-bold text-slate-500 uppercase">
                    {isRemissionMonth && isSunActive ? "TEMP RELIEF" : "CHRONIC DEFICIT"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 MASSIVE BLACK RAIN CLOUDS SLAMMING OVER MAY & JUNE */}
        {isCloudsDropping && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            style={{ transform: `translate(0px, ${cloudY}px)` }}
          >
            <svg viewBox="0 0 1000 600" className="w-[1000px] h-[600px] overflow-visible">
              {/* Cloud 1 (Center-Left) */}
              <g transform="translate(420, 240)" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.9))">
                <path
                  d="M -120 20 Q -140 -20 -100 -50 Q -70 -90 -10 -70 Q 50 -100 100 -60 Q 140 -20 120 20 Z"
                  fill="#0F172A"
                  stroke="#334155"
                  strokeWidth="5"
                />
              </g>
              {/* Cloud 2 (Center-Right) */}
              <g transform="translate(680, 220)" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.9))">
                <path
                  d="M -130 20 Q -150 -20 -110 -50 Q -80 -95 -15 -75 Q 45 -105 105 -65 Q 145 -20 125 20 Z"
                  fill="#0A0F1D"
                  stroke="#334155"
                  strokeWidth="5"
                />
              </g>
              {/* Cloud 3 (Foreground Middle) */}
              <g transform="translate(550, 270)" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.95))">
                <path
                  d="M -150 20 Q -170 -25 -125 -60 Q -90 -110 -15 -85 Q 55 -120 120 -70 Q 170 -20 145 20 Z"
                  fill="#000000"
                  stroke="#475569"
                  strokeWidth="6"
                />
              </g>
            </svg>
          </div>
        )}

        {/* FLASHING RED "X" OVER MAY & JUNE */}
        {isRedX && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
            style={{
              opacity: redXBlink,
              transform: `scale(${interpolate(xSpring, [0, 1], [0.5, 1.0])})`,
            }}
          >
            <div className="w-[360px] h-[180px] flex items-center justify-center relative">
              <svg viewBox="0 0 200 200" className="w-48 h-48 overflow-visible">
                <line x1="20" y1="20" x2="180" y2="180" stroke="#EF4444" strokeWidth="24" strokeLinecap="round" />
                <line x1="180" y1="20" x2="20" y2="180" stroke="#EF4444" strokeWidth="24" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}

        {/* Bottom Subtitle Card */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-10 py-3 rounded-2xl bg-black/95 border-2 border-red-600 shadow-2xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-red-400">
              {isRedX
                ? "REMISSION SHATTERED: CRITERIA REQUIRES LESS THAN 2 CONSECUTIVE MONTHS EUTHYMIC"
                : "TEMPORARY MAY/JUNE RECOVERY WINDOW"}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
