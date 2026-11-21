import type { ReactNode } from "react";

const INLINE_PATTERN = /(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)]+\))/g;

function inline(text: string, keyPrefix: string): ReactNode[] {
  return text
    .split(INLINE_PATTERN)
    .filter((chunk) => chunk.length > 0)
    .map((chunk, index) => {
      const key = `${keyPrefix}-${index}`;

      if (chunk.startsWith("**") && chunk.endsWith("**")) {
        return (
          <strong key={key} className="font-semibold text-ink">
            {chunk.slice(2, -2)}
          </strong>
        );
      }
      if (chunk.startsWith("_") && chunk.endsWith("_")) {
        return (
          <em key={key} className="italic">
            {chunk.slice(1, -1)}
          </em>
        );
      }

      const link = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        return (
          <a
            key={key}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-2 underline-offset-4 hover:bg-lime"
          >
            {link[1]}
          </a>
        );
      }

      return <span key={key}>{chunk}</span>;
    });
}

export function PostBody({ body }: { body: string }) {
  const blocks = body.split(/\n{2,}/).filter((block) => block.trim().length > 0);

  return (
    <div className="font-serif text-[19px] leading-[1.75] text-ink/90">
      {blocks.map((block, index) => {
        const text = block.trim();
        const key = `block-${index}`;

        if (text.startsWith("### ")) {
          return (
            <h3 key={key} className="mt-10 mb-3 font-sans text-lg font-semibold">
              {inline(text.slice(4), key)}
            </h3>
          );
        }

        if (text.startsWith("## ")) {
          return (
            <h2
              key={key}
              className="mt-12 mb-4 border-t-2 border-ink pt-5 font-display text-[26px] leading-tight tracking-[-0.02em] md:text-[30px]"
            >
              {inline(text.slice(3), key)}
            </h2>
          );
        }

        if (text.startsWith("> ")) {
          return (
            <blockquote
              key={key}
              className="my-9 border-2 border-ink bg-lime px-6 py-5 font-serif text-[22px] italic leading-snug shadow-brutal-sm"
            >
              {inline(text.replace(/^>\s?/gm, ""), key)}
            </blockquote>
          );
        }

        if (text.startsWith("- ")) {
          const items = text
            .split("\n")
            .map((line) => line.replace(/^-\s?/, "").trim())
            .filter(Boolean);
          return (
            <ul key={key} className="my-7 space-y-3">
              {items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`} className="flex gap-3">
                  <span className="mt-2.5 block size-2 shrink-0 border border-ink bg-ink" />
                  <span>{inline(item, `${key}-${itemIndex}`)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (text === "---") {
          return <hr key={key} className="my-10 border-t-2 border-ink" />;
        }

        return (
          <p
            key={key}
            className={
              index === 0
                ? "mb-6 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[62px] first-letter:leading-[0.72]"
                : "mb-6"
            }
          >
            {inline(text, key)}
          </p>
        );
      })}
    </div>
  );
}
