<script lang="ts">
  // Import libs
  import { lazyImage } from "../../utils/lazyLoad";
  import { formatTimestamp } from "../../utils/aniList";

  export let to: string = "";
  export let source: any = {};
  export let isLoading: boolean = true;
</script>

{#if isLoading}
  <div class="flex w-full flex-col pb-3 animate-pulse">
    <div class="w-full aspect-w-16 aspect-h-9 bg-neutral-800 rounded-lg" />
    <div class="flex flex-rows gap-x-2 mt-2">

      <!-- Description -->
      <div class="flex-1 flex-col w-full">
        <div class="w-full h-6 rounded bg-neutral-800" />
        <div class="mt-2 w-4/6 h-4 rounded bg-neutral-800" />
      </div>
    </div>
  </div>
{:else}
  <div class="flex w-full flex-col bg-transparent pb-3 overflow-hidden">
    <div
      class="w-full aspect-w-16 aspect-h-9 rounded-lg"
      
    >
      <a href={to}
        ><img
          use:lazyImage
          data-lazy={source?.bannerImage ||
            source?.coverImage?.extraLarge ||
            source?.coverImage?.large}
          class="w-full h-full object-cover bg-neutral-800 rounded-lg"
          class:object-center={source?.bannerImage}
          class:object-top={!source?.bannerImage}
          alt=""
          style:background-color={source.coverImage?.color}
        />
      </a>
    </div>
    <a href={to}>
      <div
        class="flex flex-row gap-2 mt-2 lg:mt-4"
      >
        <!-- Description -->
        <div class="flex flex-col">
          <p
            class="text-sm 3xl:text-base md:font-medium text-gray-100 line-clamp-2"
            style:color={source.coverImage.color}
          >
            {source.title.english || source.title.userPreferred}
          </p>
          <slot name="descriptions" />
        </div>
      </div>
    </a>
  </div>
{/if}
