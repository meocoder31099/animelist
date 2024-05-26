<script lang="ts">
  // Import Libs
  import { onMount, createEventDispatcher } from "svelte";
  import { afterNavigate } from "$app/navigation";

  //Import Components
  import ScrollbarHozirontal from "@/components/shared/ScrollbarHozirontal.svelte";

  afterNavigate((navigation) => {
    if (navigation.to?.route.id === "/(app)/timeline")
      window.scrollTo({ top: 0 });
  });

  const dispatch = createEventDispatcher();
  const date = new Date();
  const dayLabels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentStartTimestamp = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
  const endTimestamp = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  ).getTime();
  const days = [
    ...[...Array(7)]
      .map((d, index) => {
        const temp: number = (index + 1) * 24 * 60 * 60 * 1000;
        return {
          start: currentStartTimestamp - temp,
          end: endTimestamp - temp,
          isCurrentDay: false,
          isActive: false,
        };
      })
      .reverse(),
    {
      start: currentStartTimestamp,
      end: endTimestamp,
      isCurrentDay: true,
      isActive: true,
    },
    ...[...Array(14)].map((d, index) => {
      const temp: number = (index + 1) * 24 * 60 * 60 * 1000;
      return {
        start: currentStartTimestamp + temp,
        end: endTimestamp + temp,
        isCurrentDay: false,
        isActive: false,
      };
    }),
  ];

  let currentDayActive = days.findIndex((day) => day.isActive);

  const pad = (number: number): string => {
    return number < 10 ? "0" + number.toString() : number.toString();
  };

  const getDateString = (date: number): string => {
    if (date === currentStartTimestamp) return "Today";
    const parseDate = new Date(date);
    return `${parseDate.getDate()} ${monthLabels[parseDate.getMonth()]}`;
  };

  const getDayString = (date: number): string =>
    dayLabels[new Date(date).getDay()];

  onMount(() => {
    setTimeout(() => {
      document
        .querySelector(`[data-time="${currentStartTimestamp}"]`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
    }, 10);
  });

  const changeDay = (index: number, dateDate: any) => {
    window.scrollTo({ top: 0 });
    days[currentDayActive]["isActive"] = false;
    currentDayActive = index;
    days[currentDayActive]["isActive"] = true;
    dispatch("dayData", dateDate);
    // Cuộn mục được chọn tới đầu của thanh cuộn
    document
      .querySelector(`[data-time="${days[currentDayActive].start}"]`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
  };
</script>

<div class="w-full">
  <ScrollbarHozirontal>
    {#each days as day, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => changeDay(index, day)}
        class={(day.isActive ? "bg-white/20 " : "bg-neutral-600/20 ") +
          "flex flex-col justify-center items-center shrink-0 text-center snap-start mr-2 lg:mr-4 w-36 lg:w-48 px-6 py-4 rounded-lg cursor-pointer"}
        data-time={day.start}
      >
        <span class="font-bold font-lexenddeca">{getDayString(day.start)}</span>
        <div
          class="text-sm text-neutral-400"
          class:font-bold={day.isCurrentDay}
          class:font-lexenddeca={day.isCurrentDay}
        >
          {getDateString(day.start)}
        </div>
      </div>
    {/each}
  </ScrollbarHozirontal>
</div>
