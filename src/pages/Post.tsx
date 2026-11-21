import { PostBody } from "@/components/blog/PostBody";
import { PostCover } from "@/components/blog/PostCover";
import { TagPill } from "@/components/blog/TagPill";
import { SiteShell } from "@/components/site/SiteShell";
import { api } from "@/convex/_generated/api";
import {
  formatDate,
  formatMonthYear,
  postPath,
  tagPath,
  type PostSummary,
} from "@/lib/journal";
import { useQuery } from "convex/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router";

function PostMissing() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start px-5 py-24 sm:px-8">
      <p className="label text-[9px] text-muted-foreground">404 — Missing essay</p>
      <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02]">
        This page went to print without us.
      </h1>
      <p className="mt-5 max-w-lg font-serif text-xl leading-relaxed text-muted-foreground">
        The essay may have been renamed or retired. The rest of the journal is
        still where you left it.
      </p>
      <Link
        to="/"
        className="label mt-8 inline-flex items-center gap-2 border-2 border-ink bg-lime px-5 py-3.5 text-[10px] shadow-brutal transition-all hover:-translate-y-0.5"
      >
        <ArrowLeft className="size-4" />
        Back to the journal
      </Link>
    </div>
  );
}

function RelatedCard({ post }: { post: PostSummary }) {
  return (
    <Link
      to={postPath(post.slug)}
      className="group flex flex-col border-2 border-ink bg-card transition-all hover:-translate-y-1 hover:shadow-brutal"
    >
      <PostCover
        cover={post.cover}
        slug={post.slug}
        showCaption={false}
        className="border-x-0 border-t-0"
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="label text-[9px] text-muted-foreground">
          {formatDate(post.publishedAt)}
        </p>
        <h3 className="mt-3 font-display text-xl leading-tight">{post.title}</h3>
        <p className="mt-2 font-serif text-base leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <span className="label mt-5 flex items-center gap-1.5 text-[9px] group-hover:underline">
          Read essay
          <ArrowUpRight className="size-3" />
        </span>
      </div>
    </Link>
  );
}

export default function Post() {
  const { slug = "" } = useParams();
  const post = useQuery(api.posts.getBySlug, slug ? { slug } : "skip");
  const posts = useQuery(api.posts.listPublished, {});

  if (post === undefined) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-[1000px] animate-pulse px-5 py-16 sm:px-8">
          <div className="h-4 w-32 bg-ink/10" />
          <div className="mt-8 h-16 w-4/5 bg-ink/10" />
          <div className="mt-4 h-16 w-3/5 bg-ink/10" />
          <div className="mt-10 aspect-[2/1] border-2 border-ink/20 bg-paper-deep" />
          <div className="mt-10 space-y-4">
            <div className="h-4 w-full bg-ink/10" />
            <div className="h-4 w-11/12 bg-ink/10" />
            <div className="h-4 w-3/4 bg-ink/10" />
          </div>
        </div>
      </SiteShell>
    );
  }

  if (post === null) {
    return (
      <SiteShell>
        <PostMissing />
      </SiteShell>
    );
  }

  const index = posts?.findIndex((item) => item.slug === post.slug) ?? -1;
  const next = posts && index >= 0 ? posts[index + 1] : undefined;
  const related = (posts ?? [])
    .filter(
      (item) =>
        item.slug !== post.slug &&
        item.tags.some((tag) =>
          post.tags.some((own) => own.toLowerCase() === tag.toLowerCase()),
        ),
    )
    .slice(0, 2);

  return (
    <SiteShell>
      <div className="border-b-2 border-ink">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="label flex items-center gap-2 text-[9px]">
            <Link to="/" className="hover:underline">
              Journal
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              to={post.tags[0] ? tagPath(post.tags[0]) : "/tags"}
              className="text-muted-foreground hover:text-ink hover:underline"
            >
              {post.tags[0] ?? "Essay"}
            </Link>
          </div>
          <Link
            to="/"
            className="label flex items-center gap-1.5 text-[9px] text-muted-foreground hover:text-ink"
          >
            <ArrowLeft className="size-3" />
            All essays
          </Link>
        </div>
      </div>

      <article>
        <header className="mx-auto w-full max-w-[1000px] px-5 pt-12 sm:px-8 sm:pt-16">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagPill key={tag} tag={tag} tone="lime" />
            ))}
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.3rem,5.6vw,4.4rem)] leading-[0.98]">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground sm:text-[24px]">
            {post.excerpt}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-y-2 border-ink py-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center border-2 border-ink bg-lime font-display text-sm">
                {post.author.charAt(0)}
              </span>
              <div>
                <p className="label text-[9px]">{post.author}</p>
                <p className="label mt-0.5 text-[8px] text-muted-foreground">
                  Visualis Studio
                </p>
              </div>
            </div>
            <div className="h-8 w-px bg-ink/20" />
            <div>
              <p className="label text-[9px]">{formatDate(post.publishedAt)}</p>
              <p className="label mt-0.5 text-[8px] text-muted-foreground">
                {post.readMinutes} min read
              </p>
            </div>
            <div className="hidden h-8 w-px bg-ink/20 sm:block" />
            <p className="label hidden text-[8px] text-muted-foreground sm:block">
              Essay — Visualis Journal, Issue 07
            </p>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1000px] px-5 pt-10 sm:px-8">
          <PostCover
            cover={post.cover}
            slug={post.slug}
            className="aspect-[16/10] shadow-brutal-lg sm:aspect-[2/1]"
          />
        </div>

        <div className="mx-auto grid w-full max-w-[1100px] gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:py-16">
          <div className="max-w-[68ch]">
            <PostBody body={post.body} />

            <div className="mt-12 flex flex-wrap gap-2 border-t-2 border-ink pt-6">
              {post.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          </div>

          <aside className="space-y-5 self-start lg:sticky lg:top-28">
            <div className="border-2 border-ink bg-card p-5 shadow-brutal-sm">
              <p className="label text-[8px] text-muted-foreground">Written by</p>
              <p className="mt-2 font-serif text-2xl italic">{post.author}</p>
              <p className="mt-2 font-serif text-base leading-relaxed text-muted-foreground">
                Part of the Visualis editorial desk — notes from the studio floor,
                not the pitch deck.
              </p>
            </div>

            <div className="border-2 border-ink bg-lime p-5">
              <p className="label text-[8px]">Filed under</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} tone="ink" />
                ))}
              </div>
            </div>

            <div className="border-2 border-ink p-5">
              <p className="label text-[8px] text-muted-foreground">Published</p>
              <p className="mt-2 font-serif text-lg">
                {formatMonthYear(post.publishedAt)}
              </p>
              <p className="mt-3 font-serif text-base text-muted-foreground">
                {post.readMinutes} minute read
              </p>
            </div>

            <Link
              to="/studio"
              className="label flex items-center justify-between border-2 border-ink bg-ink px-5 py-4 text-[9px] text-paper transition-colors hover:bg-lime hover:text-ink"
            >
              Write in the studio
              <ArrowUpRight className="size-3.5" />
            </Link>
          </aside>
        </div>

        {next && (
          <div className="border-y-2 border-ink bg-lime">
            <Link
              to={postPath(next.slug)}
              className="group mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-8"
            >
              <div>
                <p className="label text-[9px]">Next essay</p>
                <p className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
                  {next.title}
                </p>
              </div>
              <span className="grid size-12 shrink-0 place-items-center border-2 border-ink bg-paper transition-colors group-hover:bg-ink group-hover:text-paper">
                <ArrowRight className="size-5" />
              </span>
            </Link>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex items-end justify-between border-b-4 border-ink pb-6">
            <h2 className="font-display text-3xl sm:text-4xl">Keep reading</h2>
            <Link
              to="/tags"
              className="label text-[9px] underline decoration-2 underline-offset-4 hover:bg-lime"
            >
              Browse the archive
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <RelatedCard key={item._id} post={item} />
            ))}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
