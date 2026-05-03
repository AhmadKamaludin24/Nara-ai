interface NaraLogoProps {
  /** Size in pixels (width = height) */
  size?: number;
  /** Color for the icon mark */
  markColor?: string;
  /** Background fill color */
  bgColor?: string;
  /** Border/stroke color */
  strokeColor?: string;
  /** Show border around the mark */
  withBorder?: boolean;
  className?: string;
}

/**
 * NARA.AI Logo Mark — Reusable SVG Component
 *
 * A geometric "N" with an integrated sound-wave, representing
 * AI-powered voice interviews. Built in the neo-brutalist style.
 */
export function NaraLogo({
  size = 48,
  markColor = "#000000",
  bgColor = "#FFD600",
  strokeColor = "#000000",
  withBorder = true,
  className = "",
}: NaraLogoProps) {
  const strokeW = Math.max(2, size * 0.06);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="NARA.AI Logo"
    >
      {/* Background square */}
      <rect
        x={withBorder ? strokeW / 2 : 0}
        y={withBorder ? strokeW / 2 : 0}
        width={withBorder ? 100 - strokeW : 100}
        height={withBorder ? 100 - strokeW : 100}
        fill={bgColor}
        stroke={withBorder ? strokeColor : "none"}
        strokeWidth={withBorder ? strokeW : 0}
      />

      {/* ── Letter "N" ── */}
      {/* Left vertical bar */}
      <rect x="18" y="22" width="13" height="56" fill={markColor} rx="1" />
      {/* Right vertical bar */}
      <rect x="69" y="22" width="13" height="56" fill={markColor} rx="1" />
      {/* Top-left to bottom-right diagonal stroke */}
      <polygon
        points="18,22 31,22 69,78 69,78 56,78"
        fill={markColor}
      />

      {/* ── Sound-wave accent (center diagonal) ── */}
      {/* Three small wave bumps overlaid on the diagonal */}
      <ellipse cx="36" cy="40" rx="4" ry="7" fill={bgColor} transform="rotate(-34 36 40)" />
      <ellipse cx="50" cy="50" rx="4" ry="9" fill={bgColor} transform="rotate(-34 50 50)" />
      <ellipse cx="64" cy="60" rx="4" ry="7" fill={bgColor} transform="rotate(-34 64 60)" />

      {/* ── Dot accent (top-right corner, AI indicator) ── */}
      <circle cx="80" cy="22" r="5" fill={markColor} />
    </svg>
  );
}
