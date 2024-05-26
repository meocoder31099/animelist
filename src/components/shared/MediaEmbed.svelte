<script lang="ts">
  // Import Types
  import type { Media, MediaType } from "@/types/anilistv2";

  // Import Libs
  import { onMount } from "svelte";
  import useMediaDetails from "@/hooks/useMediaDetails";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let mediaId: number;
  export let mediaType: MediaType;

  const mediaDetails = useMediaDetails({
    args: {
      id: mediaId,
      type: mediaType,
    },
  });

  let media: Media;

  onMount(() => {
    const unMediaDetailsStore = mediaDetails.subscribe(({ data }) => {
      if (!data) return;
      media = data;
    });

    return () => {
      unMediaDetailsStore();
    };
  });
</script>

{#if !!media}
  <span class="inline text-sm font-medium text-blue-400 bg-neutral-800 px-0.5 rounded">
    [{media.format || media.type}] - {media.title?.userPreferred}
  </span>
{/if}
