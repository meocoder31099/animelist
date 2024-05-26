<script lang="ts">
  // Import Stores
  import {
    isLoading,
    isSuccess,
    relations,
  } from "../../../../../../stores/DetailPageStore";

  // Import Components
  import Relations from "../../../../../../components/DetailsPage/Relations.svelte";
</script>

<!-- Characters -->
<Relations isLoading={$isLoading} isSuccess={$isSuccess} source={$relations} />
