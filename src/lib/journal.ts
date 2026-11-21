import { api } from "@/convex/_generated/api";
import type { FunctionReturnType } from "convex/server";

export type PostSummary = FunctionReturnType<
  typeof api.posts.listPublished
>[number];
export type PostDetail = NonNullable<
  FunctionReturnType<typeof api.posts.getBySlug>
>;

export function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatMonthYear(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export function tagPath(tag: string) {
  return `/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"))}`;
}

export function postPath(slug: string) {
  return `/posts/${slug}`;
}

export const COVER_OPTIONS = [
  { value: "lime", label: "Acid lime" },
  { value: "sky", label: "Sky" },
  { value: "coral", label: "Coral" },
  { value: "butter", label: "Butter" },
  { value: "lilac", label: "Lilac" },
  { value: "ink", label: "Ink" },
] as const;
