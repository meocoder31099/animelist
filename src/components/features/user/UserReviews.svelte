<script lang="ts">
  // Import Types
  import type { QueryReviewArgs } from "@/types/anilistv2";

  // Import Components
  import ReviewFetcher from "@/components/shared/ReviewFetcher.svelte";

  export let userId: number;

  const args: QueryReviewArgs = {
    userId,
  };
</script>

<ReviewFetcher {args} gridColsAndGap='grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8' />
