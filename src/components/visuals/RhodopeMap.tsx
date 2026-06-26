/**
 * Stylised, pure-SVG provenance map of the Rhodope Mountains with a single
 * "apiary" pin. No external image — nothing to 404. (See CLAUDE.md.)
 */
export function RhodopeMap({
  className = "",
  title,
  pinLabel,
}: {
  className?: string;
  title: string;
  pinLabel: string;
}) {
  return (
    <div className={`glass-strong rounded-2xl p-2.5 ${className}`}>
      <svg
        viewBox="0 0 200 120"
        className="h-auto w-full overflow-hidden rounded-xl"
        role="img"
        aria-label={`${title} — ${pinLabel}`}
      >
        <defs>
          <linearGradient id="rm-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f1a13" />
            <stop offset="100%" stopColor="#0b0a09" />
          </linearGradient>
          <linearGradient id="rm-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9e5d0f" />
            <stop offset="100%" stopColor="#5e3712" />
          </linearGradient>
          <linearGradient id="rm-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#edb23e" />
            <stop offset="100%" stopColor="#c77c12" />
          </linearGradient>
        </defs>

        <rect width="200" height="120" fill="url(#rm-sky)" />

        {/* contour hint lines */}
        <g fill="none" stroke="#f3c667" strokeOpacity="0.12" strokeWidth="0.6">
          <path d="M0 70 Q50 52 100 64 T200 58" />
          <path d="M0 84 Q55 66 105 78 T200 72" />
        </g>

        {/* back ridge */}
        <path
          d="M0 92 L30 55 L55 74 L85 40 L115 70 L150 45 L180 72 L200 56 L200 120 L0 120 Z"
          fill="url(#rm-back)"
          fillOpacity="0.55"
        />
        {/* front ridge */}
        <path
          d="M0 106 L40 78 L70 92 L100 66 L135 90 L165 74 L200 96 L200 120 L0 120 Z"
          fill="url(#rm-front)"
          fillOpacity="0.85"
        />

        {/* pin — sits on the tall central peak (85,40) */}
        <g transform="translate(85 40)">
          <circle
            className="animate-pulse-glow"
            r="11"
            fill="#f3c667"
            fillOpacity="0.18"
          />
          <circle r="4.5" fill="#0b0a09" stroke="#f3c667" strokeWidth="2" />
          <circle r="1.6" fill="#f3c667" />
        </g>
      </svg>

      <div className="mt-2 flex items-center justify-between gap-2 px-1 pb-0.5">
        <span className="text-xs font-semibold text-cream">{title}</span>
        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-honey-300">
          <span className="h-1.5 w-1.5 rounded-full bg-honey-300" />
          {pinLabel}
        </span>
      </div>
    </div>
  );
}
