<script lang="ts">
  // Import Type
  import { type MediaRank, MediaRankType } from "@/types/anilist";

  // Import Libs
  import { fade } from "svelte/transition";

  export let source: MediaRank[];
</script>

{#if source}
  <div in:fade class="flex px-0.5 py-2 sm:px-0">
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {#each source as ranking}
        <div
          class="col-span-1 flex items-center px-4 py-2 bg-neutral-800 rounded-lg"
        >
          <div class="w-6 h-6 shrink-0">
            {#if ranking.type === MediaRankType.Popular}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-yellow-500 w-full h-full"
                ><path
                  d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"
                /></svg
              >
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-rose-500 w-full h-full"
                ><path
                  d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"
                /></svg
              >
            {/if}
          </div>
          <div class="w-full text-center">
            <span class="font-bold">#{ranking.rank}</span>
            <span>{ranking.context} {ranking.year || ""}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
