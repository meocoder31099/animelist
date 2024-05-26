<script lang="ts">
  // Import Types
  import type { CardMediaVerticalOptions, Maybe } from "@/types";
  import type { MediaList } from "@/types/anilistv2";

  // Import Libs
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  // Import Stores
  import {
    UserMediaListCollectionStore,
    currentCollectionNameStore,
  } from "@/stores/UserMediaListCollectionStore";

  // Import Components
  import VerticalMediaListCollection from "@/components/shared/VerticalMediaListCollection.svelte";

  let mediaList: (MediaList & { cardOption: CardMediaVerticalOptions })[];

  onMount(() => {
    const unCurrentCollectionNameStore = currentCollectionNameStore.subscribe(
      (value) => {
        if (!!value) mediaList = get(UserMediaListCollectionStore)[value];
      }
    );

    return () => {
      unCurrentCollectionNameStore();
    };
  });
</script>

{#if !!mediaList}
  <VerticalMediaListCollection
    source={mediaList}
    gridColsAndGap="grid-cols-3 gap-x-1.5 gap-y-4 sm:gap-x-2.5 md:grid-cols-4 md:gap-2 lg:gap-x-3 lg:gap-y-6 xl:grid-cols-5 3xl:grid-cols-6 2xl:gap-x-4"
  />
{/if}
