<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { UserStatistics } from "@/types/anilistv2";

  // Import Components
  import UserGenreStatistic from "@/components/shared/UserGenreStatistic.svelte";

  export let statistic: Maybe<UserStatistics>;
</script>

{#if !!statistic}
  <div
    class="flex flex-col gap-y-2 bg-neutral-900 p-4 md:p-6 rounded-lg divide-y divide-neutral-800"
  >
    <div class="w-full flex justify-evenly">
      <div class="flex flex-col items-center text-center">
        <span class="font-semibold md:text-2xl">{statistic.count}</span>
        <h3 class="text-xs md:text-sm lg:text-base text-neutral-300">
          Total Anime
        </h3>
      </div>
      {#if !!statistic.episodesWatched}
        <div class="flex flex-col items-center text-center">
          <span class="font-semibold md:text-2xl"
            >{statistic.episodesWatched}</span
          >
          <h3 class="text-xs md:text-sm lg:text-base text-neutral-300">
            Episodes Watched
          </h3>
        </div>
      {/if}
      {#if !!statistic.minutesWatched}
        <div class="flex flex-col items-center text-center">
          <span class="font-semibold md:text-2xl"
            >{statistic.minutesWatched}</span
          >
          <h3 class="text-xs md:text-sm lg:text-base text-neutral-300">
            Days Watched
          </h3>
        </div>
      {/if}
      {#if !!statistic.chaptersRead}
        <div class="flex flex-col items-center text-center">
          <span class="font-semibold md:text-2xl">{statistic.chaptersRead}</span
          >
          <h3 class="text-xs md:text-sm lg:text-base text-neutral-300">
            Chapters Read
          </h3>
        </div>
      {/if}
      {#if !!statistic.volumesRead}
        <div class="flex flex-col items-center text-center">
          <span class="font-semibold md:text-2xl">{statistic.volumesRead}</span>
          <h3 class="text-xs md:text-sm lg:text-base text-neutral-300">
            Volumes Read
          </h3>
        </div>
      {/if}
      <div class="flex flex-col items-center text-center">
        <span class="font-semibold md:text-2xl">{statistic.meanScore}</span>
        <h3 class="text-xs md:text-sm lg:text-base text-neutral-300">
          Mean Score
        </h3>
      </div>
      <div class="flex flex-col items-center text-center">
        <span class="font-semibold md:text-2xl"
          >{statistic.standardDeviation}</span
        >
        <h3 class="text-xs md:text-sm lg:text-base text-neutral-300">
          Standard Deviation
        </h3>
      </div>
    </div>
    <!-- Genre Preview -->
    <div class="mt-4">
      <UserGenreStatistic source={statistic.genres || []} />
    </div>
  </div>
{/if}
