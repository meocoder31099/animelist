<script lang="ts">
  // Import Types
  import type { BrowseOptions as AnimeBrowseOptions } from "@/components/features/anime/AnimeBrowseList.svelte";
  import type { BrowseOptions as MangaBrowseOptions } from "@/components/features/manga/MangaBrowseList.svelte";
  import type { CardMediaVerticalOptions } from "@/types";
  import type { Media } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import usePageMedia from "@/hooks/usePageMedia";
  import useCreateLink from "@/hooks/useCreateLink";
  import useDebounce from "@/hooks/useDebounce";
  import { isBottomPage } from "@/utils";

  // Import Components
  import VerticalMediaList from "@/components/shared/VerticalMediaList.svelte";

  export let args: AnimeBrowseOptions | MangaBrowseOptions;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let cardMediaVerticalOptions: CardMediaVerticalOptions[] = [];

  // Some of the arguments are empty arrays that need to be checked.
  // If it's empty set it to undefined so it doesn't appear in the args when it's submitted to the API.
  const genre_in = args.genre_in?.length ? args.genre_in : undefined;
  const tag_in = args.tag_in?.length ? args.tag_in : undefined;
  const sort = args.sort?.length ? args.sort : undefined;
  // Copy args to another args to remove the elements that could be the empty array specified above.
  // If not delete it then the empty array values ​​will be sent so the API leads to the program crashing.
  // It is necessary to copy it because removing elements directly from args will change the data of args (it is also used by other functions).
  const argsClone = JSON.parse(JSON.stringify(args));
  delete argsClone.genre_in;
  delete argsClone.tag_in;
  delete argsClone.sort;

  const pageData = usePageMedia({
    args: {
      ...argsClone,
      genre_in,
      tag_in,
      sort,
      ...(argsClone.startDate_like && {
        startDate_like: `${argsClone.startDate_like}%`,
      }),
    },
  });

  onMount(() => {
    const unsubscribePageData = pageData.subscribe((value) => {
      const pages = value.data?.pages;
      const firstPage = pages?.[0]?.media;
      if (!!firstPage && !value.isFetchingNextPage) {
        // Add media to cardMediaVerticalOptions
        if (cardMediaVerticalOptions.length) {
          const lastPageIndex = pages.length - 1;
          const edgesTemp = pages?.[lastPageIndex]?.media;
          if (edgesTemp) {
            cardMediaVerticalOptions = cardMediaVerticalOptions.concat(
              edgesToCardMediaOptionsProps(edgesTemp)
            );
          }
        } else {
          for (const page of pages) {
            if (page?.media?.length) {
              const edgesTemp = page.media;
              const options = edgesToCardMediaOptionsProps(edgesTemp);
              cardMediaVerticalOptions =
                cardMediaVerticalOptions.concat(options);
            }
          }
        }
      }

      // Update status
      isLoading = value.isLoading || value.isFetchingNextPage || false;
      fetchNextPage = value.fetchNextPage;
      hasNextPage = !!value.hasNextPage;
      !hasNextPage && window.removeEventListener("scroll", handleScroll);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribePageData();
    };
  });

  const edgesToCardMediaOptionsProps = (
    edges: Media[]
  ): CardMediaVerticalOptions[] => {
    return edges.map(({ id, type, bannerImage, coverImage, title }) => {
      id = id ?? 0;
      return {
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
        bannerImage: bannerImage,
      };
    });
  };

  const handleScroll = useDebounce(() => {
    if (isBottomPage() && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, 100);
</script>

<VerticalMediaList
  {isLoading}
  {hasNextPage}
  source={cardMediaVerticalOptions}
/>
