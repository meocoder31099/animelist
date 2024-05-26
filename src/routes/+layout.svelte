<script lang="ts">
  // Import Types
  import type { LayoutData } from "./$types";

  // Import Libs
  import { onMount } from "svelte";
  import { QueryClientProvider } from "@tanstack/svelte-query";

  // Import Stores
  import { navigating, page } from "$app/stores";

  // Import Components
  import LoadingBar from "@/components/shared/LoadingBar.svelte";

  export let data: LayoutData;

  let isLoadingBar = false;

  onMount(() => {
    const unsubscribeNavigating = navigating.subscribe((value) => {
      isLoadingBar = !!value;
    });

    return () => {
      unsubscribeNavigating();
    };
  });
</script>

<QueryClientProvider client={data.queryClient}>
  <LoadingBar isLoading={isLoadingBar} />
  <slot />
</QueryClientProvider>
