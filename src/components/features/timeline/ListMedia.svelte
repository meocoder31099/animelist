<script lang="ts">
  // Import Types
  import type { Page } from "@/types/anilist";

  // Import Libs
  import { fade } from "svelte/transition";

  //Import Components
  import TimelineCard from "@/components/shared/TimelineCard.svelte";
  import type { Maybe } from "@/types";

  export let source: Maybe<Page>[] = [];
  let sourceFilted: any = {};
  let timeAirings: number[] = [];
  let timeAiringLabels: Record<number, string> = {};

  let numberSource = 0;

  $: if (numberSource !== source.length) {
    // Kiểm tra xem `numberSource` có lớn hơn source.length - 1 hay không
    // Nếu đúng thì đặt numberSource = 1 để vòng lặp chạy từ đầu và lấy data của tất cả các trang
    // Nếu sai thì đặt numberSource = source.length để lấy data của trang cuối
    numberSource = source.length - 1 > numberSource ? 1 : source.length;
    for (let index = numberSource - 1; index < source.length; index++) {
      const mediaData = source[index];
      if (mediaData?.airingSchedules)
        mediaData?.airingSchedules.forEach((airingSchedule: any) => {
          if (airingSchedule.media.isAdult) return;
          //   if (airingSchedule.media.genres.includes('Hentai')) return;
          const timeAiring = airingSchedule.airingAt;
          if (!sourceFilted[timeAiring]) {
            sourceFilted[timeAiring] = [];
            timeAirings.push(timeAiring);
            timeAiringLabels[timeAiring] = getTimeString(timeAiring);
          }
          sourceFilted[timeAiring].push(airingSchedule);
        });
    }
  }

  const pad = (number: number): string => {
    return number < 10 ? "0" + number.toString() : number.toString();
  };

  const getTimeString = (date: string): string => {
    const parseDate = new Date(parseInt(date) * 1000);
    return `${pad(parseDate.getHours())}:${pad(parseDate.getMinutes())}`;
  };
</script>

<div class="w-full">
  <ol in:fade class="w-full">
    {#each timeAirings as timeAiring}
      <li class="w-full flex flex-col gap-2 mb-6">
        <div class="flex">
          <span class="text-lg font-bold">{timeAiringLabels[timeAiring]}</span>
        </div>
        <div class="w-full flex flex-col gap-2">
          {#each sourceFilted[timeAiring] as airingSchedule}
            <TimelineCard
              source={airingSchedule}
              time={timeAiringLabels[timeAiring]}
            />
          {/each}
        </div>
      </li>
    {/each}
  </ol>
</div>
