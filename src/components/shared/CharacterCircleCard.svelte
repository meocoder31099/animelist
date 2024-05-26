<script lang="ts">
  // Import Hooks
  import useCreateLink from "@/hooks/useCreateLink";

  // Import Actions
  import onCharacterDetailsModal from "@/use-actions/onCharacterDetailsModal";

  // Import Components
  import Image from "@/components/shared/Image.svelte";

  export let source: any;
</script>

<div class="col-span-1 overflow-hidden">
  <a
    use:onCharacterDetailsModal={{
      id: source.node.id,
      image: source.node.image.large,
      name: source.node.name.userPreferred,
    }}
    class="w-full h-full"
    href={useCreateLink([
      "/character/",
      { value: source.node.name.userPreferred, convert: "-" },
      "-an",
      source.node.id,
    ])}
  >
    <div class="w-full h-full flex flex-col gap-4 rounded-lg">
      <!-- Avatar -->
      <div class="aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
        <Image
          src={source.node.image.large}
          alt={source.node.name.userPreferred}
        />
      </div>

      <!-- Descriptions -->
      <div class="flex flex-col gap-1 items-center justify-center text-center">
        <span class="max-w-full font-bold 3xl:text-lg break-words"
          >{source.node.name.userPreferred}</span
        >
        <span class="text-neutral-400 text-xs md:text-sm">{source.role}</span>
      </div>
    </div>
  </a>
</div>
