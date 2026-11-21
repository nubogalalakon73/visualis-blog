import { tagPath } from "@/lib/journal";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export function TagPill({
  tag,
  className,
  linked = true,
  tone = "paper",
}: {
  tag: string;
  className?: string;
  linked?: boolean;
  tone?: "paper" | "lime" | "ink";
}) {
  const base =
    "label inline-flex items-center border-2 border-ink px-2 py-1 text-[9px] leading-none tracking-[0.14em] transition-colors";
  const tones = {
    paper: "bg-paper text-ink hover:bg-ink hover:text-paper",
    lime: "bg-lime text-ink hover:bg-ink hover:text-paper",
    ink: "bg-ink text-paper hover:bg-lime hover:text-ink",
  } as const;

  if (!linked) {
    return (
      <span className={cn(base, tones[tone], className)}>
        {tag}
      </span>
    );
  }

  return (
    <Link
      to={tagPath(tag)}
      className={cn(base, tones[tone], className)}
      onClick={(event) => event.stopPropagation()}
    >
      {tag}
    </Link>
  );
}
