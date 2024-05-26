<script lang="ts">
  // Import Stores
  import { isLoading, isSuccess, characters } from "@/stores/DetailPageStore";

  // Import Components
  import Characters from "@/components/DetailsPage/Characters.svelte";
</script>

<!-- Characters -->
<Characters
  isLoading={$isLoading}
  isSuccess={$isSuccess}
  source={$characters}
/>
