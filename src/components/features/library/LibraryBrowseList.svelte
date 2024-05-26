<script lang="ts">
  // Import Types
  import { type PageArgs, type MediaArgs, MediaType } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import useLocalStorage from "@/hooks/useLocalStorage";

  // Import Components
  import MediaFetcher from "@/components/shared/MediaFetcher.svelte";

  export let type: string;
  export let status: string;

  let isReady: boolean = false;
  const args: PageArgs & MediaArgs & any = {
    id_in: undefined,
    type:
      type === "anime"
        ? MediaType.Anime
        : type === "manga"
        ? MediaType.Manga
        : undefined,
  };

  onMount(() => {
    const libraryLocalStorage = useLocalStorage<number[]>(
      `library_${type}_${status}`
    );
    const unsubscribelibraryLocalStorage = libraryLocalStorage.subscribe(
      (data) => {
        console.log("data", data);
        data && (args["id_in"] = data) && (isReady = true);
      }
    );

    setTimeout(() => {
      libraryLocalStorage.set([
        150672, 150075, 145139, 128893, 154965, 127230, 125367, 20996, 114129,
      ]);
    }, 5000);

    return () => {
      unsubscribelibraryLocalStorage();
    };
  });
</script>

{#if isReady}
  <MediaFetcher {args} />
{/if}
