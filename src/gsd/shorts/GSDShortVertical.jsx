import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadBlackletter } from "@remotion/google-fonts/UnifrakturMaguntia";
import * as Flags from "country-flag-icons/react/3x2";
import data from "../data.json";
import { buildTimeline } from "../engine";
import { getPersonColor } from "../constants";

loadPlayfair();
loadBlackletter();

const MONTH_NAMES = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

// Precision Layout Geometry for 1080x1920 (9:16 Full-Width Vertical Video with Zero Rounded Corners)
const VERTICAL_LAYOUT = {
  CANVAS_WIDTH: 1080,
  CANVAS_HEIGHT: 1920,
  LEFT_MARGIN: 20,         // Clean 20px edge margin
  MAX_BAR_WIDTH: 810,      // Max bar stretch, leaves 250px for outside wealth counter
  MIN_BAR_WIDTH: 150,      // Minimal safety guard for rank badge and flag (prevents artificial clamping)
  TOP_OFFSET: 275,         // Bars start at Y=275px
  BAR_PITCH: 86,           // Pitch between bars
  BAR_HEIGHT: 74,          // Bar thickness
  CARD_LEFT: 20,           // Left margin matching bars
  CARD_TOP: 1155,          // Sits right below Rank 10 (which ends at Y=1123px)
  CARD_WIDTH: 1040,        // Full-width broadsheet card (1040px)
  CARD_HEIGHT: 705,        // Ends at Y=1860px (preserves 60px safe breathing room at bottom)
  WHEEL_TOP: 935,          // Placed alongside bottom rankings (Ranks 8, 9, 10)
  WHEEL_RIGHT: 20,         // Right edge aligned with canvas and card margin
  WHEEL_VIEWPORT_WIDTH: 450, // Sits in the vacant right space next to short bottom bars
  WHEEL_CENTER_X: 225,
};

// Dynamic responsive broadsheet typography so every news event fills the card proportionally
const getTypographyForEvent = (ev) => {
  if (!ev) return { headlineSize: 60, leaderSize: 44, storySize: 40 };
  const hLen = ev.headline?.length || 0;
  const sLen = ev.wealth_driver?.length || 0;

  // Primary headline scales between 54px and 64px to fill broadsheet width
  let headlineSize = 64;
  if (hLen > 48) headlineSize = 54;
  else if (hLen > 36) headlineSize = 58;

  const leaderSize = 44;

  // Story narrative scales between 36px and 42px to comfortably fill card height
  let storySize = 42;
  if (sLen > 240) storySize = 36;
  else if (sLen > 180) storySize = 39;

  return { headlineSize, leaderSize, storySize };
};

export const GSDShortVertical = ({ framesPerYear = 28 }) => {
  const frame = useCurrentFrame();
  const totalYears = data.length;
  const startYear = data[0]?.year || 1900;
  const endYear = data[data.length - 1]?.year || 2026;
  const totalDurationFrames = (totalYears - 1) * framesPerYear;
  const progressTotal = Math.min(1, Math.max(0, frame / Math.max(1, totalDurationFrames)));

  // 1. Memoized timeline with identical Hermite spline & velocity physics
  const timeline = useMemo(() => {
    return buildTimeline(framesPerYear);
  }, [framesPerYear]);

  const frameIdx = Math.min(timeline.length - 1, Math.max(0, frame));
  const bars = timeline[frameIdx] || [];
  const currentMaxScale = bars.maxScale || 100;
  const currentGamma = bars.gamma || 0.55;

  // 2. Continuous time & wheel calculations clamped strictly to dataset boundary
  const finalYearStartFrame = (totalYears - 1) * framesPerYear;
  const isPastFinalYear = frame >= finalYearStartFrame;
  const framesSinceFinalYear = frame - finalYearStartFrame;

  // Clamped floatYear prevents rolling beyond the final year index (2026)
  const floatYear = Math.min(totalYears - 1, frame / framesPerYear);
  const currentYearIdx = Math.min(Math.floor(floatYear), totalYears - 1);
  const prevYearIdx = Math.max(0, currentYearIdx - 1);

  // Smooth Newspaper story crossfade transitions (scaled with framesPerYear)
  const TRANSITION_DURATION = Math.max(10, Math.round(framesPerYear * 0.55));

  // Transition into a new year occurs ONLY during the first TRANSITION_DURATION frames of that year.
  // When past finalYearStartFrame (reaching 2026), it transitions exactly once, then locks permanently.
  let isNewYearTransition = false;
  let activeLocalFrame = 0;

  if (!isPastFinalYear) {
    activeLocalFrame = frame % framesPerYear;
    isNewYearTransition = currentYearIdx > 0 && activeLocalFrame < TRANSITION_DURATION;
  } else {
    if (framesSinceFinalYear < TRANSITION_DURATION) {
      isNewYearTransition = true;
      activeLocalFrame = framesSinceFinalYear;
    } else {
      isNewYearTransition = false;
      activeLocalFrame = TRANSITION_DURATION;
    }
  }

  const isInitialEntrance = currentYearIdx === 0 && activeLocalFrame < TRANSITION_DURATION;

  const outFrames = Math.max(1, Math.round(TRANSITION_DURATION * 0.35));
  const inStartFrame = Math.max(1, Math.round(TRANSITION_DURATION * 0.3));
  const inDuration = Math.max(1, TRANSITION_DURATION - inStartFrame);

  const outProgress = Math.min(1, Math.max(0, activeLocalFrame / outFrames));
  const outOpacity = 0.5 * (1 + Math.cos(Math.PI * outProgress));

  const inProgress = Math.min(1, Math.max(0, (activeLocalFrame - inStartFrame) / inDuration));
  const inOpacity = isInitialEntrance
    ? 0.5 * (1 - Math.cos(Math.PI * (activeLocalFrame / TRANSITION_DURATION)))
    : 0.5 * (1 - Math.cos(Math.PI * inProgress));

  const currentEvent = data[currentYearIdx].top_event;
  const prevEvent = data[prevYearIdx].top_event;
  const currentLeader = currentEvent?.leader || "Andrew Carnegie";
  const prevLeader = prevEvent?.leader || "Andrew Carnegie";
  const activeLeader = isNewYearTransition && activeLocalFrame < outFrames ? prevLeader : currentLeader;

  const currentTypo = getTypographyForEvent(currentEvent);
  const prevTypo = getTypographyForEvent(prevEvent);

  // Horizontal Month Wheel (Clamped: locks at DEC when dataset ends)
  const globalMonthFloat = isPastFinalYear ? (totalYears - 1) * 12 + 11 : floatYear * 12;
  const mIdx = Math.floor(globalMonthFloat);
  const monthSubProgress = globalMonthFloat - mIdx;

  let monthRoll = 0;
  if (!isPastFinalYear && monthSubProgress > 0.6) {
    const rollP = (monthSubProgress - 0.6) / 0.4;
    monthRoll = 0.5 * (1 - Math.cos(Math.PI * rollP));
  }
  const smoothMonthPos = mIdx + monthRoll;
  const visibleMonthOffsets = [-2, -1, 0, 1, 2];

  // Horizontal Year Wheel (Clamped: locks at 2026 when dataset ends)
  const yIdx = currentYearIdx;
  const yearFraction = isPastFinalYear ? 0 : floatYear - yIdx;
  const YEAR_ROLL_START = 0.92;
  let yearRoll = 0;
  if (!isPastFinalYear && yearFraction > YEAR_ROLL_START && yIdx < totalYears - 1) {
    const p = (yearFraction - YEAR_ROLL_START) / (1 - YEAR_ROLL_START);
    yearRoll = 0.5 * (1 - Math.cos(Math.PI * p));
  }
  const smoothYearPos = yIdx + yearRoll;
  const visibleYearOffsets = [-2, -1, 0, 1, 2];

  // 3. Full-Spectrum Milestone Tiers across the Full Width
  let tickStep = 20;
  if (currentMaxScale > 500) tickStep = 100;
  else if (currentMaxScale > 260) tickStep = 50;
  else if (currentMaxScale > 140) tickStep = 25;
  else if (currentMaxScale > 70) tickStep = 20;
  else if (currentMaxScale > 35) tickStep = 10;
  else if (currentMaxScale > 16) tickStep = 5;
  else if (currentMaxScale > 8) tickStep = 2;
  else tickStep = 1;

  const maxTickVal = Math.ceil((currentMaxScale + tickStep * 1.2) / tickStep) * tickStep;
  const gridTicks = [];
  for (let val = tickStep; val <= maxTickVal; val += tickStep) {
    gridTicks.push(val);
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        color: "#0F172A",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ========================================================= */}
      {/* 1. TOP HEADER & PROMINENT TITLE                           */}
      {/* ========================================================= */}
      <div
        style={{
          position: "absolute",
          top: "64px",
          left: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 35,
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 900,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            margin: 0,
            color: "#0F172A",
            whiteSpace: "nowrap",
          }}
        >
          TOP 10 RICHEST FROM {startYear} TO {endYear}
        </h1>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#2563EB",
            marginTop: "6px",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          ADJUSTED TO INFLATION
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SMOOTH SLIDING MONTH & YEAR WHEELS (Right of Bottom Rankings) */}
      {/* ========================================================= */}
      <div
        style={{
          position: "absolute",
          top: `${VERTICAL_LAYOUT.WHEEL_TOP}px`,
          right: `${VERTICAL_LAYOUT.WHEEL_RIGHT}px`,
          width: `${VERTICAL_LAYOUT.WHEEL_VIEWPORT_WIDTH}px`,
          height: "128px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          zIndex: 30,
          pointerEvents: "none",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Month Wheel */}
        <div
          style={{
            width: `${VERTICAL_LAYOUT.WHEEL_VIEWPORT_WIDTH}px`,
            height: "44px",
            overflow: "hidden",
            position: "relative",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          {/* Active indicator bar */}
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: `${VERTICAL_LAYOUT.WHEEL_CENTER_X - 22}px`,
              width: "44px",
              height: "4px",
              backgroundColor: "#0F172A",
              borderRadius: "0px",
              zIndex: 5,
            }}
          />

          {visibleMonthOffsets.map((k) => {
            const intMonth = mIdx + k;
            const diffFromCenter = intMonth - smoothMonthPos;
            const absDist = Math.abs(diffFromCenter);
            if (absDist > 2.0) return null;

            const posX =
              VERTICAL_LAYOUT.WHEEL_CENTER_X +
              diffFromCenter * 95 -
              95 / 2;
            const monthName = MONTH_NAMES[((intMonth % 12) + 12) % 12];
            const highlightWeight = Math.max(0, 1 - absDist);

            let opacity = 0.70;
            if (absDist <= 1) opacity = 0.70 + 0.30 * (1 - absDist);
            else if (absDist < 1.8) opacity = Math.max(0, 0.70 * (1 - (absDist - 1) / 0.8));
            else opacity = 0;

            const fontSize = 22 + 10 * highlightWeight;
            const fontWeight = highlightWeight > 0.5 ? 900 : 800;

            const r = Math.round(71 - (71 - 15) * highlightWeight);
            const g = Math.round(85 - (85 - 23) * highlightWeight);
            const b = Math.round(105 - (105 - 42) * highlightWeight);
            const color = `rgb(${r}, ${g}, ${b})`;

            return (
              <div
                key={intMonth}
                style={{
                  position: "absolute",
                  left: `${posX}px`,
                  top: 0,
                  width: "95px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: `${fontSize}px`,
                  fontWeight,
                  color,
                  opacity,
                  letterSpacing: "0.05em",
                  userSelect: "none",
                }}
              >
                {monthName}
              </div>
            );
          })}
        </div>

        {/* Year Wheel */}
        <div
          style={{
            width: `${VERTICAL_LAYOUT.WHEEL_VIEWPORT_WIDTH}px`,
            height: "64px",
            overflow: "hidden",
            position: "relative",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          {visibleYearOffsets.map((k) => {
            const targetYearIdx = yIdx + k;
            if (targetYearIdx < 0 || targetYearIdx >= totalYears) return null;

            const diffFromCenter = targetYearIdx - smoothYearPos;
            const absDist = Math.abs(diffFromCenter);
            if (absDist > 2.0) return null;

            const posX =
              VERTICAL_LAYOUT.WHEEL_CENTER_X +
              diffFromCenter * 125 -
              125 / 2;
            const yearVal = data[targetYearIdx].year;
            const highlightWeight = Math.max(0, 1 - absDist);

            let opacity = 0.70;
            if (absDist <= 1) opacity = 0.70 + 0.30 * (1 - absDist);
            else if (absDist < 1.8) opacity = Math.max(0, 0.70 * (1 - (absDist - 1) / 0.8));
            else opacity = 0;

            const fontSize = 38 + 18 * highlightWeight;
            const fontWeight = highlightWeight > 0.5 ? 900 : 800;

            const r = Math.round(71 - (71 - 15) * highlightWeight);
            const g = Math.round(85 - (85 - 23) * highlightWeight);
            const b = Math.round(105 - (105 - 42) * highlightWeight);
            const color = `rgb(${r}, ${g}, ${b})`;

            return (
              <div
                key={yearVal}
                style={{
                  position: "absolute",
                  left: `${posX}px`,
                  top: 0,
                  width: "125px",
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: `${fontSize}px`,
                  fontWeight,
                  color,
                  opacity,
                  letterSpacing: "-0.03em",
                  fontVariantNumeric: "tabular-nums",
                  userSelect: "none",
                }}
              >
                {yearVal}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. BACKGROUND FULL-WIDTH GRID LINES & MILESTONES          */}
      {/* ========================================================= */}
      {gridTicks.map((val) => {
        const xPos =
          VERTICAL_LAYOUT.LEFT_MARGIN +
          Math.pow(val / currentMaxScale, currentGamma) *
          VERTICAL_LAYOUT.MAX_BAR_WIDTH;

        if (xPos > VERTICAL_LAYOUT.LEFT_MARGIN + VERTICAL_LAYOUT.MAX_BAR_WIDTH + 25) return null;

        let tickOpacity = 1;
        if (xPos > VERTICAL_LAYOUT.LEFT_MARGIN + VERTICAL_LAYOUT.MAX_BAR_WIDTH - 25) {
          tickOpacity = Math.max(
            0,
            Math.min(1, (VERTICAL_LAYOUT.LEFT_MARGIN + VERTICAL_LAYOUT.MAX_BAR_WIDTH + 25 - xPos) / 50)
          );
        } else if (xPos < VERTICAL_LAYOUT.LEFT_MARGIN + 45) {
          tickOpacity = Math.max(0, Math.min(1, (xPos - VERTICAL_LAYOUT.LEFT_MARGIN - 10) / 35));
        }

        return (
          <React.Fragment key={val}>
            {/* Vertical Line */}
            <div
              style={{
                position: "absolute",
                left: `${xPos}px`,
                top: `${VERTICAL_LAYOUT.TOP_OFFSET - 8}px`,
                height: `${VERTICAL_LAYOUT.BAR_PITCH * 9 + VERTICAL_LAYOUT.BAR_HEIGHT}px`,
                width: "1px",
                borderLeft: "1px solid #E2E8F0",
                pointerEvents: "none",
                zIndex: 2,
                opacity: tickOpacity,
              }}
            />
            {/* Axis Header Label */}
            <div
              style={{
                position: "absolute",
                left: `${xPos}px`,
                top: `${VERTICAL_LAYOUT.TOP_OFFSET - 30}px`,
                transform: "translateX(-50%)",
                fontSize: "20px",
                fontWeight: 900,
                color: "#64748B",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
                zIndex: 2,
                opacity: tickOpacity,
              }}
            >
              ${val}B
            </div>
          </React.Fragment>
        );
      })}

      {/* Finish line dashed boundary at full width */}
      <div
        style={{
          position: "absolute",
          left: `${VERTICAL_LAYOUT.LEFT_MARGIN + VERTICAL_LAYOUT.MAX_BAR_WIDTH}px`,
          top: `${VERTICAL_LAYOUT.TOP_OFFSET - 8}px`,
          height: `${VERTICAL_LAYOUT.BAR_PITCH * 9 + VERTICAL_LAYOUT.BAR_HEIGHT}px`,
          width: "1px",
          borderLeft: "2px dashed #CBD5E1",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ========================================================= */}
      {/* 4. FULL-WIDTH TOP 10 BARS (Square Corners, Visible Wealth) */}
      {/* ========================================================= */}
      <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 10 }}>
        {bars.map((bar) => {
          const ratio = Math.max(0, Math.min(1.0, bar.wealth / currentMaxScale));
          const rawBarWidth =
            Math.pow(ratio, currentGamma) * VERTICAL_LAYOUT.MAX_BAR_WIDTH;
          // Rank 1 hits full 1040px width; Rank 10 pinned safely above MIN_BAR_WIDTH
          const barWidth = Math.max(VERTICAL_LAYOUT.MIN_BAR_WIDTH, rawBarWidth);
          const topPos =
            VERTICAL_LAYOUT.TOP_OFFSET + (bar.rank - 1) * VERTICAL_LAYOUT.BAR_PITCH;
          const FlagComponent = bar.country_code ? Flags[bar.country_code] : null;
          const color = getPersonColor(bar.name);

          // Full Continuous 12-Digit Currency Counter (Matches Horizontal Video)
          const displayedWealth = Math.round(bar.wealth * 1_000_000_000);
          const formattedWealth = `$${displayedWealth.toLocaleString("en-US")}`;

          // Precise font measurement for GPU auto-fit
          let neededWidthAt28 = 0;
          for (const ch of bar.name) {
            if (ch === " ") neededWidthAt28 += 9;
            else if (ch === "." || ch === ",") neededWidthAt28 += 7;
            else if (ch === "I" || ch === "i" || ch === "l") neededWidthAt28 += 8;
            else if (ch >= "A" && ch <= "Z") neededWidthAt28 += 19;
            else if (ch === "m" || ch === "w") neededWidthAt28 += 21;
            else neededWidthAt28 += 15;
          }

          // Available room inside the bar between rank badge (58px) and flag (80px)
          const flagSpace = FlagComponent ? 80 : 0;
          const availableNameWidth = barWidth - 58 - flagSpace - 14;
          const scaleFactor =
            availableNameWidth > 0 && neededWidthAt28 > availableNameWidth
              ? Math.min(1.0, availableNameWidth / neededWidthAt28)
              : 1.0;

          return (
            <div
              key={bar.name}
              style={{
                position: "absolute",
                top: `${topPos}px`,
                left: `${VERTICAL_LAYOUT.LEFT_MARGIN}px`,
                height: `${VERTICAL_LAYOUT.BAR_HEIGHT}px`,
                width: `${barWidth}px`,
                backgroundColor: color.primary,
                background: `linear-gradient(90deg, ${color.primary} 0%, ${color.light} 100%)`,
                borderRadius: "0px", // SQUARE EDGES
                display: "flex",
                alignItems: "center",
                opacity: bar.opacity,
                zIndex: bar.zIndex,
                boxShadow: bar.isLeader
                  ? "0 10px 24px -4px rgba(0, 0, 0, 0.3), 0 4px 8px -2px rgba(0, 0, 0, 0.18)"
                  : "0 4px 12px -2px rgba(0, 0, 0, 0.16)",
                paddingLeft: "12px",
                paddingRight: "0px",
                border: bar.isLeader ? "2.5px solid #000000" : "1px solid rgba(255, 255, 255, 0.25)",
                boxSizing: "border-box",
              }}
            >
              {/* Rank Number Badge (Square Corners, Large Prominent Index Text) */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "0px", // SQUARE CORNERS
                  backgroundColor: bar.isLeader ? "#000000" : "rgba(255, 255, 255, 0.28)",
                  color: bar.isLeader ? "#FACC15" : "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: bar.displayedRank === 10 ? "32px" : "36px",
                  fontWeight: 900,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.02em",
                  marginRight: "14px",
                  flexShrink: 0,
                  border: bar.isLeader ? "2px solid #FACC15" : "1.5px solid rgba(255, 255, 255, 0.45)",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
                }}
              >
                {bar.displayedRank}
              </div>

              {/* Person Name (Inside the bar, right-aligned next to flag with GPU auto-fit) */}
              <div
                style={{
                  marginLeft: "auto",
                  paddingRight: "14px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexGrow: 1,
                  overflow: "hidden",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    transform: `scale(${scaleFactor})`,
                    transformOrigin: "right center",
                    whiteSpace: "nowrap",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15,
                    textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {bar.name}
                </div>
              </div>

              {/* Full-Height Embedded Country Flag (Square Corners) */}
              {FlagComponent && (
                <div
                  style={{
                    width: "80px",
                    height: "100%",
                    flexShrink: 0,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0px", // SQUARE CORNERS
                    borderLeft: bar.isLeader
                      ? "2px solid #000000"
                      : "1.5px solid rgba(0, 0, 0, 0.25)",
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <FlagComponent
                    style={{ width: "100%", height: "100%", display: "block" }}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </div>
              )}

              {/* WEALTH NUMBERS OUTSIDE AND NEXT TO THE BAR */}
              <div
                style={{
                  position: "absolute",
                  left: "calc(100% + 14px)",
                  top: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#0F172A",
                    letterSpacing: "-0.015em",
                    fontVariantNumeric: "tabular-nums",
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Text', sans-serif",
                  }}
                >
                  {formattedWealth}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 5. VINTAGE NEWSPAPER EVENT CARD (Square Corners, Big Text) */}
      {/* ========================================================= */}
      <div
        style={{
          position: "absolute",
          left: `${VERTICAL_LAYOUT.CARD_LEFT}px`,
          top: `${VERTICAL_LAYOUT.CARD_TOP}px`,
          width: `${VERTICAL_LAYOUT.CARD_WIDTH}px`,
          height: `${VERTICAL_LAYOUT.CARD_HEIGHT}px`,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          padding: "26px 36px",
          borderRadius: "0px", // SQUARE CORNERS
          zIndex: 25,
          overflow: "visible",
        }}
      >
        {/* Authentic SVG Aged Newsprint Paper with Deckled Torn Edges */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
            overflow: "visible",
          }}
        >
          <defs>
            <filter id="deckled-edge-vert" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.04 0.07" numOctaves="3" result="tears" />
              <feDisplacementMap in="SourceGraphic" in2="tears" scale="4" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feGaussianBlur in="displaced" stdDeviation="0.3" result="fibers" />
              <feMerge>
                <feMergeNode in="displaced" />
                <feMergeNode in="fibers" opacity="0.3" />
              </feMerge>
            </filter>

            <filter id="paper-shadow-vert" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04 0.07" numOctaves="2" result="shadowNoise" />
              <feDisplacementMap in="SourceGraphic" in2="shadowNoise" scale="3" xChannelSelector="R" yChannelSelector="G" result="displacedShadow" />
              <feGaussianBlur in="displacedShadow" stdDeviation="4" result="blur" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.15 0 0 0 0 0.12 0 0 0 0 0.08 0 0 0 0.06 0" />
            </filter>

            <filter id="newsprint-grain-vert">
              <feTurbulence type="fractalNoise" baseFrequency="0.8 0.9" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.18 0 0 0 1 0" />
            </filter>

            <radialGradient id="aged-paper-vert" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#FAF7EF" />
              <stop offset="55%" stopColor="#F5EFE4" />
              <stop offset="82%" stopColor="#ECE3D3" />
              <stop offset="95%" stopColor="#E2D6C2" />
              <stop offset="100%" stopColor="#DACFB9" />
            </radialGradient>
          </defs>

          {/* Shadow */}
          <rect
            x="4"
            y="4"
            width={VERTICAL_LAYOUT.CARD_WIDTH - 8}
            height={VERTICAL_LAYOUT.CARD_HEIGHT - 8}
            filter="url(#paper-shadow-vert)"
            rx="0"
            ry="0"
          />

          {/* Aged Paper Surface (Square 90-degree corners) */}
          <rect
            x="6"
            y="6"
            width={VERTICAL_LAYOUT.CARD_WIDTH - 12}
            height={VERTICAL_LAYOUT.CARD_HEIGHT - 12}
            fill="url(#aged-paper-vert)"
            filter="url(#deckled-edge-vert)"
            rx="0"
            ry="0"
          />

          {/* Physical Newsprint Grain Overlay */}
          <rect
            x="6"
            y="6"
            width={VERTICAL_LAYOUT.CARD_WIDTH - 12}
            height={VERTICAL_LAYOUT.CARD_HEIGHT - 12}
            fill="white"
            filter="url(#newsprint-grain-vert)"
            style={{ mixBlendMode: "multiply", opacity: 0.10 }}
            rx="0"
            ry="0"
          />
        </svg>

        {/* Newspaper Broadsheet Content (Huge, Authentic Event Broadsheet Typography) */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Top: Newspaper Masthead & Ears */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "4px",
            }}
          >
            {/* Left Ear */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "180px",
                borderRight: "1.5px solid #C4BCAD",
                paddingRight: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#383129",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  lineHeight: 1.1,
                }}
              >
                LATE CITY EDITION
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#665E54",
                  fontFamily: "Georgia, serif",
                  marginTop: "2px",
                }}
              >
                WEATHER: FAIR
              </span>
            </div>

            {/* Prominent Masthead Nameplate: The Chronicle */}
            <div
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: "58px",
                fontFamily: "'UnifrakturMaguntia', 'Playfair Display', Georgia, serif",
                color: "#111111",
                lineHeight: 1,
                letterSpacing: "0.02em",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              The Chronicle
            </div>

            {/* Right Ear */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                width: "180px",
                borderLeft: "1.5px solid #C4BCAD",
                paddingLeft: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#383129",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  lineHeight: 1.1,
                }}
              >
                HISTORICAL RECORD
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#665E54",
                  fontFamily: "Georgia, serif",
                  marginTop: "2px",
                }}
              >
                PRICE FIVE CENTS
              </span>
            </div>
          </div>

          {/* Folio Dateline Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "13.5px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#4A4238",
              fontFamily: "'Playfair Display', Georgia, serif",
              padding: "4px 4px 3px 4px",
              borderTop: "1.5px solid #D1C9BA",
            }}
          >
            <span>VOL. XCIV • NO. 128</span>
            <span>ANNUAL RECORD • {data[currentYearIdx]?.year || 1900}</span>
            <span>HISTORICAL ARCHIVE</span>
            <span>PAGES 1–4</span>
          </div>

          {/* Classic BroadSheet Oxford Rule */}
          <div
            style={{
              borderTop: "2.5px solid #1A1A1A",
              borderBottom: "1px solid #1A1A1A",
              height: "2px",
              margin: "1px 0 10px 0",
            }}
          />

          {/* Middle: News Article (Event Details Scaled Up & HUGE to Fill Container) */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr",
              alignItems: "center",
              overflow: "hidden",
              padding: "4px 0",
            }}
          >
            {isNewYearTransition ? (
              <>
                {/* Outgoing Event Story */}
                <div
                  style={{
                    gridArea: "1 / 1 / 2 / 2",
                    opacity: outOpacity,
                    pointerEvents: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* Primary News Headline (Event Title) */}
                  <h1
                    style={{
                      fontSize: `${prevTypo.headlineSize}px`,
                      fontWeight: 900,
                      lineHeight: 1.1,
                      letterSpacing: "-0.03em",
                      margin: "0 0 8px 0",
                      color: "#111111",
                      fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                    }}
                  >
                    {prevEvent.headline}
                  </h1>

                  {/* Name of Richest Person in Faded Newspaper Letterpress Red */}
                  <div
                    style={{
                      fontSize: `${prevTypo.leaderSize}px`,
                      fontWeight: 900,
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#A22824",
                      opacity: 0.92,
                      mixBlendMode: "multiply",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.1,
                      margin: "2px 0 10px 0",
                    }}
                  >
                    {prevLeader}
                  </div>

                  {/* Thin Hairline Divider */}
                  <div style={{ borderBottom: "2px solid #C8C0AF", margin: "6px 0 16px 0" }} />

                  {/* Story Narrative */}
                  <p
                    style={{
                      fontSize: `${prevTypo.storySize}px`,
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontWeight: 500,
                      lineHeight: 1.42,
                      color: "#1E1A16",
                      margin: 0,
                      letterSpacing: "-0.012em",
                    }}
                  >
                    {prevEvent.wealth_driver}
                  </p>
                </div>

                {/* Incoming Event Story */}
                <div
                  style={{
                    gridArea: "1 / 1 / 2 / 2",
                    opacity: inOpacity,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* Primary News Headline (Event Title) */}
                  <h1
                    style={{
                      fontSize: `${currentTypo.headlineSize}px`,
                      fontWeight: 900,
                      lineHeight: 1.1,
                      letterSpacing: "-0.03em",
                      margin: "0 0 8px 0",
                      color: "#111111",
                      fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                    }}
                  >
                    {currentEvent.headline}
                  </h1>

                  {/* Name of Richest Person in Faded Newspaper Letterpress Red */}
                  <div
                    style={{
                      fontSize: `${currentTypo.leaderSize}px`,
                      fontWeight: 900,
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#A22824",
                      opacity: 0.92,
                      mixBlendMode: "multiply",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.1,
                      margin: "2px 0 10px 0",
                    }}
                  >
                    {currentLeader}
                  </div>

                  {/* Thin Hairline Divider */}
                  <div style={{ borderBottom: "2px solid #C8C0AF", margin: "6px 0 16px 0" }} />

                  {/* Story Narrative */}
                  <p
                    style={{
                      fontSize: `${currentTypo.storySize}px`,
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontWeight: 500,
                      lineHeight: 1.42,
                      color: "#1E1A16",
                      margin: 0,
                      letterSpacing: "-0.012em",
                    }}
                  >
                    {currentEvent.wealth_driver}
                  </p>
                </div>
              </>
            ) : (
              <div
                style={{
                  gridArea: "1 / 1 / 2 / 2",
                  opacity: isInitialEntrance ? inOpacity : 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Primary News Headline (Event Title) */}
                <h1
                  style={{
                    fontSize: `${currentTypo.headlineSize}px`,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    margin: "0 0 8px 0",
                    color: "#111111",
                    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                  }}
                >
                  {currentEvent.headline}
                </h1>

                {/* Name of Richest Person in Faded Newspaper Letterpress Red */}
                <div
                  style={{
                    fontSize: `${currentTypo.leaderSize}px`,
                    fontWeight: 900,
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#A22824",
                    opacity: 0.92,
                    mixBlendMode: "multiply",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.1,
                    margin: "2px 0 10px 0",
                  }}
                >
                  {currentLeader}
                </div>

                {/* Thin Hairline Divider */}
                <div style={{ borderBottom: "2px solid #C8C0AF", margin: "6px 0 16px 0" }} />

                {/* Story Narrative */}
                <p
                  style={{
                    fontSize: `${currentTypo.storySize}px`,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontWeight: 500,
                    lineHeight: 1.42,
                    color: "#1E1A16",
                    margin: 0,
                    letterSpacing: "-0.012em",
                  }}
                >
                  {currentEvent.wealth_driver}
                </p>
              </div>
            )}
          </div>

          {/* Bottom: Archival Timeline Progress Bar (Solid Monochrome Printer's Ink) */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              paddingTop: "10px",
              borderTop: "2px solid #1A1A1A",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 900,
                  color: "#111111",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.02em",
                }}
              >
                {startYear}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#4A4238",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                ★ HISTORICAL CHRONOLOGY: {startYear} — {endYear} ★
              </span>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 900,
                  color: "#111111",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.02em",
                }}
              >
                {endYear}
              </span>
            </div>

            {/* Monochrome Black Ink Progress Bar */}
            <div
              style={{
                width: "100%",
                height: "18px",
                backgroundColor: "#ECE4D6",
                border: "2px solid #1A1A1A",
                borderRadius: "0px",
                overflow: "hidden",
                padding: "2px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, Math.max(0, progressTotal * 100))}%`,
                  height: "100%",
                  backgroundColor: "#1A1A1A", // Solid black printer's ink (NO color)
                  borderRadius: "0px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
