import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { SCENES } from "./scenes.config";
import { SCENE_COMPONENTS } from "./scenes";

export const EverythingCurated = ({
  isMaster = false,
  sceneId,
  frameOffset,
}) => {
  const currentFrame = useCurrentFrame();

  // If previewing a specific scene in isolation (via Studio sidebar)
  if (sceneId) {
    const Component = SCENE_COMPONENTS[sceneId];
    if (Component) {
      return (
        <AbsoluteFill>
          <Component />
        </AbsoluteFill>
      );
    }
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "#0F172A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          color: "#94A3B8",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#38BDF8", marginBottom: 12 }}>
            {sceneId} (In Queue)
          </div>
          <div style={{ fontSize: 18 }}>
            Building sequentially per production plan
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // If no scenes yet (ready for new video)
  if (SCENES.length === 0) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "#0F172A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Audio src={staticFile("Generated Audio September 15, 2026 - 1_01AM.wav")} />
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#38BDF8",
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            EVERYTHING CURATED
          </div>
          <div
            style={{
              color: "#94A3B8",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Ready for New Video • Provide scene descriptions to begin
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // Master timeline sequence playback (plays all scenes continuously)
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        translate: "-4px 0px",
      }}
    >
      <Audio src={staticFile("Generated Audio September 15, 2026 - 1_01AM.wav")} />
      {SCENES.map((scene) => {
        const SceneComponent = SCENE_COMPONENTS[scene.id];
        if (!SceneComponent) return null;

        return (
          <Sequence
            key={scene.id}
            from={scene.from}
            durationInFrames={scene.durationInFrames}
            name={scene.name}
          >
            <SceneComponent />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
