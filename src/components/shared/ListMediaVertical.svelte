<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { Media } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import useCreateLink from "@/hooks/useCreateLink";

  // Import Components
  import CardMediaVertical from "@/components/shared/CardMediaVertical.svelte";

  //Import Stores
  import { isSideNavBar, isTouchDevice } from "@/stores/UserSettingStore";

  export let source: Maybe<Media[]> | Maybe<Media>[];
  export let isRanking: boolean = false;

  let isSideNavBarValue: boolean = true;
  let isTouchDeviceValue: boolean = true;
  let isSnapStart: boolean = true;
  let isSnapEnd: boolean = false;
  let listLink: string[] = [];

  $: isSnapStart = !isTouchDeviceValue && isSideNavBarValue;
  $: isSnapEnd = !isTouchDeviceValue && !isSideNavBarValue;
  $: if (source)
    listLink = source.map((media) =>
      useCreateLink([
        "/",
        { value: media?.type || "", convert: "lowcase" },
        "/details/",
        { value: media?.title?.userPreferred || "", convert: "-" },
        "-an",
        media?.id || 0,
      ])
    );

  onMount(() => {
    // Subscribe to changes in isSideNavBar
    const isSideNavBar_unsubscribe = isSideNavBar.subscribe((value) => {
      isSideNavBarValue = value;
    });
    // Subscribe to changes in isTouchDevice
    const isTouchDevice_unsubscribe = isTouchDevice.subscribe((value) => {
      isTouchDeviceValue = value;
    });

    return () => {
      isSideNavBar_unsubscribe();
      isTouchDevice_unsubscribe();
    };
  });
</script>

{#if !!source}
  {#each source || [] as media, i}
    <div
      in:fade
      class="w-100/29 md:w-1/5 lg:w-1/6 2xl:w-1/7 3xl:w-1/8 first:ml-2 md:first:ml-6 lg:first:ml-8 mr-2 sm:mr-2.5 md:mr-2 lg:mr-3 2xl:mr-4 4xl:mr-5 shrink-0"
      class:snap-start={isSnapStart}
      class:snap-end={isSnapEnd}
      class:lg:first:!ml-0={isSideNavBarValue}
    >
      <CardMediaVertical
        options={{
          id: media?.id || 0,
          to: listLink[i],
          index: isRanking ? i + 1 : undefined,
          isRanking: isRanking,
          title: media?.title?.userPreferred,
          bannerImage: media?.bannerImage,
          coverImage: {
            alt: media?.title?.userPreferred,
            image:
              media?.coverImage?.large ||
              media?.coverImage?.extraLarge ||
              media?.coverImage?.medium,
            color: media?.coverImage?.color,
          },
        }}
      />
    </div>
  {/each}
{/if}

<!-- to={useCreateLink([
  "/",
  { value: media?.type || "", convert: "lowcase" },
  "/details/",
  { value: media?.title?.userPreferred || "", convert: "-" },
  "-an",
  media?.id,
])} -->
