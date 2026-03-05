"use client";
import { useEffect, useRef } from "react";

const PIXELS_PER_STAR = 8000;
const STAR_CREATION_BUFFER = 200;

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  twinkleAmplitude: number;
}

function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

function getStarCountForArea(area: number) {
  return Math.floor(area / PIXELS_PER_STAR);
}

function createStar(width: number, height: number): Star {
  const isBright = Math.random() < 0.08;
  const twinkles = Math.random() < (isBright ? 0.85 : 0.3);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: isBright ? 1.2 + Math.random() * 0.8 : 0.5 + Math.random() * 0.6,
    baseOpacity: isBright
      ? 0.7 + Math.random() * 0.3
      : 0.2 + Math.random() * 0.35,
    twinklePhase: Math.random() * Math.PI * 2,
    // twinkleSpeed: twinkles ? 0.3 + Math.random() * 1.2 : 0,
    // twinkleAmplitude: twinkles ? 0.1 + Math.random() * 0.25 : 0,
    twinkleSpeed: twinkles ? 1.0 + Math.random() * 2.0 : 0,
    twinkleAmplitude: twinkles ? 0.18 + Math.random() * 0.28 : 0,
  };
}

function createStars(
  width: number,
  height: number,
  numberOfStars: number,
): Star[] {
  return Array.from({ length: numberOfStars }, () => {
    return createStar(width, height);
  });
}

function createStarInRect(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Star {
  const width = x1 - x0;
  const height = y1 - y0;
  const s = createStar(1, 1);
  return {
    ...s,
    x: x0 + Math.random() * width,
    y: y0 + Math.random() * height,
  };
}

export default function StarryNight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    //#region Star Creation
    let stars: Star[] = [];
    //max width and height user has expanded to thus far
    let seenWidth = 0;
    let seenHeight = 0;
    //Number of stars for the initial window size
    const originalStarCount = getStarCountForArea(
      window.innerWidth * window.innerHeight,
    );

    const onResizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      //Create stars for initial canvas
      if (seenWidth === 0 && seenHeight === 0) {
        stars = createStars(canvas.width, canvas.height, originalStarCount);
        if (seenWidth < width) seenWidth = width;
        if (seenHeight < height) seenHeight = height;
      }
      //Only creates more stars when sizing the window larger to fill the void
      else if (width > seenWidth || height > seenHeight) {
        //Create new stars in batches beyond visible width/height
        const targetWidth = width + STAR_CREATION_BUFFER;
        const targetHeight = height + STAR_CREATION_BUFFER;

        let newHorizArea = 0;
        let newVertArea = 0;

        if (targetWidth > seenWidth)
          newHorizArea += (targetWidth - seenWidth) * seenHeight;
        if (targetHeight > seenHeight)
          newVertArea += targetWidth * (targetHeight - seenHeight);

        const addedArea = newHorizArea + newVertArea;
        const toAdd = getStarCountForArea(addedArea);

        for (let i = 0; i < toAdd; i++) {
          // choose horizontal strip vs vertical strip, weighted by area
          const pick = Math.random() * addedArea;
          if (pick < newHorizArea)
            stars.push(createStarInRect(seenWidth, 0, targetWidth, seenHeight));
          else
            stars.push(
              createStarInRect(0, seenHeight, targetWidth, targetHeight),
            );
        }
        if (seenWidth < targetWidth) seenWidth = targetWidth;
        if (seenHeight < targetHeight) seenHeight = targetHeight;
      }
    };

    onResizeCanvas();
    window.addEventListener("resize", onResizeCanvas);
    //#endregion

    //#region Dark Mode Check
    let dark = isDarkMode();
    const observer = new MutationObserver(() => {
      dark = isDarkMode();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    //#endregion

    //#region Stars Toggle
    let starsEnabled = true;
    const onStarsToggle = (e: Event) => {
      starsEnabled = (e as CustomEvent<boolean>).detail;
    };
    window.addEventListener("stars-visibility-changed", onStarsToggle);
    //#endregion

    //#region Draw Stars on Canvas
    let reqAnimFrameId: number;
    const animate = (timeElapsed: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (dark && starsEnabled) {
        const secondsElapsed = timeElapsed / 1000;
        for (const s of stars) {
          const twinkle =
            s.twinkleSpeed > 0
              ? Math.sin(secondsElapsed * s.twinkleSpeed + s.twinklePhase) *
                s.twinkleAmplitude
              : 0;
          const opacity = Math.max(0, Math.min(1, s.baseOpacity + twinkle));
          ctx.beginPath();
          //stars represented by circles
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }

      reqAnimFrameId = requestAnimationFrame(animate);
    };

    reqAnimFrameId = requestAnimationFrame(animate);
    //#endregion

    return () => {
      cancelAnimationFrame(reqAnimFrameId);
      window.removeEventListener("resize", onResizeCanvas);
      window.removeEventListener("stars-visibility-changed", onStarsToggle);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
}
