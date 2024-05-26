<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { MediaStreamingEpisode } from "@/types/anilist";

  // Import Libs
  import { fade } from "svelte/transition";
  import Image from "@/components/shared/Image.svelte";
  import useOpenNewWindow from "@/hooks/useOpenNewWindow";

  export let isLoading: boolean = true;
  export let isSuccess: boolean = false;
  export let source: Maybe<MediaStreamingEpisode[]>;
</script>

<div class="flex px-0.5 py-2 sm:px-0">
  {#if isLoading}
    <ul
      class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-6 sm:gap-y-8 animate-pulse"
    >
      {#each Array(4) as noUse}
        <li
          class="flex sm:flex-col gap-2.5 sm:gap-4 col-span-1 overflow-hidden"
        >
          <div class="w-2/5 sm:w-full">
            <div
              class="aspect-w-16 aspect-h-9 rounded-md sm:rounded-lg bg-neutral-800"
            />
          </div>
          <div class="w-3/5 sm:w-full flex flex-col gap-2 justify-center">
            <div class="w-1/ h-6 bg-neutral-800 rounded" />
            <div class="w-1/3 h-4 bg-neutral-800 rounded" />
          </div>
        </li>
      {/each}
    </ul>
  {:else if isSuccess && !!source && source.length}
    <ul
      in:fade|global
      class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-6 sm:gap-y-8"
    >
      {#each source as eposide}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          on:click={() => {
            useOpenNewWindow(eposide.url);
          }}
          class="flex sm:flex-col gap-2.5 sm:gap-4 col-span-1 overflow-hidden cursor-pointer"
        >
          <div class="w-2/5 sm:w-full">
            <div
              class="aspect-w-16 aspect-h-9 rounded-lg bg-neutral-800 overflow-hidden"
            >
              <Image src={eposide.thumbnail || ""} />
            </div>
          </div>
          <div class="w-3/5 sm:w-full flex flex-col gap-1 justify-center">
            <span class="text-base font-bold line-clamp-2"
              >{eposide.title}</span
            >
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
