"use client";
import { useEffect, useRef } from "react";

const PIXELS_PER_STAR = 6000;
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

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number; // 0–1, current progress
  decay: number; // how fast it fades
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

function createShootingStar(width: number, height: number): ShootingStar {
  // Start from top half of screen, travel down-right at a shallow angle
  const angle = (15 + Math.random() * 25) * (Math.PI / 180);
  const speed = 10 + Math.random() * 12;
  return {
    x: Math.random() * width,
    y: Math.random() * height * 0.5,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    length: 50 + Math.random() * 120,
    opacity: 0.6 + Math.random() * 0.4,
    life: 0,
    decay: 0.012 + Math.random() * 0.01,
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
    const activeShootStars: ShootingStar[] = [];
    let nextShootStarSpawn = 0;
    let starAnimateId: number;

    const animateStars = (timeElapsed: number) => {
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

        // Spawn a new shooting star every 3–7 seconds
        if (timeElapsed >= nextShootStarSpawn) {
          activeShootStars.push(
            createShootingStar(canvas.width, canvas.height),
          );
          nextShootStarSpawn = timeElapsed + 6000 + Math.random() * 4000;
        }

        for (let i = activeShootStars.length - 1; i >= 0; i--) {
          const s = activeShootStars[i];
          s.life += s.decay;

          if (s.life >= 1) {
            activeShootStars.splice(i, 1);
            continue;
          }

          // Fade in quickly, linger, then fade out
          const alpha = s.opacity * Math.sin(s.life * Math.PI);

          const tailX = s.x - s.vx * (s.length / 10);
          const tailY = s.y - s.vy * (s.length / 10);

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          s.x += s.vx;
          s.y += s.vy;
        }
      }

      starAnimateId = requestAnimationFrame(animateStars);
    };

    starAnimateId = requestAnimationFrame(animateStars);
    //#endregion

    return () => {
      cancelAnimationFrame(starAnimateId);
      window.removeEventListener("resize", onResizeCanvas);
      window.removeEventListener("stars-visibility-changed", onStarsToggle);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
}
