<script lang="ts">
  // Import Types
  import type { AiringSchedule } from "@/types/anilist";

  //Import Libs
  import { convertToUrl } from "@/utils";

  // Import Actions
  import onMediaDetailsModal from "@/use-actions/onMediaDetailsModal";

  //Import Components
  import Image from "@/components/shared/Image.svelte";
  import Dot from "@/components/shared/Dot.svelte";

  export let source: AiringSchedule;
  export let time: string;
</script>

<div class="w-full flex flex-wrap rounded-lg bg-neutral-500/20 p-4">
  <div class="flex justify-between w-full gap-4">
    <a
      use:onMediaDetailsModal={{
        id: source.media?.id || 0,
        image:
          source.media?.coverImage?.large ||
          source.media?.coverImage?.extraLarge ||
          "",
        name: source.media?.title?.userPreferred || "",
      }}
      class="w-full"
      href={`/${source.media?.type?.toLowerCase()}/details/${convertToUrl(
        source.media?.title?.userPreferred || ""
      )}-an${source.media?.id}`}
    >
      <div class="flex gap-4">
        <div class="w-16 rounded-lg shrink-0 overflow-hidden">
          <div class="aspect-w-11 aspect-h-16">
            <Image
              src={source.media?.coverImage?.large || ""}
              backgroundColor={source.media?.coverImage?.color}
            />
          </div>
        </div>
        <div
          class="w-full flex flex-col justify-start md:justify-between gap-2"
        >
          <div class="flex flex-col gap-1.5">
            <h3 class="font-bold font-lexenddeca line-clamp-2">
              {source.media?.title?.userPreferred}
            </h3>
            <div class="hidden md:flex flex-wrap gap-1.5 text-sm items-center">
              {#each source.media?.genres || [] as genre}
                <span>{genre}</span>
                <Dot backgroundColor={source.media?.coverImage?.color} />
              {/each}
            </div>
          </div>
          <div class="flex text-sm items-center gap-2">
            <span>{time}</span><span>Episode {source?.episode}</span>
          </div>
        </div>
      </div>
    </a>
    <div class="flex items-center z-10">
      <button class="text-neutral-400"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="w-6 h-6 fill-current"
          ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg
        ></button
      >
    </div>
  </div>
</div>
