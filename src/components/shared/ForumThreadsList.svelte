<script lang="ts">
  // Import Types
  import type { Thread } from "@/types/anilistv2";

  // Import Libs
  import { scale } from "svelte/transition";

  // Import Components
  import CardForumThread from "@/components/shared/CardForumThread.svelte";
  import CardForumThreadSkeleton from "@/components/skeletons/CardForumThreadSkeleton.svelte";

  export let pages: Thread[][];
  export let isLoading: boolean = true;
  export let hasNextPage: boolean = true;
  export let gridColsAndGap: string | undefined = undefined;
  export let isResultsMessageVisible: boolean = true;
</script>

<ul class="w-full grid {gridColsAndGap ?? 'grid-cols-1 gap-4'}">
  {#if !!pages.length}
    {#each pages as page}
      {#each page as options}
        <li>
          <CardForumThread source={options} />
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
