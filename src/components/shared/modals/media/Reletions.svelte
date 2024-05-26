<script lang="ts">
  //Import Type
  import type { MediaEdge } from "@/types/anilist";
  import type { Maybe } from "@/types";

  // Import Libs
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import useMediaRelationsDetails from "@/hooks/useMediaRelationsDetails";

  // Import Components
  import RelationsCard from "@/components/shared/RelationsCard.svelte";
  import RelationsCardSkeleton from "@/components/skeletons/RelationsCardSkeleton.svelte";

  export let mediaID: number;

  let isSuccess: boolean = false;
  let source: Maybe<MediaEdge[]> = null;

  const data = useMediaRelationsDetails({
    args: {
      id: mediaID,
    },
  });

  onMount(() => {
    const unsubscribeData = data.subscribe((value) => {
      const edges = value.data?.edges;
      if (edges?.length) source = edges.slice(0, 5);
      isSuccess = !!value.isSuccess;
    });

    return () => {
      unsubscribeData();
    };
  });
</script>

{#if (!source && !isSuccess) || (isSuccess && !!source)}
  <div class="w-full flex flex-col md:px-6 lg:px-12 pt-10 pb-6">
    <!-- Title -->
    <div class="w-full mb-6">
      <span class="text-2xl">List of related Anime/Manga</span>
    </div>
    <!-- Body -->
    <div class="w-full flex flex-col gap-y-6 gap-x-6">
      {#if !!source}
        {#each source as edge}
          <div in:fade>
            <RelationsCard
              relationType={edge.relationType || ""}
              source={edge.node}
            />
          </div>
        {/each}
      {:else}
        {#each { length: 3 } as _}
          <RelationsCardSkeleton />
        {/each}
      {/if}
    </div>
  </div>
{/if}
