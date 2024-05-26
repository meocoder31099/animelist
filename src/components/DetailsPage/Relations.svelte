<script lang="ts">
  //Import Type
  import type { MediaEdge } from "@/types/anilist";
  import type { Maybe } from "@/types";

  // Import Libs
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import useMediaRelationsDetails from "@/hooks/useMediaRelationsDetails";
  import useCreateLink from "@/hooks/useCreateLink";

  // Import Components
  import CardMediaVertical from "@/components/shared/CardMediaVertical.svelte";
  import CardVerticalBaseSkeleton from "@/components/skeletons/CardVerticalBaseSkeleton.svelte";

  export let mediaId: number;

  let isLoading: boolean = true;
  let isSuccess: boolean = false;
  let source: Maybe<MediaEdge[]> = null;
  let mediaDetailsLinks: string[] = [];

  const data = useMediaRelationsDetails({
    args: {
      id: mediaId,
    },
  });

  onMount(() => {
    const unsubscribeData = data.subscribe((value) => {
      const edges = value.data?.edges;
      if (edges?.length) {
        // Remove node null
        source = edges.filter((edge) => edge.node);
        // Add create media details links
        mediaDetailsLinks = source.map(({ node }) => {
          return useCreateLink([
            "/",
            { value: node?.type || "", convert: "lowcase" },
            "/details/",
            {
              value: node?.title?.userPreferred || "",
              convert: "-",
            },
            "-an",
            node?.id || 0,
          ]);
        });
      }

      isLoading = !!value.isLoading;
      isSuccess = !!value.isSuccess;
    });

    return () => {
      unsubscribeData();
    };
  });
</script>

{#if (!source && !isSuccess) || (isSuccess && !!source)}
  <div class="flex flex-col">
    <!-- Title -->
    <div>
      <h2 class="md:text-lg font-semibold">List of related Anime/Manga</h2>
    </div>
    <div class="w-full flex flex-col space-y-3 py-2 rounded-lg">
      <div
        class="w-full grid grid-cols-12 gap-x-1.5 gap-y-4 sm:gap-x-2.5 md:grid-cols-4 md:gap-2 lg:gap-x-3 lg:gap-y-6 xl:grid-cols-5 3xl:grid-cols-6 2xl:gap-x-4"
      >
        {#if !!source}
          {#each source as { node, relationType }, i}
            <div class="col-span-4 md:col-span-1 2xl:col-span-1">
              <CardMediaVertical
                options={{
                  id: node?.id || 0,
                  coverImage: {
                    alt: node?.title?.userPreferred,
                    image:
                      node?.coverImage?.large ||
                      node?.coverImage?.extraLarge ||
                      node?.coverImage?.medium,
                    color: node?.coverImage?.color,
                  },
                  title: node?.title?.userPreferred,
                  to: mediaDetailsLinks[i],
                  bannerImage: node?.bannerImage,
                  subDescription: `${node?.format || "?"} — ${
                    node?.startDate?.year || "TBA"
                  } — ${relationType || ""}`,
                }}
              />
            </div>
          {/each}
        {:else}
          {#each { length: 4 } as _, i}
            <div
              in:scale|global={{
                delay: i * 200,
                start: 0.9,
              }}
            >
              <CardVerticalBaseSkeleton />
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}
