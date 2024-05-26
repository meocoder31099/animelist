<script lang="ts">
  // Import libs
  import { lazyImage } from "../../utils/lazyLoad";

  export let to: string = "";
  export let source: any = {};
  export let isLoading = true;
</script>

{#if isLoading}
  <div
    class="flex w-full bg-neutral-900 shadow-lg rounded-lg border border-neutral-800/40 animate-pulse"
  >
    <div class="w-1/3">
      <div class="w-full aspect-w-11 aspect-h-16 bg-neutral-800 rounded-l-lg" />
    </div>
    <div class="w-2/3 flex flex-col justify-between gap-2 p-3">
      <div class="flex flex-col gap-6">
        <div class="bg-neutral-800 w-full h-8 rounded-lg" />
        <div class="bg-neutral-800 w-2/3 h-6 rounded-lg" />
      </div>
    </div>
  </div>
{:else}
  <a href={to}>
    <div
      class="flex w-full bg-neutral-900 shadow-lg rounded-lg border border-neutral-800/40 overflow-hidden"
    >
      <div class="w-1/3">
        <div
          class="w-full aspect-w-11 aspect-h-16 bg-neutral-800 rounded-l-lg overflow-hidden"
          style:background-color={source?.media?.coverImage?.color}
        >
          <img
            class="w-full h-full object-center object-cover"
            alt="video"
            use:lazyImage
            data-lazy={source?.media?.coverImage?.large ||
              source?.media?.coverImage?.extraLarge}
          />
        </div>
      </div>
      <div class="w-2/3 flex flex-col justify-between gap-2 p-3">
        <div class="flex flex-col gap-2">
          <h5
            class="text-lg font-medium line-clamp-2"
            style:color={source?.media?.coverImage?.color}
          >
            {source.media.title.english || source.media.title.userPreferred}
          </h5>
          <div
            class="flex text-sm text-neutral-300 line-clamp-1"
          >
            {#each source?.media?.genres as genre}
              <span class="after:content-[',_'] pr-1 last:after:content-['']">{genre}</span>
            {/each}
          </div>
        </div>
        <div class="flex justify-end">
          <p
            class="text-neutral-300 opacity-80 text-sm"
            style:color={source?.media?.coverImage?.color}
          >
            Episode {source.episode}
          </p>
        </div>
      </div>
    </div>
  </a>
{/if}
