import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #38bdf8, #22d3ee)",
        transformOrigin: "left center",
        transform: "scaleX(0)",
        zIndex: 99999,
        pointerEvents: "none",
        transition: "transform 60ms linear",
        boxShadow: "0 0 8px rgba(56,189,248,0.6)",
      }}
    />
  );
}
