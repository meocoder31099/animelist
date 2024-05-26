<script lang="ts">
  // Import Libs
  import { fade } from "svelte/transition";

  // Import components
  import ListAiring from "@/components/shared/ListAiring.svelte";

  let isFristLoading: boolean = true;
  let isSuccess: boolean = false;

  const currentDay = new Date().getDay();
  let currentViewDay = currentDay;
  const days: { value: number; label: string }[] = [
    { value: 0, label: "Sun" },
    { value: 1, label: "Mon" },
    { value: 2, label: "Tue" },
    { value: 3, label: "Web" },
    { value: 4, label: "Thu" },
    { value: 5, label: "Fri" },
    { value: 6, label: "Sat" },
  ];

  const getStartToEndTimestampsDate = (day: number): [number, number] => {
    const dayDifference = currentDay - day;
    const date = new Date();
    const startTimestamp =
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() -
      dayDifference * 24 * 60 * 60 * 1000;
    const endTimestamp =
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999
      ).getTime() -
      dayDifference * 24 * 60 * 60 * 1000;
    return [Math.floor(startTimestamp / 1000), Math.floor(endTimestamp / 1000)];
  };

  let airingAt = getStartToEndTimestampsDate(currentDay);

  const changeDay = (day: number) => {
    isFristLoading =
      false; /* Khi thay đổi ngày sẽ không kích hoạt loading lại title */
    airingAt = getStartToEndTimestampsDate(day);
    currentViewDay = day;
  };
</script>

<div class="flex flex-col mt-2">
  <div class="flex items-center px-2 md:px-6 lg:px-8 text-white">
    <div class="flex gap-x-12">
      {#if isSuccess || !isFristLoading}
        <div in:fade>
          <h2 class="text-lg md:text-xl lg:text-2xl 3xl:text-3xl font-bold">
            Airing
          </h2>
        </div>
        <ul
          class="hidden md:flex flex-wrap items-center gap-x-6 text-sm lg:text-base"
        >
          {#each days as day (day.value)}
            <li>
              <button
                on:click={() => changeDay(day.value)}
                class="py-1 px-4 rounded-lg hover:bg-neutral-800"
                class:text-rose-400={day.value === currentDay}
                class:font-medium={day.value === currentDay}
                class:bg-neutral-800={day.value === currentViewDay}
              >
                {day.label}
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="h-8 w-44 rounded-lg bg-neutral-800 animate-pulse" />
      {/if}
    </div>
  </div>

  {#key currentViewDay}
    <ListAiring
      on:isSuccess={(event) => {
        isSuccess = event.detail;
      }}
      airingAtGreater={airingAt[0]}
      airingAtLesser={airingAt[1]}
    />
  {/key}
</div>
