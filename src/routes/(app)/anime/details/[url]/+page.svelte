<script lang="ts">
  // Import Types
  import type { PageData } from "./$types";
  import type { Maybe } from "@/types";
  import type {
    MediaStats,
    MediaRank,
    MediaExternalLink as MediaExternalLinkType,
    CharacterEdge,
    MediaEdge,
    Media,
  } from "@/types/anilist";

  // Import Libs
  import { onMount, onDestroy } from "svelte";

  // Import Stores
  import {
    isLoading as isLoadingStore,
    isSuccess as isSuccessStore,
    tabActive,
    source as sourceStore,
    stats,
    rankings,
    externalLink,
    characters,
    relations,
  } from "@/stores/DetailPageStore";

  // Import Components
  const Stats = async () =>
    (await import("@/components/DetailsPage/Stats.svelte")).default;
  const Rankings = async () =>
    (await import("@/components/DetailsPage/Rankings.svelte")).default;
  const MediaExternalLink = async () =>
    (await import("@/components/shared/MediaExternalLink.svelte")).default;
  const Info = async () =>
    (await import("@/components/DetailsPage/Info.svelte")).default;
  const CharactersCircle = async () =>
    (await import("@/components/DetailsPage/CharactersCircle.svelte")).default;
  const Relations = async () =>
    (await import("@/components/DetailsPage/Relations.svelte")).default;

  export let data: PageData;

  let tabActiveValue: string | null = null;
  let isLoading: boolean = true;
  let isSuccess: boolean = false;
  let sourceStoreValue: Maybe<Media> = null;
  let statsValue: Maybe<MediaStats> = null;
  let rankingsValue: Maybe<MediaRank[]> = null;
  let externalLinkValue: Maybe<MediaExternalLinkType[]> = null;
  let charactersValue: Maybe<CharacterEdge[]> = null;
  let relationsValue: Maybe<MediaEdge[]> = null;

  onMount(() => {
    const unsubscribe_tabActive = tabActive.subscribe((value: any) => {
      tabActiveValue = value;
    });
    const isLoading_unsubscribe = isLoadingStore.subscribe((value) => {
      isLoading = value;
    });
    const isSuccess_unsubscribe = isSuccessStore.subscribe((value) => {
      isSuccess = value;
    });
    const sourceStore_unsubscribe = sourceStore.subscribe((value) => {
      sourceStoreValue = value;
    });
    const stats_unsubscribe = stats.subscribe((value) => {
      statsValue = value;
    });
    const rankings_unsubscribe = rankings.subscribe((value) => {
      rankingsValue = value;
    });
    const externalLink_unsubscribe = externalLink.subscribe((value) => {
      externalLinkValue = value;
    });
    const characters_unsubscribe = characters.subscribe((value) => {
      charactersValue = value?.slice(0, 10) || null;
    });
    const relations_unsubscribe = relations.subscribe((value) => {
      relationsValue = value;
    });

    return () => {
      unsubscribe_tabActive();
      isLoading_unsubscribe();
      isSuccess_unsubscribe();
      sourceStore_unsubscribe();
      stats_unsubscribe();
      rankings_unsubscribe();
      externalLink_unsubscribe();
      characters_unsubscribe();
      relations_unsubscribe();
    };
  });

  onDestroy(() => {});
</script>

<div class="w-full flex flex-col space-y-8">
  <!-- Stats block -->
  <!-- {#if isLoading}
    <StatsSkeleton />
  {/if} -->
  {#if !!statsValue}
    {#await Stats() then StatsComponent}
      <StatsComponent source={statsValue} />
    {/await}
  {/if}
  <!-- List of rankings -->
  {#if !!rankingsValue && rankingsValue.length}
    {#await Rankings() then RankingsComponent}
      <div class="flex flex-col">
        <!-- Title -->
        <div>
          <h2 class="md:text-lg font-semibold">Rankings</h2>
        </div>
        <RankingsComponent source={rankingsValue} />
      </div>
    {/await}
  {/if}
  <!-- List of characters -->
  {#if !!charactersValue && charactersValue.length}
    {#await CharactersCircle() then CharactersCircleComponent}
      <CharactersCircleComponent mediaId={data.Id} />
    {/await}
  {/if}
  <!-- List of relations -->
  {#await Relations() then RelationsComponent}
    <RelationsComponent mediaId={data.Id} />
  {/await}
  <!-- List of external Links -->
  {#if !!externalLinkValue && externalLinkValue.length}
    {#await MediaExternalLink() then MediaExternalLinkComponent}
      <div class="flex flex-col">
        <!-- Title -->
        <div>
          <h2 class="md:text-lg font-semibold">External links</h2>
        </div>
        <MediaExternalLinkComponent
          {isLoading}
          {isSuccess}
          source={externalLinkValue}
        />
      </div>
    {/await}
  {/if}
  <!-- Info -->
  {#if !!sourceStoreValue}
    {#await Info() then InfoComponent}
      <div class="flex flex-col">
        <!-- Title -->
        <div>
          <h2 class="text-lg md:text-xl font-semibold">
            About <span class="font-bold"
              >{sourceStoreValue.title?.userPreferred}</span
            >
          </h2>
        </div>
        <InfoComponent {isLoading} {isSuccess} source={sourceStoreValue} />
      </div>
    {/await}
  {/if}
</div>
