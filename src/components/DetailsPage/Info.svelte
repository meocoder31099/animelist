<script lang="ts">
  // Import Type
  import type { Maybe } from "@/types";
  import type { Media } from "@/types/anilist";

  type DateData = {
    year: number;
    month: number;
    day: number;
  };

  // Import Libs
  import useCreateLink from "@/hooks/useCreateLink";

  export let isLoading: boolean = true;
  export let isSuccess: boolean = false;
  export let source: Maybe<Media>;

  let startDate: string = "";
  let endDate: string = "";
  let studioLinks: string[] = [];

  const dateFromat = (date: DateData): string =>
    new Date(date.year, date.month - 1, date.day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (
    !!source?.startDate &&
    source.startDate.year &&
    source.startDate.month &&
    source.startDate.day
  )
    startDate = dateFromat(source.startDate as DateData);
  if (
    !!source?.endDate &&
    source.endDate.year &&
    source.endDate.month &&
    source.endDate.day
  )
    endDate = dateFromat(source.endDate as DateData);

  if (!!source?.studios?.nodes?.length)
    studioLinks = source?.studios?.nodes.map((node) =>
      useCreateLink([
        "/studio/",
        { value: node.name, convert: "-" },
        "-an",
        node.id,
      ])
    );
</script>

<div class="flex px-0.5 py-2 sm:px-0">
  {#if source}
    <div class="flex flex-col gap-1.5">
      {#if !!source.title?.native}
        <div class="inline-block">
          <span class="text-neutral-400 mr-1">Native:</span>
          <span>{source.title.native}</span>
        </div>
      {/if}
      {#if !!source.title?.romaji}
        <div class="inline-block">
          <span class="text-neutral-400 mr-1">Romaji:</span>
          <span>{source.title.romaji}</span>
        </div>
      {/if}
      {#if !!source.title?.english}
        <div class="inline-block">
          <span class="text-neutral-400 mr-1">English:</span>
          <span>{source.title.english}</span>
        </div>
      {/if}
      {#if !!source.synonyms?.length}
        <div class="inline-block">
          <span class="text-neutral-400 mr-1">Synonyms:</span>
          {#each source.synonyms as synonym}
            <span class="after:content-[',_'] last:after:content-[]"
              >{synonym}</span
            >
          {/each}
        </div>
      {/if}
      {#if !!startDate || !!endDate}
        <div class="inline-block">
          <span class="text-neutral-400 mr-1">Aired:</span>
          <span>{startDate || '?'}</span> to <span>{endDate || '?'}</span>
        </div>
      {/if}
      {#if !!source.favourites}
        <div class="inline-block">
          <span class="text-neutral-400 mr-1">Favourites:</span>
          <span>{source.favourites}</span>
        </div>
      {/if}
      {#if !!source.genres?.length}
        <div class="inline-block">
          <span class="text-neutral-400 mr-1">Genres:</span>
          {#each source.genres as genre}
            <span class="after:content-[',_'] last:after:content-[]"
              >{genre}</span
            >
          {/each}
        </div>
      {/if}
      {#if !!source.studios?.nodes?.length}
        <div class="inline-block">
          <span class="text-neutral-400 mr-1">Studios:</span>
          {#each source.studios?.nodes as studio, i}
            <span
              class="after:content-[',_'] last:after:content-[]"
              class:font-bold={studio.isAnimationStudio}
              ><a href={studioLinks[i]}>{studio.name}</a></span
            >
          {/each}
        </div>
      {/if}
      {#if !!source.tags?.length}
        <div class="inline-block">
          <span class="text-neutral-400 mr-1">Tags:</span>
          {#each source.tags as tag}
            <span class="after:content-[',_'] last:after:content-[]"
              >{tag.name}</span
            >
          {/each}
        </div>
      {/if}
      {#if !!source.description}
        <div class="inline-block">
          <span class="text-neutral-400 mr-1">Description:</span>
          <span>{@html source.description}</span>
        </div>
      {/if}
    </div>
  {/if}
</div>
