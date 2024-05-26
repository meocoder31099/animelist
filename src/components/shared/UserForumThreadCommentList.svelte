<script lang="ts">
  // Import Types
  import type { CardUserForumThreadCommentsProps } from "./CardUserForumThreadComment.svelte";

  // Import Libs
  import { scale } from "svelte/transition";

  // Import Components
  import CardUserForumThreadComment from "@/components/shared/CardUserForumThreadComment.svelte";
  import CardUserForumThreadCommentSkeleton from "@/components/skeletons/CardUserForumThreadCommentSkeleton.svelte";

  export let pages: CardUserForumThreadCommentsProps[][];
  export let isLoading: boolean = true;
  export let hasNextPage: boolean = true;
  export let gridColsAndGap: string | undefined = undefined;
</script>

<ul class="w-full grid {gridColsAndGap ?? 'grid-cols-1 gap-4'}">
  {#if !!pages.length}
    {#each pages as page}
      {#each page as options}
        <li>
          <CardUserForumThreadComment source={options} />
        </li>
      {/each}
    {/each}
  {/if}
  <!-- Sekeleton -->
  {#if isLoading}
    {#each { length: 3 } as _, i}
      <li in:scale|global={{ delay: i * 200, start: 0.9 }}>
        <CardUserForumThreadCommentSkeleton />
      </li>
    {/each}
  {/if}
</ul>
<div class="w-full my-20">
  {#if !isLoading && !hasNextPage}
    <div class="w-full text-center">Không còn kết quả nào!</div>
  {/if}
</div>
