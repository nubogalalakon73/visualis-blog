import { PostCover } from "@/components/blog/PostCover";
import { PostRow } from "@/components/blog/PostRow";
import { TagPill } from "@/components/blog/TagPill";
import { SiteShell } from "@/components/site/SiteShell";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useJournal } from "@/hooks/use-journal";
import { useResources } from "@/hooks/use-resources";
import { formatDate, postPath, tagPath } from "@/lib/journal";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Download,
  Lock,
} from "lucide-react";
import { Link } from "react-router";

const TICKER = [
  "Type & typography",
  "Layout systems",
  "Colour with a job",
  "Studio process",
  "Jakarta design",
  "Motion with meaning",
];

const TAG_TONES = [
  "bg-lime",
  "bg-sky",
  "bg-coral",
  "bg-butter",
  "bg-lilac",
  "bg-paper-deep",
];

export default function Landing() {
  const posts = useJournal();
  const tags = useQuery(api.posts.tagCounts, {});
  const resources = useResources();
  const { isAuthenticated } = useAuth();
  const featured = posts?.[0];
  const rest = posts?.slice(1) ?? [];

  return (
    <SiteShell>
      {/* Hero */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="py-12 sm:py-16 lg:border-r-2 lg:border-ink lg:py-20 lg:pr-12"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="label border-2 border-ink bg-paper px-2.5 py-1.5 text-[9px]">
                  Est. 2019 — Jakarta
                </span>
                <span className="label flex items-center gap-1.5 text-[9px] text-muted-foreground">
                  <span className="size-2 animate-pulse bg-ink" />
                  Issue 07 · Nov 2026
                </span>
              </div>

              <h1 className="mt-8 font-display text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[0.94]">
                Design notes,
                <br />
                minus the
                <br />
                <span className="mt-1.5 inline-block -rotate-1 border-2 border-ink bg-lime px-2.5 pb-1 shadow-brutal">
                  decoration.
                </span>
              </h1>

              <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-ink/80 sm:text-[22px]">
                Essays on typography, layout, colour, and the craft of building
                visual systems — written from a small studio in Jakarta, published
                only when we have something worth saying.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#journal"
                  className="label inline-flex items-center justify-center gap-2 border-2 border-ink bg-ink px-5 py-3.5 text-[10px] text-paper shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-lime hover:text-ink"
                >
                  Read the journal
                  <ArrowRight className="size-4" />
                </a>
                <Link
                  to="/studio"
                  className="label inline-flex items-center justify-center gap-2 border-2 border-ink bg-paper px-5 py-3.5 text-[10px] shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper"
                >
                  Open the studio
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 border-t-2 border-ink pt-5">
                {[
                  {
                    value: posts ? String(posts.length).padStart(2, "0") : "—",
                    label: "Essays",
                  },
                  {
                    value: tags ? String(tags.length).padStart(2, "0") : "—",
                    label: "Topics",
                  },
                  { value: "01", label: "Studio" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl sm:text-4xl">{stat.value}</p>
                    <p className="label mt-1 text-[9px] text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Featured */}
            <div className="flex items-center pb-12 lg:py-16 lg:pl-12">
              {featured ? (
                <Link
                  to={postPath(featured.slug)}
                  className="group block w-full border-2 border-ink bg-card shadow-brutal-lg transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2.5 text-paper">
                    <span className="label text-[9px] text-lime">
                      Latest essay
                    </span>
                    <span className="label text-[9px] text-paper/70">
                      No. {String(posts?.length ?? 1).padStart(2, "0")}
                    </span>
                  </div>
                  <PostCover
                    cover={featured.cover}
                    slug={featured.slug}
                    showCaption={false}
                    className="border-x-0 border-t-0 border-b-2"
                  />
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <TagPill key={tag} tag={tag} linked={false} />
                      ))}
                    </div>
                    <h2 className="mt-4 font-display text-[27px] leading-[1.04] sm:text-[31px]">
                      {featured.title}
                    </h2>
                    <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground">
                      {featured.excerpt}
                    </p>
                    <div className="mt-6 flex items-end justify-between gap-4 border-t-2 border-ink pt-4">
                      <div>
                        <p className="label text-[9px]">{featured.author}</p>
                        <p className="label mt-1 text-[9px] text-muted-foreground">
                          {formatDate(featured.publishedAt)} · {featured.readMinutes} min
                        </p>
                      </div>
                      <span className="grid size-9 shrink-0 place-items-center border-2 border-ink bg-lime transition-colors group-hover:bg-ink group-hover:text-paper">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="w-full animate-pulse border-2 border-ink/30 bg-paper-deep">
                  <div className="h-3 border-b-2 border-ink/20" />
                  <div className="aspect-[4/3]" />
                  <div className="space-y-3 border-t-2 border-ink/20 p-6">
                    <div className="h-6 w-3/4 bg-ink/10" />
                    <div className="h-4 w-full bg-ink/10" />
                    <div className="h-4 w-2/3 bg-ink/10" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-b-2 border-ink bg-ink py-3 text-paper">
        <div className="flex w-max animate-ticker items-center gap-6 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-6" aria-hidden={copy === 1}>
              {TICKER.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center gap-6">
                  <span className="label text-[10px] tracking-[0.24em] text-paper/85">
                    {item}
                  </span>
                  <Asterisk className="size-3.5 text-lime" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Journal index */}
      <section id="journal" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b-4 border-ink pb-6">
            <div>
              <p className="label text-[9px] text-muted-foreground">The index</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                Latest writing
              </h2>
            </div>
            <Link
              to="/tags"
              className="label inline-flex items-center gap-2 border-2 border-ink bg-paper px-4 py-2.5 text-[9px] shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:bg-lime"
            >
              Browse by tag
              <ArrowUpRight className="size-3.5" />
            </Link>
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
          ) : rest.length === 0 ? (
            <div className="border-b-2 border-ink py-14 text-center">
              <p className="font-serif text-2xl italic text-muted-foreground">
                The first essay is being set in type.
              </p>
            </div>
          ) : (
            rest.map((post, index) => (
              <PostRow key={post._id} post={post} index={index + 1} />
            ))
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 py-6">
            <p className="font-serif text-lg italic text-muted-foreground">
              New essays every other Thursday.
            </p>
            <Link
              to="/tags"
              className="label inline-flex items-center gap-2 text-[10px] underline decoration-2 underline-offset-4 hover:bg-lime"
            >
              View the full archive
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="border-y-2 border-ink bg-paper-deep/60">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="label text-[9px] text-muted-foreground">Filed under</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                Read by topic
              </h2>
            </div>
            <p className="max-w-sm font-serif text-lg leading-relaxed text-muted-foreground">
              Six running threads across the journal, from type to studio process.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(tags ?? []).map((tag, index) => (
              <Link
                key={tag.tag}
                to={tagPath(tag.tag)}
                className={cn(
                  "group flex items-center justify-between gap-4 border-2 border-ink px-5 py-5 shadow-brutal-sm transition-all hover:-translate-y-1 hover:shadow-brutal",
                  TAG_TONES[index % TAG_TONES.length],
                )}
              >
                <div>
                  <p className="font-display text-xl">{tag.tag}</p>
                  <p className="label mt-1.5 text-[9px] text-ink/60">
                    {tag.count} {tag.count === 1 ? "essay" : "essays"}
                  </p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center border-2 border-ink bg-paper transition-colors group-hover:bg-ink group-hover:text-paper">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            ))}
            {!tags && (
              <div className="h-24 animate-pulse border-2 border-ink/20 bg-paper" />
            )}
          </div>
        </div>
      </section>

      {/* Members' shelf */}
      <section className="border-t-2 border-ink">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="label text-[9px] text-muted-foreground">
                For members — downloads
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                The working shelf.
              </h2>
              <p className="mt-4 max-w-md font-serif text-lg leading-relaxed text-muted-foreground">
                Grid specs, sprint agendas, type scales, and colour audit logs.
                Free with an account, delivered as plain text you can edit.
              </p>
              <Link
                to="/library"
                className="label mt-6 inline-flex items-center gap-2 border-2 border-ink bg-ink px-5 py-3.5 text-[10px] text-paper shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-lime hover:text-ink"
              >
                Browse the shelf
                <ArrowUpRight className="size-4" />
              </Link>
              <p className="mt-3 font-serif text-sm italic text-muted-foreground">
                {isAuthenticated
                  ? "Your member access is active."
                  : "Sign in — or continue as a guest — to unlock every file."}
              </p>
            </div>

            <div className="border-2 border-ink bg-card shadow-brutal-sm">
              <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2.5 text-paper">
                <span className="label text-[9px] text-lime">Members&apos; shelf</span>
                <span className="label text-[9px] text-paper/70">
                  {resources ? `${resources.length} files` : "Loading…"}
                </span>
              </div>
              {resources ? (
                resources.slice(0, 4).map((resource, index) => (
                  <Link
                    key={resource.slug}
                    to="/library"
                    className="flex items-center justify-between gap-4 border-b border-ink/15 px-4 py-3.5 transition-colors last:border-b-0 hover:bg-paper-deep/60"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="label shrink-0 text-[8px] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-sans text-sm font-semibold">
                          {resource.title}
                        </p>
                        <p className="label mt-1 text-[8px] text-muted-foreground">
                          {resource.category} · .{resource.fileType}
                        </p>
                      </div>
                    </div>
                    <span className="grid size-8 shrink-0 place-items-center border-2 border-ink bg-paper">
                      {isAuthenticated ? (
                        <Download className="size-3.5" />
                      ) : (
                        <Lock className="size-3.5" />
                      )}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="space-y-2 p-3">
                  {[0, 1, 2].map((item) => (
                    <div key={item} className="h-12 animate-pulse bg-paper-deep" />
                  ))}
                </div>
              )}
              <Link
                to="/library"
                className="label flex items-center justify-between gap-2 border-t-2 border-ink bg-lime px-4 py-3 text-[9px] transition-colors hover:bg-ink hover:text-paper"
              >
                Browse the full shelf
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Studio CTA */}
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative overflow-hidden border-2 border-ink bg-ink px-6 py-12 text-paper shadow-brutal-lg sm:px-12 sm:py-16">
          <div className="pattern-rule absolute right-0 top-0 h-full w-24 opacity-20 sm:w-40" />
          <div className="relative max-w-2xl">
            <p className="label text-[9px] text-lime">Inside the studio</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02]">
              The journal is written in the open.
            </h2>
            <p className="mt-5 max-w-xl font-serif text-xl leading-relaxed text-paper/70">
              Sign in to the Visualis studio to draft an essay, file it under a
              tag, and publish it to this page. Guest access is available if you
              just want a look around.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/studio"
                className="label inline-flex items-center justify-center gap-2 border-2 border-paper bg-lime px-5 py-3.5 text-[10px] text-ink shadow-[4px_4px_0_0_#f5f2e9] transition-all hover:-translate-y-0.5"
              >
                Start a draft
                <ArrowUpRight className="size-4" />
              </Link>
              <a
                href="https://visualis.id"
                target="_blank"
                rel="noopener noreferrer"
                className="label inline-flex items-center justify-center gap-2 border-2 border-paper px-5 py-3.5 text-[10px] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                See the studio&apos;s work
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
