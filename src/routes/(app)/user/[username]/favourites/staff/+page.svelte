<script lang="ts">
  // Import Types
  import type { PageData } from "./$types";
  import type { Maybe, CardStaffVerticalOptions } from "@/types";
  import type { StaffEdge } from "@/types/anilistv2";

  // Import Libs
  import { onMount } from "svelte";
  import useUserStaffFavourites from "@/hooks/useUserStaffFavourites";
  import useCreateLink from "@/hooks/useCreateLink";
  import useDebounce from "@/hooks/useDebounce";
  import { isBottomPage } from "@/utils";

  // Import Components
  import VerticalStaffList from "@/components/shared/VerticalStaffList.svelte";

  export let data: PageData;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let cardOptions: CardStaffVerticalOptions[] = [];
  const userAnimeFavourites = useUserStaffFavourites({
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
          // Add media to cardOptions
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
    edges: Maybe<StaffEdge>[]
  ): CardStaffVerticalOptions[] => {
    const cardOptions: CardStaffVerticalOptions[] = [];
    for (const edge of edges) {
      if (!edge?.node?.id) continue;
      const { userPreferred = "?" } = edge.node.name || {};
      const { id, image } = edge.node;
      cardOptions.push({
        id: id,
        coverImage: {
          alt: userPreferred,
          image: image?.large || image?.medium,
        },
        title: userPreferred,
        to: useCreateLink([
          "/staff/",
          {
            value: userPreferred ?? "?",
            convert: "-",
          },
          "-an",
          id,
        ]),
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

<VerticalStaffList
  {hasNextPage}
  {isLoading}
  source={cardOptions}
  gridColsAndGap="grid-cols-3 gap-x-1.5 gap-y-4 sm:gap-x-2.5 md:grid-cols-4 md:gap-2 lg:gap-x-3 lg:gap-y-6 xl:grid-cols-5 3xl:grid-cols-6 2xl:gap-x-4"
/>
