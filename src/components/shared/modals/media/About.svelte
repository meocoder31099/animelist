<script lang="ts">
  //Import Types
  import type { Media } from "@/types/anilist";

  //Import Components
  import Info from "@/components/DetailsPage/Info.svelte";

  export let source: Media;
</script>

{#if !!source}
  <div class="w-full border-t-2 border-neutral-800" />
  <div class="w-full flex flex-col md:px-6 lg:px-12 pt-10 pb-6">
    <!-- Title -->
    <div class="w-full mb-2">
      <span class="text-2xl">About</span>
      <span class="text-2xl font-bold">{source.title?.userPreferred}</span>
    </div>
    <Info {source} />
  </div>
{/if}
