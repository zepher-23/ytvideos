import React from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { LAYOUT, WEALTH_SCALE_GAMMA } from "./constants";

export const BarItem = ({
  name,
  country_code,
  rank,
  wealth,
  wealthVelocity = 0,
  opacity,
  color,
  isLeader,
  zIndex,
  displayedRank,
  maxScale = LAYOUT.MAX_WEALTH_SCALE,
  gamma = WEALTH_SCALE_GAMMA,
}) => {
  // Dynamic adaptive power scaling (gamma) consistently pins the lower index (rank 10)
  // to ~500px on the left side of the screen, guaranteeing zero collision with the Event Card
  const ratio = Math.max(0, Math.min(1.5, wealth / maxScale));
  const rawBarWidth = Math.pow(ratio, gamma) * LAYOUT.MAX_BAR_WIDTH;
  const barWidth = Math.max(500, rawBarWidth);
  const topPos = LAYOUT.TOP_OFFSET + (rank - 1) * LAYOUT.BAR_PITCH;
  const FlagComponent = country_code ? Flags[country_code] : null;

  // Full 12-digit currency counter where every single digit (including the last 6 digits)
  // actively increases or decreases based on the PCHIP continuous wealth curve and velocity
  const displayedWealth = Math.round(wealth * 1_000_000_000);
  const formattedWealth = `$${displayedWealth.toLocaleString("en-US")}`;

  // Measure exact width needed at full 34px font size
  let neededWidthAt34 = 0;
  for (const ch of name) {
    if (ch === " ") neededWidthAt34 += 10;
    else if (ch === "." || ch === ",") neededWidthAt34 += 8;
    else if (ch === "I" || ch === "i" || ch === "l") neededWidthAt34 += 9;
    else if (ch >= "A" && ch <= "Z") neededWidthAt34 += 22;
    else if (ch === "m" || ch === "w") neededWidthAt34 += 24;
    else neededWidthAt34 += 18;
  }

  // Available room inside the bar between rank badge and flag
  const availableNameWidth = barWidth - (FlagComponent ? 218 : 94);
  const safeWidth = availableNameWidth - 10;

  // GPU Scale Factor: ALWAYS 1.0 (Full 34px!) whenever there is space on the bar!
  // Smoothly scales down on the GPU only when an exceptionally long name is on a constrained lower bar
  const scaleFactor =
    safeWidth > 0 && neededWidthAt34 > safeWidth
      ? Math.min(1.0, safeWidth / neededWidthAt34)
      : 1.0;

  return (
    <div
      style={{
        position: "absolute",
        top: `${topPos}px`,
        left: "0px", // Starts flush from the very edge of the border
        height: `${LAYOUT.BAR_HEIGHT}px`,
        width: `${barWidth}px`,
        boxSizing: "border-box",
        opacity,
        zIndex, // Controlled constant zIndex: climbing bars stay OVER, falling bars stay UNDER
        borderRadius: "0px",
        backgroundColor: color.primary,
        borderTop: isLeader
          ? "2px solid #000000"
          : "1.5px solid rgba(255, 255, 255, 0.25)",
        borderRight: isLeader
          ? "2px solid #000000"
          : "1.5px solid rgba(255, 255, 255, 0.25)",
        borderBottom: isLeader
          ? "2px solid #000000"
          : "1.5px solid rgba(255, 255, 255, 0.25)",
        borderLeft: "none",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "16px",
        paddingRight: "0px", // Embedded flag is flush against the right edge of the bar
        willChange: "transform, top, width, opacity",
        overflow: "visible",
      }}
    >
      {/* Start of the bar (left): Rank Badge */}
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "0px",
          backgroundColor: isLeader ? "#000000" : "rgba(0, 0, 0, 0.24)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isLeader ? "28px" : "32px",
          fontWeight: 600,
          color: isLeader ? "#FFD700" : "#FFFFFF",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          flexShrink: 0,
        }}
      >
        {isLeader ? "👑" : displayedRank}
      </div>

      {/* Middle of the bar: Person Name on the RIGHT side of the bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Aligned to the right side of the bar
          flex: 1,
          minWidth: 0,
          marginLeft: "14px",
          marginRight: FlagComponent ? "14px" : "18px",
          overflow: "visible",
        }}
      >
        {/* Person Name: Full 34px by default, GPU-scales with buttery smoothness */}
        <span
          style={{
            fontSize: "34px",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.012em",
            color: "#FFFFFF",
            whiteSpace: "nowrap",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.35)",
            flexShrink: 0,
            transformOrigin: "right center", // Anchored right next to the flag
            transform:
              scaleFactor < 0.999
                ? `scale(${scaleFactor.toFixed(4)})`
                : undefined,
            willChange: "transform",
            textAlign: "right",
            paddingTop: "2px",
            paddingBottom: "2px",
          }}
        >
          {name}
        </span>
      </div>

      {/* Full-Height Flag Embedded Seamlessly at the End of the Bar (Natural 3:2 aspect ratio) */}
      {FlagComponent && (
        <div
          style={{
            width: "124px",
            height: "100%",
            flexShrink: 0,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderLeft: isLeader
              ? "2px solid #000000"
              : "1.5px solid rgba(0, 0, 0, 0.22)",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
          }}
        >
          <FlagComponent
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
            preserveAspectRatio="xMidYMid slice"
          />
        </div>
      )}

      {/* Value Label: Full 12-digit currency counter outside the bar */}
      <div
        style={{
          position: "absolute",
          left: `calc(100% + 14px)`,
          display: "flex",
          alignItems: "baseline",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "27px",
            fontWeight: 600,
            color: "#0F172A",
            letterSpacing: "-0.01em",
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
};
