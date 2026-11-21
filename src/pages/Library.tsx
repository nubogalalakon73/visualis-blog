import { SiteShell } from "@/components/site/SiteShell";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useResources, type LibraryResource } from "@/hooks/use-resources";
import { useMutation } from "convex/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const AUTH_HREF = `/auth?returnTo=${encodeURIComponent("/library")}`;

const STEPS = [
  {
    title: "Make an account",
    body: "A six-digit email code, or guest access if you just want the files. No newsletter.",
  },
  {
    title: "Open the shelf",
    body: "Every working file is free. Nothing is held back behind a second tier.",
  },
  {
    title: "Download and edit",
    body: "Plain Markdown and CSV. Open in Notion, Obsidian, Figma notes, or a spreadsheet.",
  },
];

export default function Library() {
  const resources = useResources();
  const { isAuthenticated, user } = useAuth();
  const download = useMutation(api.resources.download);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  async function handleDownload(resource: LibraryResource) {
    setBusySlug(resource.slug);
    setError(null);
    try {
      const file = await download({ slug: resource.slug });
      const blob = new Blob([file.content], { type: file.mimeType });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = file.fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      setDownloaded((current) => ({ ...current, [resource.slug]: true }));
    } catch (caught) {
      console.error("Download failed:", caught);
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not download that file. Try again.",
      );
    } finally {
      setBusySlug(null);
    }
  }

  return (
    <SiteShell>
      {/* Hero */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-14 sm:px-8 sm:py-18 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label border-2 border-ink bg-lime px-2.5 py-1.5 text-[9px]">
                Members&apos; shelf
              </span>
              <span className="label flex items-center gap-1.5 text-[9px] text-muted-foreground">
                <ShieldCheck className="size-3.5" />
                Free with an account
              </span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.5rem,5.4vw,4.4rem)] leading-[0.95]">
              Take the
              <br />
              <span className="mt-1.5 inline-block -rotate-1 border-2 border-ink bg-lime px-2.5 pb-1 shadow-brutal">
                working files.
              </span>
            </h1>

            <p className="mt-7 max-w-xl font-serif text-xl leading-relaxed text-ink/80">
              The grid specs, sprint agendas, type scales, and audit logs we use
              inside the studio — free to download for signed-in members. No
              gated upsell, no watermarked previews.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#shelf"
                className="label inline-flex items-center gap-2 border-2 border-ink bg-ink px-5 py-3.5 text-[10px] text-paper shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-lime hover:text-ink"
              >
                Browse the shelf
                <ArrowRight className="size-4" />
              </a>
              <span className="font-serif text-base italic text-muted-foreground">
                {resources ? `${resources.length} files and counting` : "Loading files…"}
              </span>
            </div>
          </div>

          {/* Access panel */}
          {isAuthenticated ? (
            <div className="border-2 border-ink bg-lime p-6 shadow-brutal-lg sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="label text-[9px]">Member access</p>
                <span className="grid size-9 place-items-center border-2 border-ink bg-paper">
                  <Check className="size-4" />
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl leading-tight">
                Downloads unlocked.
              </h2>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink/75">
                You are signed in{user?.email ? ` as ${user.email}` : ""}. Every
                file below is available in full.
              </p>
              <div className="mt-5 flex flex-col gap-2 border-t-2 border-ink pt-4">
                <Link
                  to="/studio"
                  className="label flex items-center justify-between gap-3 border-2 border-ink bg-paper px-3.5 py-3 text-[9px] transition-colors hover:bg-ink hover:text-paper"
                >
                  Open the writing studio
                  <ArrowUpRight className="size-3.5" />
                </Link>
                <p className="font-serif text-sm italic text-ink/60">
                  Files are plain text — your downloads are yours to keep.
                </p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-ink bg-ink p-6 text-paper shadow-brutal-lg sm:p-7">
              <p className="label text-[9px] text-lime">Free membership</p>
              <h2 className="mt-4 font-display text-3xl leading-tight">
                One account.
                <br />
                Every file.
              </h2>
              <ul className="mt-5 space-y-2.5 border-t border-paper/20 pt-5">
                {[
                  "All working files, no tiers",
                  "Members' essays and studio notes",
                  "Email code or instant guest access",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-serif text-lg text-paper/75"
                  >
                    <span className="mt-2 block size-2 shrink-0 bg-lime" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={AUTH_HREF}
                className="label mt-6 flex w-full items-center justify-center gap-2 border-2 border-paper bg-lime px-4 py-3.5 text-[10px] text-ink shadow-[4px_4px_0_0_#f5f2e9] transition-all hover:-translate-y-0.5"
              >
                Sign in to download
                <ArrowRight className="size-4" />
              </Link>
              <p className="mt-3 text-center font-serif text-sm italic text-paper/50">
                Already have an account? Same door.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Shelf */}
      <section id="shelf" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-4 border-ink pb-6">
            <div>
              <p className="label text-[9px] text-muted-foreground">
                The shelf — {isAuthenticated ? "unlocked" : "members only"}
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                Files worth stealing.
              </h2>
            </div>
            <p className="max-w-sm font-serif text-lg leading-relaxed text-muted-foreground">
              Every file is written by the studio, tested on real projects, and
              free to adapt for client work.
            </p>
          </div>

          {error && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-2 border-ink bg-coral px-4 py-3">
              <p className="font-sans text-sm">{error}</p>
              {!isAuthenticated && (
                <Link
                  to={AUTH_HREF}
                  className="label border-2 border-ink bg-paper px-3 py-2 text-[8px]"
                >
                  Sign in
                </Link>
              )}
            </div>
          )}

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {resources?.map((resource, index) => {
              const isBusy = busySlug === resource.slug;
              const isDone = downloaded[resource.slug];

              return (
                <article
                  key={resource.slug}
                  className="flex flex-col border-2 border-ink bg-card shadow-brutal-sm transition-shadow hover:shadow-brutal"
                >
                  <div className="flex items-center justify-between gap-3 border-b-2 border-ink bg-paper-deep/70 px-4 py-2.5">
                    <span className="label text-[8px]">
                      {String(index + 1).padStart(2, "0")} — {resource.category}
                    </span>
                    <span className="label flex items-center gap-1.5 text-[8px] text-muted-foreground">
                      {!isAuthenticated && <Lock className="size-3" />}
                      {resource.fileType.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-[24px] leading-[1.05]">
                      {resource.title}
                    </h3>
                    <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground">
                      {resource.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <p className="label truncate text-[8px] text-muted-foreground">
                        {resource.fileName}
                      </p>

                      {isAuthenticated ? (
                        <button
                          type="button"
                          onClick={() => void handleDownload(resource)}
                          disabled={isBusy}
                          className={`label mt-3 flex w-full items-center justify-between gap-2 border-2 border-ink px-4 py-3 text-[9px] transition-colors disabled:opacity-60 ${
                            isDone
                              ? "bg-lime"
                              : "bg-ink text-paper hover:bg-lime hover:text-ink"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isBusy ? (
                              <>
                                <Loader2 className="size-3.5 animate-spin" />
                                Preparing file…
                              </>
                            ) : isDone ? (
                              <>
                                <Check className="size-3.5" />
                                Downloaded — get it again
                              </>
                            ) : (
                              <>
                                <Download className="size-3.5" />
                                Download file
                              </>
                            )}
                          </span>
                          <ArrowUpRight className="size-3.5" />
                        </button>
                      ) : (
                        <Link
                          to={AUTH_HREF}
                          className="label mt-3 flex w-full items-center justify-between gap-2 border-2 border-ink bg-paper px-4 py-3 text-[9px] transition-colors hover:bg-ink hover:text-paper"
                        >
                          <span className="flex items-center gap-2">
                            <Lock className="size-3.5" />
                            Sign in to download
                          </span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            {!resources &&
              [0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse border-2 border-ink/20 bg-paper-deep"
                />
              ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y-2 border-ink bg-paper-deep/60">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-12 sm:px-8 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="label text-[9px] text-muted-foreground">How access works</p>
            <p className="font-serif text-base italic text-muted-foreground">
              Server-checked, not just hidden behind a lock icon.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="border-2 border-ink bg-paper p-5"
              >
                <span className="font-serif text-xl italic text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl">{step.title}</h3>
                <p className="mt-2 font-serif text-base leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 font-serif text-sm italic text-muted-foreground">
            Licence: free to use and adapt in client work. Please do not resell the
            files as templates.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
