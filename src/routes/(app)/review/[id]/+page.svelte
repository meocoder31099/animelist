<script lang="ts">
  // Import Types
  import type { PageData } from "./$types";

  // Import Libs
  import { onMount } from "svelte";
  import useReviewDetails from "@/hooks/useReviewDetails";
  import { formatTimeAgo } from "@/utils";
  import { DEFAULT_AVATAR } from "@/constants";

  // Import Components
  import MarkdownParse from "@/components/shared/MarkdownParse.svelte";
  import Image from "@/components/shared/Image.svelte";

  export let data: PageData;

  let isReady: Boolean = false;
  let userAvatar: string;
  let userName: string;
  let createdAgo: string;
  let reviewContent: string;
  let reviewScore: number;
  let reviewScoreBackgroundColor: string;
  let reviewRating: number;
  let reviewRatingAmount: number;
  let mediaTitle: string;
  const reviewStore = useReviewDetails({
    args: {
      id: parseInt(data.reviewId),
    },
  });

  onMount(() => {
    const unReviewStore = reviewStore.subscribe(({ data }) => {
      if (!!data) {
        userAvatar = data.user?.avatar?.medium ?? DEFAULT_AVATAR;
        userName = data.user?.name ?? "";
        createdAgo = formatTimeAgo(data.createdAt);
        reviewContent = data.body ?? "";
        reviewScore = data.score ?? 0;
        reviewScoreBackgroundColor = scoreBackgroundColor(reviewScore);
        reviewRating = data.rating ?? 0;
        reviewRatingAmount = data.ratingAmount ?? 0;
        mediaTitle = data.media?.title?.userPreferred ?? "";

        isReady = true;
      }
    });

    return () => {
      unReviewStore();
    };
  });

  const scoreBackgroundColor = (score: number): string => {
    if (score <= 20) return "score__red";
    if (score <= 40) return "score__orange";
    if (score <= 60) return "score__yellow";
    if (score <= 80) return "score__blue";
    return "score__green";
  };
</script>

{#if !!isReady}
  <div
    class="max-w-details w-full flex flex-col justify-center items-center gap-x-6 gap-y-4 mx-auto mt-16 sm:mt-20 sm:px-6 md:px-9 lg:px-1 2xl:px-9"
  >
    <!-- Review Details -->
    <div class="max-w-5xl w-full bg-neutral-900 p-4 sm:p-10 sm:rounded-lg">
      <!-- Review Header -->
      <div class="flex items-center gap-x-2 mb-6">
        <!-- User Avatar -->
        <div class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
          <Image src={userAvatar} />
        </div>
        <div class="w-full flex flex-wrap gap-x-2 justify-between">
          <!-- User Name -->
          <div class="font-bold">
            {userName}
          </div>
          <!-- Review Create At -->
          <div>{createdAgo}</div>
        </div>
      </div>
      <MarkdownParse markdown={reviewContent} />
      <!-- Media -->
      <div
        class="inline-block mt-6 bg-neutral-800 text-sm px-2 py-1 rounded-lg"
      >
        <span class="line-clamp-1">{mediaTitle}</span>
      </div>

      <div
        class="w-full text-center p-4 mt-6 rounded-lg {reviewScoreBackgroundColor}"
      >
        <span class="text-5xl">{reviewScore}</span><span class="italic"
          >/100</span
        >
      </div>
    </div>
    <!-- Review Vote -->
    <div class="flex gap-6 px-4 mt-6">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="w-6 h-6 fill-current"
          ><path
            d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"
          /></svg
        >
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="w-6 h-6 fill-current"
          ><path
            d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2.004 2.004 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638L11.531 20zM18 14V5h2l.001 9H18z"
          /></svg
        >
      </button>
      <span
        >{reviewRating} out of {reviewRatingAmount} users liked this review</span
      >
    </div>
  </div>
{/if}

<style lang="postcss">
  .score__red {
    @apply bg-red-500;
  }

  .score__orange {
    @apply bg-orange-500;
  }

  .score__yellow {
    @apply bg-yellow-500;
  }

  .score__blue {
    @apply bg-blue-500;
  }

  .score__green {
    @apply bg-green-500;
  }
</style>
