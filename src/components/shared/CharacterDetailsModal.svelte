<script lang="ts">
  // Import Types
  import type { Character } from "@/types/anilist";

  // Import Libs
  import { fade } from "svelte/transition";
  import useAnilistDescriptionsFromat from "@/hooks/useAnilistDescriptionsFromat";
  import useCreateLink from "@/hooks/useCreateLink";

  // Import Components
  import Image from "@/components/shared/Image.svelte";
  import CharacterCard from "@/components/shared/CharacterCard.svelte";

  export let source: Character;

  const moreLink = useCreateLink([
    "/character/",
    { value: source.name?.userPreferred || "", convert: "-" },
    "-an",
    source.id,
  ]);
</script>

<div
  in:fade|global
  class="w-full h-full flex flex-col lg:flex-row gap-x-6 gap-y-10 p-4 px-3 md:px-6 lg:md:px-6 lg:px-10 py-10 mx-auto z-10"
>
  <div class="w-52 h-52 shrink-0 mx-auto rounded-full overflow-hidden">
    <Image
      src={source.image?.large || ""}
      alt={source.name?.userPreferred || ""}
    />
  </div>
  <div class="w-full flex flex-col gap-6 lg:mt-4 overflow-hidden">
    <div class="w-full flex flex-col items-center lg:items-start gap-y-2 px-4 lg:px-0 text-center">
      <h1 class="text-2xl md:text-4xl font-bold max-w-full break-words">
        {source.name?.userPreferred}
      </h1>
      <div class="text-sm md:text-base">
        {#if source.name?.native}
          <span class="last:after:content-[''] after:content-[',_']"
            >{source.name?.native}</span
          >
        {/if}
        {#each source.name?.alternative || [] as alternative}
          <span class="last:after:content-[''] after:content-[',_']"
            >{alternative}</span
          >
        {/each}
        {#each source.name?.alternativeSpoiler || [] as alternativeSpoiler}
          <span class="last:after:content-[''] after:content-[',_'] font-medium"
            >{alternativeSpoiler}</span
          >
        {/each}
      </div>
    </div>

    <!-- About -->
    <div class="flex flex-col">
      <div>
        <span class="mr-2">Favourites:</span>{source.favourites}
      </div>
      {#if !!source.dateOfBirth?.month}
        <div>
          <span class="mr-2">Birthday:</span>{source.dateOfBirth.day}/{source
            .dateOfBirth.month}
        </div>
      {/if}
      {#if !!source.age}
        <div>
          <span class="mr-2">Age:</span>{source.age}
        </div>
      {/if}
      {#if !!source.gender}
        <div>
          <span class="mr-2">Gender:</span>{source.gender}
        </div>
      {/if}
      {@html useAnilistDescriptionsFromat(source?.description || "")}
    </div>

    <!-- Anime/Manga -->
    <div class="flex flex-col">
      <!-- Title -->
      <div class="w-full mb-4">
        <h3 class="text-xl lg:text-2xl w-full break-words">
          Anime/Manga featuring <span class="font-bold"
            >{source.name?.userPreferred}</span
          >
        </h3>
      </div>
      <div class="flex flex-col gap-2 overflow-hidden">
        {#each source.media?.edges || [] as edge}
          <CharacterCard source={edge} />
        {/each}
      </div>
    </div>

    <!-- More -->
    <!-- Because the default number of media on an Anilist page is 25 -->
    {#if source.media?.pageInfo?.hasNextPage}
      <div class="w-full py-6">
        <a class="w-full h-full" href={moreLink}>
          <button
            class="w-full py-4 md:py-2 text-white font-medium inline-flex justify-center md:justify-between items-center transition-colors duration-300 hover:text-neutral-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current w-6 h-6 3xl:w-7 3xl:h-7"
              ><path
                d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
              /><path d="M11 11h2v6h-2zm0-4h2v2h-2z" /></svg
            >
            <span class="ml-3 3xl:text-lg">Xem thêm</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="hidden md:block fill-current w-6 h-6 3xl:w-7 3xl:h-7 ml-auto"
              ><path
                d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
              /></svg
            >
          </button>
        </a>
      </div>
    {/if}
  </div>
</div>
