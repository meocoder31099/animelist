<script lang="ts">
  // Import libs
  import { convertToUrl } from "../../utils";
  import { fade } from "svelte/transition";

  // Import components
  import CardVertical from "../Cards/CardVertical.svelte";

  export let isLoading = true;
  export let isSuccess = false;
  export let source: any = [];
</script>

<div class="flex flex-col mt-8">
  <div class="flex items-center py-2 px-9 text-white">
    <div class="flex mr-12">
      {#if isSuccess && source.length}
        <div in:fade>
          <h2 class="text-xl font-bold">Manga</h2>
        </div>
      {:else if isLoading}
        <div class="h-8 w-44 rounded bg-neutral-800 animate-pulse" />
      {/if}
    </div>
  </div>
</div>

{#if isSuccess && source.length}
  <!-- Danh sách manga -->
  <div in:fade class="flex justify-center py-5 px-9">
    <div class="w-full grid grid-cols-12 2xl:grid-cols-9 gap-y-4 gap-x-6">
      {#each source as mangaData, i}
        <div
          class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 2xl:col-span-1"
        >
          <CardVertical
            isLoading={false}
            source={mangaData.node}
            to={`/${mangaData.node.type.toLowerCase()}/details/${convertToUrl(
              mangaData.node.title.userPreferred
            )}-an${mangaData.node.id}`}
          />
        </div>
      {/each}
    </div>
  </div>
{:else if isLoading}
  <!-- Danh sách manga -->
  <div class="flex justify-center py-5 px-9">
    <div class="w-full grid grid-cols-12 2xl:grid-cols-9 gap-y-4 gap-x-6">
      {#each Array(9) as noUse}
        <div
          class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 2xl:col-span-1"
        >
          <CardVertical />
        </div>
      {/each}
    </div>
  </div>
{/if}
