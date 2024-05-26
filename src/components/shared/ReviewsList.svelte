<script lang="ts">
  // Import Types
  import type { ComponentProps } from "svelte";

  // Import Libs
  import { scale } from "svelte/transition";

  // Import Components
  import CardReview from "@/components/shared/CardReview.svelte";
  import CardReviewSkeleton from "@/components/skeletons/CardReviewSkeleton.svelte";

  export let source: ComponentProps<CardReview>[];
  export let isLoading: boolean = true;
  export let hasNextPage: boolean = true;
  export let isResultsMessageVisible: boolean = true;
  export let gridColsAndGap: string | undefined = undefined;
</script>

<ul
  class="w-full grid {gridColsAndGap ??
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-8'}"
>
  {#if !!source.length}
    {#each source as options}
      <li>
        <CardReview {...options} />
      </li>
    {/each}
  {/if}
  <!-- Sekeleton -->
  {#if isLoading}
    {#each { length: 4 } as _, i}
      <li in:scale|global={{ delay: i * 200, start: 0.9 }}>
        <CardReviewSkeleton />
      </li>
    {/each}
  {/if}
</ul>
{#if isResultsMessageVisible}
  <div class="w-full my-20">
    {#if !isLoading && !hasNextPage}
      <div class="w-full text-center">Không còn kết quả nào!</div>
    {/if}
  </div>
{/if}
