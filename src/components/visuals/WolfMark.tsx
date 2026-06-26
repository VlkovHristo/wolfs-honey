import { useId } from "react";

type WolfMarkProps = {
  className?: string;
  withHex?: boolean;
};

/**
 * Wolf's Honey brand mark — a geometric wolf head set inside a honeycomb
 * hexagon, rendered in the honey-amber gradient. Pure SVG, so it scales
 * cleanly from favicon to hero and never 404s.
 */
export function WolfMark({ className = "", withHex = true }: WolfMarkProps) {
  const raw = useId().replace(/:/g, "");
  const grad = `wolf-${raw}`;

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#F8DC9B" />
          <stop offset="0.5" stopColor="#F3C667" />
          <stop offset="1" stopColor="#C77C12" />
        </linearGradient>
      </defs>

      {withHex && (
        <path
          d="M24 3 L43 13.5 L43 34.5 L24 45 L5 34.5 L5 13.5 Z"
          fill="none"
          stroke={`url(#${grad})`}
          strokeWidth="1.6"
          strokeLinejoin="round"
          opacity="0.55"
        />
      )}

      <g
        transform={
          withHex
            ? "translate(24 25) scale(0.66) translate(-24 -24)"
            : undefined
        }
      >
        <path
          fill={`url(#${grad})`}
          d="M9 7 L18 17 L24 15 L30 17 L39 7 L36 20 L41 28 L33 30 L30 40 L24 44 L18 40 L15 30 L7 28 L12 20 Z"
        />
        {/* eyes + snout — negative space in ink */}
        <path fill="#0B0A09" d="M15 23 L21 25 L20 28 L15 26 Z" />
        <path fill="#0B0A09" d="M33 23 L27 25 L28 28 L33 26 Z" />
        <path fill="#0B0A09" d="M22 39 L26 39 L24 43 Z" />
      </g>
    </svg>
  );
}
