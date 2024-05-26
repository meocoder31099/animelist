<script lang="ts">
  //Import Types
  import type { Maybe, DetailsModalStack, MediaDetailsModal } from "@/types";
  import type { Media, MediaType } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";

  //Import Components
  import BannerImage from "@/components/shared/modals/media/BannerImage.svelte";
  import Actions from "@/components/shared/modals/media/Actions.svelte";
  import Synopsis from "@/components/shared/modals/media/Synopsis.svelte";
  const Reletions = async () =>
    (await import("@/components/shared/modals/media/Reletions.svelte")).default;
  const Characters = async () =>
    (await import("@/components/shared/modals/media/Characters.svelte"))
      .default;
  const About = async () =>
    (await import("@/components/shared/modals/media/About.svelte")).default;

  export let modalsOptions: DetailsModalStack;
  export let isMobile: boolean;

  let mediaSource: Media;
  let bannerImage = (modalsOptions.value as MediaDetailsModal).bannerImage;
  let detailsLink = (modalsOptions.value as MediaDetailsModal).href;
  let viewLink: string;
  let mediaType: Maybe<MediaType>;

  const updateMediaSoure = (source: Media): void => {
    mediaSource = source;
    mediaType = source.type;
    viewLink = "haha";
  };
</script>

<div class="w-full h-full flex flex-col">
  <!-- Big Imgage -->
  {#if !isMobile}
    <BannerImage
      bannerImageUrl={bannerImage}
      thumbImgageUrl={modalsOptions.value.image}
      {isMobile}
    />
  {/if}

  <div class="flex flex-col md:flex-col-reverse">
    <!-- Synopsis -->
    <Synopsis
      mediaID={modalsOptions.value.id}
      mediaTitle={modalsOptions.value.name}
      mediaThumb={modalsOptions.value.image}
      {isMobile}
      on:success={(event) => {
        updateMediaSoure(event.detail);
      }}
    />

    <!-- Actions -->
    <Actions {detailsLink} {mediaType} isSuccess={!!viewLink} />
  </div>

  {#if !isMobile}
    <!-- Relations -->
    {#await Reletions() then ReletionsComponent}
      <ReletionsComponent mediaID={modalsOptions.value.id} />
    {/await}

    <!-- Characters -->
    {#await Characters() then CharactersComponent}
      <CharactersComponent mediaID={modalsOptions.value.id} />
    {/await}

    <!-- About -->
    {#if !!mediaSource}
      {#await About() then AboutComponent}
        <AboutComponent source={mediaSource} />
      {/await}
    {/if}
  {/if}
</div>
