<script lang="ts">
  // Import Types
  import type { CardCommnetProps } from "@/components/shared/CardComment.svelte";

  // Import Libs
  import { scale } from "svelte/transition";

  // Import Components
  import CardComment from "@/components/shared/CardComment.svelte";
  import CardCommentSkeleton from "@/components/skeletons/CardCommentSkeleton.svelte";

  export let source: CardCommnetProps[];
  export let isLoading: boolean = true;
  export let hasNextPage: boolean = true;
  export let gridColsAndGap: string | undefined = undefined;
</script>
<!-- divide-y divide-neutral-800 -->
<ul class="max-w-3xl w-full grid {gridColsAndGap ?? 'grid-cols-1 sm:gap-y-4 divide-y-8 divide-neutral-950 sm:divide-none'}">
  {#if !!source.length}
    {#each source as options (options.id)}
      <li>
        <CardComment source={options} />
      </li>
    {/each}
  {/if}
  <!-- Sekeleton -->
  {#if isLoading}
    {#each { length: 3 } as _, i}
      <li in:scale|global={{ delay: i * 200, start: 0.9 }}>
        <CardCommentSkeleton />
      </li>
    {/each}
  {/if}
</ul>
{#if !isLoading && !hasNextPage}
  <div class="w-full text-center my-20">Không còn kết quả nào!</div>
{/if}
