import { cn } from "@/lib/utils";

type Palette = { bg: string; ink: string; accent: string };

const PALETTES: Record<string, Palette> = {
  lime: { bg: "#dff25b", ink: "#131310", accent: "#f5f2e9" },
  sky: { bg: "#a9c6f5", ink: "#131310", accent: "#dff25b" },
  coral: { bg: "#ff9e80", ink: "#131310", accent: "#ffd75e" },
  butter: { bg: "#ffd75e", ink: "#131310", accent: "#f5f2e9" },
  lilac: { bg: "#c9b8f5", ink: "#131310", accent: "#a9c6f5" },
  ink: { bg: "#131310", ink: "#f5f2e9", accent: "#dff25b" },
};

function variantFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 997;
  }
  return hash % 4;
}

export function PostCover({
  cover,
  slug,
  className,
  showCaption = true,
}: {
  cover: string;
  slug: string;
  className?: string;
  showCaption?: boolean;
}) {
  const palette = PALETTES[cover] ?? PALETTES.lime;
  const variant = variantFor(slug);

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden border-2 border-ink",
        className,
      )}
      style={{ backgroundColor: palette.bg }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 300"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {variant === 0 && (
          <>
            <circle cx="138" cy="188" r="88" fill={palette.ink} />
            <rect
              x="252"
              y="66"
              width="88"
              height="88"
              fill={palette.accent}
              stroke={palette.ink}
              strokeWidth="7"
            />
            <line
              x1="34"
              y1="248"
              x2="366"
              y2="248"
              stroke={palette.ink}
              strokeWidth="7"
            />
            <circle cx="138" cy="188" r="26" fill={palette.bg} />
          </>
        )}

        {variant === 1 && (
          <>
            <path
              d="M54 246 V158 a62 62 0 0 1 124 0 V246 Z"
              fill={palette.accent}
              stroke={palette.ink}
              strokeWidth="7"
            />
            <path
              d="M222 246 V132 a68 68 0 0 1 136 0 V246"
              fill="none"
              stroke={palette.ink}
              strokeWidth="7"
            />
            <line
              x1="34"
              y1="246"
              x2="366"
              y2="246"
              stroke={palette.ink}
              strokeWidth="7"
            />
            <rect x="54" y="70" width="52" height="16" fill={palette.ink} />
          </>
        )}

        {variant === 2 && (
          <>
            <path
              d="M-30 218 L430 56 L430 132 L-30 294 Z"
              fill={palette.ink}
            />
            <rect
              x="146"
              y="82"
              width="104"
              height="104"
              fill={palette.accent}
              stroke={palette.ink}
              strokeWidth="7"
              transform="rotate(-11 198 134)"
            />
            <circle cx="330" cy="224" r="34" fill={palette.bg} stroke={palette.ink} strokeWidth="7" />
          </>
        )}

        {variant === 3 && (
          <>
            <rect x="46" y="46" width="104" height="104" fill={palette.ink} />
            <circle cx="302" cy="98" r="52" fill={palette.accent} stroke={palette.ink} strokeWidth="7" />
            <rect x="46" y="188" width="304" height="58" fill={palette.ink} />
            <rect x="188" y="188" width="54" height="58" fill={palette.accent} />
            <circle cx="150" cy="98" r="26" fill={palette.accent} />
          </>
        )}
      </svg>

      {showCaption && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2"
          style={{ color: palette.ink }}
        >
          <span className="label text-[8px] tracking-[0.24em] opacity-80">
            Visualis journal
          </span>
          <span className="label text-[8px] tracking-[0.24em] opacity-80">
            Fig. 0{variant + 1}
          </span>
        </div>
      )}
    </div>
  );
}
