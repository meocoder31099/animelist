<script lang="ts">
  // Import Types
  import type { LayoutData } from "./$types";

  // Import Libs
  import { onMount } from "svelte";
  import { QueryClientProvider } from "@tanstack/svelte-query";

  // Import Stores
  import { navigating } from "$app/stores";

  // Import Components
  import LoadingBar from "@/components/shared/LoadingBar.svelte";
  import ViewerFetcher from "@/components/features/user/ViewerFetcher.svelte";

  export let data: LayoutData;

  let isFetchViewer: boolean;
  let isLoadingBar = false;

  onMount(() => {
    // If localStorage has "access_token" run "ViewerFetcher" component to get current user details.
    isFetchViewer = !!localStorage.getItem("access_token");

    const unsubscribeNavigating = navigating.subscribe((value) => {
      isLoadingBar = !!value;
    });

    return () => {
      unsubscribeNavigating();
    };
  });
</script>

<LoadingBar isLoading={isLoadingBar} />
<QueryClientProvider client={data.queryClient}>
  {#if isFetchViewer}
    <ViewerFetcher />
  {/if}
  <slot />
</QueryClientProvider>