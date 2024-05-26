<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";
  import type { PageData } from "./$types";
  import type { CardMediaVerticalOptions } from "@/types";
  import type { MediaEdge } from "@/types/anilistv2";

  // Import Libs
  import { onMount } from "svelte";
  import useUserMangaFavourites from "@/hooks/useUserMangaFavourites";
  import useCreateLink from "@/hooks/useCreateLink";
  import useDebounce from "@/hooks/useDebounce";
  import { isBottomPage } from "@/utils";

  // Import Components
  import VerticalMediaList from "@/components/shared/VerticalMediaList.svelte";

  export let data: PageData;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let cardOptions: CardMediaVerticalOptions[] = [];
  const userAnimeFavourites = useUserMangaFavourites({
    args: {
      name: data.username,
    },
  });

  onMount(() => {
    const unUserAnimeFavouritesStore = userAnimeFavourites.subscribe(
      (value) => {
        const pages = value.data?.pages;
        const firstPage = pages?.[0]?.edges;
        if (!!firstPage && !value.isFetchingNextPage) {
          // Add media to cardMediaVerticalOptions
          if (cardOptions.length) {
            const lastPageIndex = pages.length - 1;
            const edgesTemp = pages?.[lastPageIndex]?.edges;
            if (edgesTemp) {
              cardOptions = cardOptions.concat(
                edgesToCardMediaOptionsProps(edgesTemp)
              );
            }
          } else {
            for (const page of pages) {
              if (page?.edges?.length) {
                const edgesTemp = page.edges;
                if (!edgesTemp) continue;
                const options = edgesToCardMediaOptionsProps(edgesTemp);
                cardOptions = cardOptions.concat(options);
              }
            }
          }
        }

        // Update status
        isLoading = value.isLoading || value.isFetchingNextPage || false;
        fetchNextPage = value.fetchNextPage;
        hasNextPage = !!value.hasNextPage;
        !hasNextPage && window.removeEventListener("scroll", handleScroll);
      }
    );

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unUserAnimeFavouritesStore();
    };
  });

  const edgesToCardMediaOptionsProps = (
    edges: Maybe<MediaEdge>[]
  ): CardMediaVerticalOptions[] => {
    const cardOptions: CardMediaVerticalOptions[] = [];
    for (const edge of edges) {
      if (!edge?.node?.id) continue;
      const { year = "?" } = edge.node.startDate || {};
      const { id, type, bannerImage, coverImage, title, format, status } =
        edge.node;
      cardOptions.push({
        id: id,
        coverImage: {
          alt: title?.userPreferred,
          image:
            coverImage?.large || coverImage?.extraLarge || coverImage?.medium,
          color: coverImage?.color,
        },
        title: title?.userPreferred,
        to: useCreateLink([
          "/",
          { value: type || "", convert: "lowcase" },
          "/details/",
          {
            value: title?.userPreferred || "",
            convert: "-",
          },
          "-an",
          id,
        ]),
        subDescription: `${year} — ${format} — ${status}`,
        bannerImage: bannerImage,
      });
    }
    return cardOptions;
  };

  const handleScroll = useDebounce(() => {
    if (isBottomPage() && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, 100);
</script>

<VerticalMediaList
  {hasNextPage}
  {isLoading}
  source={cardOptions}
  gridColsAndGap="grid-cols-3 gap-x-1.5 gap-y-4 sm:gap-x-2.5 md:grid-cols-4 md:gap-2 lg:gap-x-3 lg:gap-y-6 xl:grid-cols-5 3xl:grid-cols-6 2xl:gap-x-4"
/>
