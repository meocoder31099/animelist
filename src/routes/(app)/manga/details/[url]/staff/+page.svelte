<script lang="ts">
  // Import Stores
  import { isLoading, isSuccess, staff } from "@/stores/DetailPageStore";

  // Import Components
  import Staff from "@/components/DetailsPage/Staff.svelte";
</script>

<!-- Characters -->
<Staff isLoading={$isLoading} isSuccess={$isSuccess} source={$staff} />
