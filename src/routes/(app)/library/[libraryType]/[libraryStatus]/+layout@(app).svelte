<script lang="ts">
  // import Types
  import type { Maybe } from "@/types";
  type Item = { title: string };
  type Items = Record<string, Item>;

  //  Import Libs
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { siteName, browserDescription, siteThemeColor } from "@/configs";

  // Import Stores
  import { page } from "$app/stores";

  // Import Components
  import SEO from "@/components/shared/SEO.svelte";
  import SelectBase from "@/components/shared/SelectBase.svelte";

  // Header data.
  let pageDescription: string = browserDescription;
  let pageHref: Maybe<string> = "/";
  let pageTitle: string = `Library — ${siteName}`;
  let pageSocialImageUrl: string = "";

  // $: console.log(selectedLibraryStatus);

  const libraryTypes: Items = {
    anime: { title: "Anime" },
    manga: { title: "Manga" },
  };
  let selectedLibraryTypes: Maybe<string> = null;
  const libraryStatus: Items = {
    watching: { title: "Watching" },
    rewatching: { title: "Rewatching" },
    completed: { title: "Completed" },
    paused: { title: "Paused" },
    dropped: { title: "Dropped" },
    planning: { title: "Planning" },
  };
  let selectedLibraryStatus: Maybe<string> = null;

  const changeBrowseType = (libraryType: string, libraryStatus: string) => {
    if (!libraryType || !libraryStatus) return;
    goto(`/library/${libraryType}/${libraryStatus}`, {
      replaceState: true,
      state: {
        isNotSaveHistory: true,
      },
    });
  };

  onMount(() => {
    const unsubscribePageStore = page.subscribe((value) => {
      pageHref = value.url.href;
      selectedLibraryTypes = value.params.libraryType;
      selectedLibraryStatus = value.params.libraryStatus;
    });

    return () => {
      unsubscribePageStore();
    };
  });
</script>

<SEO
  {pageDescription}
  {pageHref}
  {pageTitle}
  {pageSocialImageUrl}
  {siteName}
  {siteThemeColor}
/>

{#if !!selectedLibraryTypes && !!selectedLibraryStatus}
  <div
    class="w-full flex flex-col gap-8 mx-auto mt-20 px-2 sm:px-6 md:px-9 lg:px-1 2xl:px-9"
  >
    <div class="flex gap-x-4 text-lg md:text-xl lg:text-2xl">
      <SelectBase
        data={libraryTypes}
        bind:value={selectedLibraryTypes}
        name="libraryTypes"
        on:select={(event) => {
          changeBrowseType(event.detail, selectedLibraryStatus ?? "");
        }}
      />
      <SelectBase
        data={libraryStatus}
        bind:value={selectedLibraryStatus}
        name="libraryStatus"
        on:select={(event) => {
          changeBrowseType(selectedLibraryTypes ?? "", event.detail);
        }}
      />
    </div>
    <slot />
  </div>
{/if}
