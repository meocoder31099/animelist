<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    siteName,
    siteThemeColor,
    siteUrl,
    siteSocialImageUrl,
    timelineDescription,
  } from "@/configs";
  import { browser } from "$app/environment";
  import {
    aniListEndPoint,
    aniListQueryAiringSchedule,
  } from "../../../utils/aniList";
  import { page } from "$app/stores";
  import { createInfiniteQuery } from "@tanstack/svelte-query";
  import { debounce, fetchPOST, isBottomPage } from "../../../utils";
  import useAiringSchedules from "@/hooks/useAiringSchedules";

  //Import Components
  import SEO from "@/components/shared/SEO.svelte";
  import Days from "@/components/features/timeline/Days.svelte";
  import Media from "@/components/features/timeline/Media.svelte";

  const pageTitle: string = `Schedule | Timeline — Anime — ${siteName}`;
  const pageHref: string = $page.url.href;
  const pageDescription: string = timelineDescription;
  const pageSocialImageUrl: string = siteSocialImageUrl;

  const date = new Date();
  let airingAtGreater = Math.floor(
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() /
      1000
  );
  let airingAtLesser = Math.floor(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    ).getTime() / 1000
  );

  const updateTime = (startTime: number, endTime: number) => {
    airingAtGreater = Math.floor(startTime / 1000);
    airingAtLesser = Math.floor(endTime / 1000);
  };
</script>

<SEO
  {pageDescription}
  {pageHref}
  {pageTitle}
  {pageSocialImageUrl}
  {siteName}
  {siteThemeColor}
/>

<div class="mt-20">
  <div class="flex flex-col gap-10 py-2 lg:py-4 px-2 md:px-6 lg:px-8">
    <div class="w-full xl:max-w-4xl 3xl:max-w-5xl mx-auto">
      <Days
        on:dayData={(event) => {
          updateTime(event.detail.start, event.detail.end);
        }}
      />
    </div>
    {#key airingAtGreater}
      <Media {airingAtGreater} {airingAtLesser} />
    {/key}
  </div>
</div>
