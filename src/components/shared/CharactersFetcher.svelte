<script lang="ts">
  // Import Types
  import type { BrowseOptions } from "@/components/features/characters/CharactersBrowseList.svelte";
  import type { CardCharactersVerticalOptions } from "@/types";
  import type { Character } from "@/types/anilist";

  // Import Libs
  import { onMount } from "svelte";
  import usePageCharacters from "@/hooks/usePageCharacters";
  import useCreateLink from "@/hooks/useCreateLink";
  import useDebounce from "@/hooks/useDebounce";
  import { isBottomPage } from "@/utils";

  // Import Components
  import VerticalCharacterList from "@/components/shared/VerticalCharacterList.svelte";

  export let args: BrowseOptions;

  let isLoading: boolean = true;
  let hasNextPage: boolean = true;
  let fetchNextPage: () => void;
  let cardOptions: CardCharactersVerticalOptions[] = [];

  // Some of the arguments are empty arrays that need to be checked.
  // If it's empty set it to undefined so it doesn't appear in the args when it's submitted to the API.
  const sort = args.sort?.length ? args.sort : undefined;
  // Copy args to another args to remove the elements that could be the empty array specified above.
  // If not delete it then the empty array values ​​will be sent so the API leads to the program crashing.
  // It is necessary to copy it because removing elements directly from args will change the data of args (it is also used by other functions).
  args["isBirthday"] = !args.search && !args.sort?.length;
  const argsClone = JSON.parse(JSON.stringify(args));
  delete argsClone.sort;

  const pageData = usePageCharacters({
    args: {
      ...argsClone,
      sort,
    },
  });

  onMount(() => {
    const unsubscribePageData = pageData.subscribe((value) => {
      const pages = value.data?.pages;
      const firstPage = pages?.[0]?.characters;
      if (!!firstPage && !value.isFetchingNextPage) {
        // Add characters to cardOptions
        if (cardOptions.length) {
          const lastPageIndex = pages.length - 1;
          const edgesTemp = pages?.[lastPageIndex]?.characters;
          if (edgesTemp) {
            cardOptions = cardOptions.concat(
              edgesToCardBaseOptionsProps(edgesTemp)
            );
          }
        } else {
          for (const page of pages) {
            if (page?.characters?.length) {
              const edgesTemp = page.characters;
              if (edgesTemp) {
                const options = edgesToCardBaseOptionsProps(edgesTemp);
                cardOptions = cardOptions.concat(options);
              }
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

  const edgesToCardBaseOptionsProps = (
    edges: Character[]
  ): CardCharactersVerticalOptions[] => {
    return edges.map(({ id, name, image }) => {
      id = id ?? 0;
      return {
        id: id,
        coverImage: {
          alt: name?.userPreferred,
          image: image?.large || image?.medium,
        },
        title: name?.userPreferred || "",
        to: useCreateLink([
          "/character/",
          {
            value: name?.userPreferred || "",
            convert: "-",
          },
          "-an",
          id,
        ]),
      };
    });
  };

  const handleScroll = useDebounce(() => {
    if (isBottomPage() && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, 100);
</script>

<VerticalCharacterList {isLoading} {hasNextPage} source={cardOptions} />
