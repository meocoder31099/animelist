<script lang="ts">
  // import Types
  import type { Maybe, Tab } from "@/types";
  import type { Media } from "@/types/anilist";

  // Import Libs
  import { onDestroy, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { siteName, siteThemeColor } from "@/configs";
  import useMediaDetails from "@/hooks/useMediaDetails";
  import useHTMLtoPlainText from "@/hooks/useHTMLtoPlainText";

  // Import Stores
  import { page } from "$app/stores";
  import {
    tabActive,
    isLoading as isLoadingStore,
    isSuccess as isSuccessStore,
    source as sourceStore,
    stats,
    externalLink,
    streamingEpisodes,
    rankings,
    characters,
    staff,
    relations,
    recommendations,
  } from "@/stores/DetailPageStore";

  // Import Component
  import SEO from "@/components/shared/SEO.svelte";
  import BannerImage from "@/components/DetailsPage/BannerImage.svelte";
  import Description from "@/components/DetailsPage/Description.svelte";
  import TabBase from "@/components/shared/TabBase.svelte";

  export let id: number;

  let isLoading: boolean = true;
  let isSuccess: boolean = false;
  let source: Maybe<Media> = null;
  let routeID: Maybe<string> = null;
  let tabs: Tab = [
    // {
    //   key: "trailer",
    //   name: "Trailer",
    //   isActive: false,
    //   path: `/anime/details/${$page.params.url}/trailer`,
    // },
  ];
  let pageType: Maybe<string> = null;
  let pageDescription: string = "";
  let pageUrl: string;
  let pageHref: Maybe<string> = null;
  let pageName: Maybe<string> = null;
  let pageTitle: Maybe<string> = null;
  let pageSocialImageUrl: Maybe<string> = null;
  const details = useMediaDetails({
    args: {
      id: id,
    },
  });
  const setTabActive = (routeID: Maybe<string>): void => {
    if (routeID) {
      const lastSlashIndex = routeID.lastIndexOf("[url]");
      const key: string = routeID.slice(lastSlashIndex + 6) || "details";
      const currentActiveTabIndex = tabs.findIndex((tab) => tab.isActive);
      if (currentActiveTabIndex !== -1)
        tabs[currentActiveTabIndex].isActive = false;
      let activeTabIndex = tabs.findIndex((tab) => tab.key === key);
      if (activeTabIndex === -1) activeTabIndex = 0;
      tabs[activeTabIndex].isActive = true;
      tabActive.set(tabs[activeTabIndex].key);
    }
  };

  const pageStore_unsubscribe = page.subscribe((value) => {
    routeID = value.route.id;
    pageUrl = value.params.url;
    pageHref = value.url.href;
  });

  if (!!routeID) {
    const routeId = routeID as string;
    const lastSlashIndex = routeId.lastIndexOf("[url]");
    pageName = routeId.slice(lastSlashIndex + 6) || null;
    if (!!pageName)
      pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  }

  const details_unsubscribe = details.subscribe((value) => {
    isLoadingStore.set(value.isLoading);
    isSuccessStore.set(value.isSuccess);

    source = value.data ?? null;
    // Set header data.
    pageDescription = useHTMLtoPlainText(value.data?.description || "");
    pageTitle = `${value.data?.title?.userPreferred}${
      (value.data?.title?.userPreferred?.length || 41) <= 40 &&
      !!value.data?.title?.english
        ? ` (${value.data?.title?.english})`
        : ""
    }${!!pageName ? ` — ${pageName}` : ""} — ${siteName}`;
    pageType = value.data?.type?.toLocaleLowerCase() || "anime";
    pageSocialImageUrl =
      value.data?.bannerImage ||
      value.data?.coverImage?.extraLarge ||
      value.data?.coverImage?.large ||
      value.data?.coverImage?.medium ||
      "";

    //Set Store
    if (!!value.data) {
      sourceStore.set(value.data);

      tabs.push({
        key: "details",
        name: "Details",
        isActive: false,
        path: `/${pageType}/details/${pageUrl}`,
      });
    }
    stats.set(value.data?.stats ?? null);
    externalLink.set(value.data?.externalLinks ?? null);
    if (value.data?.streamingEpisodes && value.data.streamingEpisodes.length) {
      tabs.push({
        key: "watch",
        name: "Watch",
        isActive: false,
        path: `/${pageType}/details/${pageUrl}/watch`,
      });
      streamingEpisodes.set(value.data?.streamingEpisodes);
    }
    if (value.data?.characters?.edges && value.data?.characters?.edges.length) {
      tabs.push({
        key: "characters",
        name: "Characters",
        isActive: false,
        path: `/${pageType}/details/${pageUrl}/characters`,
      });
      characters.set(value.data?.characters?.edges);
    }
    if (value.data?.staff?.edges && value.data?.staff?.edges.length) {
      tabs.push({
        key: "staff",
        name: "Staff",
        isActive: false,
        path: `/${pageType}/details/${pageUrl}/staff`,
      });
      staff.set(value.data?.staff?.edges);
    }
    relations.set(value.data?.relations?.edges || null);
    if (
      value.data?.recommendations?.edges &&
      value.data?.recommendations?.edges.length
    ) {
      tabs.push({
        key: "recommendations",
        name: "Recommendations",
        isActive: false,
        path: `/${pageType}/details/${pageUrl}/recommendations`,
      });
      recommendations.set(value.data?.recommendations?.nodes);
    }
    rankings.set(value.data?.rankings ?? null);

    if (!!source) setTabActive(routeID);
    // Update Status
    isLoading = value.isLoading;
    isSuccess = value.isSuccess;
  });

  onMount(() => {});

  onDestroy(() => {
    pageStore_unsubscribe();
    details_unsubscribe();
    // Reset tabActive value.
    tabActive.set("");
  });
</script>

<SEO
  {pageDescription}
  {pageHref}
  {pageTitle}
  {pageSocialImageUrl}
  {siteName}
  {siteThemeColor}
/>

<!-- Banner image -->
<BannerImage
  {isLoading}
  {isSuccess}
  imageUrl={source
    ? source?.bannerImage ||
      source?.coverImage?.extraLarge ||
      source?.coverImage?.large
    : ""}
/>

<!-- Description -->
<Description {isLoading} {isSuccess} {source} />

<div
  class="w-full max-w-details flex flex-col lg:flex-row gap-8 mx-auto lg:px-6 2xl:px-9"
>
  <!-- <div class="w-full lg:w-52 3xl:w-56 shrink-0 order-last lg:order-first"> -->
  <!-- Info -->
  <!-- <Info
        isLoading={$isLoading}
        isSuccess={$isSuccess}
        source={$isSuccess ? mediaData : {}}
      /> -->

  <!-- List of tags -->
  <!-- <Tags
      isLoading={$isLoading}
      isSuccess={$isSuccess}
      tags={$isSuccess ? mediaData.tags : {}}
    /> -->
  <!-- </div> -->
  <div class="w-full grid grid-cols-1">
    <div class="col-span-1">
      <!-- <div
          class="mt-6 text-sm md:text-base font-medium px-2 sm:px-6 md:px-8 lg:px-4 xl:px-2 2xl:px-0"
        >
          {#each $rankings as ranking}
            <RankingMedia source={ranking} /><span class="mr-2 md:mr-4" />
          {/each}
        </div> -->

      <!-- UserActionForMedia -->
      <div class="my-10">
        <!-- <UserActionForMedia /> -->
      </div>
      <!-- Tabs -->
      <TabBase
        align="left"
        {isSuccess}
        bind:items={tabs}
        on:changeTab={(e) => {
          goto(e.detail.path, {
            noScroll: true,
            replaceState: true,
            state: {
              isNotSaveHistory: true,
            },
          });
          tabActive.set(e.detail.key);
        }}
      />
      <div class="px-2 sm:px-6 md:px-9 lg:px-1 mt-8">
        <slot />
      </div>
    </div>

    <!-- Relations -->
    <!-- <Relations
      isLoading={$isLoading}
      isSuccess={$isSuccess}
      source={isSuccess ? mediaData.relations.edges : []}
    /> -->

    <!-- Recommendations -->
    <!-- <Recommendations
      isLoading={$isLoading}
      isSuccess={$isSuccess}
      source={isSuccess ? mediaData.recommendations.edges : []}
    /> -->
  </div>
</div>
