<script lang="ts" context="module">
  export interface InitialOptions {
    genre_in?: string[];
    tag_in?: string[];
    countryOfOrigin_in?: string;
    source_in?: string;
    sort_in?: string[];
    status_in?: string;
    startDate_like_in?: string;
  }
</script>

<script lang="ts">
  //Import Type
  import type { Maybe } from "@/types";
  type Tags = Record<string, { label: string; isAdult: boolean }[]>;
  import { MediaCountry, MediaSource, MediaStatus } from "@/types/anilist";

  // Import Libs
  import { onMount, createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import useGenreCollection from "@/hooks/useGenreCollection";
  import useDebounce from "@/hooks/useDebounce";
  import { SEASON_YEARS } from "@/constants";

  // Import Actions
  import onClickOutside from "@/use-actions/onClickOutside";

  // Import Stores
  import { isBottomTabBar } from "@/stores/UserSettingStore";

  // Import Components
  import SelectOutline from "@/components/shared/SelectOutline.svelte";
  import InputCheckboxSmall from "@/components/shared/InputCheckboxSmall.svelte";

  export let initial: InitialOptions = {};

  const dispacth = createEventDispatcher();
  const countries: (MediaCountry | undefined)[] = [
    MediaCountry.Japan,
    MediaCountry.China,
    MediaCountry.South_Korea,
    MediaCountry.Taiwan,
  ];
  const sources: (MediaSource | undefined)[] = [
    MediaSource.Anime,
    MediaSource.Comic,
    MediaSource.Doujinshi,
    MediaSource.Game,
    MediaSource.Light_novel,
    MediaSource.Live_action,
    MediaSource.Manga,
    MediaSource.Multimedia_project,
    MediaSource.Novel,
    MediaSource.Original,
    MediaSource.Other,
    MediaSource.Picture_book,
    MediaSource.Video_game,
    MediaSource.Visual_novel,
    MediaSource.Web_novel,
  ];
  let status: (MediaStatus | undefined)[] = [
    MediaStatus.Finished,
    MediaStatus.Cancelled,
    MediaStatus.Hiatus,
    MediaStatus.Not_yet_released,
    MediaStatus.Releasing,
  ];
  const years: string[] = SEASON_YEARS.map((year) => year.toString());
  let genres: string[] = [];
  const categorizedMediaTags: Tags = {};
  let categorysTag: string[] = [];
  let genre_in: string[] = initial.genre_in || [];
  let tag_in: string[] = initial.tag_in || [];
  let countryOfOrigin_in: string | undefined =
    initial.countryOfOrigin_in || undefined;
  let source_in: string | undefined = initial.source_in || undefined;
  let status_in: string | undefined = initial.status_in || undefined;
  let startDate_like_in: string | undefined =
    initial.startDate_like_in || undefined;
  const genresData = useGenreCollection({});

  const closeModal = () => {
    dispacth("close", true);
  };

  onMount(() => {
    const unsubscribeGenresData = genresData.subscribe((value) => {
      const data = value?.data;
      if (!!data) {
        // Create genres list from GenreCollection
        genres = data.GenreCollection;
        // Create tag list from GenreCollection
        for (const mediaTag of data.MediaTagCollection) {
          let { category } = mediaTag;
          if (!category) continue;
          category = category.replace(/^(Cast|Setting|Theme)-/g, "$1 / ");
          if (!categorizedMediaTags[category]) {
            categorizedMediaTags[category] = [];
          }
          categorizedMediaTags[category].push({
            label: mediaTag.name,
            isAdult: !!mediaTag.isAdult,
          });
        }
      }
      categorysTag = Object.keys(categorizedMediaTags)?.sort();
    });

    window?.document.querySelector("html")?.classList.add("!overflow-hidden");
    isBottomTabBar.set(false);

    return () => {
      unsubscribeGenresData();
      window?.document
        .querySelector("html")
        ?.classList.remove("!overflow-hidden");
      isBottomTabBar.set(true);
    };
  });

  const handleClick = useDebounce(
    (node: Maybe<EventTarget>, callback: () => void): void => {
      if (!node) return;
      if (["checkbox", "radio"].includes((node as HTMLInputElement).type))
        callback();
    },
    500
  );
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="fixed inset-0 w-full h-full z-50 bg-background/60 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-w-1 lg:scrollbar-thumb-white scrollbar-thumb-rounded-lg"
>
  <div class="w-full xl:w-2/4 h-full flex flex-col mx-auto pt-12 md:px-4">
    <div
      use:onClickOutside={closeModal}
      in:fly={{
        y: 100,
        opacity: 1,
        duration: 400,
      }}
      class="w-full h-fit flex md:grow flex-col mt-auto rounded-t-lg bg-neutral-900 relative"
    >
      <!-- Clear Button -->
      <button
        on:click={() => {
          closeModal();
        }}
        class="absolute top-2 right-3 md:top-4 md:right-4 bg-neutral-800 rounded-full md:p-1 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current w-7 h-7"
          ><path
            d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"
          /></svg
        >
      </button>
      <div class="flex flex-col gap-y-6 py-4 md:py-6 lg:py-12">
        <!-- Select -->
        <div class="flex flex-wrap gap-x-2 gap-y-6 px-4 md:px-6 lg:px-12">
          <slot name="select-start" />
          <!-- Year -->
          <SelectOutline
            name="startDate_like"
            items={years}
            bind:value={startDate_like_in}
            title="Year"
            on:change={(event) => {
              dispacth("startDate_like", event.detail);
            }}
          />
          <!-- Status -->
          <SelectOutline
            name="status"
            items={status}
            bind:value={status_in}
            title="Status"
            on:change={(event) => {
              dispacth("status", event.detail);
            }}
          />
          <!-- Source -->
          <SelectOutline
            name="source"
            items={sources}
            bind:value={source_in}
            title="Source Material"
            on:change={(event) => {
              dispacth("source", event.detail);
            }}
          />
          <!-- Country -->
          <SelectOutline
            name="countryOfOrigin"
            items={countries}
            bind:value={countryOfOrigin_in}
            title="Country Of Origin"
            on:change={(event) => {
              dispacth("countryOfOrigin", event.detail);
            }}
          />
          <slot name="select-end" />
        </div>
        <!-- Radio -->
        <div class="flex flex-col gap-10 px-4 md:px-6 lg:px-12 mt-4">
          <slot name="radio-top" />
          <slot name='radio-end'></slot>
        </div>
        <!-- Checkbox -->
        <div class="w-full border-t-2 border-neutral-800" />
        <div class="flex flex-col gap-10 px-4 md:px-6 lg:px-12 mt-4">
          {#if !!genres.length}
            <InputCheckboxSmall
              title="Genres"
              items={genres}
              bind:value={genre_in}
              name="genre"
              on:change={(event) => {
                dispacth("genre_in", event.detail);
              }}
            />
          {/if}
          {#if !!categorysTag.length}
            <div
              class="flex flex-col gap-10"
              on:click|capture={(event) => {
                handleClick(event.target, () => {
                  dispacth("tag_in", tag_in);
                });
              }}
            >
              {#each categorysTag as category, categoryIndex}
                <div class="flex flex-wrap gap-2">
                  <div class="basis-full font-semibold text-lg mb-2">
                    {category}
                  </div>
                  {#each categorizedMediaTags[category] as { label }, i}
                    <div class="py-1.5">
                      <input
                        id={`tag_${categoryIndex}_${i}`}
                        type="checkbox"
                        value={label}
                        bind:group={tag_in}
                        class="hidden peer"
                      />
                      <label
                        for={`tag_${categoryIndex}_${i}`}
                        class="px-4 py-1.5 rounded-lg border border-neutral-700 cursor-pointer transition-colors duration-500 peer-checked:bg-white peer-checked:text-black"
                      >
                        {label}
                      </label>
                    </div>
                  {/each}
                </div>
              {/each}
            </div>
          {/if}
        </div>
        {#if $$slots.below}
          <slot name="below" />
        {/if}
      </div>
    </div>
  </div>
</div>
