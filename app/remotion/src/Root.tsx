import "./index.css";
import { Composition, Still } from "remotion";
import { OriginEnd, OriginTitle, ProgressStill, ShadePlatesStill, ChapterStill, WatermarkStill } from "./TeddOrigin";
import { LogoSting } from "./LogoSting";
import { ProductShowcase, ProductShowcaseHighlight, SHOWCASE_DURATION, HIGHLIGHT_DURATION } from "./ProductShowcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LogoSting"
        component={LogoSting}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ProductShowcase"
        component={ProductShowcase}
        durationInFrames={SHOWCASE_DURATION}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ProductShowcaseHighlight"
        component={ProductShowcaseHighlight}
        durationInFrames={HIGHLIGHT_DURATION}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="OriginTitle"
        component={OriginTitle}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ kicker: "THE STORY OF", title: "ORIGIN", tagline: "" }}
      />
      <Composition
        id="OriginEnd"
        component={OriginEnd}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ headline: "", cta: "FOLLOW FOR MORE", handle: "@teddgrooming", url: "teddgrooming.com" }}
      />
      <Still id="OriginWatermark" component={WatermarkStill} width={300} height={300} />
      <Still id="OriginProgress" component={ProgressStill} width={1080} height={12} />
      <Still id="OriginChapter" component={ChapterStill} width={1080} height={1920} defaultProps={{ number: "01", label: "" }} />
      <Still id="OriginShade" component={ShadePlatesStill} width={1080} height={1920} />
    </>
  );
};
