<script lang="ts">
  // Import Stores
  import {
    isLoading,
    isSuccess,
    recommendations,
  } from "../../../../../../stores/DetailPageStore";

  // Import Components
  import Recommendations from "../../../../../../components/DetailsPage/Recommendations.svelte";
</script>

<!-- Characters -->
<Recommendations
  isLoading={$isLoading}
  isSuccess={$isSuccess}
  source={$recommendations}
/>
