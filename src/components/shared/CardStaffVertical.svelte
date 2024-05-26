<script lang="ts">
  // Import Types
  import type { CardStaffVerticalOptions } from "@/types";

  // Import Libs
  import onStaffDetailsModal from "@/use-actions/onStaffDetailsModal";

  // Import Components
  import CardVerticalBase from "@/components/shared/CardVerticalBase.svelte";

  export let options: CardStaffVerticalOptions;
</script>

<a href={options.to}>
  <a
    class="w-full h-full"
    use:onStaffDetailsModal={{
      id: options.id,
      name: options.title || "",
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
