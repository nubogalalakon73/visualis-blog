import { formatDate, postPath, type PostSummary } from "@/lib/journal";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { TagPill } from "./TagPill";

export function PostRow({
  post,
  index,
  className,
}: {
  post: PostSummary;
  index: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative grid gap-4 border-b-2 border-ink py-7 transition-colors hover:bg-paper-deep/60 md:grid-cols-[4rem_1fr_auto] md:gap-8 md:py-9",
        className,
      )}
    >
      <span className="font-serif text-2xl italic leading-none text-muted-foreground md:pt-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <div className="relative z-10 mb-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        <h3 className="font-display text-[26px] leading-[1.05] md:text-[32px]">
          <Link
            to={postPath(post.slug)}
            className="bg-[linear-gradient(transparent_62%,#dff25b_62%)] bg-[length:0%_100%] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 after:absolute after:inset-0 after:content-[''] group-hover:bg-[length:100%_100%]"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      </div>

      <div className="flex items-end justify-between gap-4 md:flex-col md:items-end md:justify-start">
        <div className="text-left md:text-right">
          <p className="label text-[9px] text-muted-foreground">
            {formatDate(post.publishedAt)}
          </p>
          <p className="label mt-1 text-[9px] text-muted-foreground/70">
            {post.readMinutes} min read
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center border-2 border-ink bg-paper transition-all group-hover:-translate-y-0.5 group-hover:bg-ink group-hover:text-paper">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </div>
  );
}
