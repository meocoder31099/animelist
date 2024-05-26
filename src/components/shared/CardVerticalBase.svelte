<script lang="ts">
  // Import Types
  import type { CardVerticalBaseOptions } from "@/types";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let options: CardVerticalBaseOptions;
</script>

<div class="flex flex-col w-full group relative mb-2 lg:mb-6">
  <div class="aspect-w-11 aspect-h-16">
    <!-- Image -->
    <div class="w-full h-full rounded-lg overflow-hidden">
      <Image
        src={options.coverImage?.image || ""}
        backgroundColor={options.coverImage?.color}
        alt={options.coverImage?.alt || ""}
      />
    </div>
  </div>

  <!-- Title -->
  <div class="flex flex-row gap-2 px-1 mt-2 lg:mt-4 overflow-hidden">
    <slot name="title">
      <h3
        class="max-w-full text-sm 3xl:text-base font-semibold text-gray-100 line-clamp-2 break-words"
        style:color={options.coverImage?.color}
      >
        {options.title}
      </h3>
    </slot>
  </div>
  <!-- Sub description -->
  <slot name="sub-description" />
  <!-- <div
    class="mt-1 text-xs md:text-sm text-neutral-300 opacity-60 lowercase first-letter:uppercase"
    style:color={source.coverImage?.color}
  >
    {source.type}
  </div> -->
</div>
