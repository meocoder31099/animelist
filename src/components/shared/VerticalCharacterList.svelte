<script lang="ts">
  // Import Types
  import type { CardCharactersVerticalOptions } from "@/types";

  // Import Libs
  import { scale } from "svelte/transition";

  // Import Components
  import CardCharacterVertical from "@/components/shared/CardCharacterVertical.svelte";
  import CardVerticalBaseSkeleton from "@/components/skeletons/CardVerticalBaseSkeleton.svelte";

  export let source: CardCharactersVerticalOptions[];
  export let isLoading: boolean = true;
  export let hasNextPage: boolean = true;
  export let gridColsAndGap: string | undefined = undefined;
</script>

<div
  class="w-full grid {gridColsAndGap ??
    'grid-cols-3 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 gap-x-2 sm:gap-x-2.5 md:gap-x-2 lg:gap-x-3 2xl:gap-x-4 4xl:gap-x-5 gap-y-4 lg:gap-y-6'}"
>
  {#if !!source.length}
    {#each source as options}
      <div class="col-span-1">
        <CardCharacterVertical {options} />
      </div>
    {/each}
  {/if}
  <!-- Sekeleton -->
  {#if isLoading}
    {#each { length: 4 } as _, i}
      <div in:scale|global={{ delay: i * 200, start: 0.9 }}>
        <CardVerticalBaseSkeleton />
      </div>
    {/each}
  {/if}
</div>
{#if !isLoading && !hasNextPage}
  <div class="w-full text-center my-20">Không còn kết quả nào!</div>
{/if}
