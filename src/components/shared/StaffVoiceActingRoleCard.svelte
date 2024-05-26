<script lang="ts">
  // Import Libs
  import { convertToUrl } from "@/utils";
  import { fade } from "svelte/transition";

  // Import Actions
  import onMediaDetailsModal from "@/use-actions/onMediaDetailsModal";
  import onCharacterDetailsModal from "@/use-actions/onCharacterDetailsModal";

  // Import Components
  import Image from "@/components/shared/Image.svelte";
  import Dot from "@/components/shared/Dot.svelte";

  export let source: any;
  export let type: "characterMedia" | "staffMedia";
</script>

<div
  in:fade|global
  class="w-full flex justify-between gap-2 rounded-lg bg-neutral-500/20 p-2.5 lg:p-4"
>
  <div class="w-full flex justify-between gap-1.5">
    <a
      use:onMediaDetailsModal={{
        id: source.node.id,
        image:
          source.node.coverImage.extraLarge || source.node.coverImage.large,
        name: source.node.title.userPreferred,
      }}
      href={`/${source.node.type.toLowerCase()}/details/${convertToUrl(
        source.node.title.userPreferred
      )}-an${source.node.id}`}
      class={type === "characterMedia" ? "w-1/2" : "w-3/5"}
    >
      <div class="flex gap-3 items-center">
        <div class="w-12 md:w-16 rounded-lg shrink-0 overflow-hidden">
          <div class="aspect-w-11 aspect-h-16">
            <Image
              src={source.node.coverImage.large}
              backgroundColor={source.node.coverImage.color}
              alt={source.node.title.userPreferred}
            />
          </div>
        </div>
        <div class="w-full flex flex-col gap-1.5 text-xs md:text-base">
          <h3 class="line-clamp-2 font-bold">
            {source.node.title.userPreferred}
          </h3>
          <div class="flex items-center text-xs gap-2">
            <span>{source.node.startDate.year || "TBA"}</span>
            <Dot backgroundColor={source.node.coverImage.color} />
            <span>{source.node.format}</span>
          </div>
        </div>
      </div>
    </a>
    <!-- Characters -->
    {#if type === "characterMedia" && !!source.characters[0]}
      <a
        use:onCharacterDetailsModal={{
          id: source.characters[0].id,
          image:
            source.characters[0].image.large ||
            source.characters[0].image.medium,
          name: source.characters[0].name.userPreferred,
        }}
        href={`/character/${convertToUrl(
          source.characters[0].name.userPreferred
        )}-an${source.characters[0].id}`}
        class="w-1/2 flex gap-3 justify-end items-center"
      >
        <div
          class="w-full flex flex-col text-right gap-1.5 text-xs md:text-base"
        >
          <h3 class="font-bold">
            {source.characters[0].name.userPreferred}
          </h3>
          <span
            class="text-neutral-400 text-xs first-letter:uppercase lowercase"
            >{source.characterRole}
          </span>
        </div>
        <div class="w-12 md:w-16 rounded-lg shrink-0 overflow-hidden">
          <div class="aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
            <Image
              src={source.characters[0].image.medium}
              alt={source.characters[0].name.userPreferred}
            />
          </div>
        </div>
      </a>
    {/if}
    <!-- Staff role -->
    {#if type === "staffMedia" && !!source.staffRole}
      <div class="w-2/5 flex gap-3 justify-end items-center">
        <div
          class="w-full flex flex-col text-right gap-1.5 text-xs md:text-base"
        >
          <span class="text-neutral-400">{source.staffRole}</span>
        </div>
      </div>
    {/if}
  </div>
</div>
