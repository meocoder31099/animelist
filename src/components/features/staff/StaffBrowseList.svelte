<script lang="ts" context="module">
  export interface BrowseOptions
    extends Record<string, any>,
      PageArgs,
      StaffArgs {
    search?: string;
    isBirthday?: boolean;
    sort?: StaffSort[];
  }
</script>

<script lang="ts">
  // Import Types
  import type { Page } from "@sveltejs/kit";
  import { type PageArgs, type StaffArgs, StaffSort } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { arraysEqual } from "@/utils";
  import { slide } from "svelte/transition";

  // Import Components
  import SearchInput from "@/components/shared/SearchInput.svelte";
  import StaffFetcher from "@/components/shared/StaffFetcher.svelte";
  import InputCheckboxSmall from "@/components/shared/InputCheckboxSmall.svelte";

  let pageStore: Page<Record<string, string>, string | null>;

  let isReady: boolean = false;
  let isShowBrowseMediaFilterModal: boolean = false;
  let sorts: StaffSort[] | undefined = [
    StaffSort.Favourites_desc,
    StaffSort.Id_desc,
    StaffSort.Language_desc,
    StaffSort.Role_desc,
  ];
  const args: BrowseOptions = {
    search: undefined,
    isBirthday: undefined,
    sort: [],
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
  placeholder="Type staff name"
  on:showFilter={() => {
    isShowBrowseMediaFilterModal = !isShowBrowseMediaFilterModal;
  }}
  on:search={(event) => {
    updateArgs("search", event.detail);
  }}
  search_value={args.search}
/>

{#if isReady}
  {#if isShowBrowseMediaFilterModal}
    <!-- Sort -->
    <div
      in:slide={{
        duration: 300,
        axis: "y",
      }}
      class="flex bg-background w-full pb-4 sticky top-28 z-10"
    >
      <InputCheckboxSmall
        items={sorts}
        name="sort"
        clear={false}
        value={args?.sort}
        on:change={(event) => {
          updateArgs("sort", event.detail);
        }}
      />
    </div>
  {/if}
  <!-- Media List -->
  {#key args}
    {#if !args.search && !args.sort?.length}
      <h3 class="text-lg md:text-xl lg:text-2xl">Birthdays</h3>
    {/if}
    <StaffFetcher {args} />
  {/key}
{/if}
