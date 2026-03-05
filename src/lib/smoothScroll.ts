const DEFAULT_SCROLL_DURATION = 900;

// #region Easing functions for scroll animation style from https://easings.net/
function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
// #endregion

export function smoothScrollToElement(
  element: HTMLElement,
  duration = DEFAULT_SCROLL_DURATION,
) {
  const scrollMargin =
    parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  const targetY =
    element.getBoundingClientRect().top + window.scrollY - scrollMargin;
  smoothScroll(targetY, duration);
}

export function smoothScroll(
  targetPosition: number,
  duration = DEFAULT_SCROLL_DURATION,
) {
  const startPosition = window.scrollY;
  const diff = targetPosition - startPosition;
  let startTime: number | null;

  function step(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startPosition + diff * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
