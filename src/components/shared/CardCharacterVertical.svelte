<script lang="ts">
  // Import Types
  import type { CardCharactersVerticalOptions } from "@/types";

  // Import Libs
  import onCharacterDetailsModal from "@/use-actions/onCharacterDetailsModal";

  // Import Components
  import CardVerticalBase from "@/components/shared/CardVerticalBase.svelte";

  export let options: CardCharactersVerticalOptions;
</script>

<a href={options.to}>
  <a
    class="w-full h-full"
    use:onCharacterDetailsModal={{
      id: options.id,
      name: options.title || '',
      image: options.coverImage?.image || "",
    }}
    href={options.to}
  >
    <CardVerticalBase
      options={{
        title: options?.title,
        coverImage: {
          alt: options?.title,
          image: options.coverImage?.image,
        },
      }}
    />
  </a>
</a>
