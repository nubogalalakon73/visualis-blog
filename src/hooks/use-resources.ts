import { api } from "@/convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef } from "react";

export type LibraryResource = FunctionReturnType<
  typeof api.resources.list
>[number];

let seedRequested = false;

/**
 * Public catalogue of member files. Metadata is public; file content is only
 * released by the download mutation after the server verifies a signed-in user.
 */
export function useResources() {
  const resources = useQuery(api.resources.list, {});
  const seed = useMutation(api.resources.seed);
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current || resources === undefined) return;
    attempted.current = true;
    if (resources.length === 0 && !seedRequested) {
      seedRequested = true;
      seed().catch((error) => {
        console.error("Could not seed the members' shelf:", error);
      });
    }
  }, [resources, seed]);

  return resources;
}
