import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import * as Flags from "country-flag-icons/react/3x2";
import data from "../data.json";
import { buildTimeline } from "../engine";
import { getPersonColor, MONTHS } from "../constants";

export const GSDShort = ({ framesPerYear = 12 }) => {
  const frame = useCurrentFrame();

  // Memoize timeline precomputation for the target vertical frame rate
  const timeline = useMemo(() => {
    return buildTimeline(framesPerYear);
  }, [framesPerYear]);

  const frameIdx = Math.min(timeline.length - 1, Math.max(0, frame));
  const bars = timeline[frameIdx] || [];

  // Compute current year and month for fast-paced vertical playback
  const floatYear = frame / framesPerYear;
  const yearIdx = Math.min(data.length - 1, Math.floor(floatYear));
  const displayedYear = data[yearIdx]?.year || 1900;
  const monthFraction = floatYear - Math.floor(floatYear);
  const displayedMonth = MONTHS[Math.min(11, Math.floor(monthFraction * 12))];

  // Active historical event card for the current year
  const activeEvent = data[yearIdx]?.top_event || {
    leader: "Andrew Carnegie",
    headline: "Industrial Wealth Record",
    wealth_driver: "Mass production and industrial integration set historic benchmarks.",
  };

  const currentMaxScale = bars.maxScale || 100;
  const currentGamma = bars.gamma || 0.55;

  // Vertical layout geometry for 1080x1920 (9:16 aspect ratio)
  const MAX_BAR_WIDTH_VERTICAL = 680;
  const TOP_BARS_OFFSET = 360;
  const BAR_PITCH = 96;
  const BAR_HEIGHT = 82;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        color: "#0F172A",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Top Header Section (1080x1920 Safe Zone) */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "40px",
          right: "40px",
          textAlign: "center",
          zIndex: 30,
        }}
      >
        <h1
          style={{
            fontSize: "44px",
            fontWeight: 900,
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            margin: 0,
            color: "#0F172A",
          }}
        >
          TOP 10 RICHEST FROM {startYear} TO {endYear}
        </h1>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: "#2563EB",
            marginTop: "6px",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          ADJUSTED TO INFLATION
        </div>

        {/* Prominent Floating Month & Year Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            marginTop: "16px",
            backgroundColor: "#0F172A",
            color: "#FFFFFF",
            padding: "8px 24px",
            borderRadius: "0px",
            boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.3)",
          }}
        >
          <span style={{ fontSize: "28px", fontWeight: 800, color: "#94A3B8" }}>
            {displayedMonth}
          </span>
          <span style={{ fontSize: "38px", fontWeight: 900, letterSpacing: "-0.02em" }}>
            {displayedYear}
          </span>
        </div>
      </div>

      {/* Vertical Bars Container */}
      <div
        style={{
          position: "absolute",
          top: `${TOP_BARS_OFFSET}px`,
          left: "0px",
          right: "0px",
          height: `${BAR_PITCH * 10}px`,
          zIndex: 10,
        }}
      >
        {bars.map((bar) => {
          const ratio = Math.max(0, Math.min(1.5, bar.wealth / currentMaxScale));
          const rawWidth = Math.pow(ratio, currentGamma) * MAX_BAR_WIDTH_VERTICAL;
          const barWidth = Math.max(340, rawWidth);
          const topPos = (bar.rank - 1) * BAR_PITCH;
          const FlagComponent = bar.country_code ? Flags[bar.country_code] : null;
          const color = getPersonColor(bar.name);

          const displayedWealth = Math.round(bar.wealth * 1_000_000_000);
          const formattedWealth = `$${displayedWealth.toLocaleString("en-US")}`;

          return (
            <div
              key={bar.name}
              style={{
                position: "absolute",
                top: `${topPos}px`,
                left: "0px",
                height: `${BAR_HEIGHT}px`,
                width: `${barWidth}px`,
                backgroundColor: color.primary,
                borderRadius: "0px",
                display: "flex",
                alignItems: "center",
                opacity: bar.opacity,
                zIndex: bar.zIndex,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                transition: "box-shadow 0.2s ease",
              }}
            >
              {/* Rank Badge */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "0px",
                  backgroundColor: bar.isLeader ? "#FACC15" : "rgba(255, 255, 255, 0.22)",
                  color: bar.isLeader ? "#000000" : "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: 800,
                  marginLeft: "10px",
                  flexShrink: 0,
                }}
              >
                {bar.displayedRank}
              </div>

              {/* Person Name (Right-aligned next to flag) */}
              <div
                style={{
                  marginLeft: "auto",
                  paddingRight: "14px",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
                }}
              >
                {bar.name}
              </div>

              {/* 3:2 Country Flag Endcap */}
              {FlagComponent && (
                <div
                  style={{
                    width: "80px",
                    height: "100%",
                    overflow: "hidden",
                    flexShrink: 0,
                    borderRadius: "0px",
                  }}
                >
                  <FlagComponent
                    style={{ width: "100%", height: "100%", display: "block" }}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </div>
              )}

              {/* Outside Wealth Label */}
              <div
                style={{
                  position: "absolute",
                  left: "calc(100% + 10px)",
                  whiteSpace: "nowrap",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#0F172A",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formattedWealth}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Historical Event Card */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "40px",
          right: "40px",
          height: "440px",
          backgroundColor: "#FDFBF7",
          borderRadius: "0px",
          border: "2px solid #E2D9C8",
          padding: "24px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 20px 35px -10px rgba(0, 0, 0, 0.08)",
          zIndex: 20,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #0F172A",
              paddingBottom: "8px",
              marginBottom: "14px",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "0.15em", color: "#64748B" }}>
              HISTORICAL DISPATCH • {displayedYear}
            </span>
            <span style={{ fontSize: "16px", fontWeight: 800, color: "#E11D48" }}>
              RANK #1 HIGHLIGHT
            </span>
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            {activeEvent.headline}
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: 1.4,
              color: "#334155",
            }}
          >
            {activeEvent.wealth_driver}
          </div>
        </div>

        {/* Footer Brand Banner */}
        <div
          style={{
            borderTop: "1px solid #E2D9C8",
            paddingTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: 700,
            color: "#64748B",
          }}
        >
          <span>Leader: <strong style={{ color: "#0F172A" }}>{activeEvent.leader}</strong></span>
          <span>Subscribe for Daily History</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
