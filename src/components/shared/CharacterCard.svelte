<script lang="ts">
  // Import Libs
  import { convertToUrl } from "@/utils";

  // Import Actions
  import onMediaDetailsModal from "@/use-actions/onMediaDetailsModal";
  import onStaffDetailsModal from "@/use-actions/onStaffDetailsModal";

  // Import Components
  import Image from "@/components/shared/Image.svelte";
  import Dot from "@/components/shared/Dot.svelte";

  export let source: any;
</script>

<div class="w-full flex flex-wrap rounded-lg bg-neutral-500/20 p-4">
  <!-- Media -->
  <div class="flex justify-between w-full gap-4">
    <a
      use:onMediaDetailsModal={{
        id: source.node.id,
        image: source.node.coverImage.extraLarge || source.coverImage.large,
        name: source.node.title.userPreferred,
      }}
      class="w-full"
      href={`/${source.node.type.toLowerCase()}/details/${convertToUrl(
        source.node.title.userPreferred
      )}-an${source.node.id}`}
    >
      <div class="flex gap-4">
        <div class="w-16 rounded-lg shrink-0 overflow-hidden">
          <div class="aspect-w-11 aspect-h-16">
            <Image
              src={source.node.coverImage.large}
              backgroundColor={source.node.coverImage.color}
            />
          </div>
        </div>
        <div class="w-full flex flex-col gap-1.5">
          <h3 class="font-bold font-lexenddeca line-clamp-2">
            {source.node.title.userPreferred}
          </h3>
          <div class="flex text-xs items-center gap-2">
            <span class="lowercase first-letter:uppercase"
              >{source.characterRole}</span
            > <span class="first-letter:uppercase">(Role)</span>
            <Dot backgroundColor={source.node.coverImage.color} />
            <span>{source.node.format}</span>
          </div>
        </div>
      </div>
    </a>
    <div class="flex items-center">
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
  <!-- Voice actor -->
  {#if source.voiceActorRoles.length}
    <div
      class="flex w-full flex-col items-center gap-4 mt-4 pt-4 border-t border-neutral-500/10"
    >
      <div class="flex flex-wrap justify-evenly gap-x-4 gap-y-2.5">
        {#each source.voiceActorRoles as voiceActorRole}
          <a
            use:onStaffDetailsModal={{
              id: voiceActorRole.voiceActor.id,
              image: voiceActorRole.voiceActor.image.medium,
              name: voiceActorRole.voiceActor.name.userPreferred,
            }}
            href={`/staff/${convertToUrl(
              voiceActorRole.voiceActor?.name?.userPreferred
            )}-an${voiceActorRole.voiceActor?.id}`}
          >
            <div class="flex flex-col gap-1 items-center">
              <div class="w-10 h-10 rounded-full overflow-hidden">
                <Image src={voiceActorRole.voiceActor.image.medium} />
              </div>
              <h3 class="text-xs">
                {#if voiceActorRole.roleNotes}({voiceActorRole.roleNotes})
                {/if}{voiceActorRole.voiceActor.name.userPreferred}
              </h3>
              <span class="text-xs text-neutral-400"
                >{voiceActorRole.voiceActor.languageV2}</span
              >
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/if}
</div>
