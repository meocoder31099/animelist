<script lang="ts">
  // Import Libs
  import { convertToUrl, fetchPOST } from "../../utils";
  import { createQuery } from "@tanstack/svelte-query";
  import { aniListEndPoint, aniListqueryMedia } from "../../utils/aniList";

  // Import components
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

<div class="flex flex-col mt-8">
  <div class="flex items-center px-2 md:px-6 lg:px-8 text-white">
    <div class="flex mr-12">
      {#if $listManga.isSuccess}
        <div>
          <h2 class="text-lg md:text-xl lg:text-2xl 3xl:text-3xl font-bold font-lexenddeca">
            {name}
          </h2>
        </div>
      {:else}
        <div class="h-8 w-44 rounded bg-neutral-800 animate-pulse" />
      {/if}
    </div>
  </div>

  <div class="flex justify-center py-2.5 lg:py-4 px-2 md:px-6 lg:px-8">
    <div class="w-full grid grid-cols-12 gap-2 2xl:gap-3 3xl:gap-4">
      {#if $listManga.isSuccess}
        {#each $listManga.data.data.Page.media as mangaData, index}
          <div
            class="col-span-6 md:col-span-4 xl:col-span-3 3xl:col-span-2 relative"
          >
            <CardHorizontal
              source={mangaData}
              {isRank}
              isLoading={false}
              to={`/${mangaData.type.toLowerCase()}/details/${convertToUrl(
                mangaData.title.userPreferred
              )}-an${mangaData.id}`}
              {index}
            />
          </div>
        {/each}
      {:else if $listManga.isLoading}
        {#each Array(listTrendingMangaQueryVariables.perPage) as index}
          <div
            class="col-span-6 md:col-span-4 xl:col-span-3 3xl:col-span-2 relative"
          >
            <CardHorizontal />
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
