import React from "react";
import { useCurrentFrame } from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadBlackletter } from "@remotion/google-fonts/UnifrakturMaguntia";
import data from "./data.json";
import { LAYOUT } from "./constants";

loadPlayfair();
loadBlackletter();

const MONTH_NAMES = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

// Horizontal Month & Year Wheel geometry (scaled for landscape Event Card header)
const VIEWPORT_WIDTH = 420;
const CENTER_X = VIEWPORT_WIDTH / 2; // 210px

const MONTH_ITEM_WIDTH = 110;
const MONTH_WHEEL_HEIGHT = 52;

const YEAR_ITEM_WIDTH = 180;
const YEAR_WHEEL_HEIGHT = 74;

export const EventPanel = ({
  currentYear,
  progressTotal,
  framesPerYear = 120,
}) => {
  const frame = useCurrentFrame();
  const totalYears = data.length;
  const startYear = data[0]?.year || 1900;
  const endYear = data[data.length - 1]?.year || 2026;

  const floatYear = frame / framesPerYear;
  const currentYearIdx = Math.min(Math.floor(floatYear), totalYears - 1);
  const prevYearIdx = Math.max(0, currentYearIdx - 1);
  const localFrame = frame % framesPerYear;

  // 1. Horizontal Month Wheel Animation
  const globalMonthFloat = (frame / framesPerYear) * 12;
  const mIdx = Math.floor(globalMonthFloat);
  const monthSubProgress = globalMonthFloat - mIdx;

  let monthRoll = 0;
  if (monthSubProgress > 0.6) {
    const rollP = (monthSubProgress - 0.6) / 0.4;
    monthRoll = 0.5 * (1 - Math.cos(Math.PI * rollP));
  }
  const smoothMonthPos = mIdx + monthRoll;
  const visibleMonthOffsets = [-3, -2, -1, 0, 1, 2, 3];

  // 2. Horizontal Year Wheel Animation (smooth wheel roll in late December)
  const yIdx = currentYearIdx;
  const yearFraction = floatYear - yIdx;
  const YEAR_ROLL_START = 0.92;
  let yearRoll = 0;
  if (yearFraction > YEAR_ROLL_START && yIdx < totalYears - 1) {
    const p = (yearFraction - YEAR_ROLL_START) / (1 - YEAR_ROLL_START);
    yearRoll = 0.5 * (1 - Math.cos(Math.PI * p));
  }
  const smoothYearPos = yIdx + yearRoll;
  const visibleYearOffsets = [-2, -1, 0, 1, 2];

  // 2. Smooth Fade In / Fade Out Event Story Transition (Zero Jitter, Zero Layout Shift)
  const TRANSITION_DURATION = 16;
  const isNewYearTransition = currentYearIdx > 0 && localFrame < TRANSITION_DURATION;
  const isInitialEntrance = currentYearIdx === 0 && localFrame < TRANSITION_DURATION;

  // Outgoing fades out cleanly in the first 6 frames (starts at 1.0, hits 0.0 at frame 6)
  const outProgress = Math.min(1, Math.max(0, localFrame / 6));
  const outOpacity = 0.5 * (1 + Math.cos(Math.PI * outProgress));

  // Incoming fades in cleanly in frames 5 to 15 (starts at 0.0 at frame 5, reaches 1.0 at frame 15)
  const inProgress = Math.min(1, Math.max(0, (localFrame - 5) / 10));
  const inOpacity = isInitialEntrance
    ? 0.5 * (1 - Math.cos(Math.PI * (localFrame / TRANSITION_DURATION)))
    : 0.5 * (1 - Math.cos(Math.PI * inProgress));

  const currentEvent = data[currentYearIdx].top_event;
  const prevEvent = data[prevYearIdx].top_event;

  const currentLeader = currentEvent?.leader || "Top Leader";
  const prevLeader = prevEvent?.leader || "Top Leader";

  const activeLeader =
    isNewYearTransition && localFrame < 6 ? prevLeader : currentLeader;

  return (
    <>
      {/* 1. Outside Container: Month Wheel (Top) + Year Wheel (Bottom) above Event Card */}
      <div
        style={{
          position: "absolute",
          left: `${LAYOUT.EVENT_CARD_LEFT}px`,
          width: `${LAYOUT.EVENT_CARD_WIDTH}px`,
          top: `${LAYOUT.EVENT_CARD_TOP - 138}px`,
          height: "130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          gap: "4px",
          paddingRight: "28px",
          zIndex: 25,
          pointerEvents: "none",
        }}
      >
        {/* TOP: Horizontal Month Wheel */}
        <div
          style={{
            width: `${VIEWPORT_WIDTH}px`,
            height: `${MONTH_WHEEL_HEIGHT}px`,
            overflow: "hidden",
            position: "relative",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
        >
          {/* Center stationary indicator line below active month */}
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: `${CENTER_X - 26}px`,
              width: "52px",
              height: "4px",
              backgroundColor: "#0F172A",
              borderRadius: "0px",
              zIndex: 5,
            }}
          />

          {/* Sliding Month Strip */}
          {visibleMonthOffsets.map((k) => {
            const intMonth = mIdx + k;
            const diffFromCenter = intMonth - smoothMonthPos;
            const absDist = Math.abs(diffFromCenter);
            if (absDist > 2.8) return null;

            const posX = CENTER_X + diffFromCenter * MONTH_ITEM_WIDTH - MONTH_ITEM_WIDTH / 2;
            const monthName = MONTH_NAMES[((intMonth % 12) + 12) % 12];
            const highlightWeight = Math.max(0, 1 - absDist);

            let opacity = 0.35;
            if (absDist <= 1) {
              opacity = 0.35 + 0.65 * (1 - absDist);
            } else if (absDist < 2.5) {
              opacity = Math.max(0, 0.35 * (1 - (absDist - 1) / 1.5));
            } else {
              opacity = 0;
            }

            const fontSize = 26 + 14 * highlightWeight;
            const fontWeight = highlightWeight > 0.5 ? 900 : 700;

            const r = Math.round(148 - (148 - 15) * highlightWeight);
            const g = Math.round(163 - (163 - 23) * highlightWeight);
            const b = Math.round(184 - (184 - 42) * highlightWeight);
            const color = `rgb(${r}, ${g}, ${b})`;

            return (
              <div
                key={intMonth}
                style={{
                  position: "absolute",
                  left: `${posX}px`,
                  top: 0,
                  width: `${MONTH_ITEM_WIDTH}px`,
                  height: `${MONTH_WHEEL_HEIGHT - 6}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: `${fontSize}px`,
                  fontWeight,
                  color,
                  opacity,
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {monthName}
              </div>
            );
          })}
        </div>

        {/* BOTTOM: Horizontal Year Wheel */}
        <div
          style={{
            width: `${VIEWPORT_WIDTH}px`,
            height: `${YEAR_WHEEL_HEIGHT}px`,
            overflow: "hidden",
            position: "relative",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)",
          }}
        >
          {/* Sliding Year Strip */}
          {visibleYearOffsets.map((k) => {
            const targetYearIdx = yIdx + k;
            if (targetYearIdx < 0 || targetYearIdx >= totalYears) return null;

            const diffFromCenter = targetYearIdx - smoothYearPos;
            const absDist = Math.abs(diffFromCenter);
            if (absDist > 2.2) return null;

            const posX = CENTER_X + diffFromCenter * YEAR_ITEM_WIDTH - YEAR_ITEM_WIDTH / 2;
            const yearVal = data[targetYearIdx].year;
            const highlightWeight = Math.max(0, 1 - absDist);

            let opacity = 0.28;
            if (absDist <= 1) {
              opacity = 0.28 + 0.72 * (1 - absDist);
            } else if (absDist < 2.2) {
              opacity = Math.max(0, 0.28 * (1 - (absDist - 1) / 1.2));
            } else {
              opacity = 0;
            }

            const fontSize = 48 + 26 * highlightWeight;
            const fontWeight = highlightWeight > 0.5 ? 900 : 700;

            const r = Math.round(148 - (148 - 15) * highlightWeight);
            const g = Math.round(163 - (163 - 23) * highlightWeight);
            const b = Math.round(184 - (184 - 42) * highlightWeight);
            const color = `rgb(${r}, ${g}, ${b})`;

            return (
              <div
                key={yearVal}
                style={{
                  position: "absolute",
                  left: `${posX}px`,
                  top: 0,
                  width: `${YEAR_ITEM_WIDTH}px`,
                  height: `${YEAR_WHEEL_HEIGHT}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: `${fontSize}px`,
                  fontWeight,
                  color,
                  opacity,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  userSelect: "none",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {yearVal}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Authentic Broadsheet Newspaper Container with Real Old Deckled Paper Edges */}
      <div
        id="event-card"
        style={{
          position: "absolute",
          left: `${LAYOUT.EVENT_CARD_LEFT}px`,
          top: `${LAYOUT.EVENT_CARD_TOP}px`,
          width: `${LAYOUT.EVENT_CARD_WIDTH}px`,
          height: `${LAYOUT.EVENT_CARD_HEIGHT}px`,
          padding: "16px 30px 18px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 25,
          fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Real Old Newsprint Paper Sheet with Organic Deckled / Torn Edges & Aging Patina */}
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
            {/* 1. Organic Deckled / Torn Paper Edge Displacement Filter */}
            <filter
              id="deckled-paper-edge"
              x="-5%"
              y="-5%"
              width="110%"
              height="110%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.045 0.08"
                numOctaves="3"
                result="paperTears"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="paperTears"
                scale="4.5"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displacedEdge"
              />
              <feGaussianBlur in="displacedEdge" stdDeviation="0.35" result="frayedFibers" />
              <feMerge>
                <feMergeNode in="displacedEdge" />
                <feMergeNode in="frayedFibers" opacity="0.3" />
              </feMerge>
            </filter>

            {/* 2. Soft Ambient Paper Shadow Filter */}
            <filter id="paper-ambient-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.045 0.08"
                numOctaves="2"
                result="shadowNoise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="shadowNoise"
                scale="4"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displacedShadow"
              />
              <feGaussianBlur in="displacedShadow" stdDeviation="3" result="blurredShadow" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.15
                        0 0 0 0 0.12
                        0 0 0 0 0.08
                        0 0 0 0.045 0"
              />
            </filter>

            {/* 3. Physical Newsprint Micro-Fiber Pulp Grain */}
            <filter id="newsprint-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8 0.9"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.35
                        0 0 0 0 0.28
                        0 0 0 0 0.18
                        0 0 0 1 0"
              />
            </filter>

            {/* 4. Authentic Aged Newsprint Gradient (Gentle Warm Tanned Perimeter & Creamy Core - No Harsh Dark Rims) */}
            <radialGradient id="aged-paper-gradient" cx="50%" cy="45%" r="80%">
              <stop offset="0%" stopColor="#FAF7EF" />
              <stop offset="55%" stopColor="#F5EFE4" />
              <stop offset="82%" stopColor="#ECE3D3" />
              <stop offset="94%" stopColor="#E2D6C2" />
              <stop offset="100%" stopColor="#DACFB9" />
            </radialGradient>
          </defs>

          {/* Ambient Paper Shadow (Soft Natural Lift) */}
          <rect
            x="4"
            y="4"
            width={LAYOUT.EVENT_CARD_WIDTH - 8}
            height={LAYOUT.EVENT_CARD_HEIGHT - 8}
            filter="url(#paper-ambient-shadow)"
          />

          {/* Real Aged Newsprint Paper Sheet with Organic Deckled Torn Edges */}
          <rect
            x="6"
            y="6"
            width={LAYOUT.EVENT_CARD_WIDTH - 12}
            height={LAYOUT.EVENT_CARD_HEIGHT - 12}
            fill="url(#aged-paper-gradient)"
            filter="url(#deckled-paper-edge)"
          />

          {/* Newsprint Fiber Grain on the Paper Surface */}
          <rect
            x="6"
            y="6"
            width={LAYOUT.EVENT_CARD_WIDTH - 12}
            height={LAYOUT.EVENT_CARD_HEIGHT - 12}
            fill="white"
            filter="url(#newsprint-grain)"
            style={{ mixBlendMode: "multiply", opacity: 0.10 }}
          />
        </svg>

        {/* Grand Newspaper Masthead & Folio (Compact Broadsheet Header) */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingBottom: "1px",
            }}
          >
            {/* Left Ear */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "135px",
                borderRight: "1px solid #C4BCAD",
                paddingRight: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "10.5px",
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
                  fontSize: "9.5px",
                  fontWeight: 600,
                  color: "#665E54",
                  fontFamily: "Georgia, serif",
                  marginTop: "1px",
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
                fontSize: "46px",
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
                width: "135px",
                borderLeft: "1px solid #C4BCAD",
                paddingLeft: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "10.5px",
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
                  fontSize: "9.5px",
                  fontWeight: 600,
                  color: "#665E54",
                  fontFamily: "Georgia, serif",
                  marginTop: "1px",
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
              fontSize: "11.5px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#4A4238",
              fontFamily: "'Playfair Display', Georgia, serif",
              padding: "3px 4px 2px 4px",
              borderTop: "1px solid #D1C9BA",
            }}
          >
            <span>VOL. XCIV • NO. 128</span>
            <span>ANNUAL RECORD • {currentYear}</span>
            <span>HISTORICAL ARCHIVE</span>
            <span>PAGES 1–4</span>
          </div>

          {/* Classic BroadSheet Oxford Rule */}
          <div
            style={{
              borderTop: "2.5px solid #1A1A1A",
              borderBottom: "1px solid #1A1A1A",
              height: "2px",
              margin: "1px 0 6px 0",
            }}
          />
        </div>

        {/* Middle: News Article (Event Details Scaled Up to Fill Container) */}
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
            padding: "8px 0 6px 0",
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
                    fontSize: "44px",
                    fontWeight: 900,
                    lineHeight: 1.12,
                    letterSpacing: "-0.03em",
                    margin: "0 0 6px 0",
                    color: "#111111",
                    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                  }}
                >
                  {prevEvent.headline}
                </h1>

                {/* Name of Richest Person in Faded Newspaper Letterpress Red */}
                <div
                  style={{
                    fontSize: "34px",
                    fontWeight: 900,
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#A22824",
                    opacity: 0.88,
                    mixBlendMode: "multiply",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.1,
                    margin: "2px 0 8px 0",
                  }}
                >
                  {prevLeader}
                </div>

                {/* Thin Hairline Divider */}
                <div style={{ borderBottom: "1px solid #D5CEBF", margin: "4px 0 14px 0" }} />

                {/* Story Narrative */}
                <p
                  style={{
                    fontSize: "32px",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontWeight: 500,
                    lineHeight: 1.38,
                    color: "#1E1A16",
                    margin: 0,
                    letterSpacing: "-0.015em",
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
                    fontSize: "44px",
                    fontWeight: 900,
                    lineHeight: 1.12,
                    letterSpacing: "-0.03em",
                    margin: "0 0 6px 0",
                    color: "#111111",
                    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                  }}
                >
                  {currentEvent.headline}
                </h1>

                {/* Name of Richest Person in Faded Newspaper Letterpress Red */}
                <div
                  style={{
                    fontSize: "34px",
                    fontWeight: 900,
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#A22824",
                    opacity: 0.88,
                    mixBlendMode: "multiply",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.1,
                    margin: "2px 0 8px 0",
                  }}
                >
                  {currentLeader}
                </div>

                {/* Thin Hairline Divider */}
                <div style={{ borderBottom: "1px solid #D5CEBF", margin: "4px 0 14px 0" }} />

                {/* Story Narrative */}
                <p
                  style={{
                    fontSize: "32px",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontWeight: 500,
                    lineHeight: 1.38,
                    color: "#1E1A16",
                    margin: 0,
                    letterSpacing: "-0.015em",
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
                  fontSize: "44px",
                  fontWeight: 900,
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  margin: "0 0 6px 0",
                  color: "#111111",
                  fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                }}
              >
                {currentEvent.headline}
              </h1>

              {/* Name of Richest Person in Faded Newspaper Letterpress Red */}
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: 900,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#A22824",
                  opacity: 0.88,
                  mixBlendMode: "multiply",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.1,
                  margin: "2px 0 8px 0",
                }}
              >
                {currentLeader}
              </div>

              {/* Thin Hairline Divider */}
              <div style={{ borderBottom: "1px solid #D5CEBF", margin: "4px 0 14px 0" }} />

              {/* Story Narrative */}
              <p
                style={{
                  fontSize: "32px",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontWeight: 500,
                  lineHeight: 1.38,
                  color: "#1E1A16",
                  margin: 0,
                  letterSpacing: "-0.015em",
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
            paddingTop: "8px",
            borderTop: "1.5px solid #1A1A1A",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
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
                fontSize: "26px",
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
                fontSize: "12px",
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
                fontSize: "26px",
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
              height: "15px",
              backgroundColor: "#ECE4D6",
              border: "2px solid #1A1A1A",
              borderRadius: "0px",
              overflow: "hidden",
              padding: "1.5px",
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
    </>
  );
};
