import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

// Graphics for the "TEDD ORIGIN" CapCut edit (1080x1920). Rendered to MP4/PNG and placed in the CapCut draft.
const GOLD = "#c8a84b";
const GOLD_LIGHT = "#f5e2a8";
const BACKGROUND = "#080808";

const fontFaces = `
@font-face { font-family: 'Oswald'; font-weight: 300; src: url('${staticFile("fonts/Oswald_300Light.ttf")}'); }
@font-face { font-family: 'Oswald'; font-weight: 500; src: url('${staticFile("fonts/Oswald_500Medium.ttf")}'); }
@font-face { font-family: 'Oswald'; font-weight: 700; src: url('${staticFile("fonts/Oswald_700Bold.ttf")}'); }
@font-face { font-family: 'Inter'; font-weight: 400; src: url('${staticFile("fonts/Inter_400Regular.ttf")}'); }
@font-face { font-family: 'Inter'; font-weight: 600; src: url('${staticFile("fonts/Inter_600SemiBold.ttf")}'); }
`;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.65, 0, 0.35, 1);

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "screen" }}>
      <svg width="100%" height="100%">
        <filter id="n">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={frame % 12} />
        </filter>
        <rect width="100%" height="100%" filter="url(#n)" />
      </svg>
    </AbsoluteFill>
  );
};

export type OriginTitleProps = { kicker: string; title: string; tagline: string };

// 3s title card: gold rules draw out, logo wipes in, "THE ORIGIN" tracks out, tagline rises.
export const OriginTitle: React.FC<OriginTitleProps> = ({ kicker, title, tagline }) => {
  const frame = useCurrentFrame();
  const rule = interpolate(frame, [0, 22], [0, 1], { ...clamp, easing: ease });
  const reveal = interpolate(frame, [6, 34], [0, 100], { ...clamp, easing: ease });
  const logoScale = interpolate(frame, [6, 90], [1.12, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const tracking = interpolate(frame, [18, 90], [0.2, 0.62], { ...clamp, easing: Easing.out(Easing.cubic) });
  const titleOpacity = interpolate(frame, [18, 30], [0, 1], clamp);
  const tagOpacity = interpolate(frame, [36, 50], [0, 1], clamp);
  const tagRise = interpolate(frame, [36, 50], [24, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const glow = interpolate(frame, [0, 40, 90], [0, 1, 0.75], clamp);
  const shine = interpolate(frame, [10, 50], [-60, 160], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: BACKGROUND, alignItems: "center", justifyContent: "center" }}>
      <style>{fontFaces}</style>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 46%, rgba(200,168,75,${0.22 * glow}) 0%, rgba(8,8,8,0) 55%)`,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
        <div style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 30, letterSpacing: "0.5em", color: GOLD, opacity: titleOpacity }}>
          {kicker}
        </div>
        <div style={{ width: 620 * rule, height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        <div style={{ position: "relative", clipPath: `inset(0 ${100 - reveal}% 0 0)`, transform: `scale(${logoScale})` }}>
          <Img src={staticFile("logo.png")} style={{ width: 640, height: 640, objectFit: "contain" }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(105deg, transparent ${shine - 20}%, rgba(245,226,168,0.55) ${shine}%, transparent ${shine + 20}%)`,
              mixBlendMode: "overlay",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "Oswald",
            fontWeight: 700,
            fontSize: 132,
            color: GOLD_LIGHT,
            letterSpacing: `${tracking}em`,
            marginRight: `-${tracking}em`,
            opacity: titleOpacity,
            textShadow: "0 6px 30px rgba(200,168,75,0.35)",
          }}
        >
          {title}
        </div>
        <div style={{ width: 620 * rule, height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: 40,
            color: "#e9e4d6",
            opacity: tagOpacity,
            transform: `translateY(${tagRise}px)`,
            textAlign: "center",
            maxWidth: 860,
            lineHeight: 1.35,
          }}
        >
          {tagline}
        </div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
};

export type OriginEndProps = { headline: string; cta: string; handle: string; url: string };

// 6s end card: logo settles, headline, CTA pill pulses, handle + url.
export const OriginEnd: React.FC<OriginEndProps> = ({ headline, cta, handle, url }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 14], [0, 1], clamp);
  const logoY = interpolate(frame, [0, 30], [60, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const headOpacity = interpolate(frame, [16, 30], [0, 1], clamp);
  const ctaIn = interpolate(frame, [30, 44], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
  const pulse = 1 + 0.035 * Math.sin((frame - 44) / 6) * (frame > 44 ? 1 : 0);
  const footOpacity = interpolate(frame, [44, 58], [0, 1], clamp);
  const fadeOut = interpolate(frame, [165, 180], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: BACKGROUND, alignItems: "center", justifyContent: "center", opacity: fadeIn * fadeOut }}>
      <style>{fontFaces}</style>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, rgba(200,168,75,0.18) 0%, rgba(8,8,8,0) 60%)" }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, transform: `translateY(${logoY}px)` }}>
        <Img src={staticFile("logo.png")} style={{ width: 560, height: 560, objectFit: "contain" }} />
        <div
          style={{
            fontFamily: "Oswald",
            fontWeight: 500,
            fontSize: 76,
            color: "#f4efe2",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 900,
            opacity: headOpacity,
            textTransform: "uppercase",
          }}
        >
          {headline}
        </div>
        <div
          style={{
            transform: `scale(${ctaIn * pulse})`,
            background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
            color: BACKGROUND,
            fontFamily: "Oswald",
            fontWeight: 700,
            fontSize: 54,
            padding: "26px 64px",
            borderRadius: 999,
            letterSpacing: "0.06em",
            boxShadow: "0 12px 50px rgba(200,168,75,0.35)",
          }}
        >
          {cta}
        </div>
        <div style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 40, color: GOLD, opacity: footOpacity, letterSpacing: "0.04em" }}>
          {handle}
        </div>
        <div style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 34, color: "#a9a493", opacity: footOpacity, marginTop: -24 }}>{url}</div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
};

// ---- Transparent stills (rendered as PNG and animated with CapCut keyframes)

export const WatermarkStill: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", backgroundColor: "transparent" }}>
    <Img src={staticFile("logo.png")} style={{ width: 300, height: 300, objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }} />
  </AbsoluteFill>
);

// Full-width gold bar; CapCut scales it on X to show progress.
export const ProgressStill: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "transparent" }}>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
        boxShadow: `0 0 12px ${GOLD}`,
      }}
    />
  </AbsoluteFill>
);

export type ChapterProps = { number: string; label: string };

// Chapter card: number + label on a dark gradient plate (full canvas, transparent elsewhere).
export const ChapterStill: React.FC<ChapterProps> = ({ number, label }) => (
  <AbsoluteFill style={{ backgroundColor: "transparent", justifyContent: "center", alignItems: "center" }}>
    <style>{fontFaces}</style>
    <div
      style={{
        width: "100%",
        padding: "60px 0",
        background: "linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,0.78) 22%, rgba(8,8,8,0.78) 78%, rgba(8,8,8,0) 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 32, letterSpacing: "0.5em", color: GOLD, marginRight: "-0.5em" }}>
        {number}
      </div>
      <div style={{ width: 120, height: 3, background: GOLD }} />
      <div
        style={{
          fontFamily: "Oswald",
          fontWeight: 700,
          fontSize: 104,
          color: "#f6f1e4",
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.05,
          maxWidth: 940,
          textShadow: "0 6px 24px rgba(0,0,0,0.6)",
        }}
      >
        {label}
      </div>
    </div>
  </AbsoluteFill>
);

// Soft dark gradient behind the top hook text, plus a bottom gradient to keep captions readable.
export const ShadePlatesStill: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "transparent" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 560, background: "linear-gradient(180deg, rgba(0,0,0,0.72), rgba(0,0,0,0))" }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 760, background: "linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0))" }} />
  </AbsoluteFill>
);
