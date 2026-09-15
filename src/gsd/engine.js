import data from "./data.json";
import { LAYOUT } from "./constants.js";

// Grid milestones and scale
export const MAX_WEALTH_SCALE = 100;
export const TOTAL_YEARS = data.length;

// Extract all unique billionaire names across the dataset
export const ALL_PEOPLE = [
  ...new Set(data.flatMap((d) => d.rankings.map((r) => r.name))),
];

// Map every person to their country_code
export const PERSON_COUNTRIES = {};
data.forEach((d) => {
  d.rankings.forEach((r) => {
    if (r.country_code) {
      PERSON_COUNTRIES[r.name] = r.country_code;
    }
  });
});

// Helper to extract the active wealth value from a ranking entry.
// Prioritizes wealth_adjusted_usd_billions (inflated), falling back to legacy wealth_usd_billions or nominal.
export const getRankingWealth = (ranking) => {
  if (!ranking) return 0;
  if (ranking.wealth_adjusted_usd_billions !== undefined) {
    return ranking.wealth_adjusted_usd_billions;
  }
  if (ranking.wealth_usd_billions !== undefined) {
    return ranking.wealth_usd_billions;
  }
  if (ranking.wealth_nominal_usd_billions !== undefined) {
    return ranking.wealth_nominal_usd_billions;
  }
  return 0;
};

// Precompute yearly wealth table for each person
const rawYearly = {};
for (const name of ALL_PEOPLE) {
  rawYearly[name] = new Array(TOTAL_YEARS).fill(null);
}

data.forEach((d, yIdx) => {
  d.rankings.forEach((r) => {
    rawYearly[r.name][yIdx] = getRankingWealth(r);
  });
});

// Dynamic slope resolver: guarantees numbers are NEVER static.
// If consecutive years have identical values, bridges the gap towards the next known value
// so that the rate of change is always active, continuous, and dynamic.
function resolvePlateaus(series) {
  const result = [...series];
  const n = result.length;

  let i = 0;
  while (i < n) {
    if (result[i] === null) {
      i++;
      continue;
    }
    let j = i;
    while (j < n && result[j] !== null) j++;

    // Contiguous active career segment from i to j-1
    let p = i;
    while (p < j - 1) {
      if (Math.abs(result[p] - result[p + 1]) < 1e-6) {
        // Flat plateau detected starting at index p
        let q = p + 1;
        while (q < j && Math.abs(result[q] - result[p]) < 1e-6) {
          q++;
        }
        // Identical values from index p through q-1
        const plateauVal = result[p];
        const prevVal = p > i ? result[p - 1] : null;
        const nextVal = q < j ? result[q] : null;

        if (prevVal !== null && nextVal !== null) {
          const totalSteps = q - p + 1;
          const totalDelta = nextVal - prevVal;
          if (Math.abs(totalDelta) > 1e-4) {
            // Smoothly bridge towards the next known value
            const stepDelta = totalDelta / totalSteps;
            for (let k = p; k < q; k++) {
              result[k] = prevVal + stepDelta * (k - p + 1);
            }
          } else {
            // prevVal == nextVal: natural peak or valley with slight asymmetry
            const isPeak = plateauVal >= prevVal;
            const sign = isPeak ? 1 : -1;
            const amp = Math.max(0.3, Math.abs(plateauVal - prevVal));
            const count = q - p;
            for (let k = p; k < q; k++) {
              const idx = k - p;
              const t = (idx + 0.5) / count;
              const curve = 4 * t * (1 - t) + (t - 0.5) * 0.15;
              result[k] = prevVal + sign * amp * curve;
            }
          }
        } else if (nextVal !== null) {
          // Plateau at start of career: ramp smoothly into nextVal
          const totalSteps = q - p + 1;
          const stepDelta = (nextVal - plateauVal) / totalSteps;
          const dir = Math.sign(stepDelta) || 1;
          const delta = Math.abs(stepDelta) > 0.05 ? stepDelta : dir * 0.3;
          for (let k = p; k < q; k++) {
            result[k] = plateauVal + delta * (k - p);
          }
        } else if (prevVal !== null) {
          // Plateau at end of career: continue previous momentum
          const prevSlope = plateauVal - prevVal;
          const dir = prevSlope !== 0 ? Math.sign(prevSlope) : 1;
          const delta = (Math.abs(prevSlope) > 0.05 ? Math.min(1.0, Math.abs(prevSlope)) : 0.4) * dir;
          for (let k = p; k < q; k++) {
            result[k] = result[k - 1] + delta;
          }
        }
        p = q;
      } else {
        p++;
      }
    }
    i = j;
  }
  return result;
}

const yearlyWealth = {};
for (const name of ALL_PEOPLE) {
  yearlyWealth[name] = resolvePlateaus(rawYearly[name]);
}

// For years where a person is not in top 10:
// Fill ONLY the single year immediately before entry or after exit
// with a value just below the 10th cutoff (cutoff * 0.9) to ensure smooth entry/exit.
const bufferedWealth = {};
for (const name of ALL_PEOPLE) {
  bufferedWealth[name] = [...yearlyWealth[name]];
}

for (const name of ALL_PEOPLE) {
  for (let y = 0; y < TOTAL_YEARS; y++) {
    if (yearlyWealth[name][y] === null) {
      const rank10 = data[y].rankings[9] || data[y].rankings[data[y].rankings.length - 1];
      const minCutoff = getRankingWealth(rank10);
      const wasInPrev = y > 0 && yearlyWealth[name][y - 1] !== null;
      const willBeInNext =
        y < TOTAL_YEARS - 1 && yearlyWealth[name][y + 1] !== null;
      if (wasInPrev || willBeInNext) {
        bufferedWealth[name][y] = minCutoff * 0.9;
      }
    }
  }
}

// Precompute monotonic cubic spline tangents for every person
// Uses the PCHIP (Piecewise Cubic Hermite Interpolating Polynomial) algorithm
// to guarantee 100% shape-preserving monotonicity, zero overshoot/undershoot, and continuous velocity
function computeMonotonicSpline(yArr) {
  const n = yArr.length;
  const tangents = new Array(n).fill(0);
  let i = 0;
  while (i < n) {
    if (yArr[i] === null) {
      i++;
      continue;
    }
    let j = i;
    while (j < n && yArr[j] !== null) j++;
    const len = j - i;
    if (len === 2) {
      const delta = yArr[i + 1] - yArr[i];
      tangents[i] = delta;
      tangents[i + 1] = delta;
    } else if (len > 2) {
      const deltas = new Array(len - 1);
      for (let k = 0; k < len - 1; k++) {
        deltas[k] = yArr[i + k + 1] - yArr[i + k];
      }
      const d = new Array(len).fill(0);

      // Interior points: harmonic mean of adjacent slopes
      for (let k = 1; k < len - 1; k++) {
        const d0 = deltas[k - 1];
        const d1 = deltas[k];
        if (d0 * d1 > 0) {
          // Both increasing or both decreasing: smooth monotonic harmonic mean
          d[k] = (2 * d0 * d1) / (d0 + d1);
        } else {
          // Local flat, peak, or valley: zero derivative
          d[k] = 0;
        }
      }

      // Left endpoint (shape-preserving one-sided)
      const dL = ((2 * 1 + 1) * deltas[0] - deltas[1]) / (1 + 1);
      if (dL * deltas[0] <= 0) {
        d[0] = 0;
      } else if (deltas[0] * deltas[1] <= 0 && Math.abs(dL) > Math.abs(3 * deltas[0])) {
        d[0] = 3 * deltas[0];
      } else {
        d[0] = dL;
      }

      // Right endpoint (shape-preserving one-sided)
      const mEnd = len - 2;
      const dR = ((2 * 1 + 1) * deltas[mEnd] - deltas[mEnd - 1]) / (1 + 1);
      if (dR * deltas[mEnd] <= 0) {
        d[len - 1] = 0;
      } else if (deltas[mEnd] * deltas[mEnd - 1] <= 0 && Math.abs(dR) > Math.abs(3 * deltas[mEnd])) {
        d[len - 1] = 3 * deltas[mEnd];
      } else {
        d[len - 1] = dR;
      }

      for (let k = 0; k < len; k++) {
        tangents[i + k] = d[k];
      }
    }
    i = j;
  }
  return tangents;
}

const personTangents = {};
for (const name of ALL_PEOPLE) {
  personTangents[name] = computeMonotonicSpline(bufferedWealth[name]);
}

// Hermite cubic basis evaluation for wealth
function evalHermite(y0, d0, y1, d1, p) {
  const p2 = p * p;
  const p3 = p2 * p;
  return (
    (2 * p3 - 3 * p2 + 1) * y0 +
    (p3 - 2 * p2 + p) * d0 +
    (-2 * p3 + 3 * p2) * y1 +
    (p3 - p2) * d1
  );
}

// Hermite cubic derivative evaluation for instantaneous velocity (Billions/Year)
function evalHermiteVelocity(y0, d0, y1, d1, p) {
  const p2 = p * p;
  return (
    (6 * p2 - 6 * p) * y0 +
    (3 * p2 - 4 * p + 1) * d0 +
    (-6 * p2 + 6 * p) * y1 +
    (3 * p2 - 2 * p) * d1
  );
}

// Build precomputed frame data for the video (default: 120 frames/year, 3600 frames total)
export function buildTimeline(framesPerYear = 120) {
  const totalFrames = (TOTAL_YEARS - 1) * framesPerYear;

  // 1. Instantaneous continuous wealth & velocity for each frame via Monotonic Cubic Spline
  const frameWealth = new Array(totalFrames);
  const frameVelocity = new Array(totalFrames);
  for (let f = 0; f < totalFrames; f++) {
    const floatYear = f / framesPerYear;
    const y1 = Math.floor(floatYear);
    const y2 = Math.min(TOTAL_YEARS - 1, y1 + 1);
    const p = floatYear - y1;
    const fw = {};
    const fv = {};
    for (let i = 0; i < ALL_PEOPLE.length; i++) {
      const name = ALL_PEOPLE[i];
      const w1 = bufferedWealth[name][y1];
      const w2 = bufferedWealth[name][y2];
      if (w1 !== null && w2 !== null) {
        const d1 = personTangents[name][y1];
        const d2 = personTangents[name][y2];
        fw[name] = evalHermite(w1, d1, w2, d2, p);
        fv[name] = evalHermiteVelocity(w1, d1, w2, d2, p);
      } else {
        fw[name] = w1 || w2 || null;
        fv[name] = 0;
      }
    }
    frameWealth[f] = fw;
    frameVelocity[f] = fv;
  }

  // 2. Exact integer ranks based strictly on instantaneous wealth
  const frameRanks = new Array(totalFrames);
  for (let f = 0; f < totalFrames; f++) {
    const fw = frameWealth[f];
    const active = ALL_PEOPLE.filter((name) => fw[name] !== null);
    active.sort((a, b) => fw[b] - fw[a]);
    const ranks = {};
    for (let i = 0; i < active.length; i++) {
      ranks[active[i]] = i + 1;
    }
    frameRanks[f] = ranks;
  }

  // 3. Smooth rank transitions using a Hann filter (radius K = 10 frames)
  // Perfectly smooth ease-in-out S-curve for overtakes centered at exact crossing frame
  const K = 10;
  const weights = [];
  for (let d = -K; d <= K; d++) {
    weights.push(0.5 * (1 + Math.cos((Math.PI * d) / K)));
  }

  const smoothedRanks = new Array(totalFrames);
  for (let f = 0; f < totalFrames; f++) {
    const sr = {};
    for (let i = 0; i < ALL_PEOPLE.length; i++) {
      const name = ALL_PEOPLE[i];
      if (frameWealth[f][name] === null) continue;
      let sum = 0;
      let wSum = 0;
      for (let d = -K; d <= K; d++) {
        const idx = Math.min(totalFrames - 1, Math.max(0, f + d));
        const r = frameRanks[idx][name];
        if (r !== undefined) {
          const w = weights[d + K];
          sum += r * w;
          wSum += w;
        }
      }
      sr[name] = wSum > 0 ? sum / wSum : 15;
    }
    smoothedRanks[f] = sr;
  }

  // 4. Compute continuous smoothed maximum wealth scale and dynamic adaptive gamma per frame
  // This allows the bar chart to dynamically scale so the leader always utilizes the full available chart width (1540px),
  // while dynamically adjusting the power exponent (gamma) so that Rank 10 remains consistently pinned
  // on the left side of the screen (~500px) without ever overlapping the Event Card (x = 1120px).
  const TARGET_RANK10_WIDTH = 500;
  const targetRatio = TARGET_RANK10_WIDTH / LAYOUT.MAX_BAR_WIDTH;

  const rawMaxWealth = new Array(totalFrames);
  const rawGamma = new Array(totalFrames);

  for (let f = 0; f < totalFrames; f++) {
    let maxW = 0;
    const fw = frameWealth[f];
    const activeWealths = [];
    for (let i = 0; i < ALL_PEOPLE.length; i++) {
      const name = ALL_PEOPLE[i];
      if (fw[name] !== null && fw[name] > 0) {
        if (fw[name] > maxW) {
          maxW = fw[name];
        }
        activeWealths.push(fw[name]);
      }
    }
    rawMaxWealth[f] = maxW;

    activeWealths.sort((a, b) => b - a);
    const topW = activeWealths[0] || 100;
    const rank10W = activeWealths[Math.min(9, activeWealths.length - 1)] || topW * 0.25;
    const ratio = Math.max(0.02, Math.min(0.95, rank10W / topW));
    const g = Math.log(targetRatio) / Math.log(ratio);
    rawGamma[f] = Math.max(0.40, Math.min(2.4, g));
  }

  const K_scale = 15;
  const scaleWeights = [];
  for (let d = -K_scale; d <= K_scale; d++) {
    scaleWeights.push(0.5 * (1 + Math.cos((Math.PI * d) / K_scale)));
  }

  const smoothedScale = new Array(totalFrames);
  for (let f = 0; f < totalFrames; f++) {
    let sum = 0;
    let wSum = 0;
    for (let d = -K_scale; d <= K_scale; d++) {
      const idx = Math.min(totalFrames - 1, Math.max(0, f + d));
      const w = scaleWeights[d + K_scale];
      sum += rawMaxWealth[idx] * w;
      wSum += w;
    }
    // Scale is guaranteed to be at least rawMaxWealth to prevent bars from exceeding max width
    smoothedScale[f] = Math.max(sum / wSum, rawMaxWealth[f]);
  }

  // Smooth gamma with a 1-second Hann window (K = 30) for organic, jitter-free transitions
  const K_gamma = 30;
  const gammaWeights = [];
  for (let d = -K_gamma; d <= K_gamma; d++) {
    gammaWeights.push(0.5 * (1 + Math.cos((Math.PI * d) / K_gamma)));
  }

  const smoothedGamma = new Array(totalFrames);
  for (let f = 0; f < totalFrames; f++) {
    let sum = 0;
    let wSum = 0;
    for (let d = -K_gamma; d <= K_gamma; d++) {
      const idx = Math.min(totalFrames - 1, Math.max(0, f + d));
      const w = gammaWeights[d + K_gamma];
      sum += rawGamma[idx] * w;
      wSum += w;
    }
    smoothedGamma[f] = sum / wSum;
  }

  // 5. Build final frame objects with wealth, visual position, velocity, and zIndex
  const timeline = new Array(totalFrames);
  for (let f = 0; f < totalFrames; f++) {
    const fw = frameWealth[f];
    const sr = smoothedRanks[f];
    const bars = [];

    for (let i = 0; i < ALL_PEOPLE.length; i++) {
      const name = ALL_PEOPLE[i];
      if (fw[name] === null) continue;

      const rank = sr[name];
      if (rank > 11.0) continue; // Out of view

      // Visual opacity for entering/exiting bars (smooth fade between rank 10.0 and 10.8)
      let opacity = 1;
      if (rank > 10.0) {
        opacity = Math.max(0, 1 - (rank - 10.0) / 0.8);
      }
      if (opacity <= 0.01) continue;

      // Visual velocity (slots/sec) for rock-solid zIndex layering
      const prevRank = f > 0 ? smoothedRanks[f - 1][name] || rank : rank;
      const nextRank =
        f < totalFrames - 1 ? smoothedRanks[f + 1][name] || rank : rank;
      const velocity = (prevRank - nextRank) * 15; // Positive = climbing UP; Negative = falling DOWN

      // Rock-solid hierarchical zIndex:
      // Climbing bars (> 0.05) get 1000s -> ALWAYS glide OVER
      // Falling bars (< -0.05) get 100s -> ALWAYS glide UNDER
      // Steady bars get 500s
      let zIndex = 500 + (10 - Math.round(rank)) * 10;
      if (velocity > 0.05) {
        zIndex = 1000 + Math.round(velocity * 100) + (10 - Math.round(rank));
      } else if (velocity < -0.05) {
        zIndex = 100 + (10 - Math.round(rank));
      }

      const displayedRank = Math.min(10, Math.max(1, Math.round(rank)));
      const isLeader = displayedRank === 1;

      bars.push({
        name,
        country_code: PERSON_COUNTRIES[name] || "US",
        rank,
        wealth: fw[name],
        wealthVelocity: frameVelocity[f][name] || 0,
        opacity,
        zIndex,
        displayedRank,
        isLeader,
      });
    }

    bars.maxScale = smoothedScale[f];
    bars.gamma = smoothedGamma[f];
    timeline[f] = bars;
  }

  return timeline;
}

