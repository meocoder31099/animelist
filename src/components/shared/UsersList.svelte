<script lang="ts">
  // Import Types
  import type { CardUserProps } from "./CardUser.svelte";

  // Import Libs
  import { scale } from "svelte/transition";

  // Import Components
  import CardUser from "@/components/shared/CardUser.svelte";
  import CardUserSkeleton from "@/components/skeletons/CardUserSkeleton.svelte";

  export let source: CardUserProps[];
  export let isLoading: boolean = true;
  export let hasNextPage: boolean = true;
  export let gridColsAndGap: string | undefined = undefined;
</script>

<ul class="w-full grid {gridColsAndGap ?? 'grid-cols-1 md:grid-cols-2 gap-4'}">
  {#if !!source.length}
    {#each source as options}
      <li>
        <CardUser source={options} />
      </li>
    {/each}
  {/if}
  <!-- Sekeleton -->
  {#if isLoading}
    {#each { length: 4 } as _, i}
      <li in:scale|global={{ delay: i * 200, start: 0.9 }}>
        <CardUserSkeleton />
      </li>
    {/each}
  {/if}
</ul>
{#if !isLoading && !hasNextPage}
  <div class="w-full text-center my-20">Không còn kết quả nào!</div>
{/if}
