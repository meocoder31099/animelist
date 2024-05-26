<script lang="ts">
  //Import Type
  import type { Maybe } from "@/types";
  import type { InitialOptions } from "@/components/shared/modals/browseMedia/BrowseMediaFilterModalBase.svelte";
  interface AnimeInitialOptions extends InitialOptions {
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
  let sorts: (MediaSort | undefined)[] = [
    MediaSort.Chapters,
    MediaSort.Chapters_desc,
    MediaSort.End_date,
    MediaSort.End_date_desc,
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
    MediaSort.Volumes,
    MediaSort.Volumes_desc,
  ];
  let formats: (MediaFormat | undefined)[] = [
    MediaFormat.Manga,
    MediaFormat.Novel,
    MediaFormat.One_shot,
  ];
  let genre_in: string[] = initial.genre_in || [];
  let tag_in: string[] = initial.tag_in || [];
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
  on:countryOfOrigin={handleFilterEvent}
  on:source={handleFilterEvent}
  on:sort={handleFilterEvent}
  on:status={handleFilterEvent}
  on:startDate_like={handleFilterEvent}
>
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
