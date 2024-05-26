<script lang="ts">
  // Import Types
  import type { CardCommnetSmallProps } from "@/components/shared/CardCommentSmall.svelte";

  // Import Libs
  import { scale } from "svelte/transition";

  // Import Components
  import CardCommentSmall from "@/components/shared/CardCommentSmall.svelte";
  import CardCommentSmallSkeleton from "@/components/skeletons/CardCommentSmallSkeleton.svelte";

  export let source: CardCommnetSmallProps[];
  export let isLoading: boolean = true;
  export let replyCount: number;
  export let gridColsAndGap: string | undefined = undefined;

  replyCount = replyCount > 3 ? 3 : replyCount;
</script>

<ul class="w-full grid {gridColsAndGap ?? 'grid-cols-1 gap-4'}">
  {#if !!source.length}
    {#each source as options}
      <li>
        <CardCommentSmall source={options} />
      </li>
    {/each}
  {/if}
  <!-- Sekeleton -->
  {#if isLoading}
    {#each { length: replyCount } as _, i}
      <li in:scale|global={{ delay: i * 200, start: 0.9 }}>
        <CardCommentSmallSkeleton />
      </li>
    {/each}
  {/if}
</ul>
