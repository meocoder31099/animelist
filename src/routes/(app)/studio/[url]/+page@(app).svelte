<script lang="ts">
  // Import Types
  import type { PageData } from "./$types";
  import type { Maybe, CardMediaVerticalOptions } from "@/types";
  import type { MediaEdge } from "@/types/anilist";

  // Import Enum
  import { MediaSort } from "@/types/anilist";

  // Import Libs
  import { onMount, onDestroy } from "svelte";
  import {
    siteName,
    siteThemeColor,
    siteSocialImageUrl,
    studioDescription,
  } from "@/configs";
  import { page } from "$app/stores";
  import { scale } from "svelte/transition";
  import { debounce, isBottomPage } from "@/utils";
  import useStudioDetails from "@/hooks/useStudioDetails";
  import useCreateLink from "@/hooks/useCreateLink";

  // Import components
  import SEO from "@/components/shared/SEO.svelte";
  import CardMediaVertical from "@/components/shared/CardMediaVertical.svelte";
  import CardVerticalBaseSkeleton from "@/components/skeletons/CardVerticalBaseSkeleton.svelte";

  export let data: PageData;

  // Header data
  let pageDescription: string = studioDescription;
  let pageHref: Maybe<string> = null;
  let pageTitle: Maybe<string> = siteName;
  let pageSocialImageUrl: Maybe<string> = siteSocialImageUrl;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let studioInfo: {
    name: string;
    favourites?: number;
    id: number;
    isAnimationStudio?: boolean;
  };
  let fetchNextPage: () => void;
  let cardMediaVerticalOptions: CardMediaVerticalOptions[] = [];
  const pageData = useStudioDetails({
    args: {
      id: data.Id,
      mediaSort: [MediaSort.Start_date_desc],
    },
  });

  const pageStore_unsubscribe = page.subscribe((value) => {
    pageHref = value.url.href;
  });

  onMount(() => {
    const pageData_unsubscribe = pageData.subscribe((value) => {
      const pages = value.data?.pages;
      const firstPage = pages?.[0];
      if (!!firstPage && !value.isFetchingNextPage) {
        !studioInfo &&
          (studioInfo = {
            name: firstPage.name,
            favourites: firstPage.favourites || 0,
            id: firstPage.id,
            isAnimationStudio: firstPage.isAnimationStudio,
          }) &&
          (pageTitle = `${firstPage.name} — ${siteName}`);

        // Add media to cardMediaVerticalOptions
        if (cardMediaVerticalOptions.length) {
          const lastPageIndex = pages.length - 1;
          const edgesTemp = pages?.[lastPageIndex]?.media?.edges;
          if (edgesTemp) {
            cardMediaVerticalOptions = cardMediaVerticalOptions.concat(
              edgesToCardMediaOptionsProps(edgesTemp)
            );
          }
        } else {
          for (const page of pages) {
            if (page?.media?.edges) {
              const edgesTemp = page.media.edges;
              const options = edgesToCardMediaOptionsProps(edgesTemp);
              cardMediaVerticalOptions =
                cardMediaVerticalOptions.concat(options);
            }
          }
        }
      }

      isLoading = value.isLoading || value.isFetchingNextPage || false;
      fetchNextPage = value.fetchNextPage;
      hasNextPage = !!value.hasNextPage;
      !hasNextPage && window.removeEventListener("scroll", handleScroll);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      pageData_unsubscribe();
    };
  });

  const edgesToCardMediaOptionsProps = (
    edges: MediaEdge[]
  ): CardMediaVerticalOptions[] => {
    return edges.map(({ node, isMainStudio }) => {
      return {
        id: node?.id || 0,
        coverImage: {
          alt: node?.title?.userPreferred,
          image:
            node?.coverImage?.large ||
            node?.coverImage?.extraLarge ||
            node?.coverImage?.medium,
          color: node?.coverImage?.color,
        },
        title: node?.title?.userPreferred,
        to: useCreateLink([
          "/",
          { value: node?.type || "", convert: "lowcase" },
          "/details/",
          {
            value: node?.title?.userPreferred || "",
            convert: "-",
          },
          "-an",
          node?.id || 0,
        ]),
        bannerImage: node?.bannerImage,
        subDescription: `${node?.format || "?"} — ${
          node?.startDate?.year || "TBA"
        } — ${isMainStudio ? "Studio" : "Producer"}`,
      };
    });
  };

  const handleScroll = debounce(() => {
    if (isBottomPage() && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, 100);

  onDestroy(() => {
    pageStore_unsubscribe();
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

<div
  class="w-full flex flex-col gap-8 mx-auto mt-20 pt-4 px-2 sm:px-6 md:px-9 lg:px-1 2xl:px-9"
>
  <!-- Title -->
  {#if studioInfo?.name}
    <div>
      <h2 class="text-lg md:text-xl lg:text-2xl">
        Anime Projects by <span class="font-bold">{studioInfo.name}</span>
      </h2>
    </div>
  {:else}
    <div class="w-56 h-8 bg-neutral-800 rounded-lg animate-pulse" />
  {/if}

  <!-- List if media -->
  <div
    class="w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 gap-x-2 sm:gap-x-2.5 md:gap-x-2 lg:gap-x-3 2xl:gap-x-4 4xl:gap-x-5 gap-y-4 lg:gap-y-6"
  >
    {#if !!cardMediaVerticalOptions.length}
      {#each cardMediaVerticalOptions as options}
        <div class="col-span-1">
          <CardMediaVertical {options} />
        </div>
      {/each}
    {/if}
    <!-- Sekeleton -->
    {#if isLoading}
      {#each { length: 4 } as _, i}
        <div in:scale|global={{ delay: i * 200, start: 0.9 }}>
          <CardVerticalBaseSkeleton />
        </div>
      {/each}
    {/if}
  </div>
  {#if !isLoading && !hasNextPage}
    <div class="w-full text-center my-20">Không còn kết quả nào!</div>
  {/if}
</div>
