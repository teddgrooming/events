import { AbsoluteFill, Img, interpolate, staticFile, Sequence, useCurrentFrame, Easing } from "remotion";
import { products, ShowcaseProduct } from "./products";

const BACKGROUND = "#080808";

export const SLIDE_DURATION = 75; // 2.5s @ 30fps
export const SHOWCASE_DURATION = products.length * SLIDE_DURATION;

export const HIGHLIGHT_SLIDE_DURATION = 60; // 2s @ 30fps, punchier pacing
export const highlightProductIds = ["classic-pomade", "styling-clay", "fixing-pomade-parfum", "hair-spray"];
export const highlightProducts = highlightProductIds.map(
  (id) => products.find((product) => product.id === id)!,
);
export const HIGHLIGHT_DURATION = highlightProducts.length * HIGHLIGHT_SLIDE_DURATION;

const ProductSlide: React.FC<{ product: ShowcaseProduct; slideDuration: number }> = ({
  product,
  slideDuration,
}) => {
  const frame = useCurrentFrame();
  const fadeFrames = Math.min(15, Math.floor(slideDuration / 4));

  const opacity = interpolate(
    frame,
    [0, fadeFrames, slideDuration - fadeFrames, slideDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) },
  );

  const imageRise = interpolate(frame, [0, 20], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const barWidth = interpolate(frame, [15, 30], [0, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BACKGROUND,
        opacity,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 45%, ${product.accent}33, transparent 60%)`,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", translate: `0px ${imageRise}px` }}>
        <Img
          src={staticFile(product.image)}
          style={{ width: 320, height: 320, objectFit: "contain" }}
        />
        <div
          style={{
            marginTop: 28,
            height: 3,
            width: barWidth,
            backgroundColor: product.accent,
          }}
        />
        <div
          style={{
            marginTop: 20,
            fontFamily: "Georgia, serif",
            fontSize: 40,
            color: "#eeeeee",
            letterSpacing: 1,
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: "Georgia, serif",
            fontSize: 18,
            letterSpacing: 2,
            color: product.accent,
            textTransform: "uppercase",
          }}
        >
          {product.meta}
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: "Georgia, serif",
            fontSize: 14,
            letterSpacing: 1,
            color: "#888888",
          }}
        >
          {product.scent}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ProductCycle: React.FC<{ items: ShowcaseProduct[]; slideDuration: number }> = ({
  items,
  slideDuration,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: BACKGROUND }}>
      {items.map((product, index) => (
        <Sequence
          key={product.id}
          from={index * slideDuration}
          durationInFrames={slideDuration}
          layout="none"
        >
          <ProductSlide product={product} slideDuration={slideDuration} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const ProductShowcase: React.FC = () => (
  <ProductCycle items={products} slideDuration={SLIDE_DURATION} />
);

export const ProductShowcaseHighlight: React.FC = () => (
  <ProductCycle items={highlightProducts} slideDuration={HIGHLIGHT_SLIDE_DURATION} />
);
