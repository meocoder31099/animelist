<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { SelectItems } from "@/components/shared/SelectBase.svelte";

  //   Import Libs
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  // Import Stores
  import { page } from "$app/stores";

  // Import Components
  import SelectBase from "@/components/shared/SelectBase.svelte";

  let routeID: Maybe<string> = null;
  let pagePath: string;
  const listTypes: SelectItems = {
    anime: { title: "Anime" },
    manga: { title: "Manga" },
    characters: { title: "Characters" },
    staff: { title: "Staff" },
  };
  let selectedListType: Maybe<string> = null;

  onMount(() => {
    const unPageStore = page.subscribe((value) => {
      routeID = value.route.id;
      pagePath = value.url.pathname.replace(/\/[^/]+$/, "");
      updateBrowseType(routeID);
    });

    return () => {
      unPageStore();
    };
  });

  const changeListType = (type: string) => {
    goto(`${pagePath}/${type}`, {
      noScroll: true,
      replaceState: true,
      state: {
        isNotSaveHistory: true,
      },
    });
  };
  const updateBrowseType = (routeID: Maybe<string>): void => {
    if (routeID) {
      const lastSlashIndex = routeID.lastIndexOf("favourites/");
      const ListType: string = routeID.slice(lastSlashIndex + 11) || "anime";
      selectedListType = ListType;
    }
  };
</script>

{#if !!selectedListType}
  <div class="flex flex-col gap-4">
    <div>
      <h2 class="text-lg md:text-xl lg:text-2xl">
        List
        <SelectBase
          data={listTypes}
          bind:value={selectedListType}
          name="userFavouriteTypes"
          on:select={(event) => {
            changeListType(event.detail);
          }}
        />
      </h2>
    </div>
    <slot />
  </div>
{/if}
