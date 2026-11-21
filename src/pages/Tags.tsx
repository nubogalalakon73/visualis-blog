import { PostRow } from "@/components/blog/PostRow";
import { SiteShell } from "@/components/site/SiteShell";
import { api } from "@/convex/_generated/api";
import { useJournal } from "@/hooks/use-journal";
import { tagPath } from "@/lib/journal";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const TAG_TONES = [
  "bg-lime",
  "bg-sky",
  "bg-coral",
  "bg-butter",
  "bg-lilac",
  "bg-paper",
];

export default function Tags() {
  const tags = useQuery(api.posts.tagCounts, {});
  const posts = useJournal();

  return (
    <SiteShell>
      <section className="border-b-2 border-ink">
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="label text-[9px] text-muted-foreground">
              The archive — Index
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.96]">
              Browse by
              <br />
              <span className="inline-block -rotate-1 border-2 border-ink bg-lime px-2 pb-1 shadow-brutal">
                topic.
              </span>
            </h1>
          </div>
          <div className="font-serif text-xl leading-relaxed text-muted-foreground">
            <p>
              Every essay is filed under one or two working threads. Pick a thread
              and read it end to end, or scroll for the complete archive.
            </p>
            <p className="label mt-6 text-[9px] not-italic text-ink">
              {tags ? String(tags.length).padStart(2, "0") : "—"} topics ·{" "}
              {posts ? String(posts.length).padStart(2, "0") : "—"} essays
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(tags ?? []).map((tag, index) => (
            <Link
              key={tag.tag}
              to={tagPath(tag.tag)}
              className={cn(
                "group flex min-h-[168px] flex-col justify-between border-2 border-ink p-5 shadow-brutal-sm transition-all hover:-translate-y-1 hover:shadow-brutal",
                TAG_TONES[index % TAG_TONES.length],
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-serif text-lg italic text-ink/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid size-8 place-items-center border-2 border-ink bg-paper transition-colors group-hover:bg-ink group-hover:text-paper">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
              <div>
                <p className="font-display text-2xl leading-tight">{tag.tag}</p>
                <p className="label mt-2 text-[9px] text-ink/60">
                  {tag.count} {tag.count === 1 ? "essay" : "essays"}
                </p>
              </div>
            </Link>
          ))}
          {!tags &&
            [0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[168px] animate-pulse border-2 border-ink/20 bg-paper-deep"
              />
            ))}
        </div>
      </section>

      <section className="border-t-2 border-ink">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-4 border-ink pb-6">
            <div>
              <p className="label text-[9px] text-muted-foreground">Complete index</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">All essays</h2>
            </div>
            <p className="label text-[9px] text-muted-foreground">
              {posts ? String(posts.length).padStart(2, "0") : "—"} published
            </p>
          </div>

          {posts === undefined ? (
            <div className="space-y-6 py-8">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-28 animate-pulse border-b-2 border-ink/20 bg-paper-deep/60"
                />
              ))}
            </div>
          ) : (
            posts.map((post, index) => (
              <PostRow key={post._id} post={post} index={index} />
            ))
          )}
        </div>
      </section>
    </SiteShell>
  );
}
