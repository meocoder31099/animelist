<script lang="ts">
  //Import Type
  import type { CharacterEdge } from "@/types/anilist";
  import type { Maybe } from "@/types";

  // Import Libs
  import { onMount } from "svelte";
  import useMediaCharactersPageDetails from "@/hooks/useMediaCharactersPageDetails";

  // Import Components
  import CharacterCircleCard from "@/components/shared/CharacterCircleCard.svelte";

  export let mediaID: number;

  let isLoading: boolean = true;
  let source: Maybe<CharacterEdge[]> = null;

  const data = useMediaCharactersPageDetails({
    args: {
      id: mediaID,
    },
  });

  onMount(() => {
    const unsubscribeData = data.subscribe((value) => {
      const edges = value.data?.pages?.[0]?.edges;
      if (edges?.length) source = edges.slice(0, 10);
      isLoading = !!value.isLoading;
    });

    return () => {
      unsubscribeData();
    };
  });
</script>

{#if !!source}
  <div class="w-full border-t-2 border-neutral-800" />
  <div class="w-full flex flex-col md:px-6 lg:px-12 pt-10 pb-6">
    <!-- Title -->
    <div class="w-full mb-6">
      <span class="text-2xl">List of characters</span>
    </div>
    <div class="w-full grid grid-cols-4 3xl:grid-cols-5 gap-y-10 gap-x-6">
      {#each source as edge}
        <CharacterCircleCard source={edge} />
      {/each}
    </div>
  </div>
{/if}
