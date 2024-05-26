<script lang="ts">
  // Import Types
  import type { Maybe, Tab } from "@/types";
  import type { Character } from "@/types/anilist";
  import type { PageData } from "./$types";

  // Import Libs
  import { onDestroy, onMount } from "svelte";
  import { page } from "$app/stores";
  import { siteName, siteThemeColor } from "@/configs";
  import { isBottomPage } from "@/utils";
  import { fade } from "svelte/transition";
  import useCharacterDetails from "@/hooks/useCharacterDetails";
  import useDebounce from "@/hooks/useDebounce";
  import useAnilistDescriptionsFromat from "@/hooks/useAnilistDescriptionsFromat";

  // Import components
  import SEO from "@/components/shared/SEO.svelte";
  import Image from "@/components/shared/Image.svelte";
  import TabBase from "@/components/shared/TabBase.svelte";
  import CharacterCard from "@/components/shared/CharacterCard.svelte";
  import TimelineCardSkeleton from "@/components/skeletons/TimelineCardSkeleton.svelte";

  export let data: PageData;

  const tabsItems: Tab = [
    {
      key: "about",
      path: "about",
      name: "About",
      isActive: true,
    },
    {
      key: "media",
      path: "anime-manga",
      name: "Anime/Manga",
      isActive: false,
    },
  ];
  let currentTab = tabsItems.find((e) => e.isActive)?.key;

  // Header data
  let pageDescription: string = "";
  let pageHref: Maybe<string> = null;
  let pageTitle: Maybe<string> = null;
  let pageSocialImageUrl: Maybe<string> = null;

  let isSetHeaderData: boolean = false;
  let isSuccess: boolean = false;
  let isFetching: boolean = false;
  let hasNextPage: boolean | undefined = undefined;
  let pages: Maybe<Maybe<Character>[]> = null;
  let description: string = "";
  let fetchNextPage: () => void;
  const args = {
    id: data.Id,
  };
  const details = useCharacterDetails({
    args: args,
  });

  const pageStore_unsubscribe = page.subscribe((value) => {
    pageHref = value.url.href;
  });

  const detailsStore_unsubscribe = details.subscribe((value) => {
    isSuccess = value.isSuccess;
    isFetching =
      value.isLoading || value.isFetching || value.isFetchingNextPage;
    hasNextPage = value.hasNextPage;
    fetchNextPage = value.fetchNextPage;
    if (!!value.data?.pages[0]) pages = value.data?.pages;
    if (!isSetHeaderData && !!pages && !!pages[0]) {
      isSetHeaderData = true;
      const page = pages[0];
      pageTitle = `${page.name?.userPreferred}${
        page.name?.native ? ` (${page.name?.native})` : ""
      } — ${siteName}`;
      pageDescription = page.description || "";
      pageSocialImageUrl = page.image?.large || page.image?.medium || "";
      description = useAnilistDescriptionsFromat(`${page.description}`);
    }
  });

  onMount(() => {
    const handleScroll = useDebounce(() => {
      if (isBottomPage() && !isFetching && currentTab === "media") {
        fetchNextPage();
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  onDestroy(() => {
    detailsStore_unsubscribe();
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

<div class="w-full mt-20 mb-6 relative">
  {#if isSuccess && !!pages}
    <!-- Backgroud -->
    <div
      class="fixed inset-0 blur-3xl bg-cover bg-center bg-no-repeat opacity-10 -z-10"
      style:background-image={`url("${pages[0]?.image?.large}")`}
    />
    <div
      in:fade
      class="w-full xl:max-w-5xl 3xl:max-w-6xl flex flex-col lg:flex-row gap-6 p-4 mx-auto"
    >
      <div class="w-52 h-52 shrink-0 mx-auto rounded-full overflow-hidden">
        <Image
          src={pages[0]?.image?.large || ""}
          alt={pages[0]?.name?.userPreferred || ""}
        />
      </div>
      <div class="w-full flex flex-col gap-6 lg:mt-4 overflow-hidden">
        <div
          class="w-full flex flex-col items-center lg:items-start gap-y-2 px-4 lg:px-0 text-center"
        >
          <h1 class="text-2xl md:text-4xl font-bold max-w-full break-words">
            {pages[0]?.name?.userPreferred}
          </h1>
          <div class="text-sm md:text-base">
            {#if pages[0]?.name?.native}
              <span class="last:after:content-[''] after:content-[',_']"
                >{pages[0].name.native}</span
              >
            {/if}
            {#each pages[0]?.name?.alternative || [] as alternative}
              <span class="last:after:content-[''] after:content-[',_']"
                >{alternative}</span
              >
            {/each}
            {#each pages[0]?.name?.alternativeSpoiler || [] as alternativeSpoiler}
              <span
                class="last:after:content-[''] after:content-[',_'] font-medium"
                >{alternativeSpoiler}</span
              >
            {/each}
          </div>
        </div>

        <div class="sticky top-14 z-10">
          <TabBase
            on:changeTab={(e) => {
              currentTab = e.detail.key;
            }}
            items={tabsItems}
            isSuccess={true}
            align="left"
            rounded={true}
          />
        </div>

        <!-- Contents of tab -->
        <!-- About -->
        <div class="flex flex-col" class:hidden={currentTab !== "about"}>
          <div>
            <span class="mr-2">Favourites:</span>{pages[0]?.favourites}
          </div>
          {#if pages[0]?.dateOfBirth?.month}
            <div>
              <span class="mr-2">Birthday:</span>{pages[0].dateOfBirth
                .day}/{pages[0].dateOfBirth.month}
            </div>
          {/if}
          {#if pages[0]?.age}
            <div>
              <span class="mr-2">Age:</span>{pages[0].age}
            </div>
          {/if}
          {#if pages[0]?.gender}
            <div>
              <span class="mr-2">Gender:</span>{pages[0].gender}
            </div>
          {/if}
          <p>
            {@html description}
          </p>
        </div>
        <!-- Anime/Manga -->
        <div
          class="flex flex-col gap-2 overflow-hidden"
          class:hidden={currentTab !== "media"}
        >
          {#each pages || [] as page}
            {#each page?.media?.edges || [] as edge}
              <CharacterCard source={edge} />
            {/each}
          {/each}
          <!-- Status data -->
          {#if isFetching}
            <div class="w-full flex flex-col gap-2">
              {#each Array(3) as noUse}
                <TimelineCardSkeleton />
              {/each}
            </div>
          {:else if hasNextPage}
            <div class="w-full my-20" />
          {:else}
            <div class="w-full text-center my-20">Không còn kết quả nào!</div>
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <div
      class="w-full xl:max-w-5xl 3xl:max-w-6xl flex flex-col lg:flex-row gap-6 p-4 mx-auto animate-pulse"
    >
      <div class="w-52 h-52 shrink-0 mx-auto rounded-full bg-neutral-800" />
      <div class="w-full flex flex-col gap-6 lg:mt-4">
        <div class="flex flex-col items-center lg:items-start gap-y-2">
          <div class="w-60 h-6 bg-neutral-800 rounded" />
          <div class="w-20 h-4 bg-neutral-800 rounded" />
        </div>
        <div class="w-full h-12 rounded bg-neutral-800" />
        <div class="w-full h-28 rounded bg-neutral-800" />
      </div>
    </div>
  {/if}
</div>
