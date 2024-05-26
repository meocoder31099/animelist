<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import {
    type Media,
    type MediaArgs,
    type PageArgs,
    MediaType,
  } from "@/types/anilist";

  // import Enum
  import { MediaSort } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import usePageMedia from "@/hooks/usePageMedia";

  // Import components
  import ScrollbarHozirontal from "../Utils/Scrollbar/ScrollbarHozirontal.svelte";
  import ListMediaVertical from "@/components/shared/ListMediaVertical.svelte";
  import ListMediaVerticalSkeleton from "@/components/skeletons/ListMediaVerticalSkeleton.svelte";

  export let name: string = "";
  export let type: MediaType = MediaType.Anime;
  export let isRanking: boolean = false;
  export let queryVariables: MediaArgs & PageArgs;

  const args = {
    type: type,
    sort: [MediaSort.Updated_at_desc],
    perPage: 20,
    ...queryVariables,
  };

  let isLoading: boolean = true;
  let isSuccess: boolean = false;
  let source: Maybe<Media[]> = null;
  const pageData = usePageMedia({
    args: args,
  });

  onMount(() => {
    // Subscribe to changes in pageData
    const pageData_unsubscribe = pageData.subscribe((value) => {
      // If there is no media data, return early
      const firstPage = value.data?.pages?.[0]?.media;
      if (!firstPage) return;
      source = firstPage;

      // Update isLoading and isSuccess variables
      isLoading = value.isLoading;
      isSuccess = value.isSuccess;

      // Return a function to unsubscribe from pageData when the component is destroyed
      return () => {
        pageData_unsubscribe();
      };
    });
  });
</script>

{#if !!name}
  <div class="flex flex-col mt-2">
    <div class="flex items-center px-2 md:px-6 lg:px-8 text-white">
      <div class="flex w-full mr-12">
        {#if isSuccess}
          <div class="flex w-full justify-between" in:fade|global>
            <div>
              <h2 class="text-lg md:text-xl lg:text-2xl 3xl:text-3xl font-bold">
                {name}
              </h2>
            </div>
          </div>
        {:else}
          <div class="h-8 w-44 rounded-lg bg-neutral-800 animate-pulse" />
        {/if}
      </div>
    </div>
  </div>
{/if}

{#if !!source}
  <ScrollbarHozirontal isNavigation={true} isSuccess={true}>
    <ListMediaVertical {source} {isRanking} />
  </ScrollbarHozirontal>
{:else if isLoading}
  <ScrollbarHozirontal>
    <ListMediaVerticalSkeleton numberChild={4} />
  </ScrollbarHozirontal>
{/if}
