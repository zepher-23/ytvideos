import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 25: Hurricane vs. Leaky Pipe
 * Duration: 8 seconds (240 frames)
 * 
 * - Environment: 50/50 vertical split screen (Left: Light Grey #F1F5F9, Right: Dark Slate #0F172A)
 * - Left Side (MDD): Red bar starts at 100%, violently drops to 10% in a fraction of a second (frame 42).
 * - Right Side (Dysthymia): Water pipe drips droplets, dark blue water block (#1E3A8A) steadily rises.
 * - Ending/Hold: Left remains crushed, right water continues to relentlessly rise to frame 240.
 */
export const Scene025_HurricanevsLeakyPipe = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Wipe transition from center outward (frames 0 to 14)
  const wipeProgress = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });

  // 2. Left Side: Red Bar Violent Crash (frame 42 to 48)
  const isCrashed = frame >= 42;
  const leftBarHeightPercent = isCrashed
    ? interpolate(frame, [42, 48], [100, 10], { extrapolateRight: "clamp" })
    : 100;

  // Left side impact shudder on crash
  const leftShudder = isCrashed && frame <= 64
    ? Math.sin(frame * 4.2) * interpolate(frame, [42, 64], [10, 0], { extrapolateRight: "clamp" })
    : 0;

  // 3. Right Side: Continuous Relentless Water Rise
  // Starts at 5% height, steadily climbs to 55% height across 240 frames
  const rightWaterPercent = interpolate(frame, [0, 240], [5, 55]);

  // Animated dripping water drops from pipe (cycle every 25 frames)
  const dropCycle = 26;
  const dropProgress = (frame % dropCycle) / dropCycle;
  const dropY = 220 + dropProgress * 420;

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans">
      {/* 50/50 SPLIT SCREEN LAYOUT */}
      <div className="absolute inset-0 flex">
        {/* LEFT SIDE: ACUTE / MDD (Light Grey #F1F5F9) */}
        <div
          className="w-1/2 h-full bg-[#F1F5F9] relative flex flex-col items-center justify-between py-16 border-r-4 border-slate-900"
          style={{
            transform: `translate(0px, ${leftShudder}px)`,
            clipPath: `inset(0 ${100 - wipeProgress * 100}% 0 0)`,
          }}
        >
          {/* Header Label */}
          <div className="px-8 py-3 rounded-2xl bg-white border-2 border-slate-300 shadow-md">
            <span className="text-red-600 font-mono text-xs font-black tracking-widest uppercase block mb-1">
              EPISODIC COLLAPSE
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase m-0">
              ACUTE (MDD)
            </h2>
          </div>

          {/* Red Bar Chart Container */}
          <div className="w-[180px] h-[520px] bg-slate-200 rounded-3xl p-3 flex flex-col justify-end border-2 border-slate-300 relative shadow-inner">
            {/* The Red Crashing Bar (#DC2626) */}
            <div
              className="w-full bg-[#DC2626] rounded-2xl transition-all duration-75 shadow-lg flex items-center justify-center relative overflow-hidden"
              style={{ height: `${leftBarHeightPercent}%` }}
            >
              <span className="text-white font-mono text-xl md:text-2xl font-black">
                {Math.round(leftBarHeightPercent)}%
              </span>
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="px-6 py-2 rounded-xl bg-red-100 border border-red-300">
            <span className="text-red-800 font-mono text-xs md:text-sm font-bold uppercase">
              {isCrashed ? "STATUS: VIOLENT VERTICAL DROP (10%)" : "STATUS: NORMAL FUNCTION (100%)"}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: CHRONIC / DYSTHYMIA (Dark Slate #0F172A) */}
        <div
          className="w-1/2 h-full bg-[#0F172A] relative flex flex-col items-center justify-between py-16 text-white overflow-hidden"
          style={{
            clipPath: `inset(0 0 0 ${100 - wipeProgress * 100}%)`,
          }}
        >
          {/* Header Label */}
          <div className="px-8 py-3 rounded-2xl bg-[#1E293B] border-2 border-blue-500/50 shadow-xl z-20">
            <span className="text-blue-400 font-mono text-xs font-black tracking-widest uppercase block mb-1">
              PERSISTENT ACCUMULATION
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase m-0">
              CHRONIC (PDD)
            </h2>
          </div>

          {/* Leaky Water Pipe at Top (SVG) */}
          <svg className="absolute top-36 w-full h-[120px] pointer-events-none z-20">
            {/* Horizontal Industrial Pipe */}
            <rect x="220" y="20" width="380" height="32" rx="6" fill="#334155" stroke="#64748B" strokeWidth="3" />
            {/* Downward Spout */}
            <path d="M 440 45 L 440 90 L 480 90 L 480 45 Z" fill="#475569" stroke="#64748B" strokeWidth="3" />
            <ellipse cx="460" cy="90" rx="20" ry="6" fill="#1E293B" />
          </svg>

          {/* Falling Teardrop / Water Droplets */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <path
              d={`M 460 ${dropY} C 452 ${dropY + 12} 452 ${dropY + 22} 460 ${dropY + 28} C 468 ${dropY + 22} 468 ${dropY + 12} 460 ${dropY} Z`}
              fill="#60A5FA"
              filter="drop-shadow(0 0 6px #3B82F6)"
            />
          </svg>

          {/* Relentlessly Rising Dark Blue Water Block (#1E3A8A) */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#1E3A8A] transition-all border-t-4 border-[#3B82F6] flex items-center justify-center shadow-[0_-10px_35px_rgba(30,58,138,0.7)]"
            style={{ height: `${rightWaterPercent}%` }}
          >
            <span className="text-blue-200 font-mono text-xl md:text-2xl font-black uppercase">
              RISING DEPTH: {Math.round(rightWaterPercent)}%
            </span>
          </div>

          {/* Bottom Callout */}
          <div className="px-6 py-2 rounded-xl bg-blue-950/90 border border-blue-500/50 z-20">
            <span className="text-blue-300 font-mono text-xs md:text-sm font-bold uppercase">
              STATUS: RELENTLESS SUBMERSION
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
