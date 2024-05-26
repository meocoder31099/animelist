<script lang="ts">
  // import Types
  import type { TabItems } from "@/components/shared/TabBase.svelte";

  // Import Libs
  import { onMount, setContext } from "svelte";
  import { goto } from "$app/navigation";

  // Import Stores
  import { page } from "$app/stores";

  // Import Components
  import UserDetails from "@/components/features/user/UserDetails.svelte";
  import TabBase from "@/components/shared/TabBase.svelte";

  let tabs: TabItems;

  let username: string;
  let tabKeyActive: string;

  onMount(() => {
    const unPageStore = page.subscribe((value) => {
      const userName = value.params.username;
      if (!!userName) {
        const regexFindTabKey = /\/\[username\]\/([^\s/]+)/;
        const routeID = value.route.id;
        !!routeID &&
          (tabKeyActive = routeID.match(regexFindTabKey)?.[1] ?? "activity"); // Default tabKeyActive is 'activity' if not match.
        tabs = {
          activity: {
            name: "Activity",
            isActive: false,
            path: `/user/${userName}`,
          },
          status: {
            name: "Status",
            isActive: false,
            path: `/user/${userName}/status`,
          },
          messages: {
            name: "Messages",
            isActive: false,
            path: `/user/${userName}/messages`,
          },
          animelist: {
            name: "Anime List",
            isActive: false,
            path: `/user/${userName}/animelist`,
          },
          mangalist: {
            name: "Manga List",
            isActive: false,
            path: `/user/${userName}/mangalist`,
          },
          favourites: {
            name: "Favorites",
            isActive: false,
            path: `/user/${userName}/favourites/anime`,
          },
          social: {
            name: "Social",
            isActive: false,
            path: `/user/${userName}/social/following`,
          },
          reviews: {
            name: "Reviews",
            isActive: false,
            path: `/user/${userName}/reviews`,
          },
        };
        // Set tab to active.
        !!tabs[tabKeyActive] && (tabs[tabKeyActive].isActive = true);
        username = userName;
      }
    });

    return () => {
      unPageStore();
    };
  });

  const handleChangeTab = (event: CustomEvent) => {
    const { path } = event.detail;
    goto(path, {
      noScroll: true,
      replaceState: true,
      state: {
        isNotSaveHistory: true,
      },
    });
  };

</script>

<!-- User Details -->
{#if !!username}
  <UserDetails
    {username}
    on:id={(event) => {
      setContext("userId", event.detail);
    }}
  />
{/if}
<!-- Tab -->
{#if !!tabs}
  <div class="w-full max-w-details mx-auto">
    <div class="sticky top-14 z-10 lg:rounded-lg overflow-hidden">
      <TabBase bind:items={tabs} align="left" on:changeTab={handleChangeTab} />
    </div>
  </div>
{/if}

<!-- Content Tab -->
<div
  class="w-full max-w-details mx-auto flex flex-col px-2 sm:px-6 md:px-9 lg:px-1 mt-8"
>
  <slot />
</div>
