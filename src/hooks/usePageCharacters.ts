// Import Types
import type { Maybe } from "@/types";
import type { Page, CharacterArgs, PageArgs } from "@/types/anilist";
import type { CreateInfiniteQueryOptions } from "@tanstack/svelte-query";

// Import Libs
import { getPageCharacters } from "@/services/anilist";
import { createInfiniteQuery } from "@tanstack/svelte-query";

type usePageCharactersOptions = {
  args: PageArgs & CharacterArgs;
  fields?: string;
  options?: Omit<
    CreateInfiniteQueryOptions<Maybe<Page>>,
    "TQueryKey" | "TQueryFnData"
  >;
  customFetch?: typeof fetch;
};
const usePageCharacters = ({
  args,
  fields,
  options,
  customFetch,
}: usePageCharactersOptions) => {
  return createInfiniteQuery<Maybe<Page>>({
    queryKey: ["page-characters", { args }],
    queryFn: ({ pageParam = 1 }) =>
      getPageCharacters({
        args: {
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

export default usePageCharacters;
