// Video Composition Configuration (Active Manual Build)

export const SCENES = [
  {
    id: "Scene01-HookDepressiveConcept",
    name: "Scene 01: Hook - Depressive Concept",
    from: 0,
    durationInFrames: 120, // 4 seconds @ 30fps
  },
  {
    id: "Scene02-BiologicalMalfunctionSplit",
    name: "Scene 02: Biological Malfunction blueprint",
    from: 120,
    durationInFrames: 180, // 6 seconds (extended by 2s) @ 30fps
  },
  {
    id: "Scene03-DiseaseCoveredStickman",
    name: "Scene 03: Stickman Covered with Disease",
    from: 300,
    durationInFrames: 60, // 2 seconds @ 30fps (cut in half)
  },
  {
    id: "Scene04-SpectrumTenXMarksToBrain",
    name: "Scene 04: Digital Spectrum & Brain Connection",
    from: 360,
    durationInFrames: 150, // 5 seconds @ 30fps
  },
  {
    id: "Scene05-ZoomBrokenNeuronToWrongPill",
    name: "Scene 05: Zoom Broken Neuron to Wrong Pill",
    from: 510,
    durationInFrames: 120, // 4 seconds @ 30fps (cut by 1s per user request)
  },
  {
    id: "Scene06-PillsIntoContainer",
    name: "Scene 06: Pills Zoom Out & Funnel Into Container",
    from: 630,
    durationInFrames: 90, // 3.0 seconds @ 30fps (finishes at exactly 24.0 seconds / frame 720)
  },
  {
    id: "Scene07-StickmanGoesCrazy",
    name: "Scene 07: Stickman Goes Crazy",
    from: 720,
    durationInFrames: 90, // 3.0 seconds @ 30fps
  },
  {
    id: "Scene08-MagnifyingGlassNeurons",
    name: "Scene 08: Magnifying Glass Over Neurons",
    from: 810,
    durationInFrames: 90, // 3.0 seconds @ 30fps
  },
  {
    id: "Scene09-DepressionTypesWheel",
    name: "Scene 09: 10 Types of Depression Wheel",
    from: 900,
    durationInFrames: 120, // 4.0 seconds @ 30fps
  },
];

export const TOTAL_DURATION_IN_FRAMES = 7066; // Total audio duration (235.55s @ 30fps)
