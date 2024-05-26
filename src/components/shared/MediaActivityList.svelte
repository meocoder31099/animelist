<script lang="ts">
  // Import Types
  import type { CardMediaActivityProps } from "@/components/shared/CardMediaActivity.svelte";

  // Import Libs
  import { scale } from "svelte/transition";

  // Import Components
  import CardMediaActivity from "@/components/shared/CardMediaActivity.svelte";
  import CardMediaActivitySkeleton from "@/components/skeletons/CardMediaActivitySkeleton.svelte";

  export let source: CardMediaActivityProps[];
  export let isLoading: boolean = true;
  export let hasNextPage: boolean = true;
  export let gridColsAndGap: string | undefined = undefined;
</script>

<ul
  class="w-full grid {gridColsAndGap ??
    'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4'}"
>
  {#if !!source.length}
    {#each source as options}
      <li>
        <CardMediaActivity source={options} />
      </li>
    {/each}
  {/if}
  <!-- Sekeleton -->
  {#if isLoading}
    {#each { length: 3 } as _, i}
      <li in:scale|global={{ delay: i * 200, start: 0.9 }}>
        <CardMediaActivitySkeleton />
      </li>
    {/each}
  {/if}
</ul>
{#if !isLoading && !hasNextPage}
  <div class="w-full text-center my-20">Không còn kết quả nào!</div>
{/if}
