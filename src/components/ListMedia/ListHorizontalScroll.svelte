<script lang="ts">
  // Import Libs
  import { convertToUrl, fetchPOST } from "../../utils";
  import { createQuery } from "@tanstack/svelte-query";
  import { aniListEndPoint, aniListqueryMedia } from "../../utils/aniList";
  import { fade } from "svelte/transition";

  //Import Stores
  import { isTouchDevice, isSideNavBar } from "../../stores/UserSettingStore";

  // Import components
  import ScrollbarHozirontal from "../Utils/Scrollbar/ScrollbarHozirontal.svelte";
  import CardHorizontal from "../Cards/CardHorizontal.svelte";

  export let name: string = "";
  export let id: string = "";
  export let type: string = "ANIME";
  export let isRank: boolean = false;
  export let queryVariables: any = {
    sort: ["SCORE_DESC", "FAVOURITES_DESC", "POPULARITY_DESC"],
    perPage: 12,
  };

  const listTrendingMangaQueryVariables = {
    type,
    ...queryVariables,
  };
  $: listManga = createQuery([id, type], () => {
    const data = fetchPOST(aniListEndPoint, {
      query: aniListqueryMedia,
      variables: listTrendingMangaQueryVariables,
    });

    return data;
  });
</script>

<div class="flex flex-col mt-2">
  <div class="flex items-center px-2 md:px-6 lg:px-8 text-white">
    <div class="flex mr-12">
      {#if $listManga.isSuccess}
        <div>
          <h2
            class="text-lg md:text-xl lg:text-2xl 3xl:text-3xl font-bold font-lexenddeca"
          >
            {name}
          </h2>
        </div>
      {:else}
        <div class="h-8 w-44 rounded bg-neutral-800 animate-pulse" />
      {/if}
    </div>
  </div>

  {#if $listManga.isSuccess}
    <ScrollbarHozirontal isNavigation={true} isSuccess={true}>
      {#each $listManga.data.data.Page.media as mangaData, i}
        <div
          in:fade|global={{
            delay: i * 200,
          }}
          class="w-1/2 md:w-1/3 lg:w-1/4 2xl:w-1/4 4xl:w-1/5 first:ml-2 md:first:ml-6 lg:first:ml-8 mr-2 sm:mr-2.5 md:mr-2 lg:md:mr-3 2xl:mr-3 3xl:mr-4 4xl:mr-5 shrink-0 relative"
          class:snap-start={!$isTouchDevice && $isSideNavBar}
          class:snap-end={!$isTouchDevice && !$isSideNavBar}
          class:lg:first:!ml-0={$isSideNavBar}
        >
          <CardHorizontal
            source={mangaData}
            {isRank}
            isLoading={false}
            to={`/${mangaData.type.toLowerCase()}/details/${convertToUrl(
              mangaData.title.userPreferred
            )}-an${mangaData.id}`}
            index={i}
          />
        </div>
      {/each}
    </ScrollbarHozirontal>
  {:else if $listManga.isLoading}
    <ScrollbarHozirontal>
      {#each { length: 4 } as _}
        <div
          class="w-1/2 md:w-1/3 lg:w-1/4 2xl:w-1/4 4xl:w-1/5 first:ml-2 md:first:ml-6 lg:first:ml-8 mr-2 sm:mr-2.5 md:mr-2 lg:md:mr-3 2xl:mr-3 3xl:mr-4 4xl:mr-5 shrink-0 relative"
          class:snap-start={!$isTouchDevice && $isSideNavBar}
          class:snap-end={!$isTouchDevice && !$isSideNavBar}
          class:lg:first:!ml-0={$isSideNavBar}
        >
          <CardHorizontal />
        </div>
      {/each}
    </ScrollbarHozirontal>
  {/if}
</div>
