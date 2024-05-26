<script lang="ts">
  // Import Types
  import type { Maybe, CardMediaVerticalOptions } from "@/types";

  // Import Actions
  import onMediaDetailsModal from "@/use-actions/onMediaDetailsModal";

  // Import Components
  import CardVerticalBase from "@/components/shared/CardVerticalBase.svelte";

  export let options: CardMediaVerticalOptions;
</script>

<!-- <div class="flex flex-col w-full group relative mb-2 lg:mb-6">
  <a
    use:onMediaDetailsModal={{
      id: source.id,
      image: source.coverImage.extraLarge || source.coverImage.large,
      name: source.title.userPreferred,
    }}
    href={to}
  >
    <div class="aspect-w-11 aspect-h-16"> -->
<!-- Image -->
<!-- <div class="w-full h-full rounded-lg overflow-hidden">
        <Image
          src={source.coverImage?.extraLarge ||
            source?.coverImage?.large ||
            source.image.large}
          backgroundColor={source.coverImage?.color}
          alt={source.title?.userPreferred || source.name?.userPreferred}
        />
      </div> -->
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
<!-- </div>
  </a> -->

<!-- Title -->
<!-- <a
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
          {#if isRank}#<span class="text-lg font-bold">{index}</span>.
          {/if}{source.title?.userPreferred || source.name?.userPreferred}
        </h3>
      </div>
    </div>
  </a>
</div> -->

<!-- {#if isShowType}
      <div
        class="mt-1 text-xs md:text-sm text-neutral-300 opacity-60 px-1 lowercase first-letter:uppercase"
        style:color={source.coverImage?.color}
      >
        {source.type}
      </div>
    {/if} -->

<a
  use:onMediaDetailsModal={{
    id: options.id,
    image: options.coverImage?.image || "",
    name: options?.title || "",
    href: options.to,
    bannerImage: options.bannerImage || "",
  }}
  href={options.to}
>
  <CardVerticalBase
    options={{
      title: options?.title,
      coverImage: {
        alt: options?.title,
        image: options.coverImage?.image,
        color: options?.coverImage?.color,
      },
    }}
  >
    <h3
      slot="title"
      class="max-w-full text-sm 3xl:text-base font-semibold text-gray-100 line-clamp-2 break-words"
      style:color={options.coverImage?.color}
    >
      {#if options.isRanking}#<span class="text-lg md:text-2xl font-bold"
          >{options.index}</span
        > -
      {/if}{options.title}
    </h3>

    <svelte:fragment slot="sub-description">
      {#if !!options.subDescription}
        <div
          class="mt-1 px-1 text-xs md:text-sm text-neutral-300 opacity-60 break-words"
          style:color={options.coverImage?.color}
        >
          {options.subDescription}
        </div>
      {/if}
    </svelte:fragment>
  </CardVerticalBase>
</a>
