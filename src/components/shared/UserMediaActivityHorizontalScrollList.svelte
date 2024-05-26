<script lang="ts">
  // Import Types
  import type { ComponentProps } from "svelte";

  // Import Libs
  import { scale } from "svelte/transition";

  // Import Components
  import CardUserMediaActivity from "@/components/shared/CardUserMediaActivity.svelte";
  import CardUserMediaActivitySkeleton from "@/components/skeletons/CardUserMediaActivitySkeleton.svelte";

  export let pages: ComponentProps<CardUserMediaActivity>[][];
  export let isLoading: boolean = true;
  export let hasNextPage: boolean = true;
  export let gridColsAndGap: string | undefined = undefined;
</script>

<ul
  class="w-full flex gap-2 pb-3 overflow-x-auto scrollbar-h-1 lg:scrollbar-h-2 scrollbar-thin scrollbar-thumb-neutral-800/80 scrollbar-thumb-rounded-lg"
>
  {#if !!pages.length}
    <slot name="container-start" />
    {#each pages as page}
      {#each page as props}
        <li
          class="flex-shrink-0 {gridColsAndGap ??
            'w-[28%] md:w-1/6 first:ml-4 last:mr-4'}"
        >
          <CardUserMediaActivity {...props} />
        </li>
      {/each}
    {/each}
    <slot name="container-end" />
  {/if}
  <!-- Sekeleton -->
  {#if isLoading}
    {#each { length: 3 } as _, i}
      <li
        in:scale|global={{ delay: i * 200, start: 0.9 }}
        class="flex-shrink-0 {gridColsAndGap ??
          'w-[28%] md:w-1/6 first:ml-4 last:mr-4'}"
      >
        <CardUserMediaActivitySkeleton />
      </li>
    {/each}
  {/if}
  <!-- hasNextPage == false -->
  {#if !isLoading && !hasNextPage}
    <li
      class="flex-shrink-0 {gridColsAndGap ??
        'w-[28%] md:w-1/6 first:ml-4 last:mr-4'}"
    >
      <div class="aspect-w-3 aspect-h-5 bg-neutral-800 rounded-lg">
        <div class="flex justify-center items-center text-center p-4">
          <span class="font-bold">Không còn kết quả nào!</span>
        </div>
      </div>
    </li>
  {/if}
</ul>
