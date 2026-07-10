/**
 * TechIcons — íconos SVG inline de marca para cada tecnología.
 * Usa paths de Simple Icons (simpleicons.org) en formato 24×24 viewBox.
 */

type IconProps = {
  size?: number;
  className?: string;
};

/* ── Python ──────────────────────────────────────────────── */
export const IconPython = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <defs>
      <linearGradient id="py-a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#387EB8" />
        <stop offset="100%" stopColor="#366994" />
      </linearGradient>
      <linearGradient id="py-b" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFE052" />
        <stop offset="100%" stopColor="#FFC331" />
      </linearGradient>
    </defs>
    {/* Body superior */}
    <path fill="url(#py-a)" d="M11.93 2C7.1 2 7.4 4.1 7.4 4.1l.01 2.17h4.6v.65H5.56S2 6.55 2 11.47s3.12 4.75 3.12 4.75h1.86v-2.28s-.1-3.12 3.07-3.12h5.29s2.97.05 2.97-2.87V4.97S17.73 2 11.93 2zm-2.9 1.68c.53 0 .96.43.96.96s-.43.96-.96.96-.96-.43-.96-.96.43-.96.96-.96z"/>
    {/* Body inferior */}
    <path fill="url(#py-b)" d="M12.07 22c4.83 0 4.53-2.1 4.53-2.1l-.01-2.17h-4.6v-.65h6.45S22 17.45 22 12.53s-3.12-4.75-3.12-4.75h-1.86v2.28s.1 3.12-3.07 3.12H8.66s-2.97-.05-2.97 2.87v4.98S6.27 22 12.07 22zm2.9-1.68c-.53 0-.96-.43-.96-.96s.43-.96.96-.96.96.43.96.96-.43.96-.96.96z"/>
  </svg>
);

/* ── OpenCV ───────────────────────────────────────────────── */
export const IconOpenCV = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    {/* Tres círculos de OpenCV — azul, verde, rojo */}
    <circle cx="7"  cy="10" r="4.5" fill="#5C9BD6" opacity=".9"/>
    <circle cx="17" cy="10" r="4.5" fill="#2ECC71" opacity=".9"/>
    <circle cx="12" cy="17" r="4.5" fill="#E74C3C" opacity=".9"/>
    {/* Superposiciones de intersección */}
    <circle cx="12" cy="13.5" r="1.2" fill="#1a1a2e" opacity=".5"/>
  </svg>
);

/* ── YOLO / Ultralytics ───────────────────────────────────── */
export const IconYOLO = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#1A1A2E" stroke="#7C3AED" strokeWidth="1.5"/>
    <text x="12" y="16" textAnchor="middle" fill="#A78BFA"
      style={{ font: "bold 8px 'JetBrains Mono',monospace", letterSpacing: "0.5px" }}>
      YOLO
    </text>
  </svg>
);

/* ── TensorFlow ───────────────────────────────────────────── */
export const IconTensorFlow = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#FF6F00" className={className} aria-hidden>
    <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.393l-6.168 3.544.015-5.081zm21.43 5.081l-6.168-3.544v14.229L12.46 24V0l10.247 5.856.015 5.081z"/>
  </svg>
);

/* ── Next.js ──────────────────────────────────────────────── */
export const IconNextJS = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <circle cx="12" cy="12" r="11" fill="#000"/>
    <path d="M18.63 20.02L9.34 8H8v7.997h1.38V9.709l8.418 10.89a10.985 10.985 0 0 0 .832-.58z" fill="#fff"/>
    <path d="M15.5 8h1.5v8h-1.5z" fill="#fff"/>
  </svg>
);

/* ── TypeScript ───────────────────────────────────────────── */
export const IconTypeScript = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <rect width="24" height="24" rx="3" fill="#3178C6"/>
    <path d="M13.83 13.39v1.54c.25.13.55.23.89.3.34.07.7.1 1.08.1.37 0 .72-.04 1.06-.11.34-.08.63-.2.88-.37.25-.17.45-.39.6-.66.15-.27.22-.6.22-.98 0-.28-.04-.52-.12-.72a1.6 1.6 0 0 0-.35-.54 2.5 2.5 0 0 0-.56-.42 6.8 6.8 0 0 0-.76-.36c-.21-.08-.39-.16-.55-.24a2.2 2.2 0 0 1-.4-.24.97.97 0 0 1-.24-.28.65.65 0 0 1-.08-.33c0-.11.02-.21.07-.3a.67.67 0 0 1 .2-.23c.09-.07.2-.12.33-.15.13-.04.28-.05.44-.05.12 0 .24.01.38.03.14.03.27.07.4.13.14.06.26.13.38.22.12.09.22.2.3.33V10.5a3.6 3.6 0 0 0-.78-.22 5.3 5.3 0 0 0-.97-.08c-.36 0-.7.04-1.02.13-.32.09-.6.22-.84.4a1.9 1.9 0 0 0-.57.67c-.14.27-.2.59-.2.95 0 .47.13.87.4 1.19.27.32.68.59 1.24.8.22.09.42.17.6.26.18.09.33.18.46.28.12.1.22.21.29.33.07.12.1.26.1.42 0 .12-.02.23-.07.33a.75.75 0 0 1-.21.26c-.09.07-.21.13-.35.17a1.7 1.7 0 0 1-.49.06c-.32 0-.63-.06-.93-.19-.3-.12-.57-.32-.81-.58zM9.74 11.02H11.8V9.8H6.2v1.22h2.05V17h1.49v-5.98z" fill="#fff"/>
  </svg>
);

/* ── Node.js ──────────────────────────────────────────────── */
export const IconNodeJS = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#339933" className={className} aria-hidden>
    <path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22h-.93c-.12 0-.22.1-.22.22v8.46c0 .66-.68 1.31-1.77.76L4.44 16.5a.28.28 0 0 1-.14-.24V7.71c0-.1.05-.2.14-.24l7.42-4.28a.27.27 0 0 1 .28 0l7.42 4.28c.09.05.14.14.14.24v8.55c0 .1-.05.19-.14.24l-7.42 4.28a.27.27 0 0 1-.28 0l-1.9-1.12c-.09-.05-.21-.06-.31-.02-.86.48-.02.18-1.09.52-.12.04.02.14.08.17l2.49 1.47c.23.13.5.2.78.2.27 0 .55-.07.78-.2l7.42-4.28c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.5-.2-.78-.2zm1.57 5.1c-2.1 0-3.35 1.12-3.35 2.99 0 2.02 1.54 2.58 3.03 2.83 1.73.3 2.29.4 2.29 1.35 0 .66-.26 1.05-1.35 1.05-.6 0-1.12-.15-1.43-.58-.16-.24-.26-.55-.26-.98h-2.1c.01.56.11 1.03.31 1.42.48.92 1.44 1.38 3.48 1.38 2.21 0 3.56-1.1 3.56-3.1 0-1.95-1.05-2.49-3.25-2.86-1.73-.3-2.06-.49-2.06-1.26 0-.66.49-1.07 1.32-1.07.86 0 1.31.35 1.46 1.1H17c-.14-1.88-1.38-2.27-3.43-2.27z"/>
  </svg>
);

/* ── JavaScript ───────────────────────────────────────────── */
export const IconJavaScript = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
    <path d="M6.47 17.46c.31.5.73.87 1.46.87.61 0 1-.3 1-.73 0-.51-.4-.7-1.08-.99l-.37-.16c-1.06-.46-1.77-1.03-1.77-2.24 0-1.12.85-1.97 2.18-1.97.95 0 1.63.33 2.12 1.2l-1.16.75c-.26-.46-.54-.64-.96-.64-.43 0-.71.28-.71.64 0 .45.28.63 1 .95l.37.16c1.25.54 1.97 1.09 1.97 2.33 0 1.33-1.05 2.08-2.46 2.08-1.38 0-2.27-.66-2.7-1.52l1.11-.73zM13.15 17.7c.23.4.44.74 1.04.74.53 0 .87-.21.87-1.01v-5.41h1.43v5.43c0 1.67-.97 2.42-2.4 2.42-1.28 0-2.03-.66-2.41-1.46l1.47-.71z" fill="#000"/>
  </svg>
);

/* ── MySQL ────────────────────────────────────────────────── */
export const IconMySQL = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <path d="M16.41 15.83c-.91 0-1.63.18-2.22.48l-.25-.5c.6-.3 1.38-.51 2.36-.51.53 0 1.01.08 1.43.21l-.17.52c-.37-.13-.75-.2-1.15-.2z" fill="#00618A"/>
    <path d="M2 6.5C2 4.57 6.48 3 12 3s10 1.57 10 3.5v11C22 19.43 17.52 21 12 21S2 19.43 2 17.5v-11z" fill="#00618A"/>
    <path d="M22 6.5C22 8.43 17.52 10 12 10S2 8.43 2 6.5 6.48 3 12 3s10 1.57 10 3.5z" fill="#007FA6"/>
    <text x="12" y="15" textAnchor="middle" fill="#fff"
      style={{ font: "bold 6px 'Manrope',sans-serif", letterSpacing: "0.3px" }}>
      MySQL
    </text>
  </svg>
);

/* ── PostgreSQL ───────────────────────────────────────────── */
export const IconPostgres = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <circle cx="12" cy="12" r="10" fill="#336791"/>
    <text x="12" y="16" textAnchor="middle" fill="#fff"
      style={{ font: "bold 7px 'Manrope',sans-serif" }}>
      PG
    </text>
  </svg>
);

/* ── Node-RED ─────────────────────────────────────────────── */
export const IconNodeRED = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#8F0000"/>
    <circle cx="7"  cy="12" r="2.5" fill="#fff" opacity=".9"/>
    <circle cx="17" cy="12" r="2.5" fill="#fff" opacity=".9"/>
    <line x1="9.5" y1="12" x2="14.5" y2="12" stroke="#fff" strokeWidth="1.8" opacity=".9"/>
  </svg>
);

/* ── C++ ──────────────────────────────────────────────────── */
export const IconCpp = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="#00599C" className={className} aria-hidden>
    <path d="M10.5 15.97l.41 2.44c-.26.14-.68.27-1.24.39a7.42 7.42 0 0 1-1.44.18c-1.56 0-2.75-.41-3.57-1.24C3.85 16.9 3.44 15.8 3.44 14.4c0-1.44.43-2.6 1.3-3.48.88-.89 2.05-1.34 3.52-1.34.47 0 .9.05 1.3.14.41.09.74.2.98.33l-.4 2.44-.57-.22a2.8 2.8 0 0 0-.84-.12c-.65 0-1.16.2-1.53.6-.37.4-.56.98-.56 1.75 0 .73.18 1.29.54 1.69.37.4.87.6 1.51.6.28 0 .57-.04.88-.11.3-.08.56-.17.79-.28l.1-.03zM20 11.5h-2v-2h-1.5v2h-2V13h2v2H18v-2h2v-1.5z"/>
  </svg>
);

/* ── Java ─────────────────────────────────────────────────── */
export const IconJava = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <path d="M8.85 17.03s-.84.49.6.65c1.73.2 2.62.17 4.52-.18 0 0 .5.31 1.2.59-4.27 1.83-9.67-.1-6.32-1.06zm-.52-2.36s-.95.7.5.85c1.87.19 3.34.21 5.89-.28 0 0 .35.36.9.55-5.22 1.53-11.03.12-7.29-1.12z" fill="#5382A1"/>
    <path d="M13.19 11.13c1.06 1.22-.28 2.32-.28 2.32s2.7-1.39 1.46-3.13c-1.15-1.63-2.04-2.44 2.76-5.24 0 0-7.54 1.88-3.94 6.05z" fill="#E76F00"/>
    <path d="M19.18 18.77s.62.51-.69.9c-2.48.76-10.34.98-12.51.03-.78-.34.69-.81 1.15-.91.48-.1.76-.09.76-.09-.87-.61-5.64 1.21-2.42 1.73 8.76 1.42 15.98-.64 13.71-1.66zm-10.3-7.48s-3.98.95-1.41 1.29c1.08.15 3.24.11 5.25-.06 1.64-.14 3.29-.44 3.29-.44s-.58.25-1 .53c-4.04 1.07-11.84.57-9.6-.52 1.9-.91 3.47-.8 3.47-.8zm7.14 3.98c4.11-2.13 2.21-4.18 0.88-3.9-.32.07-.47.12-.47.12s.12-.19.35-.27c2.62-.92 4.63 2.72-.84 4.16 0 0 .06-.05.08-.11zM13.8 3s2.27 2.27-2.15 5.76c-3.55 2.8-.81 4.4 0 6.22-2.07-1.87-3.59-3.52-2.57-5.05C10.67 7.67 14.76 6.7 13.8 3z" fill="#5382A1"/>
    <path d="M15.04 21.12c3.95-.53 4.99-2.07 4.99-2.07-.87 2.32-6.14 2.65-6.14 2.65s.83-.27 1.15-.58z" fill="#5382A1"/>
  </svg>
);

/* ── PHP ──────────────────────────────────────────────────── */
export const IconPHP = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <ellipse cx="12" cy="12" rx="10" ry="6.5" fill="#777BB4"/>
    <path d="M7.5 10h1.3l-.55 2.72H9.6c.8 0 1.26-.12 1.52-.64l.55-2.08H13l-.6 2.3c-.3 1.13-1.08 1.7-2.48 1.7H8.56L8.3 15H6.94l.56-5zM14.5 10h2.55c1.1 0 1.58.56 1.35 1.62-.23 1.07-.96 1.63-2.05 1.63h-1.2l-.25 1.75H13.6l.9-5zm1.35 2.27c.4 0 .66-.18.74-.55.08-.36-.1-.55-.5-.55h-1.06l-.2 1.1h1.02z" fill="#fff"/>
  </svg>
);

/* ── Genexus ──────────────────────────────────────────────── */
export const IconGenexus = ({ size = 28, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden>
    <rect width="24" height="24" rx="4" fill="#0063A6"/>
    <path d="M4 12l5-7h6l-5 7 5 7H9L4 12z" fill="#fff" opacity=".9"/>
    <path d="M12 5h4l4 7-4 7h-4l4-7-4-7z" fill="#fff" opacity=".6"/>
  </svg>
);

/* ── Mapa nombre de tech → ícono ─────────────────────────── */
type IconComponent = (props: IconProps) => JSX.Element;

export const TECH_ICON_MAP: Record<string, IconComponent> = {
  "Python":                IconPython,
  "OpenCV · YOLO":         IconOpenCV,
  "TensorFlow / Keras":    IconTensorFlow,
  "Next.js · TypeScript":  IconNextJS,
  "Node.js · JavaScript":  IconNodeJS,
  "SQL · MySQL · PostgreSQL": IconMySQL,
  "Node-RED":              IconNodeRED,
  "C++ · Java · PHP":      IconCpp,
};
