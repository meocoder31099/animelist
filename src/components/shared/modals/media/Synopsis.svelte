<script lang="ts">
  //Import Types
  import type { Maybe } from "@/types";
  import type { Media, Studio } from "@/types/anilist";

  // Import Libs
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import useMediaDetails from "@/hooks/useMediaDetails";
  import useTimestampToString from "@/hooks/useTimestampToString";
  import useCreateLink from "@/hooks/useCreateLink";

  //Import Components
  import Image from "@/components/shared/Image.svelte";

  export let mediaID: number;
  export let mediaTitle: string;
  export let mediaThumb: string;
  export let isMobile: boolean;

  const dispatch = createEventDispatcher();
  const data = useMediaDetails({
    args: {
      id: mediaID,
    },
  });

  let isLoading: boolean = true;
  let source: Media;
  let nextAiringEpisode: Maybe<string> = null;
  let studios: Studio[];
  let studioLinks: string[] = [];

  onMount(() => {
    const unsubscribeData = data.subscribe((value) => {
      const details = value.data;
      if (details?.id) {
        source = details;

        dispatch("success", source);

        if (!isMobile && !!source?.studios?.nodes?.length) {
          studios = source.studios.nodes.slice(0, 5);
          studioLinks = studios.map((node) =>
            useCreateLink([
              "/studio/",
              { value: node.name, convert: "-" },
              "-an",
              node.id,
            ])
          );
        }

        if (!!source?.nextAiringEpisode)
          nextAiringEpisode = `Episode ${
            source.nextAiringEpisode.episode
          } on ${useTimestampToString(source.nextAiringEpisode.airingAt)}`;
      }

      isLoading = !!value.isLoading;
    });

    return () => {
      unsubscribeData();
    };
  });
</script>

<div class="flex gap-3 md:gap-6 lg:gap-10 p-3 md:pt-4 md:pb-0 md:px-6 lg:px-12">
  <!-- Image Cover -->
  {#if isMobile}
    <div class="w-28 shrink-0">
      <div class="aspect-w-2 aspect-h-3">
        <div class="w-full h-full rounded-lg overflow-hidden">
          <Image src={mediaThumb} backgroundColor={source?.coverImage?.color} />
        </div>
      </div>
    </div>
  {/if}
  <div class="w-full flex flex-col gap-y-2">
    {#if isMobile}
      <h1 class="text-xl font-bold line-clamp-2 mr-8 leading-6">
        {mediaTitle}
      </h1>
    {/if}
    {#if isLoading}
      <div class="w-full flex flex-col gap-y-3 mt-2 animate-pulse">
        <!-- Stats  -->
        <div class="w-full h-4 bg-neutral-800 md:hidden rounded" />

        <!-- Descriptions -->
        <div class="w-full h-16 bg-neutral-800 md:bg-transparent rounded-lg" />
      </div>
    {:else if !!source}
      <!-- Info -->
      <div in:fade|global class="w-full flex flex-col gap-y-1 md:gap-y-4">
        <div class="w-full grid grid-cols-8 md:gap-x-10">
          <div class="col-span-full md:col-span-5 flex flex-col gap-2.5 md:gap-4">
            <div class="flex flex-col md:gap-1">
              <!-- Stats  -->
              <div class="flex gap-x-3 lg:gap-x-4">
                <div
                  class="w-full flex items-center gap-y-1 gap-x-3 lg:gap-x-4 text-sm md:text-base 3xl:text-lg text-neutral-400 overflow-x-auto scrollbar-none"
                >
                  <span class="shrink-0 uppercase"
                    >{source?.format || source?.type}</span
                  >
                  {#if !!source?.season}
                    <span class="shrink-0 lowercase first-letter:uppercase"
                      >{source.season} {source.seasonYear}</span
                    >
                  {/if}
                  {#if !!source?.episodes}
                    <span class="shrink-0">{source.episodes} episodes</span>
                  {/if}
                  {#if !!source?.duration}
                    <span class="shrink-0">{source.duration} mins</span>
                  {/if}
                  {#if !!source?.volumes}
                    <span class="shrink-0">{source.volumes} volumes</span>
                  {/if}
                  {#if !!source?.chapters}
                    <span class="shrink-0">{source.chapters} chapters</span>
                  {/if}
                  <!-- Airing -->
                  {#if !!nextAiringEpisode}
                    <!-- is expected to air in {source.nextAiringEpisode.airingAt} -->
                    <span class="shrink-0 text-rose-500">{nextAiringEpisode}</span>
                  {/if}
                </div>
              </div>
            </div>
            <!-- Descriptions -->
            <div
              class="text-sm md:text-base 3xl:text-lg line-clamp-4 xl:line-clamp-3 2xl:line-clamp-2"
            >
              {@html source?.description || ""}
            </div>
          </div>
          <div class="col-span-3">
            <div class="flex flex-col gap-1 md:gap-2 ml-auto">
              <!-- Details -->
              {#if !isMobile}
                <!-- Status -->
                {#if !!source?.status}
                  <div>
                    <span class="text-neutral-400 font-medium">Status:</span>
                    <span>{source.status}</span>
                  </div>
                {/if}
                <!-- Genres -->
                {#if !!source?.genres?.length}
                  <div>
                    <span class="text-neutral-400 font-medium">Genres:</span>
                    {#each source.genres as genre}
                      <span class="after:content-[',_'] last:after:content-[]"
                        >{genre}</span
                      >
                    {/each}
                  </div>
                {/if}
                <!-- Studios -->
                {#if !!studios}
                  <div>
                    <span class="text-neutral-400 font-medium"
                      >Studios & Producers:</span
                    >
                    {#each studios as studio, i}
                      <span
                        class="after:content-[',_'] last:after:content-[]"
                        class:font-bold={studio.isAnimationStudio}
                        ><a href={studioLinks[i]}>{studio.name}</a></span
                      >
                    {/each}
                  </div>
                {/if}
              {/if}
            </div>
          </div>
        </div>
        <div />
      </div>
    {/if}
  </div>
</div>
