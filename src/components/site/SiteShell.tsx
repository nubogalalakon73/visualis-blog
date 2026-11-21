import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const NAV = [
  { to: "/", label: "Journal" },
  { to: "/tags", label: "Tags" },
  { to: "/studio", label: "Studio" },
];

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span
        className={cn(
          "grid place-items-center border-2 border-ink bg-lime font-display leading-none shadow-brutal-sm transition-transform group-hover:-translate-y-0.5",
          compact ? "size-8 text-base" : "size-9 text-lg",
        )}
      >
        v
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif font-semibold italic tracking-[-0.02em]",
            compact ? "text-[22px]" : "text-[26px]",
          )}
        >
          visualis
        </span>
        <span className="label mt-1 text-[8px] tracking-[0.3em] text-muted-foreground">
          Design journal
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" || pathname.startsWith("/posts") : pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[76px] w-full max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        <Brand />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "label px-3 py-2 text-[10px] transition-colors",
                isActive(item.to)
                  ? "border-b-2 border-ink"
                  : "text-muted-foreground hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <Link
              to="/studio"
              className="label inline-flex items-center gap-2 border-2 border-ink bg-ink px-4 py-2.5 text-[10px] text-paper shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:bg-lime hover:text-ink"
            >
              Write a post
              <ArrowUpRight className="size-3.5" />
            </Link>
          ) : (
            <Link
              to="/studio"
              className="label inline-flex items-center gap-2 border-2 border-ink bg-lime px-4 py-2.5 text-[10px] shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper"
            >
              Open studio
              <ArrowUpRight className="size-3.5" />
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center border-2 border-ink bg-paper shadow-brutal-sm md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t-2 border-ink bg-paper px-5 py-4 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="label flex items-center justify-between border-b border-ink/20 py-3.5 text-[11px]"
              >
                {item.label}
                <ArrowUpRight className="size-4" />
              </Link>
            ))}
          </nav>
          <Link
            to="/studio"
            onClick={() => setOpen(false)}
            className="label mt-4 flex items-center justify-center gap-2 border-2 border-ink bg-lime px-4 py-3 text-[10px] shadow-brutal-sm"
          >
            {isAuthenticated ? "Write a post" : "Open studio"}
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      )}
    </header>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-ink bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-4xl font-semibold italic leading-none">
              visualis
              <span className="ml-2 inline-block align-top font-sans text-xs not-italic tracking-[0.2em] text-lime">
                .id
              </span>
            </p>
            <p className="mt-5 max-w-sm font-serif text-lg leading-relaxed text-paper/70">
              An independent design studio in Jakarta, writing about the decisions
              behind the work.
            </p>
            <a
              href="https://visualis.id"
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-6 inline-flex items-center gap-2 border-2 border-paper px-3.5 py-2 text-[10px] text-paper transition-colors hover:bg-lime hover:text-ink"
            >
              visualis.id
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <div>
            <p className="label text-[10px] text-lime">Read</p>
            <ul className="mt-4 space-y-3 font-serif text-lg">
              <li>
                <Link to="/" className="text-paper/80 transition-colors hover:text-lime">
                  The journal
                </Link>
              </li>
              <li>
                <Link to="/tags" className="text-paper/80 transition-colors hover:text-lime">
                  Browse tags
                </Link>
              </li>
              <li>
                <Link to="/studio" className="text-paper/80 transition-colors hover:text-lime">
                  Studio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label text-[10px] text-lime">Studio</p>
            <ul className="mt-4 space-y-3 font-serif text-lg">
              <li>
                <a
                  href="mailto:hello@visualis.id"
                  className="text-paper/80 transition-colors hover:text-lime"
                >
                  hello@visualis.id
                </a>
              </li>
              <li className="text-paper/50">Jakarta, Indonesia</li>
              <li className="text-paper/50">Mon – Fri, 09.00–18.00 WIB</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-[9px] text-paper/50">
            © 2026 Visualis Studio — All rights reserved
          </p>
          <p className="label text-[9px] text-paper/50">
            Set in Archivo Black, Space Grotesk & Newsreader
          </p>
        </div>
      </div>
    </footer>
  );
}
