<script lang="ts">
  // Import Types
  import type { QueryReviewArgs } from "@/types/anilistv2";

  // Import Components
  import ReviewFetcher from "@/components/shared/ReviewFetcher.svelte";

  const args: QueryReviewArgs = {};
</script>

<div
  class="w-full flex flex-col gap-4 mx-auto mt-20 px-2 sm:px-6 md:px-9 lg:px-1 2xl:px-9"
>
  <ReviewFetcher {args} />
</div>
