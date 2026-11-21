import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef } from "react";

let seedRequested = false;

/**
 * Public post index with first-visit starter content.
 * The seed mutation is idempotent, so this is safe to mount on public pages.
 */
export function useJournal() {
  const posts = useQuery(api.posts.listPublished, {});
  const seed = useMutation(api.posts.seed);
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current || posts === undefined) return;
    attempted.current = true;
    if (posts.length === 0 && !seedRequested) {
      seedRequested = true;
      seed().catch((error) => {
        console.error("Could not seed the journal:", error);
      });
    }
  }, [posts, seed]);

  return posts;
}
