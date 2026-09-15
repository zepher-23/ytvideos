import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 117: Ticking Clock (Nothing Changes)
 * Duration: 180 frames (6.0s)
 * Environment: The clinical environment from Scene 116.
 * Transition: Zoom in close on the ticking clock.
 * Characters & Props: Analog clock, calendar pages.
 * Action:
 * - Beginning: A close-up of the analog clock. The second hand is ticking loudly in real-time.
 * - Action / Climax: Calendar pages (showing week numbers: Week 1, Week 2, Week 3, Week 4) continue to flip past the ticking clock face in the background.
 * - Ending / Hold: A large, aggressive red text overlay slams onto the clock face reading: "NO CHANGE".
 * Text & Specific Colors: "NO CHANGE" red (#EF4444). Clock face white with black markers.
 */
export const Scene117_TickingClockNothingChanges = () => {
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

  // Second hand mechanical ticking kinematics
  // 30 fps -> 1 second tick every 30 frames
  const secondIndex = Math.floor(frame / 30);
  const secondSubFrame = frame % 30;
  const tickSnap = spring({
    frame: secondSubFrame,
    fps,
    config: { damping: 10, stiffness: 350 },
  });
  const secondAngle = secondIndex * 6 + interpolate(tickSnap, [0, 1], [0, 6]);

  // Minute and hour hands
  const minuteAngle = interpolate(frame, [0, 180], [120, 240]);
  const hourAngle = interpolate(frame, [0, 180], [280, 295]);

  // Calendar pages flipping in background (flying across screen)
  const calendarPages = [
    { text: "WEEK 1", start: 10, xStart: 250, xEnd: -300, rot: -15 },
    { text: "WEEK 2", start: 35, xStart: 1650, xEnd: 2100, rot: 20 },
    { text: "WEEK 3", start: 60, xStart: 280, xEnd: -250, rot: -25 },
    { text: "WEEK 4", start: 85, xStart: 1620, xEnd: 2150, rot: 18 },
  ];

  // Aggressive Red "NO CHANGE" slam: begins at frame 110
  const slamSpring = spring({
    frame: frame - 110,
    fps,
    config: { damping: 11, stiffness: 240 },
  });
  const slamScale = interpolate(slamSpring, [0, 1], [3.8, 1]);
  const slamOpacity = interpolate(frame, [110, 116], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screen shake on slam
  const slamShake = frame >= 110 ? Math.sin(frame * 2.2) * Math.max(0, 16 - (frame - 110) * 0.5) : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
        transform: `translate(${slamShake}px, 0px)`,
      }}
    >
      {/* Background Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 1) 85%)",
        }}
      />

      {/* Header Container with Deterministic Containment */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: entranceOpacity,
          transform: `scale(${entranceScale})`,
        }}
      >
        <div
          className="px-8 py-2.5 rounded-2xl backdrop-blur-md shadow-xl text-center max-w-2xl flex flex-col items-center"
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.8)",
            border: "1.5px solid #334155",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-slate-700 text-slate-300">
              Therapeutic Trial Window
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-400">
              6 to 8 Weeks Elapsed
            </span>
          </div>
        </div>
      </div>

      {/* Background Flying Calendar Sheets */}
      {calendarPages.map((cp, idx) => {
        if (frame < cp.start) return null;
        const pageProgress = interpolate(frame, [cp.start, cp.start + 50], [0, 1], {
          extrapolateRight: "clamp",
        });
        const curX = interpolate(pageProgress, [0, 1], [cp.xStart, cp.xEnd]);
        const curY = 400 + Math.sin(pageProgress * Math.PI) * -120;
        const curRot = cp.rot * (1 + pageProgress * 0.8);
        const curAlpha = 1 - pageProgress * 0.6;

        return (
          <div
            key={idx}
            className="absolute w-64 h-72 rounded-2xl bg-slate-800/80 border-2 border-slate-600 p-6 flex flex-col justify-between shadow-2xl z-10 pointer-events-none"
            style={{
              left: `${curX}px`,
              top: `${curY}px`,
              transform: `translate(-50%, -50%) rotate(${curRot}deg) scale(${1 - pageProgress * 0.2})`,
              opacity: curAlpha,
            }}
          >
            <div className="text-xs font-black uppercase tracking-widest text-red-400 border-b border-slate-700 pb-2">
              CLINICAL TRIAL
            </div>
            <div className="text-3xl font-black text-white text-center">{cp.text}</div>
            <div className="text-xs font-bold text-slate-400 text-center uppercase">
              NO RESPONSE DETECTED
            </div>
          </div>
        );
      })}

      {/* Main SVG Center Stage: Large Clock Close-Up */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <filter id="clockFaceShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="16" stdDeviation="25" floodOpacity="0.6" />
          </filter>

          <filter id="redStampGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#EF4444" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* --- MACRO ANALOG CLOCK (Center: 960, 550) --- */}
        <g transform="translate(960, 550)" filter="url(#clockFaceShadow)">
          {/* Heavy Bezel Rim */}
          <circle cx={0} cy={0} r={310} fill="#1E293B" stroke="#334155" strokeWidth={10} />
          <circle cx={0} cy={0} r={295} fill="#0F172A" />
          <circle cx={0} cy={0} r={285} fill="#FFFFFF" />

          {/* Clock Ticks */}
          {[...Array(60)].map((_, i) => {
            const deg = i * 6;
            const rad = (deg * Math.PI) / 180;
            const isHour = i % 5 === 0;
            const rInner = isHour ? 230 : 255;
            const rOuter = 275;

            return (
              <line
                key={i}
                x1={Math.cos(rad) * rInner}
                y1={Math.sin(rad) * rInner}
                x2={Math.cos(rad) * rOuter}
                y2={Math.sin(rad) * rOuter}
                stroke={isHour ? "#0F172A" : "#64748B"}
                strokeWidth={isHour ? 7 : 3}
                strokeLinecap="round"
              />
            );
          })}

          {/* Hour Numbers */}
          {[
            { num: "12", deg: -90 },
            { num: "3", deg: 0 },
            { num: "6", deg: 90 },
            { num: "9", deg: 180 },
          ].map((item) => {
            const rad = (item.deg * Math.PI) / 180;
            const tx = Math.cos(rad) * 195;
            const ty = Math.sin(rad) * 195 + 14;
            return (
              <text
                key={item.num}
                x={tx}
                y={ty}
                textAnchor="middle"
                fill="#0F172A"
                fontSize={42}
                fontWeight="900"
              >
                {item.num}
              </text>
            );
          })}

          {/* Hour Hand */}
          <line
            x1={0}
            y1={0}
            x2={Math.cos(((hourAngle - 90) * Math.PI) / 180) * 130}
            y2={Math.sin(((hourAngle - 90) * Math.PI) / 180) * 130}
            stroke="#0F172A"
            strokeWidth={14}
            strokeLinecap="round"
          />

          {/* Minute Hand */}
          <line
            x1={0}
            y1={0}
            x2={Math.cos(((minuteAngle - 90) * Math.PI) / 180) * 200}
            y2={Math.sin(((minuteAngle - 90) * Math.PI) / 180) * 200}
            stroke="#1E293B"
            strokeWidth={9}
            strokeLinecap="round"
          />

          {/* Ticking Red Second Hand with Counterweight */}
          <g transform={`rotate(${secondAngle - 90})`}>
            {/* Needle */}
            <line
              x1={-45}
              y1={0}
              x2={245}
              y2={0}
              stroke="#DC2626"
              strokeWidth={4.5}
              strokeLinecap="round"
            />
            {/* Counterweight circle */}
            <circle cx={-30} cy={0} r={9} fill="#DC2626" />
          </g>

          {/* Center Pin */}
          <circle cx={0} cy={0} r={14} fill="#0F172A" stroke="#FFFFFF" strokeWidth={3} />
        </g>
      </svg>

      {/* --- AGGRESSIVE SLAM OVERLAY: "NO CHANGE" --- */}
      {slamOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 px-8"
          style={{
            opacity: slamOpacity,
            transform: `scale(${slamScale}) rotate(-6deg)`,
          }}
        >
          <div
            className="px-16 py-8 rounded-3xl border-8 flex flex-col items-center text-center shadow-2xl backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(220, 38, 38, 0.95)",
              borderColor: "#FFFFFF",
              boxShadow: "0 0 80px rgba(239, 68, 68, 0.9), 0 30px 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            <div className="text-sm md:text-base font-black tracking-widest uppercase px-4 py-1 rounded-full bg-black text-white mb-2">
              TREATMENT-RESISTANT OUTCOME
            </div>
            <h1
              className="text-7xl md:text-9xl font-black tracking-tight uppercase m-0 leading-none text-white"
              style={{
                textShadow: "0 6px 0 #991B1B, 0 12px 25px rgba(0, 0, 0, 0.8)",
              }}
            >
              NO CHANGE
            </h1>
            <p className="text-lg md:text-xl font-bold uppercase tracking-wider text-red-100 mt-3 m-0">
              Zero Clinical Remission Across Multiple Prescribed Regimens
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
