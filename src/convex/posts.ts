import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import type { MutationCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";

const statusValidator = v.union(v.literal("draft"), v.literal("published"));

const SEED_POSTS = [
  {
    title: "The grid is a promise, not a cage",
    slug: "the-grid-is-a-promise",
    excerpt:
      "A grid is not a cage for ideas. It is a promise that the reader will always know where to look next.",
    tags: ["Layout", "Process"],
    cover: "lime",
    author: "Rani Prameswari",
    readMinutes: 6,
    publishedAt: "2026-11-12",
    body: `Every layout begins with a small act of faith: that someone will give us ninety seconds of their attention. A grid is how we keep that promise. It is not a set of lines we obey, but an agreement about where things belong so a stranger can find their way without being told.

## Start with the reading order
Before we draw a single column, we write the page as a list: headline, standfirst, image, caption, proof, action. If the list does not make sense read aloud, no grid will rescue it. The columns come later, when we know which ideas deserve more room than others.

## A grid is a rhythm section
Twelve columns are popular because they divide in useful ways — halves, thirds, quarters. But the number matters less than the beat. On the Visualis site, eight columns hold the reading measure, while the outer two are allowed to go quiet. That silence is what makes the centre feel considered.

> A grid is not a cage. It is a promise that the reader will always know where to look next.

## Break it on purpose
Rules earn their keep when they are broken with reason. We let a headline cross two gutters when it is the only idea on the page. We pull a caption out of alignment when it must sit next to the image it describes. The break should read as emphasis, not accident. If a reader notices the system, it is usually because the system has stopped helping.

- **One idea per section.** If a section needs a subheading, it is probably two sections.
- **Three widths, no more.** Measure, wide, and full bleed. Every extra option becomes a late-night decision.
- **Test with the longest headline.** Real content is the only honest proof of a grid.

## What we actually ship
Our templates carry three widths: measure, wide, and full bleed. Three is enough. A grid that is easy to use is a grid that survives contact with real content.

The test is simple. Cover the design and ask whether the reading order still holds. If it does, the grid is doing its job — quietly, in the background, exactly where it belongs.`,
  },
  {
    title: "Type at the edge of legibility",
    slug: "type-at-the-edge-of-legibility",
    excerpt:
      "The best typography is not the loudest. It is the one that disappears at exactly the right moment.",
    tags: ["Typography", "Craft"],
    cover: "sky",
    author: "Dimas Aditya",
    readMinutes: 5,
    publishedAt: "2026-10-28",
    body: `Type has two lives. One is to be looked at; the other is to be read. Most of our arguments in the studio are about which life a particular line is living.

## Reading is a physical act
At 16px, a reader's eye lands four to seven times per line. Too wide, and the return sweep gets lost. Too tight, and the line breaks in the middle of an idea. We set body copy around 65 characters and let the rag fall naturally. A hard-flushed column looks tidy in a mockup and feels like a wall on a phone.

## Contrast is not just weight
A common instinct is to make the important thing bold. Do that everywhere and you have made nothing important. We prefer to build contrast from three dials at once: size, weight, and case. A small uppercase label can outrank a large light headline when it is placed correctly.

> Legibility is not the opposite of personality. It is the condition that lets personality be trusted.

## Set the small things well
Footnotes, captions, and form labels are where typography tells the truth. A studio that sets a beautiful cover but a careless error message has shown you its priorities. We keep a minimum size of 12px for anything a reader must act on, and we test every interface at 200% browser zoom.

## Let the typeface have an opinion
Our display face is heavy and blunt; our reading face is a serif with a little swing in the italic. They disagree, which is useful. The tension keeps a page from feeling like a template. The rule is that the disagreement must happen in the margins, never in the middle of a sentence.

Good type does not announce itself. It simply makes the next sentence easier to start.`,
  },
  {
    title: "Colour with a job to do",
    slug: "colour-with-a-job-to-do",
    excerpt:
      "A palette is not a mood board. It is a set of jobs — signal, separate, soften, stop.",
    tags: ["Color", "Systems"],
    cover: "coral",
    author: "Rani Prameswari",
    readMinutes: 4,
    publishedAt: "2026-10-09",
    body: `Most colour conversations start with a reference: a photograph, a fabric, a sunset. Ours start with a list of jobs.

## Four jobs, four decisions
Colour has to signal action, separate regions, soften a hard edge, and sometimes stop a reader completely. Those are different jobs, and they rarely want the same hue. We choose the action colour first, because it has to survive on top of every surface in the system.

## The 60–30–10 rule is a starting point
Paper, ink, and accent. If our interface works in greyscale, the accent is free to be loud. If it only works because of the accent, we have hidden a structural problem behind a nice green. The Visualis palette keeps one acid tone for emphasis and everything else in warm neutrals, so contrast is always a decision rather than a default.

> A palette becomes a system when you can name what each colour is for, not when you can name what it is.

## Contrast is legal as well as visual
We check text and interface colours against WCAG AA, then check them again on the cheapest laptop we can find. A lime that looks electric on an OLED screen can turn to dishwater on a five-year-old panel. Flat blocks of colour need generous borders and space around them to stay crisp.

## Budget your saturation
One saturated colour per view is usually enough. The mistake is letting every tag, badge, and illustration compete. In our studio, a colour has to win an argument to get used. Most of the time, black and paper do the work, and the accent gets one clear job: telling you where to go next.

Colour should feel inevitable after the fact, not impressive during the pitch.`,
  },
  {
    title: "Jakarta in four typefaces",
    slug: "jakarta-in-four-typefaces",
    excerpt:
      "What the city's signs teach us about density, improvisation, and the courage to be a little too much.",
    tags: ["Culture", "Typography"],
    cover: "butter",
    author: "Sari Wulandari",
    readMinutes: 7,
    publishedAt: "2026-09-21",
    body: `Jakarta is a city that sets type in a hurry. Shop signs are painted over, vinyl banners are reprinted, and every surface seems to carry at least two typefaces in an argument. It is the best typography classroom I know.

## Density is a local skill
Walk through Blok M at rush hour and you will see more information per square metre than most design systems allow. Warungs list everything they sell. Motorbike taxis stack numbers, arrows, and promotions on a single panel. The result should be chaos, but the hierarchy is often legible in under a second.

## Four voices worth studying
The first is the hand-painted warung sign: confident, slightly irregular, and built to be read from across the street. The second is the government notice: rigid, bureaucratic, and weirdly beautiful in its refusal to be friendly. The third is the mall poster, where a neutral geometric sans tries to sell you everything at once. The fourth is the type on old angkot windscreens — tiny, hand-lettered route names that assume you already know where you are going.

> The city does not ask permission to be visually loud. It asks whether you can find your way.

## What we borrow
We borrow the confidence of the painted sign: one message, big, no apology. We borrow the route card's economy: if a word can be cut, cut it. And we borrow the street's tolerance for mixed voices, as long as each one has a clear job.

## What we leave
We leave behind the clutter that comes from fear — the extra badge, the third font, the shadow behind the shadow. Local visual culture is not an excuse to skip editing. The best signs in this city are ruthless about what they leave out.

Designing in Jakarta means accepting that your work will share a wall with a hundred other messages. The least you can do is make yours worth the glance.`,
  },
  {
    title: "Motion that means something",
    slug: "motion-that-means-something",
    excerpt:
      "If an animation does not explain a change, it is probably decoration. Here is the test we use.",
    tags: ["Motion", "Craft"],
    cover: "lilac",
    author: "Dimas Aditya",
    readMinutes: 5,
    publishedAt: "2026-09-03",
    body: `Motion is the only part of an interface that gets to explain itself in time. Used well, it answers a question the reader did not know they had. Used badly, it makes them wait for the answer.

## Start with the change
Before we animate anything, we write down what changed: a panel opened, a filter applied, a page moved forward. If there is no change, there is no animation. A fade on a static heading is not delight; it is a delay with a nice curve.

## Duration has a budget
Most interface transitions should finish before a reader can start wondering about them: 150 to 250 milliseconds. Larger movements earn a little more, but only when they preserve context, like a card expanding into a page rather than a new page appearing from nowhere. The best duration is the one the reader does not notice.

> If the animation does not explain a change, it is probably decoration. Decoration is fine. Just do not call it usability.

## Movement needs a direction
Things enter from where they come from. A dropdown opens downward; a drawer comes from the edge it lives on. When direction contradicts spatial logic, the reader feels lost even if they cannot say why. We keep one easing family across the product and reserve springier curves for playful moments, never for confirmation dialogs.

## Test it at speed
We run interactions at 2× speed and with reduced-motion enabled. If the interface still makes sense, the motion was supporting the structure rather than carrying it. That is the bar. Motion should be the last thing you add and the first thing you cut when a page feels slow.

On a good day, nobody compliments the animation. They just find the product easy to use.`,
  },
  {
    title: "How we run a brand sprint in five days",
    slug: "five-day-brand-sprint",
    excerpt:
      "Five days, one room, no heroics. The schedule we use to move from a foggy brief to a defensible direction.",
    tags: ["Process", "Studio"],
    cover: "ink",
    author: "Rani Prameswari",
    readMinutes: 8,
    publishedAt: "2026-08-18",
    body: `A brand sprint is not a workshop with better snacks. It is a deadline that forces a team to stop describing possibilities and start making choices.

## Monday: the honest audit
We collect everything the brand currently says, not just the polished deck. Support emails, hiring posts, invoices, the way the founder answers a question on a call. The gap between the promised voice and the lived voice is usually where the work is.

## Tuesday: the argument
We write three positions, each one a sentence someone could disagree with. Safe positioning produces safe design. By the end of the day the room has to choose one position and write down what it costs. A direction without a cost is a slogan.

> The goal of the week is not a logo. It is a decision the team can defend on a Tuesday in three months.

## Wednesday: the proof
We design three small artefacts: a homepage, a launch post, and a single physical touchpoint. Small enough to finish, real enough to test. A brand that only works on a billboard has not been designed; it has been imagined.

## Thursday: the pressure test
We show the work to people outside the room: a customer, a new hire, someone who has never heard of the company. We ask what they think the brand does and who it is for. We write down the answers verbatim. Embarrassment is data.

## Friday: the cut
We keep one direction, kill two, and write a one-page decision record: what we chose, what we rejected, and what would make us change our minds. The record matters more than the deck. Decks get lost; decisions get inherited.

Five days is not enough to finish a brand. It is enough to stop guessing.`,
  },
  {
    title: "Neobrutalism grew up",
    slug: "neobrutalism-grew-up",
    excerpt:
      "Hard borders and flat colour are not a costume. Used with restraint, they make hierarchy unmistakable.",
    tags: ["Trends", "Craft"],
    cover: "sky",
    author: "Dimas Aditya",
    readMinutes: 4,
    publishedAt: "2026-08-02",
    body: `Every few years the internet rediscovers hard borders and flat colour. The first wave is always a parody: thick strokes, clashing primaries, a cursor that looks like a building. Then the style settles down and becomes useful.

## What the style is actually good at
Neobrutalism makes hierarchy physical. A border says this is a thing. A shadow says this thing sits above that thing. A flat colour says this block has one job. For interfaces with many small decisions — filters, tags, cards, states — that clarity is worth more than elegance.

## Minimalism is the restraint
The mistake is treating the style as an excuse for clutter. Thick borders everywhere cancel each other out. Offset shadows on every element turn a page into a rummage sale. The version we use is quieter: one ink, one paper, one accent, two border weights, and a strict rule that decoration never competes with the reading order.

> Brutalism without editing is just noise with a drop shadow. The minimalism is what makes the loud parts land.

## Where it struggles
Soft products suffer. A mental-health app and a skate brand do not need the same corners. Dense data tables suffer too, because every border adds a line the eye has to process. The style rewards content with a clear edge: essays, archives, catalogues, tools that want to feel like tools.

## The mature version
The mature version of neobrutalism is not a mood. It is a set of commitments: readable contrast, honest surfaces, visible hierarchy, and no fake depth. It says what it is and gets out of the way. That is also a decent definition of good editorial design.

Trends are useful when they give you a vocabulary for a decision you already wanted to make. The rest is costume.`,
  },
  {
    title: "Writing briefs designers can actually use",
    slug: "briefs-designers-can-use",
    excerpt:
      "Most briefs describe a feeling. A useful brief describes a decision. The difference is four short sections.",
    tags: ["Process", "Studio"],
    cover: "coral",
    author: "Sari Wulandari",
    readMinutes: 5,
    publishedAt: "2026-07-15",
    body: `Most briefs describe a feeling. A useful brief describes a decision. The difference is four short sections and the discipline to leave everything else out.

## 1. The job
One sentence, in plain language, about what this piece of work must do. Not "raise awareness" — every piece of work claims that. Something like: help a first-time visitor understand what we sell before they scroll past the first screen. If the job needs two sentences, it is probably two jobs.

## 2. The constraint that matters
There is always one constraint that shapes the answer: a date, a format, a legal requirement, a technical limit. Name it early and name it once. A brief that lists twenty constraints has not prioritised anything, and the designer will choose for you.

> A brief should make the work smaller. If it makes the work bigger, it is a wish list.

## 3. The evidence
Show what you know and say how you know it. Three customer quotes and one number beat a page of adjectives. If there is no evidence, say so. "We think our audience is young" is a hypothesis; write it down as one so it can be tested rather than designed around.

## 4. The definition of done
Describe what a good outcome looks like in a way someone could check. A page that a new customer can use without calling support. A deck a salesperson can present without editing. The definition does not need to be poetic. It needs to be usable on a Friday afternoon when everyone is tired.

## What to leave out
Leave out the mood words, the competitor screenshots, and the instruction to make it pop. Leave out the solution. The brief's job is to make the problem vivid, not to pre-draw the answer.

The best brief we ever received was eleven lines long. We still remember what it asked us to do.`,
  },
];

function toSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normaliseTags(tags: string[]) {
  const seen = new Set<string>();
  return tags
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0 && tag.length <= 24)
    .filter((tag) => {
      const key = tag.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 6);
}

function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

async function uniqueSlug(ctx: MutationCtx, raw: string, excludeId?: string) {
  const base = toSlug(raw) || "untitled";
  let candidate = base;
  let suffix = 2;

  for (;;) {
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", candidate))
      .first();
    if (!existing || existing._id === excludeId) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

/** Public post index. Drafts never appear here. */
export const listPublished = query({
  args: { tag: v.optional(v.string()) },
  handler: async (ctx, { tag }) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    const needle = tag?.trim().toLowerCase();
    const filtered = needle
      ? posts.filter((post) =>
          post.tags.some((item) => item.toLowerCase() === needle),
        )
      : posts;

    return filtered
      .sort((a, b) => b.publishedAt - a.publishedAt)
      .map(({ body: _body, authorId: _authorId, ...summary }) => summary);
  },
});

/** Every tag used by a published post, with counts. */
export const tagCounts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    const counts = new Map<string, { tag: string; count: number }>();
    for (const post of posts) {
      for (const tag of post.tags) {
        const key = tag.toLowerCase();
        const current = counts.get(key);
        if (current) current.count += 1;
        else counts.set(key, { tag, count: 1 });
      }
    }

    return Array.from(counts.values()).sort(
      (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
    );
  },
});

/** A single post. Drafts are visible to signed-in editors only. */
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!post) return null;
    if (post.status === "published") return post;

    const userId = await getAuthUserId(ctx);
    return userId ? post : null;
  },
});

/** Studio index: every post, drafts included. */
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const posts = await ctx.db.query("posts").collect();
    return posts.sort((a, b) => b.updatedAt - a.updatedAt);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    body: v.string(),
    tags: v.array(v.string()),
    cover: v.string(),
    author: v.string(),
    status: statusValidator,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Sign in to write a post.");

    const title = args.title.trim() || "Untitled post";
    const now = Date.now();
    const slug = await uniqueSlug(ctx, args.slug || title);

    return await ctx.db.insert("posts", {
      title,
      slug,
      excerpt: args.excerpt.trim(),
      body: args.body,
      tags: normaliseTags(args.tags),
      cover: args.cover,
      author: args.author.trim() || "Visualis Studio",
      readMinutes: readingMinutes(args.body),
      status: args.status,
      publishedAt: now,
      updatedAt: now,
      authorId: userId,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    body: v.string(),
    tags: v.array(v.string()),
    cover: v.string(),
    author: v.string(),
    status: statusValidator,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Sign in to edit a post.");

    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("That post no longer exists.");

    const title = args.title.trim() || "Untitled post";
    const slug = await uniqueSlug(ctx, args.slug || title, args.id);
    const now = Date.now();
    const firstPublish =
      existing.status === "draft" && args.status === "published";

    await ctx.db.patch(args.id, {
      title,
      slug,
      excerpt: args.excerpt.trim(),
      body: args.body,
      tags: normaliseTags(args.tags),
      cover: args.cover,
      author: args.author.trim() || "Visualis Studio",
      readMinutes: readingMinutes(args.body),
      status: args.status,
      publishedAt: firstPublish ? now : existing.publishedAt,
      updatedAt: now,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Sign in to delete a post.");
    const existing = await ctx.db.get(id);
    if (!existing) return;
    await ctx.db.delete(id);
  },
});

/**
 * Idempotent starter content. Safe to call from the client: it only writes
 * when the journal is empty, so the public site is never blank on first visit.
 */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("posts").take(1);
    if (existing.length > 0) return { seeded: 0 };

    let seeded = 0;
    for (const post of SEED_POSTS) {
      const publishedAt = new Date(`${post.publishedAt}T09:00:00Z`).getTime();
      await ctx.db.insert("posts", {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        tags: post.tags,
        cover: post.cover,
        author: post.author,
        readMinutes: post.readMinutes,
        status: "published",
        publishedAt,
        updatedAt: publishedAt,
      });
      seeded += 1;
    }
    return { seeded };
  },
});
