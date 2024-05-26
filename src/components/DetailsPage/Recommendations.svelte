<!-- sourceClearNulled = source.filter((node: any) => node.mediaRecommendation); -->

<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { RecommendationEdge } from "@/types/anilist";

  // Import Libs
  import { fade } from "svelte/transition";
  import useCreateLink from "@/hooks/useCreateLink";

  // Import Components
  import CardMediaVertical from "@/components/shared/CardMediaVertical.svelte";
  import CardVerticalBaseSkeleton from "@/components/skeletons/CardVerticalBaseSkeleton.svelte";

  export let isLoading = true;
  export let isSuccess = false;
  export let hasNextPage: boolean = true;
  export let source: Maybe<RecommendationEdge[]> = null;
</script>

<div class="w-full flex flex-col py-2">
  <div
    class="w-full grid grid-cols-12 gap-x-1.5 gap-y-4 sm:gap-x-2.5 md:grid-cols-4 md:gap-2 lg:gap-x-3 lg:gap-y-6 xl:grid-cols-5 3xl:grid-cols-6 2xl:gap-x-4"
  >
    {#if isSuccess && !!source}
      {#each source as edge}
        <div class="col-span-4 md:col-span-1 2xl:col-span-1">
          <CardMediaVertical
            options={{
              id: edge?.node?.mediaRecommendation?.id || 0,
              coverImage: {
                alt: edge?.node?.mediaRecommendation?.title?.userPreferred,
                image:
                  edge?.node?.mediaRecommendation?.coverImage?.large ||
                  edge?.node?.mediaRecommendation?.coverImage?.extraLarge ||
                  edge?.node?.mediaRecommendation?.coverImage?.medium,
                color: edge?.node?.mediaRecommendation?.coverImage?.color,
              },
              title: edge?.node?.mediaRecommendation?.title?.userPreferred,
              to: useCreateLink([
                "/",
                { value: edge?.node?.mediaRecommendation?.type || "", convert: "lowcase" },
                "/details/",
                {
                  value: edge?.node?.mediaRecommendation?.title?.userPreferred || "",
                  convert: "-",
                },
                "-an",
                edge?.node?.mediaRecommendation?.id ?? 0,
              ]),
              subDescription: `${
                edge?.node?.mediaRecommendation?.format || "?"
              } — ${edge?.node?.mediaRecommendation?.season || "?"} ${
                edge?.node?.mediaRecommendation?.seasonYear || "?"
              }`,
            }}
          />
        </div>
      {/each}
    {/if}
    {#if isLoading}
      {#each { length: 4 } as _, i}
        <div
          in:fade={{
            delay: i * 200,
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
