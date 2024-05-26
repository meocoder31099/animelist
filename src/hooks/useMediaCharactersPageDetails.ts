// Import Types
import type { Maybe } from "@/types";
import {
  type CharacterConnection,
  type MediaArgs,
  type PageArgs,
  CharacterSort,
} from "@/types/anilist";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getMediaCharacterPageDetails } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type useMediaCharactersPageDetailsOptions = {
  args: PageArgs & MediaArgs & { characterSort?: CharacterSort[] };
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<CharacterConnection>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const useMediaCharactersPageDetails = ({
  args,
  fields,
  options,
  customFetch,
}: useMediaCharactersPageDetailsOptions) => {
  return createInfiniteQuery<Maybe<CharacterConnection>>({
    queryKey: ["page-media-character", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getMediaCharacterPageDetails({
        args: {
          characterSort: [CharacterSort.Role, CharacterSort.Favourites_desc],
          ...args,
          page: pageParam,
        },
        fields,
        customFetch,
      }),
    getNextPageParam: (lastPage) => {
      if (!!lastPage)
        if (lastPage.pageInfo?.hasNextPage)
          return (lastPage.pageInfo?.currentPage as number) + 1;
      return undefined;
    },
    ...options,
  });
};

export default useMediaCharactersPageDetails;
