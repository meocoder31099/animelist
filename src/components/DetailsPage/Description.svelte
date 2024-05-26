<script lang="ts">
  //Import Types
  import type { Maybe } from "@/types";
  import type { Media } from "@/types/anilist";

  // import Enum
  import { MediaType } from "@/types/anilist";

  // Import Libs
  import { fade } from "svelte/transition";
  import useTimestampToString from "@/hooks/useTimestampToString";
  import useCreateLink from "@/hooks/useCreateLink";

  // Import Stores
  import { isMobile } from "@/stores/UserSettingStore";

  // Import Component
  import Image from "@/components/shared/Image.svelte";

  export let isLoading = true;
  export let isSuccess = false;
  export let source: Maybe<Media>;
  let nextAiringEpisode: Maybe<string> = null;
  let linkView: string = "";

  const sliceDescription = (string: string, length: number = 200) => {
    string = string.replace(/<br>\s*<br>/g, ". ");
    return string.length > length ? string.slice(0, length) + "..." : string;
  };

  $: if (!!source) {
    linkView = useCreateLink([
      "/",
      { value: source.type as string, convert: "lowcase" },
      `/${source.type === "ANIME" ? "view" : "read"}/`,
      "123412/",
      { value: source.title?.userPreferred as string, convert: "-" },
      "-an",
      source.id,
    ]);

    if (!!source.nextAiringEpisode)
      nextAiringEpisode = `Episode ${
        source.nextAiringEpisode.episode
      } on ${useTimestampToString(source.nextAiringEpisode.airingAt)}`;
  }
</script>

{#if isLoading}
  <div
    class="w-full max-w-details px-2 sm:px-6 md:px-9 gap-8 mx-auto flex animate-pulse"
  >
    <!-- <div class="hidden xl:block w-52 shrink-0 -mt-36">
      <div class="w-full aspect-w-2 aspect-h-3">
        <div class="w-full h-full overflow-hidden">
          <div class="w-full h-full bg-neutral-800 rounded-lg" />
        </div>
      </div>
    </div> -->
    <div class="flex flex-col gap-y-5 w-full mt-6 lg:-mt-8">
      <div class="flex flex-col-reverse lg:flex-col gap-y-8 lg:gap-y-4">
        <!-- Button -->
        <div
          class="flex items-center gap-x-3 md:gap-x-10 lg:absolute lg:-mt-20"
        >
          <!-- Play/Read Button -->
          <div
            class="w-1/2 md:w-40 shrink-0 h-10 bg-neutral-800 py-2 my-3 md:my-0 rounded-lg"
          />
          <div
            class="flex w-full justify-evenly md:justify-start gap-x-3 md:gap-x-10"
          >
            <!-- Save Button -->
            <div class="w-10 h-10 rounded-full bg-neutral-800" />
            <!-- Details Button -->
            <div class="w-10 h-10 rounded-full bg-neutral-800" />
          </div>
        </div>
        <!-- Title -->
        <div>
          <div class="bg-neutral-800 rounded-lg w-72 h-8" />
        </div>
      </div>
      <div class="description space-y-3">
        <div class="bg-neutral-800 rounded-lg w-full h-24" />
      </div>
    </div>
  </div>
{:else if isSuccess}
  <div
    in:fade
    class="w-full max-w-details px-2 sm:px-6 md:px-9 gap-8 mx-auto flex"
  >
    <!-- <div class="hidden xl:block w-52 shrink-0 -mt-36">
      <div class="w-full aspect-w-2 aspect-h-3">
        <div class="w-full h-full rounded-lg overflow-hidden">
          <Image
            src={source?.coverImage?.large ?? ""}
            backgroundColor={source?.coverImage?.color}
            alt={source?.title?.userPreferred ?? ""}
          />
        </div>
      </div>
    </div> -->
    <div class="flex flex-col gap-y-2 lg:gap-y-0 w-full mt-6 lg:-mt-8">
      <div class="flex flex-col-reverse lg:flex-col gap-y-6">
        <div
          class="flex items-center gap-x-3 md:gap-x-10 lg:absolute lg:-mt-20"
        >
          <!-- Play/Read Button -->
          <a class="w-1/2 md:w-40 shrink-0" href={linkView}>
            <button
              class="w-full drop-shadow-xl bg-neutral-100 text-black py-2 px-6 font-bold rounded-lg flex justify-center items-center transition-opacity duration-300 hover:opacity-80"
            >
              {#if source?.type === MediaType.Anime}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="fill-current w-6 h-6"
                  ><path
                    d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"
                  />
                </svg>
              {:else}
                <svg viewBox="0 0 20 20" class="fill-current w-6 h-6 scale-90"
                  ><g fill-rule="evenodd" transform="translate(-446 -350)"
                    ><path
                      d="M457 368.832a.5.5 0 0 0 .883.323l1.12-1.332a.876.876 0 0 1 .679-.323h3.522a2.793 2.793 0 0 0 2.796-2.784v-10.931a2.793 2.793 0 0 0-2.796-2.785h-3.454a2.75 2.75 0 0 0-2.75 2.75v15.082zm-1.5 0a.5.5 0 0 1-.883.323l-1.12-1.332a.876.876 0 0 0-.679-.323h-3.522a2.793 2.793 0 0 1-2.796-2.784v-10.931a2.793 2.793 0 0 1 2.796-2.785h3.454a2.75 2.75 0 0 1 2.75 2.75v15.082z"
                    /></g
                  ></svg
                >
              {/if}
              <span class="ml-2 3xl:text-lg"
                >{source?.type === MediaType.Anime ? "Play" : "Read"}</span
              >
            </button>
          </a>
          <div
            class="flex w-full justify-evenly md:justify-start gap-x-3 md:gap-x-10"
          >
            <!-- Save Button -->
            <button
              class="flex flex-col gap-y-0.5 items-center justify-between text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="w-7 h-7 3xl:w-6 3xl:h-6 fill-current"
                ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg
              >
              <span class="text-sm scale-90 3xl:scale-100">List</span>
            </button>
            <!-- Action Button -->
            <button
              class="flex flex-col gap-y-0.5 items-center justify-between text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-7 h-7 3xl:w-6 3xl:h-6 fill-current scale-90"
                ><path
                  d="M3 12c0 1.654 1.346 3 3 3 .794 0 1.512-.315 2.049-.82l5.991 3.424c-.018.13-.04.26-.04.396 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.794 0-1.512.315-2.049.82L8.96 12.397c.018-.131.04-.261.04-.397s-.022-.266-.04-.397l5.991-3.423c.537.505 1.255.82 2.049.82 1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .136.022.266.04.397L8.049 9.82A2.982 2.982 0 0 0 6 9c-1.654 0-3 1.346-3 3z"
                ></path></svg
              >
              <span class="text-sm scale-90 3xl:scale-100">Share</span>
            </button>
          </div>
        </div>
        <div class="flex flex-col -mt-4 md:-mt-2 lg:mt-0 z-10">
          <h1
            class="text-2xl xl:text-3xl 3xl:text-4xl !leading-tight font-bold line-clamp-2"
          >
            {source?.title?.userPreferred}
          </h1>
          <div
            class="flex flex-wrap items-center gap-x-3 lg:gap-x-4 gap-y-2 text-sm lg:text-base mt-2 lg:mt-4 text-neutral-400"
          >
            <span
              class="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-lg text-xs lg:text-sm uppercase"
              >{source?.format}</span
            >
            {#if source?.seasonYear}<span
                class="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-lg text-xs lg:text-sm lowercase first-letter:uppercase"
                >{source.season} {source.seasonYear}</span
              >
            {/if}
            {#if source?.countryOfOrigin}<span>{source.countryOfOrigin}</span
              >{/if}
            {#if source?.status}<span>{source.status}</span>{/if}
            {#if source?.episodes}<span>{source.episodes} episodes</span>{/if}
            {#if source?.duration}<span>{source.duration} mins</span>{/if}
            {#if source?.volumes}<span>{source.volumes}.vol</span>{/if}
            {#if source?.chapters}<span>{source.chapters}.chapter</span>{/if}
          </div>
          {#if !!nextAiringEpisode}
            <div
              class="flex flex-col gap-x-3 lg:gap-x-4 gap-y-1 text-sm lg:text-base mt-2 lg:mt-3"
            >
              <div>
                <!-- is expected to air in {source.nextAiringEpisode.airingAt} -->
                <span class="text-rose-500">{nextAiringEpisode}</span>
              </div>
            </div>
          {/if}
        </div>
      </div>
      <div
        class="w-full description group relative md:mt-2 3xl:mt-4 text-sm md:text-base"
      >
        {#if source?.description}
          <div>
            {@html sliceDescription(source.description, $isMobile ? 150 : 280)}
          </div>
        {:else}
          <div class="w-full text-neutral-300 hidden lg:block">
            Không có mô tả nào!
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
