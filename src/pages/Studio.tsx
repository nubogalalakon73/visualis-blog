import { PostCover } from "@/components/blog/PostCover";
import { TagPill } from "@/components/blog/TagPill";
import { Brand } from "@/components/site/SiteShell";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { COVER_OPTIONS, formatDate, postPath } from "@/lib/journal";
import type { Id } from "@/convex/_generated/dataModel";
import type { FunctionReturnType } from "convex/server";
import { useMutation, useQuery } from "convex/react";
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  FileText,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

type StudioPost = FunctionReturnType<typeof api.posts.listAll>[number];
type Status = "draft" | "published";

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover: string;
  author: string;
  status: Status;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function wordCount(body: string) {
  return body.trim() ? body.trim().split(/\s+/).length : 0;
}

const emptyForm = (author: string): FormState => ({
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  cover: "lime",
  author,
  status: "draft",
});

export default function Studio() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const posts = useQuery(api.posts.listAll, {});
  const createPost = useMutation(api.posts.create);
  const updatePost = useMutation(api.posts.update);
  const removePost = useMutation(api.posts.remove);

  const defaultAuthor = user?.name || "Visualis Studio";
  const [selectedId, setSelectedId] = useState<Id<"posts"> | null>(null);
  const [form, setForm] = useState<FormState>(() => emptyForm(defaultAuthor));
  const [tagsText, setTagsText] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const initialised = useRef(false);

  const loadPost = (post: StudioPost) => {
    setSelectedId(post._id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: post.body,
      cover: post.cover,
      author: post.author,
      status: post.status,
    });
    setTagsText(post.tags.join(", "));
    setSlugTouched(true);
    setNotice(null);
    setError(null);
    setConfirmDelete(false);
  };

  useEffect(() => {
    if (initialised.current || posts === undefined) return;
    initialised.current = true;
    if (posts.length > 0) loadPost(posts[0]);
  }, [posts]);

  const selected = useMemo(
    () => posts?.find((post) => post._id === selectedId) ?? null,
    [posts, selectedId],
  );

  const publishedCount = posts?.filter((post) => post.status === "published").length ?? 0;
  const draftCount = posts?.filter((post) => post.status === "draft").length ?? 0;
  const words = wordCount(form.body);

  function startNewPost() {
    setSelectedId(null);
    setForm(emptyForm(defaultAuthor));
    setTagsText("");
    setSlugTouched(false);
    setNotice(null);
    setError(null);
    setConfirmDelete(false);
  }

  function updateForm<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setNotice(null);
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugTouched ? current.slug : slugify(value),
    }));
    setNotice(null);
  }

  async function save(status: Status) {
    setSaving(true);
    setError(null);
    setNotice(null);

    const tags = tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!form.title.trim()) {
      setError("Give the essay a title before saving.");
      setSaving(false);
      return;
    }
    if (!form.body.trim()) {
      setError("The essay needs a body before it can be saved.");
      setSaving(false);
      return;
    }

    try {
      if (selectedId) {
        await updatePost({
          id: selectedId,
          title: form.title,
          slug: form.slug || form.title,
          excerpt: form.excerpt,
          body: form.body,
          tags,
          cover: form.cover,
          author: form.author,
          status,
        });
        setNotice(
          status === "published"
            ? "Essay updated and live in the journal."
            : "Essay saved as a draft.",
        );
      } else {
        const id = await createPost({
          title: form.title,
          slug: form.slug || form.title,
          excerpt: form.excerpt,
          body: form.body,
          tags,
          cover: form.cover,
          author: form.author,
          status,
        });
        setSelectedId(id);
        setNotice(
          status === "published"
            ? "Essay published to the journal."
            : "Draft created. Publish it when it is ready.",
        );
      }
      setForm((current) => ({ ...current, status }));
      setSlugTouched(true);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not save the essay.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedId) return;
    setDeleting(true);
    setError(null);
    try {
      await removePost({ id: selectedId });
      setSelectedId(null);
      setForm(emptyForm(defaultAuthor));
      setTagsText("");
      setSlugTouched(false);
      setConfirmDelete(false);
      setNotice("Essay deleted.");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not delete the essay.",
      );
    } finally {
      setDeleting(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  const fieldClass =
    "w-full border-2 border-ink bg-paper px-3.5 py-2.5 font-sans text-sm outline-none transition-shadow placeholder:text-muted-foreground/60 focus:shadow-brutal-sm";

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-5">
            <Brand compact />
            <span className="label hidden border-l-2 border-ink/20 pl-5 text-[9px] text-muted-foreground sm:block">
              Studio — editorial desk
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="label hidden items-center gap-1.5 border-2 border-ink bg-paper px-3 py-2 text-[9px] transition-colors hover:bg-lime sm:flex"
            >
              View journal
              <ArrowUpRight className="size-3" />
            </Link>
            <span className="label hidden max-w-[160px] truncate text-[9px] text-muted-foreground lg:block">
              {user?.email ?? "Signed in"}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="label flex items-center gap-1.5 border-2 border-ink bg-paper px-3 py-2 text-[9px] transition-colors hover:bg-ink hover:text-paper"
            >
              <LogOut className="size-3" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] px-5 py-7 sm:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5">
          <div>
            <p className="label text-[9px] text-muted-foreground">
              Visualis journal — back office
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl">
              The editorial desk
            </h1>
          </div>
          <p className="max-w-md font-serif text-lg leading-snug text-muted-foreground">
            Draft an essay, give it a tag, and publish it straight to the journal.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[330px_minmax(0,1fr)] lg:items-start">
          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="grid grid-cols-2 border-2 border-ink bg-ink text-paper">
              <div className="border-r-2 border-paper/20 p-4">
                <p className="label text-[8px] text-lime">Published</p>
                <p className="mt-1.5 font-display text-4xl">{publishedCount}</p>
              </div>
              <div className="p-4">
                <p className="label text-[8px] text-lime">Drafts</p>
                <p className="mt-1.5 font-display text-4xl">{draftCount}</p>
              </div>
            </div>

            <div className="border-2 border-ink bg-card">
              <div className="flex items-center justify-between border-b-2 border-ink px-4 py-3">
                <p className="label text-[9px]">All essays</p>
                <button
                  type="button"
                  onClick={startNewPost}
                  className="label flex items-center gap-1 border-2 border-ink bg-lime px-2 py-1.5 text-[8px] shadow-brutal-sm transition-all hover:-translate-y-0.5"
                >
                  <Plus className="size-3" />
                  New
                </button>
              </div>

              <div className="max-h-[420px] overflow-y-auto">
                {posts === undefined && (
                  <div className="space-y-2 p-3">
                    {[0, 1, 2].map((item) => (
                      <div key={item} className="h-14 animate-pulse bg-paper-deep" />
                    ))}
                  </div>
                )}

                {posts?.length === 0 && (
                  <div className="p-5">
                    <p className="font-serif text-lg italic text-muted-foreground">
                      Nothing on the desk yet.
                    </p>
                    <button
                      type="button"
                      onClick={startNewPost}
                      className="label mt-3 border-2 border-ink bg-lime px-3 py-2 text-[8px]"
                    >
                      Write the first essay
                    </button>
                  </div>
                )}

                {posts?.map((post) => {
                  const active = post._id === selectedId;
                  return (
                    <button
                      key={post._id}
                      type="button"
                      onClick={() => loadPost(post)}
                      className={`group flex w-full flex-col gap-1.5 border-b border-ink/15 px-4 py-3.5 text-left transition-colors last:border-b-0 ${
                        active ? "bg-lime" : "hover:bg-paper-deep/60"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="label text-[8px] text-muted-foreground">
                          {formatDate(post.updatedAt)}
                        </span>
                        <span
                          className={`label border border-ink px-1.5 py-0.5 text-[7px] ${
                            post.status === "published" ? "bg-ink text-paper" : "bg-paper"
                          }`}
                        >
                          {post.status === "published" ? "Live" : "Draft"}
                        </span>
                      </span>
                      <span className="font-sans text-sm font-semibold leading-snug">
                        {post.title}
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="label border border-ink/30 px-1 py-0.5 text-[7px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-2 border-ink bg-paper-deep/70 p-4">
              <p className="label text-[8px] text-muted-foreground">Writing format</p>
              <p className="mt-2 font-serif text-base leading-relaxed text-ink/80">
                Blank lines separate blocks. Use <strong>##</strong> for a heading,{" "}
                <strong>&gt;</strong> for a pull quote, and <strong>-</strong> for a
                list. <strong>**bold**</strong> and <strong>_italic_</strong> work
                inline.
              </p>
            </div>
          </aside>

          {/* Editor */}
          <section className="border-2 border-ink bg-card shadow-brutal">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink bg-paper-deep/60 px-5 py-3">
              <div className="flex items-center gap-2">
                <FileText className="size-4" />
                <p className="label text-[9px]">
                  {selectedId ? "Editing essay" : "New essay"}
                </p>
                <span
                  className={`label border border-ink px-1.5 py-0.5 text-[7px] ${
                    form.status === "published" ? "bg-ink text-paper" : "bg-paper"
                  }`}
                >
                  {form.status === "published" ? "Live" : "Draft"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="label text-[8px] text-muted-foreground">
                  {words} {words === 1 ? "word" : "words"}
                </span>
                {selected?.status === "published" && (
                  <Link
                    to={postPath(selected.slug)}
                    className="label flex items-center gap-1 text-[8px] underline decoration-1 underline-offset-4 hover:bg-lime"
                  >
                    Open live
                    <ExternalLink className="size-3" />
                  </Link>
                )}
              </div>
            </div>

            <form
              className="space-y-6 p-5 sm:p-7"
              onSubmit={(event) => {
                event.preventDefault();
                void save("published");
              }}
            >
              {(notice || error) && (
                <div
                  className={`flex items-start gap-2 border-2 border-ink px-4 py-3 ${
                    error ? "bg-coral" : "bg-lime"
                  }`}
                  role="status"
                >
                  {error ? (
                    <span className="font-sans text-sm">{error}</span>
                  ) : (
                    <>
                      <Check className="mt-0.5 size-4 shrink-0" />
                      <span className="font-sans text-sm">{notice}</span>
                    </>
                  )}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_180px]">
                <div>
                  <label htmlFor="title" className="label text-[8px]">
                    Title
                  </label>
                  <input
                    id="title"
                    value={form.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    placeholder="An essay about something true"
                    className={`mt-2 ${fieldClass} font-serif text-2xl leading-tight`}
                  />

                  <label htmlFor="slug" className="label mt-4 block text-[8px]">
                    Slug
                  </label>
                  <div className="mt-2 flex items-stretch border-2 border-ink bg-paper focus-within:shadow-brutal-sm">
                    <span className="label flex items-center border-r-2 border-ink bg-paper-deep px-2.5 text-[8px] text-muted-foreground">
                      /posts/
                    </span>
                    <input
                      id="slug"
                      value={form.slug}
                      onChange={(event) => {
                        setSlugTouched(true);
                        updateForm("slug", slugify(event.target.value));
                      }}
                      placeholder="essay-slug"
                      className="w-full bg-transparent px-3 py-2.5 font-sans text-sm outline-none placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>

                <div>
                  <p className="label text-[8px]">Cover art</p>
                  <div className="mt-2">
                    <PostCover
                      cover={form.cover}
                      slug={form.slug || form.title || "preview"}
                      showCaption={false}
                      className="shadow-brutal-sm"
                    />
                  </div>
                  <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                    {COVER_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        aria-label={option.label}
                        aria-pressed={form.cover === option.value}
                        onClick={() => updateForm("cover", option.value)}
                        className={`h-7 border-2 border-ink transition-transform ${
                          form.cover === option.value
                            ? "ring-2 ring-ink ring-offset-2 ring-offset-card"
                            : "hover:-translate-y-0.5"
                        }`}
                        style={{
                          backgroundColor:
                            option.value === "ink"
                              ? "#131310"
                              : option.value === "lime"
                                ? "#dff25b"
                                : option.value === "sky"
                                  ? "#a9c6f5"
                                  : option.value === "coral"
                                    ? "#ff9e80"
                                    : option.value === "butter"
                                      ? "#ffd75e"
                                      : "#c9b8f5",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="excerpt" className="label text-[8px]">
                  Standfirst / excerpt
                </label>
                <textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(event) => updateForm("excerpt", event.target.value)}
                  rows={2}
                  placeholder="One or two sentences that make a reader want the next paragraph."
                  className={`mt-2 ${fieldClass} resize-y font-serif text-lg leading-relaxed`}
                />
              </div>

              <div>
                <label htmlFor="body" className="label text-[8px]">
                  Body
                </label>
                <textarea
                  id="body"
                  value={form.body}
                  onChange={(event) => updateForm("body", event.target.value)}
                  rows={16}
                  placeholder={"Start writing.\n\n## A section heading\n\nA paragraph with **emphasis** where it matters."}
                  className={`mt-2 ${fieldClass} resize-y font-serif text-[17px] leading-[1.7]`}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="tags" className="label text-[8px]">
                    Tags — comma separated
                  </label>
                  <input
                    id="tags"
                    value={tagsText}
                    onChange={(event) => setTagsText(event.target.value)}
                    placeholder="Typography, Process"
                    className={`mt-2 ${fieldClass}`}
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {tagsText
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                      .slice(0, 6)
                      .map((tag) => (
                        <TagPill key={tag} tag={tag} linked={false} />
                      ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="author" className="label text-[8px]">
                    Byline
                  </label>
                  <input
                    id="author"
                    value={form.author}
                    onChange={(event) => updateForm("author", event.target.value)}
                    className={`mt-2 ${fieldClass}`}
                  />
                  <p className="mt-2 font-serif text-sm italic text-muted-foreground">
                    Published under this name, with the studio as the desk.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t-2 border-ink pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row">
                  {form.status === "published" ? (
                    <>
                      <button
                        type="submit"
                        disabled={saving}
                        className="label inline-flex items-center justify-center gap-2 border-2 border-ink bg-lime px-5 py-3 text-[9px] shadow-brutal-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
                      >
                        {saving ? "Saving…" : "Update live essay"}
                      </button>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => void save("draft")}
                        className="label inline-flex items-center justify-center gap-2 border-2 border-ink bg-paper px-4 py-3 text-[9px] transition-colors hover:bg-paper-deep disabled:opacity-60"
                      >
                        Unpublish
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        disabled={saving}
                        className="label inline-flex items-center justify-center gap-2 border-2 border-ink bg-lime px-5 py-3 text-[9px] shadow-brutal-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
                      >
                        {saving ? "Publishing…" : "Publish essay"}
                      </button>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => void save("draft")}
                        className="label inline-flex items-center justify-center gap-2 border-2 border-ink bg-paper px-4 py-3 text-[9px] transition-colors hover:bg-paper-deep disabled:opacity-60"
                      >
                        Save draft
                      </button>
                    </>
                  )}
                </div>

                {selectedId && (
                  <div>
                    {confirmDelete ? (
                      <div className="flex flex-wrap items-center gap-2 border-2 border-ink bg-coral px-3 py-2">
                        <span className="label text-[8px]">Delete permanently?</span>
                        <button
                          type="button"
                          onClick={() => void handleDelete()}
                          disabled={deleting}
                          className="label border border-ink bg-ink px-2 py-1 text-[8px] text-paper disabled:opacity-60"
                        >
                          {deleting ? "Deleting…" : "Yes, delete"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(false)}
                          className="label border border-ink bg-paper px-2 py-1 text-[8px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(true)}
                        className="label inline-flex items-center gap-1.5 text-[8px] text-muted-foreground transition-colors hover:text-ink"
                      >
                        <Trash2 className="size-3" />
                        Delete essay
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
