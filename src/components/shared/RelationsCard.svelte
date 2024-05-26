<script lang="ts">
  // import Libs
  import { fade } from "svelte/transition";
  import useCreateLink from "@/hooks/useCreateLink";

  // Import Actions
  import onMediaDetailsModal from "@/use-actions/onMediaDetailsModal";

  // Import Components
  import Image from "@/components/shared/Image.svelte";
  import Dot from "@/components/shared/Dot.svelte";

  export let source: any;
  export let relationType: string;

  // http://localhost:5173/anime/details/tomo-chan-wa-onnanoko-an151806

  const linkMedia = useCreateLink([
    "/",
    { value: source.type, convert: "lowcase" },
    "/details/",
    { value: source.title.userPreferred, convert: "-" },
    "-an",
    source.id,
  ]);
</script>

<a
  use:onMediaDetailsModal={{
    id: source.id,
    image: source.coverImage.extraLarge || source.coverImage.large,
    name: source.title.userPreferred,
  }}
  href={linkMedia}
>
  <div
    in:fade|global
    class="w-full h-full flex gap-4 rounded-lg bg-neutral-500/20 overflow-hidden"
  >
    <!-- Avatar -->
    <div class="w-28 shrink-0">
      <div class="aspect-w-2 aspect-h-3">
        <Image
          src={source.coverImage.large}
          backgroundColor={source.coverImage.color}
        />
      </div>
    </div>
    <!-- Descriptions -->
    <div class="w-full flex flex-col justify-evenly">
      <div class="flex flex-col gap-2">
        <!-- Media Relation -->
        <span class="font-medium">{relationType}</span>
        <!-- Title -->
        <h3 class="font-bold text-xl">{source.title.userPreferred}</h3>
      </div>
      <!-- Type -->
      <div class="flex gap-2 items-center">
        <span>{source.format}</span>
        <Dot backgroundColor={source.coverImage.color} />
        <span>{source.status}</span>
      </div>
    </div>
  </div></a
>
