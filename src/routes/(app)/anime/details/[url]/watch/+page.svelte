<script lang="ts">
  // Import Stores
  import {
    isLoading,
    isSuccess,
    streamingEpisodes,
  } from "../../../../../../stores/DetailPageStore";

  // Import Components
  import ListEpisodes from "@/components/DetailsPage/ListEpisodes.svelte";
</script>

<!-- Characters -->
<ListEpisodes
  isLoading={$isLoading}
  isSuccess={$isSuccess}
  source={$streamingEpisodes}
/>
