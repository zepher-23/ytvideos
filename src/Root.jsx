import "./index.css";
import { Composition, Folder, Still } from "remotion";
import { GSD } from "./gsd";
import { GSDShort } from "./gsd/shorts";
import { GSDShortVertical } from "./gsd/shorts/GSDShortVertical";
import gsdData from "./gsd/data.json";
import { EverythingCurated } from "./everything-curated";
import { SCENES, TOTAL_DURATION_IN_FRAMES } from "./everything-curated/scenes.config";
import { Cognify } from "./cognify";
import { Synthesized } from "./synthesized";
import { TheArchive } from "./the-archive";

export const RemotionRoot = () => {
  const gsdDuration = Math.max(1, (gsdData.length - 1) * 120);
  const gsdShortsDuration = 3600; // Exactly 2 minutes (120s at 30fps, slowed down timeline)

  return (
    <>
      {/* 1. GSD Channel */}
      <Folder name="GSD-Channel">
        {/* Full 16:9 Landscape Video */}
        <Composition
          id="Top-10-Richest-Individuals-Adjusted-To-Inflation"
          component={GSD}
          durationInFrames={gsdDuration}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            framesPerYear: 120,
          }}
          calculateMetadata={() => ({
            defaultOutName: "GSD-Channel/normal/Top-10-Richest-Individuals-Adjusted-To-Inflation",
          })}
        />

        {/* 9:16 Vertical YouTube Shorts */}
        <Folder name="Shorts">
          <Composition
            id="Top-10-Richest-Individuals-Shorts-Vertical"
            component={GSDShortVertical}
            durationInFrames={gsdShortsDuration}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{
              framesPerYear: 28,
            }}
            calculateMetadata={() => ({
              defaultOutName: "GSD-Channel/shorts/Top-10-Richest-Shorts",
            })}
          />
        </Folder>

        {/* Stills / Thumbnails / Posters */}
        <Folder name="Stills">
          <Still
            id="Top-10-Richest-Still-Landscape"
            component={GSD}
            width={1920}
            height={1080}
            defaultProps={{
              framesPerYear: 120,
            }}
            calculateMetadata={() => ({
              defaultOutName: "GSD-Channel/stills/Top-10-Richest-Still-Landscape",
            })}
          />
          <Still
            id="Top-10-Richest-Still-Vertical"
            component={GSDShortVertical}
            width={1080}
            height={1920}
            defaultProps={{
              framesPerYear: 28,
            }}
            calculateMetadata={() => ({
              defaultOutName: "GSD-Channel/stills/Top-10-Richest-Still-Vertical",
            })}
          />
        </Folder>
      </Folder>

      {/* 2. Everything Curated */}
      <Folder name="Everything-Curated">
        {/* Full Master Video */}
        <Composition
          id="everything-curated"
          component={EverythingCurated}
          durationInFrames={TOTAL_DURATION_IN_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            isMaster: true,
          }}
          calculateMetadata={() => ({
            defaultOutName: "Everything-Curated/normal/everything-curated",
          })}
        />

        {/* Individual Isolated Scene Compositions (Click in Studio sidebar to preview any scene alone!) */}
        <Folder name="Scenes">
          {SCENES.map((scene) => (
            <Composition
              key={scene.id}
              id={scene.id}
              component={EverythingCurated}
              durationInFrames={scene.durationInFrames}
              fps={30}
              width={1920}
              height={1080}
              defaultProps={{
                sceneId: scene.id,
                frameOffset: scene.from,
              }}
              calculateMetadata={() => ({
                defaultOutName: `Everything-Curated/scenes/${scene.id}`,
              })}
            />
          ))}
        </Folder>

        <Folder name="Stills">
          <Still
            id="everything-curated-still"
            component={EverythingCurated}
            width={1920}
            height={1080}
            calculateMetadata={() => ({
              defaultOutName: "Everything-Curated/stills/everything-curated-still",
            })}
          />
        </Folder>
      </Folder>

      {/* 3. Cognify - AI, Neuroscience & Mental Models */}
      <Folder name="Cognify">
        <Composition
          id="cognify"
          component={Cognify}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            topic: "COGNITIVE ARCHITECTURES",
            headline: "How Neural Models Redefine Thought",
            tagline: "Neuroscience • Artificial Intelligence • Mental Frameworks",
            glowColor: "#6366F1",
          }}
          calculateMetadata={() => ({
            defaultOutName: "Cognify/normal/cognify",
          })}
        />
        <Folder name="Stills">
          <Still
            id="cognify-still"
            component={Cognify}
            width={1920}
            height={1080}
            defaultProps={{
              topic: "COGNITIVE ARCHITECTURES",
              headline: "How Neural Models Redefine Thought",
              tagline: "Neuroscience • Artificial Intelligence • Mental Frameworks",
              glowColor: "#6366F1",
            }}
            calculateMetadata={() => ({
              defaultOutName: "Cognify/stills/cognify-still",
            })}
          />
        </Folder>
      </Folder>

      {/* 4. Synthesized - Audio Synthesis, Music & Future Systems */}
      <Folder name="Synthesized">
        <Composition
          id="synthesized"
          component={Synthesized}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            trackName: "FREQUENCY MODULATION",
            artistOrSeries: "SESSION // 088",
            bpm: "128 BPM",
            primaryColor: "#06B6D4",
            secondaryColor: "#F43F5E",
          }}
          calculateMetadata={() => ({
            defaultOutName: "Synthesized/normal/synthesized",
          })}
        />
        <Folder name="Stills">
          <Still
            id="synthesized-still"
            component={Synthesized}
            width={1920}
            height={1080}
            defaultProps={{
              trackName: "FREQUENCY MODULATION",
              artistOrSeries: "SESSION // 088",
              bpm: "128 BPM",
              primaryColor: "#06B6D4",
              secondaryColor: "#F43F5E",
            }}
            calculateMetadata={() => ({
              defaultOutName: "Synthesized/stills/synthesized-still",
            })}
          />
        </Folder>
      </Folder>

      {/* 5. The Archive - History, Deep Dives & Cinematic Chronicles */}
      <Folder name="The-Archive">
        <Composition
          id="the-archive"
          component={TheArchive}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            caseFile: "DOSSIER // 1974-B",
            title: "THE FORGOTTEN EXPEDITION",
            subtitle: "Declassified records of humanity's hidden chapters",
            accentColor: "#D97706",
          }}
          calculateMetadata={() => ({
            defaultOutName: "The-Archive/normal/the-archive",
          })}
        />
        <Folder name="Stills">
          <Still
            id="the-archive-still"
            component={TheArchive}
            width={1920}
            height={1080}
            defaultProps={{
              caseFile: "DOSSIER // 1974-B",
              title: "THE FORGOTTEN EXPEDITION",
              subtitle: "Declassified records of humanity's hidden chapters",
              accentColor: "#D97706",
            }}
            calculateMetadata={() => ({
              defaultOutName: "The-Archive/stills/the-archive-still",
            })}
          />
        </Folder>
      </Folder>
    </>
  );
};
