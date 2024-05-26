<script lang="ts">
  // Import Actions
  import onMediaDetailsModal from "@/use-actions/onMediaDetailsModal";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let to: string = "";
  export let source: any = {};
  export let isShowType: boolean = false;
  export let isLoading = true;
  export let isRank: boolean = false;
  export let index: number = 0;
</script>

{#if isLoading}
  <div class="flex flex-col w-full mb-2 lg:mb-6 animate-pulse">
    <div class="aspect-w-11 aspect-h-16 rounded-lg bg-neutral-800" />
    <div class="mt-2 bg-neutral-800 h-6 rounded" />
  </div>
{:else}
  <div class="flex flex-col w-full group relative mb-2 lg:mb-6">
    <a
      use:onMediaDetailsModal={{
        id: source.id,
        image: source.coverImage.extraLarge || source.coverImage.large,
        name: source.title.userPreferred,
      }}
      href={to}
    >
      <div class="aspect-w-11 aspect-h-16">
        <!-- Image -->
        <div class="w-full h-full rounded-lg overflow-hidden">
          <Image
            src={source.coverImage?.extraLarge ||
              source?.coverImage?.large ||
              source.image.large}
            backgroundColor={source.coverImage?.color}
            alt={source.title?.userPreferred || source.name?.userPreferred}
          />
        </div>
        <!-- {#if source.nextAiringEpisode}
          <div class="w-full hidden lg:block">
            <div
              class="absolute left-1 bottom-1 bg-neutral-900/70 max-w-full w-fit h-fit px-1 py-0.5 rounded-md line-clamp-1 text-xs lg:text-sm lg:px-1.5 lg:rounded-lg"
            >
              <span>EP {source.nextAiringEpisode.episode}:</span>
              <span>{formatTimestamp(source.nextAiringEpisode.airingAt)}</span>
            </div>
          </div>
        {/if} -->
      </div>
    </a>

    <!-- Title -->
    <a
      use:onMediaDetailsModal={{
        id: source.id,
        image: source.coverImage.extraLarge || source.coverImage.large,
        name: source.title.userPreferred,
      }}
      href={to}
    >
      <div class="flex flex-row gap-2 px-1 mt-2 lg:mt-4 overflow-hidden">
        <div class="flex">
          <h3
            class="text-sm lg:text-base font-semibold text-white line-clamp-2"
            style:color={source.coverImage?.color}
          >
            {#if isRank}#<span class="text-lg font-bold">{index}</span>. {/if}{source
              .title?.userPreferred || source.name?.userPreferred}
          </h3>
        </div>
      </div>
    </a>
    {#if isShowType}
      <div
        class="mt-1 text-xs md:text-sm text-neutral-300 opacity-60 px-1 lowercase first-letter:uppercase"
        style:color={source.coverImage?.color}
      >
        {source.type}
      </div>
    {/if}
  </div>
{/if}
