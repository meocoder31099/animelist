<script lang="ts">
  type FilterOption = {
    value: string | null;
    label: string;
  };
  // Import libs
  import { convertToUrl } from "../../utils";
  import { fade } from "svelte/transition";

  // Import Component
  import CardVertical from "../Cards/CardVertical.svelte";

  export let isLoading = true;
  export let isSuccess = false;
  export let source: any = [];

  export let language_value: FilterOption = {
    value: "Japanese",
    label: "Japanese",
  };
  $: filterData = (arrayVoiceActorRoles: any[]): any[] =>
    arrayVoiceActorRoles.filter(
      (VoiceActorRole) =>
        VoiceActorRole.voiceActor.languageV2 === language_value.value
    );
</script>

{#if isSuccess && source.length}
  <!-- Danh sách manga -->
  <div in:fade class="flex justify-center py-2 lg:py-4 px-2 md:px-6 lg:px-8">
    <div class="w-full grid grid-cols-12 gap-x-1.5 sm:gap-x-2.5 gap-y-0 md:grid-cols-5 md:gap-2 lg:md:gap-3 2xl:grid-cols-7 2xl:gap-3 3xl:grid-cols-9 3xl:gap-4">
      {#each source as mediaData, i}
        <div
          class="col-span-4 md:col-span-1 2xl:col-span-1"
        >
          <CardVertical
            isLoading={false}
            source={mediaData.node}
            voiceActorRoles={filterData(mediaData.voiceActorRoles)}
            to={`/${mediaData.node.type.toLowerCase()}/details/${convertToUrl(
              mediaData.node.title.userPreferred
            )}-an${mediaData.node.id}`}
          />
        </div>
      {/each}
    </div>
  </div>
{:else if isLoading}
  <!-- Danh sách manga -->
  <div class="flex justify-center py-2 lg:py-4 px-2 md:px-6 lg:px-8">
    <div class="w-full grid grid-cols-12 gap-x-1.5 sm:gap-x-2.5 gap-y-0 md:grid-cols-5 md:gap-2 lg:md:gap-3 2xl:grid-cols-7 2xl:gap-3 3xl:grid-cols-9 3xl:gap-4">
      {#each Array(9) as noUse}
        <div
          class="col-span-4 md:col-span-1 2xl:col-span-1"
        >
          <CardVertical />
        </div>
      {/each}
    </div>
  </div>
{/if}
