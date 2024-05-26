<script lang="ts" context="module">
  export interface BrowseOptions
    extends Record<string, any>,
      PageArgs,
      MediaArgs {
    type: MediaType;
    format?: MediaFormat;
    genre_in?: string[];
    search?: string;
    season?: MediaSeason;
    startDate_like?: string;
    source?: MediaSource;
    sort?: MediaSort[];
    perPage: number;
    tag_in?: string[];
    countryOfOrigin?: string;
    status?: MediaStatus;
    isAdult: boolean;
  }
</script>

<script lang="ts">
  // Import Types
  import type { Page } from "@sveltejs/kit";
  import {
    type PageArgs,
    type MediaArgs,
    MediaType,
    MediaSort,
    MediaSeason,
    MediaFormat,
    MediaStatus,
    MediaSource,
  } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import useDebounce from "@/hooks/useDebounce";
  import { arraysEqual } from "@/utils";

  // Import Components
  import SearchInput from "@/components/shared/SearchInput.svelte";
  import AnimeBrowseMediaFilterModal from "@/components/shared/modals/browseMedia/AnimeBrowseMediaFilterModal.svelte";
  import MediaFetcher from "@/components/shared/MediaFetcher.svelte";

  let pageStore: Page<Record<string, string>, string | null>;

  let isReady: boolean = false;
  let isShowBrowseMediaFilterModal: boolean = false;
  const args: BrowseOptions = {
    type: MediaType.Anime,
    format: undefined,
    genre_in: [],
    search: undefined,
    season: undefined,
    startDate_like: undefined,
    source: undefined,
    sort: [MediaSort.Trending_desc],
    perPage: 20,
    tag_in: [],
    countryOfOrigin: undefined,
    status: undefined,
    isAdult: false,
  };

  onMount(() => {
    // Get page data
    pageStore = get(page);
    // Get searchParams from url.
    const searchParams = pageStore.url.searchParams;
    // Get list keys from searchParams.
    const keys = [...new Set(searchParams.keys())];
    // Set value get from searchParams to args
    for (const key of keys) {
      if (!(key in args)) continue;
      if (Array.isArray(args[key])) args[key] = searchParams.getAll(key);
      else args[key] = searchParams.get(key);
    }

    // Set isReady to true after handle args.
    isReady = true;
  });

  const updatePage = <K extends keyof BrowseOptions>(
    key: K,
    value: BrowseOptions[K]
  ) => {
    pageStore.url.searchParams.delete(key as string);
    if (Array.isArray(value))
      value.forEach((param: string) => {
        pageStore.url.searchParams.append(key as string, param);
      });
    else {
      if (value) pageStore.url.searchParams.append(key as string, value);
    }
    goto(pageStore.url, {
      keepFocus: true,
      replaceState: true,
    });
  };

  const updateArgs = <K extends keyof BrowseOptions>(
    key: K,
    value: BrowseOptions[K]
  ) => {
    const item = args[key];
    if (!(key in args)) return;
    if (Array.isArray(item)) {
      if (arraysEqual(item, value)) return;
      args[key] = value;
      updatePage(key, value);
      return;
    }
    if (item === value) return;
    args[key] = value ?? undefined; // If value = null will set args[key] to undefined. Because if is null it will not remove in args when call API.
    updatePage(key, value);
    return;
  };
  const handleFilterEvent = (event: CustomEvent) => {
    const eventName: string = event.type;
    updateArgs(eventName, event.detail);
  };
</script>

<SearchInput
  placeholder="Type anime name"
  on:showFilter={(event) => {
    isShowBrowseMediaFilterModal = event.detail;
  }}
  on:search={handleFilterEvent}
  search_value={args.search}
/>
{#if isReady}
  <!-- Media List -->
  {#key args}
    <MediaFetcher {args} />
  {/key}
  <!-- Filter -->
  {#if isShowBrowseMediaFilterModal}
    <AnimeBrowseMediaFilterModal
      initial={{
        genre_in: args.genre_in,
        tag_in: args.tag_in,
        season_in: args.season,
        countryOfOrigin_in: args.countryOfOrigin,
        source_in: args.source,
        sort_in: args.sort,
        format_in: args.format,
        startDate_like_in: args.startDate_like,
        status_in: args.status,
      }}
      on:close={(event) => {
        isShowBrowseMediaFilterModal = !event.detail;
      }}
      on:genre_in={handleFilterEvent}
      on:tag_in={handleFilterEvent}
      on:season={handleFilterEvent}
      on:countryOfOrigin={handleFilterEvent}
      on:source={handleFilterEvent}
      on:sort={handleFilterEvent}
      on:status={handleFilterEvent}
      on:format={handleFilterEvent}
      on:startDate_like={handleFilterEvent}
    />
  {/if}
{/if}
