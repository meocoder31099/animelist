<script lang="ts">
  // Import Types
  import type { ComponentProps } from "svelte";

  // Import Libs
  import { scale } from "svelte/transition";

  // Import Components
  import CardUserMediaActivity from "@/components/shared/CardUserMediaActivity.svelte";
  import CardForumThreadSkeleton from "@/components/skeletons/CardForumThreadSkeleton.svelte";

  export let pages: ComponentProps<CardUserMediaActivity>[][];
  export let isLoading: boolean = true;
  export let hasNextPage: boolean = true;
  export let gridColsAndGap: string | undefined = undefined;
  export let isResultsMessageVisible: boolean = true;

  console.log(pages);
</script>

<ul class="w-full {gridColsAndGap ?? 'flex gap-2 pb-3'}">
  {#if !!pages.length}
    {#each pages as page}
      {#each page as props}
        <li class="w-1/3 md:w-1/5 flex-shrink-0 first:ml-4 last:mr-4">
          <CardUserMediaActivity {...props} />
        </li>
      {/each}
    {/each}
  {/if}
  <!-- Sekeleton -->
  {#if isLoading}
    {#each { length: 3 } as _, i}
      <li in:scale|global={{ delay: i * 200, start: 0.9 }}>
        <CardForumThreadSkeleton />
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
