<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { CharacterEdge } from "@/types/anilist";

  // Import Libs
  import { scale } from "svelte/transition";
  import useCreateLink from "@/hooks/useCreateLink";

  // Import Actions
  import onCharacterDetailsModal from "@/use-actions/onCharacterDetailsModal";

  // Import Components
  import CardVerticalBase from "@/components/shared/CardVerticalBase.svelte";
  import CardVerticalBaseSkeleton from "@/components/skeletons/CardVerticalBaseSkeleton.svelte";

  export let isLoading = true;
  export let isSuccess = false;
  export let hasNextPage: boolean = true;
  export let source: Maybe<CharacterEdge[]> = null;
</script>

<div class="w-full flex flex-col py-2">
  <div
    class="w-full grid grid-cols-12 gap-x-1.5 gap-y-4 sm:gap-x-2.5 md:grid-cols-4 md:gap-2 lg:gap-x-3 lg:gap-y-6 xl:grid-cols-5 3xl:grid-cols-6 2xl:gap-x-4"
  >
    {#if isSuccess && !!source}
      {#each source as edge}
        <a
          class="col-span-4 md:col-span-1 2xl:col-span-1"
          use:onCharacterDetailsModal={{
            id: edge.node?.id || 0,
            name: edge.node?.name?.userPreferred || "",
            image: edge.node?.image?.medium || "",
          }}
          href={useCreateLink([
            "/character/",
            { value: edge.node?.name?.userPreferred || "", convert: "-" },
            "-an",
            edge.node?.id || 0,
          ])}
        >
          <CardVerticalBase
            options={{
              title: edge.node?.name?.userPreferred || "",
              coverImage: {
                alt: edge.node?.name?.userPreferred || "",
                image: edge.node?.image?.large || edge.node?.image?.medium,
              },
            }}
          >
            <div
              slot="sub-description"
              class="mt-1 px-1 text-xs md:text-sm text-neutral-300 opacity-60 lowercase first-letter:uppercase"
            >
              {edge.role}
            </div>
          </CardVerticalBase>
        </a>
      {/each}
    {/if}
    {#if isLoading}
      {#each { length: 4 } as _, i}
        <div
          in:scale={{
            delay: i * 200,
            start: 0.9
          }}
          class="col-span-4 md:col-span-1 2xl:col-span-1"
        >
          <CardVerticalBaseSkeleton />
        </div>
      {/each}
    {/if}
  </div>
</div>
{#if !isLoading && !hasNextPage}
  <div class="w-full text-center my-20">Không còn kết quả nào!</div>
{/if}
