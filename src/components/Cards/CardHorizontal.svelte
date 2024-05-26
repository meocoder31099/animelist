<script lang="ts">
  // Import libs
  import { formatTimestamp } from "../../utils/aniList";

  // Import Actions
  import onMediaDetailsModal from "@/use-actions/onMediaDetailsModal";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let to: string = "";
  export let index: number = 0;
  export let source: any = {};
  export let isLoading: boolean = true;
  export let isRank: boolean = false;

  const rank: number = index + 1;
  let isFirst: boolean = false;
  let isLast: boolean = false;

  const checkPosition = (node: HTMLElement) => {
    const parentWidth = node.parentElement?.parentElement?.offsetWidth;
    if (!parentWidth) return;
    const { x: cardRectX, width: cardRectWidth } = node.getBoundingClientRect();
    if (cardRectX < cardRectWidth) isFirst = true;
    else if (parentWidth <= cardRectX + cardRectWidth) isLast = true;
  };
</script>

{#if isLoading}
  <div class="flex w-full flex-col pb-3 animate-pulse">
    <div class="w-full aspect-w-16 aspect-h-9 bg-neutral-800 rounded-lg" />
    <div class="flex flex-rows gap-x-2 mt-2">
      <!-- number -->
      <!-- <div class="w-11 h-11 bg-neutral-800 rounded-full" /> -->

      <!-- Description -->
      <div class="flex-1 flex-col w-full">
        <div class="w-full h-6 rounded bg-neutral-800" />
        <div class="mt-2 w-4/6 h-4 rounded bg-neutral-800" />
      </div>
    </div>
  </div>
{:else}
  <div
    use:checkPosition
    class:hover:-ml-0={isFirst}
    class:hover:-ml-32={isLast}
    class:hover:-ml-16={!isFirst && !isLast}
    class="flex w-full flex-col bg-transparent pb-3 transition-none hover:transition-all duration-700 delay-500 group hover:-mt-4 hover:w-[calc(100%+8rem)] hover:absolute hover:z-10 hover:bg-neutral-800 hover:rounded-lg hover:shadow hover:shadow-black overflow-hidden"
  >
    <div
      class="w-full aspect-w-16 aspect-h-9 rounded-lg transition-none duration-700 delay-500 group-hover:transition-[padding] group-hover:aspect-h-8"
    >
      <a
        use:onMediaDetailsModal={{
          id: source.id,
          image: source.coverImage.extraLarge || source.coverImage.large,
          name: source.title.userPreferred,
        }}
        href={to}
      >
        <div
          class="w-full h-full rounded-lg delay-500 duration-700 group-hover:transition-[border-radius] group-hover:rounded-b-none overflow-hidden"
        >
          <Image
            src={source?.bannerImage ||
              source?.coverImage?.extraLarge ||
              source?.coverImage?.large}
            backgroundColor={source.coverImage?.color}
            alt={source.title?.userPreferred || source.name?.userPreferred}
          />
        </div>
        {#if source.nextAiringEpisode}
          <div class="w-full">
            <div
              class="absolute left-1 bottom-1 bg-neutral-900/70 max-w-full w-fit h-fit px-1 py-0.5 rounded-md line-clamp-1 text-xs lg:text-sm lg:px-1.5 lg:rounded-lg"
            >
              <span>EP {source.nextAiringEpisode.episode}:</span>
              <span>{formatTimestamp(source.nextAiringEpisode.airingAt)}</span>
            </div>
          </div>
        {/if}
      </a>
    </div>
    <a
      use:onMediaDetailsModal={{
        id: source.id,
        image: source.coverImage.extraLarge || source.coverImage.large,
        name: source.title.userPreferred,
      }}
      href={to}
    >
      <div
        class="flex flex-row gap-2 mt-2 lg:mt-4 transition-none duration-700 delay-500 group-hover:transition-[padding] group-hover:px-3 group-hover:pt-1"
      >
        <!-- number -->
        {#if isRank}
          <div
            class="flex-shrink-0 flex mr-0.5 lg:mr-2 text-white"
            style:color={source.coverImage?.color}
          >
            <span class="text-base lg:text-2xl pt-1 lg:pt-1.5">#</span>
            <span class="text-2xl lg:text-4xl font-bold"
              >{rank}</span
            >
          </div>
        {/if}

        <!-- Description -->
        <div class="flex flex-col">
          <p
            class="text-sm lg:text-base font-semibold text-white line-clamp-2"
            style:color={source.coverImage.color}
          >
            {source.title.userPreferred}
          </p>
          <div
            class="flex flex-row flex-wrap items-center mt-1 text-xs lg:text-sm text-gray-400"
          >
            <p class="mr-2 lowercase first-letter:uppercase">{source.status}</p>
            <span class="w-1 h-1 rounded-full bg-neutral-500 mr-2" />
            <p>{source.startDate.year} - {source.endDate.year || "?"}</p>
          </div>
        </div>
      </div>
    </a>

    <div
      class="flex justify-between space-x-2 px-3 mt-5 text-white max-h-0 overflow-hidden transition-none delay-500 duration-700 group-hover:transition-[max-height] group-hover:max-h-[1000px]"
    >
      <button
        class="w-1/2 bg-neutral-700 p-1.5 rounded-full inline-flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current w-5 h-5"
          ><path
            d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"
          /></svg
        >
        <span class="text-sm ml-2">Yêu thích</span>
      </button>
      <button
        class="w-1/2 bg-neutral-700 p-1.5 rounded-full inline-flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-current w-5 h-5"
          ><path
            d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"
          /><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z" /></svg
        >
        <span class="text-sm ml-2">Lưu vào</span>
      </button>
    </div>
  </div>
{/if}
