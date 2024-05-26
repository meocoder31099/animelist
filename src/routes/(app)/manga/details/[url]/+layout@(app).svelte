<script lang="ts">
  // Import Types
  import type { LayoutData } from "./$types";

  // Import Component
  import MediaDetailsWarp from "@/components/wrapped/MediaDetailsWarp.svelte";

  export let data: LayoutData;
</script>

{#key data.Id}
  <MediaDetailsWarp id={data.Id}>
    <slot />
  </MediaDetailsWarp>
{/key}
