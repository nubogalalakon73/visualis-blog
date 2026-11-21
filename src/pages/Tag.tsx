import { PostRow } from "@/components/blog/PostRow";
import { SiteShell } from "@/components/site/SiteShell";
import { api } from "@/convex/_generated/api";
import { useJournal } from "@/hooks/use-journal";
import { tagPath } from "@/lib/journal";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router";

const TAG_TONES = ["bg-lime", "bg-sky", "bg-coral", "bg-butter", "bg-lilac"];

function normalise(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export default function Tag() {
  const params = useParams();
  const requested = normalise(decodeURIComponent(params.tag ?? ""));
  const posts = useJournal();
  const tags = useQuery(api.posts.tagCounts, {});

  const tagged = (posts ?? []).filter((post) =>
    post.tags.some((tag) => normalise(tag) === requested),
  );

  const canonical =
    (posts ?? [])
      .flatMap((post) => post.tags)
      .find((tag) => normalise(tag) === requested) ??
    requested.replace(/-/g, " ");

  const tagIndex = (tags ?? []).findIndex((item) => normalise(item.tag) === requested);
  const tone = TAG_TONES[Math.max(0, tagIndex) % TAG_TONES.length];

  return (
    <SiteShell>
      <div className="border-b-2 border-ink">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            to="/tags"
            className="label flex items-center gap-1.5 text-[9px] text-muted-foreground hover:text-ink"
          >
            <ArrowLeft className="size-3" />
            All topics
          </Link>
          <Link
            to="/"
            className="label text-[9px] text-muted-foreground hover:text-ink hover:underline"
          >
            The journal
          </Link>
        </div>
      </div>

      <section className="border-b-2 border-ink">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
          <p className="label text-[9px] text-muted-foreground">Filed under</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.96]">
              <span
                className={cn(
                  "inline-block -rotate-1 border-2 border-ink px-3 pb-1.5 capitalize shadow-brutal",
                  tone,
                )}
              >
                {canonical}
              </span>
            </h1>
            <p className="label pb-2 text-[9px] text-muted-foreground">
              {posts === undefined
                ? "Loading essays…"
                : `${String(tagged.length).padStart(2, "0")} ${
                    tagged.length === 1 ? "essay" : "essays"
                  } in this thread`}
            </p>
          </div>
          <p className="mt-7 max-w-xl font-serif text-xl leading-relaxed text-muted-foreground">
            Notes filed under {canonical}, newest first. Read straight through, or
            jump to another thread below.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-8 sm:py-12">
        {posts === undefined ? (
          <div className="space-y-6">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse border-b-2 border-ink/20 bg-paper-deep/60"
              />
            ))}
          </div>
        ) : tagged.length === 0 ? (
          <div className="border-2 border-ink bg-card p-8 shadow-brutal-sm sm:p-12">
            <h2 className="font-display text-2xl sm:text-3xl">
              No essays under this tag yet.
            </h2>
            <p className="mt-3 max-w-md font-serif text-lg text-muted-foreground">
              The thread exists in the studio but has not been published. Browse
              the rest of the archive in the meantime.
            </p>
            <Link
              to="/tags"
              className="label mt-7 inline-flex items-center gap-2 border-2 border-ink bg-lime px-4 py-3 text-[9px] shadow-brutal-sm"
            >
              Back to all topics
              <ArrowLeft className="size-3.5" />
            </Link>
          </div>
        ) : (
          tagged.map((post, index) => (
            <PostRow key={post._id} post={post} index={index} />
          ))
        )}
      </section>

      <section className="border-t-2 border-ink bg-paper-deep/50">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-8">
          <p className="label text-[9px] text-muted-foreground">Other threads</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {(tags ?? [])
              .filter((item) => normalise(item.tag) !== requested)
              .map((item) => (
                <Link
                  key={item.tag}
                  to={tagPath(item.tag)}
                  className="label inline-flex items-center gap-2 border-2 border-ink bg-paper px-3.5 py-2.5 text-[9px] shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:bg-lime"
                >
                  {item.tag}
                  <span className="text-muted-foreground">{item.count}</span>
                  <ArrowUpRight className="size-3" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
