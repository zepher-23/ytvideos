import React from "react";

/**
 * JumpRope - 2D Comic Animated Skipping Rope
 * 
 * Supports:
 * - ropePhase: "floor" | "pickup" | "skipping" | "held" | "dropping"
 * - skipAngle: rotation angle (0 to 2*PI)
 * - leftHand, rightHand: { x, y }
 * - isBehind: boolean (for 3D depth layering around character)
 */
export const JumpRope = ({
  ropePhase = "floor",
  skipAngle = 0,
  leftHand = { x: 70, y: 310 },
  rightHand = { x: 170, y: 310 },
  isBehind = false,
}) => {
  const renderHandle = (hand, angleDeg) => (
    <g transform={`translate(${hand.x}, ${hand.y}) rotate(${angleDeg})`}>
      <rect
        x="-6"
        y="-5"
        width="24"
        height="10"
        rx="3.5"
        fill="#EF4444"
        stroke="#000000"
        strokeWidth="3.5"
      />
      <line x1="2" y1="-5" x2="2" y2="5" stroke="#000000" strokeWidth="2" />
      <line x1="10" y1="-5" x2="10" y2="5" stroke="#000000" strokeWidth="2" />
    </g>
  );

  const midX = (leftHand.x + rightHand.x) / 2;
  const midY = (leftHand.y + rightHand.y) / 2;

  // 1. Resting on floor
  if (ropePhase === "floor") {
    if (isBehind) return null;
    return (
      <g id="jump-rope-resting">
        <ellipse cx="120" cy="514" rx="68" ry="6" fill="#000000" opacity="0.25" />
        <path d="M 65 506 Q 90 514 120 514 Q 150 514 175 506" fill="none" stroke="#000000" strokeWidth="6.5" strokeLinecap="round" />
        <g transform="translate(52, 502) rotate(-15)">
          <rect x="0" y="0" width="26" height="11" rx="4" fill="#EF4444" stroke="#000000" strokeWidth="3.5" />
          <line x1="8" y1="0" x2="8" y2="11" stroke="#000000" strokeWidth="2" />
          <line x1="16" y1="0" x2="16" y2="11" stroke="#000000" strokeWidth="2" />
        </g>
        <g transform="translate(162, 500) rotate(15)">
          <rect x="0" y="0" width="26" height="11" rx="4" fill="#EF4444" stroke="#000000" strokeWidth="3.5" />
          <line x1="8" y1="0" x2="8" y2="11" stroke="#000000" strokeWidth="2" />
          <line x1="16" y1="0" x2="16" y2="11" stroke="#000000" strokeWidth="2" />
        </g>
      </g>
    );
  }

  // 2. Pickup
  if (ropePhase === "pickup") {
    if (isBehind) return null;
    const bottomY = Math.min(514, midY + 160);
    return (
      <g id="jump-rope-pickup">
        <path d={`M ${leftHand.x} ${leftHand.y} Q ${midX} ${bottomY} ${rightHand.x} ${rightHand.y}`} fill="none" stroke="#000000" strokeWidth="6.5" strokeLinecap="round" />
        {renderHandle(leftHand, 45)}
        {renderHandle(rightHand, -45)}
      </g>
    );
  }

  // 3. Held
  if (ropePhase === "held") {
    if (isBehind) return null;
    return (
      <g id="jump-rope-held">
        <path d={`M ${leftHand.x} ${leftHand.y} Q ${midX} 460 ${rightHand.x} ${rightHand.y}`} fill="none" stroke="#000000" strokeWidth="6.5" strokeLinecap="round" />
        {renderHandle(leftHand, 30)}
        {renderHandle(rightHand, -30)}
      </g>
    );
  }

  // 4. Dropping
  if (ropePhase === "dropping") {
    if (isBehind) return null;
    return (
      <g id="jump-rope-dropping">
        <ellipse cx="120" cy="514" rx="68" ry="6" fill="#000000" opacity="0.25" />
        <path d={`M ${leftHand.x} ${leftHand.y} Q ${midX} 514 ${rightHand.x} ${rightHand.y}`} fill="none" stroke="#000000" strokeWidth="6.5" strokeLinecap="round" />
        {renderHandle(leftHand, 45)}
        {renderHandle(rightHand, -45)}
      </g>
    );
  }

  // 5. Skipping
  const elev = -Math.cos(skipAngle);
  const depthZ = Math.sin(skipAngle);
  const ropeIsBehind = depthZ < -0.08;

  if (isBehind !== ropeIsBehind) {
    if (!isBehind) {
      const leftAngle = elev < 0 ? -110 : 35;
      const rightAngle = elev < 0 ? -70 : -35;
      return (
        <g id="jump-rope-handles-only">
          {renderHandle(leftHand, leftAngle)}
          {renderHandle(rightHand, rightAngle)}
        </g>
      );
    }
    return null;
  }

  let apexY;
  if (elev < 0) {
    apexY = midY - 335 * -elev;
  } else {
    apexY = midY + 225 * elev;
  }

  const flareX = 45 * Math.abs(elev) + 20;
  const dy = apexY - midY;
  const cp1X = leftHand.x - flareX;
  const cp1Y = leftHand.y + dy * 0.35;
  const cp2X = midX - 55;
  const cp2Y = apexY;
  const cp3X = midX + 55;
  const cp3Y = apexY;
  const cp4X = rightHand.x + flareX;
  const cp4Y = rightHand.y + dy * 0.35;

  const ropePath = `M ${leftHand.x} ${leftHand.y} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${midX} ${apexY} C ${cp3X} ${cp3Y}, ${cp4X} ${cp4Y}, ${rightHand.x} ${rightHand.y}`;
  const leftAngle = elev < 0 ? -110 : 35;
  const rightAngle = elev < 0 ? -70 : -35;

  return (
    <g id={isBehind ? "jump-rope-behind" : "jump-rope-front"}>
      {!isBehind && elev > 0.75 && (
        <ellipse cx={midX} cy="516" rx="65" ry="5" fill="#000000" opacity="0.32" />
      )}
      <path d={ropePath} fill="none" stroke="#000000" strokeWidth="6.5" strokeLinecap="round" />
      {!isBehind && renderHandle(leftHand, leftAngle)}
      {!isBehind && renderHandle(rightHand, rightAngle)}
    </g>
  );
};
