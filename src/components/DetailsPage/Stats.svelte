<script lang="ts">
  // Import Types
  import type { MediaStats } from "@/types/anilist";

  // Import Libs
  import { fade } from "svelte/transition";

  export let source: MediaStats;

  const ratingPercentages: Record<number, string> = {};
  let averageScoreFixed: string = "0.00";
  let averageRatingTrust: boolean = true;
  let sumRating: number = 0;
  let sumRatingString: string = "0";

  const calculatePercentage = (value: number, total: number): string =>
    ((value / total) * 100).toFixed(2);

  if (!!source.scoreDistribution) {
    // Calculate the total number of ratings
    sumRating = source.scoreDistribution?.reduce((total, scoreDistribution) => {
      return total + (scoreDistribution.amount as number);
    }, 0);

    if (sumRating) {
      // Format sumRating to locale string
      sumRatingString = sumRating.toLocaleString("en-US");

      // Calculate the average score
      let totalScore: number = 0;
      let totalAmount: number = 0;
      let averageScore: number = 0;

      for (let i = 0; i < source.scoreDistribution.length; i++) {
        totalScore +=
          (source.scoreDistribution[i].score as number) *
          (source.scoreDistribution[i].amount as number);
        totalAmount += source.scoreDistribution[i].amount as number;
      }
      averageScore = totalScore / totalAmount / 10;
      averageScoreFixed = averageScore.toFixed(2);

      // Check averageRatingTrust
      if (sumRating <= 500) averageRatingTrust = false;

      // Calculate the average score of each group of scores
      source.scoreDistribution.forEach((scoreDistribution) => {
        ratingPercentages[scoreDistribution.score as number] =
          calculatePercentage(scoreDistribution.amount as number, sumRating);
      });
    }
  }
</script>

{#if source.scoreDistribution}
  <div in:fade|global class="flex flex-col px-0.5 py-2 sm:px-0">
    <div class="flex flex-col gap-y-2 mb-5">
      <div class="flex items-center">
        <p
          class="bg-white text-black text-xl md:text-2xl font-bold inline-flex items-center p-2 rounded-lg"
        >
          {averageScoreFixed}
        </p>
        <p class="ml-2 font-bold text-xl text-white">Average Score</p>
        <span class="w-1 h-1 mx-2 bg-gray-500 rounded-full" />
        <p class="text-neutral-300">{sumRatingString} reviews</p>
      </div>
      {#if !averageRatingTrust}
        <div>
          <span class="text-neutral-300 text-sm"
            >*A low number of ratings can result in an unreliable average score.</span
          >
        </div>
      {/if}
    </div>
    <div class="w-full gap-4 md:gap-6 grid grid-cols-2 md:grid-cols-5">
      {#each source.scoreDistribution as scoreDistribution}
        {#if !!scoreDistribution}
          <dl>
            <dt
              class="flex justify-between gap-1 text-sm sm:text-base md:text-sm xl:text-base text-neutral-300"
            >
              <span class="line-clamp-1">
                {scoreDistribution.score} score ({scoreDistribution.amount})
              </span>
              <span
                class="text-sm sm:text-base md:text-sm xl:text-base text-neutral-300"
                >{`${
                  ratingPercentages[scoreDistribution.score || 0] || 0
                }%`}</span
              >
            </dt>
            <dd class="flex items-center">
              <div
                class="w-full bg-neutral-800 rounded-lg h-2 md:h-5 overflow-hidden"
              >
                <div
                  class="bg-yellow-500 h-2 md:h-5"
                  style:width={`${
                    ratingPercentages[scoreDistribution.score || 0] || 0
                  }%`}
                />
              </div>
            </dd>
          </dl>
        {/if}
      {/each}
    </div>
  </div>
{/if}
