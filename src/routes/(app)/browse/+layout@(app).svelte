<script lang="ts">
  // import Types
  import type { Maybe } from "@/types";
  type browseTypeItems = { title: string };
  type browseTypes = Record<string, browseTypeItems>;

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
  let pageTitle: string = `Browse — ${siteName}`;
  let pageSocialImageUrl: string = "";

  let routeID: Maybe<string> = null;
  const browseTypes: browseTypes = {
    anime: { title: "Anime" },
    manga: { title: "Manga" },
    characters: { title: "Characters" },
    staff: { title: "Staff" },
  };
  let selectedBrowseType: Maybe<string> = null;

  const changeBrowseType = (browseType: string) => {
    goto(`/browse/${browseType}`, {
      replaceState: true,
      state: {
        isNotSaveHistory: true,
      },
    });
  };

  onMount(() => {
    const unsubscribePageStore = page.subscribe((value) => {
      routeID = value.route.id;
      pageHref = value.url.href;
      updateBrowseType(routeID);
    });

    return () => {
      unsubscribePageStore();
    };
  });

  const updateBrowseType = (routeID: Maybe<string>): void => {
    if (routeID) {
      const lastSlashIndex = routeID.lastIndexOf("browse/");
      const browseType: string = routeID.slice(lastSlashIndex + 7) || "anime";
      pageTitle = `Browse (${browseTypes[browseType]?.title}) — ${siteName}`;
      selectedBrowseType = browseType;
    }
  };
</script>

<SEO
  {pageDescription}
  {pageHref}
  {pageTitle}
  {pageSocialImageUrl}
  {siteName}
  {siteThemeColor}
/>

{#if !!selectedBrowseType}
  <div
    class="w-full flex flex-col gap-4 mx-auto mt-20 px-2 sm:px-6 md:px-9 lg:px-1 2xl:px-9"
  >
    <div>
      <h2 class="text-lg md:text-xl lg:text-2xl">
        Browse
        <SelectBase
          data={browseTypes}
          bind:value={selectedBrowseType}
          name="browseTypes"
          on:select={(event) => {
            changeBrowseType(event.detail);
          }}
        />
      </h2>
    </div>
    <slot />
  </div>
{/if}
