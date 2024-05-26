<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import { type Media, MediaType } from "@/types/anilist";

  // import Enum
  import { MediaSort, MediaStatus } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import usePageMedia from "@/hooks/usePageMedia";
  import useCreateLink from "@/hooks/useCreateLink";
  import useTimestampToString from "@/hooks/useTimestampToString";
  import { fade } from "svelte/transition";

  // Import Actions
  import onMediaDetailsModal from "@/use-actions/onMediaDetailsModal";
  import onInVỉew from "@/use-actions/onInView";

  //Import Stores
  import {
    isMobile,
    isTopNavbarBgTransparent,
  } from "@/stores/UserSettingStore";

  // Import components
  import ScrollbarHozirontal from "@/components/Utils/Scrollbar/ScrollbarHozirontal.svelte";
  import ListMediaVertical from "@/components/shared/ListMediaVertical.svelte";
  import ListMediaVerticalSkeleton from "@/components/skeletons/ListMediaVerticalSkeleton.svelte";
  import Image from "@/components/shared/Image.svelte";

  export let type: MediaType = MediaType.Anime;

  const args = {
    type: type,
    sort: [MediaSort.Trending_desc, MediaSort.Popularity_desc],
    status_not_in: [MediaStatus.Not_yet_released],
    perPage: 20,
  };

  let isLoading: boolean = true;
  let isSuccess: boolean = false;
  let source: Maybe<Media[]> = null;
  let randomItem: Maybe<Media> = null;
  let nextAiringEpisode: Maybe<string> = null;
  const pageData = usePageMedia({
    args: args,
  });

  onMount(() => {
    setTimeout(() => {
      if (window.scrollY < 200) isTopNavbarBgTransparent.set(true);
    }, 0);

    // Subscribe to changes in pageData
    const pageData_unsubscribe = pageData.subscribe((value) => {
      // If there is no media data, return early
      const firstPage = value.data?.pages?.[0]?.media;
      if (!firstPage) return;

      // Use reduce to split media into two arrays based on the presence of a bannerImage
      let temp: Maybe<[Media[], Media[]]> = firstPage.reduce(
        (medias: [Media[], Media[]], media: Media): [Media[], Media[]] => {
          if (media.bannerImage) medias[0].push(media);
          else medias[1].push(media);
          return medias;
        },
        [[], []]
      );

      // If there is no data in either array, return early
      if (!temp || (!temp[0].length && !temp[1].length)) return;

      // Choose a random item from the first array if it has more than one item,
      // otherwise choose a random item from the second array
      if (temp[0].length > 1)
        randomItem = temp[0].splice(
          Math.floor(Math.random() * temp[0].length),
          1
        )[0];
      else
        randomItem = temp[1].splice(
          Math.floor(Math.random() * temp[1].length),
          1
        )[0];

      // Combine the two arrays into a single source array
      source = [...temp[0], ...temp[1]];
      temp = null;

      if (randomItem.nextAiringEpisode)
        nextAiringEpisode = `Episode ${
          randomItem.nextAiringEpisode.episode
        } on ${useTimestampToString(randomItem.nextAiringEpisode.airingAt)}`;

      // Update isLoading and isSuccess variables
      isLoading = value.isLoading;
      isSuccess = value.isSuccess;
    });

    // Return a function to unsubscribe from pageData when the component is destroyed
    return () => {
      pageData_unsubscribe();
    };
  });
</script>

{#if isSuccess}
  <div
    use:onInVỉew={({ isView }) => {
      isTopNavbarBgTransparent.set(isView);
    }}
    in:fade|global
    class="flex w-full pb-2 transition-[padding,border-radius] duration-300"
  >
    <div
      use:onMediaDetailsModal={{
        id: randomItem?.id || 0,
        image:
          randomItem?.coverImage?.extraLarge ||
          randomItem?.coverImage?.large ||
          "",
        name: randomItem?.title?.userPreferred || "",
        href: useCreateLink([
          "/",
          { value: randomItem?.type || "", convert: "lowcase" },
          "/details/",
          {
            value: randomItem?.title?.userPreferred || "",
            convert: "-",
          },
          "-an",
          randomItem?.id || 0,
        ]),
        bannerImage: randomItem?.bannerImage || "",
      }}
      class="w-full aspect-w-3 aspect-h-4 md:aspect-w-12 md:aspect-h-8 xl:aspect-w-15 xl:aspect-h-6 2xl:aspect-w-14 2xl:aspect-h-[4.2] lg:overflow-hidden mb-12 lg:mb-0 cursor-pointer transition-[border-radius] duration-300"
    >
      <!-- Image -->
      <div
        class="w-full h-full"
        class:opacity-40={!randomItem?.bannerImage && !$isMobile}
      >
        <Image
          src={$isMobile
            ? randomItem?.coverImage?.extraLarge ||
              randomItem?.coverImage?.large ||
              ""
            : randomItem?.bannerImage ||
              randomItem?.coverImage?.extraLarge ||
              randomItem?.coverImage?.large ||
              ""}
          position={$isMobile ? "top" : "left-top"}
          alt={randomItem?.title?.userPreferred || ""}
        />
      </div>
      <div class="w-full h-full">
        <div
          class="lg:hidden w-full h-2/5 -bottom-0.5 absolute bg-gradient-to-t from-background via-background/80 to-transparent"
        />
        <div
          class="w-full h-full -bottom-0.5 absolute bg-gradient-to-t from-background via-background/40 lg:via-transparent to-transparent"
        />
        <div
          class="w-full h-full hidden lg:block absolute left-0 bg-gradient-to-r from-background via-transparent to-transparent"
        />
        <div
          class="w-full lg:w-2/3 3xl:w-2/5 absolute bottom-10 lg:bottom-32 px-4 lg:pl-8"
        >
          <div class="flex flex-col lg:space-x-8 mt-2">
            <div class="flex flex-col-reverse gap-y-4 lg:gap-y-6">
              <div
                class="flex items-center justify-center lg:justify-start gap-x-10 actions lg:mb-2"
              >
                <div class="view">
                  <a
                    on:click|stopPropagation={() => {}}
                    href={useCreateLink([
                      "/",
                      { value: randomItem?.type || "", convert: "lowcase" },
                      "/view/123412/",
                      {
                        value: randomItem?.title?.userPreferred || "",
                        convert: "-",
                      },
                      "-an",
                      randomItem?.id || 0,
                    ])}
                  >
                    <button
                      class="w-28 lg:w-40 drop-shadow-xl bg-neutral-100 text-black px-6 py-2 font-bold rounded-lg inline-flex items-center justify-center transition-opacity duration-300 hover:opacity-80"
                    >
                      {#if randomItem?.type === MediaType.Anime}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          class="w-5 h-5 4xl:w-6 4xl:h-6 fill-current"
                          ><path
                            d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"
                          /></svg
                        >
                      {:else}
                        <svg
                          viewBox="0 0 20 20"
                          class="fill-current w-5 h-5 4xl:w-6 4xl:h-6 scale-90"
                          ><g
                            fill-rule="evenodd"
                            transform="translate(-446 -350)"
                            ><path
                              d="M457 368.832a.5.5 0 0 0 .883.323l1.12-1.332a.876.876 0 0 1 .679-.323h3.522a2.793 2.793 0 0 0 2.796-2.784v-10.931a2.793 2.793 0 0 0-2.796-2.785h-3.454a2.75 2.75 0 0 0-2.75 2.75v15.082zm-1.5 0a.5.5 0 0 1-.883.323l-1.12-1.332a.876.876 0 0 0-.679-.323h-3.522a2.793 2.793 0 0 1-2.796-2.784v-10.931a2.793 2.793 0 0 1 2.796-2.785h3.454a2.75 2.75 0 0 1 2.75 2.75v15.082z"
                            /></g
                          ></svg
                        >
                      {/if}
                      <span class="ml-2 3xl:text-lg"
                        >{randomItem?.type === MediaType.Anime
                          ? "Phát"
                          : "Đọc"}</span
                      >
                    </button>
                  </a>
                </div>
                <a
                  use:onMediaDetailsModal={{
                    id: randomItem?.id || 0,
                    image:
                      randomItem?.coverImage?.extraLarge ||
                      randomItem?.coverImage?.large ||
                      "",
                    name: randomItem?.title?.userPreferred || "",
                    href: useCreateLink([
                      "/",
                      { value: randomItem?.type || "", convert: "lowcase" },
                      "/details/",
                      {
                        value: randomItem?.title?.userPreferred || "",
                        convert: "-",
                      },
                      "-an",
                      randomItem?.id || 0,
                    ]),
                    bannerImage: randomItem?.bannerImage || "",
                  }}
                  href={useCreateLink([
                    "/",
                    { value: randomItem?.type || "", convert: "lowcase" },
                    "/details/",
                    {
                      value: randomItem?.title?.userPreferred || "",
                      convert: "-",
                    },
                    "-an",
                    randomItem?.id || 0,
                  ])}
                >
                  <button
                    class="flex flex-col gap-y-0.5 items-center justify-between text-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="w-7 h-7 3xl:w-6 3xl:h-6 fill-current scale-90"
                      ><path
                        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
                      /><path d="M11 11h2v6h-2zm0-4h2v2h-2z" /></svg
                    >
                    <span class="text-xs md:text-sm scale-90 3xl:scale-100"
                      >Thông tin</span
                    >
                  </button>
                </a>
                <button
                  class="flex flex-col gap-y-0.5 items-center justify-between text-center order-first lg:order-last"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="w-7 h-7 3xl:w-6 3xl:h-6 fill-current"
                    ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg
                  >
                  <span class="text-xs md:text-sm scale-90 3xl:scale-100"
                    >Danh sách</span
                  >
                </button>
                <!-- <div class="actions">
                  <a
                    use:onMediaDetailsModal={{
                      id: randomItem?.id || 0,
                      image:
                        randomItem?.coverImage?.extraLarge ||
                        randomItem?.coverImage?.large ||
                        "",
                      name: randomItem?.title?.userPreferred || "",
                    }}
                    href={useCreateLink([
                      "/",
                      { value: randomItem?.type || "", convert: "lowcase" },
                      "/details/",
                      {
                        value: randomItem?.title?.userPreferred || "",
                        convert: "-",
                      },
                      "-an",
                      randomItem?.id || 0,
                    ])}
                  >
                    <button
                      class="drop-shadow-xl bg-neutral-800/60 lg:bg-neutral-400/60 py-1.5 px-4 3xl:py-2 rounded-md inline-flex items-center transition-opacity duration-300 hover:opacity-80"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="fill-current w-6 h-6 4xl:w-7 4xl:h-7"
                        ><path
                          d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
                        /><path d="M11 11h2v6h-2zm0-4h2v2h-2z" /></svg
                      >
                      <span class="ml-2 4xl:text-lg">Thông tin</span>
                    </button>
                  </a>
                </div> -->
              </div>
              <div class="title">
                <h1
                  class="text-xl md:text-3xl 3xl:text-5xl text-center lg:text-left font-black line-clamp-2 !leading-tight text-shadow-sm px-10 lg:px-0"
                >
                  {randomItem?.title?.userPreferred}
                </h1>
                <!-- Airing -->
                {#if !!nextAiringEpisode}
                  <div
                    class="mt-3 lg:mt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 lg:gap-x-4 text-sm md:text-base 3xl:text-lg text-rose-500"
                  >
                    <!-- is expected to air in {source.nextAiringEpisode.airingAt} -->
                    <span class="line-clamp-1">{nextAiringEpisode}</span>
                  </div>
                {/if}
                <!-- <div
                  class="mt-3 lg:mt-4 flex flex-wrap gap-1.5 md:gap-3 items-center justify-center lg:justify-start text-xs md:text-sm"
                >
                  {#each randomItem?.genres || [] as genre}
                    <span class="bg-white/20 p-1 rounded-lg">{genre}</span>
                    <span
                      class="w-1 h-1 rounded-full bg-neutral-500 opacity-60 last:hidden"
                      style:background-color={randomItem?.coverImage?.color}
                    />
                  {/each}
                </div> -->
              </div>
              <!-- <div
                class="hidden lg:block overflow-hidden 3xl:text-xl lg:line-clamp-3"
              >
                <p>{@html randomItem.description}</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- List Media -->
  <div class="flex flex-col -mt-16 lg:-mt-24">
    <!-- Tiêu đề -->
    <div class="flex items-center px-2 md:px-6 lg:px-8 text-white z-10">
      <div class="flex mr-12">
        <div>
          <h2 class="text-lg md:text-xl lg:text-2xl 3xl:text-3xl font-bold">
            Hiện đang thịnh hành
          </h2>
        </div>
      </div>
    </div>
    <!-- Danh sách manga -->
    <ScrollbarHozirontal isNavigation={true} isSuccess={true}>
      <ListMediaVertical {source} />
    </ScrollbarHozirontal>
  </div>
{:else if isLoading}
  <div class="flex w-full pb-2 transition-[padding,border-radius] duration-300">
    <div
      class="w-full lg:bg-neutral-800 aspect-w-3 aspect-h-4 md:aspect-w-12 md:aspect-h-8 xl:aspect-w-15 xl:aspect-h-6 2xl:aspect-w-14 2xl:aspect-h-[4.2] lg:overflow-hidden mb-12 lg:mb-0 transition-[border-radius] duration-300"
    >
      <div class="w-full h-full">
        <div
          class="lg:hidden w-full h-2/5 -bottom-0.5 absolute bg-gradient-to-t from-background via-background/80 to-transparent"
        />
        <div
          class="w-full h-full -bottom-0.5 absolute bg-gradient-to-t from-background via-background/40 lg:via-transparent to-transparent"
        />
        <div
          class="w-full h-full hidden lg:block absolute left-0 bg-gradient-to-r from-background via-transparent to-transparent"
        />
        <div
          class="w-full lg:w-2/3 3xl:w-2/5 absolute bottom-10 lg:bottom-32 px-4 lg:pl-8"
        >
          <div class="flex flex-col lg:space-x-8 mt-2">
            <div class="flex flex-col-reverse gap-y-4 lg:gap-y-6">
              <div
                class="flex items-center justify-center lg:justify-start gap-x-10 actions lg:mb-2"
              >
                <!-- Details Button -->
                <div
                  class="w-10 h-10 rounded-full bg-neutral-800 lg:order-last hidden md:block"
                />
                <!-- Play/Read Button -->
                <div
                  class="w-28 lg:w-40 shrink-0 h-10 bg-neutral-800 px-6 py-2 rounded-lg"
                />
                <!-- Save Button -->
                <div
                  class="w-10 h-10 rounded-full bg-neutral-800 hidden md:block"
                />
              </div>
              <div
                class="w-3/4 mx-auto lg:mx-0 bg-neutral-800 h-20 lg:h-4 rounded-lg"
              />
              <div class="hidden lg:flex flex-col gap-2 overflow-hidden">
                <!-- <div class="w-full bg-neutral-800 h-4 rounded" /> -->
                <div class="w-1/2 bg-neutral-800 h-4 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- List Media -->
  <div class="flex flex-col -mt-16 lg:-mt-24">
    <!-- Tiêu đề -->
    <div class="flex items-center px-2 md:px-6 lg:px-8 text-white">
      <div class="flex mr-12">
        <div class="h-8 w-44 rounded-lg bg-neutral-800 animate-pulse" />
      </div>
    </div>
    <!-- Danh sách manga -->
    <ScrollbarHozirontal>
      <ListMediaVerticalSkeleton numberChild={4} />
    </ScrollbarHozirontal>
  </div>
{/if}
