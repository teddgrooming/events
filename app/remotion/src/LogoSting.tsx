import { ding, whoosh } from "@remotion/sfx";
import { AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";

const GOLD = "#c8a84b";
const GOLD_LIGHT = "#f5e2a8";
const GOLD_DARK = "#8a6a1f";
const BACKGROUND = "#080808";

export const LogoSting: React.FC = () => {
  const frame = useCurrentFrame();

  // Gold wipe bar sweeps left to right across frames 0-55 (slower).
  const wipeX = interpolate(frame, [0, 55], [-20, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  // Logo reveal follows just behind the wipe's leading edge.
  const revealX = interpolate(frame, [0, 55], [-20, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  // Shine highlight shimmers within the gold bar as it travels.
  const shineOffset = interpolate(frame, [0, 55], [-40, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sparkle pulse near the wipe's leading edge.
  const sparkleOpacity = interpolate(frame % 6, [0, 3, 6], [0.3, 1, 0.3]);

  // Tagline fades in after the reveal settles, then everything fades out at the end.
  const taglineOpacity = interpolate(frame, [60, 75, 150, 170], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const taglineRise = interpolate(frame, [60, 75], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const fadeOut = interpolate(frame, [170, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BACKGROUND, opacity: fadeOut }}>
      <Audio src={whoosh} volume={0.8} />
      <Audio src={ding} startFrom={55} volume={0.6} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              clipPath: `inset(0 ${100 - revealX}% 0 0)`,
            }}
          >
            <Img src={staticFile("logo.png")} style={{ width: 280, height: 280, objectFit: "contain" }} />
          </div>

          <div
            style={{
              marginTop: 22,
              fontFamily: "Georgia, serif",
              fontSize: 22,
              letterSpacing: 4,
              color: GOLD_LIGHT,
              opacity: taglineOpacity,
              translate: `0px ${taglineRise}px`,
            }}
          >
            GROOMED. SHARP. READY.
          </div>
        </div>
      </AbsoluteFill>

      {/* Gold wipe bar with metallic shine */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${wipeX}%`,
          width: 90,
          overflow: "hidden",
          transform: "translateX(-50%) skewX(-10deg)",
          boxShadow: `0 0 100px 30px ${GOLD}, 0 0 40px 10px ${GOLD_LIGHT}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, ${GOLD_DARK} 0%, ${GOLD} 30%, ${GOLD_LIGHT} 50%, ${GOLD} 70%, ${GOLD_DARK} 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${shineOffset}%`,
            width: 20,
            background: `linear-gradient(90deg, transparent, ${GOLD_LIGHT}, white, ${GOLD_LIGHT}, transparent)`,
            opacity: 0.9,
          }}
        />
      </div>

      {/* Leading-edge sparkle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${wipeX}%`,
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: sparkleOpacity,
          boxShadow: `0 0 30px 10px ${GOLD_LIGHT}`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </AbsoluteFill>
  );
};
