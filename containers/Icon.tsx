// On-brand loading screen: a computer-vision "detection box" — dark wall grid,
// neon corner brackets and a sweeping scan bar, in the portfolio palette.
// Replaces the old generic gif_programming.gif spinner (pure SVG + CSS, ~1KB).
const Icon = () => {
  return (
    <div className="lc-loader" role="status" aria-label="Cargando">
      <svg className="lc-box" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="lcPanel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0a162d" />
            <stop offset="1" stopColor="#04090f" />
          </linearGradient>
          <linearGradient id="lcScan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="0.5" stopColor="#22d3ee" stopOpacity="0.28" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lcCore" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        {/* panel */}
        <rect x="8" y="8" width="184" height="184" rx="18" fill="url(#lcPanel)" stroke="rgba(186,230,253,0.12)" strokeWidth="1.5" />

        {/* inner grid */}
        <g stroke="#123054" strokeWidth="1" opacity="0.45">
          <path d="M8 54 H192 M8 100 H192 M8 146 H192" />
          <path d="M54 8 V192 M100 8 V192 M146 8 V192" />
        </g>

        {/* sweeping scan band + bright line */}
        <g className="lc-scan">
          <rect x="10" y="-24" width="180" height="48" fill="url(#lcScan)" />
          <rect x="10" y="0" width="180" height="2" fill="#7dd3fc" />
        </g>

        {/* center reticle / hexagon core */}
        <polygon
          className="lc-core"
          points="100,74 122,87 122,113 100,126 78,113 78,87"
          fill="none"
          stroke="url(#lcCore)"
          strokeWidth="2.5"
        />
        <circle className="lc-dot" cx="100" cy="100" r="5" fill="#22d3ee" />

        {/* neon detection corners */}
        <g className="lc-corners" stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M28 44 V28 H44" />
          <path d="M156 28 H172 V44" />
          <path d="M172 156 V172 H156" />
          <path d="M44 172 H28 V156" />
        </g>
      </svg>

      <div className="lc-label">
        cargando<span className="d d1">.</span><span className="d d2">.</span><span className="d d3">.</span>
      </div>

      <style jsx>{`
        .lc-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }
        .lc-box {
          width: clamp(140px, 22vw, 200px);
          height: auto;
          filter: drop-shadow(0 0 22px rgba(34, 211, 238, 0.18));
        }
        .lc-scan {
          animation: lc-sweep 2.1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes lc-sweep {
          0% { transform: translateY(24px); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateY(168px); opacity: 0; }
        }
        .lc-core {
          transform-origin: 100px 100px;
          animation: lc-pulse 2.1s ease-in-out infinite;
        }
        .lc-dot {
          transform-origin: 100px 100px;
          animation: lc-blip 2.1s ease-in-out infinite;
        }
        @keyframes lc-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes lc-blip {
          0%, 100% { transform: scale(0.7); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .lc-corners { animation: lc-corner 2.1s ease-in-out infinite; }
        @keyframes lc-corner {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .lc-label {
          font-family: "DejaVu Sans Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.9rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #7dd3fc;
        }
        .d { opacity: 0; animation: lc-dots 1.4s steps(1, end) infinite; }
        .d1 { animation-delay: 0s; }
        .d2 { animation-delay: 0.35s; }
        .d3 { animation-delay: 0.7s; }
        @keyframes lc-dots {
          0% { opacity: 0; }
          30%, 100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lc-scan, .lc-core, .lc-dot, .lc-corners, .d { animation: none; }
          .lc-scan { opacity: 0.6; }
          .d { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Icon;
