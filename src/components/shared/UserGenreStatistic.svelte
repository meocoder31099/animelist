<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { UserGenreStatistic } from "@/types/anilistv2";

  // Import Libs
  import { fade } from "svelte/transition";

  export let source: Maybe<UserGenreStatistic>[];

  let sumGenre: number = 0;
  let genrePercentages: {
    genre: string;
    count: number;
    percentage: string;
  }[] = [];

  const calculatePercentage = (value: number, total: number): string =>
    ((value / total) * 100).toFixed(2);

  if (!!source) {
    // Calculate the total genre count
    sumGenre = source.reduce(
      (sum, genre) => (!!genre ? sum + genre.count : sum),
      0
    );

    if (sumGenre) {
      // Calculate the percentages for each genre
      for (const genre of source) {
        !!genre?.genre &&
          genrePercentages.push({
            genre: genre.genre,
            count: genre.count,
            percentage: calculatePercentage(genre.count, sumGenre),
          });
      }
    }
  }
</script>

{#if !!genrePercentages.length}
  <div in:fade|global class="flex flex-col px-0.5 py-2 sm:px-0">
    <div class="w-full gap-4 md:gap-6 grid grid-cols-2 md:grid-cols-5">
      {#each genrePercentages as { genre, count, percentage }}
        <dl>
          <dt
            class="flex justify-between gap-1 text-sm sm:text-base md:text-sm xl:text-base text-neutral-300"
          >
            <span class="line-clamp-1">
              {genre} ({count})
            </span>
            <span
              class="text-sm sm:text-base md:text-sm xl:text-base text-neutral-300"
              >{`${percentage}%`}</span
            >
          </dt>
          <dd class="flex items-center">
            <div
              class="w-full bg-neutral-800 rounded-lg h-2 md:h-4 overflow-hidden"
            >
              <div
                class="bg-yellow-500 h-2 md:h-5"
                style:width={`${percentage}%`}
              />
            </div>
          </dd>
        </dl>
      {/each}
    </div>
  </div>
{/if}
