import { useEffect } from "react";

export default function ParallaxController() {
  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const isTouch =
      "ontouchstart" in window || (navigator.maxTouchPoints ?? 0) > 0;
    if (reduce || isTouch) return;

    let raf = 0;
    let targetXNorm = 0;
    let targetYNorm = 0;
    let renderXNorm = 0;
    let renderYNorm = 0;
    const followLerp = 0.14;

    const getPanels = () =>
      Array.from(document.querySelectorAll<HTMLElement>(".parallax-large"));

    const update = () => {
      const viewportH = window.innerHeight || 1;
      const panels = getPanels();

      renderXNorm += (targetXNorm - renderXNorm) * followLerp;
      renderYNorm += (targetYNorm - renderYNorm) * followLerp;

      for (const panel of panels) {
        const depth = Number(panel.dataset.parallaxDepth ?? "0.16");
        const rect = panel.getBoundingClientRect();
        const centerY = rect.top + rect.height * 0.5;
        const centerBias = 1 - Math.min(1, Math.abs(centerY - viewportH * 0.5) / viewportH);
        const influence = 0.45 + centerBias * 0.55;

        // 3D Tilt / Perspective with mouse as focal point.
        const rotateY = renderXNorm * depth * 34 * influence;
        const rotateX = -renderYNorm * depth * 24 * influence;
        const zLift = depth * 8 * influence;

        // Keep true 3D tilt but avoid layout growth that causes lateral scroll.
        panel.style.transform = `perspective(1400px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) translateZ(${zLift.toFixed(2)}px)`;
      }

      raf = requestAnimationFrame(update);
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onResize = () => request();
    const onMove = (e: MouseEvent) => {
      targetXNorm = e.clientX / Math.max(1, window.innerWidth) - 0.5;
      targetYNorm = e.clientY / Math.max(1, window.innerHeight) - 0.5;
      request();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    request();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
