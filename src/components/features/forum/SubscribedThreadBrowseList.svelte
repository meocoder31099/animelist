<script lang="ts" context="module">
  export interface BrowseOptions extends Record<string, any> {
    sort: ThreadSort[];
    categoryId?: number;
    mediaCategoryId?: number;
    search?: string;
    subscribed: boolean;
  }
</script>

<script lang="ts">
  // Import Types
  import { ThreadSort } from "@/types/anilistv2";
  import type { InputRadioSmallItems } from "@/components/shared/InputRadioSmall.svelte";
  import type { Page } from "@sveltejs/kit";

  // Import Libs
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { arraysEqual } from "@/utils";
  import { slide } from "svelte/transition";

  // Import Components
  import SearchInput from "@/components/shared/SearchInput.svelte";
  import InputRadioSmall from "@/components/shared/InputRadioSmall.svelte";
  import ForumThreadFetcher from "@/components/shared/ForumThreadFetcher.svelte";

  let pageStore: Page<Record<string, string>, string | null>;
  let isShowFilter: boolean = false;
  let categories: InputRadioSmallItems = [
    { title: "All" },
    { title: "General", value: "7" },
    { title: "Anime", value: "1" },
    { title: "Manga", value: "2" },
    { title: "Release Discussion", value: "5" },
    { title: "Site Announcements", value: "13" },
    { title: "News", value: "8" },
    { title: "Music", value: "9" },
    { title: "Gaming", value: "10" },
    { title: "Visual Novels", value: "4" },
    { title: "Light Novels", value: "3" },
    { title: "Forum Games", value: "16" },
    { title: "Recommendations", value: "15" },
    { title: "Site Feedback", value: "11" },
    { title: "Bug Reports", value: "12" },
    { title: "AniList Apps", value: "18" },
    { title: "Misc", value: "17" },
  ];
  let isReady: boolean = false;
  const args: BrowseOptions = {
    sort: [ThreadSort.RepliedAtDesc],
    categoryId: undefined,
    mediaCategoryId: undefined,
    search: undefined,
    subscribed: true,
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
</script>

<SearchInput
  placeholder="Type thread title"
  on:showFilter={() => {
    isShowFilter = !isShowFilter;
  }}
  on:search={(event) => {
    updateArgs("search", event.detail);
  }}
  search_value={args.search}
/>
{#if isShowFilter}
  <!-- Sort -->
  <div
    in:slide|global={{
      duration: 300,
      axis: "y",
    }}
    class="flex bg-background w-full pb-4 sticky top-28 z-10"
  >
    <InputRadioSmall
      items={categories}
      name="categoryId"
      clear={false}
      value={args.categoryId?.toString()}
      on:change={(event) => {
        updateArgs("categoryId", event.detail);
      }}
    />
  </div>
{/if}
{#if isReady}
  {#key args}
    <ForumThreadFetcher {args} />
  {/key}
{/if}
