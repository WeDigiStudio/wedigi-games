/**
 * Kolam (கோலம்) — the South Indian threshold drawing: a grid of dots (pulli)
 * with a continuous line looped around them. Used here as fine background
 * texture, never as decoration sitting on top of content.
 *
 * Inherits `currentColor`, so opacity and hue are controlled by the parent.
 */
export function KolamDefs({ id = "kolam" }: { id?: string }) {
  return (
    <defs>
      <pattern id={id} width="160" height="160" patternUnits="userSpaceOnUse">
        {/* the looped line */}
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="40" y="40" width="80" height="80" rx="30" transform="rotate(45 80 80)" />
          <rect x="60" y="60" width="40" height="40" rx="14" transform="rotate(45 80 80)" />
        </g>
        {/* the dots */}
        <g fill="currentColor">
          {[
            [80, 80],
            [0, 0],
            [160, 0],
            [0, 160],
            [160, 160],
            [80, 0],
            [0, 80],
            [160, 80],
            [80, 160],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.7" />
          ))}
        </g>
      </pattern>
    </defs>
  );
}

export function Kolam({
  className = "",
  patternId = "kolam",
}: {
  className?: string;
  patternId?: string;
}) {
  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%">
      <KolamDefs id={patternId} />
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
