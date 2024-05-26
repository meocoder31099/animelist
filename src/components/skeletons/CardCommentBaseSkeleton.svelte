<script lang="ts">
  // Import Libs
  import { onMount } from "svelte";

  let contentHeight: string;

  onMount(() => {
    // Calculate random heigh for comment content.
    contentHeight = `${(Math.floor(Math.random() * 3) + 3) * 20}px`;
  });
</script>

<div class="flex gap-x-2 animate-pulse">
  <!-- Avatar -->
  <div class="flex-shrink-0 w-10 h-10 mt-1 bg-neutral-800 rounded-full" />
  <div class="w-full">
    <!-- Content -->
    <div
      class="w-full bg-neutral-900 rounded-lg"
      style:height={contentHeight}
    />
  </div>
</div>
