import { useEffect, useRef } from "react";

export default function MouseFog() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const isTouch =
      "ontouchstart" in window || (navigator.maxTouchPoints ?? 0) > 0;

    const canvas = canvasRef.current;
    if (reduce || isTouch || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Glyph = {
      x: number;
      y: number;
      char: string;
      bornAt: number;
      ttl: number;
      hue: number;
    };

    const chars = ["0", "1", "/", "\\", "{", "}", "<", ">", "?", "#", "!", "(", ")"];
    const palette = [190, 210, 280, 310, 40, 160]; // cyan/blue/purple/pink/amber/green
    const spacing = 11;
    const followLerp = 0.18;
    const eraseIntervalMs = 48;
    const blinkCycleMs = 700;
    const maxGlyphs = 900;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.5;
    let renderX = targetX;
    let renderY = targetY;
    let prevX = renderX;
    let prevY = renderY;
    let carryDistance = 0;
    let lastErase = performance.now();

    const trail: Glyph[] = [];

    const randomChar = () => chars[Math.floor(Math.random() * chars.length)];
    const randomHue = () => palette[Math.floor(Math.random() * palette.length)];

    const resizeCanvas = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const pushGlyph = (x: number, y: number, now: number) => {
      trail.push({
        x,
        y,
        char: randomChar(),
        bornAt: now,
        ttl: 850 + Math.random() * 550,
        hue: randomHue(),
      });
      if (trail.length > maxGlyphs) {
        trail.splice(0, trail.length - maxGlyphs);
      }
    };

    const animate = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      renderX += (targetX - renderX) * followLerp;
      renderY += (targetY - renderY) * followLerp;

      const dx = renderX - prevX;
      const dy = renderY - prevY;
      const distance = Math.hypot(dx, dy);
      carryDistance += distance;

      while (carryDistance >= spacing) {
        const t = (carryDistance - spacing) / Math.max(0.001, distance);
        const x = renderX - dx * t;
        const y = renderY - dy * t;
        pushGlyph(x, y, now);
        carryDistance -= spacing;
      }

      prevX = renderX;
      prevY = renderY;

      // Erase with terminal-like cadence.
      while (now - lastErase >= eraseIntervalMs && trail.length > 0) {
        trail.shift();
        lastErase += eraseIntervalMs;
      }

      for (let i = trail.length - 1; i >= 0; i -= 1) {
        const g = trail[i];
        const age = now - g.bornAt;
        if (age >= g.ttl) {
          trail.splice(i, 1);
          continue;
        }

        const t = age / g.ttl;
        const alpha = Math.max(0, 1 - t);
        const displayChar = t >= 0.8 ? "_" : g.char;

        ctx.font = `600 13px "Source Code Pro", monospace`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `hsla(${g.hue}, 95%, 74%, ${0.9 * alpha})`;
        ctx.shadowColor = `hsla(${g.hue}, 100%, 60%, ${0.75 * alpha})`;
        ctx.shadowBlur = 9;
        ctx.fillText(displayChar, g.x, g.y);
      }

      // Blinking cursor at trail head (bash feeling).
      const blinkOn = Math.floor(now / (blinkCycleMs / 2)) % 2 === 0;
      if (blinkOn) {
        const hue = palette[(Math.floor(now / 500) % palette.length)];
        ctx.fillStyle = `hsla(${hue}, 100%, 80%, 0.95)`;
        ctx.shadowColor = `hsla(${hue}, 100%, 62%, 0.9)`;
        ctx.shadowBlur = 10;
        ctx.fillText("_", renderX, renderY);
      }

      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-code-canvas" aria-hidden="true" />;
}
