<script lang="ts">
  // Import Types
  import type { CardMediaVerticalOptions } from "@/types";
  import type { MediaList } from "@/types/anilistv2";

  // Import Components
  import CardMediaVertical from "@/components/shared/CardMediaVertical.svelte";

  export let source: (MediaList & { cardOption: CardMediaVerticalOptions })[];
  export let gridColsAndGap: string | undefined = undefined;
</script>

{#if !!source.length}
  <div
    class="w-full grid {gridColsAndGap ??
      'grid-cols-3 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 gap-x-2 sm:gap-x-2.5 md:gap-x-2 lg:gap-x-3 2xl:gap-x-4 4xl:gap-x-5 gap-y-4 lg:gap-y-6'}"
  >
    {#each source as { cardOption, id } (id)}
      <div class="col-span-1">
        <CardMediaVertical options={cardOption} />
      </div>
    {/each}
  </div>
{/if}
<div class="w-full text-center my-20">Không còn kết quả nào!</div>
