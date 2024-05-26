<script lang="ts">
  //Import Type
  import type { Maybe } from "@/types";
  import type { InitialOptions } from "@/components/shared/modals/browseMedia/BrowseMediaFilterModalBase.svelte";
  interface AnimeInitialOptions extends InitialOptions {
    season_in?: string;
    format_in?: string;
  }
  import { MediaSeason, MediaSort, MediaFormat } from "@/types/anilist";

  // Import Libs
  import { createEventDispatcher } from "svelte";
  import useDebounce from "@/hooks/useDebounce";

  // Import Components
  import BrowseMediaFilterModalBase from "@/components/shared/modals/browseMedia/BrowseMediaFilterModalBase.svelte";
  import InputCheckboxSmall from "@/components/shared/InputCheckboxSmall.svelte";
  import SelectOutline from "@/components/shared/SelectOutline.svelte";

  export let initial: AnimeInitialOptions = {};

  const dispacth = createEventDispatcher();
  const seasons: (MediaSeason | undefined)[] = [
    MediaSeason.Winter,
    MediaSeason.Spring,
    MediaSeason.Summer,
    MediaSeason.Fall,
  ];
  const descriptionsSeason = {
    WINTER: "Months December to February",
    SPRING: "Months March to May",
    SUMMER: "Months June to August",
    FALL: "Months September to November",
  };
  let sorts: (MediaSort | undefined)[] = [
    MediaSort.Duration,
    MediaSort.Duration_desc,
    MediaSort.End_date,
    MediaSort.End_date_desc,
    MediaSort.Episodes,
    MediaSort.Episodes_desc,
    MediaSort.Favourites,
    MediaSort.Favourites_desc,
    MediaSort.Format,
    MediaSort.Format_desc,
    MediaSort.Id,
    MediaSort.Id_desc,
    MediaSort.Popularity,
    MediaSort.Popularity_desc,
    MediaSort.Score,
    MediaSort.Score_desc,
    MediaSort.Search_match,
    MediaSort.Start_date,
    MediaSort.Start_date_desc,
    MediaSort.Status,
    MediaSort.Status_desc,
    MediaSort.Title_english,
    MediaSort.Title_english_desc,
    MediaSort.Title_native,
    MediaSort.Title_native_desc,
    MediaSort.Title_romaji,
    MediaSort.Title_romaji_desc,
    MediaSort.Trending,
    MediaSort.Trending_desc,
    MediaSort.Type,
    MediaSort.Type_desc,
    MediaSort.Updated_at,
    MediaSort.Updated_at_desc,
  ];
  let formats: (MediaFormat | undefined)[] = [
    MediaFormat.Movie,
    MediaFormat.Music,
    MediaFormat.Ona,
    MediaFormat.Ova,
    MediaFormat.Special,
    MediaFormat.Tv,
    MediaFormat.Tv_short,
  ];
  let genre_in: string[] = initial.genre_in || [];
  let tag_in: string[] = initial.tag_in || [];
  let season_in: string | undefined = initial.season_in || undefined;
  let countryOfOrigin_in: string | undefined =
    initial.countryOfOrigin_in || undefined;
  let source_in: string | undefined = initial.source_in || undefined;
  let sort_in: string[] = initial.sort_in || [];
  let startDate_like_in: string | undefined =
    initial.startDate_like_in || undefined;
  let status_in: string | undefined = initial.status_in || undefined;
  let format_in: string | undefined = initial.format_in || undefined;

  const handleClick = useDebounce(
    (node: Maybe<EventTarget>, callback: () => void): void => {
      if (!node) return;
      if (["checkbox", "radio"].includes((node as HTMLInputElement).type))
        callback();
    },
    500
  );

  const handleFilterEvent = (event: CustomEvent) => {
    const eventName: string = event.type;
    dispacth(eventName, event.detail);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<BrowseMediaFilterModalBase
  initial={{
    genre_in: genre_in,
    tag_in: tag_in,
    countryOfOrigin_in: countryOfOrigin_in,
    source_in: source_in,
    sort_in: sort_in,
    startDate_like_in: startDate_like_in,
    status_in: status_in,
  }}
  on:close={handleFilterEvent}
  on:genre_in={handleFilterEvent}
  on:tag_in={handleFilterEvent}
  on:season={handleFilterEvent}
  on:countryOfOrigin={handleFilterEvent}
  on:source={handleFilterEvent}
  on:sort={handleFilterEvent}
  on:status={handleFilterEvent}
  on:startDate_like={handleFilterEvent}
>
  <svelte:fragment slot="radio-top">
    <!-- Season -->
    <div
      class="flex flex-wrap gap-2"
      on:click|capture={(event) => {
        handleClick(event.target, () => {
          dispacth("season", season_in);
        });
      }}
    >
      <div class="basis-full text-lg mb-2 flex justify-between items-center">
        <div class="font-semibold">Season</div>
        {#if !!season_in}
          <span
            on:click|stopPropagation={() => {
              season_in = undefined;
              dispacth("season", season_in);
            }}
            class="items-center cursor-pointer hover:text-neutral-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current w-5 h-5"
              ><path
                d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
              /></svg
            >
          </span>
        {/if}
      </div>
      <div class="w-full grid grid-cols-2 3xl:grid-cols-4 gap-2">
        {#each seasons as season, i}
          <div class="col-span-1">
            <input
              id={"season_" + i}
              type="radio"
              name="season"
              value={season}
              bind:group={season_in}
              class="hidden peer"
            />
            <label
              for={"season_" + i}
              class="inline-flex justify-between w-full h-full p-5 rounded-lg border border-neutral-700 cursor-pointer transition-colors duration-500 peer-checked:bg-white peer-checked:text-black"
            >
              <div class="block">
                <div class="w-full text-lg font-semibold">
                  {season}
                </div>
                <div class="w-full">
                  {season ? descriptionsSeason[season] : ""}
                </div>
              </div>
            </label>
          </div>
        {/each}
      </div>
    </div>
  </svelte:fragment>
  <svelte:fragment slot='select-end'>
    <!-- Format -->
    <SelectOutline
      name="format"
      items={formats}
      bind:value={format_in}
      title="Format"
      on:change={(event) => {
        dispacth("format", event.detail);
      }}
    />
  </svelte:fragment>
  <svelte:fragment slot="radio-end">
    <!-- Sort -->
    <InputCheckboxSmall
      name="sort"
      items={sorts}
      bind:value={sort_in}
      title="Sort"
      on:change={(event) => {
        dispacth("sort", event.detail);
      }}
    />
  </svelte:fragment>
</BrowseMediaFilterModalBase>
