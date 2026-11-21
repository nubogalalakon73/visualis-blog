import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const SEED_RESOURCES = [
  {
    title: "The eight-column essay grid",
    slug: "eight-column-essay-grid",
    description:
      "Our working spec for long-form pages: three widths, two breakpoints, and the rules we refuse to break.",
    category: "Layout",
    fileType: "md" as const,
    fileName: "visualis-eight-column-grid.md",
    order: 1,
    content: `# Visualis — eight-column essay grid

A working spec for long-form editorial pages. Eight columns, three widths, two breakpoints.

## The frame
- Container: 1200px max width.
- Gutter: 24px between columns, 32px page margin on desktop, 20px on mobile.
- Columns: 8 equal columns.
- Reading measure: columns 2–7 (six columns) for body copy.
- Wide: columns 1–8 for covers, tables, and pull quotes.
- Full bleed: edge to edge, used once per page at most.

## Breakpoints
- 0–639px: one column, 20px margins, body copy 17–18px.
- 640–1023px: six columns, 24px margins.
- 1024px and up: eight columns, 1200px max width.

## Rules we keep
1. One idea per section. If a section needs a subheading, it is probably two sections.
2. A headline may cross two gutters when it is the only idea on the page.
3. Captions sit in the column nearest the image they describe.
4. No element is allowed to create a fourth width.
5. The accent colour never sets the reading order.

## Proof checklist
- [ ] Reading order still makes sense with all images removed.
- [ ] The longest headline in the archive still fits.
- [ ] Body measure stays between 60 and 75 characters.
- [ ] Page works at 200% browser zoom.
- [ ] Nothing important lives below the fold on a 13-inch laptop.

Prepared by the Visualis editorial desk. Use it, adapt it, credit is welcome but not required.
`,
  },
  {
    title: "Five-day brand sprint agenda",
    slug: "five-day-brand-sprint-agenda",
    description:
      "The schedule we use to move from a foggy brief to one defensible direction, including what to cut on Friday.",
    category: "Process",
    fileType: "md" as const,
    fileName: "visualis-five-day-brand-sprint.md",
    order: 2,
    content: `# Five-day brand sprint

A deadline, not a workshop. One room, one decision, one written record.

## Before Monday
- Invite five people maximum: a decision maker, a writer, a designer, someone close to customers, and a sceptic.
- Book a room with a wall you are allowed to cover in paper.
- Ask each person for one artefact that represents the brand today.

## Monday — honest audit
09:00 Collect every current touchpoint, not just the polished deck.
11:00 Read support emails, hiring posts, invoices, and call notes aloud.
14:00 List the gaps between the promised voice and the lived voice.
16:00 Write the one-page gap list.

Deliverable: a shared list of what is actually true.

## Tuesday — the argument
09:00 Write three positions, each a sentence someone could disagree with.
11:00 Argue for each position without defending your own.
14:00 Choose one position and write down what it costs.
16:00 Draft the proof we would need by Wednesday.

Deliverable: one chosen position, with its cost.

## Wednesday — the proof
09:00 Design three small artefacts: a homepage, a launch post, one physical touchpoint.
13:00 Finish one artefact completely instead of three halfway.
16:00 Prepare questions for Thursday, not a presentation.

Deliverable: work small enough to finish, real enough to test.

## Thursday — pressure test
09:00 Show the work to a customer, a new hire, and one outsider.
10:30 Ask: what do you think this brand does, and who is it for?
12:00 Record answers verbatim. Do not explain the work.
15:00 Identify the one misunderstanding that keeps repeating.

Deliverable: a list of misunderstandings, written in the audience's words.

## Friday — the cut
09:00 Keep one direction. Kill two. No hybrid.
11:00 Write the one-page decision record: chosen, rejected, and what would change our minds.
14:00 Assign owners for the first three applications.
16:00 Close the room.

Deliverable: a decision someone can defend in three months.

## What not to do
- Do not add a mood board without a decision attached.
- Do not present options you would not ship.
- Do not let the loudest person in the room choose the typeface.
`,
  },
  {
    title: "Editorial type scale",
    slug: "editorial-type-scale",
    description:
      "Sizes, line-heights, and family pairings for essays and interfaces, with the small-type rules that keep them readable.",
    category: "Typography",
    fileType: "md" as const,
    fileName: "visualis-editorial-type-scale.md",
    order: 3,
    content: `# Editorial type scale

Defaults for the Visualis journal. Built for reading first, presentation second.

## Families
- Display: Archivo Black, weight 400, tight tracking (-0.035em).
- Interface: Space Grotesk, weights 400 to 700.
- Reading: Newsreader, weights 300 to 600, italic available.

## Scale (desktop)
| Role | Family | Size | Line height | Tracking |
| --- | --- | --- | --- | --- |
| Page title | Display | 56–72px | 0.98 | -0.035em |
| Section title | Display | 32–40px | 1.05 | -0.03em |
| Standfirst | Serif | 22–24px | 1.5 | 0 |
| Body | Serif | 19px | 1.75 | 0 |
| Caption | Sans | 12px | 1.4 | 0.18em uppercase |
| Label | Sans | 10–11px | 1.3 | 0.18em uppercase |
| Button | Sans | 10px | 1 | 0.16em uppercase |

## Scale (mobile)
- Page title: 38–44px.
- Body: 17–18px, line height 1.7.
- Captions and labels: never below 11px.
- Anything a reader must act on: never below 12px.

## Rules
1. Body copy is set for 60–75 characters per line.
2. Build hierarchy from size, weight, and case together, not weight alone.
3. No more than two families visible on one screen, plus the display face for the single largest line.
4. Italic is for emphasis and editorial voice, not for whole paragraphs.
5. Left-aligned by default. Justify only when hyphenation is enabled and tested.

## Small-type test
Set the smallest label in the interface at 12px and read it on a phone in daylight. If you have to squint, the label is doing work it should not be doing.

## Accessibility
- Minimum contrast 4.5:1 for body text, 3:1 for large text (24px regular or 19px bold).
- Do not disable zoom. Test at 200%.
- Line length and spacing matter as much as ratio for readers with dyslexia.
`,
  },
  {
    title: "Tag taxonomy worksheet",
    slug: "tag-taxonomy-worksheet",
    description:
      "A spreadsheet-ready taxonomy for editorial tags, with definitions and when-to-use notes for each thread.",
    category: "Systems",
    fileType: "csv" as const,
    fileName: "visualis-tag-taxonomy.csv",
    order: 4,
    content: `group,tag,definition,use_when,avoid_when
Discipline,Typography,"Essays about type selection, setting, and legibility.","The main subject is type or letterforms.","Type is only mentioned in passing."
Discipline,Layout,"Grids, reading order, and page structure.","The essay explains spatial decisions.","The essay is a visual mood board."
Discipline,Color,"Palettes, contrast, and colour systems.","Colour choices carry the argument.","Colour is decorative only."
Discipline,Motion,"Transitions, timing, and interaction feedback.","The essay discusses change over time.","The motion is purely ornamental."
Discipline,Systems,"Design tokens, documentation, and governance.","The essay is about making decisions repeatable.","The essay is a single one-off project story."
Practice,Process,"Schedules, briefs, sprints, and collaboration.","The reader can reuse the method.","The essay is a client announcement."
Practice,Studio,"How Visualis works internally.","The essay is explicitly about our studio.","It is general industry commentary."
Context,Culture,"Design in a specific place or community.","Local context is the point.","Location is incidental."
Context,Trends,"Where a visual language is heading.","The essay makes a claim about change.","The essay is a tutorial."
Format,Notes,"Short observations and field notes.","The piece is under 600 words.","The piece is a full essay."
Format,Case study,"A documented project with outcomes.","There is a client, a brief, and a result.","The project cannot be shown publicly."
`,
  },
  {
    title: "Accessible colour audit log",
    slug: "accessible-colour-audit-log",
    description:
      "The CSV we fill in before any palette is approved: surface, usage, measured contrast, and the decision.",
    category: "Color",
    fileType: "csv" as const,
    fileName: "visualis-colour-audit.csv",
    order: 5,
    content: `pair_id,surface,foreground,usage,required_ratio,measured_ratio,passes,decision
01,"Paper #f5f2e9","Ink #131310","Body copy",4.5,15.8,yes,Ship
02,"Paper #f5f2e9","Muted #5d584c","Secondary copy",4.5,5.2,yes,Ship
03,"Lime #dff25b","Ink #131310","Accent block and links",4.5,12.4,yes,Ship
04,"Ink #131310","Paper #f5f2e9","Footer and dark panels",4.5,15.8,yes,Ship
05,"Ink #131310","Lime #dff25b","Labels on dark panels",4.5,12.4,yes,Ship
06,"Sky #a9c6f5","Ink #131310","Tag tiles",4.5,10.1,yes,Ship
07,"Coral #ff9e80","Ink #131310","Error and warning blocks",4.5,9.4,yes,Ship
08,"Paper #f5f2e9","Lime #dff25b","Decorative only",0,1.2,no,Do not use for text
09,"Sky #a9c6f5","Paper #f5f2e9","Do not use",4.5,1.6,no,Reject
10,"Ink #131310","Muted #5d584c","Disabled labels",3,2.1,no,Replace with Paper at 60 percent
`,
  },
  {
    title: "The one-page design brief",
    slug: "one-page-design-brief",
    description:
      "Four sections and a definition of done. The shortest brief we will accept, and the one we actually use.",
    category: "Process",
    fileType: "md" as const,
    fileName: "visualis-one-page-brief.md",
    order: 6,
    content: `# One-page design brief

Most briefs describe a feeling. A useful brief describes a decision.

## 1. The job
One sentence, in plain language, about what this work must do.

Example: Help a first-time visitor understand what we sell before they scroll past the first screen.

If the job needs two sentences, it is probably two jobs.

## 2. The constraint that matters
Name the single constraint that shapes the answer: a date, a format, a legal requirement, a technical limit.

Write it once. If you list twenty constraints, you have prioritised nothing.

## 3. The evidence
What do we know, and how do we know it?

- Three customer quotes, attributed and dated.
- One useful number, with its source.
- One hypothesis we are testing, labelled as a hypothesis.

If there is no evidence, say so.

## 4. The definition of done
Describe a good outcome in a way someone could check.

Example: A new customer can complete checkout without calling support.

Not: Make it feel premium.

## What to leave out
- Mood words.
- Competitor screenshots without commentary.
- The instruction to make it pop.
- The solution.

## Sign-off
- Owner:
- Decision maker:
- Date needed:
- What would make us change the brief:

The best brief we ever received was eleven lines long. We still remember what it asked us to do.
`,
  },
];

/**
 * Public catalogue. File content is deliberately omitted and only released by
 * the download mutation, which checks the signed-in member on the server.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    const resources = await ctx.db.query("resources").collect();
    return resources
      .sort((a, b) => a.order - b.order)
      .map(({ content: _content, ...rest }) => ({
        ...rest,
        unlocked: userId !== null,
      }));
  },
});

export const download = mutation({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Members only. Sign in to download this file.");
    }

    const resource = await ctx.db
      .query("resources")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!resource) throw new Error("That file is no longer available.");

    await ctx.db.patch(resource._id, {
      downloadCount: resource.downloadCount + 1,
    });

    return {
      fileName: resource.fileName,
      mimeType:
        resource.fileType === "csv"
          ? "text/csv;charset=utf-8"
          : "text/markdown;charset=utf-8",
      content: resource.content,
    };
  },
});

/** Idempotent starter files for the members' shelf. */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("resources").take(1);
    if (existing.length > 0) return { seeded: 0 };

    const updatedAt = Date.UTC(2026, 10, 10, 9);
    for (const resource of SEED_RESOURCES) {
      await ctx.db.insert("resources", {
        ...resource,
        downloadCount: 0,
        updatedAt,
      });
    }
    return { seeded: SEED_RESOURCES.length };
  },
});
