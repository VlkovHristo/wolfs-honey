import { useId } from "react";

type HoneyJarProps = {
  from: string;
  to: string;
  className?: string;
};

/** Stylised honey jar built purely from SVG so it never 404s. */
export function HoneyJar({ from, to, className = "" }: HoneyJarProps) {
  const raw = useId().replace(/:/g, "");
  const honey = `honey-${raw}`;
  const glass = `glass-${raw}`;
  const surface = `surface-${raw}`;

  return (
    <svg
      className={className}
      viewBox="0 0 200 260"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={honey} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={surface} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* lid */}
      <rect x="60" y="14" width="80" height="26" rx="9" fill={to} />
      <rect
        x="54"
        y="34"
        width="92"
        height="18"
        rx="7"
        fill={from}
        opacity="0.95"
      />

      {/* body */}
      <path
        d="M54 64 Q54 54 64 54 L136 54 Q146 54 146 64 L146 208 Q146 238 116 238 L84 238 Q54 238 54 208 Z"
        fill={`url(#${honey})`}
      />

      {/* honey surface sheen */}
      <ellipse cx="100" cy="70" rx="44" ry="9" fill={`url(#${surface})`} />

      {/* glass highlight */}
      <rect
        x="64"
        y="70"
        width="14"
        height="150"
        rx="7"
        fill={`url(#${glass})`}
      />

      {/* label */}
      <rect
        x="68"
        y="120"
        width="64"
        height="62"
        rx="10"
        fill="#0B0A09"
        opacity="0.16"
      />
      {/* hex mark on label */}
      <path
        d="M100 134l11 6.4v12.8L100 159.6 89 153.2v-12.8z"
        fill="#0B0A09"
        opacity="0.28"
      />
    </svg>
  );
}
