import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import data from "./data.json";
import { BarItem } from "./BarItem";
import { EventPanel } from "./EventPanel";
import { PERSON_COLORS, DEFAULT_COLOR, getPersonColor, LAYOUT, WEALTH_SCALE_GAMMA } from "./constants";
import { buildTimeline, TOTAL_YEARS } from "./engine";

// Precompute 100% mathematically accurate timeline once at module load
const TIMELINE = buildTimeline(120);

export const GSD = ({ framesPerYear = 120 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const floatIdx = frame / framesPerYear;
  const currentYearIdx = Math.min(Math.floor(floatIdx), TOTAL_YEARS - 1);
  const subProgress = Math.min(1, Math.max(0, floatIdx - currentYearIdx));

  const d1 = data[currentYearIdx];

  const displayedYear = d1.year;
  const progressTotal = Math.min(1, frame / durationInFrames);

  // Retrieve mathematically accurate, buttery smooth frame data
  const frameIdx = Math.min(TIMELINE.length - 1, Math.max(0, frame));
  const bars = TIMELINE[frameIdx];
  const currentMaxScale = bars.maxScale || LAYOUT.MAX_WEALTH_SCALE;
  const currentGamma = bars.gamma || WEALTH_SCALE_GAMMA;

  // Dynamically select milestone tick step based on continuous wealth scale
  let tickStep = 20;
  if (currentMaxScale > 500) {
    tickStep = 100;
  } else if (currentMaxScale > 260) {
    tickStep = 50;
  } else if (currentMaxScale > 140) {
    tickStep = 25;
  } else if (currentMaxScale > 70) {
    tickStep = 20;
  } else if (currentMaxScale > 35) {
    tickStep = 10;
  } else if (currentMaxScale > 16) {
    tickStep = 5;
  } else if (currentMaxScale > 8) {
    tickStep = 2;
  } else {
    tickStep = 1;
  }
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
      {/* Top Header */}
      <div
        style={{
          position: "absolute",
          top: "28px",
          left: "24px",
          right: "50px",
          display: "flex",
          alignItems: "center",
          zIndex: 30,
          borderBottom: "2px solid #F1F5F9",
          paddingBottom: "14px",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: 900,
            letterSpacing: "-0.035em",
            lineHeight: 1,
            margin: 0,
            color: "#0F172A",
          }}
        >
          TOP 10 RICHEST INDIVIDUALS ({data[0]?.year || 1900} – {data[data.length - 1]?.year || 2026}) (ADJUSTED TO INFLATION)
        </h1>
      </div>

      {/* Background Vertical Grid Lines for the Bar Chart */}
      {gridTicks.map((val) => {
        const xPos =
          LAYOUT.LEFT_MARGIN +
          Math.pow(val / currentMaxScale, currentGamma) * LAYOUT.MAX_BAR_WIDTH;

        // Skip ticks that are significantly beyond the right boundary
        if (xPos > LAYOUT.MAX_BAR_WIDTH + 35) return null;

        // Smooth fade-in/out as ticks approach boundaries
        let tickOpacity = 1;
        if (xPos > LAYOUT.MAX_BAR_WIDTH - 25) {
          tickOpacity = Math.max(0, Math.min(1, (LAYOUT.MAX_BAR_WIDTH + 35 - xPos) / 60));
        } else if (xPos < 50) {
          tickOpacity = Math.max(0, Math.min(1, (xPos - 15) / 35));
        }

        return (
          <React.Fragment key={val}>
            <div
              style={{
                position: "absolute",
                left: `${xPos}px`,
                top: `${LAYOUT.TOP_OFFSET - 10}px`,
                height: `${LAYOUT.BAR_PITCH * 9 + LAYOUT.BAR_HEIGHT}px`,
                width: "1px",
                backgroundColor: "#F1F5F9",
                borderLeft: "1px solid #E2E8F0",
                pointerEvents: "none",
                zIndex: 2,
                opacity: tickOpacity,
              }}
            />
            {/* Grid Tick Header Label */}
            <div
              style={{
                position: "absolute",
                left: `${xPos}px`,
                top: `${LAYOUT.TOP_OFFSET - 40}px`,
                transform: "translateX(-50%)",
                fontSize: "22px",
                fontWeight: 800,
                color: "#475569",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
                zIndex: 2,
                opacity: tickOpacity,
              }}
            >
              ${val}B
            </div>
          </React.Fragment>
        );
      })}

      {/* Permanent Right Boundary / Finish Line at MAX_BAR_WIDTH */}
      <div
        style={{
          position: "absolute",
          left: `${LAYOUT.MAX_BAR_WIDTH}px`,
          top: `${LAYOUT.TOP_OFFSET - 10}px`,
          height: `${LAYOUT.BAR_PITCH * 9 + LAYOUT.BAR_HEIGHT}px`,
          width: "1px",
          borderLeft: "2px dashed #CBD5E1",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Horizontal Bars Container: Bars start flush from the left border edge */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {bars.map((bar) => (
          <BarItem
            key={bar.name}
            name={bar.name}
            country_code={bar.country_code}
            rank={bar.rank}
            wealth={bar.wealth}
            wealthVelocity={bar.wealthVelocity}
            opacity={bar.opacity}
            color={getPersonColor(bar.name)}
            isLeader={bar.isLeader}
            zIndex={bar.zIndex}
            displayedRank={bar.displayedRank}
            maxScale={currentMaxScale}
            gamma={currentGamma}
          />
        ))}
      </div>

      {/* Right Event Panel: Month, Year & Scaled-Up Event Card (Zero Negative Space) */}
      <EventPanel
        currentYear={displayedYear}
        progressTotal={progressTotal}
        framesPerYear={framesPerYear}
      />
    </AbsoluteFill>
  );
};
