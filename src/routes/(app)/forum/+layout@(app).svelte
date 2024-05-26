<script lang="ts">
  // import Types
  import type { Maybe } from "@/types";
  type browseTypeItems = { title: string };
  type browseTypes = Record<string, browseTypeItems>;

  //  Import Libs
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { siteName, forumDescription, siteThemeColor } from "@/configs";

  // Import Stores
  import { page } from "$app/stores";

  // Import Components
  import SEO from "@/components/shared/SEO.svelte";
  import SelectBase from "@/components/shared/SelectBase.svelte";

  // Header data.
  let pageDescription: string = forumDescription;
  let pageHref: Maybe<string> = "/";
  let pageTitle: string = `Forum — ${siteName}`;
  let pageSocialImageUrl: string = "";

  let routeID: Maybe<string> = null;
  const browseTypes: browseTypes = {
    recent: { title: "Recent Activity" },
    new: { title: "New Threads" },
    subscribed: { title: "Subscribed" },
  };
  let selectedBrowseType: Maybe<string> = null;

  const changeBrowseType = (browseType: string) => {
    goto(`/forum/${browseType}`, {
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
      const lastSlashIndex = routeID.lastIndexOf("forum/");
      let browseType: string;
      if (lastSlashIndex === -1) browseType = "recent";
      else browseType = routeID.slice(lastSlashIndex + 6) || "recent";
      pageTitle = `Forum (${browseTypes[browseType]?.title}) — ${siteName}`;
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
