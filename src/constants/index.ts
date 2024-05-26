// Import Types
import type { SvelteComponent } from "svelte";

const START_YEAR = 1940;
export const CURRENT_YEAR = new Date().getFullYear();

export const SEASON_YEARS = new Array(CURRENT_YEAR + 2 - START_YEAR)
  .fill(null)
  .map((_, index) => START_YEAR + index)
  .sort((a, b) => b - a);

export const DEFAULT_AVATAR = "";
export const DEFAULT_MEDIA_COVER_IMAGE = "";

// "_contextKey" is found at "@tanstack/svelte-query/src/context".
// It is not public and is subject to change at any time without notice.
// Be careful when using it.
export const QUERY_CONTEXT_KEY = "$$_queryClient";

export const ANILIST_MARKDOWN_COMPONENTS: Record<
  string,
  () => typeof SvelteComponent<any> | Promise<typeof SvelteComponent<any>>
> = {
  youtube: async () =>
    (await import("@/components/shared/YoutubeEmbed.svelte")).default,
  image: async () => (await import("@/components/shared/Image.svelte")).default,
  media: async () =>
    (await import("@/components/shared/MediaEmbed.svelte")).default,
  video: async () =>
    (await import("@/components/shared/VideoControl.svelte")).default,
};
