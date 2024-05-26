<script lang="ts">
  // Import Types
  import type { CharacterEdge } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import useMediaCharactersPageDetails from "@/hooks/useMediaCharactersPageDetails";

  // Import Components
  import CharacterCircleCard from "@/components/shared/CharacterCircleCard.svelte";
  import CharacterCircleCardSkeleton from "@/components/skeletons/CharacterCircleCardSkeleton.svelte";

  export let mediaId: number;

  let isSuccess: boolean = false;
  let edges: CharacterEdge[] = [];
  const PageData = useMediaCharactersPageDetails({
    args: {
      id: mediaId,
    },
  });

  const pageData_unsubscribe = PageData.subscribe((value) => {
    const pages = value.data?.pages;
    const firstPage = pages?.[0];
    if (
      !!firstPage?.edges?.length &&
      !value.isFetchingNextPage &&
      !edges.length
    ) {
      // Set data to edges
      edges = firstPage.edges;
    }

    isSuccess = !!value.isSuccess;
  });

  onMount(() => {
    return () => {
      pageData_unsubscribe();
    };
  });
</script>

{#if (!edges && !isSuccess) || (isSuccess && !!edges)}
  <div class="flex flex-col">
    <!-- Title -->
    <div>
      <h2 class="md:text-lg font-semibold">List of related Anime/Manga</h2>
    </div>
    <div class="w-full flex flex-col space-y-3 py-2 rounded-lg">
      <div
        class="w-full grid grid-cols-3 gap-x-3 gap-y-4 md:grid-cols-4 md:gap-4 xl:grid-cols-5 3xl:grid-cols-6 2xl:gap-6"
      >
        {#if !!edges}
          {#each edges as edge}
            <CharacterCircleCard source={edge} />
          {/each}
        {:else}
          {#each { length: 4 } as _, i}
            <div
              in:scale|global={{
                delay: 200 * i,
                start: 0.9,
              }}
            >
              <CharacterCircleCardSkeleton />
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}
