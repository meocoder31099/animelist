<script lang="ts">
  // Import Libs
  import { onMount } from "svelte";

  let categoriesWidth: string[] = [];
  let titleWidth: string;

  onMount(() => {
    // Calculate random width for title.
    titleWidth = `${Math.floor(Math.random() * 5) + 3}0%`;
    // Calculate random width for categories.
    const numCategories = Math.floor(Math.random() * 3) + 2;
    categoriesWidth = Array.from({ length: numCategories }).map(
      () => `${(Math.floor(Math.random() * 3) + 1) * 40}px`
    );
  });
</script>

<div class="flex bg-neutral-900 px-6 py-5 rounded-lg animate-pulse">
  <!-- Descriptions -->
  <div class="w-full flex flex-col gap-y-3">
    <!-- Title -->
    <div class="h-4 w-full bg-neutral-800 rounded-lg" />
    <div class="h-4 bg-neutral-800 rounded-lg" style:width={titleWidth} />
    <div class="grid md:grid-cols-2 gap-3">
      <div class="flex gap-2 items-center text-sm text-neutral-400">
        <!-- Avatar user -->
        <div class="flex-shrink-0 w-8 h-8 bg-neutral-800 rounded-full" />
        <div>
          <!-- Username -->
          <div class="w-20 h-2 bg-neutral-800 rounded-lg" />
          <div class="mt-2 w-28 h-2 bg-neutral-800 rounded-lg" />
        </div>
      </div>
    </div>
    <!-- Categories -->
    <div class="mt-1 flex flex-wrap gap-2">
      {#each categoriesWidth as width}
        <span class="h-4 bg-neutral-800 rounded-lg" style:width />
      {/each}
    </div>
  </div>
</div>
