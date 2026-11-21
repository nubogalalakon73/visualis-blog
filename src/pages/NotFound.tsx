import { SiteShell } from "@/components/site/SiteShell";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto flex w-full max-w-[1200px] flex-col px-5 py-16 sm:px-8 sm:py-24">
        <p className="label text-[9px] text-muted-foreground">
          Error 404 — Off the grid
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="font-display text-[clamp(4rem,14vw,9rem)] leading-[0.82]">
              4<span className="inline-block -rotate-6 border-2 border-ink bg-lime px-3 shadow-brutal">0</span>4
            </h1>
            <p className="mt-6 max-w-lg font-serif text-2xl leading-snug">
              This page missed its deadline. Nothing was ever filed under this
              address.
            </p>
          </div>

          <div className="border-2 border-ink bg-card p-6 shadow-brutal">
            <p className="label text-[9px] text-muted-foreground">
              What you can do
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="label flex items-center justify-between border-2 border-ink bg-lime px-4 py-3 text-[9px] shadow-brutal-sm transition-all hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="size-3.5" />
                  Back to the journal
                </span>
                <ArrowUpRight className="size-3.5" />
              </Link>
              <Link
                to="/tags"
                className="label flex items-center justify-between border-2 border-ink bg-paper px-4 py-3 text-[9px] transition-colors hover:bg-ink hover:text-paper"
              >
                Browse every topic
                <ArrowUpRight className="size-3.5" />
              </Link>
              <Link
                to="/studio"
                className="label flex items-center justify-between border-2 border-ink bg-paper px-4 py-3 text-[9px] transition-colors hover:bg-ink hover:text-paper"
              >
                Open the studio
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t-2 border-ink pt-5">
          <p className="font-serif text-lg italic text-muted-foreground">
            Visualis Journal — design notes, minus the decoration.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
