<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";

  // Import Libs
  import { onMount } from "svelte";

  // Import Stores
  import { page } from "$app/stores";

  // Import Components
  import LibraryBrowseList from "@/components/features/library/LibraryBrowseList.svelte";

  let selectedLibraryTypes: Maybe<string> = null;
  let selectedLibraryStatus: Maybe<string> = null;

  onMount(() => {
    const unsubscribePageStore = page.subscribe((value) => {
      selectedLibraryTypes = value.params.libraryType;
      selectedLibraryStatus = value.params.libraryStatus;
    });

    return () => {
      unsubscribePageStore();
    };
  });
</script>

{#if !!selectedLibraryTypes && !!selectedLibraryStatus}
  {#key selectedLibraryTypes + selectedLibraryStatus}
    <LibraryBrowseList
      type={selectedLibraryTypes}
      status={selectedLibraryStatus}
    />
  {/key}
{/if}
